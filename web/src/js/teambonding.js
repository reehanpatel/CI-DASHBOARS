/**
 * CI360 TEAM CHAT, LOUNGE & MULTIPLAYER GAMES MODULE
 * Native direct 1-on-1 personal messaging, group lounges, and multiplayer games.
 * Features:
 * - Direct (personal) messaging with any colleague
 * - Group lounges creation & management
 * - Two fully functional multiplayer games:
 *   1. Chess Duel (full legal rules, checkmate, stalemate, castling, promotion, clocks)
 *   2. Tic-Tac-Toe Challenge (3x3 board, alternating turns, win/draw detection, rematch)
 * - Mandatory employee selection flow before challenge can be created or match can begin
 * - Real-time synchronization between players
 * - Lounge & Chat seamless integration with shared match and invitation system
 * - Match History & Live Matches Management
 * - Flawless light & dark mode theme support
 */

import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  escapeHtml,
  flashToast
} from './api.js';
import { Chess } from 'chess.js';

export async function initTeamBonding(container, options = {}) {
  const currentUser = options.currentUser || {};
  const userRole = options.userRole || currentUser?.role || 'employee';
  let currentView = 'chat'; // 'chat' or 'lounge_games'
  let channels = [];
  let activeChannel = null;
  let colleagues = [];
  let messages = [];
  let gameOverview = null;
  let pollInterval = null;
  let isSending = false;
  let activeMatchModalId = null;
  let matchPollInterval = null;
  let currentLoungeSubTab = 'multiplayer'; // 'multiplayer' or 'arcade'
  let currentArcadeGameFilter = 'all'; // 'all', 'snake', '2048', 'memory'

  // Render Shell Container with dual Navigation (Chat & Lounge Games)
  container.innerHTML = `
    <div class="bonding-wrap" id="bonding-app-root">
      <!-- Top Navigation & Header Bar -->
      <div class="bonding-nav-bar">
        <div class="bonding-nav-left">
          <div class="bonding-logo-badge">💬</div>
          <div>
            <h2 class="bonding-title">Team Chat & Lounge</h2>
            <p class="bonding-subtitle">Direct Messages · Group Lounges · Multiplayer Games</p>
          </div>
        </div>

        <!-- View Switcher Tabs -->
        <div class="bonding-view-tabs">
          <button class="bonding-view-tab active" id="tab-nav-chat">
            <span>💬</span> <span>Team Chat</span>
          </button>
          <button class="bonding-view-tab" id="tab-nav-lounge">
            <span>🎮</span> <span>Lounge & Games</span>
          </button>
        </div>

        <div class="bonding-nav-right">
          <button class="bonding-top-action-btn primary" id="btn-top-challenge" title="Challenge an Employee">
            <span>⚔️</span> <span>Challenge</span>
          </button>
          <button class="bonding-top-action-btn" id="btn-top-new-chat" title="Start a Personal Chat">
            <span>👤</span> <span>New Chat</span>
          </button>
          <button class="bonding-top-action-btn" id="btn-top-new-group" title="Create a Group Lounge">
            <span>👥</span> <span>+ Group</span>
          </button>
        </div>
      </div>

      <!-- Main Chat Layout (Shown when currentView === 'chat') -->
      <div class="bonding-chat-layout" id="bonding-chat-main-wrap">
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
            <div class="bonding-loading-text">Loading groups...</div>
          </div>

          <!-- Direct 1-on-1 Messages Section -->
          <div class="bonding-section-header" style="margin-top: 18px;">
            <span class="bonding-section-title">DIRECT MESSAGES</span>
            <button class="bonding-mini-btn" id="btn-new-direct-chat" title="New Direct Message">
              <span>+</span> New Chat
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-direct-list">
            <div class="bonding-loading-text">Loading direct chats...</div>
          </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="bonding-chat-main" id="bonding-chat-panel">
          <div class="bonding-chat-loading">Loading conversation...</div>
        </main>
      </div>

      <!-- Lounge & Multiplayer Games Arena Layout (Shown when currentView === 'lounge_games') -->
      <div class="bonding-lounge-layout" id="bonding-lounge-main-wrap" style="display: none;">
        <div class="bonding-loading-text" style="padding: 40px; text-align: center;">Loading Lounge & Games Arena...</div>
      </div>
    </div>

    <!-- Modals container -->
    <div id="bonding-modals-root"></div>
  `;

  // Inject Dedicated Theme-Adaptive Styles
  injectBondingStyles();

  // Load Data
  await loadInitialData();
  renderChatPanel();

  // Setup View Switcher
  const tabChat = container.querySelector('#tab-nav-chat');
  const tabLounge = container.querySelector('#tab-nav-lounge');
  const chatWrap = container.querySelector('#bonding-chat-main-wrap');
  const loungeWrap = container.querySelector('#bonding-lounge-main-wrap');

  tabChat?.addEventListener('click', async () => {
    currentView = 'chat';
    tabChat.classList.add('active');
    tabLounge.classList.remove('active');
    chatWrap.style.display = 'grid';
    loungeWrap.style.display = 'none';
    renderChatPanel();
    if (activeChannel) await loadMessages(activeChannel._id);
  });

  tabLounge?.addEventListener('click', async () => {
    currentView = 'lounge_games';
    tabLounge.classList.add('active');
    tabChat.classList.remove('active');
    chatWrap.style.display = 'none';
    loungeWrap.style.display = 'block';
    await renderLoungeGamesView();
  });

  // Top header button shortcuts
  container.querySelector('#btn-top-new-chat')?.addEventListener('click', openNewDirectChatModal);
  container.querySelector('#btn-top-new-group')?.addEventListener('click', openCreateGroupModal);
  container.querySelector('#btn-top-challenge')?.addEventListener('click', () => openGameChallengeModal());

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

  // Real-time polling
  startPolling();

  // Cleanup on unmount
  const observer = new MutationObserver((mutations, obs) => {
    if (!document.body.contains(container)) {
      if (pollInterval) clearInterval(pollInterval);
      if (matchPollInterval) clearInterval(matchPollInterval);
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

      if (channels.length > 0) {
        const savedChanId = localStorage.getItem('ci360_bonding_active_channel');
        if (savedChanId && channels.some(c => c._id === savedChanId)) {
          activeChannel = channels.find(c => c._id === savedChanId);
        } else if (!activeChannel) {
          activeChannel = channels.find(c => c.name.includes('Lounge')) || channels[0];
        }
      }

      renderSidebarChannels();

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
      localStorage.setItem('ci360_bonding_active_channel', channelId);
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

  let pollCycle = 0;
  function startPolling() {
    if (pollInterval) clearInterval(pollInterval);
    pollInterval = setInterval(async () => {
      try {
        if (!document.body.contains(container)) {
          clearInterval(pollInterval);
          return;
        }

        pollCycle++;
        // Every 6s (2 cycles), sync channel list in case a new group/chat was started
        if (pollCycle % 2 === 0) {
          const latestChans = await apiGet('/bonding/channels').catch(() => null);
          if (latestChans && JSON.stringify(latestChans.map(c => c._id + c.lastMessage?.sentAt)) !== JSON.stringify(channels.map(c => c._id + c.lastMessage?.sentAt))) {
            channels = latestChans;
            renderSidebarChannels();
          }
        }

        if (currentView === 'chat' && activeChannel) {
          await loadMessages(activeChannel._id, true);
        } else if (currentView === 'lounge_games') {
          await renderLoungeGamesView(true);
        }
      } catch (e) {
        // quiet polling error
      }
    }, 3000);
  }

  /* =========================================================================
     SIDEBAR RENDERING
     ========================================================================= */
  function renderSidebarChannels() {
    const groupList = container.querySelector('#bonding-group-list');
    const directList = container.querySelector('#bonding-direct-list');
    if (!groupList || !directList) return;

    const groups = channels.filter(c => c.type === 'group');
    const directs = channels.filter(c => c.type === 'direct');

    // Render Group Lounges
    if (groups.length === 0) {
      groupList.innerHTML = `<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>`;
    } else {
      const myId = currentUser?._id || currentUser?.id;
      const isSuperadmin = (userRole === 'superadmin' || currentUser?.role === 'superadmin');

      groupList.innerHTML = groups.map(g => {
        const isActive = activeChannel && activeChannel._id === g._id;
        const unreadCount = 0;
        const isCreator = g.createdBy && g.createdBy.userId && String(g.createdBy.userId) === String(myId);
        const canDelete = isCreator || isSuperadmin;

        return `
          <div class="bonding-channel-item ${isActive ? 'active' : ''}" data-channel-id="${g._id}">
            <div class="bonding-channel-icon">${g.avatar || '👥'}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${escapeHtml(g.name)}</div>
              <div class="bonding-channel-preview">${escapeHtml(g.lastMessage?.content || 'No messages yet')}</div>
            </div>
            ${unreadCount > 0 ? `<div class="bonding-unread-badge">${unreadCount}</div>` : ''}
            ${canDelete ? `
              <button class="bonding-channel-del-btn" data-channel-id="${g._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            ` : `
              <button class="bonding-channel-leave-btn" data-channel-id="${g._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `;
      }).join('');
    }

    // Render Direct Chats
    if (directs.length === 0) {
      directList.innerHTML = `<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>`;
    } else {
      directList.innerHTML = directs.map(d => {
        const isActive = activeChannel && activeChannel._id === d._id;
        const name = d.displayName || d.name || 'Colleague';
        const initial = name.slice(0, 1).toUpperCase();
        return `
          <div class="bonding-channel-item ${isActive ? 'active' : ''}" data-channel-id="${d._id}">
            <div class="bonding-channel-avatar">${initial}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${escapeHtml(name)}</div>
              <div class="bonding-channel-preview">${escapeHtml(d.lastMessage?.content || 'Say hello...')}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${d._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `;
      }).join('');
    }

    bindSidebarEvents();
  }

  function bindSidebarEvents() {
    const items = container.querySelectorAll('.bonding-channel-item');
    items.forEach(item => {
      item.onclick = async (e) => {
        if (e.target.closest('.bonding-channel-del-btn') || e.target.closest('.bonding-channel-leave-btn')) return;
        const id = item.dataset.channelId;
        const target = channels.find(c => c._id === id);
        if (target) {
          activeChannel = target;
          items.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          renderChatPanel();
          await loadMessages(target._id);
        }
      };
    });

    // Leave group from sidebar
    container.querySelectorAll('.bonding-channel-leave-btn').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const chanId = btn.dataset.channelId;
        const target = channels.find(c => c._id === chanId);
        const groupName = target?.name || 'this group';
        if (!confirm(`Are you sure you want to leave the group "${groupName}"?`)) return;

        try {
          btn.disabled = true;
          await apiPost(`/bonding/channels/${chanId}/leave`, {});
          flashToast(`You left "${groupName}"`, 'info');
          channels = channels.filter(c => c._id !== chanId);
          if (activeChannel && activeChannel._id === chanId) {
            activeChannel = channels.find(c => c.type === 'group') || channels[0] || null;
            renderChatPanel();
            if (activeChannel) await loadMessages(activeChannel._id);
          }
          renderSidebarChannels();
        } catch (err) {
          flashToast(err.message || 'Failed to leave group', 'error');
          btn.disabled = false;
        }
      };
    });

    // Delete conversation from sidebar (Creator only)
    container.querySelectorAll('.bonding-channel-del-btn').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const chanId = btn.dataset.channelId;
        const target = channels.find(c => c._id === chanId);
        const isDirect = target && target.type === 'direct';
        const label = isDirect ? 'this 1-on-1 chat' : `the group "${target?.name || ''}"`;
        if (!confirm(`Are you sure you want to delete ${label}? All messages will be permanently removed.`)) return;

        try {
          btn.disabled = true;
          await apiDelete(`/bonding/channels/${chanId}`);
          flashToast(isDirect ? '1-on-1 chat deleted' : 'Group deleted', 'success');
          channels = channels.filter(c => c._id !== chanId);
          if (activeChannel && activeChannel._id === chanId) {
            activeChannel = channels[0] || null;
            renderChatPanel();
            if (activeChannel) await loadMessages(activeChannel._id);
          }
          renderSidebarChannels();
        } catch (err) {
          flashToast(err.message || 'Failed to delete conversation', 'error');
          btn.disabled = false;
        }
      };
    });

    container.querySelector('#btn-create-group')?.addEventListener('click', openCreateGroupModal);
    container.querySelector('#btn-new-direct-chat')?.addEventListener('click', openNewDirectChatModal);
  }

  /* =========================================================================
     CHAT MAIN PANEL
     ========================================================================= */
  function renderChatPanel() {
    const chatPanel = container.querySelector('#bonding-chat-panel');
    if (!chatPanel) return;

    if (!activeChannel) {
      chatPanel.innerHTML = `
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;
      return;
    }

    const title = escapeHtml(activeChannel.displayName || activeChannel.name);
    const memberCount = (activeChannel.members || []).length;
    const isGroup = activeChannel.type === 'group';

    // In direct chat, find the other person
    const myId = currentUser?._id || currentUser?.id;
    const otherMember = !isGroup
      ? (activeChannel.members || []).find(m => m.userId?.toString() !== myId?.toString())
      : null;

    const isCreator = activeChannel.createdBy && activeChannel.createdBy.userId && String(activeChannel.createdBy.userId) === String(myId);
    const isSuperadmin = (userRole === 'superadmin' || currentUser?.role === 'superadmin');
    const canDeleteGroup = isCreator || isSuperadmin;

    chatPanel.innerHTML = `
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${isGroup ? (activeChannel.avatar || '👥') : '👤'}</div>
          <div>
            <div class="bonding-chat-title">${title}</div>
            <div class="bonding-chat-sub">
              ${isGroup
        ? `<span>${memberCount} members</span> · <span>${escapeHtml(activeChannel.description || 'Public Lounge')}</span>`
        : `<span>Direct 1-on-1 Personal Chat</span> · <span class="status-online">🟢 Active</span>`
      }
            </div>
          </div>
        </div>

        <div class="bonding-chat-header-actions">
          <!-- Quick Challenge Button -->
          <button class="bonding-header-btn challenge-highlight" id="btn-chat-challenge" title="Challenge to Multiplayer Game">
            <span>⚔️</span> <span>Challenge Game</span>
          </button>

          <!-- Clear messages button -->
          <button class="bonding-header-btn" id="btn-clear-chat" title="Clear All Messages in this Chat">
            <span>🧹</span> <span>Clear Chat</span>
          </button>

          ${isGroup ? `
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${memberCount})</span>
            </button>
            ${canDeleteGroup ? `
              <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group (Creator only)">
                <span>🗑️</span> <span>Delete Group</span>
              </button>
            ` : `
              <button class="bonding-header-btn danger" id="btn-leave-group" title="Leave this group">
                <span>🚪</span> <span>Leave Group</span>
              </button>
            `}
          ` : `
            <button class="bonding-header-btn danger" id="btn-delete-direct" title="Delete 1-on-1 Chat">
              <span>🗑️</span> <span>Delete Chat</span>
            </button>
          `}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${renderMessageItems()}
      </div>

      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <span>😀</span>
        </button>
        <button class="bonding-input-action-btn" id="btn-input-challenge" title="Send Multiplayer Challenge">
          <span>🎮</span>
        </button>
        <input
          type="text"
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or challenge to a game... (Press Enter to send)"
          autocomplete="off"
        />
        <button class="bonding-send-btn" id="btn-send-message">
          <span>Send</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;

    bindChatHeaderEvents(otherMember);
    bindInputBarEvents(otherMember);
    bindMessageActions();
    scrollMessagesToBottom();
  }

  function renderMessageItems() {
    if (!messages || messages.length === 0) {
      return `
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;
    }

    const myId = currentUser?._id || currentUser?.id;

    return messages.map(msg => {
      const isSelf = msg.sender && msg.sender.userId && myId && msg.sender.userId.toString() === myId.toString();

      if (msg.type === 'system') {
        return `
          <div class="bonding-msg-system" data-msg-id="${msg._id}">
            <span>ℹ️</span> <span>${escapeHtml(msg.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${msg._id}" title="Delete Message">&times;</button>
          </div>
        `;
      }

      // MULTIPLAYER GAME INVITATION CARD IN CHAT STREAM
      if (msg.type === 'challenge' && msg.challengeData) {
        const cd = msg.challengeData;
        const gTitle = cd.gameTitle || 'Game Challenge';
        const gType = cd.gameType || 'dotsboxes';
        const gIcon = gType === 'dotsboxes' ? '⏹️' : (gType === 'ludo' ? '🎲' : (gType === 'chess' ? '♟️' : '❌'));
        const inviteId = cd.gameState?.invitationId;
        const targetId = cd.targetUserId?.toString();
        const senderId = msg.sender?.userId?.toString();
        const isRecipient = myId && targetId === myId.toString();
        const isSender = myId && senderId === myId.toString();

        return `
          <div class="bonding-msg-row ${isSelf ? 'self' : 'other'}" data-msg-id="${msg._id}">
            <div class="bonding-msg-avatar" title="${escapeHtml(msg.sender?.name || 'Teammate')}">
              ${(msg.sender?.name || 'U').slice(0, 1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-sender">${escapeHtml(msg.sender?.name || 'Teammate')}</span>
                <span class="bonding-msg-time">${formatTime(msg.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${msg._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${gIcon}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${escapeHtml(gTitle)}</h4>
                    <p class="game-bubble-desc">${escapeHtml(msg.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${cd.status === 'pending'
            ? `<span class="badge amber">⏳ Awaiting Response</span>`
            : cd.status === 'active' || cd.status === 'accepted'
              ? `<span class="badge green">🟢 Match Active</span>`
              : cd.status === 'declined'
                ? `<span class="badge red">❌ Challenge Declined</span>`
                : cd.status === 'cancelled'
                  ? `<span class="badge gray">🚫 Challenge Cancelled</span>`
                  : `<span class="badge gray">${escapeHtml(cd.status?.toUpperCase() || 'COMPLETED')}</span>`
          }
                </div>

                <div class="game-bubble-actions">
                  ${cd.status === 'pending' && isRecipient
            ? `
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${inviteId}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${inviteId}" data-action="decline">
                        Decline
                      </button>
                    `
            : cd.status === 'pending' && isSender
              ? `
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${inviteId}" data-action="cancel">
                          Cancel
                        </button>
                      `
              : cd.status === 'declined' || cd.status === 'cancelled'
                ? `
                        <div class="game-pending-text" style="font-size:11.5px;color:var(--text-3);font-style:italic;">
                          ${cd.status === 'declined' ? 'Challenge was declined' : 'Challenge was cancelled'}
                        </div>
                      `
                : `
                        <button class="game-btn-play btn-launch-match-from-card" data-match-id="${cd.gameState?.matchId || ''}" data-invite-id="${inviteId || ''}">
                          🎮 Enter Match Arena
                        </button>
                      `
          }
                </div>
              </div>

              ${renderReactionsBar(msg)}
            </div>
          </div>
        `;
      }

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
              <button class="bonding-msg-del-btn" data-msg-id="${msg._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
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
    let itemsHtml = rxns.map(r => {
      const myId = currentUser?._id || currentUser?.id;
      const didIReact = (r.users || []).some(u => u.toString() === (myId?.toString()));
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

  function bindChatHeaderEvents(otherMember) {
    // Challenge in header
    const btnChallenge = container.querySelector('#btn-chat-challenge');
    if (btnChallenge) {
      btnChallenge.onclick = () => {
        // If 1-on-1 direct chat, pre-select that colleague
        if (otherMember) {
          openGameChallengeModal(null, otherMember.userId || otherMember._id);
        } else {
          openGameChallengeModal();
        }
      };
    }

    // Manage Members
    const btnMembers = container.querySelector('#btn-manage-members');
    if (btnMembers) btnMembers.onclick = openManageMembersModal;

    // Delete Group (Creator / Superadmin only)
    const btnDelete = container.querySelector('#btn-delete-group');
    if (btnDelete) btnDelete.onclick = confirmDeleteGroup;

    // Leave Group (Members)
    const btnLeave = container.querySelector('#btn-leave-group');
    if (btnLeave) btnLeave.onclick = confirmLeaveGroup;

    // Delete 1-on-1 Direct Chat
    const btnDeleteDirect = container.querySelector('#btn-delete-direct');
    if (btnDeleteDirect) {
      btnDeleteDirect.onclick = async () => {
        if (!activeChannel) return;
        if (!confirm('Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed.')) return;
        try {
          btnDeleteDirect.disabled = true;
          await apiDelete(`/bonding/channels/${activeChannel._id}`);
          flashToast('1-on-1 chat deleted successfully', 'success');
          const delId = activeChannel._id;
          channels = channels.filter(c => c._id !== delId);
          activeChannel = channels[0] || null;
          renderSidebarChannels();
          renderChatPanel();
          if (activeChannel) await loadMessages(activeChannel._id);
        } catch (err) {
          flashToast(err.message || 'Could not delete 1-on-1 chat', 'error');
          btnDeleteDirect.disabled = false;
        }
      };
    }

    // Clear Chat Messages
    const btnClearChat = container.querySelector('#btn-clear-chat');
    if (btnClearChat) {
      btnClearChat.onclick = async () => {
        if (!activeChannel) return;
        if (!confirm('Are you sure you want to clear all messages in this conversation?')) return;
        try {
          btnClearChat.disabled = true;
          await apiDelete(`/bonding/channels/${activeChannel._id}/messages`);
          flashToast('Chat messages cleared', 'success');
          messages = [];
          renderMessageFeed();
        } catch (err) {
          flashToast(err.message || 'Could not clear chat messages', 'error');
        } finally {
          btnClearChat.disabled = false;
        }
      };
    }
  }

  function bindInputBarEvents(otherMember) {
    const input = container.querySelector('#bonding-message-input');
    const sendBtn = container.querySelector('#btn-send-message');
    const emojiBtn = container.querySelector('#btn-quick-emoji');
    const challengeBtn = container.querySelector('#btn-input-challenge');

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    if (sendBtn) sendBtn.onclick = sendMessage;

    if (challengeBtn) {
      challengeBtn.onclick = () => {
        if (otherMember) {
          openGameChallengeModal(null, otherMember.userId || otherMember._id);
        } else {
          openGameChallengeModal();
        }
      };
    }

    if (emojiBtn) {
      emojiBtn.onclick = (e) => {
        e.stopPropagation();
        if (!input) return;
        openChatEmojiPicker(emojiBtn, (chosenEmoji) => {
          const start = input.selectionStart ?? input.value.length;
          const end = input.selectionEnd ?? input.value.length;
          const text = input.value;
          input.value = text.substring(0, start) + chosenEmoji + text.substring(end);
          input.focus();
          const newPos = start + chosenEmoji.length;
          try { input.setSelectionRange(newPos, newPos); } catch (err) {}
        });
      };
    }
  }

  function bindMessageActions() {
    // Accept / Decline / Cancel Game Invitation from card
    container.querySelectorAll('.btn-respond-invite').forEach(btn => {
      btn.onclick = async () => {
        const inviteId = btn.dataset.inviteId;
        const action = btn.dataset.action;
        await respondToGameInvitation(inviteId, action);
      };
    });

    // Enter / Launch Match Arena from card
    container.querySelectorAll('.btn-launch-match-from-card').forEach(btn => {
      btn.onclick = async () => {
        const directMatchId = btn.dataset.matchId;
        const inviteId = btn.dataset.inviteId;

        if (directMatchId) {
          openGameMatchModal(directMatchId);
          return;
        }

        try {
          btn.disabled = true;
          const inv = await apiGet(`/bonding/invitations`);
          const allInv = (inv.incoming || []).concat(inv.sent || []);
          const found = allInv.find(i => i._id === inviteId || (i.matchId && i.matchId.toString() === inviteId));
          if (found && found.matchId) {
            openGameMatchModal(found.matchId);
            return;
          }

          const matchesRes = await apiGet('/bonding/matches').catch(() => []);
          const foundMatch = (matchesRes || []).find(m => m.invitationId === inviteId || m._id === inviteId);
          if (foundMatch) {
            openGameMatchModal(foundMatch._id);
            return;
          }

          flashToast('Match has not started yet or has finished', 'warning');
        } catch (e) {
          flashToast(e.message || 'Could not load match', 'error');
        } finally {
          btn.disabled = false;
        }
      };
    });

    // Delete Message button
    const msgDelBtns = container.querySelectorAll('.bonding-msg-del-btn');
    msgDelBtns.forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const msgId = btn.dataset.msgId;
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
          btn.disabled = true;
          await apiDelete(`/bonding/messages/${msgId}`);
          messages = messages.filter(m => m._id !== msgId);
          updateMessageFeedIncrementally();
          flashToast('Message deleted', 'success');
        } catch (err) {
          flashToast(err.message || 'Failed to delete message', 'error');
          btn.disabled = false;
        }
      };
    });

    // Reaction click (toggle)
    const rxnTags = container.querySelectorAll('.bonding-rxn-tag');
    rxnTags.forEach(tag => {
      tag.onclick = async () => {
        const msgId = tag.dataset.msgId;
        const emoji = tag.dataset.emoji;
        await toggleReaction(msgId, emoji);
      };
    });

    // Add reaction picker
    const addRxnBtns = container.querySelectorAll('.bonding-add-rxn-btn');
    addRxnBtns.forEach(btn => {
      btn.onclick = (e) => {
        const msgId = btn.dataset.msgId;
        openEmojiPicker(e.currentTarget, async (chosenEmoji) => {
          await toggleReaction(msgId, chosenEmoji);
        });
      };
    });
  }

  async function sendMessage() {
    const input = container.querySelector('#bonding-message-input');
    if (!input || !activeChannel || isSending) return;

    const content = input.value.trim();
    if (!content) return;

    try {
      isSending = true;
      input.value = '';
      const newMsg = await apiPost(`/bonding/channels/${activeChannel._id}/messages`, {
        content,
        type: 'text'
      });
      messages.push(newMsg);
      renderMessageFeed();
      scrollMessagesToBottom();
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

  function scrollMessagesToBottom() {
    const feed = container.querySelector('#bonding-messages-feed');
    if (feed) feed.scrollTop = feed.scrollHeight;
  }

  function updateMessageFeedIncrementally() {
    const feed = container.querySelector('#bonding-messages-feed');
    if (!feed) return;
    const isAtBottom = feed.scrollHeight - feed.scrollTop <= feed.clientHeight + 80;
    feed.innerHTML = renderMessageItems();
    bindMessageActions();
    if (isAtBottom) scrollMessagesToBottom();
  }

  function renderMessageFeed() {
    const feed = container.querySelector('#bonding-messages-feed');
    if (feed) {
      feed.innerHTML = renderMessageItems();
      bindMessageActions();
    }
  }

  /* =========================================================================
     LOUNGE & MULTIPLAYER GAMES ARENA VIEW
     ========================================================================= */
  async function renderLoungeGamesView(silent = false) {
    const loungeWrap = container.querySelector('#bonding-lounge-main-wrap');
    if (!loungeWrap) return;

    if (!silent) {
      loungeWrap.innerHTML = `<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>`;
    }

    try {
      const overview = await apiGet('/bonding/games/overview');
      gameOverview = overview;
      let arcadeData = { leaderboard: [], myBests: [] };
      if (currentLoungeSubTab === 'arcade') {
        try {
          arcadeData = await apiGet('/bonding/arcade/leaderboard?gameId=' + currentArcadeGameFilter);
        } catch (e) {
          console.error('Failed to load arcade data:', e);
        }
      }

      const myStats = overview.myStats || {};
      const availableGames = overview.availableGames || [];
      const incoming = overview.incomingChallenges || [];
      const sent = overview.sentChallenges || [];
      const activeMatches = overview.activeMatches || [];
      const recentMatches = overview.recentMatches || [];

      const myId = currentUser?._id || currentUser?.id;

      loungeWrap.innerHTML = `
        <div class="lounge-container">
          <!-- Segmented Navigation: Multiplayer vs Single-Player Arcade -->
          <div class="lounge-tab-nav-bar" style="display:flex;gap:10px;margin-bottom:20px;border-bottom:1px solid var(--border-sm);padding-bottom:14px;flex-wrap:wrap;">
            <button class="lounge-subtab-btn ${currentLoungeSubTab === 'multiplayer' ? 'active' : ''}" data-subtab="multiplayer" style="padding:9px 20px;border-radius:var(--r-md);font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;background:${currentLoungeSubTab === 'multiplayer' ? 'var(--brand-600)' : 'var(--bg-surface)'};color:${currentLoungeSubTab === 'multiplayer' ? '#fff' : 'var(--text-2)'};box-shadow:${currentLoungeSubTab === 'multiplayer' ? '0 2px 8px rgba(99,102,241,0.3)' : 'none'};">
              <span>⚔️</span> <span>Multiplayer Duels (Dots & Boxes, Ludo, Tic-Tac-Toe)</span>
            </button>
            <button class="lounge-subtab-btn ${currentLoungeSubTab === 'arcade' ? 'active' : ''}" data-subtab="arcade" style="padding:9px 20px;border-radius:var(--r-md);font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;background:${currentLoungeSubTab === 'arcade' ? 'var(--brand-600)' : 'var(--bg-surface)'};color:${currentLoungeSubTab === 'arcade' ? '#fff' : 'var(--text-2)'};box-shadow:${currentLoungeSubTab === 'arcade' ? '0 2px 8px rgba(99,102,241,0.3)' : 'none'};">
              <span>🕹️</span> <span>Single-Player Arcade & Leaderboard 🏆</span>
            </button>
          </div>

          ${currentLoungeSubTab === 'arcade' ? renderArcadeAndLeaderboardHtml(arcadeData, myId) : `
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${myStats.gamesPlayed || 0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${myStats.wins || 0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${myStats.losses || 0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${myStats.draws || 0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${myStats.gamesPlayed > 0 ? Math.round(((myStats.wins || 0) / myStats.gamesPlayed) * 100) : 0}%</span>
              <span class="stat-lbl">Win Rate</span>
            </div>
          </div>

          <!-- Section 1: Available Games Cards -->
          <div class="lounge-section">
            <div class="lounge-section-head">
              <h3>🎮 Available Multiplayer Games</h3>
              <p>Voluntary casual competition with colleagues during breaks. Pick a game and challenge any employee!</p>
            </div>

            <div class="lounge-games-grid">
              ${availableGames.map(g => `
                <div class="lounge-game-card" data-game-id="${g.id}">
                  <div class="game-card-icon">${g.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${escapeHtml(g.name)}</h4>
                    <p class="game-card-desc">${escapeHtml(g.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${g.duration}</span>
                      ${(g.id === 'ludo' || g.id === 'dotsboxes')
          ? `<span class="meta-pill">👥 Up to 4 Players</span><span class="meta-pill">${g.id === 'dotsboxes' ? '⏹️ 16 Boxes Grid' : '🎯 4 Pawns / Base'}</span>`
          : '<span class="meta-pill">👥 2 Players</span>'
        }
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${g.id}" data-game-title="${escapeHtml(g.name)}">
                    ${g.id === 'dotsboxes' ? '⚔️ Play Dots & Boxes (2P–4P)' : (g.id === 'ludo' ? '⚔️ Play Ludo (2P–4P)' : '⚔️ Challenge Employee')}
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 2: Active Matches & Pending Challenges (2-col grid) -->
          <div class="lounge-two-col">
            <!-- Left: Incoming & Sent Challenges -->
            <div class="lounge-card-box">
              <div class="lounge-box-title">
                <span>📬 Game Invitations</span>
                <span class="badge blue">${incoming.length + sent.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${incoming.length})</h5>
              ${incoming.length === 0
          ? `<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>`
          : `
                  <div class="lounge-invites-list">
                    ${incoming.map(inv => `
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(inv.sender.name || 'U').slice(0, 1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${escapeHtml(inv.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${escapeHtml(inv.sender.name)}</strong> (${escapeHtml(inv.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${inv._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${inv._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `
        }

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${sent.length})</h5>
              ${sent.length === 0
          ? `<div class="box-empty-text">No pending outgoing invitations.</div>`
          : `
                  <div class="lounge-invites-list">
                    ${sent.map(inv => `
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(inv.recipient.name || 'U').slice(0, 1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${escapeHtml(inv.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${escapeHtml(inv.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${inv._id}" data-action="cancel">
                            Cancel
                          </button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `
        }
            </div>

            <!-- Right: Active Matches -->
            <div class="lounge-card-box">
              <div class="lounge-box-title">
                <span>⚡ Active Multiplayer Matches</span>
                <span class="badge green">${activeMatches.length} Live</span>
              </div>

              ${activeMatches.length === 0
          ? `<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>`
          : `
                  <div class="lounge-active-matches-list">
                    ${activeMatches.map(m => {
            const allPlayers = m.players || m.gameState?.players || [m.player1, m.player2].filter(Boolean);
            const otherPlayers = allPlayers.filter(p => p.userId && p.userId.toString() !== myId?.toString());
            const opp = m.player1?.userId?.toString() === myId?.toString() ? m.player2 : m.player1;
            const oppNames = otherPlayers.length > 0
              ? otherPlayers.map(p => escapeHtml(p.name)).join(', ')
              : (opp?.name ? escapeHtml(opp.name) : 'Colleagues');
            const myTurn = myId && m.currentTurnUserId && m.currentTurnUserId.toString() === myId.toString();

            return `
                        <div class="lounge-active-match-card ${myTurn ? 'turn-active' : ''}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${m.gameType === 'dotsboxes' ? '⏹️' : (m.gameType === 'ludo' ? '🎲' : (m.gameType === 'chess' ? '♟️' : '❌'))}</span>
                            <div>
                              <div class="match-game-title">${escapeHtml(m.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${oppNames}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${myTurn ? 'my-turn' : 'wait'}">
                              ${myTurn ? '⚡ Your Turn!' : '⏳ Opponent Turn'}
                            </span>
                            <button class="btn-resume-match" data-match-id="${m._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${m._id}" title="Delete Match">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      `;
          }).join('')}
                  </div>
                `
        }
            </div>
          </div>

          <!-- Section 3: Recent Completed Matches -->
          <div class="lounge-section" style="margin-top: 24px;">
            <div class="lounge-section-head" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div>
                <h3>📜 Recent Completed Matches</h3>
                <p>Audit results, rematch recent opponents, or review match outcomes.</p>
              </div>
              ${recentMatches.length > 0 ? `
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              ` : ''}
            </div>

            ${recentMatches.length === 0
          ? `<div class="box-empty-text">No recently completed matches found.</div>`
          : `
                <div class="lounge-recent-matches-grid">
                  ${recentMatches.map(m => {
            const isP1 = myId && m.player1.userId.toString() === myId.toString();
            const opp = isP1 ? m.player2 : m.player1;
            const isWinner = myId && m.winnerId && m.winnerId.toString() === myId.toString();
            const isDraw = m.status === 'draw';

            return `
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${escapeHtml(m.gameTitle)}</span>
                          <span class="recent-date">${formatTime(m.completedAt || m.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${m._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${escapeHtml(opp.name)}</strong></div>
                          <div class="recent-outcome ${isWinner ? 'win' : (isDraw ? 'draw' : 'loss')}">
                            ${isWinner ? '🏆 VICTORY' : (isDraw ? '🤝 DRAW' : 'DEFEAT')}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${escapeHtml(m.winningReason || m.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${m._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${m._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `;
          }).join('')}
                </div>
              `
        }
          </div>
        `
      }
        </div>
      `;

      bindLoungeEvents();
    } catch (err) {
      loungeWrap.innerHTML = `
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }

  function bindLoungeEvents() {
    // Challenge from game card
        // Subtab switch (multiplayer vs arcade)
    container.querySelectorAll('.lounge-subtab-btn').forEach(b => {
      b.onclick = async () => {
        currentLoungeSubTab = b.dataset.subtab;
        await renderLoungeGamesView();
      };
    });

    // Arcade filter switch
    container.querySelectorAll('.arcade-filter-pill').forEach(b => {
      b.onclick = async () => {
        currentArcadeGameFilter = b.dataset.filter;
        await renderLoungeGamesView();
      };
    });

    // Launch Arcade Game modal
    container.querySelectorAll('.btn-play-arcade').forEach(b => {
      b.onclick = () => {
        const gameId = b.dataset.game;
        openArcadeGameModal(gameId);
      };
    });

    container.querySelectorAll('.btn-challenge-game').forEach(b => {
      b.onclick = () => {
        const gId = b.dataset.gameId;
        openGameChallengeModal(gId);
      };
    });

    // Accept / Decline / Cancel invite
    container.querySelectorAll('.btn-respond-invite').forEach(b => {
      b.onclick = async () => {
        const id = b.dataset.inviteId;
        const act = b.dataset.action;
        await respondToGameInvitation(id, act);
        await renderLoungeGamesView();
      };
    });

    // Resume match
    container.querySelectorAll('.btn-resume-match').forEach(b => {
      b.onclick = () => {
        const mId = b.dataset.matchId;
        openGameMatchModal(mId);
      };
    });

    // Rematch from recent
    container.querySelectorAll('.btn-recent-rematch').forEach(b => {
      b.onclick = async () => {
        const mId = b.dataset.matchId;
        try {
          b.disabled = true;
          const res = await apiPost(`/bonding/matches/${mId}/action`, { action: 'rematch' });
          if (res.match) {
            flashToast('Rematch created! Opening arena ⚔️', 'success');
            openGameMatchModal(res.match._id);
          }
        } catch (e) {
          flashToast(e.message || 'Could not start rematch', 'error');
        } finally {
          b.disabled = false;
        }
      };
    });

    // Delete single match (active or recent)
    container.querySelectorAll('.btn-delete-match').forEach(b => {
      b.onclick = async (e) => {
        e.stopPropagation();
        const mId = b.dataset.matchId;
        if (!confirm('Are you sure you want to delete this match record?')) return;
        try {
          b.disabled = true;
          await apiDelete(`/bonding/matches/${mId}`);
          flashToast('Match deleted successfully', 'success');
          await renderLoungeGamesView();
        } catch (err) {
          flashToast(err.message || 'Failed to delete match', 'error');
        } finally {
          b.disabled = false;
        }
      };
    });

    // Clear all completed matches
    const btnClearMatches = container.querySelector('#btn-clear-matches');
    if (btnClearMatches) {
      btnClearMatches.onclick = async () => {
        if (!confirm('Are you sure you want to delete all completed matches in history?')) return;
        try {
          btnClearMatches.disabled = true;
          await apiDelete('/bonding/matches?filter=completed');
          flashToast('Completed matches history cleared', 'success');
          await renderLoungeGamesView();
        } catch (err) {
          flashToast(err.message || 'Failed to clear matches', 'error');
        } finally {
          btnClearMatches.disabled = false;
        }
      };
    }
  }

  /* =========================================================================
     MANDATORY EMPLOYEE SELECTION & CHALLENGE CREATION FLOW
     ========================================================================= */
  function openGameChallengeModal(preselectedGame = null, preselectedUser = null) {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const myId = currentUser?._id || currentUser?.id;

    const allowedRoles = new Set(['employee', 'admin', 'superadmin']);
    const eligibleEmployees = colleagues.filter(c =>
      !c.isSelf &&
      c._id.toString() !== myId?.toString() &&
      allowedRoles.has(c.role)
    );

    let selectedGame = preselectedGame || 'dotsboxes';
    let selectedTargetUserId = preselectedUser ? preselectedUser.toString() : null;
    let selectedPlayerCount = 2; // Default to 2P Duel
    let selectedMultiTargetUserIds = selectedTargetUserId ? [selectedTargetUserId] : [];
    let selectedTimerMode = 'none';

    function renderModalContent() {
      const targetUserObj = eligibleEmployees.find(e => e._id.toString() === selectedTargetUserId);
      const isMulti = selectedGame === 'dotsboxes' || selectedGame === 'ludo';
      const neededOpponents = selectedPlayerCount - 1;
      const hasEnoughOpponents = selectedMultiTargetUserIds.length === neededOpponents;

      modalRoot.innerHTML = `
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${selectedGame === 'dotsboxes' ? 'Play Dots & Boxes (2P, 3P, 4P)' : (selectedGame === 'ludo' ? 'Play Ludo (2P, 3P, 4P)' : 'Multiplayer Game Challenge')}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${selectedGame === 'dotsboxes' ? 'active' : ''}" data-game="dotsboxes">
                    <span>⏹️</span> <span>Dots & Boxes</span>
                  </button>
                  <button class="game-pill-btn ${selectedGame === 'ludo' ? 'active' : ''}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                  <button class="game-pill-btn ${selectedGame === 'tictactoe' ? 'active' : ''}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                </div>
              </div>

              <!-- MULTIPLAYER: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${isMulti ? `
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${selectedPlayerCount === 2 ? 'active' : ''}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${selectedPlayerCount === 3 ? 'active' : ''}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${selectedPlayerCount === 4 ? 'active' : ''}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${isMulti
          ? `Step ${isMulti ? 3 : 2} — Select Colleagues to Play With (${selectedMultiTargetUserIds.length}/${neededOpponents} Selected) *`
          : 'Step 2 — Select Employee to Challenge *'
        }
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${eligibleEmployees.map(u => {
          const isSelected = isMulti
            ? selectedMultiTargetUserIds.includes(u._id.toString())
            : selectedTargetUserId === u._id.toString();

          return `
                      <div class="eligible-emp-item ${isSelected ? 'selected' : ''}" data-user-id="${u._id}">
                        <div class="emp-item-avatar">${u.name.slice(0, 1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${escapeHtml(u.name)}</span>
                          <span class="emp-item-role">${escapeHtml(u.role === 'superadmin' ? 'Superadmin' : (u.role === 'admin' ? 'Admin' : 'Employee'))} · ${escapeHtml(u.email || '')}</span>
                        </div>
                        <button class="btn-select-opponent ${isSelected ? 'active' : ''}">
                          ${isSelected ? 'Selected ✓' : 'Select'}
                        </button>
                      </div>
                    `;
        }).join('')}
                </div>
              </div>

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${selectedGame === 'dotsboxes' ? `⏹️ Dots & Boxes (${selectedPlayerCount} Players)` : (selectedGame === 'ludo' ? `🎲 Ludo (${selectedPlayerCount} Players · 4 Pawns)` : '❌ Tic-Tac-Toe Challenge')}</div>
                  ${isMulti ? `
                    <div><strong>Opponents:</strong> ${selectedMultiTargetUserIds.length > 0
            ? selectedMultiTargetUserIds.map(id => {
              const found = eligibleEmployees.find(e => e._id.toString() === id);
              return found ? `<strong>${escapeHtml(found.name)}</strong>` : 'Colleague';
            }).join(', ')
            : '<span style="color:#ef4444">⚠️ Please select ' + neededOpponents + ' colleague(s)</span>'
          }</div>
                  ` : `
                    <div><strong>Opponent:</strong> ${targetUserObj ? `<strong>${escapeHtml(targetUserObj.name)}</strong> (${escapeHtml(targetUserObj.role)})` : '<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(isMulti ? !hasEnoughOpponents : !selectedTargetUserId) ? 'disabled' : ''}>
                ${selectedGame === 'dotsboxes' ? `Start ${selectedPlayerCount}P Dots & Boxes ⏹️` : (selectedGame === 'ludo' ? `Start ${selectedPlayerCount}P Ludo Match 🎲` : 'Send Challenge 🚀')}
              </button>
            </div>
          </div>
        </div>
      `;

      bindFlowEvents();
    }

    function bindFlowEvents() {
      modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };
      modalRoot.querySelector('#btn-cancel-challenge-flow').onclick = () => { modalRoot.innerHTML = ''; };

      // Game switch
      modalRoot.querySelectorAll('.game-pill-btn').forEach(btn => {
        btn.onclick = () => {
          selectedGame = btn.dataset.game;
          renderModalContent();
        };
      });

      // Multiplayer mode switch (2P, 3P, 4P)
      modalRoot.querySelectorAll('.ludo-mode-btn').forEach(btn => {
        btn.onclick = () => {
          selectedPlayerCount = Number(btn.dataset.count);
          selectedMultiTargetUserIds = selectedMultiTargetUserIds.slice(0, selectedPlayerCount - 1);
          renderModalContent();
        };
      });

      // Search filter
      const searchInp = modalRoot.querySelector('#flow-emp-search');
      if (searchInp) {
        searchInp.oninput = (e) => {
          const q = e.target.value.toLowerCase().trim();
          modalRoot.querySelectorAll('.eligible-emp-item').forEach(item => {
            const txt = item.textContent.toLowerCase();
            item.style.display = txt.includes(q) ? 'flex' : 'none';
          });
        };
      }

      // Opponent select
      modalRoot.querySelectorAll('.eligible-emp-item').forEach(item => {
        item.onclick = () => {
          const uId = item.dataset.userId;
          const isMulti = selectedGame === 'dotsboxes' || selectedGame === 'ludo';
          if (isMulti) {
            const maxOpponents = selectedPlayerCount - 1;
            if (selectedMultiTargetUserIds.includes(uId)) {
              selectedMultiTargetUserIds = selectedMultiTargetUserIds.filter(id => id !== uId);
            } else {
              if (selectedMultiTargetUserIds.length < maxOpponents) {
                selectedMultiTargetUserIds.push(uId);
              } else {
                selectedMultiTargetUserIds[maxOpponents - 1] = uId;
              }
            }
          } else {
            selectedTargetUserId = uId;
          }
          renderModalContent();
        };
      });

      // Submit challenge / launch match
      const submitBtn = modalRoot.querySelector('#btn-submit-challenge-flow');
      if (submitBtn) {
        submitBtn.onclick = async () => {
          if (selectedGame === 'dotsboxes') {
            const needed = selectedPlayerCount - 1;
            if (selectedMultiTargetUserIds.length < needed) {
              flashToast(`Please select ${needed} colleague(s) to play with`, 'warning');
              return;
            }

            try {
              submitBtn.disabled = true;
              submitBtn.textContent = 'Launching Dots & Boxes...';
              const res = await apiPost('/bonding/matches/instant-dotsboxes', {
                playerCount: selectedPlayerCount,
                targetUserIds: selectedMultiTargetUserIds
              });

              modalRoot.innerHTML = '';
              flashToast(`Dots & Boxes match started (${selectedPlayerCount} Players)! ⏹️`, 'success');
              if (res && res._id) {
                openGameMatchModal(res._id);
              }
            } catch (err) {
              flashToast(err.message || 'Failed to start Dots & Boxes match', 'error');
              submitBtn.disabled = false;
              submitBtn.textContent = `Start ${selectedPlayerCount}P Dots & Boxes ⏹️`;
            }
            return;
          }

          if (selectedGame === 'ludo') {
            const needed = selectedPlayerCount - 1;
            if (selectedMultiTargetUserIds.length < needed) {
              flashToast(`Please select ${needed} colleague(s) to play with`, 'warning');
              return;
            }

            try {
              submitBtn.disabled = true;
              submitBtn.textContent = 'Launching Match...';
              const res = await apiPost('/bonding/matches/instant-ludo', {
                playerCount: selectedPlayerCount,
                targetUserIds: selectedMultiTargetUserIds
              });

              modalRoot.innerHTML = '';
              flashToast(`Ludo match started (${selectedPlayerCount} Players)! 🎲`, 'success');
              if (res && res._id) {
                openGameMatchModal(res._id);
              }
            } catch (err) {
              flashToast(err.message || 'Failed to start Ludo match', 'error');
              submitBtn.disabled = false;
              submitBtn.textContent = `Start ${selectedPlayerCount}P Ludo Match 🎲`;
            }
            return;
          }

          if (!selectedTargetUserId) {
            flashToast('Please select an employee to challenge', 'warning');
            return;
          }

          try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Challenge...';

            await apiPost('/bonding/invitations', {
              gameType: selectedGame,
              targetUserId: selectedTargetUserId,
              matchSettings: { timerMode: selectedTimerMode },
              channelId: null
            });

            flashToast('Game challenge delivered to personal chat! Awaiting acceptance ⚔️', 'success');
            modalRoot.innerHTML = '';

            await loadChannels();
            const directChan = channels.find(c => c.type === 'direct' && c.members?.some(m => (m.userId || m._id)?.toString() === selectedTargetUserId));
            if (directChan) {
              selectChannel(directChan);
            } else if (activeChannel) {
              await loadMessages(activeChannel._id);
            }
            if (currentView === 'lounge_games') {
              await renderLoungeGamesView();
            }
          } catch (err) {
            flashToast(err.message || 'Could not send challenge', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Challenge 🚀';
          }
        };
      }
    }

    renderModalContent();
  }

  async function respondToGameInvitation(invitationId, action) {
    if (!invitationId || !action) return;
    try {
      const res = await apiPut(`/bonding/invitations/${invitationId}/respond`, { action });
      if (action === 'accept') {
        flashToast('Challenge accepted! Entering match arena ⚔️', 'success');
        if (res.match) {
          openGameMatchModal(res.match._id);
        }
      } else if (action === 'decline') {
        flashToast('Challenge declined', 'info');
        // Instantly remove challenge elements from UI so it goes away
        container.querySelectorAll(`[data-invite-id="${invitationId}"]`).forEach(el => {
          const item = el.closest('.lounge-invite-item') || el.closest('.bonding-msg-row');
          if (item) item.remove();
        });
      } else if (action === 'cancel') {
        flashToast('Challenge cancelled', 'info');
        container.querySelectorAll(`[data-invite-id="${invitationId}"]`).forEach(el => {
          const item = el.closest('.lounge-invite-item') || el.closest('.bonding-msg-row');
          if (item) item.remove();
        });
      }

      if (activeChannel) {
        await loadMessages(activeChannel._id);
      }
      if (currentView === 'lounge_games') {
        await renderLoungeGamesView();
      }
    } catch (err) {
      flashToast(err.message || 'Action failed', 'error');
    }
  }

  /* =========================================================================
     INTERACTIVE LIVE GAME ARENA MODAL (CHESS, TIC-TAC-TOE, CONNECT FOUR)
     ========================================================================= */
  async function openGameMatchModal(matchId) {
    if (!matchId) return;
    activeMatchModalId = matchId;
    if (matchPollInterval) clearInterval(matchPollInterval);

    const modalRoot = container.querySelector('#bonding-modals-root');
    let match = null;
    let selectedChessFromSquare = null;
    let legalDestinations = [];
    let prevFingerprint = '';
    let autoMoveTimeout = null;
    let autoMoveInProgress = false;
    let isDiceRolling = false;
    let diceRollStartTime = 0;

    function getMatchFingerprint(m) {
      if (!m) return '';
      return JSON.stringify({
        status: m.status,
        turn: m.currentTurnUserId?.toString(),
        turnColor: m.turn,
        movesCount: m.moves?.length,
        dice: m.gameState?.dice,
        rolled: m.gameState?.rolled,
        lastRoll: m.gameState?.lastRoll,
        lastRollColor: m.gameState?.lastRollColor,
        lastRollBy: m.gameState?.lastRollBy,
        lastActionText: m.gameState?.lastActionText,
        tokens: m.gameState?.tokens,
        board: m.gameState?.board,
        grid: m.gameState?.grid,
        fen: m.gameState?.fen,
        hLines: m.gameState?.hLines,
        vLines: m.gameState?.vLines,
        boxes: m.gameState?.boxes,
        scores: m.gameState?.scores,
        draw: m.drawOfferedBy?.toString(),
        rematchOfferedBy: m.rematchOfferedBy?.toString(),
        rematchDeclined: !!m.rematchDeclined
      });
    }

    async function fetchMatchState() {
      try {
        const data = await apiGet(`/bonding/matches/${matchId}`);
        match = data;
        return match;
      } catch (err) {
        flashToast(err.message || 'Could not load match', 'error');
        closeMatchModal();
        return null;
      }
    }

    match = await fetchMatchState();
    if (!match) return;
    prevFingerprint = getMatchFingerprint(match);

    function closeMatchModal() {
      if (matchPollInterval) clearInterval(matchPollInterval);
      if (autoMoveTimeout) clearTimeout(autoMoveTimeout);
      autoMoveInProgress = false;

      activeMatchModalId = null;
      modalRoot.innerHTML = '';
      if (currentView === 'lounge_games') renderLoungeGamesView(true);
      if (activeChannel) loadMessages(activeChannel._id, true);
    }

    // Start 0.8s active match polling for live opponent moves and dice rolls
    matchPollInterval = setInterval(async () => {
      if (!activeMatchModalId || activeMatchModalId !== matchId) {
        clearInterval(matchPollInterval);
        return;
      }
      if (isDiceRolling && Date.now() - diceRollStartTime < 2500) return;
      try {
        const updated = await apiGet(`/bonding/matches/${matchId}`);
        if (!updated) return;
        const newFp = getMatchFingerprint(updated);
        if (newFp !== prevFingerprint) {
          prevFingerprint = newFp;
          match = updated;
          if (updated.rematchDeclined) {
            flashToast('Rematch was declined', 'info');
            closeMatchModal();
            return;
          }
          renderArena();
        }
      } catch (e) {
        // quiet polling error
      }
    }, 800);

    function renderArena() {
      if (!match) return;
      const myId = currentUser?._id || currentUser?.id;
      const isP1 = myId && match.player1.userId.toString() === myId.toString();
      const me = isP1 ? match.player1 : match.player2;
      const opp = isP1 ? match.player2 : match.player1;
      const isMyTurn = myId && match.currentTurnUserId && match.currentTurnUserId.toString() === myId.toString();
      const isEnded = match.status !== 'active';

      modalRoot.innerHTML = `
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Arena Header Bar -->
            <div class="arena-header">
              <div class="arena-title-wrap">
                <span class="arena-icon">${match.gameType === 'ludo' ? '🎲' : (match.gameType === 'dotsboxes' ? '⏹️' : (match.gameType === 'chess' ? '♟️' : '❌'))}</span>
                <div>
                  <h3 class="arena-title">${escapeHtml(match.gameTitle)}</h3>
                  ${(match.gameType === 'ludo' || match.gameType === 'dotsboxes') && match.gameState?.players ? `
                    <div class="arena-players-vs ludo-players-wrap">
                      ${match.gameState.players.map(p => {
        const isMe = p.userId && p.userId.toString() === myId?.toString();
        const colorEmoji = { red: '🔴', green: '🟢', yellow: '🟡', blue: '🔵', amber: '🟠' }[p.color] || '⚪';
        const isTurn = (match.gameState?.turnColor || match.turn) === p.color;
        return `
                          <span class="player-tag ${isMe ? 'self' : 'opp'} ${isTurn ? 'turn-active' : ''}">
                            ${colorEmoji} <strong>${escapeHtml(p.name)}</strong> ${isMe ? '(You)' : ''}
                          </span>
                        `;
      }).join('<span class="vs-pill">vs</span>')}
                    </div>
                  ` : `
                    <div class="arena-players-vs">
                      <span class="player-tag self">${escapeHtml(me.name)} (You · <strong>${match.gameType === 'ludo' ? (me.assignedRole === 'red' ? '🔴 Red' : '🟢 Green') : (match.gameType === 'tictactoe' ? (me.assignedRole === 'X' ? '✕' : '◯') : me.assignedRole)}</strong>)</span>
                      <span class="vs-pill">VS</span>
                      <span class="player-tag opp">${escapeHtml(opp.name)} (<strong>${match.gameType === 'ludo' ? (opp.assignedRole === 'red' ? '🔴 Red' : '🟢 Green') : (match.gameType === 'tictactoe' ? (opp.assignedRole === 'X' ? '✕' : '◯') : opp.assignedRole)}</strong>)</span>
                    </div>
                  `}
                </div>
              </div>

              <!-- Live Turn Indicator -->
              <div class="arena-turn-banner ${isEnded ? 'ended' : (isMyTurn ? 'my-turn' : 'opp-turn')}">
                ${isEnded
          ? `<span>🏁 Finished (${escapeHtml(match.winningReason || match.status)})</span>`
          : (isMyTurn
            ? `<span>⚡ YOUR TURN</span>`
            : `<span>⏳ Waiting for ${escapeHtml(opp.name)}...</span>`
          )
        }
              </div>
            </div>

            <!-- Sub-Toolbar with Quick Instructions & Draw/Resign Actions -->
            <div class="arena-toolbar">
              <div class="arena-tip-text">
                ${match.gameType === 'ludo'
          ? (isMyTurn
            ? (match.gameState?.rolled
              ? '👉 Click one of your glowing tokens to advance!'
              : '🎲 Your turn! Tap the dice to roll.')
            : '⏳ Opponent is rolling/moving their tokens...')
          : (match.gameType === 'tictactoe'
            ? (isMyTurn ? '👉 Tap any open cell to place your symbol!' : '⏳ Opponent is deciding their move...')
            : (isMyTurn ? '👉 Click your piece, then click a green target dot to move!' : '⏳ Opponent is thinking...'))
        }
              </div>
              <div class="arena-action-btns">
                ${!isEnded ? `
                  <button class="btn-arena-action" id="btn-arena-draw" title="Offer a Draw">🤝 Offer Draw</button>
                  <button class="btn-arena-action danger" id="btn-arena-resign" title="Resign Match">🏳️ Resign</button>
                ` : ''}
                <button class="btn-arena-action danger" id="btn-arena-delete-match" title="Delete Match">🗑️ Delete</button>
              </div>
            </div>

            <!-- Draw Offer Notification -->
            ${match.drawOfferedBy && match.drawOfferedBy.toString() !== myId?.toString() && !isEnded ? `
              <div class="arena-draw-offer-banner">
                <span>🤝 ${escapeHtml(opp.name)} has offered a draw. Accept?</span>
                <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
              </div>
            ` : ''}

            <!-- Arena Main Playing Board -->
            <div class="arena-board-wrap">
              ${match.gameType === 'dotsboxes' ? renderDotsBoxesBoardHtml(isP1, me, isMyTurn) : ''}
              ${match.gameType === 'chess' ? renderChessBoardHtml(isP1) : ''}
              ${match.gameType === 'tictactoe' ? renderTicTacToeBoardHtml() : ''}
              ${match.gameType === 'ludo' ? renderLudoBoardHtml(isP1, me, isMyTurn) : ''}
            </div>

            <!-- Match Result Banner (When finished) -->
            ${isEnded ? `
              <div class="arena-game-over-banner">
                <div class="game-over-icon">${match.winnerId && match.winnerId.toString() === myId?.toString() ? '🏆' : (match.status === 'draw' ? '🤝' : '🎖️')}</div>
                <div class="game-over-text">
                  <h4>${match.winnerId && match.winnerId.toString() === myId?.toString() ? 'VICTORY!' : (match.status === 'draw' ? 'STALEMATE / DRAW' : `${escapeHtml(match.winnerName)} Wins!`)}</h4>
                  <p>Reason: ${escapeHtml(match.winningReason || 'Match concluded')}</p>
                </div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                  ${match.rematchOfferedBy && match.rematchOfferedBy.toString() === myId?.toString() ? `
                    <div class="game-pending-text" style="font-size:12px;color:var(--text-2);padding:6px 12px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-sm);">
                      ⏳ Rematch requested. Waiting for opponent...
                    </div>
                  ` : (match.rematchOfferedBy ? `
                    <button class="btn-arena-rematch" id="btn-arena-accept-rematch" style="background:#10b981;border-color:#10b981;">
                      ✅ Accept Rematch
                    </button>
                    <button class="btn-arena-action" id="btn-arena-decline-rematch" style="border:1px solid var(--border-sm);">
                      ❌ Decline
                    </button>
                  ` : `
                    <button class="btn-arena-rematch" id="btn-arena-rematch-action">
                      🔄 Request Rematch
                    </button>
                  `)}
                  <button class="btn-arena-action danger" id="btn-arena-delete-match-ended">
                    🗑️ Delete Match
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      bindArenaEvents(isMyTurn, isP1, me);
    }

    /* ── DOTS & BOXES BOARD HTML BUILDER (UP TO 4 PLAYERS) ── */
    function renderDotsBoxesBoardHtml(isP1, me, isMyTurn) {
      const state = match.gameState || {};
      const rows = state.rows || 4;
      const cols = state.cols || 4;
      const players = state.players || [
        { ...match.player1, color: 'red', assignedRole: 'red' },
        { ...match.player2, color: 'blue', assignedRole: 'blue' }
      ];
      const activeColors = state.activeColors || ['red', 'blue'];
      const turnColor = match.turn || state.turnColor || 'red';

      const myId = currentUser?._id || currentUser?.id;
      const myPlayer = players.find(p => p.userId && p.userId.toString() === myId?.toString()) || players[0];
      const myColor = myPlayer?.color || (isP1 ? 'red' : 'blue');
      const isMyCurrentTurn = (myColor === turnColor) && match.status === 'active';

      const scores = state.scores || { red: 0, blue: 0, green: 0, amber: 0 };
      const hLines = state.hLines || Array(rows + 1).fill(null).map(() => Array(cols).fill(null));
      const vLines = state.vLines || Array(rows).fill(null).map(() => Array(cols + 1).fill(null));
      const boxes = state.boxes || Array(rows).fill(null).map(() => Array(cols).fill(null));

      const colorMeta = {
        red: { name: 'Red', hex: '#ef4444', light: 'rgba(239,68,68,0.18)', border: '#f87171' },
        blue: { name: 'Blue', hex: '#3b82f6', light: 'rgba(59,130,246,0.18)', border: '#60a5fa' },
        green: { name: 'Green', hex: '#10b981', light: 'rgba(16,185,129,0.18)', border: '#34d399' },
        amber: { name: 'Amber', hex: '#f59e0b', light: 'rgba(245,158,11,0.18)', border: '#fbbf24' }
      };

      const turnPl = players.find(p => p.color === turnColor);
      const turnPlName = turnPl ? escapeHtml(turnPl.name) : turnColor.toUpperCase();

      // Build 9x9 grid rows
      let gridCellsHtml = [];
      for (let r = 0; r <= rows * 2; r++) {
        for (let c = 0; c <= cols * 2; c++) {
          const isRowEven = (r % 2 === 0);
          const isColEven = (c % 2 === 0);

          if (isRowEven && isColEven) {
            // Dot Intersection
            gridCellsHtml.push(`
              <div class="dots-cell dot-intersection" data-r="${r / 2}" data-c="${c / 2}">
                <span class="dots-dot"></span>
              </div>
            `);
          } else if (isRowEven && !isColEven) {
            // Horizontal Line
            const hr = r / 2;
            const hc = Math.floor(c / 2);
            const lineData = hLines[hr] && hLines[hr][hc];
            const isDrawn = !!lineData;
            const lineColor = lineData?.color || '';
            const canDraw = isMyCurrentTurn && !isDrawn && match.status === 'active';

            gridCellsHtml.push(`
              <div 
                class="dots-cell dots-line h-line ${isDrawn ? 'drawn color-' + lineColor : ''} ${canDraw ? 'clickable my-color-' + myColor : ''}"
                data-type="h" 
                data-r="${hr}" 
                data-c="${hc}"
                role="button"
                tabindex="${canDraw ? '0' : '-1'}"
                title="${isDrawn ? `Drawn by ${escapeHtml(lineData.player || lineColor)}` : (canDraw ? 'Click to draw line' : '')}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `);
          } else if (!isRowEven && isColEven) {
            // Vertical Line
            const vr = Math.floor(r / 2);
            const vc = c / 2;
            const lineData = vLines[vr] && vLines[vr][vc];
            const isDrawn = !!lineData;
            const lineColor = lineData?.color || '';
            const canDraw = isMyCurrentTurn && !isDrawn && match.status === 'active';

            gridCellsHtml.push(`
              <div 
                class="dots-cell dots-line v-line ${isDrawn ? 'drawn color-' + lineColor : ''} ${canDraw ? 'clickable my-color-' + myColor : ''}"
                data-type="v" 
                data-r="${vr}" 
                data-c="${vc}"
                role="button"
                tabindex="${canDraw ? '0' : '-1'}"
                title="${isDrawn ? `Drawn by ${escapeHtml(lineData.player || lineColor)}` : (canDraw ? 'Click to draw line' : '')}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `);
          } else {
            // Box
            const br = Math.floor(r / 2);
            const bc = Math.floor(c / 2);
            const boxData = boxes[br] && boxes[br][bc];
            const isClaimed = !!boxData;
            const ownerColor = boxData?.owner || '';
            const ownerInit = boxData?.ownerName ? boxData.ownerName.charAt(0).toUpperCase() : ownerColor.charAt(0).toUpperCase();

            gridCellsHtml.push(`
              <div class="dots-cell dots-box ${isClaimed ? 'claimed color-' + ownerColor : ''}" data-br="${br}" data-bc="${bc}">
                ${isClaimed ? `
                  <div class="dots-box-claim-badge">
                    <span class="box-owner-initial">${ownerInit}</span>
                    <span class="box-score-tag">+1</span>
                  </div>
                ` : ''}
              </div>
            `);
          }
        }
      }

      return `
        <div class="dotsboxes-arena-layout">
          <!-- Scoreboard Header for up to 4 Players -->
          <div class="dotsboxes-scoreboard">
            ${activeColors.map(colKey => {
              const p = players.find(x => x.color === colKey) || { name: colorMeta[colKey].name };
              const isTurn = turnColor === colKey && match.status === 'active';
              const isMe = p.userId && p.userId.toString() === myId?.toString();
              const score = scores[colKey] || 0;

              return `
                <div class="dots-player-card ${colKey} ${isTurn ? 'is-turn-active' : ''}">
                  <div class="dots-player-header">
                    <span class="dots-player-dot" style="background:${colorMeta[colKey].hex}"></span>
                    <span class="dots-player-name">${escapeHtml(p.name)} ${isMe ? '(You)' : ''}</span>
                    ${isTurn ? `<span class="dots-turn-pill">TURN</span>` : ''}
                  </div>
                  <div class="dots-player-score">
                    <span class="score-val" style="color:${colorMeta[colKey].hex}">${score}</span>
                    <span class="score-lbl">boxes</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Board Grid Container (9x9) -->
          <div class="dotsboxes-board-wrapper">
            <div class="dotsboxes-grid">
              ${gridCellsHtml.join('')}
            </div>
          </div>

          <!-- Console & Status Bar -->
          <div class="dotsboxes-console-bar">
            <div class="dots-guidance ${isMyCurrentTurn ? 'highlight' : ''}">
              ${isMyCurrentTurn
                ? `👉 It is your turn (<strong>${colorMeta[myColor].name}</strong>)! Click any open line between two dots to draw.`
                : `⏳ Waiting for <strong>${turnPlName}</strong> (<strong>${colorMeta[turnColor]?.name || turnColor}</strong>) to draw a line...`
              }
            </div>
            <div class="dots-caption">
              ${escapeHtml(state.lastActionText || 'Connect 4 sides to claim a box and earn a bonus turn!')}
            </div>
          </div>
        </div>
      `;
    }

    /* ── CHESS BOARD HTML BUILDER ── */
    function renderChessBoardHtml(isP1) {
      const fen = match.gameState?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      const chess = new Chess(fen);
      const isWhite = isP1 ? match.player1.assignedRole === 'white' : match.player2.assignedRole === 'white';

      // Pieces Unicode Glyphs
      const pieceGlyphs = {
        p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
        P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
      };

      const files = isWhite ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
      const ranks = isWhite ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];

      let boardHtml = `<div class="chess-board-grid">`;
      for (const r of ranks) {
        for (const f of files) {
          const square = `${f}${r}`;
          const piece = chess.get(square);
          const isLight = ((f.charCodeAt(0) - 97) + r) % 2 !== 0;
          const isSelected = selectedChessFromSquare === square;
          const isLegalTarget = legalDestinations.includes(square);
          const glyph = piece ? (piece.color === 'w' ? pieceGlyphs[piece.type.toUpperCase()] : pieceGlyphs[piece.type]) : '';

          boardHtml += `
            <div class="chess-sq ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isLegalTarget ? 'legal-dot' : ''}" data-square="${square}">
              ${glyph ? `<span class="chess-piece ${piece.color === 'w' ? 'white-piece' : 'black-piece'}">${glyph}</span>` : ''}
            </div>
          `;
        }
      }
      boardHtml += `</div>`;

      // Move notation list
      const moves = match.moves || [];
      const movesListHtml = moves.map(m => `
        <span class="chess-move-token">${m.moveNum}. ${m.moveData?.san || ''}</span>
      `).join(' ');

      return `
        <div class="chess-arena-layout">
          ${boardHtml}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${movesListHtml || '<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `;
    }

    /* ── TIC-TAC-TOE BOARD HTML BUILDER ── */
    function renderTicTacToeBoardHtml() {
      const board = match.gameState?.board || Array(9).fill(null);
      const winningCells = match.winningCells || [];

      return `
        <div class="ttt-court">
          <div class="ttt-board-grid">
            ${board.map((cell, idx) => {
        const isWinCell = winningCells.includes(idx);
        return `
                <div class="ttt-cell ${cell ? 'filled' : 'empty'} ${isWinCell ? 'win-cell' : ''}" data-cell-idx="${idx}">
                  ${cell === 'X' ? '<span class="ttt-x">✕</span>' : (cell === 'O' ? '<span class="ttt-o">◯</span>' : '')}
                </div>
              `;
      }).join('')}
          </div>
        </div>
      `;
    }

    /* ── LUDO 2-PLAYER DUEL BOARD HTML BUILDER ── */
    function renderLudoBoardHtml(isP1, me, isMyTurn) {
      const state = match.gameState || {};
      const activeColors = state.activeColors || ['red', 'green'];
      const players = state.players || [
        { ...match.player1, color: 'red', assignedRole: 'red', isBot: false },
        { ...match.player2, color: 'green', assignedRole: 'green', isBot: false }
      ];

      // Pawns structure: guaranteed 4 pawns per color
      const allTokens = state.tokens || {};
      const getTokensForColor = (col) => {
        const list = allTokens[col] || (col === 'red' ? state.p1Tokens : (col === 'green' ? state.p2Tokens : [])) || [];
        return Array.from({ length: 4 }, (_, i) => list[i] || { id: i, step: -1 });
      };

      const tokensRed = getTokensForColor('red');
      const tokensGreen = getTokensForColor('green');
      const tokensYellow = getTokensForColor('yellow');
      const tokensBlue = getTokensForColor('blue');

      const myId = currentUser?._id || currentUser?.id;
      const myPlayer = players.find(p => p.userId && p.userId.toString() === myId?.toString()) || players[0];
      const myColor = myPlayer?.color || (isP1 ? 'red' : 'green');
      const currentTurnColor = state.turnColor || match.turn || 'red';
      const isMyCurrentTurn = (myColor === currentTurnColor) && match.status === 'active';

      const rolled = !!state.rolled;
      const dice = state.dice;

      // 52-square perimeter track
      const trackCoords = [
        [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
        [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
        [0, 7], [0, 8],
        [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
        [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
        [7, 14], [8, 14],
        [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
        [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
        [14, 7], [14, 6],
        [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
        [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
        [7, 0], [6, 0]
      ];

      // 5-step Home Stretches
      const redHomeStretch = [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5]];
      const greenHomeStretch = [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7]];
      const yellowHomeStretch = [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9]];
      const blueHomeStretch = [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7]];

      const safeSquares = [0, 8, 13, 21, 26, 34, 39, 47];

      function getTokenCoord(color, step) {
        if (step < 0) return null;
        if (step >= 56) {
          if (color === 'red') return [7, 6];
          if (color === 'green') return [6, 7];
          if (color === 'yellow') return [7, 8];
          return [8, 7];
        }

        if (color === 'red') {
          if (step <= 50) return trackCoords[step];
          return redHomeStretch[step - 51];
        } else if (color === 'green') {
          if (step <= 50) return trackCoords[(13 + step) % 52];
          return greenHomeStretch[step - 51];
        } else if (color === 'yellow') {
          if (step <= 50) return trackCoords[(26 + step) % 52];
          return yellowHomeStretch[step - 51];
        } else {
          if (step <= 50) return trackCoords[(39 + step) % 52];
          return blueHomeStretch[step - 51];
        }
      }

      function isTokenMovable(color, token) {
        if (color !== myColor) return false;
        if (!isMyCurrentTurn || !rolled || !dice || match.status !== 'active') return false;
        if (token.step === -1) return dice === 6;
        return token.step >= 0 && token.step + dice <= 56;
      }

      // Map tokens on the path (0..55)
      const cellTokenMap = {};
      const registerCellTokens = (color, tokens) => {
        tokens.forEach(t => {
          if (t.step >= 0 && t.step < 56) {
            const coord = getTokenCoord(color, t.step);
            if (coord) {
              const k = coord[0] + ',' + coord[1];
              (cellTokenMap[k] = cellTokenMap[k] || []).push({
                color,
                id: t.id,
                step: t.step,
                movable: isTokenMovable(color, t)
              });
            }
          }
        });
      };

      if (activeColors.includes('red')) registerCellTokens('red', tokensRed);
      if (activeColors.includes('green')) registerCellTokens('green', tokensGreen);
      if (activeColors.includes('yellow')) registerCellTokens('yellow', tokensYellow);
      if (activeColors.includes('blue')) registerCellTokens('blue', tokensBlue);

      // Track cell lookup
      const trackCoordIndexMap = {};
      trackCoords.forEach(([r, c], idx) => {
        trackCoordIndexMap[r + ',' + c] = idx;
      });

      // Stretch lookups
      const redStretchIndexMap = {};
      redHomeStretch.forEach(([r, c], idx) => { redStretchIndexMap[r + ',' + c] = idx + 1; });
      const greenStretchIndexMap = {};
      greenHomeStretch.forEach(([r, c], idx) => { greenStretchIndexMap[r + ',' + c] = idx + 1; });
      const yellowStretchIndexMap = {};
      yellowHomeStretch.forEach(([r, c], idx) => { yellowStretchIndexMap[r + ',' + c] = idx + 1; });
      const blueStretchIndexMap = {};
      blueHomeStretch.forEach(([r, c], idx) => { blueStretchIndexMap[r + ',' + c] = idx + 1; });

      // Generate all cells for the 4 arms
      const pathCellsHtml = [];
      for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
          // Skip the 4 yards (6x6 each) and Center Home (3x3)
          if (r < 6 && c < 6) continue; // Red yard
          if (r < 6 && c > 8) continue; // Green yard
          if (r > 8 && c < 6) continue; // Blue yard
          if (r > 8 && c > 8) continue; // Yellow yard
          if (r >= 6 && r <= 8 && c >= 6 && c <= 8) continue; // Center Home

          const key = r + ',' + c;
          const trkIdx = trackCoordIndexMap[key];
          const isSafe = trkIdx !== undefined && safeSquares.includes(trkIdx);

          const isRedStart = r === 6 && c === 1;
          const isGreenStart = r === 1 && c === 8;
          const isYellowStart = r === 8 && c === 13;
          const isBlueStart = r === 13 && c === 6;

          const isRedStretch = redStretchIndexMap[key];
          const isGreenStretch = greenStretchIndexMap[key];
          const isYellowStretch = yellowStretchIndexMap[key];
          const isBlueStretch = blueStretchIndexMap[key];

          let cellClass = 'ludo-cell';
          if (isRedStart) cellClass += ' cell-red-start';
          else if (isGreenStart) cellClass += ' cell-green-start';
          else if (isYellowStart) cellClass += ' cell-yellow-start';
          else if (isBlueStart) cellClass += ' cell-blue-start';
          else if (isRedStretch) cellClass += ' cell-red-stretch';
          else if (isGreenStretch) cellClass += ' cell-green-stretch';
          else if (isYellowStretch) cellClass += ' cell-yellow-stretch';
          else if (isBlueStretch) cellClass += ' cell-blue-stretch';
          else if (isSafe) cellClass += ' cell-safe-star';

          const tokensHere = cellTokenMap[key] || [];

          pathCellsHtml.push(`
            <div class="${cellClass}" style="grid-row:${r + 1};grid-column:${c + 1}" data-pos="${key}">
              ${isSafe ? '<span class="cell-star-glyph">⭐</span>' : ''}
              ${isRedStart || isGreenStart || isYellowStart || isBlueStart ? '<span class="cell-arrow-glyph">➔</span>' : ''}
              ${tokensHere.map(t => `
                <div class="ludo-token token-${t.color} ${t.movable ? 'movable' : ''}" data-token-id="${t.id}" data-color="${t.color}" title="${t.color.toUpperCase()} Pawn ${t.id + 1}">
                  <span>${t.id + 1}</span>
                </div>
              `).join('')}
            </div>
          `);
        }
      }

      function renderNumberDisplay(val, isWaiting = false) {
        if (isWaiting || !val) {
          return `
            <div class="ludo-direct-number-box num-prompt" role="img" aria-label="Dice ready">
              <span class="ludo-direct-num prompt-icon" style="font-size:30px;line-height:1;">🎲</span>
            </div>
          `;
        }
        const v = Math.max(1, Math.min(6, Number(val) || 1));
        return `
          <div class="ludo-direct-number-box num-${v}" role="img" aria-label="Number ${v}">
            <span class="ludo-direct-num">${v}</span>
          </div>
        `;
      }

      function renderYardHtml(col, titleText, isActive, playerInfo, tokensList) {
        const yardClass = `${col}-yard`;
        if (!isActive) {
          return `
            <div class="ludo-yard ${yardClass}">
              <div class="yard-box decorative">
                <div class="yard-title">${titleText} (Inactive)</div>
              </div>
            </div>
          `;
        }

        const homeCount = tokensList.filter(t => t.step === 56).length;

        return `
          <div class="ludo-yard ${yardClass} ${currentTurnColor === col ? 'yard-active-turn' : ''}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${titleText}</span>
                ${homeCount > 0 ? `<span class="yard-home-badge" title="${homeCount} of 4 pawns reached Home!">👑 ${homeCount}/4 Home</span>` : ''}
                ${playerInfo ? `<small class="yard-player-lbl">${escapeHtml(playerInfo.name)}${playerInfo.isBot ? ' 🤖' : ''}</small>` : ''}
              </div>
              <div class="yard-slots">
                ${tokensList.map((t, idx) => `
                  <div class="yard-token-slot ${t.step === 56 ? 'slot-home' : ''}">
                    ${t.step === -1 ? `
                      <div class="ludo-token token-${col} ${isTokenMovable(col, t) ? 'movable' : ''}" data-token-id="${t.id}" data-color="${col}" title="${col.toUpperCase()} Pawn ${t.id + 1}">
                        <span>${t.id + 1}</span>
                      </div>
                    ` : (t.step === 56 ? `
                      <div class="ludo-token token-reached-home token-${col}" title="${col.toUpperCase()} Pawn ${t.id + 1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${t.id + 1}</span>
                      </div>
                    ` : `<span class="slot-empty">${idx + 1}</span>`)}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }

      const redPl = players.find(p => p.color === 'red');
      const greenPl = players.find(p => p.color === 'green');
      const yellowPl = players.find(p => p.color === 'yellow');
      const bluePl = players.find(p => p.color === 'blue');

      const turnPl = players.find(p => p.color === currentTurnColor) || (currentTurnColor === 'red' ? redPl : greenPl);
      const turnPlName = turnPl ? escapeHtml(turnPl.name) : currentTurnColor.toUpperCase();
      const turnColorEmoji = { red: '🔴', green: '🟢', yellow: '🟡', blue: '🔵' }[currentTurnColor] || '🔴';
      const myColorEmoji = { red: '🔴', green: '🟢', yellow: '🟡', blue: '🔵' }[myColor] || '🔴';

      const hasRolled = Boolean(rolled && (dice || (state.lastRoll && state.lastRollColor === currentTurnColor)));
      const displayDice = dice || (hasRolled ? state.lastRoll : null);
      const canClickRoll = isMyCurrentTurn && !hasRolled && match.status === 'active';
      const myTokens = getTokensForColor(myColor);
      const movableTokens = myTokens.filter(t => isTokenMovable(myColor, t));

      return `
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${renderYardHtml('red', '🔴 Red Base', activeColors.includes('red'), redPl, tokensRed)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${renderYardHtml('green', '🟢 Green Base', activeColors.includes('green'), greenPl, tokensGreen)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${renderYardHtml('blue', '🔵 Blue Base', activeColors.includes('blue'), bluePl, tokensBlue)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${renderYardHtml('yellow', '🟡 Yellow Base', activeColors.includes('yellow'), yellowPl, tokensYellow)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${tokensRed.filter(t => t.step === 56).map(t => `<div class="home-tri-pawn red" title="Red Pawn ${t.id + 1} Home! 👑">👑${t.id + 1}</div>`).join('')}
              </div>
              <div class="home-triangle green-tri">
                ${tokensGreen.filter(t => t.step === 56).map(t => `<div class="home-tri-pawn green" title="Green Pawn ${t.id + 1} Home! 👑">👑${t.id + 1}</div>`).join('')}
              </div>
              <div class="home-triangle yellow-tri">
                ${tokensYellow.filter(t => t.step === 56).map(t => `<div class="home-tri-pawn yellow" title="Yellow Pawn ${t.id + 1} Home! 👑">👑${t.id + 1}</div>`).join('')}
              </div>
              <div class="home-triangle blue-tri">
                ${tokensBlue.filter(t => t.step === 56).map(t => `<div class="home-tri-pawn blue" title="Blue Pawn ${t.id + 1} Home! 👑">👑${t.id + 1}</div>`).join('')}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[
          ...tokensRed.filter(t => t.step === 56).map(t => ({ col: 'red', id: t.id })),
          ...tokensGreen.filter(t => t.step === 56).map(t => ({ col: 'green', id: t.id })),
          ...tokensYellow.filter(t => t.step === 56).map(t => ({ col: 'yellow', id: t.id })),
          ...tokensBlue.filter(t => t.step === 56).map(t => ({ col: 'blue', id: t.id }))
        ].map(t => `
                    <div class="tok-home-champion ${t.col}" title="${t.col.toUpperCase()} Pawn ${t.id + 1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${t.id + 1}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${pathCellsHtml.join('')}
          </div>

          <!-- Ludo Action & Interactive Dice Console -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${canClickRoll ? 'clickable' : ''} ${hasRolled ? 'just-rolled' : ''} border-${currentTurnColor}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${canClickRoll ? '0' : '-1'}"
                title="${canClickRoll ? 'Tap dice to roll!' : (isMyCurrentTurn ? 'Choose a pawn to move' : (hasRolled ? `${turnPlName} rolled ${displayDice}` : `Waiting for ${turnPlName} to roll`))}"
                style="${canClickRoll ? 'cursor:pointer;touch-action:manipulation;' : ''}"
              >
                ${renderNumberDisplay(displayDice, !hasRolled)}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${currentTurnColor}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${turnPlName}</strong> (${currentTurnColor.toUpperCase()})
                </span>
                ${isMyCurrentTurn
          ? `<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>`
          : `<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`
        }
              </div>

              <div class="ludo-guidance-message ${isMyCurrentTurn && hasRolled ? 'highlight' : ''}">
                ${isMyCurrentTurn && !hasRolled && match.status === 'active'
          ? '👉 It is your turn! <strong>Click the dice</strong> to roll!'
          : (isMyCurrentTurn && hasRolled && match.status === 'active'
            ? (movableTokens.length > 0
              ? (movableTokens.length === 1
                ? `🎲 Rolled <strong>${displayDice}</strong>! Auto-advancing single pawn...`
                : `🎲 Rolled <strong>${displayDice}</strong>! Tap your <strong>glowing pawn</strong> to move!`)
              : `🎲 Rolled <strong>${displayDice}</strong>. No legal moves possible — turn passing...`)
            : (match.status === 'active'
              ? (hasRolled
                ? `🎲 ${turnColorEmoji} <strong>${turnPlName}</strong> rolled <strong>${displayDice}</strong>!`
                : `⏳ Waiting for <strong>${turnPlName}</strong> to roll the dice...`)
              : '🏁 Match Concluded')
          )
        }
              </div>

              <div class="ludo-last-action-caption">
                ${escapeHtml(state.lastActionText || 'Match live!')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function bindArenaEvents(isMyTurn, isP1, me) {
      modalRoot.querySelector('#btn-close-arena').onclick = closeMatchModal;

      // Resign
      const btnResign = modalRoot.querySelector('#btn-arena-resign');
      if (btnResign) {
        btnResign.onclick = async () => {
          if (!confirm('Are you sure you want to resign this match?')) return;
          try {
            btnResign.disabled = true;
            await apiPost(`/bonding/matches/${matchId}/action`, { action: 'resign' });
            await fetchMatchState();
            renderArena();
          } catch (e) {
            flashToast(e.message || 'Resign failed', 'error');
            btnResign.disabled = false;
          }
        };
      }

      // Offer Draw
      const btnDraw = modalRoot.querySelector('#btn-arena-draw');
      if (btnDraw) {
        btnDraw.onclick = async () => {
          try {
            await apiPost(`/bonding/matches/${matchId}/action`, { action: 'offer_draw' });
            flashToast('Draw offer sent to opponent', 'info');
            await fetchMatchState();
            renderArena();
          } catch (e) {
            flashToast(e.message || 'Draw offer failed', 'error');
          }
        };
      }

      // Accept / Decline Draw
      const btnAccDraw = modalRoot.querySelector('#btn-confirm-accept-draw');
      if (btnAccDraw) {
        btnAccDraw.onclick = async () => {
          try {
            await apiPost(`/bonding/matches/${matchId}/action`, { action: 'accept_draw' });
            flashToast('Draw agreed!', 'info');
            await fetchMatchState();
            renderArena();
          } catch (e) {
            flashToast(e.message, 'error');
          }
        };
      }

      const btnDecDraw = modalRoot.querySelector('#btn-confirm-decline-draw');
      if (btnDecDraw) {
        btnDecDraw.onclick = async () => {
          try {
            await apiPost(`/bonding/matches/${matchId}/action`, { action: 'decline_draw' });
            await fetchMatchState();
            renderArena();
          } catch (e) {
            flashToast(e.message, 'error');
          }
        };
      }

      // Delete Match from arena
      const arenaDelBtns = [
        modalRoot.querySelector('#btn-arena-delete-match'),
        modalRoot.querySelector('#btn-arena-delete-match-ended')
      ].filter(Boolean);

      arenaDelBtns.forEach(btn => {
        btn.onclick = async () => {
          if (!confirm('Are you sure you want to permanently delete this match?')) return;
          try {
            btn.disabled = true;
            await apiDelete(`/bonding/matches/${matchId}`);
            flashToast('Match deleted', 'success');
            closeMatchModal();
            if (currentView === 'lounge_games') await renderLoungeGamesView();
          } catch (e) {
            flashToast(e.message || 'Failed to delete match', 'error');
            btn.disabled = false;
          }
        };
      });

      // Rematch actions on game over
      const btnRematchReq = modalRoot.querySelector('#btn-arena-rematch-action');
      if (btnRematchReq) {
        btnRematchReq.onclick = async () => {
          try {
            btnRematchReq.disabled = true;
            btnRematchReq.textContent = 'Requesting...';
            const res = await apiPost(`/bonding/matches/${matchId}/action`, { action: 'rematch_request' });
            if (res.match) {
              match = res.match;
              prevFingerprint = getMatchFingerprint(res.match);
              renderArena();
              flashToast('Rematch request sent! Waiting for opponent ⚔️', 'info');
            }
          } catch (e) {
            flashToast(e.message || 'Rematch request failed', 'error');
            btnRematchReq.disabled = false;
            btnRematchReq.textContent = '🔄 Request Rematch';
          }
        };
      }

      const btnRematchAccept = modalRoot.querySelector('#btn-arena-accept-rematch');
      if (btnRematchAccept) {
        btnRematchAccept.onclick = async () => {
          try {
            btnRematchAccept.disabled = true;
            btnRematchAccept.textContent = 'Starting...';
            const res = await apiPost(`/bonding/matches/${matchId}/action`, { action: 'rematch_accept' });
            if (res.match) {
              match = res.match;
              prevFingerprint = getMatchFingerprint(res.match);
              flashToast('Rematch started! Same game is live ⚔️', 'success');
              renderArena();
            }
          } catch (e) {
            flashToast(e.message || 'Could not accept rematch', 'error');
            btnRematchAccept.disabled = false;
          }
        };
      }

      const btnRematchDecline = modalRoot.querySelector('#btn-arena-decline-rematch');
      if (btnRematchDecline) {
        btnRematchDecline.onclick = async () => {
          try {
            await apiPost(`/bonding/matches/${matchId}/action`, { action: 'rematch_decline' });
            flashToast('Rematch declined', 'info');
            closeMatchModal();
          } catch (e) {
            closeMatchModal();
          }
        };
      }

      // DOTS & BOXES INTERACTION
      if (match.gameType === 'dotsboxes' && isMyTurn && match.status === 'active') {
        modalRoot.querySelectorAll('.dots-line.clickable').forEach(lineEl => {
          lineEl.onclick = async () => {
            const type = lineEl.dataset.type;
            const r = lineEl.dataset.r;
            const c = lineEl.dataset.c;
            try {
              lineEl.style.opacity = '0.5';
              const updated = await apiPost(`/bonding/matches/${matchId}/move`, { type, r, c });
              match = updated;
              prevFingerprint = getMatchFingerprint(updated);
              renderArena();
            } catch (err) {
              lineEl.style.opacity = '1';
              flashToast(err.message || 'Failed to draw line', 'error');
            }
          };
        });
      }

      // A. CHESS SQUARE INTERACTION
      if (match.gameType === 'chess' && isMyTurn && match.status === 'active') {
        const fen = match.gameState?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        const chess = new Chess(fen);
        const myColor = me.assignedRole === 'white' ? 'w' : 'b';

        modalRoot.querySelectorAll('.chess-sq').forEach(sqEl => {
          sqEl.onclick = async () => {
            const sq = sqEl.dataset.square;

            // If square already selected and clicking another square: attempt move!
            if (selectedChessFromSquare) {
              if (selectedChessFromSquare === sq) {
                // Deselect
                selectedChessFromSquare = null;
                legalDestinations = [];
                renderArena();
                return;
              }

              // Check if valid destination
              if (legalDestinations.includes(sq)) {
                // Check if promotion (pawn moving to 8th rank for white or 1st rank for black)
                const piece = chess.get(selectedChessFromSquare);
                let promo = undefined;
                if (piece && piece.type === 'p' && (sq.endsWith('8') || sq.endsWith('1'))) {
                  promo = prompt('Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)', 'q') || 'q';
                }

                try {
                  const movePayload = {
                    from: selectedChessFromSquare,
                    to: sq,
                    promotion: promo ? promo.toLowerCase() : undefined
                  };

                  selectedChessFromSquare = null;
                  legalDestinations = [];

                  const updatedMatch = await apiPost(`/bonding/matches/${matchId}/move`, { move: movePayload });
                  match = updatedMatch;
                  renderArena();
                } catch (err) {
                  flashToast(err.message || 'Illegal chess move', 'error');
                  selectedChessFromSquare = null;
                  legalDestinations = [];
                  renderArena();
                }
                return;
              }
            }

            // Select square if it contains current player's piece
            const piece = chess.get(sq);
            if (piece && piece.color === myColor) {
              selectedChessFromSquare = sq;
              const moves = chess.moves({ square: sq, verbose: true });
              legalDestinations = moves.map(m => m.to);
              renderArena();
            } else {
              selectedChessFromSquare = null;
              legalDestinations = [];
              renderArena();
            }
          };
        });
      }

      // B. TIC-TAC-TOE CELL INTERACTION
      if (match.gameType === 'tictactoe' && isMyTurn && match.status === 'active') {
        modalRoot.querySelectorAll('.ttt-cell.empty').forEach(cellEl => {
          cellEl.onclick = async () => {
            const idx = cellEl.dataset.cellIdx;
            try {
              cellEl.style.opacity = '0.5';
              const updatedMatch = await apiPost(`/bonding/matches/${matchId}/move`, { cellIndex: Number(idx) });
              match = updatedMatch;
              renderArena();
            } catch (err) {
              flashToast(err.message || 'Invalid move', 'error');
            }
          };
        });
      }

      // C. LUDO 3D INTERACTIVE DICE ROLL & AUTOMATIC TOKEN MOVEMENT
      if (match.gameType === 'ludo' && match.status === 'active') {
        const state = match.gameState || {};
        const rolled = !!state.rolled;
        const currentTurnColor = state.turnColor || match.turn || 'red';
        const hasRolled = Boolean(rolled && (state.dice || (state.lastRoll && state.lastRollColor === currentTurnColor)));
        const myId = currentUser?._id || currentUser?.id;
        const players = state.players || [
          { ...match.player1, color: 'red', assignedRole: 'red', isBot: false },
          { ...match.player2, color: 'green', assignedRole: 'green', isBot: false }
        ];
        const isP1 = myId && match.player1.userId.toString() === myId.toString();
        const myPlayer = players.find(p => p.userId && p.userId.toString() === myId?.toString()) || (isP1 ? players[0] : players[1]);
        const myColor = myPlayer?.color || (isP1 ? 'red' : 'green');
        const isMyCurrentTurn = (myColor === currentTurnColor) && match.status === 'active';
        const turnPlayer = players.find(p => p.color === currentTurnColor) || (currentTurnColor === 'red' ? match.player1 : match.player2);
        const turnPlName = escapeHtml(turnPlayer?.name || (currentTurnColor === 'red' ? 'Player 1' : 'Player 2'));

        // Direct tap on the dice to roll (simple, instant, animated, zero lag/load)
        const diceBtn = modalRoot.querySelector('#btn-interactive-ludo-dice');
        if (diceBtn) {
          const handleDiceTap = async (e) => {
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (!isMyCurrentTurn) {
              flashToast(`${turnPlName}'s turn right now`, 'info');
              return;
            }
            if (hasRolled) {
              flashToast('Dice already rolled! Tap your glowing pawn to move.', 'info');
              return;
            }
            if (match.status !== 'active') {
              flashToast('Match has ended', 'info');
              return;
            }
            if (isDiceRolling || diceBtn.dataset.rolling === 'true') return;

            isDiceRolling = true;
            diceRollStartTime = Date.now();
            diceBtn.dataset.rolling = 'true';
            diceBtn.classList.add('rolling');

            // Quick visual number cycle for rolling effect (200ms)
            let spinCount = 0;
            const spinTimer = setInterval(() => {
              spinCount++;
              const randVal = Math.floor(Math.random() * 6) + 1;
              diceBtn.innerHTML = renderNumberDisplay(randVal);
              if (spinCount >= 4) clearInterval(spinTimer);
            }, 50);

            try {
              const updated = await apiPost(`/bonding/matches/${matchId}/move`, { action: 'roll' });
              clearInterval(spinTimer);
              match = updated;
              prevFingerprint = getMatchFingerprint(updated);
              renderArena();
            } catch (err) {
              clearInterval(spinTimer);
              flashToast(err.message || 'Failed to roll dice', 'error');
              if (diceBtn) {
                delete diceBtn.dataset.rolling;
                diceBtn.classList.remove('rolling');
              }
            } finally {
              isDiceRolling = false;
            }
          };

          diceBtn.onclick = handleDiceTap;
          diceBtn.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleDiceTap(e);
            }
          };
        }

        // Automatic pawn movement when only 1 pawn is movable
        if (isMyCurrentTurn && hasRolled) {
          const allTokens = state.tokens || {};
          const myTokensList = allTokens[myColor] || [];
          const diceVal = state.dice || state.lastRoll || 0;
          const movableList = myTokensList.filter(t => {
            if (t.step === -1 && diceVal === 6) return true;
            if (t.step >= 0 && t.step + diceVal <= 56) return true;
            return false;
          });

          if (movableList.length === 1 && !autoMoveInProgress) {
            autoMoveInProgress = true;
            const singleToken = movableList[0];
            if (autoMoveTimeout) clearTimeout(autoMoveTimeout);
            autoMoveTimeout = setTimeout(async () => {
              try {
                const updated = await apiPost(`/bonding/matches/${matchId}/move`, { action: 'move', tokenId: Number(singleToken.id) });
                match = updated;
                prevFingerprint = getMatchFingerprint(updated);
                autoMoveInProgress = false;
                renderArena();
              } catch (err) {
                autoMoveInProgress = false;
                flashToast(err.message || 'Auto-move failed', 'error');
              }
            }, 400);
          }
        }

        // Manual movable pawn click (when player has multiple choices)
        if (isMyCurrentTurn && rolled) {
          modalRoot.querySelectorAll('.ludo-token.movable').forEach(tokenEl => {
            tokenEl.onclick = async (e) => {
              e.stopPropagation();
              const tId = tokenEl.dataset.tokenId;
              try {
                tokenEl.style.opacity = '0.5';
                const updated = await apiPost(`/bonding/matches/${matchId}/move`, { action: 'move', tokenId: Number(tId) });
                match = updated;
                prevFingerprint = getMatchFingerprint(updated);
                renderArena();
              } catch (err) {
                flashToast(err.message || 'Invalid token move', 'error');
                tokenEl.style.opacity = '1';
              }
            };
          });
        }
      }
    }

    renderArena();


  }

  /* =========================================================================
     MEMBER MANAGEMENT & GROUPS
     ========================================================================= */
  
  /* =========================================================================
     ARCADE & LEADERBOARD TEMPLATE & ENGINES
     ========================================================================= */
  function renderArcadeAndLeaderboardHtml(arcadeData, myId) {
    const leaderboard = arcadeData?.leaderboard || [];
    const myBests = arcadeData?.myBests || [];

    const bestMap = {};
    myBests.forEach(b => { bestMap[b.gameId] = b.highScore; });

    const arcadeGames = [
      {
        id: 'snake',
        title: 'Retro Snake',
        icon: '🐍',
        tag: 'Speed & Reflexes',
        desc: 'Classic 90s arcade nostalgia! Eat apples, grow longer, avoid collisions, and climb the company rank.',
        best: bestMap['snake'] !== undefined ? bestMap['snake'] + ' pts' : 'Unranked'
      },
      {
        id: '2048',
        title: '2048 Puzzle',
        icon: '🔢',
        tag: 'Strategy & Logic',
        desc: 'Slide matching tiles together, merge numbers from 2 to 2048 and beyond. Addictive break puzzle!',
        best: bestMap['2048'] !== undefined ? bestMap['2048'] + ' pts' : 'Unranked'
      },
      {
        id: 'memory',
        title: 'Memory Card Match',
        icon: '🃏',
        tag: 'Focus & Speed',
        desc: 'Flip and match 8 pairs of company emoji cards. Fast times and minimal moves yield massive high scores.',
        best: bestMap['memory'] !== undefined ? bestMap['memory'] + ' pts' : 'Unranked'
      }
    ];

    const filterOptions = [
      { id: 'all', label: '🌐 All Games' },
      { id: 'snake', label: '🐍 Retro Snake' },
      { id: '2048', label: '🔢 2048 Puzzle' },
      { id: 'memory', label: '🃏 Memory Match' }
    ];

    return `
      <!-- Arcade Games Grid -->
      <div class="lounge-section">
        <div class="lounge-section-head">
          <h3>🕹️ Single-Player Break Arcade</h3>
          <p>Instant-play casual single-player challenges. Play anytime during break time to climb the company leaderboard!</p>
        </div>

        <div class="arcade-games-grid">
          ${arcadeGames.map(g => `
            <div class="arcade-game-card">
              <div class="arcade-card-top">
                <span class="arcade-card-icon">${g.icon}</span>
                <span class="arcade-card-badge">${g.tag}</span>
              </div>
              <h4 class="arcade-card-title">${g.title}</h4>
              <p class="arcade-card-desc">${g.desc}</p>
              <div class="arcade-card-best">
                <span>Personal Best:</span> <strong>${g.best}</strong>
              </div>
              <button class="arcade-play-btn btn-play-arcade" data-game="${g.id}">
                <span>▶ Play ${g.title}</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Global Leaderboard Section -->
      <div class="lounge-section" style="margin-top:28px;">
        <div class="lounge-section-head" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <h3>🏆 CI360 Global Arcade Leaderboard</h3>
            <p>Top scores across all departments. Play games to earn bragging rights and bonding points!</p>
          </div>
          <!-- Filter pills -->
          <div class="arcade-filter-pills" style="display:flex;gap:6px;flex-wrap:wrap;">
            ${filterOptions.map(f => `
              <button class="arcade-filter-pill ${currentArcadeGameFilter === f.id ? 'active' : ''}" data-filter="${f.id}">
                ${f.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="arcade-leaderboard-box">
          ${leaderboard.length === 0 ? `
            <div class="box-empty-text" style="padding:40px;text-align:center;">
              <span style="font-size:32px;display:block;margin-bottom:8px;">🕹️</span>
              No high scores recorded for this game yet. Be the first employee to play and claim Rank #1!
            </div>
          ` : `
            <div class="arcade-leaderboard-table-wrap">
              <table class="arcade-leaderboard-table">
                <thead>
                  <tr>
                    <th style="width:70px;text-align:center;">Rank</th>
                    <th>Colleague</th>
                    <th>Game</th>
                    <th style="text-align:right;">High Score</th>
                    <th style="text-align:right;">Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${leaderboard.map(entry => {
                    const isMe = myId && entry.userId && entry.userId.toString() === myId.toString();
                    const rankMedal = entry.rank === 1 ? '🥇' : (entry.rank === 2 ? '🥈' : (entry.rank === 3 ? '🥉' : `#${entry.rank}`));
                    const gameIcons = { snake: '🐍', '2048': '🔢', memory: '🃏' };
                    return `
                      <tr class="${isMe ? 'is-my-row' : ''}">
                        <td style="text-align:center;">
                          <span class="leaderboard-rank-badge rank-${entry.rank}">${rankMedal}</span>
                        </td>
                        <td>
                          <div class="leaderboard-user-cell">
                            <div class="leaderboard-avatar">${(entry.userName || 'U').charAt(0).toUpperCase()}</div>
                            <div>
                              <span class="leaderboard-user-name">${escapeHtml(entry.userName)} ${isMe ? '<strong style="color:#6366f1;">(You)</strong>' : ''}</span>
                              <span class="leaderboard-user-role">${escapeHtml(entry.userRole || 'Team Member')}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="leaderboard-game-tag">
                            <span>${gameIcons[entry.gameId] || '🎮'}</span>
                            <span>${escapeHtml(entry.gameTitle)}</span>
                          </span>
                        </td>
                        <td style="text-align:right;">
                          <span class="leaderboard-score-val">${entry.score.toLocaleString()}</span>
                        </td>
                        <td style="text-align:right;color:var(--text-3);font-size:12px;">
                          ${new Date(entry.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  }

  function openArcadeGameModal(gameId) {
    const modalRoot = container.querySelector('#bonding-modals-root');
    let cleanupCurrentGame = null;

    const gameTitles = {
      snake: { title: 'Retro Snake', icon: '🐍', desc: 'Use Arrow Keys or on-screen controls to eat apples and grow!' },
      2048: { title: '2048 Puzzle', icon: '🔢', desc: 'Slide and combine tiles. Reach 2048 to win!' },
      memory: { title: 'Memory Match', icon: '🃏', desc: 'Flip and match 8 pairs of company cards with fewest moves!' }
    };
    const info = gameTitles[gameId] || gameTitles.snake;

    function closeArcadeModal() {
      if (typeof cleanupCurrentGame === 'function') cleanupCurrentGame();
      modalRoot.innerHTML = '';
      if (currentView === 'lounge_games') renderLoungeGamesView(true);
    }

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card arcade-game-modal-card" style="max-width:440px;width:95%;">
          <div class="bonding-modal-header">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:24px;">${info.icon}</span>
              <div>
                <h3 style="margin:0;font-size:16px;">${info.title}</h3>
                <span style="font-size:11.5px;color:var(--text-3);">${info.desc}</span>
              </div>
            </div>
            <button class="bonding-modal-close" id="btn-close-arcade">&times;</button>
          </div>

          <div class="bonding-modal-body arcade-game-body" id="arcade-game-container" style="padding:16px;">
            <!-- Dynamic Game Canvas / Board injected here -->
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('#btn-close-arcade').onclick = closeArcadeModal;
    const gameContainer = modalRoot.querySelector('#arcade-game-container');

    if (gameId === 'snake') {
      cleanupCurrentGame = launchSnakeGame(gameContainer, closeArcadeModal);
    } else if (gameId === '2048') {
      cleanupCurrentGame = launch2048Game(gameContainer, closeArcadeModal);
    } else if (gameId === 'memory') {
      cleanupCurrentGame = launchMemoryGame(gameContainer, closeArcadeModal);
    }
  }

  function launchSnakeGame(containerEl, onClose) {
    containerEl.innerHTML = `
      <div class="arcade-play-area">
        <div class="arcade-score-bar">
          <div class="arcade-score-box">
            <span class="lbl">Score</span>
            <span class="val" id="snake-live-score">0</span>
          </div>
          <button class="arcade-restart-btn" id="btn-restart-snake">🔄 Restart</button>
        </div>
        <div class="arcade-canvas-wrap" style="position:relative;margin:10px auto;max-width:320px;">
          <canvas id="snakeCanvas" width="320" height="320" style="background:#0f172a;border-radius:12px;border:2px solid #334155;display:block;margin:0 auto;box-shadow:0 8px 24px rgba(0,0,0,0.4);"></canvas>
          <div class="arcade-game-over-overlay" id="snake-over-overlay" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.9);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;">
            <div class="over-content">
              <h3 style="color:#ef4444;margin:0 0 8px;">GAME OVER 💥</h3>
              <p style="margin:0 0 8px;font-size:14px;color:#fff;">Your Score: <strong id="snake-final-score" style="font-size:22px;color:#facc15;">0</strong></p>
              <div id="snake-rank-msg" style="font-size:13px;color:#10b981;margin:8px 0;font-weight:700;"></div>
              <button class="bonding-btn-primary" id="btn-snake-play-again" style="margin-top:8px;">Play Again 🔄</button>
            </div>
          </div>
        </div>
        <div class="arcade-dpad">
          <button class="dpad-btn up" data-dir="up">▲</button>
          <div class="dpad-middle">
            <button class="dpad-btn left" data-dir="left">◀</button>
            <button class="dpad-btn down" data-dir="down">▼</button>
            <button class="dpad-btn right" data-dir="right">▶</button>
          </div>
        </div>
      </div>
    `;

    const canvas = containerEl.querySelector('#snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = containerEl.querySelector('#snake-live-score');
    const overOverlay = containerEl.querySelector('#snake-over-overlay');
    const finalScoreEl = containerEl.querySelector('#snake-final-score');
    const rankMsgEl = containerEl.querySelector('#snake-rank-msg');
    const restartBtn = containerEl.querySelector('#btn-restart-snake');
    const playAgainBtn = containerEl.querySelector('#btn-snake-play-again');

    const gridSize = 16;
    const tileCount = 20; // 320 / 16 = 20 tiles
    let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let food = { x: 15, y: 10 };
    let score = 0;
    let isGameOver = false;
    let loopTimer = null;

    function spawnFood() {
      while (true) {
        const fx = Math.floor(Math.random() * tileCount);
        const fy = Math.floor(Math.random() * tileCount);
        if (!snake.some(s => s.x === fx && s.y === fy)) {
          food = { x: fx, y: fy };
          break;
        }
      }
    }

    function draw() {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= canvas.width; i += gridSize) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Draw food
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2.3, 0, Math.PI * 2);
      ctx.fill();

      // Food leaf
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(food.x * gridSize + gridSize / 2 - 1, food.y * gridSize + 1, 2, 3);

      // Draw snake
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? '#10b981' : (i % 2 === 0 ? '#34d399' : '#059669');
        const x = seg.x * gridSize + 1;
        const y = seg.y * gridSize + 1;
        const w = gridSize - 2;
        const h = gridSize - 2;
        ctx.fillRect(x, y, w, h);

        if (i === 0) {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(x + 4, y + 4, 1.5, 0, Math.PI * 2);
          ctx.arc(x + w - 4, y + 4, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    async function handleGameOver() {
      isGameOver = true;
      if (loopTimer) clearInterval(loopTimer);
      finalScoreEl.textContent = score;
      overOverlay.style.display = 'flex';

      try {
        const res = await apiPost('/bonding/arcade/score', {
          gameId: 'snake',
          gameTitle: 'Retro Snake',
          score,
          metrics: { length: snake.length }
        });
        if (res.isNewPersonalBest) {
          rankMsgEl.textContent = `🎉 NEW PERSONAL BEST! Leaderboard Rank: #${res.rank}`;
          flashToast(`New Personal Best on Snake! Rank #${res.rank} 🏆`, 'success');
        } else {
          rankMsgEl.textContent = `Leaderboard Rank: #${res.rank}`;
        }
      } catch (err) {
        console.error('Failed to submit score:', err);
      }
    }

    function step() {
      if (isGameOver) return;
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        handleGameOver();
        return;
      }

      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        handleGameOver();
        return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        spawnFood();
      } else {
        snake.pop();
      }

      draw();
    }

    function changeDir(newD) {
      if (newD === 'up' && dir.y !== 1) nextDir = { x: 0, y: -1 };
      else if (newD === 'down' && dir.y !== -1) nextDir = { x: 0, y: 1 };
      else if (newD === 'left' && dir.x !== 1) nextDir = { x: -1, y: 0 };
      else if (newD === 'right' && dir.x !== -1) nextDir = { x: 1, y: 0 };
    }

    function handleKey(e) {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); changeDir('up'); }
      else if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); changeDir('down'); }
      else if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); changeDir('left'); }
      else if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); changeDir('right'); }
    }

    window.addEventListener('keydown', handleKey);

    containerEl.querySelectorAll('.dpad-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        changeDir(btn.dataset.dir);
      };
    });

    function resetGame() {
      if (loopTimer) clearInterval(loopTimer);
      snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      score = 0;
      scoreEl.textContent = '0';
      isGameOver = false;
      overOverlay.style.display = 'none';
      spawnFood();
      draw();
      loopTimer = setInterval(step, 115);
    }

    restartBtn.onclick = resetGame;
    playAgainBtn.onclick = resetGame;

    resetGame();

    return () => {
      if (loopTimer) clearInterval(loopTimer);
      window.removeEventListener('keydown', handleKey);
    };
  }

  function launch2048Game(containerEl, onClose) {
    containerEl.innerHTML = `
      <div class="arcade-play-area">
        <div class="arcade-score-bar">
          <div class="arcade-score-box">
            <span class="lbl">Score</span>
            <span class="val" id="g2048-live-score">0</span>
          </div>
          <button class="arcade-restart-btn" id="btn-restart-2048">🔄 New Game</button>
        </div>
        <div class="arcade-canvas-wrap" style="position:relative;margin:10px auto;max-width:320px;">
          <div class="g2048-grid" id="g2048Board"></div>
          <div class="arcade-game-over-overlay" id="g2048-over-overlay" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.92);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;">
            <div class="over-content">
              <h3 style="color:#ef4444;margin:0 0 8px;">GAME OVER 💥</h3>
              <p style="margin:0 0 8px;font-size:14px;color:#fff;">Final Score: <strong id="g2048-final-score" style="font-size:22px;color:#facc15;">0</strong></p>
              <div id="g2048-rank-msg" style="font-size:13px;color:#10b981;margin:8px 0;font-weight:700;"></div>
              <button class="bonding-btn-primary" id="btn-g2048-play-again" style="margin-top:8px;">Play Again 🔄</button>
            </div>
          </div>
        </div>
        <div class="arcade-dpad">
          <button class="dpad-btn up" data-dir="up">▲</button>
          <div class="dpad-middle">
            <button class="dpad-btn left" data-dir="left">◀</button>
            <button class="dpad-btn down" data-dir="down">▼</button>
            <button class="dpad-btn right" data-dir="right">▶</button>
          </div>
        </div>
      </div>
    `;

    const boardEl = containerEl.querySelector('#g2048Board');
    const scoreEl = containerEl.querySelector('#g2048-live-score');
    const overOverlay = containerEl.querySelector('#g2048-over-overlay');
    const finalScoreEl = containerEl.querySelector('#g2048-final-score');
    const rankMsgEl = containerEl.querySelector('#g2048-rank-msg');
    const restartBtn = containerEl.querySelector('#btn-restart-2048');
    const playAgainBtn = containerEl.querySelector('#btn-g2048-play-again');

    let grid = Array(4).fill(null).map(() => Array(4).fill(0));
    let score = 0;
    let isGameOver = false;

    function renderBoard() {
      scoreEl.textContent = score;
      boardEl.innerHTML = '';
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const val = grid[r][c];
          const tile = document.createElement('div');
          tile.className = `g2048-tile val-${val}`;
          tile.textContent = val > 0 ? val : '';
          boardEl.appendChild(tile);
        }
      }
    }

    function addRandomTile() {
      const empty = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (grid[r][c] === 0) empty.push({ r, c });
        }
      }
      if (empty.length === 0) return;
      const spot = empty[Math.floor(Math.random() * empty.length)];
      grid[spot.r][spot.c] = Math.random() < 0.9 ? 2 : 4;
    }

    function slideRow(row) {
      let filtered = row.filter(x => x !== 0);
      let gained = 0;
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          gained += filtered[i];
          filtered.splice(i + 1, 1);
        }
      }
      while (filtered.length < 4) filtered.push(0);
      return { row: filtered, gained };
    }

    function move(dir) {
      if (isGameOver) return;
      let moved = false;
      let gainedTotal = 0;

      if (dir === 'left') {
        for (let r = 0; r < 4; r++) {
          const res = slideRow(grid[r]);
          if (res.row.some((v, i) => v !== grid[r][i])) moved = true;
          grid[r] = res.row;
          gainedTotal += res.gained;
        }
      } else if (dir === 'right') {
        for (let r = 0; r < 4; r++) {
          const rev = [...grid[r]].reverse();
          const res = slideRow(rev);
          const finalRow = res.row.reverse();
          if (finalRow.some((v, i) => v !== grid[r][i])) moved = true;
          grid[r] = finalRow;
          gainedTotal += res.gained;
        }
      } else if (dir === 'up') {
        for (let c = 0; c < 4; c++) {
          const col = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
          const res = slideRow(col);
          for (let r = 0; r < 4; r++) {
            if (grid[r][c] !== res.row[r]) moved = true;
            grid[r][c] = res.row[r];
          }
          gainedTotal += res.gained;
        }
      } else if (dir === 'down') {
        for (let c = 0; c < 4; c++) {
          const col = [grid[3][c], grid[2][c], grid[1][c], grid[0][c]];
          const res = slideRow(col);
          const finalCol = res.row.reverse();
          for (let r = 0; r < 4; r++) {
            if (grid[r][c] !== finalCol[r]) moved = true;
            grid[r][c] = finalCol[r];
          }
          gainedTotal += res.gained;
        }
      }

      if (moved) {
        score += gainedTotal;
        addRandomTile();
        renderBoard();
        checkGameOver();
      }
    }

    async function checkGameOver() {
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (grid[r][c] === 0) return;
        }
      }
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const v = grid[r][c];
          if (r < 3 && grid[r + 1][c] === v) return;
          if (c < 3 && grid[r][c + 1] === v) return;
        }
      }

      isGameOver = true;
      finalScoreEl.textContent = score;
      overOverlay.style.display = 'flex';

      try {
        const res = await apiPost('/bonding/arcade/score', {
          gameId: '2048',
          gameTitle: '2048 Puzzle',
          score
        });
        if (res.isNewPersonalBest) {
          rankMsgEl.textContent = `🎉 NEW PERSONAL BEST! Leaderboard Rank: #${res.rank}`;
          flashToast(`New Personal Best on 2048! Rank #${res.rank} 🏆`, 'success');
        } else {
          rankMsgEl.textContent = `Leaderboard Rank: #${res.rank}`;
        }
      } catch (err) {
        console.error('Failed to submit 2048 score:', err);
      }
    }

    function handleKey(e) {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); move('up'); }
      else if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); move('down'); }
      else if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); move('left'); }
      else if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); move('right'); }
    }

    window.addEventListener('keydown', handleKey);

    containerEl.querySelectorAll('.dpad-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        move(btn.dataset.dir);
      };
    });

    function resetGame() {
      grid = Array(4).fill(null).map(() => Array(4).fill(0));
      score = 0;
      isGameOver = false;
      overOverlay.style.display = 'none';
      addRandomTile();
      addRandomTile();
      renderBoard();
    }

    restartBtn.onclick = resetGame;
    playAgainBtn.onclick = resetGame;

    resetGame();

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }

  function launchMemoryGame(containerEl, onClose) {
    containerEl.innerHTML = `
      <div class="arcade-play-area">
        <div class="arcade-score-bar">
          <div class="arcade-score-box">
            <span class="lbl">Moves</span>
            <span class="val" id="memory-moves">0</span>
          </div>
          <div class="arcade-score-box">
            <span class="lbl">Time</span>
            <span class="val" id="memory-timer">00:00</span>
          </div>
          <button class="arcade-restart-btn" id="btn-restart-memory">🔄 Shuffle & Restart</button>
        </div>
        <div class="arcade-canvas-wrap" style="position:relative;margin:10px auto;max-width:320px;">
          <div class="memory-grid" id="memoryBoard"></div>
          <div class="arcade-game-over-overlay" id="memory-over-overlay" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.92);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;">
            <div class="over-content">
              <h3 style="color:#10b981;margin:0 0 8px;">🎉 VICTORY! ALL MATCHED!</h3>
              <p style="margin:0 0 8px;font-size:14px;color:#fff;">Final Score: <strong id="memory-final-score" style="font-size:22px;color:#facc15;">0</strong></p>
              <div id="memory-rank-msg" style="font-size:13px;color:#10b981;margin:8px 0;font-weight:700;"></div>
              <button class="bonding-btn-primary" id="btn-memory-play-again" style="margin-top:8px;">Play Again 🔄</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const boardEl = containerEl.querySelector('#memoryBoard');
    const movesEl = containerEl.querySelector('#memory-moves');
    const timerEl = containerEl.querySelector('#memory-timer');
    const overOverlay = containerEl.querySelector('#memory-over-overlay');
    const finalScoreEl = containerEl.querySelector('#memory-final-score');
    const rankMsgEl = containerEl.querySelector('#memory-rank-msg');
    const restartBtn = containerEl.querySelector('#btn-restart-memory');
    const playAgainBtn = containerEl.querySelector('#btn-memory-play-again');

    const icons = ['🚀', '💻', '☕', '🎯', '🔥', '🏆', '💡', '🎨'];
    let cards = [];
    let flippedIndices = [];
    let moves = 0;
    let seconds = 0;
    let timerInterval = null;
    let isChecking = false;
    let isFinished = false;

    function initGame() {
      if (timerInterval) clearInterval(timerInterval);
      moves = 0;
      seconds = 0;
      isChecking = false;
      isFinished = false;
      flippedIndices = [];
      movesEl.textContent = '0';
      timerEl.textContent = '00:00';
      overOverlay.style.display = 'none';

      const paired = [...icons, ...icons];
      for (let i = paired.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [paired[i], paired[j]] = [paired[j], paired[i]];
      }

      cards = paired.map((icon, idx) => ({
        id: idx,
        icon,
        flipped: false,
        matched: false
      }));

      timerInterval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
      }, 1000);

      renderMemoryBoard();
    }

    function renderMemoryBoard() {
      boardEl.innerHTML = '';
      cards.forEach((card, idx) => {
        const cardEl = document.createElement('div');
        cardEl.className = `memory-card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`;
        cardEl.innerHTML = `
          <div class="card-inner">
            <div class="card-front">❓</div>
            <div class="card-back">${card.icon}</div>
          </div>
        `;
        cardEl.onclick = () => onCardClick(idx);
        boardEl.appendChild(cardEl);
      });
    }

    async function onCardClick(idx) {
      if (isChecking || isFinished) return;
      const card = cards[idx];
      if (card.flipped || card.matched) return;

      card.flipped = true;
      flippedIndices.push(idx);
      renderMemoryBoard();

      if (flippedIndices.length === 2) {
        moves++;
        movesEl.textContent = moves;
        isChecking = true;

        const [idx1, idx2] = flippedIndices;
        if (cards[idx1].icon === cards[idx2].icon) {
          cards[idx1].matched = true;
          cards[idx2].matched = true;
          flippedIndices = [];
          isChecking = false;
          renderMemoryBoard();
          checkWin();
        } else {
          setTimeout(() => {
            cards[idx1].flipped = false;
            cards[idx2].flipped = false;
            flippedIndices = [];
            isChecking = false;
            renderMemoryBoard();
          }, 700);
        }
      }
    }

    async function checkWin() {
      if (cards.every(c => c.matched)) {
        isFinished = true;
        if (timerInterval) clearInterval(timerInterval);

        const score = Math.max(100, Math.round(1800 - moves * 30 - seconds * 8));
        finalScoreEl.textContent = score;
        overOverlay.style.display = 'flex';

        try {
          const res = await apiPost('/bonding/arcade/score', {
            gameId: 'memory',
            gameTitle: 'Memory Match',
            score,
            metrics: { moves, seconds }
          });
          if (res.isNewPersonalBest) {
            rankMsgEl.textContent = `🎉 NEW PERSONAL BEST! Leaderboard Rank: #${res.rank}`;
            flashToast(`New Personal Best on Memory Match! Rank #${res.rank} 🏆`, 'success');
          } else {
            rankMsgEl.textContent = `Leaderboard Rank: #${res.rank}`;
          }
        } catch (err) {
          console.error('Failed to submit memory score:', err);
        }
      }
    }

    restartBtn.onclick = initGame;
    playAgainBtn.onclick = initGame;

    initGame();

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }

  function openManageMembersModal() {
    if (!activeChannel || activeChannel.type === 'direct') return;

    const modalRoot = container.querySelector('#bonding-modals-root');
    const isAllowedRole = (r) => r === 'employee' || r === 'admin' || r === 'superadmin';
    const currentMembers = activeChannel.members || [];
    const memberUserIds = new Set(currentMembers.map(m => m.userId?.toString()));
    const availableColleagues = colleagues.filter(c => isAllowedRole(c.role) && !memberUserIds.has(c._id.toString()));

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
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${availableColleagues.map(c => `
                    <option value="${c._id}">${escapeHtml(c.name)} (${escapeHtml(c.role === 'superadmin' ? 'Superadmin' : (c.role === 'admin' ? 'Admin' : 'Employee'))})</option>
                  `).join('')}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${availableColleagues.length === 0 ? 'disabled' : ''}>
                  Add to Group
                </button>
              </div>
              ${availableColleagues.length === 0 ? `<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>` : ''}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${currentMembers.length}):</label>
              <div class="bonding-members-list">
                ${currentMembers.map(m => {
      const myId = currentUser?._id || currentUser?.id;
      const isMe = myId && m.userId && m.userId.toString() === myId.toString();
      const isCreator = activeChannel.createdBy && activeChannel.createdBy.userId && String(activeChannel.createdBy.userId) === String(myId);
      const isSuperadmin = (userRole === 'superadmin' || currentUser?.role === 'superadmin');
      const canDeleteGroup = isCreator || isSuperadmin;
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
                        ${isMe ? `
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${m.userId}">
                            🚪 Leave Group
                          </button>
                        ` : (canDeleteGroup ? `
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${m.userId}" data-name="${escapeHtml(m.name)}">
                            Remove
                          </button>
                        ` : '')}
                      </div>
                    </div>
                  `;
    }).join('')}
              </div>
            </div>

            ${(() => {
        const myId = currentUser?._id || currentUser?.id;
        const isCreator = activeChannel.createdBy && activeChannel.createdBy.userId && String(activeChannel.createdBy.userId) === String(myId);
        const isSuperadmin = (userRole === 'superadmin' || currentUser?.role === 'superadmin');
        const canDeleteGroup = isCreator || isSuperadmin;

        return canDeleteGroup ? `
                <!-- Delete Group Option in Modal (Creator only) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Delete Group</strong>
                    <span>Permanently delete this group lounge and remove all its messages.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-delete-group">
                    Delete Group
                  </button>
                </div>
              ` : `
                <!-- Leave Group Option in Modal (Members) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Leave Group</strong>
                    <span>Exit this group lounge. You can rejoin if invited again.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-leave-group">
                    🚪 Leave Group
                  </button>
                </div>
              `;
      })()}
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };

    const modalDeleteBtn = modalRoot.querySelector('#btn-modal-delete-group');
    if (modalDeleteBtn) {
      modalDeleteBtn.onclick = () => {
        modalRoot.innerHTML = '';
        confirmDeleteGroup();
      };
    }

    const modalLeaveBtn = modalRoot.querySelector('#btn-modal-leave-group');
    if (modalLeaveBtn) {
      modalLeaveBtn.onclick = () => {
        modalRoot.innerHTML = '';
        confirmLeaveGroup();
      };
    }

    modalRoot.querySelectorAll('.btn-leave-group-action').forEach(b => {
      b.onclick = () => {
        modalRoot.innerHTML = '';
        confirmLeaveGroup();
      };
    });

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
          await loadMessages(activeChannel._id);
          renderChatPanel();
        } catch (err) {
          flashToast(err.message || 'Failed to add member', 'error');
          addBtn.disabled = false;
          addBtn.textContent = 'Add to Group';
        }
      };
    }

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
          renderChatPanel();
        } catch (err) {
          flashToast(err.message || 'Failed to remove member', 'error');
          btn.disabled = false;
        }
      };
    });
  }

  async function confirmLeaveGroup() {
    if (!activeChannel || activeChannel.type === 'direct') return;

    const groupName = activeChannel.name;
    const confirmed = confirm(`Are you sure you want to leave the group "${groupName}"?`);
    if (!confirmed) return;

    try {
      await apiPost(`/bonding/channels/${activeChannel._id}/leave`, {});
      flashToast(`You left "${groupName}"`, 'info');

      channels = await apiGet('/bonding/channels').catch(() => []);
      activeChannel = channels.find(c => c.type === 'group') || channels[0] || null;
      renderSidebarChannels();
      renderChatPanel();

      if (activeChannel) {
        await loadMessages(activeChannel._id);
      }
    } catch (err) {
      flashToast(err.message || 'Failed to leave group', 'error');
    }
  }

  async function confirmDeleteGroup() {
    if (!activeChannel || activeChannel.type === 'direct') return;

    const groupName = activeChannel.name;
    const confirmed = confirm(`Are you sure you want to delete the group "${groupName}"?\n\nAll messages in this lounge will be deleted.`);
    if (!confirmed) return;

    try {
      await apiDelete(`/bonding/channels/${activeChannel._id}`);
      flashToast(`Group "${groupName}" deleted successfully`, 'success');

      channels = await apiGet('/bonding/channels').catch(() => []);
      activeChannel = channels.find(c => c.type === 'group') || channels[0] || null;
      renderSidebarChannels();
      renderChatPanel();

      if (activeChannel) {
        await loadMessages(activeChannel._id);
      }
    } catch (err) {
      flashToast(err.message || 'Failed to delete group', 'error');
    }
  }

  function openNewDirectChatModal() {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const isAllowedRole = (r) => r === 'employee' || r === 'admin' || r === 'superadmin';
    const others = colleagues.filter(c => !c.isSelf && isAllowedRole(c.role));

    modalRoot.innerHTML = `
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${others.map(u => `
                <div class="bonding-user-pick-item" data-user-id="${u._id}" data-name="${escapeHtml(u.name)}">
                  <div class="bonding-member-avatar">${u.name.slice(0, 1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${escapeHtml(u.name)}</span>
                    <span class="user-pick-role">${escapeHtml(u.role === 'superadmin' ? 'Superadmin' : (u.role === 'admin' ? 'Admin' : 'Employee'))} · ${escapeHtml(u.email || '')}</span>
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
          channels = await apiGet('/bonding/channels');
          activeChannel = channels.find(c => c._id === directChan._id) || directChan;
          renderSidebarChannels();
          renderChatPanel();
          await loadMessages(activeChannel._id);
        } catch (err) {
          flashToast(err.message || 'Failed to open personal chat', 'error');
        }
      };
    });
  }

  function openCreateGroupModal() {
    const modalRoot = container.querySelector('#bonding-modals-root');
    const isAllowedRole = (r) => r === 'employee' || r === 'admin' || r === 'superadmin';
    const others = colleagues.filter(c => !c.isSelf && isAllowedRole(c.role));

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
              <input type="text" id="new-group-name" class="bonding-input" placeholder="e.g. Design Sync, Dev Team, Marketing Lounge..." />
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
                <span class="avatar-opt">💡</span>
                <span class="avatar-opt">🚀</span>
                <span class="avatar-opt">💬</span>
                <span class="avatar-opt">🍕</span>
                <span class="avatar-opt">🎯</span>
                <span class="avatar-opt">⭐</span>
              </div>
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Initial Members (Employees & Admins only)</label>
              <div class="bonding-member-checkboxes">
                ${others.map(u => `
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${u._id}" />
                    <span>${escapeHtml(u.name)} (${escapeHtml(u.role === 'superadmin' ? 'Superadmin' : (u.role === 'admin' ? 'Admin' : 'Employee'))})</span>
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

    let chosenAvatar = '👥';
    const avatarOpts = modalRoot.querySelectorAll('.avatar-opt');
    avatarOpts.forEach(opt => {
      opt.onclick = () => {
        avatarOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        chosenAvatar = opt.textContent.trim();
      };
    });

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
        renderSidebarChannels();
        renderChatPanel();
        await loadMessages(activeChannel._id);
      } catch (err) {
        flashToast(err.message || 'Failed to create group', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Group 🎉';
      }
    };
  }

  /* ── CHAT EMOJI PICKER (ORGANIZED PALETTE - NEVER RANDOM) ── */
  function openChatEmojiPicker(targetBtn, onSelect) {
    const old = document.querySelector('.bonding-chat-emoji-palette');
    if (old) { old.remove(); return; }

    const categories = [
      {
        name: 'Smileys & Faces',
        icon: '😀',
        emojis: ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','😉','😍','🥰','😘','😋','😎','🤔','🤨','😐','😴','🤯','🥳','🥺']
      },
      {
        name: 'Hands & People',
        icon: '👍',
        emojis: ['👍','👎','👏','🙌','👐','🤝','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','💪','🫡','🙏','🙋','🙆']
      },
      {
        name: 'Celebration & Work',
        icon: '🎉',
        emojis: ['🎉','🎊','🔥','✨','💯','🚀','🎯','🏆','🥇','⭐','🌟','💡','📌','💼','📊','📈','⏱️','⏳','✅','❌','⚡']
      },
      {
        name: 'Break & Fun',
        icon: '☕',
        emojis: ['☕','🍵','🍕','🍔','🍟','🎂','🍰','🍩','🍿','🍺','🍻','🎮','🎲','⏹️','🧩','🎵','🏖️','⚽','❤️','💖','💙']
      }
    ];

    let activeCatIdx = 0;
    const palette = document.createElement('div');
    palette.className = 'bonding-chat-emoji-palette';

    function renderPalette() {
      const cat = categories[activeCatIdx];
      palette.innerHTML = `
        <div class="emoji-palette-tabs">
          ${categories.map((c, i) => `
            <button class="emoji-tab-btn ${i === activeCatIdx ? 'active' : ''}" data-cat-idx="${i}" title="${c.name}">
              ${c.icon}
            </button>
          `).join('')}
        </div>
        <div class="emoji-palette-header">
          <span>${cat.name}</span>
          <button class="emoji-palette-close" type="button">&times;</button>
        </div>
        <div class="emoji-palette-grid">
          ${cat.emojis.map(e => `
            <button class="chat-emoji-cell" data-e="${e}" type="button">${e}</button>
          `).join('')}
        </div>
      `;

      palette.querySelectorAll('.emoji-tab-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          activeCatIdx = Number(btn.dataset.catIdx);
          renderPalette();
        };
      });

      palette.querySelector('.emoji-palette-close').onclick = (e) => {
        e.stopPropagation();
        palette.remove();
      };

      palette.querySelectorAll('.chat-emoji-cell').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          onSelect(btn.dataset.e);
          palette.remove();
        };
      });
    }

    renderPalette();

    const rect = targetBtn.getBoundingClientRect();
    palette.style.position = 'fixed';
    palette.style.bottom = `${window.innerHeight - rect.top + 8}px`;
    palette.style.left = `${Math.max(12, Math.min(window.innerWidth - 300, rect.left - 40))}px`;

    document.body.appendChild(palette);

    const closeHandler = (e) => {
      if (!palette.contains(e.target) && e.target !== targetBtn && !targetBtn.contains(e.target)) {
        palette.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);
  }

  function openEmojiPicker(targetBtn, onSelect) {
    const old = document.querySelector('.bonding-emoji-popup');
    if (old) old.remove();

    const emojis = ['👍', '❤️', '🔥', '😂', '🎉', '👏', '🎯', '✨', '🙌', '💯', '🚀', '💡'];
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
   STYLE INJECTION WITH FULL LIGHT & DARK THEME SUPPORT
   ========================================================================= */
function injectBondingStyles() {
  const existing = document.getElementById('ci360-bonding-styles');
  if (existing) existing.remove();

  const style = document.createElement('style');
  style.id = 'ci360-bonding-styles';
  style.textContent = `
    /* Root Wrap */
    .bonding-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 2px;
      font-family: inherit;
      color: var(--text-1, #0f172a);
    }

    /* Top Navigation / Header Bar */
    .bonding-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 14px 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-nav-bar {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }

    .bonding-nav-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .bonding-logo-badge {
      font-size: 24px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
      color: #ffffff;
      flex-shrink: 0;
    }

    .bonding-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0 0 2px 0;
    }

    [data-theme="dark"] .bonding-title {
      color: #f9fafb !important;
    }

    .bonding-subtitle {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    [data-theme="dark"] .bonding-subtitle {
      color: #9ca3af !important;
    }

    /* View Switcher Tabs */
    .bonding-view-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-muted, #f1f5f9);
      padding: 4px;
      border-radius: 12px;
    }

    [data-theme="dark"] .bonding-view-tabs {
      background: #1e293b;
    }

    .bonding-view-tab {
      padding: 8px 16px;
      border-radius: 9px;
      border: none;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-2, #475569);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-view-tab {
      color: #94a3b8;
    }

    .bonding-view-tab.active {
      background: var(--bg-card, #ffffff);
      color: #6366f1;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    [data-theme="dark"] .bonding-view-tab.active {
      background: #0f172a;
      color: #818cf8;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }

    .bonding-nav-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-top-action-btn {
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-card, #ffffff);
      color: var(--text-1, #1e293b);
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-top-action-btn {
      background: #1e293b;
      border-color: #334155;
      color: #f1f5f9;
    }

    .bonding-top-action-btn:hover {
      background: var(--bg-hover, #f8fafc);
      border-color: #94a3b8;
    }

    [data-theme="dark"] .bonding-top-action-btn:hover {
      background: #283548;
      border-color: #475569;
    }

    .bonding-top-action-btn.primary {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      box-shadow: 0 3px 8px rgba(99, 102, 241, 0.3);
    }

    .bonding-top-action-btn.primary:hover {
      opacity: 0.93;
      transform: translateY(-1px);
    }

    /* Main Chat Layout */
    .bonding-chat-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 16px;
      height: calc(100vh - 210px);
      min-height: 580px;
    }

    @media (max-width: 900px) {
      .bonding-chat-layout {
        grid-template-columns: 1fr;
        height: auto;
      }
    }

    /* Sidebar */
    .bonding-sidebar {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .bonding-sidebar {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .bonding-search-box input {
      width: 100%;
      box-sizing: border-box;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: inherit;
      font-size: 13px;
      outline: none;
      transition: border-color 0.15s ease;
    }

    [data-theme="dark"] .bonding-search-box input {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0 8px 0;
    }

    .bonding-section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.8px;
      color: var(--text-3, #94a3b8);
    }

    .bonding-mini-btn {
      font-size: 11.5px;
      font-weight: 600;
      color: #6366f1;
      background: transparent;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 2px 6px;
      border-radius: 6px;
    }

    .bonding-mini-btn:hover {
      background: rgba(99, 102, 241, 0.1);
    }

    .bonding-channel-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-channel-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.15s ease;
      position: relative;
    }

    .bonding-channel-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-channel-item:hover {
      background: #1e293b;
    }

    .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.12);
      border-left: 3px solid #6366f1;
    }

    [data-theme="dark"] .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.22);
      border-left-color: #818cf8;
    }

    .bonding-channel-avatar, .bonding-channel-icon {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      color: #4338ca;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-channel-avatar, [data-theme="dark"] .bonding-channel-icon {
      background: #2e3b52;
      color: #c7d2fe;
    }

    .bonding-channel-info {
      flex: 1;
      min-width: 0;
    }

    .bonding-channel-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .bonding-channel-name {
      color: #f1f5f9;
    }

    .bonding-channel-preview {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .bonding-channel-del-btn {
      opacity: 0;
      background: transparent;
      border: none;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 5px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
      margin-left: auto;
    }

    .bonding-channel-item:hover .bonding-channel-del-btn {
      opacity: 0.75;
    }

    .bonding-channel-del-btn:hover {
      opacity: 1 !important;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.12);
    }

    /* Main Chat Panel */
    .bonding-chat-main {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .bonding-chat-main {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .bonding-chat-header {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    [data-theme="dark"] .bonding-chat-header {
      border-color: #1f2937;
    }

    .bonding-chat-header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bonding-chat-header-avatar {
      font-size: 20px;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-chat-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-chat-title {
      color: #f9fafb;
    }

    .bonding-chat-sub {
      font-size: 12px;
      color: var(--text-3, #64748b);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-online {
      color: #10b981;
      font-weight: 600;
    }

    .bonding-chat-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-header-btn {
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: transparent;
      color: var(--text-2, #334155);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-header-btn {
      border-color: #334155;
      color: #cbd5e1;
    }

    .bonding-header-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-header-btn:hover {
      background: #1e293b;
    }

    .bonding-header-btn.challenge-highlight {
      background: rgba(99, 102, 241, 0.12);
      border-color: #818cf8;
      color: #6366f1;
    }

    [data-theme="dark"] .bonding-header-btn.challenge-highlight {
      background: rgba(99, 102, 241, 0.25);
      color: #a5b4fc;
    }

    .bonding-header-btn.danger {
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .bonding-header-btn.danger:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    /* Messages container */
    .bonding-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bonding-empty-feed {
      margin: auto;
      text-align: center;
      color: var(--text-3, #94a3b8);
      padding: 40px 20px;
    }

    .bonding-empty-icon {
      font-size: 40px;
      margin-bottom: 8px;
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
      border-radius: 9px;
      background: #e2e8f0;
      color: #475569;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-msg-avatar {
      background: #334155;
      color: #f1f5f9;
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
      font-size: 11.5px;
      color: var(--text-3, #94a3b8);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .bonding-msg-del-btn {
      opacity: 0;
      background: transparent;
      border: none;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      font-size: 11px;
    }

    .bonding-msg-row:hover .bonding-msg-del-btn,
    .bonding-msg-system:hover .bonding-msg-del-btn {
      opacity: 0.75;
    }

    .bonding-msg-del-btn:hover {
      opacity: 1 !important;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.12);
    }

    .bonding-msg-del-btn.mini {
      margin-left: 8px;
      font-size: 14px;
      line-height: 1;
    }

    .bonding-msg-sender {
      font-weight: 600;
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .bonding-msg-sender {
      color: #cbd5e1;
    }

    .bonding-msg-bubble {
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.45;
      word-break: break-word;
      background: var(--bg-muted, #f1f5f9);
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-msg-bubble {
      background: #1e293b;
      color: #f8fafc;
    }

    .bonding-msg-row.self .bonding-msg-bubble {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(99, 102, 241, 0.08);
      color: #4f46e5;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 4px 0;
    }

    [data-theme="dark"] .bonding-msg-system {
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
    }

    /* Game Card inside Chat Stream */
    .bonding-game-card-bubble {
      background: var(--bg-surface, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 14px;
      padding: 14px;
      width: 290px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    [data-theme="dark"] .bonding-game-card-bubble {
      background: #1a2333;
      border-color: #334155;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }

    .game-bubble-top {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    .game-bubble-icon {
      font-size: 26px;
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(99, 102, 241, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .game-bubble-title {
      font-size: 14.5px;
      font-weight: 700;
      margin: 0 0 2px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .game-bubble-title {
      color: #f9fafb;
    }

    .game-bubble-desc {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    .game-bubble-status {
      margin: 8px 0;
    }

    .game-bubble-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 10px;
    }

    .game-btn-accept {
      flex: 1;
      padding: 7px 12px;
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }

    .game-btn-decline {
      padding: 7px 10px;
      background: transparent;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-2, #64748b);
    }

    .game-btn-cancel {
      padding: 5px 10px;
      background: transparent;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 6px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .game-btn-play {
      flex: 1;
      padding: 8px 12px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    }

    /* Reactions row */
    .bonding-reactions-row {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    .bonding-rxn-tag {
      padding: 2px 7px;
      border-radius: 12px;
      border: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-card, #ffffff);
      font-size: 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    [data-theme="dark"] .bonding-rxn-tag {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-rxn-tag.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
    }

    .bonding-add-rxn-btn {
      padding: 2px 6px;
      border-radius: 12px;
      border: 1px dashed var(--border-sm, #cbd5e1);
      background: transparent;
      font-size: 11.5px;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
    }

    /* Input bar - Kept strictly in 1 single clean line */
    .bonding-chat-input-bar {
      padding: 10px 18px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      flex-direction: row !important;
      align-items: center !important;
      gap: 10px;
      background: var(--bg-card, #ffffff);
      flex-wrap: nowrap !important;
      white-space: nowrap !important;
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .bonding-chat-input-bar {
      background: var(--bg-surface, #111827);
      border-color: #1f2937;
    }

    .bonding-input-action-btn {
      font-size: 18px;
      padding: 6px;
      background: transparent;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.15s ease;
      flex-shrink: 0 !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-input-action-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #1e293b;
    }

    .bonding-input-field {
      flex: 1 1 auto !important;
      height: 42px !important;
      min-height: 42px !important;
      max-height: 42px !important;
      line-height: normal !important;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      padding: 0 14px !important;
      border-radius: 10px;
      font-size: 13.5px;
      color: inherit;
      outline: none;
      font-family: inherit;
      box-sizing: border-box !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-send-btn {
      flex-shrink: 0 !important;
      height: 42px !important;
      padding: 0 18px !important;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-sizing: border-box !important;
      white-space: nowrap !important;
    }

    /* =========================================================================
       LOUNGE & GAMES ARENA VIEW STYLES
       ========================================================================= */
    .lounge-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .lounge-stats-ribbon {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }

    .lounge-stat-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .lounge-stat-card {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-stat-card .stat-num {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .lounge-stat-card .stat-num {
      color: #f9fafb;
    }

    .lounge-stat-card .stat-lbl {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin-top: 3px;
    }

    .lounge-stat-card.highlight .stat-num {
      color: #10b981;
    }

    .lounge-section {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 20px 22px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .lounge-section {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-section-head h3 {
      font-size: 17px;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .lounge-section-head h3 {
      color: #f9fafb;
    }

    .lounge-section-head p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0 0 16px 0;
    }

    .lounge-games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .lounge-game-card {
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.2s ease;
    }

    [data-theme="dark"] .lounge-game-card {
      background: #182234;
      border-color: #2b3952;
    }

    .lounge-game-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
      border-color: #6366f1;
    }

    .game-card-icon {
      font-size: 34px;
      width: 54px;
      height: 54px;
      border-radius: 14px;
      background: rgba(99, 102, 241, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .game-card-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .game-card-title {
      color: #f9fafb;
    }

    .game-card-desc {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      margin: 0 0 10px 0;
      line-height: 1.4;
    }

    .game-card-meta {
      display: flex;
      gap: 6px;
    }

    .meta-pill {
      font-size: 11.5px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      padding: 3px 8px;
      border-radius: 8px;
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .meta-pill {
      background: #25334c;
      border-color: #3b4d6e;
      color: #cbd5e1;
    }

    .lounge-card-challenge-btn {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: auto;
      transition: opacity 0.15s ease;
    }

    .lounge-card-challenge-btn:hover {
      opacity: 0.93;
    }

    .lounge-two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 900px) {
      .lounge-two-col {
        grid-template-columns: 1fr;
      }
    }

    .lounge-card-box {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 20px;
    }

    [data-theme="dark"] .lounge-card-box {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-box-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .sub-box-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      margin: 0 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .box-empty-text {
      font-size: 12.5px;
      color: var(--text-3, #94a3b8);
      font-style: italic;
      padding: 8px 0;
    }

    .lounge-invites-list, .lounge-active-matches-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .lounge-invite-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 10px;
      gap: 10px;
    }

    [data-theme="dark"] .lounge-invite-item {
      background: #182234;
      border-color: #2b3952;
    }

    .invite-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .invite-avatar {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .invite-info {
      display: flex;
      flex-direction: column;
    }

    .invite-title {
      font-size: 13px;
      font-weight: 700;
    }

    .invite-sender {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    .btn-invite-accept {
      padding: 6px 12px;
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-invite-decline {
      padding: 6px 10px;
      background: transparent;
      border: 1px solid #cbd5e1;
      color: var(--text-2, #475569);
      border-radius: 7px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .btn-invite-cancel {
      padding: 5px 9px;
      background: transparent;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 6px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .lounge-active-match-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      gap: 10px;
      flex-wrap: wrap;
    }

    [data-theme="dark"] .lounge-active-match-card {
      background: #182234;
      border-color: #2b3952;
    }

    .lounge-active-match-card.turn-active {
      border-color: #10b981;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
    }

    .active-match-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .match-game-icon {
      font-size: 26px;
    }

    .match-game-title {
      font-size: 14px;
      font-weight: 700;
    }

    .match-opp-text {
      font-size: 12px;
      color: var(--text-3, #64748b);
    }

    .active-match-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .match-turn-tag {
      font-size: 11.5px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .match-turn-tag.my-turn {
      background: rgba(16, 185, 129, 0.15);
      color: #059669;
    }

    .match-turn-tag.wait {
      background: rgba(148, 163, 184, 0.15);
      color: #64748b;
    }

    .btn-resume-match {
      padding: 7px 14px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }

    .lounge-recent-matches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }

    .recent-match-card {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-muted, #f8fafc);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    [data-theme="dark"] .recent-match-card {
      background: #182234;
      border-color: #2b3952;
    }

    .recent-card-head {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: 700;
    }

    .recent-date {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .recent-outcome.win { color: #10b981; font-weight: 700; }
    .recent-outcome.loss { color: #ef4444; font-weight: 700; }
    .recent-outcome.draw { color: #f59e0b; font-weight: 700; }

    .btn-recent-rematch {
      padding: 6px 10px;
      border: 1px solid #6366f1;
      background: transparent;
      color: #6366f1;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 4px;
    }

    .btn-delete-match {
      padding: 6px 10px;
      background: transparent;
      border: 1px solid var(--border-sm, #e2e8f0);
      color: var(--text-3, #94a3b8);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .btn-delete-match:hover {
      color: #ef4444;
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    .btn-delete-match.mini {
      padding: 3px 6px;
      border: none;
    }

    .btn-delete-match.text-btn {
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #ef4444;
      background: rgba(239, 68, 68, 0.04);
      margin-top: 4px;
    }

    .btn-delete-match.text-btn:hover {
      background: rgba(239, 68, 68, 0.12);
    }

    .btn-clear-matches {
      padding: 6px 12px;
      background: transparent;
      border: 1px solid var(--border-sm, #e2e8f0);
      color: var(--text-2, #64748b);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .btn-clear-matches {
      border-color: #334155;
      color: #94a3b8;
    }

    .btn-clear-matches:hover {
      color: #ef4444;
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    /* Leaderboard Table */
    .lounge-lb-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .lounge-lb-table th {
      text-align: left;
      padding: 10px 12px;
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: var(--text-3, #94a3b8);
      border-bottom: 2px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .lounge-lb-table th {
      border-color: #334155;
    }

    .lounge-lb-table td {
      padding: 12px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .lounge-lb-table td {
      border-color: #1e293b;
    }

    .lb-player-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .lb-avatar {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      color: #4338ca;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* =========================================================================
       CHALLENGE FLOW MODAL STYLES (MANDATORY EMPLOYEE SELECTION)
       ========================================================================= */
    .challenge-flow-modal {
      width: 520px;
      max-width: 95vw;
    }

    .flow-step-box {
      margin-bottom: 16px;
    }

    .flow-step-lbl {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: var(--text-3, #94a3b8);
      margin-bottom: 8px;
    }

    .game-select-pills {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .game-pill-btn {
      padding: 10px 8px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: var(--text-1, #0f172a);
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .game-pill-btn {
      background: #1e293b;
      border-color: #334155;
      color: #f1f5f9;
    }

    .game-pill-btn.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
      color: #6366f1;
    }

    .emp-search-wrap {
      margin-bottom: 8px;
    }

    .eligible-emp-list {
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 10px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    [data-theme="dark"] .eligible-emp-list {
      border-color: #334155;
    }

    .eligible-emp-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .eligible-emp-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .eligible-emp-item:hover {
      background: #25334c;
    }

    .eligible-emp-item.selected {
      background: rgba(99, 102, 241, 0.12);
      border-left: 3px solid #6366f1;
    }

    .emp-item-avatar {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: #e2e8f0;
      color: #334155;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .emp-item-info {
      flex: 1;
      margin-left: 8px;
    }

    .emp-item-name {
      font-size: 13px;
      font-weight: 700;
      display: block;
    }

    .emp-item-role {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .btn-select-opponent {
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: transparent;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-select-opponent.active {
      background: #6366f1;
      color: #ffffff;
      border-color: #6366f1;
    }

    .timer-opts-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .timer-radio-lbl {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--bg-muted, #f8fafc);
    }

    [data-theme="dark"] .timer-radio-lbl {
      background: #1e293b;
    }

    .flow-confirmation-card {
      background: rgba(99, 102, 241, 0.08);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 10px;
      padding: 12px;
      font-size: 12.5px;
    }

    .confirm-head {
      font-weight: 700;
      margin-bottom: 6px;
      color: #6366f1;
    }

    .confirm-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* =========================================================================
       LIVE GAME ARENA MODAL & BOARDS (CHESS, TIC-TAC-TOE, CONNECT FOUR)
       ========================================================================= */
    /* =========================================================================
       LIVE GAME ARENA MODAL & BOARDS (CHESS, TIC-TAC-TOE, CONNECT FOUR)
       ========================================================================= */
    .game-arena-modal {
      width: 660px;
      max-width: 95vw;
      padding: 24px;
      position: relative;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 20px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.22);
    }

    [data-theme="dark"] .game-arena-modal {
      background: #0f172a;
      border-color: #1e293b;
      box-shadow: 0 25px 60px rgba(0,0,0,0.7);
    }

    /* Dedicated Top-Right Close Button */
    .arena-close-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(0,0,0,0.06);
      border: none;
      color: var(--text-3, #94a3b8);
      font-size: 22px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
      z-index: 10;
    }

    .arena-close-btn:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      transform: scale(1.08);
    }

    [data-theme="dark"] .arena-close-btn {
      background: rgba(255,255,255,0.08);
      color: #94a3b8;
    }

    /* Arena Header */
    .arena-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 14px;
      padding-right: 36px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .arena-header {
      border-color: #1e293b;
    }

    .arena-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .arena-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .arena-title {
      font-size: 18px;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .arena-title {
      color: #f8fafc;
    }

    .arena-players-vs {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .player-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .player-tag strong {
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .player-tag strong {
      color: #f1f5f9;
    }

    .vs-pill {
      font-weight: 800;
      font-size: 10px;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(99, 102, 241, 0.12);
      color: #6366f1;
    }

    /* Turn Banner */
    .arena-turn-banner {
      padding: 7px 14px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.3px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .arena-turn-banner.my-turn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.5);
      animation: pulseGlow 1.8s infinite;
    }

    .arena-turn-banner.opp-turn {
      background: var(--bg-muted, #f1f5f9);
      color: var(--text-2, #64748b);
      border: 1px solid var(--border-sm, #cbd5e1);
    }

    [data-theme="dark"] .arena-turn-banner.opp-turn {
      background: #1e293b;
      color: #94a3b8;
      border-color: #334155;
    }

    .arena-turn-banner.ended {
      background: rgba(99, 102, 241, 0.12);
      color: #6366f1;
      border: 1px solid #818cf8;
    }

    /* Sub Toolbar */
    .arena-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border-sm, #f1f5f9);
    }

    [data-theme="dark"] .arena-toolbar {
      border-color: #1e293b;
    }

    .arena-tip-text {
      font-size: 12px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }

    .arena-action-btns {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-arena-action {
      padding: 5px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-card, #ffffff);
      color: var(--text-2, #475569);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .btn-arena-action:hover {
      background: var(--bg-muted, #f8fafc);
      border-color: #94a3b8;
    }

    [data-theme="dark"] .btn-arena-action {
      background: #1e293b;
      border-color: #334155;
      color: #cbd5e1;
    }

    [data-theme="dark"] .btn-arena-action:hover {
      background: #25334c;
      border-color: #475569;
    }

    .btn-arena-action.danger {
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.4);
    }

    .btn-arena-action.danger:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
    }

    /* Draw Offer Notification */
    .arena-draw-offer-banner {
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid #f59e0b;
      padding: 10px 14px;
      border-radius: 10px;
      margin: 12px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 13px;
    }

    .btn-accept-draw {
      background: #10b981;
      color: #fff;
      border: none;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
    }

    .btn-decline-draw {
      background: transparent;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    /* Main Playing Board Arena Wrapper */
    .arena-board-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      width: 100%;
      min-height: 380px;
      box-sizing: border-box;
    }

    /* =========================================================================
       TIC-TAC-TOE BOARD (AUTHENTIC SQUARE 3x3 COURT)
       ========================================================================= */
    .ttt-court {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px;
      user-select: none;
    }

    .ttt-board-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 98px) !important;
      grid-template-rows: repeat(3, 98px) !important;
      gap: 10px !important;
      width: 324px !important;
      height: 324px !important;
      min-width: 324px !important;
      min-height: 324px !important;
      max-width: 324px !important;
      max-height: 324px !important;
      place-items: center !important;
      align-content: center !important;
      justify-content: center !important;
      background: var(--bg-muted, #f1f5f9);
      padding: 10px;
      border-radius: 24px;
      border: 1px solid var(--border-sm, #cbd5e1);
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.04);
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .ttt-board-grid {
      background: #090e1a;
      border-color: #1e293b;
      box-shadow: inset 0 2px 14px rgba(0,0,0,0.6);
    }

    .ttt-cell {
      width: 94px !important;
      height: 94px !important;
      min-width: 94px !important;
      min-height: 94px !important;
      max-width: 94px !important;
      max-height: 94px !important;
      aspect-ratio: 1 / 1 !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
      border-radius: 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 52px;
      font-weight: 900;
      line-height: 1;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      background: var(--bg-card, #ffffff);
      border: 2px solid var(--border-sm, #e2e8f0);
      box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    }

    [data-theme="dark"] .ttt-cell {
      background: #151d2e;
      border-color: #243247;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .ttt-cell.empty:hover {
      background: #e0e7ff;
      border-color: #6366f1;
      transform: scale(1.04);
      box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25);
    }

    [data-theme="dark"] .ttt-cell.empty:hover {
      background: #1e2a42;
      border-color: #818cf8;
      box-shadow: 0 0 16px rgba(129, 140, 248, 0.35);
    }

    .ttt-cell.win-cell {
      background: #d1fae5 !important;
      border-color: #10b981 !important;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
      animation: tttWinGlow 1s infinite alternate;
    }

    [data-theme="dark"] .ttt-cell.win-cell {
      background: rgba(16, 185, 129, 0.25) !important;
      border-color: #34d399 !important;
      box-shadow: 0 0 25px rgba(52, 211, 153, 0.6) !important;
    }

    @keyframes tttWinGlow {
      from { transform: scale(1); }
      to { transform: scale(1.05); }
    }

    .ttt-x {
      color: #4f46e5;
      filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.3));
    }

    [data-theme="dark"] .ttt-x {
      color: #818cf8;
      text-shadow: 0 0 16px rgba(129, 140, 248, 0.85);
    }

    .ttt-o {
      color: #ea580c;
      filter: drop-shadow(0 2px 4px rgba(234, 88, 12, 0.3));
    }

    [data-theme="dark"] .ttt-o {
      color: #fbbf24;
      text-shadow: 0 0 16px rgba(251, 191, 36, 0.85);
    }

    /* =========================================================================
       CONNECT FOUR BOARD (AUTHENTIC TABLETOP DISK RACK)
       ========================================================================= */
    .c4-board-rack {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      margin: 0 auto;
      user-select: none;
    }

    /* Top Drop Arrow Column Buttons */
    .c4-drop-arrows-row {
      display: grid !important;
      grid-template-columns: repeat(7, 48px) !important;
      gap: 8px !important;
      width: fit-content !important;
      margin-bottom: 8px !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .c4-drop-col-btn {
      width: 48px !important;
      height: 36px !important;
      min-width: 48px !important;
      min-height: 36px !important;
      border-radius: 10px;
      border: 1px solid #c7d2fe;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 5px rgba(0,0,0,0.06);
    }

    .c4-drop-col-btn:hover {
      background: #4f46e5;
      color: #ffffff;
      transform: translateY(3px);
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
    }

    [data-theme="dark"] .c4-drop-col-btn {
      background: #1e293b;
      border-color: #3b82f6;
      color: #60a5fa;
    }

    [data-theme="dark"] .c4-drop-col-btn:hover {
      background: #2563eb;
      color: #ffffff;
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
    }

    /* The Main Blue Game Rack */
    .c4-grid-slots {
      display: grid !important;
      grid-template-columns: repeat(7, 48px) !important;
      grid-template-rows: repeat(6, 48px) !important;
      gap: 8px !important;
      width: fit-content !important;
      height: fit-content !important;
      min-width: 400px !important;
      min-height: 344px !important;
      max-width: 400px !important;
      max-height: 344px !important;
      place-items: center !important;
      align-content: center !important;
      justify-content: center !important;
      padding: 14px !important;
      border-radius: 22px !important;
      box-sizing: border-box !important;
      background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%) !important;
      border: 3px solid #1e40af !important;
      box-shadow: 0 16px 36px rgba(37, 99, 235, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3) !important;
      position: relative;
      z-index: 2;
    }

    [data-theme="dark"] .c4-grid-slots {
      background: linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 60%, #172554 100%) !important;
      border: 3px solid #3b82f6 !important;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2) !important;
    }

    /* Tabletop Stand Feet */
    .c4-rack-stand {
      display: flex;
      justify-content: space-between;
      width: 410px;
      height: 14px;
      margin-top: -2px;
      position: relative;
      z-index: 1;
    }

    .c4-stand-leg {
      width: 46px;
      height: 14px;
      background: #1e3a8a;
      border-radius: 0 0 8px 8px;
    }

    [data-theme="dark"] .c4-stand-leg {
      background: #0f172a;
      border: 1px solid #1e3a8a;
    }

    /* Slot Circular Container */
    .c4-slot {
      width: 48px !important;
      height: 48px !important;
      min-width: 48px !important;
      min-height: 48px !important;
      max-width: 48px !important;
      max-height: 48px !important;
      aspect-ratio: 1 / 1 !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer;
      position: relative;
      background: #090e1a !important;
      box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8) !important;
      transition: transform 0.15s ease;
    }

    .c4-slot:hover {
      transform: scale(1.04);
    }

    /* Empty Hole Inset */
    .c4-hole {
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      min-height: 42px !important;
      max-width: 42px !important;
      max-height: 42px !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
      flex-shrink: 0 !important;
      background: #0b1329 !important;
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.9) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    /* Checkers Discs */
    .c4-disc {
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      min-height: 44px !important;
      max-width: 44px !important;
      max-height: 44px !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
      flex-shrink: 0 !important;
      box-sizing: border-box !important;
      animation: dropDiscAnim 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      position: relative;
    }

    @keyframes dropDiscAnim {
      0% { transform: translateY(-160px); opacity: 0; }
      80% { transform: translateY(6px); opacity: 1; }
      100% { transform: translateY(0); opacity: 1; }
    }

    /* Red Disc */
    .c4-disc.red {
      background: radial-gradient(circle at 35% 35%, #f87171 0%, #ef4444 35%, #dc2626 70%, #991b1b 100%) !important;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.4) !important;
      border: 3px double rgba(255,255,255,0.3) !important;
    }

    /* Yellow Disc */
    .c4-disc.yellow {
      background: radial-gradient(circle at 35% 35%, #fef08a 0%, #facc15 35%, #eab308 70%, #a16207 100%) !important;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -3px 5px rgba(0,0,0,0.5), 0 3px 6px rgba(0,0,0,0.3) !important;
      border: 3px double rgba(0,0,0,0.2) !important;
    }

    /* Winning Disc Aura */
    .c4-slot.win-disc .c4-disc {
      box-shadow: 0 0 16px #ffffff, 0 0 28px #fbbf24 !important;
      animation: c4WinDiscPulse 0.9s infinite alternate !important;
    }

    @keyframes c4WinDiscPulse {
      from { transform: scale(1); filter: brightness(1); }
      to { transform: scale(1.1); filter: brightness(1.2); }
    }

    /* =========================================================================
       CHESS DUEL BOARD (AUTHENTIC TOURNAMENT 8x8)
       ========================================================================= */
    .chess-arena-layout {
      display: flex;
      gap: 18px;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: center;
    }

    .chess-board-grid {
      display: grid !important;
      grid-template-columns: repeat(8, 48px) !important;
      grid-template-rows: repeat(8, 48px) !important;
      width: 384px !important;
      height: 384px !important;
      min-width: 384px !important;
      min-height: 384px !important;
      border: 4px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 30px rgba(0,0,0,0.25);
      box-sizing: border-box !important;
    }

    @media (max-width: 520px) {
      .chess-board-grid {
        grid-template-columns: repeat(8, 40px) !important;
        grid-template-rows: repeat(8, 40px) !important;
        width: 320px !important;
        height: 320px !important;
        min-width: 320px !important;
        min-height: 320px !important;
      }
    }

    .chess-sq {
      width: 100% !important;
      height: 100% !important;
      aspect-ratio: 1 / 1 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      position: relative;
      box-sizing: border-box !important;
    }

    .chess-sq.light {
      background: #f0d9b5;
    }

    .chess-sq.dark {
      background: #b58863;
    }

    [data-theme="dark"] .chess-sq.light {
      background: #cbd5e1;
    }

    [data-theme="dark"] .chess-sq.dark {
      background: #475569;
    }

    .chess-sq.selected {
      background: #38bdf8 !important;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
    }

    .chess-sq.legal-dot::after {
      content: '';
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.75);
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
      position: absolute;
    }

    .chess-piece {
      font-size: 34px;
      line-height: 1;
      user-select: none;
      transition: transform 0.1s ease;
    }

    .chess-piece:hover {
      transform: scale(1.12);
    }

    .chess-piece.white-piece {
      color: #ffffff;
      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.8));
    }

    .chess-piece.black-piece {
      color: #0f172a;
      filter: drop-shadow(0 1px 2px rgba(255,255,255,0.4));
    }

    .chess-sidebar-notation {
      width: 160px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 10px;
      padding: 10px;
      height: 384px;
      display: flex;
      flex-direction: column;
    }

    [data-theme="dark"] .chess-sidebar-notation {
      background: #182234;
      border-color: #2b3952;
    }

    .notation-head {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    .notation-feed {
      flex: 1;
      overflow-y: auto;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-content: flex-start;
    }


    /* =========================================================================
       LUDO MULTIPLAYER DUEL BOARD (15x15 AUTHENTIC CROSS)
       ========================================================================= */
    .ludo-arena-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      width: 100%;
    }

    .ludo-board-grid {
      display: grid !important;
      grid-template-columns: repeat(15, 26px) !important;
      grid-template-rows: repeat(15, 26px) !important;
      width: 390px !important;
      height: 390px !important;
      border: 3px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0,0,0,0.28);
      background: #ffffff;
      user-select: none;
      box-sizing: border-box !important;
      position: relative;
    }

    @media (max-width: 480px) {
      .ludo-board-grid {
        grid-template-columns: repeat(15, 21px) !important;
        grid-template-rows: repeat(15, 21px) !important;
        width: 315px !important;
        height: 315px !important;
      }
    }

    /* Yards */
    .ludo-yard {
      padding: 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ludo-yard.red-yard {
      grid-column: 1 / 7;
      grid-row: 1 / 7;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .ludo-yard.green-yard {
      grid-column: 10 / 16;
      grid-row: 1 / 7;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .ludo-yard.blue-yard {
      grid-column: 1 / 7;
      grid-row: 10 / 16;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .ludo-yard.yellow-yard {
      grid-column: 10 / 16;
      grid-row: 10 / 16;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    .ludo-yard.yard-active-turn {
      outline: 3px solid #38bdf8;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.6);
      transform: scale(1.02);
      z-index: 2;
    }

    .yard-player-lbl {
      display: block;
      font-size: 8.5px;
      color: #64748b;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
    }

    .yard-box {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.15);
      padding: 6px;
      box-sizing: border-box;
    }

    .yard-box.decorative {
      opacity: 0.65;
    }

    .yard-title {
      font-size: 10.5px;
      font-weight: 800;
      color: #334155;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .yard-slots {
      display: grid !important;
      grid-template-columns: repeat(2, 28px);
      grid-template-rows: repeat(2, 28px);
      gap: 6px;
      align-items: center;
      justify-content: center;
    }

    .yard-token-slot {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f1f5f9;
      border: 1.5px dashed #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .slot-empty {
      font-size: 10px;
      color: #94a3b8;
      font-weight: 700;
    }

    /* Center Home Victory Area */
    .ludo-center-home {
      grid-column: 7 / 10;
      grid-row: 7 / 10;
      position: relative;
      background: #1e293b;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .home-triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .home-triangle.red-tri {
      top: 0; left: 0; bottom: 0;
      border-width: 39px 0 39px 39px;
      border-color: transparent transparent transparent #ef4444;
    }

    .home-triangle.green-tri {
      top: 0; left: 0; right: 0;
      border-width: 39px 39px 0 39px;
      border-color: #10b981 transparent transparent transparent;
    }

    .home-triangle.yellow-tri {
      top: 0; right: 0; bottom: 0;
      border-width: 39px 39px 39px 0;
      border-color: transparent #f59e0b transparent transparent;
    }

    .home-triangle.blue-tri {
      bottom: 0; left: 0; right: 0;
      border-width: 0 39px 39px 39px;
      border-color: transparent transparent #3b82f6 transparent;
    }

    .home-center-core {
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .home-crown {
      font-size: 18px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }

    .home-finished-tokens {
      display: flex;
      gap: 3px;
      margin-top: 2px;
    }

    .tok-finished {
      font-size: 9px;
      font-weight: 800;
      padding: 1px 3px;
      border-radius: 4px;
      background: rgba(0,0,0,0.6);
      color: #fff;
    }

    /* Pathway Cells */
    .ludo-cell {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.5px solid #cbd5e1;
      background: #ffffff;
      box-sizing: border-box;
      font-size: 11px;
    }

    [data-theme="dark"] .ludo-cell {
      background: #1e293b;
      border-color: #334155;
    }

    .cell-red-start {
      background: #fee2e2 !important;
      border: 1.5px solid #ef4444 !important;
    }

    .cell-green-start {
      background: #d1fae5 !important;
      border: 1.5px solid #10b981 !important;
    }

    .cell-red-stretch {
      background: #ef4444 !important;
      color: #ffffff !important;
    }

    .cell-green-stretch {
      background: #10b981 !important;
      color: #ffffff !important;
    }

    .cell-safe-star {
      background: #fef3c7 !important;
    }

    .cell-star-glyph {
      font-size: 11px;
      line-height: 1;
      position: absolute;
      opacity: 0.85;
      pointer-events: none;
    }

    .cell-arrow-glyph {
      font-size: 10px;
      font-weight: 800;
      color: inherit;
      position: absolute;
      opacity: 0.7;
      pointer-events: none;
    }

    /* Tokens */
    .ludo-token {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 10px;
      color: #ffffff;
      cursor: default;
      transition: all 0.15s ease;
      z-index: 10;
      user-select: none;
    }

    .ludo-token.token-red {
      background: radial-gradient(circle at 35% 35%, #f87171, #b91c1c);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(185, 28, 28, 0.7);
    }

    .ludo-token.token-green {
      background: radial-gradient(circle at 35% 35%, #34d399, #047857);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(4, 120, 87, 0.7);
    }

    .ludo-token.token-yellow {
      background: radial-gradient(circle at 35% 35%, #fde047, #d97706);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(217, 119, 6, 0.7);
    }

    .ludo-token.token-blue {
      background: radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(29, 78, 216, 0.7);
    }

    .cell-yellow-start {
      background: #fef3c7 !important;
      border: 1.5px solid #f59e0b !important;
    }

    .cell-blue-start {
      background: #dbeafe !important;
      border: 1.5px solid #3b82f6 !important;
    }

    .cell-yellow-stretch {
      background: #f59e0b !important;
      color: #ffffff !important;
    }

    .cell-blue-stretch {
      background: #3b82f6 !important;
      color: #ffffff !important;
    }

    .tok-finished.yellow { background: #d97706; }
    .tok-finished.blue { background: #2563eb; }

    .progress-pill.yellow { border-left: 4px solid #f59e0b; }
    .progress-pill.blue { border-left: 4px solid #3b82f6; }

    .ludo-players-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }

    .player-tag.turn-active {
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.7);
      border-color: #38bdf8 !important;
    }

    .ludo-mode-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .ludo-mode-btn {
      flex: 1;
      min-width: 90px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #334155);
      background: var(--bg-card, #1e293b);
      color: var(--text-1, #e2e8f0);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }

    .ludo-mode-btn.active {
      background: #3b82f6;
      border-color: #60a5fa;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
    }

    .ludo-token.movable {
      cursor: pointer !important;
      animation: ludoTokPulse 0.9s infinite alternate !important;
      transform: scale(1.18);
      box-shadow: 0 0 10px #38bdf8, 0 0 18px #0284c7 !important;
    }

    .ludo-token.movable:hover {
      transform: scale(1.3) !important;
    }

    @keyframes ludoTokPulse {
      from { transform: scale(1.1); filter: brightness(1); }
      to { transform: scale(1.22); filter: brightness(1.25); }
    }

    /* ── Ludo Interactive 3D Dice Console ── */
    .ludo-interactive-console {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 12px 16px;
      box-sizing: border-box;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    [data-theme="dark"] .ludo-interactive-console {
      background: #151f32;
      border-color: #2b3952;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .ludo-dice-interactive-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .ludo-3d-dice {
      position: relative;
      width: 64px;
      height: 64px;
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%) !important;
      border-radius: 14px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 6px 0 #cbd5e1, 0 10px 20px rgba(0, 0, 0, 0.25), inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.08) !important;
      border: 3px solid #cbd5e1 !important;
      cursor: default;
      transition: transform 0.12s ease, opacity 0.12s ease;
      user-select: none;
      box-sizing: border-box !important;
      touch-action: manipulation;
    }

    [data-theme="dark"] .ludo-3d-dice {
      background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%) !important;
      box-shadow: 0 4px 0 #94a3b8, 0 8px 16px rgba(0, 0, 0, 0.45) !important;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer !important;
      animation: ludoDicePulse 1.8s ease-in-out infinite alternate !important;
    }

    @keyframes ludoDicePulse {
      0% { transform: scale(0.98); }
      100% { transform: scale(1.04); }
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-2px);
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(2px) scale(0.96);
    }

    .ludo-3d-dice.border-red {
      border-color: #ef4444 !important;
      box-shadow: 0 4px 0 #dc2626, 0 6px 14px rgba(239, 68, 68, 0.3) !important;
    }
    .ludo-3d-dice.border-green {
      border-color: #10b981 !important;
      box-shadow: 0 4px 0 #059669, 0 6px 14px rgba(16, 185, 129, 0.3) !important;
    }
    .ludo-3d-dice.border-yellow {
      border-color: #f59e0b !important;
      box-shadow: 0 4px 0 #d97706, 0 6px 14px rgba(245, 158, 11, 0.3) !important;
    }
    .ludo-3d-dice.border-blue {
      border-color: #3b82f6 !important;
      box-shadow: 0 4px 0 #2563eb, 0 6px 14px rgba(59, 130, 246, 0.3) !important;
    }

    .ludo-direct-number-box {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: 100% !important;
      user-select: none !important;
      pointer-events: none !important;
    }

    .ludo-direct-num {
      font-size: 38px !important;
      font-weight: 900 !important;
      line-height: 1 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif !important;
      color: #0f172a !important;
      letter-spacing: -1px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      pointer-events: none !important;
    }

    [data-theme="dark"] .ludo-direct-num {
      color: #0f172a !important;
    }

    .ludo-direct-number-box.num-6 .ludo-direct-num {
      color: #ef4444 !important;
      text-shadow: 0 1px 4px rgba(239, 68, 68, 0.35);
    }

    .ludo-3d-dice.rolling {
      animation: ludoDiceWobble 0.22s ease-in-out infinite alternate !important;
      pointer-events: none !important;
    }

    @keyframes ludoDiceWobble {
      0% { transform: rotate(-7deg) scale(0.96); }
      100% { transform: rotate(7deg) scale(1.04); }
    }

    .ludo-3d-dice.just-rolled {
      animation: ludoDicePop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }

    @keyframes ludoDicePop {
      0% { transform: scale(0.85); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }

    .ludo-dice-svg {
      display: block !important;
      width: 52px !important;
      height: 52px !important;
      pointer-events: none !important;
      user-select: none !important;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.08));
    }

    .ludo-dice-face {
      width: 48px !important;
      height: 48px !important;
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      grid-template-rows: repeat(3, 1fr) !important;
      gap: 3px !important;
      padding: 3px !important;
      box-sizing: border-box !important;
    }

    .ludo-pip {
      display: block !important;
      width: 10px !important;
      height: 10px !important;
      border-radius: 50% !important;
      margin: auto !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      line-height: 0 !important;
      font-size: 0 !important;
    }

    .ludo-pip.ludo-pip-empty {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      background: transparent !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: auto !important;
      width: 10px !important;
      height: 10px !important;
    }

    .ludo-pip.ludo-pip-filled {
      visibility: visible !important;
      opacity: 1 !important;
      background: radial-gradient(circle at 35% 35%, #334155, #0f172a) !important;
      box-shadow: inset 0 2px 3px rgba(0,0,0,0.85), 0 1px 1px rgba(255,255,255,0.9) !important;
    }

    .ludo-dice-face.face-1 .ludo-pip.ludo-pip-filled {
      background: radial-gradient(circle at 35% 35%, #ef4444, #b91c1c) !important;
      width: 16px !important;
      height: 16px !important;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.8), 0 0 8px rgba(239, 68, 68, 0.45) !important;
    }

    .ludo-dice-action-badge {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
    }

    .badge-click-roll {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      color: #ffffff !important;
      background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
      padding: 4px 11px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
      box-shadow: 0 3px 8px rgba(37, 99, 235, 0.35) !important;
      cursor: pointer !important;
      font-size: 10.5px !important;
      font-weight: 800 !important;
      animation: badgePulse 1.2s infinite alternate !important;
      transition: transform 0.15s ease, box-shadow 0.15s ease !important;
    }

    .badge-click-roll:hover {
      transform: translateY(-1px) scale(1.05) !important;
      box-shadow: 0 5px 12px rgba(37, 99, 235, 0.5) !important;
    }

    .badge-click-roll:active {
      transform: translateY(1px) scale(0.97) !important;
    }

    @keyframes badgePulse {
      from { transform: scale(0.98); opacity: 0.92; }
      to { transform: scale(1.03); opacity: 1; }
    }

    .badge-rolled-val {
      color: #047857 !important;
      background: rgba(16, 185, 129, 0.16) !important;
      padding: 4px 10px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(16, 185, 129, 0.35) !important;
      font-weight: 800 !important;
    }

    [data-theme="dark"] .badge-rolled-val {
      color: #34d399 !important;
      background: rgba(16, 185, 129, 0.2) !important;
    }

    .badge-last-roll {
      color: var(--text-2, #64748b) !important;
      background: var(--bg-card, #e2e8f0) !important;
      padding: 3px 8px !important;
      border-radius: 6px !important;
      border: 1px solid rgba(100, 116, 139, 0.25) !important;
    }

    .badge-waiting {
      color: var(--text-3, #94a3b8);
      font-size: 10px;
    }

    .ludo-console-status-pane {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .ludo-turn-indicator-bar {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .ludo-turn-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .ludo-turn-dot.red { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
    .ludo-turn-dot.green { background: #10b981; box-shadow: 0 0 6px #10b981; }
    .ludo-turn-dot.yellow { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
    .ludo-turn-dot.blue { background: #3b82f6; box-shadow: 0 0 6px #3b82f6; }

    .ludo-turn-player-tag {
      font-size: 12.5px;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .ludo-turn-player-tag {
      color: #f1f5f9;
    }

    .ludo-guidance-message {
      font-size: 12px;
      color: var(--text-2, #64748b);
      line-height: 1.4;
    }

    .ludo-guidance-message.highlight {
      color: #0284c7;
      font-weight: 700;
    }

    [data-theme="dark"] .ludo-guidance-message.highlight {
      color: #38bdf8;
    }

    .ludo-last-action-caption {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      background: var(--bg-card, #ffffff);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid var(--border-sm, #e2e8f0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .ludo-last-action-caption {
      background: #0f172a;
      border-color: #334155;
      color: #94a3b8;
    }

    /* ── Home Finished Celebratory Pawns & Badges ── */
    .yard-home-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 800;
      color: #b45309;
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 5px;
    }

    [data-theme="dark"] .yard-home-badge {
      color: #fde047;
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
    }

    .tok-home-champion {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 5px;
      border-radius: 10px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      border: 1.5px solid #fef08a;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.8), 0 2px 4px rgba(0,0,0,0.3);
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      animation: homePawnGlow 1.5s infinite alternate;
    }

    .home-tri-pawn {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: 800;
      padding: 1px 3px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.7);
      color: #fef08a;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.9);
      z-index: 6;
    }
    .home-triangle.red-tri .home-tri-pawn { left: 4px; top: 35%; }
    .home-triangle.green-tri .home-tri-pawn { top: 4px; left: 35%; }
    .home-triangle.yellow-tri .home-tri-pawn { right: 4px; top: 35%; }
    .home-triangle.blue-tri .home-tri-pawn { bottom: 4px; left: 35%; }

    .ludo-token.token-reached-home {
      background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%) !important;
      border: 2px solid #fef08a !important;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.9), 0 2px 4px rgba(0,0,0,0.4) !important;
      color: #ffffff !important;
      position: relative;
      animation: homePawnGlow 1.4s infinite alternate;
    }
    .home-crown-mini {
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8));
    }
    .yard-token-slot.slot-home {
      border-color: rgba(245, 158, 11, 0.7) !important;
      background: rgba(245, 158, 11, 0.1) !important;
    }

    @keyframes homePawnGlow {
      from { box-shadow: 0 0 6px #f59e0b; }
      to { box-shadow: 0 0 14px #fbbf24; transform: scale(1.05); }
    }

    [data-theme="dark"] .progress-pill.green {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.4);
      color: #86efac;
    }

    .chess-move-token {
      background: var(--bg-card, #ffffff);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }

    /* Game Over Banner in Modal */
    .arena-game-over-banner {
      margin-top: 14px;
      padding: 14px 18px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
      border: 1px solid #818cf8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .game-over-icon {
      font-size: 32px;
    }

    .game-over-text h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 800;
      color: #4f46e5;
    }

    [data-theme="dark"] .game-over-text h4 {
      color: #a5b4fc;
    }

    .game-over-text p {
      margin: 2px 0 0 0;
      font-size: 12.5px;
      color: var(--text-2, #475569);
    }

    .btn-arena-rematch {
      padding: 8px 16px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(99, 102, 241, 0.3);
    }

    /* General modal shared components */
    .bonding-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 16px;
    }

    .bonding-modal-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 18px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      max-height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      animation: modalFadeIn 0.2s ease-out;
    }

    [data-theme="dark"] .bonding-modal-card {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    .bonding-modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    [data-theme="dark"] .bonding-modal-header {
      border-color: #1f2937;
    }

    .bonding-modal-header h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }

    .bonding-modal-close {
      background: transparent;
      border: none;
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      color: var(--text-3, #94a3b8);
    }

    .bonding-modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bonding-modal-footer {
      padding: 14px 22px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    [data-theme="dark"] .bonding-modal-footer {
      border-color: #1f2937;
    }

    .bonding-form-label {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      display: block;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-form-label {
      color: #f1f5f9;
    }

    .bonding-input, .bonding-select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 9px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: inherit;
      font-size: 13px;
      outline: none;
    }

    [data-theme="dark"] .bonding-input, [data-theme="dark"] .bonding-select {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-btn-primary {
      padding: 9px 16px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 9px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .bonding-btn-secondary {
      padding: 9px 14px;
      background: transparent;
      border: 1px solid #cbd5e1;
      color: var(--text-2, #475569);
      border-radius: 9px;
      font-size: 13px;
      cursor: pointer;
    }

    .bonding-btn-danger {
      padding: 6px 12px;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .bonding-add-member-row {
      display: flex;
      gap: 10px;
    }

    .bonding-members-list {
      max-height: 200px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .bonding-member-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 8px;
      background: var(--bg-muted, #f8fafc);
    }

    [data-theme="dark"] .bonding-member-item {
      background: #1e293b;
    }

    .bonding-member-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-member-avatar {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-member-name {
      font-size: 13px;
      font-weight: 600;
    }

    .bonding-member-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      margin-left: 6px;
    }

    .you-badge {
      font-size: 11px;
      color: #6366f1;
      font-weight: 700;
    }

    .bonding-danger-zone {
      margin-top: 16px;
      padding: 14px;
      border: 1px dashed rgba(239, 68, 68, 0.4);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(239, 68, 68, 0.03);
    }

    .danger-zone-text strong {
      display: block;
      color: #ef4444;
      font-size: 13px;
    }

    .danger-zone-text span {
      font-size: 12px;
      color: var(--text-3, #64748b);
    }

    .bonding-user-pick-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 280px;
      overflow-y: auto;
    }

    .bonding-user-pick-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--bg-muted, #f8fafc);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    [data-theme="dark"] .bonding-user-pick-item {
      background: #1e293b;
    }

    .bonding-user-pick-item:hover {
      background: rgba(99, 102, 241, 0.1);
    }

    .bonding-user-pick-info {
      flex: 1;
      margin-left: 10px;
    }

    .user-pick-name {
      font-size: 13.5px;
      font-weight: 700;
      display: block;
    }

    .user-pick-role {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    .bonding-avatar-picker {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .avatar-opt {
      font-size: 22px;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .avatar-opt.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
      transform: scale(1.08);
    }

    .bonding-member-checkboxes {
      max-height: 180px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 10px;
      padding: 8px;
    }

    .bonding-check-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
    }

    .bonding-check-label:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-check-label:hover {
      background: #1e293b;
    }

    .bonding-emoji-popup {
      position: absolute;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 6px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.18);
      z-index: 10001;
    }

    [data-theme="dark"] .bonding-emoji-popup {
      background: #1c2638;
      border-color: #334361;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .emoji-opt-btn {
      font-size: 20px;
      padding: 6px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .emoji-opt-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .emoji-opt-btn:hover {
      background: #2a374f;
    }
    /* Dots & Boxes 4x4 Arena */
    .dots-board-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      max-width: 440px;
      margin: 0 auto;
    }
    .dots-scoreboard {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      width: 100%;
    }
    .dots-player-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(30, 41, 59, 0.7);
    }
    .dots-player-pill.active-turn {
      outline: 2px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }
    .dots-grid-container {
      position: relative;
      padding: 12px;
      background: rgba(15, 23, 42, 0.85);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.4);
    }
    .dots-board-9x9 {
      display: grid;
      grid-template-columns: repeat(4, 18px 46px) 18px;
      grid-template-rows: repeat(4, 18px 46px) 18px;
      align-items: center;
      justify-items: center;
      user-select: none;
    }
    .dot-node {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #f8fafc;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
      z-index: 5;
    }
    .dots-line {
      transition: all 0.15s ease;
      border-radius: 4px;
      z-index: 3;
    }
    .dots-line.h-line {
      width: 44px;
      height: 10px;
    }
    .dots-line.v-line {
      width: 10px;
      height: 44px;
    }
    .dots-line.empty {
      background: rgba(255, 255, 255, 0.08);
    }
    .dots-line.clickable {
      cursor: pointer;
    }
    .dots-line.clickable:hover {
      background: rgba(56, 189, 248, 0.7) !important;
      transform: scale(1.08);
      box-shadow: 0 0 8px #38bdf8;
    }
    .dots-line.drawn.c-red { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.6); }
    .dots-line.drawn.c-blue { background: #3b82f6; box-shadow: 0 0 8px rgba(59, 130, 246, 0.6); }
    .dots-line.drawn.c-green { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.6); }
    .dots-line.drawn.c-amber { background: #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.6); }

    .dots-box-cell {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
      border-radius: 6px;
      transition: all 0.2s ease;
      z-index: 1;
    }
    .dots-box-cell.closed.c-red { background: rgba(239, 68, 68, 0.25); color: #f87171; border: 1px dashed rgba(239, 68, 68, 0.4); }
    .dots-box-cell.closed.c-blue { background: rgba(59, 130, 246, 0.25); color: #60a5fa; border: 1px dashed rgba(59, 130, 246, 0.4); }
    .dots-box-cell.closed.c-green { background: rgba(16, 185, 129, 0.25); color: #34d399; border: 1px dashed rgba(16, 185, 129, 0.4); }
    .dots-box-cell.closed.c-amber { background: rgba(245, 158, 11, 0.25); color: #fbbf24; border: 1px dashed rgba(245, 158, 11, 0.4); }

    /* Chat Emoji Palette Popover */
    .chat-emoji-picker-popover {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 10px;
      width: 290px;
      max-height: 260px;
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
      border-radius: 14px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      z-index: 10005;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: popoverFadeIn 0.15s ease-out;
    }
    @keyframes popoverFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .emoji-picker-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.15);
      padding: 4px;
      gap: 2px;
    }
    .emoji-picker-tab {
      flex: 1;
      padding: 4px;
      font-size: 15px;
      background: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: background 0.12s;
    }
    .emoji-picker-tab:hover, .emoji-picker-tab.active {
      background: rgba(255, 255, 255, 0.12);
    }
    .emoji-picker-body {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 4px;
    }
    .emoji-picker-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      padding: 6px 2px;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: transform 0.1s, background 0.1s;
    }
    .emoji-picker-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: scale(1.2);
    }

    /* Single-Player Arcade Styles */
    .arcade-hero-banner {
      background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(236, 72, 153, 0.12) 100%);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
    }
    .arcade-game-card {
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
      border-radius: 14px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .arcade-game-card:hover {
      transform: translateY(-2px);
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
    .arcade-leaderboard-card {
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
      border-radius: 14px;
      overflow: hidden;
    }
    .arcade-modal-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
      max-width: 520px;
      width: 95%;
      margin: 30px auto;
      overflow: hidden;
      color: #f8fafc;
    }
    .arcade-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.8);
    }
    .arcade-modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    /* 2048 Board */
    .grid-2048 {
      display: grid;
      grid-template-columns: repeat(4, 70px);
      grid-template-rows: repeat(4, 70px);
      gap: 8px;
      background: #bbada0;
      padding: 8px;
      border-radius: 10px;
    }
    .cell-2048 {
      background: rgba(238, 228, 218, 0.35);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 800;
      color: #776e65;
      user-select: none;
      transition: all 0.1s ease;
    }
    .cell-2048.val-2 { background: #eee4da; color: #776e65; }
    .cell-2048.val-4 { background: #ede0c8; color: #776e65; }
    .cell-2048.val-8 { background: #f2b179; color: #f9f6f2; }
    .cell-2048.val-16 { background: #f59563; color: #f9f6f2; }
    .cell-2048.val-32 { background: #f67c5f; color: #f9f6f2; }
    .cell-2048.val-64 { background: #f65e3b; color: #f9f6f2; }
    .cell-2048.val-128 { background: #edcf72; color: #f9f6f2; font-size: 20px; box-shadow: 0 0 8px rgba(237, 207, 114, 0.5); }
    .cell-2048.val-256 { background: #edcc61; color: #f9f6f2; font-size: 20px; box-shadow: 0 0 10px rgba(237, 204, 97, 0.6); }
    .cell-2048.val-512 { background: #edc850; color: #f9f6f2; font-size: 20px; box-shadow: 0 0 12px rgba(237, 200, 80, 0.7); }
    .cell-2048.val-1024 { background: #edc53f; color: #f9f6f2; font-size: 16px; box-shadow: 0 0 14px rgba(237, 197, 63, 0.8); }
    .cell-2048.val-2048 { background: #edc22e; color: #f9f6f2; font-size: 16px; box-shadow: 0 0 18px rgba(237, 194, 46, 0.9); }

    /* Memory Match Grid */
    .memory-grid {
      display: grid;
      grid-template-columns: repeat(4, 68px);
      gap: 10px;
      user-select: none;
    }
    .memory-card {
      width: 68px;
      height: 68px;
      border-radius: 10px;
      background: #1e293b;
      border: 2px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .memory-card:hover:not(.flipped):not(.matched) {
      border-color: #38bdf8;
      transform: scale(1.04);
    }
    .memory-card.flipped {
      background: #334155;
      border-color: #38bdf8;
      transform: rotateY(180deg);
    }
    .memory-card.matched {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10b981;
      cursor: default;
    }

  `;

document.head.appendChild(style);
}
