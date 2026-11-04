const express = require('express');
const mongoose = require('mongoose');
const BondingChannel = mongoose.models.BondingChannel || require('../models/BondingChannel');
const BondingMessage = mongoose.models.BondingMessage || require('../models/BondingMessage');
const BondingScore = mongoose.models.BondingScore || require('../models/BondingScore');
const GameInvitation = mongoose.models.GameInvitation || require('../models/GameInvitation');
const GameMatch = mongoose.models.GameMatch || require('../models/GameMatch');
const User = mongoose.models.User || require('../models/User');
const Notification = mongoose.models.Notification || require('../models/Notification');
const { Chess } = require('chess.js');
const { verifyToken } = require('../middleware/auth');
const { createNotificationForChatMessage, createNotificationForGameChallenge, recordSyncUpdate } = require('../utils/notify');

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
    if (gameType === 'ludo' && isWin) badges.add('Ludo Master');

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

// DELETE /api/bonding/channels/:id - Delete a group channel or 1-on-1 direct chat
// In group chat, ONLY the person who created the group (or superadmin) can delete it
router.delete('/channels/:id', async (req, res) => {
  try {
    const channel = await BondingChannel.findById(req.params.id);
    if (!channel) return res.status(404).json({ error: 'Conversation not found' });

    const myId = req.user._id.toString();
    const isMember = channel.members && channel.members.some(m => m.userId && m.userId.toString() === myId);
    const isCreator = channel.createdBy && channel.createdBy.userId && channel.createdBy.userId.toString() === myId;
    const isSuperadmin = req.user.role === 'superadmin';

    if (channel.type === 'group') {
      if (!isCreator && !isSuperadmin) {
        return res.status(403).json({ error: 'Only the person who made this group can delete it' });
      }
    } else {
      if (!isMember && !isSuperadmin) {
        return res.status(403).json({ error: 'Not authorized to delete this conversation' });
      }
    }

    // Permanently remove channel, its messages, and any invitations / matches tied to it
    await BondingChannel.findByIdAndDelete(channel._id);
    await BondingMessage.deleteMany({ channelId: channel._id });
    await GameInvitation.deleteMany({ channelId: channel._id });
    await GameMatch.deleteMany({ channelId: channel._id });

    res.json({ message: 'Conversation deleted successfully', channelId: channel._id, type: channel.type });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/channels/:id/leave - Leave a group chat
router.post('/channels/:id/leave', async (req, res) => {
  try {
    const channel = await BondingChannel.findById(req.params.id);
    if (!channel) return res.status(404).json({ error: 'Group not found' });
    if (channel.type === 'direct') {
      return res.status(400).json({ error: 'Cannot leave a 1-on-1 direct chat' });
    }

    const myId = req.user._id.toString();
    const memberIndex = (channel.members || []).findIndex(m => m.userId && m.userId.toString() === myId);
    if (memberIndex === -1) {
      return res.status(400).json({ error: 'You are not a member of this group' });
    }

    // Remove the current user from group members
    channel.members.splice(memberIndex, 1);

    const notice = `${req.user.name} left the group.`;
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

    res.json({ message: 'You have left the group successfully', channelId: channel._id });
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

    // Trigger Notification for recipient(s)
    if (type === 'challenge') {
      if (challengeData && challengeData.targetUserId) {
        createNotificationForGameChallenge({
          title: `🎮 ${challengeData.gameTitle || 'Game Challenge'} from ${req.user.name}!`,
          message: `${req.user.name} challenged you to ${challengeData.gameTitle || 'a game'} in #${channel.name}!`,
          targetUserId: challengeData.targetUserId,
          channelId: channel._id,
          gameType: challengeData.gameType
        }).catch(err => console.error('Challenge notif error:', err.message));
      } else {
        // Open group challenge: notify members of group
        for (const m of (channel.members || [])) {
          if (m.userId && m.userId.toString() !== req.user._id.toString()) {
            createNotificationForGameChallenge({
              title: `🎮 New ${challengeData?.gameTitle || 'Game Challenge'} in #${channel.name}!`,
              message: `${req.user.name} launched a ${challengeData?.gameTitle || 'challenge'} for the team!`,
              targetUserId: m.userId,
              channelId: channel._id,
              gameType: challengeData?.gameType
            }).catch(err => console.error('Group challenge notif error:', err.message));
          }
        }
      }
    } else {
      createNotificationForChatMessage({
        channel,
        message: msg,
        sender: req.user
      }).catch(err => console.error('Chat notif error:', err.message));
    }

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

// DELETE /api/bonding/messages/:id - Delete a message
router.delete('/messages/:id', async (req, res) => {
  try {
    const msg = await BondingMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });

    const myId = req.user._id.toString();
    const isSender = msg.sender && msg.sender.userId && msg.sender.userId.toString() === myId;
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);

    // Verify channel membership
    const channel = await BondingChannel.findById(msg.channelId);
    const isMember = channel && channel.members && channel.members.some(m => m.userId && m.userId.toString() === myId);

    if (!isSender && !isAdmin && !isMember) {
      return res.status(403).json({ error: 'Not authorized to delete this message' });
    }

    await BondingMessage.findByIdAndDelete(msg._id);

    // Update channel's lastMessage if needed
    if (channel) {
      const latestMsg = await BondingMessage.findOne({ channelId: channel._id }).sort({ createdAt: -1 });
      if (latestMsg) {
        channel.lastMessage = {
          content: latestMsg.content || (latestMsg.type === 'challenge' ? `Game Challenge: ${latestMsg.challengeData?.gameTitle}` : ''),
          senderName: latestMsg.sender?.name || '',
          senderId: latestMsg.sender?.userId || null,
          sentAt: latestMsg.createdAt,
          type: latestMsg.type
        };
      } else {
        channel.lastMessage = {
          content: '',
          senderName: '',
          senderId: null,
          sentAt: channel.createdAt,
          type: 'text'
        };
      }
      await channel.save();
    }

    res.json({ message: 'Message deleted successfully', messageId: msg._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bonding/channels/:id/messages - Clear all messages in a conversation
router.delete('/channels/:id/messages', async (req, res) => {
  try {
    const channel = await BondingChannel.findById(req.params.id);
    if (!channel) return res.status(404).json({ error: 'Conversation not found' });

    const myId = req.user._id.toString();
    const isMember = channel.members && channel.members.some(m => m.userId && m.userId.toString() === myId);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);

    if (!isMember && !isAdmin) {
      return res.status(403).json({ error: 'Not authorized to clear messages in this conversation' });
    }

    await BondingMessage.deleteMany({ channelId: channel._id });

    channel.lastMessage = {
      content: '',
      senderName: '',
      senderId: null,
      sentAt: new Date(),
      type: 'text'
    };
    await channel.save();

    res.json({ message: 'All messages cleared successfully', channelId: channel._id });
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
    } else if (isP2Winner) {
      s2.wins += 1;
      s2.streak = (s2.streak || 0) + 1;
      s2.points += gameType === 'chess' ? 50 : 35;
      s2.gameStats[gameType].wins += 1;

      s1.losses = (s1.losses || 0) + 1;
      s1.streak = 0;
      s1.points += 10;
      s1.gameStats[gameType].losses += 1;
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
        id: 'ludo',
        name: 'Ludo Duel',
        icon: '🎲',
        desc: 'Classic Ludo with 4 pawns per base! Play 2P, 3P & 4P multiplayer matches with your colleagues.',
        duration: '3–8 mins',
        modes: ['2P Duel', '3P Battle', '4P Royale']
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
        $or: [
          { 'player1.userId': req.user._id },
          { 'player2.userId': req.user._id },
          { 'players.userId': req.user._id },
          { 'gameState.players.userId': req.user._id },
          { 'gameState.players.userId': req.user._id.toString() }
        ]
      }).sort({ updatedAt: -1 }),
      GameMatch.find({
        status: { $in: ['completed', 'draw', 'resigned', 'abandoned'] },
        $or: [
          { 'player1.userId': req.user._id },
          { 'player2.userId': req.user._id },
          { 'players.userId': req.user._id },
          { 'gameState.players.userId': req.user._id },
          { 'gameState.players.userId': req.user._id.toString() }
        ]
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
        gameStats: {}
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /api/bonding/matches/instant-ludo - Instant launch for 2P, 3P, or 4P Colleague Ludo
router.post('/matches/instant-ludo', async (req, res) => {
  try {
    const { playerCount = 2, targetUserIds = [] } = req.body;
    const numPlayers = Math.min(4, Math.max(2, Number(playerCount) || 2));
    const now = new Date();

    const allColors = ['red', 'green', 'yellow', 'blue'];
    const activeColors = numPlayers === 2
      ? ['red', 'green']
      : (numPlayers === 3
        ? ['red', 'green', 'yellow']
        : ['red', 'green', 'yellow', 'blue']);

    const playersList = [];
    // Player 1 is current user (Red)
    playersList.push({
      userId: req.user._id,
      name: req.user.name,
      role: req.user.role,
      color: 'red',
      assignedRole: 'red'
    });

    // Populate remaining active players strictly from selected human colleagues
    for (let i = 1; i < activeColors.length; i++) {
      const col = activeColors[i];
      const targetId = targetUserIds[i - 1];
      let targetUser = null;
      if (targetId) {
        targetUser = await User.findById(targetId);
      }

      if (targetUser && targetUser.active) {
        playersList.push({
          userId: targetUser._id,
          name: targetUser.name,
          role: targetUser.role,
          color: col,
          assignedRole: col
        });
      } else {
        playersList.push({
          userId: req.user._id,
          name: `Colleague ${i + 1}`,
          role: 'employee',
          color: col,
          assignedRole: col
        });
      }
    }

    // Initialize 4 pawns in single base for each color
    const tokens = {
      red: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
      green: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
      yellow: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
      blue: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }]
    };

    const initialGameState = {
      playerCount: numPlayers,
      activeColors,
      players: playersList,
      tokens,
      turnColor: 'red',
      dice: null,
      rolled: false,
      lastRoll: null,
      lastActionText: `Match live (${numPlayers} Players)! Red rolls first.`
    };

    const match = new GameMatch({
      gameType: 'ludo',
      gameTitle: `Ludo ${numPlayers}P Match (4 Pawns)`,
      player1: {
        userId: playersList[0].userId,
        name: playersList[0].name,
        role: playersList[0].role,
        assignedRole: 'red'
      },
      player2: {
        userId: playersList[1].userId,
        name: playersList[1].name,
        role: playersList[1].role,
        assignedRole: playersList[1].assignedRole || 'green'
      },
      players: playersList,
      playerCount: numPlayers,
      status: 'active',
      turn: 'red',
      currentTurnUserId: req.user._id,
      gameState: initialGameState,
      matchSettings: {
        timerMode: 'none',
        lastMoveTime: now
      },
      moves: []
    });

    await match.save();

    // Notify all challenged opponents so they immediately see the live game
    for (const pl of playersList.slice(1)) {
      if (pl.userId && pl.userId.toString() !== req.user._id.toString()) {
        createNotificationForGameChallenge({
          title: '🎮 Ludo Match Started!',
          message: `${req.user.name} challenged you to a ${numPlayers}P Ludo match! Tap to enter arena.`,
          targetUserId: pl.userId,
          gameType: 'ludo'
        }).catch(() => {});
      }
    }

    recordSyncUpdate('bonding');
    res.json({ success: true, match, _id: match._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bonding/invitations - Create and deliver a game challenge
router.post('/invitations', async (req, res) => {
  try {
    const { gameType, targetUserId, matchSettings, channelId } = req.body;

    if (!['chess', 'tictactoe', 'ludo'].includes(gameType)) {
      return res.status(400).json({ error: 'Invalid game type. Choose chess, tictactoe, or ludo.' });
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
      ludo: 'Ludo Duel'
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

    // Trigger Notification for the challenged colleague
    createNotificationForGameChallenge({
      title: `🎮 ${gameTitle} Challenge from ${req.user.name}!`,
      message: `${req.user.name} challenged you to a game of ${gameTitle}! Accept the challenge to play.`,
      targetUserId: targetUser._id,
      channelId: activeChannelId,
      invitationId: invitation._id,
      gameType
    }).catch(err => console.error('Challenge invite notif error:', err.message));

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

    if (action === 'cancel' || action === 'decline') {
      if (action === 'cancel' && !isSender && !isRecipient) return res.status(403).json({ error: 'Unauthorized to cancel this invitation' });
      if (action === 'decline' && !isRecipient) return res.status(403).json({ error: 'Only the invited employee can decline' });

      invitation.status = action === 'cancel' ? 'cancelled' : 'declined';
      invitation.respondedAt = new Date();
      await invitation.save();

      // Remove any challenge card messages from channel chat so it completely goes away
      await BondingMessage.deleteMany({
        $or: [
          { 'challengeData.gameState.invitationId': invitation._id },
          { 'challengeData.gameState.invitationId': invitation._id.toString() }
        ]
      });

      // Clean up any lingering notifications for this challenge
      await Notification.deleteMany({
        $or: [
          { invitationId: invitation._id },
          { invitationId: invitation._id.toString() }
        ]
      });

      recordSyncUpdate('bonding');
      recordSyncUpdate('games');
      return res.json({ success: true, invitation, removed: true });
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
      } else if (invitation.gameType === 'ludo') {
        const pCount = Number(invitation.matchSettings?.playerCount) || 2;
        const activeColors = pCount === 3 ? ['red', 'green', 'yellow'] : (pCount === 4 ? ['red', 'green', 'yellow', 'blue'] : ['red', 'green']);
        p1Role = 'red';
        p2Role = 'green';
        initialTurn = 'red';

        const playersList = [
          { userId: invitation.sender.userId, name: invitation.sender.name, role: invitation.sender.role, color: 'red', assignedRole: 'red', isBot: false },
          { userId: invitation.recipient.userId, name: invitation.recipient.name, role: invitation.recipient.role, color: 'green', assignedRole: 'green', isBot: false }
        ];



        initialGameState = {
          playerCount: pCount,
          activeColors,
          players: playersList,
          tokens: {
            red: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
            green: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
            yellow: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
            blue: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }]
          },
          turnColor: 'red',
          dice: null,
          rolled: false,
          lastRoll: null,
          extraRoll: false,
          lastActionText: `Match started (${pCount}P)! Red rolls first.`
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
        players: (invitation.gameType === 'ludo' && playersList) ? playersList : [
          { userId: invitation.sender.userId, name: invitation.sender.name, role: invitation.sender.role, color: p1Role, assignedRole: p1Role },
          { userId: invitation.recipient.userId, name: invitation.recipient.name, role: invitation.recipient.role, color: p2Role, assignedRole: p2Role }
        ],
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

      // Notify the challenger that their challenge was accepted
      createNotificationForGameChallenge({
        title: `🎮 Challenge Accepted by ${req.user.name}!`,
        message: `${req.user.name} accepted your ${invitation.gameTitle} challenge! Enter the match arena to play.`,
        targetUserId: invitation.sender.userId,
        channelId: invitation.channelId,
        invitationId: invitation._id,
        gameType: invitation.gameType
      }).catch(err => console.error('Challenge accepted notif error:', err.message));

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

    const isP1 = match.player1 && match.player1.userId && match.player1.userId.toString() === req.user._id.toString();
    const isP2 = match.player2 && match.player2.userId && match.player2.userId.toString() === req.user._id.toString();
    const isLudoPlayer = (match.players || match.gameState?.players || []).some(p => p.userId && p.userId.toString() === req.user._id.toString());

    if (!isP1 && !isP2 && !isLudoPlayer) {
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

    const isP1 = match.player1 && match.player1.userId && match.player1.userId.toString() === req.user._id.toString();
    const isP2 = match.player2 && match.player2.userId && match.player2.userId.toString() === req.user._id.toString();
    const isLudoPlayer = (match.players || match.gameState?.players || []).some(p => p.userId && p.userId.toString() === req.user._id.toString());

    if (!isP1 && !isP2 && !isLudoPlayer) {
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

    /* ── D. LUDO MOVE (2P, 3P, 4P WITH 4 PAWNS) ── */
    else if (match.gameType === 'ludo') {
      const { action, tokenId } = req.body;
      const state = match.gameState || {};
      const activeColors = state.activeColors || ['red', 'green'];
      const turnColor = state.turnColor || match.turn || 'red';

      // Ensure tokens structure has all 4 pawns for each color
      if (!state.tokens) {
        state.tokens = {
          red: state.p1Tokens || [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
          green: state.p2Tokens || [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
          yellow: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }],
          blue: [{ id: 0, step: -1 }, { id: 1, step: -1 }, { id: 2, step: -1 }, { id: 3, step: -1 }]
        };
      }

      const myTokens = state.tokens[turnColor] || [];
      const safeSquares = [0, 8, 13, 21, 26, 34, 39, 47];
      const startIndices = { red: 0, green: 13, yellow: 26, blue: 39 };

      function getTrackIndex(col, step) {
        if (step < 0 || step > 50) return -1;
        return (startIndices[col] + step) % 52;
      }

      // ACTION 1: ROLL DICE
      if (action === 'roll') {
        if (state.rolled) {
          return res.status(400).json({ error: 'You have already rolled! Select a pawn to move.' });
        }

        const dice = Math.floor(Math.random() * 6) + 1;
        state.dice = dice;
        state.lastRoll = dice;
        state.lastRollColor = turnColor;
        state.lastRollBy = req.user.name;
        state.rolled = true;

        // Check if any pawn can move
        const movable = [];
        myTokens.forEach(t => {
          if (t.step === -1 && dice === 6) movable.push(t.id);
          else if (t.step >= 0 && t.step + dice <= 56) movable.push(t.id);
        });

        if (movable.length === 0) {
          state.rolled = false;
          state.dice = null;
          state.lastActionText = `${req.user.name} (${turnColor.toUpperCase()}) rolled a ${dice} — No legal moves. Turn passed!`;

          match.moves.push({
            moveNum: match.moves.length + 1,
            playerId: req.user._id,
            playerRole: turnColor,
            moveData: { action: 'roll', dice, movable: false },
            timestamp: now
          });

          // Advance turn to next color
          const curIdx = activeColors.indexOf(turnColor);
          const nextColor = activeColors[(curIdx + 1) % activeColors.length];
          state.turnColor = nextColor;
          match.turn = nextColor;

          const nextPl = (state.players || []).find(p => p.color === nextColor);
          match.currentTurnUserId = nextPl ? nextPl.userId : req.user._id;
        } else {
          state.lastActionText = `${req.user.name} (${turnColor.toUpperCase()}) rolled a ${dice}! Select a pawn to advance.`;
        }

        match.gameState = state;
        match.drawOfferedBy = null;
        match.markModified('gameState');
        match.markModified('matchSettings');
        await match.save();
        return res.json(match);
      }

      // ACTION 2: MOVE PAWN
      else if (action === 'move') {
        if (!state.rolled || !state.dice) {
          return res.status(400).json({ error: 'You must roll the dice first!' });
        }

        const tId = Number(tokenId);
        const token = myTokens.find(t => t.id === tId);
        if (!token) {
          return res.status(400).json({ error: 'Invalid pawn ID' });
        }

        const dice = state.dice;
        let canMove = false;
        if (token.step === -1 && dice === 6) canMove = true;
        else if (token.step >= 0 && token.step + dice <= 56) canMove = true;

        if (!canMove) {
          return res.status(400).json({ error: 'This pawn cannot move with the current roll' });
        }

        // Advance pawn
        let oldStep = token.step;
        if (token.step === -1) {
          token.step = 0; // Launch out of base
        } else {
          token.step += dice;
        }

        let captured = false;
        let bonusRoll = dice === 6;

        // Check capture against all active opponent colors on shared track (step 0..50)
        if (token.step >= 0 && token.step <= 50) {
          const myTrackIdx = getTrackIndex(turnColor, token.step);
          if (!safeSquares.includes(myTrackIdx)) {
            activeColors.forEach(otherCol => {
              if (otherCol !== turnColor) {
                const otherTokens = state.tokens[otherCol] || [];
                otherTokens.forEach(oppT => {
                  if (oppT.step >= 0 && oppT.step <= 50 && getTrackIndex(otherCol, oppT.step) === myTrackIdx) {
                    oppT.step = -1; // Send back to base!
                    captured = true;
                    bonusRoll = true;
                  }
                });
              }
            });
          }
        }

        // Bonus roll if pawn reached Home (56)
        if (token.step === 56) {
          bonusRoll = true;
        }

        match.moves.push({
          moveNum: match.moves.length + 1,
          playerId: req.user._id,
          playerRole: turnColor,
          moveData: { action: 'move', tokenId: tId, fromStep: oldStep, toStep: token.step, dice, captured },
          timestamp: now
        });

        // Check WIN CONDITION (all 4 pawns of player reached Home 56)
        const won = myTokens.every(t => t.step === 56);
        if (won) {
          match.status = 'completed';
          match.winnerId = req.user._id;
          match.winnerName = req.user.name;
          match.winnerRole = turnColor;
          match.winningReason = 'All 4 pawns reached Home! 🏆';
          match.completedAt = now;
          state.lastActionText = `🏆 ${req.user.name} (${turnColor.toUpperCase()}) reached Home with all 4 pawns and won!`;
          match.gameState = state;
          await awardGameMatchResult(match);
          match.drawOfferedBy = null;
          match.markModified('gameState');
          match.markModified('matchSettings');
          await match.save();
          return res.json(match);
        }

        state.rolled = false;
        state.dice = null;

        if (bonusRoll) {
          const reason = captured ? 'Cut opponent pawn!' : (token.step === 56 ? 'Reached Home!' : 'Rolled a 6!');
          state.lastActionText = `${req.user.name} moved Pawn ${tId + 1}. ${reason} Bonus roll awarded! 🎲`;
        } else {
          state.lastActionText = `${req.user.name} moved Pawn ${tId + 1}.`;
          const curIdx = activeColors.indexOf(turnColor);
          const nextColor = activeColors[(curIdx + 1) % activeColors.length];
          state.turnColor = nextColor;
          match.turn = nextColor;

          const nextPl = (state.players || []).find(p => p.color === nextColor);
          match.currentTurnUserId = nextPl ? nextPl.userId : req.user._id;
        }

        match.gameState = state;
      } else {
        return res.status(400).json({ error: 'Unknown Ludo action. Use roll or move.' });
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


// POST /api/bonding/matches/:id/bot-move - Disabled
router.post('/matches/:id/bot-move', async (req, res) => {
  return res.status(400).json({ error: 'AI bot moves are disabled' });
});

// POST /api/bonding/matches/:id/action - Resign, Draw Offer/Accept, Rematch
router.post('/matches/:id/action', async (req, res) => {
  try {
    const { action } = req.body;
    const match = await GameMatch.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const isP1 = match.player1 && match.player1.userId && match.player1.userId.toString() === req.user._id.toString();
    const isP2 = match.player2 && match.player2.userId && match.player2.userId.toString() === req.user._id.toString();
    const isLudoPlayer = (match.players || match.gameState?.players || []).some(p => p.userId && p.userId.toString() === req.user._id.toString());

    if (!isP1 && !isP2 && !isLudoPlayer) {
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
      } else if (match.gameType === 'ludo') {
        initialTurn = 'red';
        initialGameState = {
          p1Tokens: [{ id: 0, step: -1 }, { id: 1, step: -1 }],
          p2Tokens: [{ id: 0, step: -1 }, { id: 1, step: -1 }],
          dice: null,
          rolled: false,
          lastRoll: null,
          extraRoll: false,
          lastActionText: 'Rematch started! Red rolls first.'
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

// DELETE /api/bonding/matches/:id - Delete a single game match
router.delete('/matches/:id', async (req, res) => {
  try {
    const match = await GameMatch.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const myId = req.user._id.toString();
    const isP1 = match.player1 && match.player1.userId && match.player1.userId.toString() === myId;
    const isP2 = match.player2 && match.player2.userId && match.player2.userId.toString() === myId;
    const isPlayer = (match.players || match.gameState?.players || []).some(p => p.userId && p.userId.toString() === myId);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);

    if (!isP1 && !isP2 && !isPlayer && !isAdmin) {
      return res.status(403).json({ error: 'Not authorized to delete this match' });
    }

    await GameMatch.findByIdAndDelete(match._id);

    if (match.invitationId) {
      await GameInvitation.findByIdAndDelete(match.invitationId);
    }

    // Clean up related challenge message if any
    await BondingMessage.deleteMany({
      $or: [
        { 'challengeData.gameState.matchId': match._id.toString() },
        { 'challengeData.gameState.invitationId': match.invitationId }
      ]
    });

    recordSyncUpdate('bonding');
    recordSyncUpdate('games');
    res.json({ message: 'Match deleted successfully', matchId: match._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bonding/matches - Clear / bulk delete matches
router.delete('/matches', async (req, res) => {
  try {
    const { filter } = req.query; // 'completed' or 'all'
    const myId = req.user._id;

    let query = {
      $or: [
        { 'player1.userId': myId },
        { 'player2.userId': myId },
        { 'players.userId': myId },
        { 'gameState.players.userId': myId },
        { 'gameState.players.userId': myId.toString() }
      ]
    };

    if (filter === 'completed') {
      query.status = { $in: ['completed', 'draw', 'resigned', 'abandoned'] };
    }

    const matchesToDelete = await GameMatch.find(query);
    const matchIds = matchesToDelete.map(m => m._id);

    if (matchIds.length > 0) {
      await GameMatch.deleteMany({ _id: { $in: matchIds } });
      await GameInvitation.deleteMany({ matchId: { $in: matchIds } });
    }

    res.json({ message: 'Matches deleted successfully', deletedCount: matchIds.length });
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
