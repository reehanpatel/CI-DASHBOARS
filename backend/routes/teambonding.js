const express = require('express');
const mongoose = require('mongoose');
const BondingChannel = mongoose.models.BondingChannel || require('../models/BondingChannel');
const BondingMessage = mongoose.models.BondingMessage || require('../models/BondingMessage');
const BondingScore = mongoose.models.BondingScore || require('../models/BondingScore');
const User = mongoose.models.User || require('../models/User');
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
    const users = await User.find({ active: true }, 'name email role _id').sort({ name: 1 });
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
      const otherUsers = await User.find({ _id: { $in: memberIds, $ne: req.user._id } });
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

      const users = await User.find({ _id: { $in: toFetch } });
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

// GET /api/bonding/leaderboard - Top bonding champions
router.get('/leaderboard', async (req, res) => {
  try {
    const leaders = await BondingScore.find().sort({ points: -1, wins: -1 }).limit(30);
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
