const express = require('express');
const mongoose = require('mongoose');
const BondingChannel = mongoose.models.BondingChannel || require('../models/BondingChannel');
const BondingMessage = mongoose.models.BondingMessage || require('../models/BondingMessage');
const BondingScore = mongoose.models.BondingScore || require('../models/BondingScore');
const GameInvitation = mongoose.models.GameInvitation || require('../models/GameInvitation');
const GameMatch = mongoose.models.GameMatch || require('../models/GameMatch');
const User = mongoose.models.User || require('../models/User');
const { Chess } = require('chess.js');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken);

// Helper: Award bonding points to a user
async function awardPoints(userId, userName, userRole, pts, isWin = false, gameType = '') {
  try {
    let score = await BondingScore.findOne({ userId });
    if (!score) {
      score = new BondingScore({
        userId,
        userName: userName || 'Team Member',
        userRole: userRole || 'employee',
        points: 0,
        wins: 0,
        gamesPlayed: 0,
        badges: ['Team Player']
      });
    }

    score.points += pts;
    score.gamesPlayed += 1;
    if (isWin) score.wins += 1;
    score.lastPlayedAt = new Date();

    // Unlock badges based on milestones
    const badges = new Set(score.badges || []);
    if (score.points >= 50) badges.add('Novice Gamer');
    if (score.points >= 150) badges.add('Trivia Titan');
    if (score.points >= 300) badges.add('Team Champion');
    if (score.points >= 600) badges.add('Bonding Legend');
    if (score.wins >= 5) badges.add('Victory Master');
    if (score.wins >= 15) badges.add('Undefeated Spirit');
    if (gameType === 'speedtyper') badges.add('Lightning Fingers');
    if (gameType === 'wordle') badges.add('Word Wizard');
    if (gameType === 'tictactoe' && isWin) badges.add('Tactician');

    score.badges = Array.from(badges);
    await score.save();
    return score;
  } catch (err) {
    console.error('Error awarding points:', err);
  }
}

// Ensure default global team lounges exist and include the current user
async function ensureDefaultChannels(user) {
  try {
    const defaults = [
      {
        name: '🎉 Team Lounge',
        type: 'group',
        description: 'Watercooler chats, updates, and team discussions for everyone!',
        avatar: '🎉',
        isDefault: true
      },
      {
        name: '💬 General Discussion',
        type: 'group',
        description: 'Open conversation, brainstorming, and cross-team collaboration.',
        avatar: '💬',
        isDefault: true
      }
    ];

    for (const def of defaults) {
      let chan = await BondingChannel.findOne({ name: def.name, isDefault: true });
      if (!chan) {
        chan = new BondingChannel({
          ...def,
          createdBy: { userId: user._id, name: 'System' },
          members: [{
            userId: user._id,
            name: user.name || 'Admin',
            role: user.role || 'employee',
            email: user.email || ''
          }],
          lastMessage: {
            content: `Welcome to ${def.name}! Say hi or challenge a teammate! 👋`,
            senderName: 'CI360 Bot',
            sentAt: new Date(),
            type: 'system'
          }
        });
        await chan.save();
      } else {
        const isMember = chan.members.some(m => m.userId.toString() === user._id.toString());
        if (!isMember) {
          chan.members.push({
            userId: user._id,
            name: user.name || 'Colleague',
            role: user.role || 'employee',
            email: user.email || ''
          });
          await chan.save();
        }
      }
    }
  } catch (err) {
    console.error('Error ensuring default channels:', err);
  }
}

// GET /api/bonding/colleagues - Get all colleagues for personal chat / game challenges / adding to groups
router.get('/colleagues', async (req, res) => {
  try {
    // Only employees and administrators can participate in team bonding & groups
    const users = await User.find(
      { active: true, role: { $in: ['employee', 'admin', 'superadmin'] } },
      'name email role _id'
    ).sort({ name: 1 });
    const formatted = users.map(u => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      isSelf: u._id.toString() === req.user._id.toString()
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bonding/channels - List all channels the user participates in
router.get('/channels', async (req, res) => {
  try {
    await ensureDefaultChannels(req.user);

    const channels = await BondingChannel.find({
      'members.userId': req.user._id,
      isArchived: { $ne: true }
    }).sort({ 'lastMessage.sentAt': -1, updatedAt: -1 });

    // Format direct channels so name displays the OTHER member's name
    const result = channels.map(chan => {
      const c = chan.toObject();
      if (c.type === 'direct') {
        const otherMember = c.members.find(m => m.userId.toString() !== req.user._id.toString()) || c.members[0];
        c.displayName = otherMember ? otherMember.name : c.name;
        c.displayRole = otherMember ? otherMember.role : '';
        c.otherUserId = otherMember ? otherMember.userId : null;
      } else {
        c.displayName = c.name;
      }
      return c;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/channels - Create a group or start a direct personal chat
router.post('/channels', async (req, res) => {
  try {
    const { type, name, description, avatar, memberIds, targetUserId } = req.body;

    if (type === 'direct') {
      if (!targetUserId) {
        return res.status(400).json({ error: 'Target user ID is required for direct chat' });
      }

      if (targetUserId.toString() === req.user._id.toString()) {
        return res.status(400).json({ error: 'Cannot start a personal chat with yourself' });
      }

      // Check if a direct channel between these two already exists
      const existing = await BondingChannel.findOne({
        type: 'direct',
        isArchived: { $ne: true },
        $and: [
          { 'members.userId': req.user._id },
          { 'members.userId': targetUserId }
        ]
      });

      if (existing) {
        const c = existing.toObject();
        const otherMember = c.members.find(m => m.userId.toString() !== req.user._id.toString());
        c.displayName = otherMember ? otherMember.name : c.name;
        c.displayRole = otherMember ? otherMember.role : '';
        c.otherUserId = otherMember ? otherMember.userId : null;
        return res.json(c);
      }

      const targetUser = await User.findById(targetUserId);
      if (!targetUser) return res.status(404).json({ error: 'Colleague not found' });
      if (!['employee', 'admin', 'superadmin'].includes(targetUser.role)) {
        return res.status(400).json({ error: 'Personal chats are only available with employees and administrators' });
      }

      const newChan = new BondingChannel({
        name: `${req.user.name} & ${targetUser.name}`,
        type: 'direct',
        avatar: '💬',
        createdBy: { userId: req.user._id, name: req.user.name },
        members: [
          { userId: req.user._id, name: req.user.name, role: req.user.role, email: req.user.email },
          { userId: targetUser._id, name: targetUser.name, role: targetUser.role, email: targetUser.email }
        ],
        lastMessage: {
          content: 'Started personal chat. Say hello or send a game challenge! 🚀',
          senderName: 'CI360 Bot',
          sentAt: new Date(),
          type: 'system'
        }
      });

      await newChan.save();
      const c = newChan.toObject();
      c.displayName = targetUser.name;
      c.displayRole = targetUser.role;
      c.otherUserId = targetUser._id;
      return res.status(201).json(c);
    }

    // Group Channel Creation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Group name is required' });
    }

    const membersList = [
      { userId: req.user._id, name: req.user.name, role: req.user.role, email: req.user.email }
    ];

    if (Array.isArray(memberIds) && memberIds.length > 0) {
      // Only employee and admin accounts can be added to groups
      const otherUsers = await User.find({
        _id: { $in: memberIds, $ne: req.user._id },
        role: { $in: ['employee', 'admin', 'superadmin'] }
      });
      for (const u of otherUsers) {
        membersList.push({ userId: u._id, name: u.name, role: u.role, email: u.email });
      }
    }

    const group = new BondingChannel({
      name: name.trim(),
      type: 'group',
      description: (description || '').trim(),
      avatar: avatar || '👥',
      createdBy: { userId: req.user._id, name: req.user.name },
      members: membersList,
      lastMessage: {
        content: `Group "${name.trim()}" created by ${req.user.name}. Welcome everyone! 🎉`,
        senderName: req.user.name,
        sentAt: new Date(),
        type: 'system'
      }
    });

    await group.save();

    // Create opening message
    const welcomeMsg = new BondingMessage({
      channelId: group._id,
      sender: {
        userId: req.user._id,
        name: req.user.name,
        role: req.user.role,
        email: req.user.email
      },
      type: 'system',
      content: `Group "${name.trim()}" created with ${membersList.length} members. Start chatting, play trivia, or challenge each other!`
    });
    await welcomeMsg.save();

    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/bonding/channels/:id/members - Add or remove members in a group
router.put('/channels/:id/members', async (req, res) => {
  try {
    const { action, userIds, userId } = req.body;
    const channel = await BondingChannel.findById(req.params.id);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    if (channel.type === 'direct') {
      return res.status(400).json({ error: 'Cannot modify members of a personal 1-on-1 chat' });
    }

    if (action === 'add') {
      const idsToAdd = Array.isArray(userIds) ? userIds : (userId ? [userId] : []);
      if (idsToAdd.length === 0) return res.status(400).json({ error: 'No user IDs provided' });

      const existingIds = new Set(channel.members.map(m => m.userId.toString()));
      const toFetch = idsToAdd.filter(id => !existingIds.has(id.toString()));

      if (toFetch.length === 0) {
        return res.json({ message: 'Users already in group', channel });
      }

      // Only employee and admin accounts can be added to groups
      const users = await User.find({
        _id: { $in: toFetch },
        role: { $in: ['employee', 'admin', 'superadmin'] }
      });
      if (users.length === 0) {
        return res.status(400).json({ error: 'Only employees and administrators can be added to groups' });
      }

      const addedNames = [];
      for (const u of users) {
        channel.members.push({
          userId: u._id,
          name: u.name,
          role: u.role,
          email: u.email
        });
        addedNames.push(u.name);
      }

      const notice = `${req.user.name} added ${addedNames.join(', ')} to the group.`;
      channel.lastMessage = {
        content: notice,
        senderName: 'System',
        sentAt: new Date(),
        type: 'system'
      };

      await channel.save();

      const sysMsg = new BondingMessage({
        channelId: channel._id,
        sender: {
          userId: req.user._id,
          name: req.user.name,
          role: req.user.role,
          email: req.user.email
        },
        type: 'system',
        content: notice
      });
      await sysMsg.save();

      return res.json({ message: 'Members added successfully', channel });
    }

    if (action === 'remove') {
      const targetId = userId || (Array.isArray(userIds) && userIds[0]);
      if (!targetId) return res.status(400).json({ error: 'Target user ID is required' });

      const memberIndex = channel.members.findIndex(m => m.userId.toString() === targetId.toString());
      if (memberIndex === -1) {
        return res.status(400).json({ error: 'User is not a member of this group' });
      }

      const removedMember = channel.members[memberIndex];
      channel.members.splice(memberIndex, 1);

      const isSelf = targetId.toString() === req.user._id.toString();
      const notice = isSelf
        ? `${req.user.name} left the group.`
        : `${req.user.name} removed ${removedMember.name} from the group.`;

      channel.lastMessage = {
        content: notice,
        senderName: 'System',
        sentAt: new Date(),
        type: 'system'
      };

      await channel.save();

      const sysMsg = new BondingMessage({
        channelId: channel._id,
        sender: {
          userId: req.user._id,
          name: req.user.name,
          role: req.user.role,
          email: req.user.email
        },
        type: 'system',
        content: notice
      });
      await sysMsg.save();

      return res.json({ message: 'Member removed successfully', channel });
    }

    res.status(400).json({ error: 'Invalid action. Supported: add, remove' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bonding/channels/:id - Delete a group channel
router.delete('/channels/:id', async (req, res) => {
  try {
    const channel = await BondingChannel.findById(req.params.id);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    // Allow deleting groups
    channel.isArchived = true;
    await channel.save();
    await BondingMessage.deleteMany({ channelId: channel._id });

    res.json({ message: 'Group deleted successfully', channelId: channel._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bonding/channels/:id/messages - Retrieve message stream
router.get('/channels/:id/messages', async (req, res) => {
  try {
    const channel = await BondingChannel.findById(req.params.id);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    // Verify membership
    const isMember = channel.members.some(m => m.userId.toString() === req.user._id.toString());
    if (!isMember) {
      return res.status(403).json({ error: 'You are not a member of this conversation' });
    }

    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const messages = await BondingMessage.find({ channelId: channel._id })
      .sort({ createdAt: 1 })
      .limit(limit);

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/channels/:id/messages - Send message or launch game challenge
router.post('/channels/:id/messages', async (req, res) => {
  try {
    const channel = await BondingChannel.findById(req.params.id);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    const isMember = channel.members.some(m => m.userId.toString() === req.user._id.toString());
    if (!isMember) {
      return res.status(403).json({ error: 'You are not a member of this conversation' });
    }

    const { type, content, challengeData } = req.body;

    const msg = new BondingMessage({
      channelId: channel._id,
      sender: {
        userId: req.user._id,
        name: req.user.name,
        role: req.user.role,
        email: req.user.email
      },
      type: type === 'challenge' ? 'challenge' : 'text',
      content: (content || '').trim()
    });

    if (type === 'challenge' && challengeData) {
      msg.challengeData = {
        gameType: challengeData.gameType || 'trivia',
        gameTitle: challengeData.gameTitle || 'Friendly Showdown',
        status: 'active',
        targetUserId: challengeData.targetUserId || null,
        targetUserName: challengeData.targetUserName || '',
        challengerScore: challengeData.challengerScore || 0,
        challengerTime: challengeData.challengerTime || 0,
        gameState: challengeData.gameState || {},
        participants: [
          {
            userId: req.user._id,
            name: req.user.name,
            score: challengeData.challengerScore || 0,
            timeSpent: challengeData.challengerTime || 0,
            details: challengeData.details || {},
            completedAt: new Date()
          }
        ]
      };

      // Turn based setup (like Tic-Tac-Toe)
      if (challengeData.gameType === 'tictactoe') {
        msg.challengeData.gameState = {
          board: Array(9).fill(null),
          currentTurn: challengeData.targetUserId || null, // Opponent's turn first if challenger created it
          playerX: req.user._id.toString(),
          playerXName: req.user.name,
          playerO: challengeData.targetUserId ? challengeData.targetUserId.toString() : null,
          playerOName: challengeData.targetUserName || 'Opponent',
          moveCount: 0
        };
      }

      channel.lastMessage = {
        content: `🎮 Challenge: ${msg.challengeData.gameTitle} launched by ${req.user.name}!`,
        senderName: req.user.name,
        senderId: req.user._id,
        sentAt: new Date(),
        type: 'challenge'
      };

      // Award initiator points
      await awardPoints(req.user._id, req.user.name, req.user.role, 10, false, challengeData.gameType);
    } else {
      channel.lastMessage = {
        content: msg.content.slice(0, 80),
        senderName: req.user.name,
        senderId: req.user._id,
        sentAt: new Date(),
        type: 'text'
      };
    }

    await msg.save();
    await channel.save();

    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/challenges/:messageId/action - Play game turn, submit quiz score, etc.
router.post('/challenges/:messageId/action', async (req, res) => {
  try {
    const msg = await BondingMessage.findById(req.params.messageId);
    if (!msg || msg.type !== 'challenge') {
      return res.status(404).json({ error: 'Challenge message not found' });
    }

    const { action, cellIndex, score, timeSpent, details } = req.body;
    const cd = msg.challengeData;

    // TIC-TAC-TOE TURN
    if (cd.gameType === 'tictactoe') {
      const gs = cd.gameState || {};
      const board = gs.board || Array(9).fill(null);

      // Determine player symbol
      let symbol = null;
      if (gs.playerX === req.user._id.toString()) symbol = 'X';
      else if (!gs.playerO) {
        // Someone joins as Player O!
        gs.playerO = req.user._id.toString();
        gs.playerOName = req.user.name;
        symbol = 'O';
      } else if (gs.playerO === req.user._id.toString()) {
        symbol = 'O';
      } else {
        return res.status(403).json({ error: 'This duel already has two players' });
      }

      // Check whose turn it is
      if (gs.currentTurn && gs.currentTurn.toString() !== req.user._id.toString()) {
        return res.status(400).json({ error: 'It is not your turn yet!' });
      }

      if (cellIndex < 0 || cellIndex > 8 || board[cellIndex] !== null) {
        return res.status(400).json({ error: 'Invalid or occupied cell' });
      }

      board[cellIndex] = symbol;
      gs.moveCount = (gs.moveCount || 0) + 1;

      // Check winning combinations
      const winCombos = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diags
      ];

      let won = false;
      for (const [a, b, c] of winCombos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          won = true;
          break;
        }
      }

      if (won) {
        cd.status = 'completed';
        cd.winnerId = req.user._id;
        cd.winnerName = req.user.name;
        gs.winner = symbol;
        gs.winningPlayer = req.user.name;
        await awardPoints(req.user._id, req.user.name, req.user.role, 30, true, 'tictactoe');

        const opponentId = symbol === 'X' ? gs.playerO : gs.playerX;
        const opponentName = symbol === 'X' ? gs.playerOName : gs.playerXName;
        if (opponentId) {
          await awardPoints(opponentId, opponentName, 'employee', 10, false, 'tictactoe');
        }
      } else if (gs.moveCount >= 9 || board.every(c => c !== null)) {
        cd.status = 'completed';
        gs.winner = 'Draw';
        await awardPoints(req.user._id, req.user.name, req.user.role, 15, false, 'tictactoe');
      } else {
        // Swap turn
        const nextPlayer = symbol === 'X' ? gs.playerO : gs.playerX;
        gs.currentTurn = nextPlayer;
      }

      cd.gameState = gs;
      msg.markModified('challengeData');
      await msg.save();
      return res.json(msg);
    }

    // SCORE SUBMISSION FOR TRIVIA, WORDLE, SPEED TYPER, MEMORY
    if (action === 'submit_score') {
      const userScore = Number(score) || 0;
      const userTime = Number(timeSpent) || 0;

      // Update or add participant
      const pIdx = cd.participants.findIndex(p => p.userId && p.userId.toString() === req.user._id.toString());
      if (pIdx > -1) {
        cd.participants[pIdx].score = Math.max(cd.participants[pIdx].score, userScore);
        cd.participants[pIdx].timeSpent = userTime;
        cd.participants[pIdx].details = details || {};
        cd.participants[pIdx].completedAt = new Date();
      } else {
        cd.participants.push({
          userId: req.user._id,
          name: req.user.name,
          score: userScore,
          timeSpent: userTime,
          details: details || {},
          completedAt: new Date()
        });
      }

      // Sort participants by score descending, then time ascending
      cd.participants.sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent);

      if (cd.participants.length > 0) {
        cd.winnerId = cd.participants[0].userId;
        cd.winnerName = cd.participants[0].name;
        cd.winnerScore = cd.participants[0].score;
      }

      // Award points: base + score bonus
      const pts = 15 + Math.min(Math.round(userScore / 2), 35);
      await awardPoints(req.user._id, req.user.name, req.user.role, pts, userScore > 70, cd.gameType);

      msg.markModified('challengeData');
      await msg.save();
      return res.json(msg);
    }

    res.status(400).json({ error: 'Unsupported challenge action' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/messages/:id/react - Toggle emoji reaction
router.post('/messages/:id/react', async (req, res) => {
  try {
    const { emoji } = req.body;
    if (!emoji) return res.status(400).json({ error: 'Emoji is required' });

    const msg = await BondingMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });

    let reaction = msg.reactions.find(r => r.emoji === emoji);
    if (!reaction) {
      msg.reactions.push({ emoji, users: [req.user._id] });
    } else {
      const uIdx = reaction.users.findIndex(u => u.toString() === req.user._id.toString());
      if (uIdx > -1) {
        reaction.users.splice(uIdx, 1);
        if (reaction.users.length === 0) {
          msg.reactions = msg.reactions.filter(r => r.emoji !== emoji);
        }
      } else {
        reaction.users.push(req.user._id);
      }
    }

    await msg.save();
    res.json(msg.reactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================================
   MULTIPLAYER GAMES ENGINE (CHESS DUEL, TIC-TAC-TOE, CONNECT FOUR)
   ========================================================================= */

// Win checkers for Tic-Tac-Toe and Connect Four
function checkTicTacToeWin(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(cell => cell !== null)) {
    return { draw: true };
  }
  return null;
}

function checkConnectFourWin(grid) {
  const ROWS = 6;
  const COLS = 7;

  // Horizontal check
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const piece = grid[r][c];
      if (piece && piece === grid[r][c + 1] && piece === grid[r][c + 2] && piece === grid[r][c + 3]) {
        return { winner: piece, cells: [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]] };
      }
    }
  }

  // Vertical check
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++) {
      const piece = grid[r][c];
      if (piece && piece === grid[r + 1][c] && piece === grid[r + 2][c] && piece === grid[r + 3][c]) {
        return { winner: piece, cells: [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]] };
      }
    }
  }

  // Diagonal \ (down-right)
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const piece = grid[r][c];
      if (piece && piece === grid[r + 1][c + 1] && piece === grid[r + 2][c + 2] && piece === grid[r + 3][c + 3]) {
        return { winner: piece, cells: [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]] };
      }
    }
  }

  // Diagonal / (down-left)
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 3; c < COLS; c++) {
      const piece = grid[r][c];
      if (piece && piece === grid[r + 1][c - 1] && piece === grid[r + 2][c - 2] && piece === grid[r + 3][c - 3]) {
        return { winner: piece, cells: [[r, c], [r + 1, c - 1], [r + 2, c - 2], [r + 3, c - 3]] };
      }
    }
  }

  // Check board full (draw)
  const isFull = grid.every(row => row.every(cell => cell !== null));
  if (isFull) {
    return { draw: true };
  }

  return null;
}

// Award match results and update leaderboard stats
async function awardGameMatchResult(match) {
  try {
    const p1Id = match.player1.userId;
    const p2Id = match.player2.userId;
    const isP1Winner = match.winnerId && match.winnerId.toString() === p1Id.toString();
    const isP2Winner = match.winnerId && match.winnerId.toString() === p2Id.toString();
    const isDraw = match.status === 'draw';
    const gameType = match.gameType;

    let s1 = await BondingScore.findOne({ userId: p1Id });
    if (!s1) {
      s1 = new BondingScore({ userId: p1Id, userName: match.player1.name, userRole: match.player1.role });
    }
    let s2 = await BondingScore.findOne({ userId: p2Id });
    if (!s2) {
      s2 = new BondingScore({ userId: p2Id, userName: match.player2.name, userRole: match.player2.role });
    }

    if (!s1.gameStats) s1.gameStats = {};
    if (!s2.gameStats) s2.gameStats = {};
    if (!s1.gameStats[gameType]) s1.gameStats[gameType] = { played: 0, wins: 0, losses: 0, draws: 0 };
    if (!s2.gameStats[gameType]) s2.gameStats[gameType] = { played: 0, wins: 0, losses: 0, draws: 0 };

    s1.gamesPlayed += 1;
    s2.gamesPlayed += 1;
    s1.gameStats[gameType].played += 1;
    s2.gameStats[gameType].played += 1;

    if (isDraw) {
      s1.draws = (s1.draws || 0) + 1;
      s2.draws = (s2.draws || 0) + 1;
      s1.gameStats[gameType].draws += 1;
      s2.gameStats[gameType].draws += 1;
      s1.points += 20;
      s2.points += 20;
    } else if (isP1Winner) {
      s1.wins += 1;
      s1.streak = (s1.streak || 0) + 1;
      s1.points += gameType === 'chess' ? 50 : 35;
      s1.gameStats[gameType].wins += 1;

      s2.losses = (s2.losses || 0) + 1;
      s2.streak = 0;
      s2.points += 10;
      s2.gameStats[gameType].losses += 1;

      if (gameType === 'chess') {
        const k = 32;
        const ea = 1 / (1 + Math.pow(10, ((s2.chessRating || 1200) - (s1.chessRating || 1200)) / 400));
        const delta = Math.round(k * (1 - ea));
        s1.chessRating = Math.max(600, (s1.chessRating || 1200) + delta);
        s2.chessRating = Math.max(600, (s2.chessRating || 1200) - delta);
      }
    } else if (isP2Winner) {
      s2.wins += 1;
      s2.streak = (s2.streak || 0) + 1;
      s2.points += gameType === 'chess' ? 50 : 35;
      s2.gameStats[gameType].wins += 1;

      s1.losses = (s1.losses || 0) + 1;
      s1.streak = 0;
      s1.points += 10;
      s1.gameStats[gameType].losses += 1;

      if (gameType === 'chess') {
        const k = 32;
        const ea = 1 / (1 + Math.pow(10, ((s1.chessRating || 1200) - (s2.chessRating || 1200)) / 400));
        const delta = Math.round(k * (1 - ea));
        s2.chessRating = Math.max(600, (s2.chessRating || 1200) + delta);
        s1.chessRating = Math.max(600, (s1.chessRating || 1200) - delta);
      }
    }

    s1.lastPlayedAt = new Date();
    s2.lastPlayedAt = new Date();
    s1.markModified('gameStats');
    s2.markModified('gameStats');
    await s1.save();
    await s2.save();
  } catch (err) {
    console.error('Error awarding game match result:', err);
  }
}

// GET /api/bonding/games/overview - Lounge & Chat Games Center overview
router.get('/games/overview', async (req, res) => {
  try {
    const availableGames = [
      {
        id: 'chess',
        name: 'Chess Duel',
        icon: '♟️',
        desc: 'Classic 8×8 two-player chess with full legal rules: castling, en passant, promotion, and checkmate.',
        duration: '10–20 mins',
        modes: ['Untimed', '3 mins', '5 mins']
      },
      {
        id: 'tictactoe',
        name: 'Tic-Tac-Toe Challenge',
        icon: '❌',
        desc: 'Fast-paced 3×3 strategic duel. Match three in a row to win before your opponent blocks you.',
        duration: '1–3 mins',
        modes: ['Classic Turn-Based']
      },
      {
        id: 'connectfour',
        name: 'Connect Four',
        icon: '🔴',
        desc: 'Vertical checkers duel! Drop discs into 7 columns and connect 4 horizontally, vertically, or diagonally.',
        duration: '3–6 mins',
        modes: ['Classic Turn-Based']
      }
    ];

    const now = new Date();

    // Auto-expire old pending invitations
    await GameInvitation.updateMany(
      { status: 'pending', expiresAt: { $lt: now } },
      { $set: { status: 'expired' } }
    );

    const [incoming, sent, activeMatches, recentMatches, myScore] = await Promise.all([
      GameInvitation.find({ 'recipient.userId': req.user._id, status: 'pending', expiresAt: { $gt: now } }).sort({ createdAt: -1 }),
      GameInvitation.find({ 'sender.userId': req.user._id, status: 'pending', expiresAt: { $gt: now } }).sort({ createdAt: -1 }),
      GameMatch.find({
        status: 'active',
        $or: [{ 'player1.userId': req.user._id }, { 'player2.userId': req.user._id }]
      }).sort({ updatedAt: -1 }),
      GameMatch.find({
        status: { $in: ['completed', 'draw', 'resigned'] },
        $or: [{ 'player1.userId': req.user._id }, { 'player2.userId': req.user._id }]
      }).sort({ completedAt: -1 }).limit(15),
      BondingScore.findOne({ userId: req.user._id })
    ]);

    res.json({
      availableGames,
      incomingChallenges: incoming,
      sentChallenges: sent,
      activeMatches,
      recentMatches,
      myStats: myScore || {
        points: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        gamesPlayed: 0,
        chessRating: 1200,
        gameStats: {}
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/invitations - Create and deliver a game challenge
router.post('/invitations', async (req, res) => {
  try {
    const { gameType, targetUserId, matchSettings, channelId } = req.body;

    if (!['chess', 'tictactoe', 'connectfour'].includes(gameType)) {
      return res.status(400).json({ error: 'Invalid game type. Choose chess, tictactoe, or connectfour.' });
    }

    if (!targetUserId) {
      return res.status(400).json({ error: 'Mandatory opponent selection: You must select an employee to challenge.' });
    }

    if (targetUserId.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: 'You cannot challenge yourself!' });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser || !targetUser.active) {
      return res.status(404).json({ error: 'Selected colleague not found or account is disabled.' });
    }

    if (!['employee', 'admin', 'superadmin'].includes(targetUser.role)) {
      return res.status(403).json({ error: 'Challenges can only be sent to employees and administrators.' });
    }

    // Prevent duplicate invitations for the same active match
    const existingInvite = await GameInvitation.findOne({
      gameType,
      'sender.userId': req.user._id,
      'recipient.userId': targetUser._id,
      status: 'pending',
      expiresAt: { $gt: new Date() }
    });

    if (existingInvite) {
      return res.status(400).json({
        error: `You already have an active pending ${existingInvite.gameTitle} invitation sent to ${targetUser.name}. Please wait for their response or cancel the existing invitation.`
      });
    }

    const titleMap = {
      chess: 'Chess Duel',
      tictactoe: 'Tic-Tac-Toe Challenge',
      connectfour: 'Connect Four'
    };
    const gameTitle = titleMap[gameType] || 'Game Challenge';

    // Find or create direct chat channel between the two employees if channelId not provided
    let activeChannelId = channelId;
    if (!activeChannelId) {
      let directChan = await BondingChannel.findOne({
        type: 'direct',
        isArchived: { $ne: true },
        $and: [
          { 'members.userId': req.user._id },
          { 'members.userId': targetUser._id }
        ]
      });

      if (!directChan) {
        directChan = new BondingChannel({
          name: `${req.user.name} & ${targetUser.name}`,
          type: 'direct',
          avatar: '💬',
          createdBy: { userId: req.user._id, name: req.user.name },
          members: [
            { userId: req.user._id, name: req.user.name, role: req.user.role, email: req.user.email },
            { userId: targetUser._id, name: targetUser.name, role: targetUser.role, email: targetUser.email }
          ],
          lastMessage: {
            content: `🎮 ${req.user.name} sent a ${gameTitle} challenge!`,
            senderName: req.user.name,
            sentAt: new Date(),
            type: 'challenge'
          }
        });
        await directChan.save();
      }
      activeChannelId = directChan._id;
    }

    // Create the invitation
    const invitation = new GameInvitation({
      gameType,
      gameTitle,
      sender: {
        userId: req.user._id,
        name: req.user.name,
        role: req.user.role,
        email: req.user.email
      },
      recipient: {
        userId: targetUser._id,
        name: targetUser.name,
        role: targetUser.role,
        email: targetUser.email
      },
      matchSettings: matchSettings || { timerMode: 'none' },
      channelId: activeChannelId,
      status: 'pending',
      expiresAt: new Date(Date.now() + 30 * 60 * 1000)
    });

    await invitation.save();

    // Post Game Invitation card message in conversation
    if (activeChannelId) {
      const cardMsg = new BondingMessage({
        channelId: activeChannelId,
        sender: {
          userId: req.user._id,
          name: req.user.name,
          role: req.user.role,
          email: req.user.email
        },
        type: 'challenge',
        content: `⚔️ ${req.user.name} challenged ${targetUser.name} to ${gameTitle}!`,
        challengeData: {
          gameType,
          gameTitle,
          status: 'pending',
          targetUserId: targetUser._id,
          targetUserName: targetUser.name,
          gameState: {
            invitationId: invitation._id,
            timerMode: matchSettings?.timerMode || 'none'
          }
        }
      });
      await cardMsg.save();

      await BondingChannel.findByIdAndUpdate(activeChannelId, {
        lastMessage: {
          content: `⚔️ Game Challenge: ${gameTitle} sent to ${targetUser.name}`,
          senderName: req.user.name,
          senderId: req.user._id,
          sentAt: new Date(),
          type: 'challenge'
        }
      });
    }

    res.status(201).json({ success: true, invitation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bonding/invitations - List user invitations
router.get('/invitations', async (req, res) => {
  try {
    const now = new Date();
    await GameInvitation.updateMany(
      { status: 'pending', expiresAt: { $lt: now } },
      { $set: { status: 'expired' } }
    );

    const [incoming, sent] = await Promise.all([
      GameInvitation.find({ 'recipient.userId': req.user._id }).sort({ createdAt: -1 }).limit(30),
      GameInvitation.find({ 'sender.userId': req.user._id }).sort({ createdAt: -1 }).limit(30)
    ]);

    res.json({ incoming, sent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/bonding/invitations/:id/respond - Accept, Decline, or Cancel invitation
router.put('/invitations/:id/respond', async (req, res) => {
  try {
    const { action } = req.body;
    const invitation = await GameInvitation.findById(req.params.id);
    if (!invitation) return res.status(404).json({ error: 'Invitation not found' });

    const isRecipient = invitation.recipient.userId.toString() === req.user._id.toString();
    const isSender = invitation.sender.userId.toString() === req.user._id.toString();

    if (action === 'cancel') {
      if (!isSender && !isRecipient) return res.status(403).json({ error: 'Unauthorized to cancel this invitation' });
      invitation.status = 'cancelled';
      invitation.respondedAt = new Date();
      await invitation.save();
      return res.json({ success: true, invitation });
    }

    if (action === 'decline') {
      if (!isRecipient) return res.status(403).json({ error: 'Only the invited employee can decline' });
      invitation.status = 'declined';
      invitation.respondedAt = new Date();
      await invitation.save();
      return res.json({ success: true, invitation });
    }

    if (action === 'accept') {
      if (!isRecipient) return res.status(403).json({ error: 'Only the invited employee can accept' });
      if (invitation.status !== 'pending') {
        return res.status(400).json({ error: `This invitation is already ${invitation.status}.` });
      }
      if (invitation.expiresAt < new Date()) {
        invitation.status = 'expired';
        await invitation.save();
        return res.status(400).json({ error: 'This invitation has expired.' });
      }

      // Initialize Game Engine state based on gameType
      let p1Role = 'white';
      let p2Role = 'black';
      let initialTurn = 'white';
      let initialGameState = {};
      let p1Time = 0;
      let p2Time = 0;

      const timerMode = invitation.matchSettings?.timerMode || 'none';
      if (timerMode === '3m') { p1Time = 180; p2Time = 180; }
      else if (timerMode === '5m') { p1Time = 300; p2Time = 300; }

      if (invitation.gameType === 'chess') {
        const chess = new Chess();
        p1Role = 'white';
        p2Role = 'black';
        initialTurn = 'white';
        initialGameState = {
          fen: chess.fen(),
          pgn: '',
          inCheck: false,
          isCheckmate: false,
          isDraw: false,
          isStalemate: false
        };
      } else if (invitation.gameType === 'tictactoe') {
        p1Role = 'X';
        p2Role = 'O';
        initialTurn = 'X';
        initialGameState = {
          board: Array(9).fill(null),
          turn: 'X'
        };
      } else if (invitation.gameType === 'connectfour') {
        p1Role = 'red';
        p2Role = 'yellow';
        initialTurn = 'red';
        initialGameState = {
          grid: Array(6).fill(null).map(() => Array(7).fill(null)),
          turn: 'red'
        };
      }

      const match = new GameMatch({
        invitationId: invitation._id,
        channelId: invitation.channelId,
        gameType: invitation.gameType,
        gameTitle: invitation.gameTitle,
        player1: {
          userId: invitation.sender.userId,
          name: invitation.sender.name,
          role: invitation.sender.role,
          assignedRole: p1Role
        },
        player2: {
          userId: invitation.recipient.userId,
          name: invitation.recipient.name,
          role: invitation.recipient.role,
          assignedRole: p2Role
        },
        status: 'active',
        turn: initialTurn,
        currentTurnUserId: invitation.sender.userId,
        gameState: initialGameState,
        matchSettings: {
          timerMode,
          p1TimeRemaining: p1Time,
          p2TimeRemaining: p2Time,
          lastMoveTime: new Date()
        },
        moves: []
      });

      await match.save();

      invitation.status = 'accepted';
      invitation.matchId = match._id;
      invitation.respondedAt = new Date();
      await invitation.save();

      // Post in channel that the match is live
      if (invitation.channelId) {
        const acceptNotice = new BondingMessage({
          channelId: invitation.channelId,
          sender: {
            userId: req.user._id,
            name: req.user.name,
            role: req.user.role,
            email: req.user.email
          },
          type: 'system',
          content: `⚔️ ${req.user.name} accepted ${invitation.sender.name}'s challenge for ${invitation.gameTitle}! The match has begun. Click below to enter!`
        });
        await acceptNotice.save();
      }

      return res.json({ success: true, invitation, match });
    }

    res.status(400).json({ error: 'Unknown response action' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bonding/matches/:id - Retrieve match state
router.get('/matches/:id', async (req, res) => {
  try {
    const match = await GameMatch.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const isP1 = match.player1.userId.toString() === req.user._id.toString();
    const isP2 = match.player2.userId.toString() === req.user._id.toString();

    if (!isP1 && !isP2) {
      return res.status(403).json({ error: 'You are not an authorized player in this match' });
    }

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/matches/:id/move - Authoritative move execution & validation
router.post('/matches/:id/move', async (req, res) => {
  try {
    const match = await GameMatch.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    if (match.status !== 'active') {
      return res.status(400).json({ error: `Match has ended (${match.status}). No more moves allowed.` });
    }

    const isP1 = match.player1.userId.toString() === req.user._id.toString();
    const isP2 = match.player2.userId.toString() === req.user._id.toString();

    if (!isP1 && !isP2) {
      return res.status(403).json({ error: 'You are not a player in this match' });
    }

    if (match.currentTurnUserId.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: 'It is not your turn yet!' });
    }

    const playerRole = isP1 ? match.player1.assignedRole : match.player2.assignedRole;
    const opponentUserId = isP1 ? match.player2.userId : match.player1.userId;
    const opponentName = isP1 ? match.player2.name : match.player1.name;

    // Handle timer countdown
    const now = new Date();
    if (match.matchSettings?.timerMode && match.matchSettings.timerMode !== 'none') {
      const elapsedSec = Math.max(0, Math.round((now - new Date(match.matchSettings.lastMoveTime)) / 1000));
      if (isP1) {
        match.matchSettings.p1TimeRemaining = Math.max(0, (match.matchSettings.p1TimeRemaining || 180) - elapsedSec);
        if (match.matchSettings.p1TimeRemaining <= 0) {
          match.status = 'completed';
          match.winnerId = match.player2.userId;
          match.winnerName = match.player2.name;
          match.winnerRole = match.player2.assignedRole;
          match.winningReason = 'timeout';
          match.completedAt = now;
          await awardGameMatchResult(match);
          await match.save();
          return res.json(match);
        }
      } else {
        match.matchSettings.p2TimeRemaining = Math.max(0, (match.matchSettings.p2TimeRemaining || 180) - elapsedSec);
        if (match.matchSettings.p2TimeRemaining <= 0) {
          match.status = 'completed';
          match.winnerId = match.player1.userId;
          match.winnerName = match.player1.name;
          match.winnerRole = match.player1.assignedRole;
          match.winningReason = 'timeout';
          match.completedAt = now;
          await awardGameMatchResult(match);
          await match.save();
          return res.json(match);
        }
      }
      match.matchSettings.lastMoveTime = now;
    }

    /* ── A. CHESS DUEL MOVE ── */
    if (match.gameType === 'chess') {
      const { move } = req.body;
      if (!move) return res.status(400).json({ error: 'Move data required' });

      const chess = new Chess(match.gameState.fen);
      let moveResult = null;
      try {
        moveResult = chess.move(move);
      } catch (e) {
        return res.status(400).json({ error: 'Illegal chess move: ' + e.message });
      }

      if (!moveResult) {
        return res.status(400).json({ error: 'Illegal chess move' });
      }

      match.gameState = {
        fen: chess.fen(),
        pgn: chess.pgn(),
        inCheck: chess.inCheck(),
        isCheckmate: chess.isCheckmate(),
        isDraw: chess.isDraw(),
        isStalemate: chess.isStalemate(),
        lastMove: moveResult
      };

      match.moves.push({
        moveNum: match.moves.length + 1,
        playerId: req.user._id,
        playerRole,
        moveData: moveResult,
        timestamp: now
      });

      if (chess.isCheckmate()) {
        match.status = 'completed';
        match.winnerId = req.user._id;
        match.winnerName = req.user.name;
        match.winnerRole = playerRole;
        match.winningReason = 'checkmate';
        match.completedAt = now;
        await awardGameMatchResult(match);
      } else if (chess.isDraw() || chess.isStalemate() || chess.isThreefoldRepetition() || chess.isInsufficientMaterial()) {
        match.status = 'draw';
        match.winningReason = chess.isStalemate() ? 'stalemate' : 'draw';
        match.completedAt = now;
        await awardGameMatchResult(match);
      } else {
        match.turn = chess.turn() === 'w' ? 'white' : 'black';
        match.currentTurnUserId = opponentUserId;
      }
    }

    /* ── B. TIC-TAC-TOE MOVE ── */
    else if (match.gameType === 'tictactoe') {
      const { cellIndex } = req.body;
      const idx = Number(cellIndex);
      if (isNaN(idx) || idx < 0 || idx > 8) {
        return res.status(400).json({ error: 'Invalid cell index (0-8)' });
      }

      const board = match.gameState.board || Array(9).fill(null);
      if (board[idx] !== null) {
        return res.status(400).json({ error: 'Cell is already occupied' });
      }

      board[idx] = playerRole; // 'X' or 'O'
      match.gameState.board = board;

      match.moves.push({
        moveNum: match.moves.length + 1,
        playerId: req.user._id,
        playerRole,
        moveData: { cellIndex: idx },
        timestamp: now
      });

      const winRes = checkTicTacToeWin(board);
      if (winRes && winRes.winner) {
        match.status = 'completed';
        match.winnerId = req.user._id;
        match.winnerName = req.user.name;
        match.winnerRole = playerRole;
        match.winningReason = '3-in-a-row';
        match.winningCells = winRes.line;
        match.completedAt = now;
        await awardGameMatchResult(match);
      } else if (winRes && winRes.draw) {
        match.status = 'draw';
        match.winningReason = 'board_full';
        match.completedAt = now;
        await awardGameMatchResult(match);
      } else {
        match.turn = playerRole === 'X' ? 'O' : 'X';
        match.currentTurnUserId = opponentUserId;
      }
    }

    /* ── C. CONNECT FOUR MOVE ── */
    else if (match.gameType === 'connectfour') {
      const { col } = req.body;
      const c = Number(col);
      if (isNaN(c) || c < 0 || c > 6) {
        return res.status(400).json({ error: 'Invalid column (0-6)' });
      }

      const grid = match.gameState.grid || Array(6).fill(null).map(() => Array(7).fill(null));
      if (grid[0][c] !== null) {
        return res.status(400).json({ error: 'This column is already full! Choose another column.' });
      }

      // Drop disc to the lowest empty row in column c
      let targetRow = -1;
      for (let r = 5; r >= 0; r--) {
        if (grid[r][c] === null) {
          targetRow = r;
          break;
        }
      }

      grid[targetRow][c] = playerRole; // 'red' or 'yellow'
      match.gameState.grid = grid;

      match.moves.push({
        moveNum: match.moves.length + 1,
        playerId: req.user._id,
        playerRole,
        moveData: { col: c, row: targetRow },
        timestamp: now
      });

      const winRes = checkConnectFourWin(grid);
      if (winRes && winRes.winner) {
        match.status = 'completed';
        match.winnerId = req.user._id;
        match.winnerName = req.user.name;
        match.winnerRole = playerRole;
        match.winningReason = 'four-in-a-row';
        match.winningCells = winRes.cells;
        match.completedAt = now;
        await awardGameMatchResult(match);
      } else if (winRes && winRes.draw) {
        match.status = 'draw';
        match.winningReason = 'board_full';
        match.completedAt = now;
        await awardGameMatchResult(match);
      } else {
        match.turn = playerRole === 'red' ? 'yellow' : 'red';
        match.currentTurnUserId = opponentUserId;
      }
    }

    match.drawOfferedBy = null;
    match.markModified('gameState');
    match.markModified('matchSettings');
    await match.save();

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/matches/:id/action - Resign, Draw Offer/Accept, Rematch
router.post('/matches/:id/action', async (req, res) => {
  try {
    const { action } = req.body;
    const match = await GameMatch.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const isP1 = match.player1.userId.toString() === req.user._id.toString();
    const isP2 = match.player2.userId.toString() === req.user._id.toString();

    if (!isP1 && !isP2) {
      return res.status(403).json({ error: 'You are not a player in this match' });
    }

    const opponent = isP1 ? match.player2 : match.player1;
    const now = new Date();

    if (action === 'resign') {
      if (match.status !== 'active') return res.status(400).json({ error: 'Match is already finished' });
      match.status = 'completed';
      match.winnerId = opponent.userId;
      match.winnerName = opponent.name;
      match.winnerRole = opponent.assignedRole;
      match.winningReason = 'resignation';
      match.completedAt = now;
      await awardGameMatchResult(match);
      await match.save();
      return res.json({ success: true, match });
    }

    if (action === 'offer_draw') {
      if (match.status !== 'active') return res.status(400).json({ error: 'Match is not active' });
      match.drawOfferedBy = req.user._id;
      await match.save();
      return res.json({ success: true, match, message: 'Draw offer sent to opponent' });
    }

    if (action === 'decline_draw') {
      match.drawOfferedBy = null;
      await match.save();
      return res.json({ success: true, match });
    }

    if (action === 'accept_draw') {
      if (!match.drawOfferedBy || match.drawOfferedBy.toString() === req.user._id.toString()) {
        return res.status(400).json({ error: 'No draw offer from opponent to accept' });
      }
      match.status = 'draw';
      match.winningReason = 'mutual_draw';
      match.drawOfferedBy = null;
      match.completedAt = now;
      await awardGameMatchResult(match);
      await match.save();
      return res.json({ success: true, match });
    }

    if (action === 'rematch') {
      if (match.status === 'active') {
        return res.status(400).json({ error: 'Cannot rematch while the current match is still active' });
      }

      // Swap roles for fair play
      const newP1 = {
        userId: match.player2.userId,
        name: match.player2.name,
        role: match.player2.role,
        assignedRole: match.player1.assignedRole
      };
      const newP2 = {
        userId: match.player1.userId,
        name: match.player1.name,
        role: match.player1.role,
        assignedRole: match.player2.assignedRole
      };

      let initialTurn = newP1.assignedRole;
      let initialGameState = {};
      let p1Time = 0;
      let p2Time = 0;
      const timerMode = match.matchSettings?.timerMode || 'none';
      if (timerMode === '3m') { p1Time = 180; p2Time = 180; }
      else if (timerMode === '5m') { p1Time = 300; p2Time = 300; }

      if (match.gameType === 'chess') {
        const chess = new Chess();
        initialTurn = 'white';
        initialGameState = {
          fen: chess.fen(),
          pgn: '',
          inCheck: false,
          isCheckmate: false,
          isDraw: false,
          isStalemate: false
        };
      } else if (match.gameType === 'tictactoe') {
        initialTurn = 'X';
        initialGameState = {
          board: Array(9).fill(null),
          turn: 'X'
        };
      } else if (match.gameType === 'connectfour') {
        initialTurn = 'red';
        initialGameState = {
          grid: Array(6).fill(null).map(() => Array(7).fill(null)),
          turn: 'red'
        };
      }

      const newMatch = new GameMatch({
        channelId: match.channelId,
        gameType: match.gameType,
        gameTitle: match.gameTitle,
        player1: newP1,
        player2: newP2,
        status: 'active',
        turn: initialTurn,
        currentTurnUserId: newP1.userId,
        gameState: initialGameState,
        matchSettings: {
          timerMode,
          p1TimeRemaining: p1Time,
          p2TimeRemaining: p2Time,
          lastMoveTime: now
        },
        moves: []
      });

      await newMatch.save();
      return res.json({ success: true, match: newMatch });
    }

    res.status(400).json({ error: 'Unknown match action' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bonding/leaderboard - Top bonding champions with multi-game statistics
router.get('/leaderboard', async (req, res) => {
  try {
    const rawLeaders = await BondingScore.find().sort({ points: -1, wins: -1 }).limit(50);
    const leaders = rawLeaders.map(s => {
      const total = s.gamesPlayed || 0;
      const winRate = total > 0 ? Math.round(((s.wins || 0) / total) * 100) : 0;
      return {
        _id: s._id,
        userId: s.userId,
        userName: s.userName,
        userRole: s.userRole,
        points: s.points || 0,
        wins: s.wins || 0,
        losses: s.losses || 0,
        draws: s.draws || 0,
        gamesPlayed: total,
        winRate,
        chessRating: s.chessRating || 1200,
        gameStats: s.gameStats || {},
        badges: s.badges || [],
        streak: s.streak || 0
      };
    });
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
