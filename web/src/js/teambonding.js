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

  tabChat?.addEventListener('click', () => {
    currentView = 'chat';
    tabChat.classList.add('active');
    tabLounge.classList.remove('active');
    chatWrap.style.display = 'grid';
    loungeWrap.style.display = 'none';
    renderChatPanel();
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

      if (!activeChannel && channels.length > 0) {
        activeChannel = channels.find(c => c.name.includes('Lounge')) || channels[0];
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
      try {
        if (!document.body.contains(container)) {
          clearInterval(pollInterval);
          return;
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
        <textarea
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or challenge to a game... (Press Enter to send)"
          rows="1"
        ></textarea>
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
        if (cd.status === 'declined' || cd.status === 'cancelled') {
          // After challenge is declined or cancelled, it goes away completely
          return '';
        }
        const gTitle = cd.gameTitle || 'Game Challenge';
        const gType = cd.gameType || 'chess';
        const gIcon = gType === 'chess' ? '♟️' : (gType === 'ludo' ? '🎲' : '❌');
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
              : `
                        <button class="game-btn-play btn-launch-match-from-card" data-invite-id="${inviteId}">
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
      emojiBtn.onclick = () => {
        if (!input) return;
        const emojis = ['👍', '🎉', '🔥', '💪', '🚀', '❤️', '😂', '👏', '✨'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        input.value += (input.value ? ' ' : '') + randomEmoji;
        input.focus();
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
        const inviteId = btn.dataset.inviteId;
        try {
          btn.disabled = true;
          const inv = await apiGet(`/bonding/invitations`);
          const found = (inv.incoming || []).concat(inv.sent || []).find(i => i._id === inviteId);
          if (found && found.matchId) {
            openGameMatchModal(found.matchId);
          } else {
            flashToast('Match has not started yet or has expired', 'warning');
          }
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

      const myStats = overview.myStats || {};
      const availableGames = overview.availableGames || [];
      const incoming = overview.incomingChallenges || [];
      const sent = overview.sentChallenges || [];
      const activeMatches = overview.activeMatches || [];
      const recentMatches = overview.recentMatches || [];

      const myId = currentUser?._id || currentUser?.id;

      loungeWrap.innerHTML = `
        <div class="lounge-container">
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
                      ${g.id === 'ludo'
          ? '<span class="meta-pill">👥 2P, 3P, 4P Royale</span><span class="meta-pill">🎯 4 Pawns / Base</span>'
          : '<span class="meta-pill">👥 2 Players</span>'
        }
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${g.id}" data-game-title="${escapeHtml(g.name)}">
                    ${g.id === 'ludo' ? '⚔️ Play Ludo (2P, 3P, 4P)' : '⚔️ Challenge Employee'}
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
            const isP1 = myId && m.player1.userId.toString() === myId.toString();
            const opp = isP1 ? m.player2 : m.player1;
            const myTurn = myId && m.currentTurnUserId && m.currentTurnUserId.toString() === myId.toString();

            return `
                        <div class="lounge-active-match-card ${myTurn ? 'turn-active' : ''}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${m.gameType === 'chess' ? '♟️' : (m.gameType === 'ludo' ? '🎲' : '❌')}</span>
                            <div>
                              <div class="match-game-title">${escapeHtml(m.gameTitle)}</div>
                              <div class="match-opp-text">Opponent: <strong>${escapeHtml(opp.name)}</strong> (${escapeHtml(opp.role)})</div>
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

    let selectedGame = preselectedGame || 'chess';
    let selectedTargetUserId = preselectedUser ? preselectedUser.toString() : null;
    let selectedLudoPlayerCount = 2; // Default to 2P Duel
    let selectedLudoTargetUserIds = selectedTargetUserId ? [selectedTargetUserId] : [];
    let selectedTimerMode = 'none';

    function renderModalContent() {
      const targetUserObj = eligibleEmployees.find(e => e._id.toString() === selectedTargetUserId);
      const isLudo = selectedGame === 'ludo';
      const neededLudoOpponents = selectedLudoPlayerCount - 1;
      const hasEnoughLudoOpponents = selectedLudoTargetUserIds.length === neededLudoOpponents;

      modalRoot.innerHTML = `
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${isLudo ? 'Play Ludo (2P, 3P, 4P)' : 'Multiplayer Game Challenge'}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${selectedGame === 'chess' ? 'active' : ''}" data-game="chess">
                    <span>♟️</span> <span>Chess Duel</span>
                  </button>
                  <button class="game-pill-btn ${selectedGame === 'tictactoe' ? 'active' : ''}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                  <button class="game-pill-btn ${selectedGame === 'ludo' ? 'active' : ''}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                </div>
              </div>

              <!-- LUDO SPECIAL: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${isLudo ? `
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${selectedLudoPlayerCount === 2 ? 'active' : ''}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${selectedLudoPlayerCount === 3 ? 'active' : ''}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${selectedLudoPlayerCount === 4 ? 'active' : ''}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${isLudo
          ? `Step 3 — Select Colleagues to Play With (${selectedLudoTargetUserIds.length}/${neededLudoOpponents} Selected) *`
          : 'Step 2 — Select Employee to Challenge *'
        }
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${eligibleEmployees.map(u => {
          const isSelected = isLudo
            ? selectedLudoTargetUserIds.includes(u._id.toString())
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

              <!-- Step for Chess timers -->
              ${selectedGame === 'chess' ? `
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 3 — Time Control Options</div>
                  <div class="timer-opts-row">
                    <label class="timer-radio-lbl ${selectedTimerMode === 'none' ? 'active' : ''}">
                      <input type="radio" name="timerMode" value="none" ${selectedTimerMode === 'none' ? 'checked' : ''} />
                      <span>Untimed Match (Casual Turn-Based)</span>
                    </label>
                    <label class="timer-radio-lbl ${selectedTimerMode === '3m' ? 'active' : ''}">
                      <input type="radio" name="timerMode" value="3m" ${selectedTimerMode === '3m' ? 'checked' : ''} />
                      <span>⚡ 3-Minute Blitz</span>
                    </label>
                    <label class="timer-radio-lbl ${selectedTimerMode === '5m' ? 'active' : ''}">
                      <input type="radio" name="timerMode" value="5m" ${selectedTimerMode === '5m' ? 'checked' : ''} />
                      <span>⏱️ 5-Minute Rapid</span>
                    </label>
                  </div>
                </div>
              ` : ''}

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${isLudo ? `🎲 Ludo (${selectedLudoPlayerCount} Players · 4 Pawns per base)` : (selectedGame === 'chess' ? '♟️ Chess Duel' : '❌ Tic-Tac-Toe Challenge')}</div>
                  ${isLudo ? `
                    <div><strong>Opponents:</strong> ${selectedLudoTargetUserIds.length > 0
            ? selectedLudoTargetUserIds.map(id => {
              const found = eligibleEmployees.find(e => e._id.toString() === id);
              return found ? `<strong>${escapeHtml(found.name)}</strong>` : 'Colleague';
            }).join(', ')
            : '<span style="color:#ef4444">⚠️ Please select ' + neededLudoOpponents + ' colleague(s)</span>'
          }</div>
                  ` : `
                    <div><strong>Opponent:</strong> ${targetUserObj ? `<strong>${escapeHtml(targetUserObj.name)}</strong> (${escapeHtml(targetUserObj.role)})` : '<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                  ${selectedGame === 'chess' ? `<div><strong>Time Control:</strong> ${selectedTimerMode === 'none' ? 'Untimed' : selectedTimerMode}</div>` : ''}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(isLudo ? !hasEnoughLudoOpponents : !selectedTargetUserId) ? 'disabled' : ''}>
                ${isLudo ? `Start ${selectedLudoPlayerCount}P Ludo Match 🎲` : 'Send Challenge 🚀'}
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

      // Ludo mode switch (2P, 3P, 4P)
      modalRoot.querySelectorAll('.ludo-mode-btn').forEach(btn => {
        btn.onclick = () => {
          selectedLudoPlayerCount = Number(btn.dataset.count);
          selectedLudoTargetUserIds = selectedLudoTargetUserIds.slice(0, selectedLudoPlayerCount - 1);
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
          if (selectedGame === 'ludo') {
            const maxOpponents = selectedLudoPlayerCount - 1;
            if (selectedLudoTargetUserIds.includes(uId)) {
              selectedLudoTargetUserIds = selectedLudoTargetUserIds.filter(id => id !== uId);
            } else {
              if (selectedLudoTargetUserIds.length < maxOpponents) {
                selectedLudoTargetUserIds.push(uId);
              } else {
                selectedLudoTargetUserIds[maxOpponents - 1] = uId;
              }
            }
          } else {
            selectedTargetUserId = uId;
          }
          renderModalContent();
        };
      });

      // Timer switch
      modalRoot.querySelectorAll('input[name="timerMode"]').forEach(r => {
        r.onchange = (e) => {
          selectedTimerMode = e.target.value;
          renderModalContent();
        };
      });

      // Submit challenge / launch match
      const submitBtn = modalRoot.querySelector('#btn-submit-challenge-flow');
      if (submitBtn) {
        submitBtn.onclick = async () => {
          if (selectedGame === 'ludo') {
            const needed = selectedLudoPlayerCount - 1;
            if (selectedLudoTargetUserIds.length < needed) {
              flashToast(`Please select ${needed} colleague(s) to play with`, 'warning');
              return;
            }

            try {
              submitBtn.disabled = true;
              submitBtn.textContent = 'Launching Match...';
              const res = await apiPost('/bonding/matches/instant-ludo', {
                playerCount: selectedLudoPlayerCount,
                targetUserIds: selectedLudoTargetUserIds
              });

              modalRoot.innerHTML = '';
              flashToast(`Ludo match started (${selectedLudoPlayerCount} Players)! 🎲`, 'success');
              if (res && res._id) {
                openGameMatchModal(res._id);
              }
            } catch (err) {
              flashToast(err.message || 'Failed to start Ludo match', 'error');
              submitBtn.disabled = false;
              submitBtn.textContent = `Start ${selectedLudoPlayerCount}P Ludo Match 🎲`;
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
              channelId: activeChannel?._id || null
            });

            flashToast('Game challenge delivered! Awaiting acceptance ⚔️', 'success');
            modalRoot.innerHTML = '';

            if (activeChannel) {
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

    async function fetchMatchState() {
      try {
        match = await apiGet(`/bonding/matches/${matchId}`);
        return match;
      } catch (err) {
        flashToast(err.message || 'Could not load match', 'error');
        closeMatchModal();
        return null;
      }
    }

    match = await fetchMatchState();
    if (!match) return;

    function closeMatchModal() {
      if (matchPollInterval) clearInterval(matchPollInterval);

      activeMatchModalId = null;
      modalRoot.innerHTML = '';
      if (currentView === 'lounge_games') renderLoungeGamesView(true);
      if (activeChannel) loadMessages(activeChannel._id, true);
    }

    // Start 1.5s active match polling for live updates
    matchPollInterval = setInterval(async () => {
      if (!activeMatchModalId || activeMatchModalId !== matchId) {
        clearInterval(matchPollInterval);
        return;
      }
      const prevTurn = match?.currentTurnUserId?.toString();
      const prevStatus = match?.status;
      const updated = await fetchMatchState();
      if (updated) {
        const newTurn = updated.currentTurnUserId?.toString();
        // If turn or status changed, re-render arena board
        if (newTurn !== prevTurn || updated.status !== prevStatus || updated.moves?.length !== match.moves?.length) {
          renderArena();

        }
      }
    }, 1500);

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
                <span class="arena-icon">${match.gameType === 'ludo' ? '🎲' : (match.gameType === 'chess' ? '♟️' : '❌')}</span>
                <div>
                  <h3 class="arena-title">${escapeHtml(match.gameTitle)}</h3>
                  ${match.gameType === 'ludo' && match.gameState?.players ? `
                    <div class="arena-players-vs ludo-players-wrap">
                      ${match.gameState.players.map(p => {
        const isMe = p.userId && p.userId.toString() === myId?.toString();
        const colorEmoji = { red: '🔴', green: '🟢', yellow: '🟡', blue: '🔵' }[p.color] || '⚪';
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
              : '🎲 Your turn! Click ROLL DICE to start your move.')
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
                  <button class="btn-arena-rematch" id="btn-arena-rematch-action">
                    🔄 Request Rematch
                  </button>
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

      function renderDicePips(val) {
        const v = Math.max(1, Math.min(6, Number(val) || 1));
        const pipMap = {
          1: [5],
          2: [1, 9],
          3: [1, 5, 9],
          4: [1, 3, 7, 9],
          5: [1, 3, 7, 9, 5],
          6: [1, 4, 7, 3, 6, 9]
        };
        const active = new Set(pipMap[v] || [5]);
        let dots = '';
        for (let i = 1; i <= 9; i++) {
          dots += `<span class="ludo-pip ${active.has(i) ? 'filled' : 'empty'}"></span>`;
        }
        return `<div class="ludo-dice-face face-${v}">${dots}</div>`;
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
                  <div class="yard-token-slot">
                    ${t.step === -1 ? `
                      <div class="ludo-token token-${col} ${isTokenMovable(col, t) ? 'movable' : ''}" data-token-id="${t.id}" data-color="${col}" title="${col.toUpperCase()} Pawn ${t.id + 1}">
                        <span>${t.id + 1}</span>
                      </div>
                    ` : `<span class="slot-empty">${idx + 1}</span>`}
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

      const displayDice = dice || state.lastRoll || 6;
      const canClickRoll = isMyCurrentTurn && !rolled && match.status === 'active';
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
              <div class="home-triangle red-tri"></div>
              <div class="home-triangle green-tri"></div>
              <div class="home-triangle yellow-tri"></div>
              <div class="home-triangle blue-tri"></div>
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

          <!-- Ludo Action & 3D Interactive Dice Console (Clickable dice replaces text button, opponent dice visible!) -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${canClickRoll ? 'clickable pulse-roll' : ''} ${rolled ? 'just-rolled' : ''} border-${currentTurnColor}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${canClickRoll ? '0' : '-1'}"
                title="${canClickRoll ? 'Click Dice to Roll!' : (isMyCurrentTurn ? 'Choose a pawn to move' : `${turnPlName}'s turn`)}"
              >
                ${renderDicePips(displayDice)}
              </div>
              <div class="ludo-dice-action-badge">
                ${canClickRoll
          ? `<span class="badge-click-roll">🎲 TAP TO ROLL</span>`
          : (rolled
            ? `<span class="badge-rolled-val">${turnColorEmoji} Rolled ${displayDice}</span>`
            : (state.lastRoll
              ? `<span class="badge-last-roll">${turnColorEmoji} Rolled ${state.lastRoll}</span>`
              : `<span class="badge-waiting">Ready</span>`))
        }
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${currentTurnColor}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${turnColorEmoji} ${turnPlName}</strong> (${currentTurnColor.toUpperCase()})
                </span>
                ${isMyCurrentTurn
          ? `<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>`
          : `<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`
        }
              </div>

              <div class="ludo-guidance-message ${isMyCurrentTurn && rolled ? 'highlight' : ''}">
                ${isMyCurrentTurn && !rolled && match.status === 'active'
          ? '👉 It is your turn! <strong>Click the dice</strong> to roll!'
          : (isMyCurrentTurn && rolled && match.status === 'active'
            ? (movableTokens.length > 0
              ? (movableTokens.length === 1
                ? `🎲 Rolled <strong>${displayDice}</strong>! Auto-advancing single pawn...`
                : `🎲 Rolled <strong>${displayDice}</strong>! Tap your <strong>glowing pawn</strong> to move!`)
              : `🎲 Rolled <strong>${displayDice}</strong>. No legal moves possible — turn passing...`)
            : (match.status === 'active'
              ? (rolled || state.lastRoll
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

      // Rematch button on game over
      const btnRematch = modalRoot.querySelector('#btn-arena-rematch-action');
      if (btnRematch) {
        btnRematch.onclick = async () => {
          try {
            btnRematch.disabled = true;
            btnRematch.textContent = 'Creating Rematch...';
            const res = await apiPost(`/bonding/matches/${matchId}/action`, { action: 'rematch' });
            if (res.match) {
              flashToast('Rematch created! New match live ⚔️', 'success');
              if (matchPollInterval) clearInterval(matchPollInterval);
              openGameMatchModal(res.match._id);
            }
          } catch (e) {
            flashToast(e.message || 'Rematch failed', 'error');
            btnRematch.disabled = false;
            btnRematch.textContent = '🔄 Request Rematch';
          }
        };
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
        const myColor = (match.player1.userId.toString() === myId?.toString())
          ? (match.player1.assignedRole || 'red')
          : (match.player2.userId.toString() === myId?.toString()
            ? (match.player2.assignedRole || 'green')
            : ((state.players || []).find(p => p.userId?.toString() === myId?.toString())?.color || 'red'));
        const isMyTurnNow = isMyTurn && currentTurnColor === myColor;

        // Click on the 3D dice to roll (instead of a text button)
        const diceBtn = modalRoot.querySelector('#btn-interactive-ludo-dice');
        if (diceBtn && isMyTurnNow && !rolled) {
          const triggerDiceRoll = async () => {
            if (diceBtn.dataset.rolling === 'true') return;
            diceBtn.dataset.rolling = 'true';
            diceBtn.classList.add('rolling');
            try {
              const updated = await apiPost(`/bonding/matches/${matchId}/move`, { action: 'roll' });
              match = updated;
              renderArena();
            } catch (err) {
              flashToast(err.message || 'Failed to roll', 'error');
              diceBtn.classList.remove('rolling');
              delete diceBtn.dataset.rolling;
            }
          };
          diceBtn.onclick = triggerDiceRoll;
          diceBtn.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerDiceRoll();
            }
          };
        }

        // Automatic pawn movement when only 1 pawn is movable
        if (isMyTurnNow && rolled) {
          const allTokens = state.tokens || {};
          const myTokensList = allTokens[myColor] || [];
          const diceVal = state.dice || state.lastRoll || 0;
          const movableList = myTokensList.filter(t => {
            if (t.step === -1 && diceVal === 6) return true;
            if (t.step >= 0 && t.step + diceVal <= 56) return true;
            return false;
          });

          if (movableList.length === 1 && !window.__ci360LudoAutoMoving) {
            window.__ci360LudoAutoMoving = true;
            const singleToken = movableList[0];
            setTimeout(async () => {
              try {
                const updated = await apiPost(`/bonding/matches/${matchId}/move`, { action: 'move', tokenId: Number(singleToken.id) });
                match = updated;
                window.__ci360LudoAutoMoving = false;
                renderArena();
              } catch (err) {
                window.__ci360LudoAutoMoving = false;
                flashToast(err.message || 'Auto-move failed', 'error');
              }
            }, 450);
          }
        }

        // Manual movable pawn click (when player has multiple choices)
        if (isMyTurnNow && rolled) {
          modalRoot.querySelectorAll('.ludo-token.movable').forEach(tokenEl => {
            tokenEl.onclick = async (e) => {
              e.stopPropagation();
              const tId = tokenEl.dataset.tokenId;
              try {
                tokenEl.style.opacity = '0.5';
                const updated = await apiPost(`/bonding/matches/${matchId}/move`, { action: 'move', tokenId: Number(tId) });
                match = updated;
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

    /* Input bar */
    .bonding-chat-input-bar {
      padding: 12px 18px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-card, #ffffff);
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
    }

    .bonding-input-action-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #1e293b;
    }

    .bonding-input-field {
      flex: 1;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13.5px;
      color: inherit;
      outline: none;
      resize: none;
      font-family: inherit;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-send-btn {
      padding: 10px 16px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
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
      gap: 6px;
      flex-shrink: 0;
    }

    .ludo-3d-dice {
      width: 58px;
      height: 58px;
      background: #ffffff;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25), inset 0 -3px 0 #cbd5e1;
      border: 2.5px solid #cbd5e1;
      cursor: default;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
      user-select: none;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer;
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-2px) scale(1.06);
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(1px) scale(0.96);
    }

    .ludo-3d-dice.pulse-roll {
      animation: diceGlowPulse 1.2s infinite alternate;
    }

    .ludo-3d-dice.border-red { border-color: #ef4444; }
    .ludo-3d-dice.border-green { border-color: #10b981; }
    .ludo-3d-dice.border-yellow { border-color: #f59e0b; }
    .ludo-3d-dice.border-blue { border-color: #3b82f6; }

    @keyframes diceGlowPulse {
      0% { box-shadow: 0 4px 12px rgba(0,0,0,0.25), 0 0 4px rgba(59, 130, 246, 0.4); }
      100% { box-shadow: 0 6px 20px rgba(0,0,0,0.35), 0 0 16px rgba(59, 130, 246, 0.85); transform: scale(1.04); }
    }

    .ludo-3d-dice.rolling {
      animation: diceRollingSpin 0.45s cubic-bezier(0.25, 1, 0.5, 1);
    }

    @keyframes diceRollingSpin {
      0% { transform: rotate(0deg) scale(0.9); }
      50% { transform: rotate(180deg) scale(1.15); }
      100% { transform: rotate(360deg) scale(1); }
    }

    .ludo-dice-face {
      width: 44px;
      height: 44px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 3px;
      padding: 3px;
      box-sizing: border-box;
    }

    .ludo-pip {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      margin: auto;
    }

    .ludo-pip.filled {
      background: #1e293b;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
    }

    .ludo-pip.empty {
      visibility: hidden;
    }

    .ludo-dice-face.face-1 .ludo-pip.filled {
      background: #dc2626;
      width: 14px;
      height: 14px;
    }

    .ludo-dice-action-badge {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
    }

    .badge-click-roll {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
      border: 1px solid rgba(59, 130, 246, 0.3);
      animation: badgePulse 1.2s infinite alternate;
    }

    @keyframes badgePulse {
      from { opacity: 0.85; }
      to { opacity: 1; transform: scale(1.03); }
    }

    .badge-rolled-val {
      color: #10b981;
      background: rgba(16, 185, 129, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .badge-last-roll {
      color: var(--text-2, #64748b);
      background: var(--bg-card, #e2e8f0);
      padding: 2px 7px;
      border-radius: 6px;
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
  `;

  document.head.appendChild(style);
}
