/**
 * CI360 TEAM BONDING & GAMING MODULE
 * Real-time direct & group team chats, member management (add/remove),
 * interactive mini-games (Trivia Blitz, Tic-Tac-Toe Clash, Wordle Duel, Speed Typer),
 * 1-on-1 & group challenge showdowns, and company leaderboard.
 */

import {
  apiGet,
  apiPost,
  apiPut,
  escapeHtml,
  flashToast
} from './api.js';

// Curated Trivia Questions Bank
const TRIVIA_BANK = [
  {
    q: "Which planet in our solar system is known for its prominent rings?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    correct: 2
  },
  {
    q: "In computer science, what does 'API' stand for?",
    options: ["Application Programming Interface", "Automated Program Integration", "Advanced Process Interaction", "Applied Protocol Identifier"],
    correct: 0
  },
  {
    q: "Who is known as the inventor of the World Wide Web?",
    options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Alan Turing"],
    correct: 1
  },
  {
    q: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Platinum"],
    correct: 1
  },
  {
    q: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2
  },
  {
    q: "How many bits are in a single byte?",
    options: ["4", "8", "16", "32"],
    correct: 1
  },
  {
    q: "Which company originally created the JavaScript programming language in 1995?",
    options: ["Microsoft", "Netscape", "Sun Microsystems", "Oracle"],
    correct: 1
  },
  {
    q: "What is the speed of light in vacuum approximately?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "100,000 km/s"],
    correct: 0
  },
  {
    q: "Which mammal is known to have the most powerful bite force relative to size?",
    options: ["Lion", "Hippopotamus", "Hyena", "Grizzly Bear"],
    correct: 1
  },
  {
    q: "In typography and design, what does 'UI' stand for?",
    options: ["User Interface", "Universal Input", "Unified Identifier", "User Interaction"],
    correct: 0
  }
];

// Curated Wordle mystery words
const WORDLE_WORDS = ["FOCUS", "SMART", "BRAIN", "POWER", "LOGIC", "SWIFT", "CLOUD", "REACT", "BUILD", "DREAM", "PIVOT", "LEADER"];

// Speed Typist sample quotes
const TYPING_PASSAGES = [
  "Creativity is intelligence having fun. Great teams build great products through seamless collaboration and trust.",
  "Simplicity is prerequisite for reliability. Stay curious, keep learning, and celebrate every team milestone.",
  "Coming together is a beginning, staying together is progress, and working together is success."
];

export async function initTeamBonding(container, options = {}) {
  const currentUser = options.currentUser || {};
  let currentTab = 'chat'; // 'chat' | 'arcade' | 'leaderboard'
  let channels = [];
  let activeChannel = null;
  let colleagues = [];
  let messages = [];
  let pollInterval = null;
  let isSending = false;

  // Render Skeleton / Base Container
  container.innerHTML = `
    <div class="bonding-wrap" id="bonding-app-root">
      <div class="bonding-nav-bar">
        <div class="bonding-nav-left">
          <div class="bonding-logo-badge">🎮</div>
          <div>
            <h2 class="bonding-title">Team Bonding & Arcade</h2>
            <p class="bonding-subtitle">Direct Chat · Team Lounges · Friendly Game Challenges & Leaderboard</p>
          </div>
        </div>
        <div class="bonding-nav-tabs">
          <button class="bonding-nav-tab active" data-tab="chat">
            <span>💬</span> <span>Messages & Lounges</span>
          </button>
          <button class="bonding-nav-tab" data-tab="arcade">
            <span>🕹️</span> <span>Games Arcade</span>
          </button>
          <button class="bonding-nav-tab" data-tab="leaderboard">
            <span>🏆</span> <span>Leaderboard</span>
          </button>
        </div>
      </div>

      <div class="bonding-content" id="bonding-tab-content">
        <div class="bonding-loading-skeleton">Loading Team Bonding...</div>
      </div>
    </div>

    <!-- Modals container -->
    <div id="bonding-modals-root"></div>
  `;

  // Inject Styles for Team Bonding
  injectBondingStyles();

  // Tab Switching
  const navTabs = container.querySelectorAll('.bonding-nav-tab');
  navTabs.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      navTabs.forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      currentTab = tabBtn.dataset.tab;
      renderActiveTab();
    });
  });

  // Fetch initial colleagues & channels
  await loadInitialData();
  renderActiveTab();

  // Real-time polling for messages & channels
  startPolling();

  // Cleanup on unmount
  const observer = new MutationObserver((mutations, obs) => {
    if (!document.body.contains(container)) {
      if (pollInterval) clearInterval(pollInterval);
      obs.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  /* =========================================================================
     DATA LOADING & POLLING
     ========================================================================= */
  async function loadInitialData() {
    try {
      const [chans, colls] = await Promise.all([
        apiGet('/bonding/channels').catch(() => []),
        apiGet('/bonding/colleagues').catch(() => [])
      ]);
      channels = chans;
      colleagues = colls;

      if (!activeChannel && channels.length > 0) {
        // Default to first group lounge or first channel
        activeChannel = channels.find(c => c.name.includes('Lounge')) || channels[0];
      }
      if (activeChannel) {
        await loadMessages(activeChannel._id);
      }
    } catch (e) {
      console.error('Failed to load bonding data', e);
    }
  }

  async function loadMessages(channelId, silent = false) {
    if (!channelId) return;
    try {
      const msgs = await apiGet(`/bonding/channels/${channelId}/messages`);
      messages = msgs;
      if (!silent) {
        renderMessageFeed();
      } else {
        updateMessageFeedIncrementally();
      }
    } catch (e) {
      console.error('Failed to load messages', e);
    }
  }

  function startPolling() {
    if (pollInterval) clearInterval(pollInterval);
    pollInterval = setInterval(async () => {
      if (currentTab === 'chat' && activeChannel) {
        // Poll for new messages quietly
        await loadMessages(activeChannel._id, true);
        // Refresh channels list for unread counts / last message
        const refreshedChans = await apiGet('/bonding/channels').catch(() => []);
        if (refreshedChans && refreshedChans.length) {
          channels = refreshedChans;
          updateSidebarChannelsOnly();
        }
      }
    }, 3500);
  }

  /* =========================================================================
     VIEW RENDERING
     ========================================================================= */
  function renderActiveTab() {
    const tabRoot = container.querySelector('#bonding-tab-content');
    if (!tabRoot) return;

    if (currentTab === 'chat') {
      renderChatView(tabRoot);
    } else if (currentTab === 'arcade') {
      renderArcadeView(tabRoot);
    } else if (currentTab === 'leaderboard') {
      renderLeaderboardView(tabRoot);
    }
  }

  /* =========================================================================
     1. CHAT & LOUNGES VIEW
     ========================================================================= */
  function renderChatView(root) {
    root.innerHTML = `
      <div class="bonding-chat-layout">
        <!-- Sidebar: Direct Chats & Group Lounges -->
        <aside class="bonding-sidebar">
          <div class="bonding-search-box">
            <input type="text" id="bonding-search-input" placeholder="Search conversations or teammates..." />
          </div>

          <!-- Group Lounges Section -->
          <div class="bonding-section-header">
            <span class="bonding-section-title">GROUP LOUNGES</span>
            <button class="bonding-mini-btn" id="btn-create-group" title="Create New Group">
              <span>+</span> New Group
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-group-list">
            ${renderChannelList('group')}
          </div>

          <!-- Direct 1-on-1 Messages Section -->
          <div class="bonding-section-header" style="margin-top: 18px;">
            <span class="bonding-section-title">DIRECT MESSAGES</span>
            <button class="bonding-mini-btn" id="btn-new-direct-chat" title="New Direct Message">
              <span>+</span> New Chat
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-direct-list">
            ${renderChannelList('direct')}
          </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="bonding-chat-main">
          ${renderChatHeader()}
          <div class="bonding-messages-container" id="bonding-messages-feed">
            ${renderMessageItems()}
          </div>
          ${renderChatInputBar()}
        </main>
      </div>
    `;

    bindChatViewEvents();
    scrollMessagesToBottom();
  }

  function renderChannelList(type) {
    const filtered = channels.filter(c => c.type === type);
    if (filtered.length === 0) {
      if (type === 'group') {
        return `<div class="bonding-empty-channels">No groups yet. Click <b>+ New Group</b>!</div>`;
      }
      return `<div class="bonding-empty-channels">No personal chats yet. Click <b>+ New Chat</b> to message any colleague!</div>`;
    }

    return filtered.map(c => {
      const isActive = activeChannel && activeChannel._id === c._id;
      const avatarIcon = c.type === 'direct' ? '👤' : (c.avatar || '👥');
      const title = escapeHtml(c.displayName || c.name);
      const lastMsgText = c.lastMessage && c.lastMessage.content ? escapeHtml(c.lastMessage.content) : 'No messages yet';
      const timeStr = c.lastMessage && c.lastMessage.sentAt ? formatTime(c.lastMessage.sentAt) : '';

      return `
        <div class="bonding-channel-item ${isActive ? 'active' : ''}" data-chan-id="${c._id}">
          <div class="bonding-channel-avatar">${avatarIcon}</div>
          <div class="bonding-channel-info">
            <div class="bonding-channel-top">
              <span class="bonding-channel-name">${title}</span>
              <span class="bonding-channel-time">${timeStr}</span>
            </div>
            <div class="bonding-channel-preview">${lastMsgText}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderChatHeader() {
    if (!activeChannel) {
      return `
        <div class="bonding-chat-header">
          <div class="bonding-chat-title-wrap">
            <h3 class="bonding-chat-title">Select a conversation</h3>
          </div>
        </div>
      `;
    }

    const title = escapeHtml(activeChannel.displayName || activeChannel.name);
    const memberCount = (activeChannel.members || []).length;
    const isGroup = activeChannel.type === 'group';

    return `
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${isGroup ? (activeChannel.avatar || '👥') : '💬'}</div>
          <div>
            <div class="bonding-chat-title">${title}</div>
            <div class="bonding-chat-sub">
              ${isGroup
                ? `<span>${memberCount} member${memberCount !== 1 ? 's' : ''}</span> · <span>${escapeHtml(activeChannel.description || 'Public Lounge')}</span>`
                : `<span>Direct 1-on-1 Personal Chat</span>`
              }
            </div>
          </div>
        </div>

        <div class="bonding-chat-header-actions">
          ${isGroup ? `
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> Members (${memberCount})
            </button>
          ` : ''}
          <button class="bonding-header-btn bonding-challenge-btn" id="btn-quick-challenge">
            <span>⚡</span> Challenge
          </button>
        </div>
      </div>
    `;
  }

  function renderMessageItems() {
    if (!messages || messages.length === 0) {
      return `
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello, share an update, or launch a friendly game challenge!</p>
        </div>
      `;
    }

    return messages.map(msg => {
      const isSelf = msg.sender && msg.sender.userId && currentUser && msg.sender.userId.toString() === (currentUser._id || currentUser.id);

      if (msg.type === 'system') {
        return `
          <div class="bonding-msg-system">
            <span>ℹ️</span> <span>${escapeHtml(msg.content)}</span>
          </div>
        `;
      }

      if (msg.type === 'challenge') {
        return renderChallengeMessageCard(msg, isSelf);
      }

      // Standard Text Message
      const senderName = escapeHtml(msg.sender?.name || 'Teammate');
      const timeStr = formatTime(msg.createdAt);
      const reactionsHtml = renderReactionsBar(msg);

      return `
        <div class="bonding-msg-row ${isSelf ? 'self' : 'other'}" data-msg-id="${msg._id}">
          <div class="bonding-msg-avatar" title="${senderName}">${senderName.slice(0, 1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-sender">${senderName}</span>
              <span class="bonding-msg-time">${timeStr}</span>
            </div>
            <div class="bonding-msg-bubble">
              ${escapeHtml(msg.content).replace(/\n/g, '<br/>')}
            </div>
            ${reactionsHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderReactionsBar(msg) {
    const rxns = msg.reactions || [];
    const hasReactions = rxns.length > 0;

    let itemsHtml = rxns.map(r => {
      const myId = currentUser?._id || currentUser?.id;
      const didIReact = (r.users || []).some(u => u.toString() === myId);
      return `
        <button class="bonding-rxn-tag ${didIReact ? 'active' : ''}" data-msg-id="${msg._id}" data-emoji="${r.emoji}">
          <span>${r.emoji}</span> <span>${r.users ? r.users.length : 1}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="bonding-reactions-row">
        ${itemsHtml}
        <button class="bonding-add-rxn-btn" data-msg-id="${msg._id}" title="Add reaction">
          <span>+😀</span>
        </button>
      </div>
    `;
  }

  function renderChallengeMessageCard(msg, isSelf) {
    const cd = msg.challengeData || {};
    const gameType = cd.gameType || 'trivia';
    const status = cd.status || 'active';
    const isCompleted = status === 'completed';
    const senderName = escapeHtml(msg.sender?.name || 'Teammate');
    const timeStr = formatTime(msg.createdAt);

    let icon = '🎮';
    let gameTitle = cd.gameTitle || 'Game Showdown';
    if (gameType === 'trivia') icon = '🧠';
    else if (gameType === 'tictactoe') icon = '❌⭕';
    else if (gameType === 'wordle') icon = '🔤';
    else if (gameType === 'speedtyper') icon = '⚡';

    // Participant Leaderboard / Scores in this challenge
    const parts = cd.participants || [];
    let leaderboardHtml = '';
    if (parts.length > 0) {
      leaderboardHtml = `
        <div class="bonding-challenge-participants">
          <div class="bonding-part-title">Participants & Scores:</div>
          <div class="bonding-part-chips">
            ${parts.map((p, idx) => `
              <div class="bonding-part-chip ${idx === 0 && isCompleted ? 'winner' : ''}">
                <span class="part-rank">${idx === 0 ? '👑' : `#${idx + 1}`}</span>
                <span class="part-name">${escapeHtml(p.name)}</span>:
                <strong class="part-score">${p.score} pts</strong>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Interactive Button / Status
    let actionBtnHtml = '';
    if (gameType === 'tictactoe') {
      const gs = cd.gameState || {};
      const myId = currentUser?._id || currentUser?.id;
      const isMyTurn = gs.currentTurn && gs.currentTurn.toString() === myId;
      actionBtnHtml = `
        <button class="bonding-btn-play-duel" data-msg-id="${msg._id}" data-game="tictactoe">
          ${isCompleted ? 'View Board 🏆' : (isMyTurn ? 'Your Turn! Play Now 🎮' : 'Open Tic-Tac-Toe Arena 🕹️')}
        </button>
      `;
    } else {
      actionBtnHtml = `
        <button class="bonding-btn-play-duel" data-msg-id="${msg._id}" data-game="${gameType}">
          ${isCompleted ? 'View Results & Play Again 🏆' : 'Accept Challenge & Play! 🚀'}
        </button>
      `;
    }

    return `
      <div class="bonding-msg-row ${isSelf ? 'self' : 'other'} challenge-row" data-msg-id="${msg._id}">
        <div class="bonding-msg-avatar" title="${senderName}">${senderName.slice(0, 1).toUpperCase()}</div>
        <div class="bonding-msg-bubble-wrap">
          <div class="bonding-msg-meta">
            <span class="bonding-msg-sender">${senderName}</span>
            <span class="bonding-msg-time">${timeStr}</span>
          </div>

          <div class="bonding-challenge-card">
            <div class="bonding-challenge-header">
              <div class="bonding-challenge-icon">${icon}</div>
              <div class="bonding-challenge-meta">
                <div class="bonding-challenge-title">${escapeHtml(gameTitle)}</div>
                <div class="bonding-challenge-sub">
                  ${isCompleted ? '<span class="status-badge done">Challenge Completed</span>' : '<span class="status-badge live">Live Challenge</span>'}
                  · Issued by ${senderName}
                </div>
              </div>
            </div>

            ${msg.content ? `<div class="bonding-challenge-text">${escapeHtml(msg.content)}</div>` : ''}

            ${leaderboardHtml}

            <div class="bonding-challenge-footer">
              ${actionBtnHtml}
            </div>
          </div>

          ${renderReactionsBar(msg)}
        </div>
      </div>
    `;
  }

  function renderChatInputBar() {
    if (!activeChannel) return '';

    return `
      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-input-challenge" title="Launch a Challenge">
          <span>⚡ Challenge</span>
        </button>
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <span>😀</span>
        </button>
        <textarea
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or press Enter to send..."
          rows="1"
        ></textarea>
        <button class="bonding-send-btn" id="btn-send-message">
          <span>Send</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;
  }

  function scrollMessagesToBottom() {
    const feed = container.querySelector('#bonding-messages-feed');
    if (feed) {
      feed.scrollTop = feed.scrollHeight;
    }
  }

  function updateMessageFeedIncrementally() {
    const feed = container.querySelector('#bonding-messages-feed');
    if (!feed) return;
    const isAtBottom = feed.scrollHeight - feed.scrollTop <= feed.clientHeight + 80;
    feed.innerHTML = renderMessageItems();
    bindMessageActions();
    if (isAtBottom) {
      scrollMessagesToBottom();
    }
  }

  function updateSidebarChannelsOnly() {
    const grpList = container.querySelector('#bonding-group-list');
    const dirList = container.querySelector('#bonding-direct-list');
    if (grpList) grpList.innerHTML = renderChannelList('group');
    if (dirList) dirList.innerHTML = renderChannelList('direct');
    bindSidebarEvents();
  }

  /* =========================================================================
     2. EVENT BINDING & ACTIONS
     ========================================================================= */
  function bindChatViewEvents() {
    bindSidebarEvents();
    bindHeaderEvents();
    bindMessageActions();
    bindInputBarEvents();

    // Search filter
    const searchInput = container.querySelector('#bonding-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = container.querySelectorAll('.bonding-channel-item');
        items.forEach(el => {
          const text = el.textContent.toLowerCase();
          el.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }
  }

  function bindSidebarEvents() {
    // Channel items
    const items = container.querySelectorAll('.bonding-channel-item');
    items.forEach(el => {
      el.addEventListener('click', async () => {
        const cid = el.dataset.chanId;
        const target = channels.find(c => c._id === cid);
        if (target) {
          activeChannel = target;
          items.forEach(i => i.classList.remove('active'));
          el.classList.add('active');
          await loadMessages(activeChannel._id);
          renderChatView(container.querySelector('#bonding-tab-content'));
        }
      });
    });

    // Create Group Button
    const btnCreateGrp = container.querySelector('#btn-create-group');
    if (btnCreateGrp) {
      btnCreateGrp.addEventListener('click', openCreateGroupModal);
    }

    // New Direct Chat Button
    const btnNewDirect = container.querySelector('#btn-new-direct-chat');
    if (btnNewDirect) {
      btnNewDirect.addEventListener('click', openNewDirectChatModal);
    }
  }

  function bindHeaderEvents() {
    // Manage Members Button
    const btnMembers = container.querySelector('#btn-manage-members');
    if (btnMembers) {
      btnMembers.addEventListener('click', openManageMembersModal);
    }

    // Quick Challenge Button
    const btnChallenge = container.querySelector('#btn-quick-challenge');
    if (btnChallenge) {
      btnChallenge.addEventListener('click', () => openChallengeLauncherModal(activeChannel));
    }
  }

  function bindInputBarEvents() {
    const input = container.querySelector('#bonding-message-input');
    const sendBtn = container.querySelector('#btn-send-message');
    const challengeBtn = container.querySelector('#btn-input-challenge');
    const emojiBtn = container.querySelector('#btn-quick-emoji');

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', sendMessage);
    }

    if (challengeBtn) {
      challengeBtn.addEventListener('click', () => openChallengeLauncherModal(activeChannel));
    }

    if (emojiBtn) {
      emojiBtn.addEventListener('click', () => {
        if (!input) return;
        const emojis = ['👍', '🎉', '🔥', '💪', '🚀', '❤️', '😂', '🏆'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        input.value += (input.value ? ' ' : '') + randomEmoji;
        input.focus();
      });
    }
  }

  function bindMessageActions() {
    // Play Duel / View Results button on challenge cards
    const playButtons = container.querySelectorAll('.bonding-btn-play-duel');
    playButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const msgId = btn.dataset.msgId;
        const gameType = btn.dataset.game;
        const msg = messages.find(m => m._id === msgId);
        if (msg) {
          openGameRunnerModal(msg, gameType);
        }
      });
    });

    // Reaction click (toggle)
    const rxnTags = container.querySelectorAll('.bonding-rxn-tag');
    rxnTags.forEach(tag => {
      tag.addEventListener('click', async () => {
        const msgId = tag.dataset.msgId;
        const emoji = tag.dataset.emoji;
        await toggleReaction(msgId, emoji);
      });
    });

    // Add reaction quick picker
    const addRxnBtns = container.querySelectorAll('.bonding-add-rxn-btn');
    addRxnBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const msgId = btn.dataset.msgId;
        openEmojiPicker(e.currentTarget, async (chosenEmoji) => {
          await toggleReaction(msgId, chosenEmoji);
        });
      });
    });
  }

  async function sendMessage() {
    const input = container.querySelector('#bonding-message-input');
    if (!input || !activeChannel) return;
    const text = input.value.trim();
    if (!text || isSending) return;

    isSending = true;
    try {
      input.value = '';
      const newMsg = await apiPost(`/bonding/channels/${activeChannel._id}/messages`, {
        type: 'text',
        content: text
      });
      messages.push(newMsg);
      renderMessageFeed();
      scrollMessagesToBottom();

      // Refresh channels sidebar to update last message preview
      const chans = await apiGet('/bonding/channels').catch(() => []);
      if (chans && chans.length) {
        channels = chans;
        updateSidebarChannelsOnly();
      }
    } catch (err) {
      flashToast(err.message || 'Failed to send message', 'error');
    } finally {
      isSending = false;
      input.focus();
    }
  }

  async function toggleReaction(msgId, emoji) {
    try {
      const updatedReactions = await apiPost(`/bonding/messages/${msgId}/react`, { emoji });
      const targetMsg = messages.find(m => m._id === msgId);
      if (targetMsg) {
        targetMsg.reactions = updatedReactions;
        updateMessageFeedIncrementally();
      }
    } catch (err) {
      flashToast(err.message || 'Failed to react', 'error');
    }
  }

  function renderMessageFeed() {
    const feed = container.querySelector('#bonding-messages-feed');
    if (feed) {
      feed.innerHTML = renderMessageItems();
      bindMessageActions();
    }
  }

  /* =========================================================================
     3. MEMBER MANAGEMENT (ADD & REMOVE PEOPLE FROM GROUPS)
     ========================================================================= */
  function openManageMembersModal() {
    if (!activeChannel || activeChannel.type === 'direct') return;

    const modalRoot = container.querySelector('#bonding-modals-root');
    const currentMembers = activeChannel.members || [];
    const memberUserIds = new Set(currentMembers.map(m => m.userId?.toString()));

    // Colleagues not currently in this group
    const availableColleagues = colleagues.filter(c => !memberUserIds.has(c._id.toString()));

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${escapeHtml(activeChannel.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group:</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select a teammate to add...</option>
                  ${availableColleagues.map(c => `
                    <option value="${c._id}">${escapeHtml(c.name)} (${escapeHtml(c.role)})</option>
                  `).join('')}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${availableColleagues.length === 0 ? 'disabled' : ''}>
                  Add to Group
                </button>
              </div>
              ${availableColleagues.length === 0 ? `<div class="bonding-hint-text">All active colleagues are already members of this group!</div>` : ''}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${currentMembers.length}):</label>
              <div class="bonding-members-list">
                ${currentMembers.map(m => {
                  const isMe = currentUser && m.userId && m.userId.toString() === (currentUser._id || currentUser.id);
                  return `
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(m.name || 'U').slice(0, 1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${escapeHtml(m.name)} ${isMe ? '<span class="you-badge">(You)</span>' : ''}</span>
                          <span class="bonding-member-role">${escapeHtml(m.role || 'Member')}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        <button class="bonding-btn-danger btn-remove-member" data-user-id="${m.userId}" data-name="${escapeHtml(m.name)}">
                          ${isMe ? 'Leave Group' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Modal Close
    const closeBtn = modalRoot.querySelector('.bonding-modal-close');
    closeBtn.onclick = () => { modalRoot.innerHTML = ''; };

    // Add Member Action
    const addBtn = modalRoot.querySelector('#btn-submit-add-member');
    if (addBtn) {
      addBtn.onclick = async () => {
        const sel = modalRoot.querySelector('#sel-add-colleague');
        const chosenId = sel.value;
        if (!chosenId) {
          flashToast('Please select a colleague to add', 'warning');
          return;
        }

        try {
          addBtn.disabled = true;
          addBtn.textContent = 'Adding...';
          const res = await apiPut(`/bonding/channels/${activeChannel._id}/members`, {
            action: 'add',
            userIds: [chosenId]
          });
          flashToast('Colleague added to group! 🎉', 'success');
          activeChannel = res.channel;
          modalRoot.innerHTML = '';
          // Reload messages and re-render header & feed
          await loadMessages(activeChannel._id);
          renderChatView(container.querySelector('#bonding-tab-content'));
        } catch (err) {
          flashToast(err.message || 'Failed to add member', 'error');
          addBtn.disabled = false;
          addBtn.textContent = 'Add to Group';
        }
      };
    }

    // Remove Member Action
    const removeBtns = modalRoot.querySelectorAll('.btn-remove-member');
    removeBtns.forEach(btn => {
      btn.onclick = async () => {
        const uid = btn.dataset.userId;
        const uname = btn.dataset.name;
        if (!confirm(`Are you sure you want to remove ${uname} from this group?`)) return;

        try {
          btn.disabled = true;
          const res = await apiPut(`/bonding/channels/${activeChannel._id}/members`, {
            action: 'remove',
            userId: uid
          });
          flashToast(`${uname} removed from group`, 'info');
          activeChannel = res.channel;
          modalRoot.innerHTML = '';
          await loadMessages(activeChannel._id);
          renderChatView(container.querySelector('#bonding-tab-content'));
        } catch (err) {
          flashToast(err.message || 'Failed to remove member', 'error');
          btn.disabled = false;
        }
      };
    });
  }

  /* =========================================================================
     4. NEW DIRECT CHAT & NEW GROUP MODALS
     ========================================================================= */
  function openNewDirectChatModal() {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const others = colleagues.filter(c => !c.isSelf);

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any team member to start a 1-on-1 private conversation and game challenge.</p>
            <div class="bonding-user-pick-list">
              ${others.map(u => `
                <div class="bonding-user-pick-item" data-user-id="${u._id}" data-name="${escapeHtml(u.name)}">
                  <div class="bonding-member-avatar">${u.name.slice(0, 1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${escapeHtml(u.name)}</span>
                    <span class="user-pick-role">${escapeHtml(u.role)} · ${escapeHtml(u.email || '')}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };

    const pickItems = modalRoot.querySelectorAll('.bonding-user-pick-item');
    pickItems.forEach(item => {
      item.onclick = async () => {
        const uid = item.dataset.userId;
        try {
          const directChan = await apiPost('/bonding/channels', {
            type: 'direct',
            targetUserId: uid
          });
          modalRoot.innerHTML = '';
          // Refresh channels
          channels = await apiGet('/bonding/channels');
          activeChannel = channels.find(c => c._id === directChan._id) || directChan;
          await loadMessages(activeChannel._id);
          renderChatView(container.querySelector('#bonding-tab-content'));
        } catch (err) {
          flashToast(err.message || 'Failed to open personal chat', 'error');
        }
      };
    });
  }

  function openCreateGroupModal() {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const others = colleagues.filter(c => !c.isSelf);

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Create a New Group Lounge</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <div class="bonding-form-section">
              <label class="bonding-form-label">Group Name *</label>
              <input type="text" id="new-group-name" class="bonding-input" placeholder="e.g. Creative Minds, Friday Gaming, Dev Lounge..." />
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Description (Optional)</label>
              <input type="text" id="new-group-desc" class="bonding-input" placeholder="What is this group about?" />
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Select Group Icon</label>
              <div class="bonding-avatar-picker" id="new-group-avatar-pick">
                <span class="avatar-opt active">👥</span>
                <span class="avatar-opt">☕</span>
                <span class="avatar-opt">🎮</span>
                <span class="avatar-opt">🚀</span>
                <span class="avatar-opt">💡</span>
                <span class="avatar-opt">🍕</span>
                <span class="avatar-opt">🏆</span>
                <span class="avatar-opt">🎯</span>
              </div>
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Initial Members</label>
              <div class="bonding-member-checkboxes">
                ${others.map(u => `
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${u._id}" />
                    <span>${escapeHtml(u.name)} (${escapeHtml(u.role)})</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-create-grp">Cancel</button>
              <button class="bonding-btn-primary" id="btn-confirm-create-grp">Create Group 🎉</button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };
    modalRoot.querySelector('#btn-cancel-create-grp').onclick = () => { modalRoot.innerHTML = ''; };

    // Emoji icon selection
    let chosenAvatar = '👥';
    const avatarOpts = modalRoot.querySelectorAll('.avatar-opt');
    avatarOpts.forEach(opt => {
      opt.onclick = () => {
        avatarOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        chosenAvatar = opt.textContent.trim();
      };
    });

    // Create group submit
    const submitBtn = modalRoot.querySelector('#btn-confirm-create-grp');
    submitBtn.onclick = async () => {
      const nameInput = modalRoot.querySelector('#new-group-name');
      const descInput = modalRoot.querySelector('#new-group-desc');
      const name = nameInput.value.trim();
      if (!name) {
        flashToast('Please enter a group name', 'warning');
        nameInput.focus();
        return;
      }

      const chks = modalRoot.querySelectorAll('.new-group-member-chk:checked');
      const memberIds = Array.from(chks).map(c => c.value);

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating...';
        const newGroup = await apiPost('/bonding/channels', {
          type: 'group',
          name,
          description: descInput.value.trim(),
          avatar: chosenAvatar,
          memberIds
        });

        flashToast(`Group "${name}" created! 🎉`, 'success');
        modalRoot.innerHTML = '';
        channels = await apiGet('/bonding/channels');
        activeChannel = channels.find(c => c._id === newGroup._id) || newGroup;
        await loadMessages(activeChannel._id);
        renderChatView(container.querySelector('#bonding-tab-content'));
      } catch (err) {
        flashToast(err.message || 'Failed to create group', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Group 🎉';
      }
    };
  }

  /* =========================================================================
     5. CHALLENGE LAUNCHER & INTERACTIVE GAMES
     ========================================================================= */
  function openChallengeLauncherModal(targetChannel) {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const isDirect = targetChannel && targetChannel.type === 'direct';
    const targetName = isDirect ? (targetChannel.displayName || 'your colleague') : (targetChannel.name || 'the group');

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card" style="max-width: 580px;">
          <div class="bonding-modal-header">
            <h3>⚡ Launch a Challenge to ${escapeHtml(targetName)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Pick a mini-game to play and challenge your team! Win points and climb the company leaderboard.</p>

            <div class="bonding-game-pick-grid">
              <!-- Game 1: Trivia Blitz -->
              <div class="bonding-game-card-pick" data-game="trivia">
                <div class="game-pick-icon">🧠</div>
                <div class="game-pick-title">Trivia Blitz</div>
                <div class="game-pick-desc">5 fast-paced multiple choice questions. Best score and speed wins!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Play & Challenge</button>
              </div>

              <!-- Game 2: Tic-Tac-Toe Clash -->
              <div class="bonding-game-card-pick" data-game="tictactoe">
                <div class="game-pick-icon">❌⭕</div>
                <div class="game-pick-title">Tic-Tac-Toe Clash</div>
                <div class="game-pick-desc">Classic turn-based duel. Take turns on the 3x3 grid right inside the chat!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Start Duel</button>
              </div>

              <!-- Game 3: Wordle Duel -->
              <div class="bonding-game-card-pick" data-game="wordle">
                <div class="game-pick-icon">🔤</div>
                <div class="game-pick-title">Wordle Duel</div>
                <div class="game-pick-desc">Guess the 5-letter secret word in 6 attempts. Lowest attempts wins!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Play & Challenge</button>
              </div>

              <!-- Game 4: Speed Typist -->
              <div class="bonding-game-card-pick" data-game="speedtyper">
                <div class="game-pick-icon">⚡</div>
                <div class="game-pick-title">Speed Typist Sprint</div>
                <div class="game-pick-desc">30-second rapid typing challenge. Challenge your teammates to beat your WPM!</div>
                <button class="bonding-btn-primary btn-launch-specific-game">Start Sprint</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };

    const launchBtns = modalRoot.querySelectorAll('.btn-launch-specific-game');
    launchBtns.forEach(btn => {
      btn.onclick = (e) => {
        const gameCard = e.currentTarget.closest('.bonding-game-card-pick');
        const gameType = gameCard.dataset.game;
        modalRoot.innerHTML = '';
        startNewGameSession(gameType, targetChannel);
      };
    });
  }

  // Handle playing and submitting challenge
  async function startNewGameSession(gameType, targetChannel) {
    if (gameType === 'tictactoe') {
      // Launch directly into chat
      try {
        const otherUserId = targetChannel.type === 'direct' ? targetChannel.otherUserId : null;
        const otherUserName = targetChannel.type === 'direct' ? targetChannel.displayName : '';

        const newMsg = await apiPost(`/bonding/channels/${targetChannel._id}/messages`, {
          type: 'challenge',
          content: `I've initiated a Tic-Tac-Toe duel! Click below to make your move! ❌⭕`,
          challengeData: {
            gameType: 'tictactoe',
            gameTitle: 'Tic-Tac-Toe Showdown',
            targetUserId: otherUserId,
            targetUserName: otherUserName
          }
        });

        messages.push(newMsg);
        renderMessageFeed();
        scrollMessagesToBottom();
        flashToast('Tic-Tac-Toe challenge posted to chat! 🎮', 'success');
        openGameRunnerModal(newMsg, 'tictactoe');
      } catch (err) {
        flashToast(err.message || 'Failed to start Tic-Tac-Toe', 'error');
      }
      return;
    }

    // For Trivia, Wordle, Speed Typer: Play immediately, then post challenge card with your score!
    openGamePlayDialog(gameType, async (scoreResult) => {
      try {
        const otherUserId = targetChannel.type === 'direct' ? targetChannel.otherUserId : null;
        const otherUserName = targetChannel.type === 'direct' ? targetChannel.displayName : '';

        let gameTitle = 'Friendly Game Showdown';
        if (gameType === 'trivia') gameTitle = 'Trivia Blitz Challenge';
        else if (gameType === 'wordle') gameTitle = 'Wordle Mystery Duel';
        else if (gameType === 'speedtyper') gameTitle = 'Speed Typist Showdown';

        const newMsg = await apiPost(`/bonding/channels/${targetChannel._id}/messages`, {
          type: 'challenge',
          content: `I scored ${scoreResult.score} pts in ${gameTitle}! Can you beat my score? 🚀`,
          challengeData: {
            gameType: gameType,
            gameTitle: gameTitle,
            targetUserId: otherUserId,
            targetUserName: otherUserName,
            challengerScore: scoreResult.score,
            challengerTime: scoreResult.timeSpent,
            details: scoreResult.details
          }
        });

        messages.push(newMsg);
        renderMessageFeed();
        scrollMessagesToBottom();
        flashToast(`Challenge posted! You earned +10 bonding points! 🏆`, 'success');
      } catch (err) {
        flashToast(err.message || 'Failed to post challenge', 'error');
      }
    });
  }

  // Open existing challenge card to play or view
  function openGameRunnerModal(msg, gameType) {
    if (gameType === 'tictactoe') {
      openTicTacToeModal(msg);
      return;
    }

    // Play Trivia, Wordle, Speedtyper on this challenge
    openGamePlayDialog(gameType, async (scoreResult) => {
      try {
        const updatedMsg = await apiPost(`/bonding/challenges/${msg._id}/action`, {
          action: 'submit_score',
          score: scoreResult.score,
          timeSpent: scoreResult.timeSpent,
          details: scoreResult.details
        });

        const idx = messages.findIndex(m => m._id === msg._id);
        if (idx > -1) messages[idx] = updatedMsg;
        renderMessageFeed();
        flashToast(`Score submitted! You earned bonding points! 🌟`, 'success');
      } catch (err) {
        flashToast(err.message || 'Failed to submit score', 'error');
      }
    });
  }

  /* =========================================================================
     6. IN-APP MINI GAMES IMPLEMENTATION
     ========================================================================= */

  // A. TIC-TAC-TOE MODAL (Live turn-based)
  function openTicTacToeModal(msg) {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const cd = msg.challengeData || {};
    const gs = cd.gameState || {};
    const board = gs.board || Array(9).fill(null);
    const myId = currentUser?._id || currentUser?.id;
    const isCompleted = cd.status === 'completed';

    // Figure out status message
    let statusText = '';
    if (isCompleted) {
      if (gs.winner === 'Draw') statusText = '🤝 Game ended in a Draw!';
      else statusText = `🏆 Winner: ${escapeHtml(gs.winningPlayer || 'Winner')} (${gs.winner})!`;
    } else {
      const isMyTurn = gs.currentTurn && gs.currentTurn.toString() === myId;
      statusText = isMyTurn ? '🎮 It is YOUR turn! Click a tile.' : `⏳ Waiting for ${escapeHtml(gs.currentTurn === gs.playerX ? gs.playerXName : gs.playerOName || 'opponent')} to move...`;
    }

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card" style="max-width: 420px; text-align: center;">
          <div class="bonding-modal-header">
            <h3>❌⭕ Tic-Tac-Toe Duel</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <div class="ttt-players-bar">
              <span class="ttt-player x">❌ ${escapeHtml(gs.playerXName || 'Player 1')}</span>
              <span class="vs">vs</span>
              <span class="ttt-player o">⭕ ${escapeHtml(gs.playerOName || 'Player 2')}</span>
            </div>

            <div class="ttt-status-banner">${statusText}</div>

            <div class="ttt-grid" id="ttt-board">
              ${board.map((cell, idx) => `
                <button class="ttt-cell ${cell ? cell.toLowerCase() : ''}" data-idx="${idx}" ${cell || isCompleted ? 'disabled' : ''}>
                  ${cell ? (cell === 'X' ? '❌' : '⭕') : ''}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };

    const cells = modalRoot.querySelectorAll('.ttt-cell');
    cells.forEach(cell => {
      cell.onclick = async () => {
        const cellIdx = parseInt(cell.dataset.idx, 10);
        try {
          cell.disabled = true;
          const updatedMsg = await apiPost(`/bonding/challenges/${msg._id}/action`, {
            action: 'play_tictactoe',
            cellIndex: cellIdx
          });

          const mIdx = messages.findIndex(m => m._id === msg._id);
          if (mIdx > -1) messages[mIdx] = updatedMsg;
          renderMessageFeed();
          // Re-render modal with new board state
          openTicTacToeModal(updatedMsg);
        } catch (err) {
          flashToast(err.message || 'Cannot place move', 'warning');
          cell.disabled = false;
        }
      };
    });
  }

  // B. GAME DIALOG ROUTER (Trivia, Wordle, Speed Typer)
  function openGamePlayDialog(gameType, onComplete) {
    if (gameType === 'trivia') {
      runTriviaGame(onComplete);
    } else if (gameType === 'wordle') {
      runWordleGame(onComplete);
    } else if (gameType === 'speedtyper') {
      runSpeedTyperGame(onComplete);
    }
  }

  // TRIVIA RUNNER
  function runTriviaGame(onComplete) {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const questions = TRIVIA_BANK.slice(0, 5); // 5 questions
    let currentIdx = 0;
    let score = 0;
    let startTime = Date.now();
    let timerInterval = null;
    let secondsLeft = 15;

    function renderQuestion() {
      const q = questions[currentIdx];
      secondsLeft = 15;

      modalRoot.innerHTML = `
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 480px;">
            <div class="bonding-modal-header">
              <h3>🧠 Trivia Blitz (${currentIdx + 1}/5)</h3>
              <div class="trivia-timer-badge" id="trivia-timer">⏱️ 15s</div>
            </div>
            <div class="bonding-modal-body">
              <div class="trivia-question-text">${escapeHtml(q.q)}</div>
              <div class="trivia-options-grid">
                ${q.options.map((opt, i) => `
                  <button class="trivia-option-btn" data-opt="${i}">
                    <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
                    <span class="opt-label">${escapeHtml(opt)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      const timerEl = modalRoot.querySelector('#trivia-timer');
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        secondsLeft--;
        if (timerEl) timerEl.textContent = `⏱️ ${secondsLeft}s`;
        if (secondsLeft <= 0) {
          clearInterval(timerInterval);
          handleAnswer(-1); // Timeout
        }
      }, 1000);

      const btns = modalRoot.querySelectorAll('.trivia-option-btn');
      btns.forEach(b => {
        b.onclick = () => {
          clearInterval(timerInterval);
          const chosen = parseInt(b.dataset.opt, 10);
          handleAnswer(chosen);
        };
      });
    }

    function handleAnswer(chosenIdx) {
      const q = questions[currentIdx];
      const btns = modalRoot.querySelectorAll('.trivia-option-btn');

      btns.forEach(b => {
        const idx = parseInt(b.dataset.opt, 10);
        if (idx === q.correct) b.classList.add('correct');
        else if (idx === chosenIdx) b.classList.add('wrong');
        b.disabled = true;
      });

      if (chosenIdx === q.correct) {
        score += 20; // 20 pts per correct question
      }

      setTimeout(() => {
        currentIdx++;
        if (currentIdx < questions.length) {
          renderQuestion();
        } else {
          finishTrivia();
        }
      }, 1000);
    }

    function finishTrivia() {
      if (timerInterval) clearInterval(timerInterval);
      const totalTime = Math.round((Date.now() - startTime) / 1000);

      modalRoot.innerHTML = `
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 420px; text-align: center;">
            <div class="bonding-modal-header">
              <h3>🎉 Trivia Complete!</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>
            <div class="bonding-modal-body">
              <div style="font-size: 52px; margin: 10px 0;">🏆</div>
              <div style="font-size: 24px; font-weight: 700; color: var(--navy-900);">Your Score: ${score} / 100</div>
              <p style="color: var(--text-3); font-size: 14px; margin-top: 6px;">Completed 5 questions in ${totalTime} seconds.</p>

              <button class="bonding-btn-primary" id="btn-submit-trivia-res" style="margin-top: 20px; width: 100%;">
                Submit & Record Points 🚀
              </button>
            </div>
          </div>
        </div>
      `;

      modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };
      modalRoot.querySelector('#btn-submit-trivia-res').onclick = () => {
        modalRoot.innerHTML = '';
        if (typeof onComplete === 'function') {
          onComplete({
            score: score,
            timeSpent: totalTime,
            details: { correct: score / 20, total: 5 }
          });
        }
      };
    }

    renderQuestion();
  }

  // WORDLE RUNNER
  function runWordleGame(onComplete) {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const secretWord = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
    const maxTries = 6;
    let guesses = [];
    let currentGuess = '';
    let startTime = Date.now();
    let isGameOver = false;

    function renderBoard() {
      modalRoot.innerHTML = `
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 420px; text-align: center;">
            <div class="bonding-modal-header">
              <h3>🔤 Wordle Mystery Duel</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>
            <div class="bonding-modal-body">
              <div class="wordle-grid">
                ${Array(maxTries).fill(0).map((_, rowIdx) => {
                  const guessWord = guesses[rowIdx] || (rowIdx === guesses.length ? currentGuess.padEnd(5, ' ') : '     ');
                  return `
                    <div class="wordle-row">
                      ${Array(5).fill(0).map((_, colIdx) => {
                        const letter = guessWord[colIdx] || '';
                        let statusClass = '';
                        if (rowIdx < guesses.length) {
                          const targetLetter = secretWord[colIdx];
                          if (letter === targetLetter) statusClass = 'green';
                          else if (secretWord.includes(letter)) statusClass = 'yellow';
                          else statusClass = 'gray';
                        }
                        return `<div class="wordle-cell ${statusClass}">${letter.trim()}</div>`;
                      }).join('')}
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Input row -->
              <div class="wordle-input-controls">
                <input type="text" id="wordle-input-box" class="bonding-input" maxlength="5" placeholder="Type 5-letter word..." autofocus />
                <button class="bonding-btn-primary" id="btn-submit-wordle-guess">Enter</button>
              </div>
            </div>
          </div>
        </div>
      `;

      modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };

      const input = modalRoot.querySelector('#wordle-input-box');
      const submitBtn = modalRoot.querySelector('#btn-submit-wordle-guess');

      if (input) {
        input.focus();
        input.oninput = (e) => {
          currentGuess = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
          e.target.value = currentGuess;
        };
        input.onkeydown = (e) => {
          if (e.key === 'Enter') checkGuess();
        };
      }
      if (submitBtn) submitBtn.onclick = checkGuess;
    }

    function checkGuess() {
      if (currentGuess.length !== 5) {
        flashToast('Word must be 5 letters!', 'warning');
        return;
      }

      guesses.push(currentGuess);
      const won = currentGuess === secretWord;
      currentGuess = '';

      if (won || guesses.length >= maxTries) {
        isGameOver = true;
        const totalTime = Math.round((Date.now() - startTime) / 1000);
        const score = won ? (110 - (guesses.length * 15)) : 20;

        setTimeout(() => {
          modalRoot.innerHTML = `
            <div class="bonding-modal-backdrop">
              <div class="bonding-modal-card" style="max-width: 400px; text-align: center;">
                <div class="bonding-modal-header">
                  <h3>${won ? '🎉 Brilliant Word Solve!' : 'Game Over'}</h3>
                  <button class="bonding-modal-close">&times;</button>
                </div>
                <div class="bonding-modal-body">
                  <div style="font-size: 48px; margin: 10px 0;">${won ? '🔤' : '💡'}</div>
                  <div style="font-size: 22px; font-weight: 700; color: var(--navy-900);">Secret Word: ${secretWord}</div>
                  <p style="color: var(--text-3); font-size: 14px; margin-top: 6px;">
                    ${won ? `Solved in ${guesses.length} guesses (${totalTime}s)` : 'Better luck next time!'}
                  </p>
                  <button class="bonding-btn-primary" id="btn-submit-wordle-res" style="margin-top: 18px; width: 100%;">
                    Submit Score (${score} pts) 🚀
                  </button>
                </div>
              </div>
            </div>
          `;

          modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };
          modalRoot.querySelector('#btn-submit-wordle-res').onclick = () => {
            modalRoot.innerHTML = '';
            if (typeof onComplete === 'function') {
              onComplete({
                score: Math.max(score, 10),
                timeSpent: totalTime,
                details: { guesses: guesses.length, won }
              });
            }
          };
        }, 500);
        return;
      }

      renderBoard();
    }

    renderBoard();
  }

  // SPEED TYPER RUNNER
  function runSpeedTyperGame(onComplete) {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const passage = TYPING_PASSAGES[Math.floor(Math.random() * TYPING_PASSAGES.length)];
    let startTime = null;
    let timerInterval = null;
    let timeLeft = 30;

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card" style="max-width: 520px;">
          <div class="bonding-modal-header">
            <h3>⚡ Speed Typist Sprint</h3>
            <div class="trivia-timer-badge" id="typer-timer">⏱️ 30s</div>
          </div>
          <div class="bonding-modal-body">
            <p style="color: var(--text-3); font-size: 13px;">Type the passage as quickly and accurately as you can:</p>
            <div class="typer-passage-box">${passage}</div>
            <textarea id="typer-input-area" class="bonding-input" rows="3" placeholder="Start typing here to begin timer..."></textarea>
            <div class="typer-stats-bar" id="typer-live-stats">
              <span>WPM: <strong id="live-wpm">0</strong></span>
              <span>Accuracy: <strong id="live-acc">100%</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = modalRoot.querySelector('#typer-input-area');
    const timerEl = modalRoot.querySelector('#typer-timer');
    const wpmEl = modalRoot.querySelector('#live-wpm');
    const accEl = modalRoot.querySelector('#live-acc');

    modalRoot.querySelector('.bonding-modal-header').insertAdjacentHTML('beforeend', '<button class="bonding-modal-close">&times;</button>');
    modalRoot.querySelector('.bonding-modal-close').onclick = () => {
      if (timerInterval) clearInterval(timerInterval);
      modalRoot.innerHTML = '';
    };

    input.focus();
    input.oninput = () => {
      if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
          timeLeft--;
          if (timerEl) timerEl.textContent = `⏱️ ${timeLeft}s`;
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishTyper();
          }
        }, 1000);
      }

      const val = input.value;
      const words = val.trim().split(/\s+/).filter(Boolean).length;
      const elapsedMins = (Date.now() - startTime) / 60000;
      const currentWpm = Math.round(words / (elapsedMins || 0.01));
      if (wpmEl) wpmEl.textContent = currentWpm;

      if (val.trim() === passage.trim()) {
        clearInterval(timerInterval);
        finishTyper();
      }
    };

    function finishTyper() {
      if (timerInterval) clearInterval(timerInterval);
      const val = input.value;
      const words = val.trim().split(/\s+/).filter(Boolean).length;
      const elapsedMins = Math.max((Date.now() - (startTime || Date.now())) / 60000, 0.1);
      const finalWpm = Math.min(Math.round(words / elapsedMins), 160);
      const score = Math.max(Math.round(finalWpm * 1.5), 20);

      modalRoot.innerHTML = `
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card" style="max-width: 400px; text-align: center;">
            <div class="bonding-modal-header">
              <h3>⚡ Sprint Finished!</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>
            <div class="bonding-modal-body">
              <div style="font-size: 48px; margin: 10px 0;">⚡</div>
              <div style="font-size: 24px; font-weight: 700; color: var(--navy-900);">${finalWpm} WPM</div>
              <p style="color: var(--text-3); font-size: 14px; margin-top: 6px;">Earned ${score} points!</p>

              <button class="bonding-btn-primary" id="btn-submit-typer-res" style="margin-top: 18px; width: 100%;">
                Submit Challenge Score 🚀
              </button>
            </div>
          </div>
        </div>
      `;

      modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };
      modalRoot.querySelector('#btn-submit-typer-res').onclick = () => {
        modalRoot.innerHTML = '';
        if (typeof onComplete === 'function') {
          onComplete({
            score: score,
            timeSpent: 30 - timeLeft,
            details: { wpm: finalWpm }
          });
        }
      };
    }
  }

  /* =========================================================================
     7. ARCADE VIEW
     ========================================================================= */
  function renderArcadeView(root) {
    root.innerHTML = `
      <div class="bonding-arcade-wrap">
        <div class="arcade-hero">
          <h1>🕹️ CI360 Team Games Arcade</h1>
          <p>Challenge colleagues, hone your skills, and earn badges on the company leaderboard!</p>
        </div>

        <div class="arcade-cards-grid">
          <div class="arcade-card">
            <div class="arcade-card-icon">🧠</div>
            <h3 class="arcade-card-title">Trivia Blitz</h3>
            <p class="arcade-card-desc">Rapid 5-question trivia quiz with science, tech, pop culture, and brain teasers. Timed multiple choice!</p>
            <div class="arcade-card-tags">
              <span>5 Questions</span> <span>15s Timer</span> <span>Solo or Challenge</span>
            </div>
            <button class="bonding-btn-primary arcade-play-btn" data-game="trivia">Play Trivia Blitz 🚀</button>
          </div>

          <div class="arcade-card">
            <div class="arcade-card-icon">❌⭕</div>
            <h3 class="arcade-card-title">Tic-Tac-Toe Clash</h3>
            <p class="arcade-card-desc">Classic 3x3 strategic battle. Challenge an employee or take turns live right inside your chat channels!</p>
            <div class="arcade-card-tags">
              <span>Turn Based</span> <span>Live Duel</span> <span>Points & Medals</span>
            </div>
            <button class="bonding-btn-primary arcade-challenge-btn" data-game="tictactoe">Challenge Teammate ⚡</button>
          </div>

          <div class="arcade-card">
            <div class="arcade-card-icon">🔤</div>
            <h3 class="arcade-card-title">Wordle Mystery Duel</h3>
            <p class="arcade-card-desc">Crack the 5-letter hidden word in 6 guesses or fewer with color-coded feedback hints.</p>
            <div class="arcade-card-tags">
              <span>Word Puzzle</span> <span>6 Attempts</span> <span>Score Duel</span>
            </div>
            <button class="bonding-btn-primary arcade-play-btn" data-game="wordle">Play Wordle 🎯</button>
          </div>

          <div class="arcade-card">
            <div class="arcade-card-icon">⚡</div>
            <h3 class="arcade-card-title">Speed Typist Sprint</h3>
            <p class="arcade-card-desc">Put your typing speed and accuracy to the test in a 30-second sprint. Set a high WPM record!</p>
            <div class="arcade-card-tags">
              <span>30 Seconds</span> <span>WPM Tracker</span> <span>Fast Action</span>
            </div>
            <button class="bonding-btn-primary arcade-play-btn" data-game="speedtyper">Start Sprint ⌨️</button>
          </div>
        </div>
      </div>
    `;

    const playBtns = root.querySelectorAll('.arcade-play-btn');
    playBtns.forEach(btn => {
      btn.onclick = () => {
        const gameType = btn.dataset.game;
        openGamePlayDialog(gameType, (res) => {
          flashToast(`Great game! Scored ${res.score} pts! 🌟`, 'success');
        });
      };
    });

    const challengeBtns = root.querySelectorAll('.arcade-challenge-btn');
    challengeBtns.forEach(btn => {
      btn.onclick = () => {
        openChallengeLauncherModal(activeChannel || channels[0]);
      };
    });
  }

  /* =========================================================================
     8. LEADERBOARD VIEW
     ========================================================================= */
  async function renderLeaderboardView(root) {
    root.innerHTML = `<div class="bonding-loading-skeleton">Loading Leaderboard & Badges...</div>`;
    try {
      const leaders = await apiGet('/bonding/leaderboard').catch(() => []);

      root.innerHTML = `
        <div class="bonding-leaderboard-wrap">
          <div class="lb-header">
            <div>
              <h2>🏆 Team Bonding Leaderboard</h2>
              <p>Top teammates, challenges won, and achievement badges</p>
            </div>
            <button class="bonding-btn-primary" id="btn-refresh-lb">Refresh Ranks</button>
          </div>

          <!-- Podium Top 3 -->
          <div class="lb-podium">
            ${renderPodiumCard(leaders[1], 2, '🥈')}
            ${renderPodiumCard(leaders[0], 1, '🥇')}
            ${renderPodiumCard(leaders[2], 3, '🥉')}
          </div>

          <!-- Table of Rankings -->
          <div class="lb-table-card">
            <table class="lb-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Teammate</th>
                  <th>Role</th>
                  <th>Points</th>
                  <th>Wins</th>
                  <th>Games Played</th>
                  <th>Badges Earned</th>
                </tr>
              </thead>
              <tbody>
                ${leaders.length === 0 ? `<tr><td colspan="7" style="text-align:center; padding: 24px;">No games recorded yet. Be the first to play in Arcade!</td></tr>` : ''}
                ${leaders.map((u, i) => `
                  <tr>
                    <td><strong>#${i + 1}</strong></td>
                    <td>
                      <div class="lb-user-cell">
                        <span class="lb-avatar">${(u.userName || 'U').slice(0, 1).toUpperCase()}</span>
                        <span>${escapeHtml(u.userName)}</span>
                      </div>
                    </td>
                    <td><span class="role-badge">${escapeHtml(u.userRole || 'employee')}</span></td>
                    <td><strong class="points-text">${u.points || 0} pts</strong></td>
                    <td>${u.wins || 0} wins</td>
                    <td>${u.gamesPlayed || 0}</td>
                    <td>
                      <div class="lb-badge-list">
                        ${(u.badges || ['Team Player']).map(b => `<span class="achieve-badge">${escapeHtml(b)}</span>`).join('')}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      root.querySelector('#btn-refresh-lb').onclick = () => renderLeaderboardView(root);
    } catch (err) {
      root.innerHTML = `<div class="bonding-error-box">Failed to load leaderboard: ${escapeHtml(err.message)}</div>`;
    }
  }

  function renderPodiumCard(user, rank, medal) {
    if (!user) {
      return `
        <div class="lb-podium-card rank-${rank} empty">
          <div class="podium-rank">${medal} #${rank}</div>
          <div class="podium-name">—</div>
          <div class="podium-pts">0 pts</div>
        </div>
      `;
    }

    return `
      <div class="lb-podium-card rank-${rank}">
        <div class="podium-medal">${medal}</div>
        <div class="podium-avatar">${(user.userName || 'U').slice(0, 1).toUpperCase()}</div>
        <div class="podium-name">${escapeHtml(user.userName)}</div>
        <div class="podium-role">${escapeHtml(user.userRole || 'employee')}</div>
        <div class="podium-pts">${user.points || 0} pts</div>
        <div class="podium-wins">${user.wins || 0} Wins · ${user.gamesPlayed || 0} Games</div>
      </div>
    `;
  }

  /* =========================================================================
     EMOJI PICKER POPUP
     ========================================================================= */
  function openEmojiPicker(targetBtn, onSelect) {
    // Remove any existing popup
    const old = document.querySelector('.bonding-emoji-popup');
    if (old) old.remove();

    const emojis = ['👍', '❤️', '🔥', '😂', '🎉', '👏', '🎯', '⚡', '🏆', '🙌', '💯', '🚀'];
    const popup = document.createElement('div');
    popup.className = 'bonding-emoji-popup';
    popup.innerHTML = emojis.map(e => `<button class="emoji-opt-btn" data-e="${e}">${e}</button>`).join('');

    const rect = targetBtn.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 6}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(popup);

    popup.querySelectorAll('.emoji-opt-btn').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        onSelect(b.dataset.e);
        popup.remove();
      };
    });

    const closeHandler = (e) => {
      if (!popup.contains(e.target)) {
        popup.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);
  }

  function formatTime(d) {
    if (!d) return '';
    try {
      const date = new Date(d);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  }
}

/* =========================================================================
   STYLE INJECTION
   ========================================================================= */
function injectBondingStyles() {
  if (document.getElementById('ci360-bonding-styles')) return;

  const style = document.createElement('style');
  style.id = 'ci360-bonding-styles';
  style.textContent = `
    .bonding-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 4px;
      font-family: inherit;
    }

    .bonding-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 16px;
      padding: 16px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .bonding-nav-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .bonding-logo-badge {
      font-size: 28px;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
    }

    .bonding-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0 0 2px 0;
    }

    .bonding-subtitle {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    .bonding-nav-tabs {
      display: flex;
      gap: 8px;
      background: var(--bg-hover, #f1f5f9);
      padding: 5px;
      border-radius: 12px;
    }

    .bonding-nav-tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9px;
      border: none;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-2, #475569);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .bonding-nav-tab:hover {
      color: var(--navy-900, #0f172a);
    }

    .bonding-nav-tab.active {
      background: var(--surface, #ffffff);
      color: #6366f1;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    /* Chat Layout */
    .bonding-chat-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      height: 720px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    }

    @media (max-width: 900px) {
      .bonding-chat-layout {
        grid-template-columns: 1fr;
        height: auto;
      }
      .bonding-sidebar {
        max-height: 280px;
        border-right: none !important;
        border-bottom: 1px solid var(--border, #e2e8f0);
      }
    }

    .bonding-sidebar {
      border-right: 1px solid var(--border, #e2e8f0);
      background: var(--bg-card, #fafafa);
      padding: 16px 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .bonding-search-box input {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--border, #e2e8f0);
      background: var(--surface, #ffffff);
      font-size: 13px;
      color: var(--text-1, #0f172a);
      outline: none;
      box-sizing: border-box;
    }

    .bonding-search-box input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
    }

    .bonding-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 14px 4px 8px 4px;
    }

    .bonding-section-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      letter-spacing: 0.6px;
    }

    .bonding-mini-btn {
      background: transparent;
      border: none;
      color: #6366f1;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
    }

    .bonding-mini-btn:hover {
      background: rgba(99, 102, 241, 0.08);
    }

    .bonding-channel-list {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .bonding-channel-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.15s ease;
      background: transparent;
    }

    .bonding-channel-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.1);
    }

    .bonding-channel-avatar {
      font-size: 18px;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .bonding-channel-info {
      flex: 1;
      min-width: 0;
    }

    .bonding-channel-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .bonding-channel-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .bonding-channel-time {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      flex-shrink: 0;
    }

    .bonding-channel-preview {
      font-size: 12px;
      color: var(--text-3, #64748b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    .bonding-empty-channels {
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      padding: 10px 4px;
      line-height: 1.4;
    }

    /* Main Chat Section */
    .bonding-chat-main {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--surface, #ffffff);
    }

    .bonding-chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border, #e2e8f0);
      background: var(--surface, #ffffff);
    }

    .bonding-chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bonding-chat-header-avatar {
      font-size: 24px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-chat-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
    }

    .bonding-chat-sub {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin-top: 2px;
    }

    .bonding-chat-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-header-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 8px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2, #334155);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-header-btn:hover {
      background: var(--bg-hover, #f8fafc);
      border-color: #94a3b8;
    }

    .bonding-challenge-btn {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff !important;
      border: none;
    }

    .bonding-challenge-btn:hover {
      opacity: 0.92;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    /* Message Feed */
    .bonding-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--bg-card, #f8fafc);
    }

    .bonding-empty-feed {
      text-align: center;
      margin: auto;
      max-width: 340px;
    }

    .bonding-empty-icon {
      font-size: 44px;
      margin-bottom: 8px;
    }

    .bonding-empty-feed h4 {
      font-size: 16px;
      color: var(--navy-900, #0f172a);
      margin: 0 0 6px 0;
    }

    .bonding-empty-feed p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
      line-height: 1.5;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(148, 163, 184, 0.14);
      color: var(--text-2, #475569);
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .bonding-msg-row {
      display: flex;
      gap: 10px;
      max-width: 78%;
    }

    .bonding-msg-row.self {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .bonding-msg-row.other {
      align-self: flex-start;
    }

    .bonding-msg-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .bonding-msg-row.self .bonding-msg-avatar {
      background: #8b5cf6;
    }

    .bonding-msg-bubble-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-msg-row.self .bonding-msg-bubble-wrap {
      align-items: flex-end;
    }

    .bonding-msg-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      padding: 0 4px;
    }

    .bonding-msg-sender {
      font-weight: 600;
      color: var(--text-2, #475569);
    }

    .bonding-msg-bubble {
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.45;
      word-break: break-word;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .bonding-msg-row.other .bonding-msg-bubble {
      background: var(--surface, #ffffff);
      color: var(--text-1, #0f172a);
      border: 1px solid var(--border, #e2e8f0);
      border-top-left-radius: 4px;
    }

    .bonding-msg-row.self .bonding-msg-bubble {
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
      color: #ffffff;
      border-top-right-radius: 4px;
    }

    /* Challenge Message Card */
    .bonding-challenge-card {
      background: var(--surface, #ffffff);
      border: 2px solid #6366f1;
      border-radius: 16px;
      padding: 16px;
      min-width: 290px;
      max-width: 380px;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.12);
    }

    .bonding-challenge-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .bonding-challenge-icon {
      font-size: 26px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-challenge-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
    }

    .bonding-challenge-sub {
      font-size: 11px;
      color: var(--text-3, #64748b);
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 10px;
    }

    .status-badge.live {
      background: #dcfce7;
      color: #15803d;
    }

    .status-badge.done {
      background: #f1f5f9;
      color: #475569;
    }

    .bonding-challenge-text {
      font-size: 13px;
      color: var(--text-2, #334155);
      margin-bottom: 10px;
      line-height: 1.4;
    }

    .bonding-challenge-participants {
      background: var(--bg-hover, #f8fafc);
      padding: 10px 12px;
      border-radius: 10px;
      margin-bottom: 12px;
      font-size: 12px;
    }

    .bonding-part-title {
      font-weight: 600;
      color: var(--text-2, #475569);
      margin-bottom: 6px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .bonding-part-chips {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-part-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 3px 6px;
      border-radius: 6px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
    }

    .bonding-part-chip.winner {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .part-score {
      color: #6366f1;
    }

    .bonding-btn-play-duel {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-btn-play-duel:hover {
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
      transform: translateY(-1px);
    }

    /* Reactions Row */
    .bonding-reactions-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }

    .bonding-rxn-tag {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 100px;
      padding: 2px 7px;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      cursor: pointer;
      color: var(--text-2, #475569);
    }

    .bonding-rxn-tag.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
      color: #6366f1;
    }

    .bonding-add-rxn-btn {
      background: transparent;
      border: none;
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 6px;
    }

    .bonding-add-rxn-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #475569);
    }

    /* Chat Input Bar */
    .bonding-chat-input-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-top: 1px solid var(--border, #e2e8f0);
      background: var(--surface, #ffffff);
    }

    .bonding-input-action-btn {
      background: var(--bg-hover, #f1f5f9);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-2, #334155);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .bonding-input-action-btn:hover {
      background: var(--border, #e2e8f0);
    }

    .bonding-input-field {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      outline: none;
      resize: none;
      font-family: inherit;
    }

    .bonding-input-field:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
    }

    .bonding-send-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-send-btn:hover {
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
      opacity: 0.95;
    }

    /* Modal Styles */
    .bonding-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .bonding-modal-card {
      background: var(--surface, #ffffff);
      border-radius: 20px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      border: 1px solid var(--border, #e2e8f0);
    }

    .bonding-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--border, #e2e8f0);
    }

    .bonding-modal-header h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0;
    }

    .bonding-modal-close {
      background: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: var(--text-3, #94a3b8);
      line-height: 1;
    }

    .bonding-modal-body {
      padding: 20px 22px;
    }

    .bonding-form-section {
      margin-bottom: 16px;
    }

    .bonding-form-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-2, #334155);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .bonding-input, .bonding-select {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      box-sizing: border-box;
      outline: none;
    }

    .bonding-input:focus, .bonding-select:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
    }

    .bonding-add-member-row {
      display: flex;
      gap: 10px;
    }

    .bonding-members-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 250px;
      overflow-y: auto;
    }

    .bonding-member-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
    }

    .bonding-member-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bonding-member-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-member-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
    }

    .you-badge {
      font-size: 10px;
      background: #dbeafe;
      color: #1e40af;
      padding: 1px 5px;
      border-radius: 4px;
      margin-left: 4px;
    }

    .bonding-member-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      display: block;
    }

    .bonding-btn-danger {
      padding: 6px 12px;
      border-radius: 7px;
      border: 1px solid #fecaca;
      background: #fef2f2;
      color: #dc2626;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .bonding-btn-danger:hover {
      background: #fee2e2;
    }

    .bonding-btn-primary {
      padding: 9px 16px;
      border-radius: 9px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-btn-primary:hover {
      opacity: 0.95;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .bonding-btn-secondary {
      padding: 9px 16px;
      border-radius: 9px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      color: var(--text-2, #334155);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .bonding-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .bonding-hint-text {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0 0 14px 0;
      line-height: 1.45;
    }

    .bonding-user-pick-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 380px;
      overflow-y: auto;
    }

    .bonding-user-pick-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-radius: 12px;
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bonding-user-pick-item:hover {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.04);
    }

    .bonding-user-pick-info {
      flex: 1;
      margin-left: 12px;
    }

    .user-pick-name {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
      display: block;
    }

    .user-pick-role {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      display: block;
    }

    /* Game Picker Cards */
    .bonding-game-pick-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 600px) {
      .bonding-game-pick-grid {
        grid-template-columns: 1fr;
      }
    }

    .bonding-game-card-pick {
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 14px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    .game-pick-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .game-pick-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin-bottom: 4px;
    }

    .game-pick-desc {
      font-size: 12px;
      color: var(--text-3, #64748b);
      line-height: 1.4;
      margin-bottom: 12px;
      flex: 1;
    }

    /* Tic Tac Toe Grid */
    .ttt-players-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
    }

    .ttt-status-banner {
      background: var(--bg-hover, #f1f5f9);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--navy-900, #0f172a);
      margin-bottom: 16px;
    }

    .ttt-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      max-width: 270px;
      margin: 0 auto;
    }

    .ttt-cell {
      width: 82px;
      height: 82px;
      background: var(--bg-card, #f8fafc);
      border: 2px solid var(--border, #cbd5e1);
      border-radius: 14px;
      font-size: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .ttt-cell:not(:disabled):hover {
      background: rgba(99, 102, 241, 0.08);
      border-color: #6366f1;
      transform: scale(1.03);
    }

    /* Trivia Questions */
    .trivia-timer-badge {
      font-size: 12px;
      font-weight: 700;
      background: #fee2e2;
      color: #b91c1c;
      padding: 3px 8px;
      border-radius: 6px;
    }

    .trivia-question-text {
      font-size: 15px;
      font-weight: 600;
      color: var(--navy-900, #0f172a);
      line-height: 1.45;
      margin-bottom: 18px;
    }

    .trivia-options-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .trivia-option-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid var(--border, #cbd5e1);
      background: var(--surface, #ffffff);
      cursor: pointer;
      text-align: left;
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      transition: all 0.15s ease;
    }

    .trivia-option-btn:hover:not(:disabled) {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.04);
    }

    .trivia-option-btn.correct {
      background: #dcfce7 !important;
      border-color: #22c55e !important;
      color: #15803d !important;
      font-weight: 700;
    }

    .trivia-option-btn.wrong {
      background: #fee2e2 !important;
      border-color: #ef4444 !important;
      color: #b91c1c !important;
    }

    .opt-letter {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: var(--bg-hover, #f1f5f9);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 11px;
    }

    /* Wordle Styles */
    .wordle-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0 auto 18px auto;
      max-width: 260px;
    }

    .wordle-row {
      display: flex;
      gap: 6px;
      justify-content: center;
    }

    .wordle-cell {
      width: 44px;
      height: 44px;
      border: 2px solid var(--border, #cbd5e1);
      border-radius: 8px;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      background: var(--surface, #ffffff);
    }

    .wordle-cell.green {
      background: #22c55e;
      color: #ffffff;
      border-color: #22c55e;
    }

    .wordle-cell.yellow {
      background: #eab308;
      color: #ffffff;
      border-color: #eab308;
    }

    .wordle-cell.gray {
      background: #64748b;
      color: #ffffff;
      border-color: #64748b;
    }

    .wordle-input-controls {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    /* Speed Typer Styles */
    .typer-passage-box {
      background: var(--bg-hover, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 12px;
      padding: 14px;
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--text-1, #0f172a);
      margin-bottom: 14px;
      user-select: none;
    }

    .typer-stats-bar {
      display: flex;
      gap: 16px;
      font-size: 13px;
      color: var(--text-2, #334155);
      margin-top: 10px;
    }

    /* Arcade View */
    .bonding-arcade-wrap {
      padding: 8px 4px;
    }

    .arcade-hero {
      text-align: center;
      padding: 30px 20px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
      border-radius: 20px;
      margin-bottom: 24px;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .arcade-hero h1 {
      font-size: 26px;
      font-weight: 800;
      color: var(--navy-900, #0f172a);
      margin: 0 0 6px 0;
    }

    .arcade-hero p {
      font-size: 14px;
      color: var(--text-2, #475569);
      margin: 0;
    }

    .arcade-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .arcade-card {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 18px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
      transition: all 0.2s ease;
    }

    .arcade-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
      border-color: #6366f1;
    }

    .arcade-card-icon {
      font-size: 38px;
      margin-bottom: 12px;
    }

    .arcade-card-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0 0 8px 0;
    }

    .arcade-card-desc {
      font-size: 13px;
      color: var(--text-3, #64748b);
      line-height: 1.5;
      margin: 0 0 16px 0;
      flex: 1;
    }

    .arcade-card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }

    .arcade-card-tags span {
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #475569);
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }

    /* Leaderboard Styles */
    .bonding-leaderboard-wrap {
      padding: 8px 4px;
    }

    .lb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .lb-header h2 {
      font-size: 22px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
      margin: 0 0 4px 0;
    }

    .lb-header p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    .lb-podium {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 16px;
      margin-bottom: 30px;
    }

    @media (max-width: 640px) {
      .lb-podium {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .lb-podium-card {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 18px;
      padding: 20px;
      text-align: center;
      flex: 1;
      max-width: 220px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
    }

    .lb-podium-card.rank-1 {
      border: 2px solid #f59e0b;
      padding: 26px 20px;
      background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);
    }

    .podium-medal {
      font-size: 32px;
      margin-bottom: 6px;
    }

    .podium-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 8px auto;
    }

    .podium-name {
      font-size: 15px;
      font-weight: 700;
      color: var(--navy-900, #0f172a);
    }

    .podium-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      margin-bottom: 6px;
      text-transform: capitalize;
    }

    .podium-pts {
      font-size: 18px;
      font-weight: 800;
      color: #6366f1;
      margin-bottom: 2px;
    }

    .podium-wins {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .lb-table-card {
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 16px;
      overflow-x: auto;
      box-shadow: 0 4px 14px rgba(0,0,0,0.02);
    }

    .lb-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13.5px;
    }

    .lb-table th {
      padding: 14px 18px;
      background: var(--bg-hover, #f8fafc);
      color: var(--text-3, #64748b);
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border, #e2e8f0);
    }

    .lb-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border, #f1f5f9);
      color: var(--text-1, #0f172a);
    }

    .lb-user-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .lb-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #6366f1;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .achieve-badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 6px;
      background: #ede9fe;
      color: #6d28d9;
      font-size: 11px;
      font-weight: 600;
      margin-right: 4px;
    }

    .bonding-avatar-picker {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .avatar-opt {
      font-size: 22px;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--border, #e2e8f0);
      cursor: pointer;
      background: var(--surface, #ffffff);
    }

    .avatar-opt.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
    }

    .bonding-member-checkboxes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--border, #e2e8f0);
      padding: 10px;
      border-radius: 10px;
    }

    .bonding-check-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: var(--text-2, #334155);
      cursor: pointer;
    }

    .bonding-emoji-popup {
      position: absolute;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #cbd5e1);
      border-radius: 12px;
      padding: 6px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      z-index: 10001;
    }

    .emoji-opt-btn {
      font-size: 20px;
      padding: 6px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
    }

    .emoji-opt-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }
  `;

  document.head.appendChild(style);
}
