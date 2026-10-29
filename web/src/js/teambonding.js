/**
 * CI360 TEAM CHAT & GROUP LOUNGES MODULE
 * Native direct 1-on-1 personal messaging and group lounges.
 * Features:
 * - Direct (personal) messaging with any colleague
 * - Group lounges creation & management
 * - Add and remove members from groups
 * - Delete group option
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

export async function initTeamBonding(container, options = {}) {
  const currentUser = options.currentUser || {};
  let channels = [];
  let activeChannel = null;
  let colleagues = [];
  let messages = [];
  let pollInterval = null;
  let isSending = false;

  // Render Shell Container
  container.innerHTML = `
    <div class="bonding-wrap" id="bonding-app-root">
      <!-- Top Header Bar -->
      <div class="bonding-nav-bar">
        <div class="bonding-nav-left">
          <div class="bonding-logo-badge">💬</div>
          <div>
            <h2 class="bonding-title">Team Chat & Lounges</h2>
            <p class="bonding-subtitle">Direct 1-on-1 Messages · Group Lounges · Stay Connected with Colleagues</p>
          </div>
        </div>
        <div class="bonding-nav-right">
          <button class="bonding-top-action-btn" id="btn-top-new-chat" title="Start a Personal Chat">
            <span>👤</span> <span>New Chat</span>
          </button>
          <button class="bonding-top-action-btn primary" id="btn-top-new-group" title="Create a Group Lounge">
            <span>👥</span> <span>+ New Group</span>
          </button>
        </div>
      </div>

      <!-- Main Chat Layout -->
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
    </div>

    <!-- Modals container -->
    <div id="bonding-modals-root"></div>
  `;

  // Inject Dedicated Theme-Adaptive Styles
  injectBondingStyles();

  // Load Data
  await loadInitialData();
  renderChatPanel();

  // Top header button shortcuts
  container.querySelector('#btn-top-new-chat')?.addEventListener('click', openNewDirectChatModal);
  container.querySelector('#btn-top-new-group')?.addEventListener('click', openCreateGroupModal);

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
      if (activeChannel) {
        await loadMessages(activeChannel._id, true);
        const refreshedChans = await apiGet('/bonding/channels').catch(() => []);
        if (refreshedChans && refreshedChans.length) {
          channels = refreshedChans;
          renderSidebarChannels();
        }
      }
    }, 3500);
  }

  /* =========================================================================
     SIDEBAR RENDERING
     ========================================================================= */
  function renderSidebarChannels() {
    const grpList = container.querySelector('#bonding-group-list');
    const dirList = container.querySelector('#bonding-direct-list');
    if (grpList) grpList.innerHTML = renderChannelItems('group');
    if (dirList) dirList.innerHTML = renderChannelItems('direct');
    bindSidebarEvents();
  }

  function renderChannelItems(type) {
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

  function bindSidebarEvents() {
    const items = container.querySelectorAll('.bonding-channel-item');
    items.forEach(el => {
      el.onclick = async () => {
        const cid = el.dataset.chanId;
        const target = channels.find(c => c._id === cid);
        if (target) {
          activeChannel = target;
          items.forEach(i => i.classList.remove('active'));
          el.classList.add('active');
          renderChatPanel();
          await loadMessages(activeChannel._id);
        }
      };
    });

    const btnCreateGrp = container.querySelector('#btn-create-group');
    if (btnCreateGrp) btnCreateGrp.onclick = openCreateGroupModal;

    const btnNewDirect = container.querySelector('#btn-new-direct-chat');
    if (btnNewDirect) btnNewDirect.onclick = openNewDirectChatModal;
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

    chatPanel.innerHTML = `
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <div class="bonding-chat-header-avatar">${isGroup ? (activeChannel.avatar || '👥') : '👤'}</div>
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
              <span>👥</span> <span>Members (${memberCount})</span>
            </button>
            <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group">
              <span>🗑️</span> <span>Delete Group</span>
            </button>
          ` : ''}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${renderMessageItems()}
      </div>

      <div class="bonding-chat-input-bar">
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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;

    bindChatHeaderEvents();
    bindInputBarEvents();
    bindMessageActions();
    scrollMessagesToBottom();
  }

  function renderMessageItems() {
    if (!messages || messages.length === 0) {
      return `
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or share an update with the team!</p>
        </div>
      `;
    }

    return messages.map(msg => {
      const myId = currentUser?._id || currentUser?.id;
      const isSelf = msg.sender && msg.sender.userId && myId && msg.sender.userId.toString() === myId.toString();

      if (msg.type === 'system') {
        return `
          <div class="bonding-msg-system">
            <span>ℹ️</span> <span>${escapeHtml(msg.content)}</span>
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

  function bindChatHeaderEvents() {
    // Manage Members
    const btnMembers = container.querySelector('#btn-manage-members');
    if (btnMembers) btnMembers.onclick = openManageMembersModal;

    // Delete Group
    const btnDelete = container.querySelector('#btn-delete-group');
    if (btnDelete) btnDelete.onclick = confirmDeleteGroup;
  }

  function bindInputBarEvents() {
    const input = container.querySelector('#bonding-message-input');
    const sendBtn = container.querySelector('#btn-send-message');
    const emojiBtn = container.querySelector('#btn-quick-emoji');

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    if (sendBtn) sendBtn.onclick = sendMessage;

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

      const chans = await apiGet('/bonding/channels').catch(() => []);
      if (chans && chans.length) {
        channels = chans;
        renderSidebarChannels();
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
     DELETE GROUP
     ========================================================================= */
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

  /* =========================================================================
     MEMBER MANAGEMENT (ADD & REMOVE)
     ========================================================================= */
  function openManageMembersModal() {
    if (!activeChannel || activeChannel.type === 'direct') return;

    const modalRoot = container.querySelector('#bonding-modals-root');
    const currentMembers = activeChannel.members || [];
    const memberUserIds = new Set(currentMembers.map(m => m.userId?.toString()));
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
                  const myId = currentUser?._id || currentUser?.id;
                  const isMe = myId && m.userId && m.userId.toString() === myId.toString();
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

            <!-- Delete Group Option in Modal -->
            <div class="bonding-danger-zone">
              <div class="danger-zone-text">
                <strong>Delete Group</strong>
                <span>Permanently delete this group lounge and remove all its messages.</span>
              </div>
              <button class="bonding-btn-danger" id="btn-modal-delete-group">
                Delete Group
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalRoot.querySelector('.bonding-modal-close').onclick = () => { modalRoot.innerHTML = ''; };

    // Delete group inside modal
    const modalDeleteBtn = modalRoot.querySelector('#btn-modal-delete-group');
    if (modalDeleteBtn) {
      modalDeleteBtn.onclick = () => {
        modalRoot.innerHTML = '';
        confirmDeleteGroup();
      };
    }

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
          await loadMessages(activeChannel._id);
          renderChatPanel();
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
          renderChatPanel();
        } catch (err) {
          flashToast(err.message || 'Failed to remove member', 'error');
          btn.disabled = false;
        }
      };
    });
  }

  /* =========================================================================
     NEW DIRECT CHAT & NEW GROUP MODALS
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
            <p class="bonding-hint-text">Choose any team member to start a 1-on-1 private conversation.</p>
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

  /* =========================================================================
     EMOJI PICKER POPUP
     ========================================================================= */
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
      padding: 16px 22px;
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
      font-size: 26px;
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
      color: #ffffff;
      flex-shrink: 0;
    }

    .bonding-title {
      font-size: 19px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0 0 2px 0;
    }

    [data-theme="dark"] .bonding-title {
      color: #f9fafb !important;
    }

    .bonding-subtitle {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    [data-theme="dark"] .bonding-subtitle {
      color: #9ca3af !important;
    }

    .bonding-nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bonding-top-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 9px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #334155);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-top-action-btn {
      background: var(--bg-hover, #1f2937);
      border-color: var(--border-strong, #374151);
      color: #e5e7eb;
    }

    .bonding-top-action-btn:hover {
      background: var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-top-action-btn:hover {
      background: #374151;
      border-color: #4b5563;
    }

    .bonding-top-action-btn.primary {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff !important;
      border: none;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
    }

    .bonding-top-action-btn.primary:hover {
      opacity: 0.94;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
    }

    /* Main Chat Layout */
    .bonding-chat-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      height: 720px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-layout {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
      box-shadow: 0 6px 24px rgba(0,0,0,0.4);
    }

    @media (max-width: 900px) {
      .bonding-chat-layout {
        grid-template-columns: 1fr;
        height: auto;
      }
      .bonding-sidebar {
        max-height: 280px;
        border-right: none !important;
        border-bottom: 1px solid var(--border-sm, #e2e8f0);
      }
      [data-theme="dark"] .bonding-sidebar {
        border-bottom-color: var(--border-subtle, #1f2937) !important;
      }
    }

    /* Sidebar */
    .bonding-sidebar {
      border-right: 1px solid var(--border-sm, #e2e8f0);
      background: #f8fafc;
      padding: 16px 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-sidebar {
      background: #0d131f;
      border-right-color: var(--border-subtle, #1f2937);
    }

    .bonding-search-box input {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      font-size: 13px;
      color: var(--text-1, #0f172a);
      outline: none;
      box-sizing: border-box;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-search-box input {
      background: #151d2a;
      border-color: #2a374f;
      color: #f9fafb;
    }

    .bonding-search-box input:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
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

    [data-theme="dark"] .bonding-section-title {
      color: #6b7280;
    }

    .bonding-mini-btn {
      background: transparent;
      border: none;
      color: #6366f1;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: background 0.15s ease;
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

    [data-theme="dark"] .bonding-channel-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.1);
    }

    [data-theme="dark"] .bonding-channel-item.active {
      background: rgba(99, 102, 241, 0.22);
    }

    .bonding-channel-avatar {
      font-size: 17px;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-channel-avatar {
      background: #1f2937;
      border-color: #374151;
      color: #f9fafb;
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

    [data-theme="dark"] .bonding-channel-name {
      color: #f9fafb;
    }

    .bonding-channel-time {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-channel-time {
      color: #6b7280;
    }

    .bonding-channel-preview {
      font-size: 12px;
      color: var(--text-3, #64748b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    [data-theme="dark"] .bonding-channel-preview {
      color: #9ca3af;
    }

    .bonding-empty-channels, .bonding-loading-text {
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      padding: 10px 4px;
      line-height: 1.4;
    }

    /* Main Chat Panel */
    .bonding-chat-main {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--bg-card, #ffffff);
      transition: background 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-main {
      background: var(--bg-surface, #111827);
    }

    .bonding-chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-card, #ffffff);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-header {
      background: var(--bg-surface, #111827);
      border-bottom-color: var(--border-subtle, #1f2937);
    }

    .bonding-chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bonding-chat-header-avatar {
      font-size: 22px;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    [data-theme="dark"] .bonding-chat-header-avatar {
      background: rgba(99, 102, 241, 0.2);
      color: #f9fafb;
    }

    .bonding-chat-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-chat-title {
      color: #f9fafb !important;
    }

    .bonding-chat-sub {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin-top: 2px;
    }

    [data-theme="dark"] .bonding-chat-sub {
      color: #9ca3af !important;
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
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-hover, #f8fafc);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2, #334155);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-header-btn {
      background: var(--bg-hover, #1f2937);
      border-color: var(--border-strong, #374151);
      color: #e5e7eb;
    }

    .bonding-header-btn:hover {
      background: var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-header-btn:hover {
      background: #374151;
    }

    .bonding-header-btn.danger {
      color: #dc2626;
      border-color: #fecaca;
      background: #fef2f2;
    }

    [data-theme="dark"] .bonding-header-btn.danger {
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
      background: rgba(220, 38, 38, 0.12);
    }

    .bonding-header-btn.danger:hover {
      background: #fee2e2;
    }

    [data-theme="dark"] .bonding-header-btn.danger:hover {
      background: rgba(220, 38, 38, 0.22);
    }

    /* Message Feed */
    .bonding-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: #f8fafc;
      transition: background 0.2s ease;
    }

    [data-theme="dark"] .bonding-messages-container {
      background: #090d16;
    }

    .bonding-empty-feed {
      text-align: center;
      margin: auto;
      max-width: 360px;
      padding: 20px;
    }

    .bonding-empty-icon {
      font-size: 42px;
      margin-bottom: 8px;
    }

    .bonding-empty-feed h4 {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0 0 6px 0;
    }

    [data-theme="dark"] .bonding-empty-feed h4 {
      color: #f9fafb !important;
    }

    .bonding-empty-feed p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0;
      line-height: 1.5;
    }

    [data-theme="dark"] .bonding-empty-feed p {
      color: #9ca3af !important;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(148, 163, 184, 0.15);
      color: var(--text-2, #475569);
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    [data-theme="dark"] .bonding-msg-system {
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
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
      font-size: 12.5px;
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

    [data-theme="dark"] .bonding-msg-meta {
      color: #6b7280;
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
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .bonding-msg-row.other .bonding-msg-bubble {
      background: #ffffff;
      color: var(--text-1, #0f172a);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-top-left-radius: 4px;
    }

    [data-theme="dark"] .bonding-msg-row.other .bonding-msg-bubble {
      background: #161f30;
      border-color: #25334c;
      color: #f9fafb;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }

    .bonding-msg-row.self .bonding-msg-bubble {
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
      color: #ffffff;
      border-top-right-radius: 4px;
    }

    /* Reactions Row */
    .bonding-reactions-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }

    .bonding-rxn-tag {
      background: #ffffff;
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 100px;
      padding: 2px 7px;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      cursor: pointer;
      color: var(--text-2, #475569);
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-rxn-tag {
      background: #1f2937;
      border-color: #374151;
      color: #d1d5db;
    }

    .bonding-rxn-tag.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
      color: #6366f1;
    }

    [data-theme="dark"] .bonding-rxn-tag.active {
      background: rgba(99, 102, 241, 0.22);
      color: #a5b4fc;
      border-color: #818cf8;
    }

    .bonding-add-rxn-btn {
      background: transparent;
      border: none;
      font-size: 12px;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .bonding-add-rxn-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .bonding-add-rxn-btn:hover {
      background: #1f2937;
      color: #f3f4f6;
    }

    /* Chat Input Bar */
    .bonding-chat-input-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-card, #ffffff);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-chat-input-bar {
      background: var(--bg-surface, #111827);
      border-top-color: var(--border-subtle, #1f2937);
    }

    .bonding-input-action-btn {
      background: var(--bg-hover, #f1f5f9);
      border: 1px solid var(--border-sm, #e2e8f0);
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

    [data-theme="dark"] .bonding-input-action-btn {
      background: #1f2937;
      border-color: #374151;
      color: #e5e7eb;
    }

    .bonding-input-action-btn:hover {
      background: var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #374151;
    }

    .bonding-input-field {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      outline: none;
      resize: none;
      font-family: inherit;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #182234;
      border-color: #2d3d5a;
      color: #f9fafb;
    }

    .bonding-input-field:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
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

    /* Modal Backdrop & Card */
    .bonding-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .bonding-modal-card {
      background: #ffffff;
      border-radius: 20px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 45px rgba(0,0,0,0.2);
      border: 1px solid var(--border-sm, #e2e8f0);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    [data-theme="dark"] .bonding-modal-card {
      background: #151d2a;
      border-color: #2a374f;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      color: #f9fafb;
    }

    .bonding-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-modal-header {
      border-bottom-color: #2a374f;
    }

    .bonding-modal-header h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0;
    }

    [data-theme="dark"] .bonding-modal-header h3 {
      color: #f9fafb;
    }

    .bonding-modal-close {
      background: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: var(--text-3, #94a3b8);
      line-height: 1;
    }

    [data-theme="dark"] .bonding-modal-close {
      color: #9ca3af;
    }

    .bonding-modal-body {
      padding: 20px 22px;
    }

    .bonding-form-section {
      margin-bottom: 16px;
    }

    .bonding-form-label {
      display: block;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-2, #334155);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    [data-theme="dark"] .bonding-form-label {
      color: #9ca3af;
    }

    .bonding-input, .bonding-select {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      font-size: 13.5px;
      color: var(--text-1, #0f172a);
      box-sizing: border-box;
      outline: none;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-input,
    [data-theme="dark"] .bonding-select {
      background: #1c2638;
      border-color: #334361;
      color: #f9fafb;
    }

    .bonding-input:focus, .bonding-select:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
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
      background: #f8fafc;
      border: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .bonding-member-item {
      background: #1a2436;
      border-color: #283852;
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

    [data-theme="dark"] .bonding-member-name {
      color: #f9fafb;
    }

    .you-badge {
      font-size: 10px;
      background: #dbeafe;
      color: #1e40af;
      padding: 1px 5px;
      border-radius: 4px;
      margin-left: 4px;
    }

    [data-theme="dark"] .you-badge {
      background: rgba(59, 130, 246, 0.2);
      color: #93c5fd;
    }

    .bonding-member-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      display: block;
    }

    [data-theme="dark"] .bonding-member-role {
      color: #9ca3af;
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
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-btn-danger {
      background: rgba(220, 38, 38, 0.14);
      border-color: rgba(239, 68, 68, 0.3);
      color: #f87171;
    }

    .bonding-btn-danger:hover {
      background: #fee2e2;
    }

    [data-theme="dark"] .bonding-btn-danger:hover {
      background: rgba(220, 38, 38, 0.25);
    }

    .bonding-danger-zone {
      margin-top: 22px;
      padding: 14px;
      border-radius: 12px;
      border: 1px dashed rgba(239, 68, 68, 0.4);
      background: rgba(239, 68, 68, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .danger-zone-text strong {
      display: block;
      font-size: 13px;
      color: #dc2626;
      margin-bottom: 2px;
    }

    [data-theme="dark"] .danger-zone-text strong {
      color: #f87171;
    }

    .danger-zone-text span {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    [data-theme="dark"] .danger-zone-text span {
      color: #9ca3af;
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
      white-space: nowrap;
    }

    .bonding-btn-primary:hover {
      opacity: 0.95;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .bonding-btn-secondary {
      padding: 9px 16px;
      border-radius: 9px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: #ffffff;
      color: var(--text-2, #334155);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-btn-secondary {
      background: #1f2937;
      border-color: #374151;
      color: #e5e7eb;
    }

    .bonding-btn-secondary:hover {
      background: var(--bg-hover, #f1f5f9);
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

    [data-theme="dark"] .bonding-hint-text {
      color: #9ca3af;
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
      background: #f8fafc;
      border: 1px solid var(--border-sm, #e2e8f0);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-user-pick-item {
      background: #1a2436;
      border-color: #283852;
    }

    .bonding-user-pick-item:hover {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.05);
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

    [data-theme="dark"] .user-pick-name {
      color: #f9fafb;
    }

    .user-pick-role {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      display: block;
    }

    [data-theme="dark"] .user-pick-role {
      color: #9ca3af;
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
      border: 1px solid var(--border-sm, #e2e8f0);
      cursor: pointer;
      background: #ffffff;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .avatar-opt {
      background: #1f2937;
      border-color: #374151;
      color: #f9fafb;
    }

    .avatar-opt.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.12);
    }

    .bonding-member-checkboxes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--border-sm, #e2e8f0);
      padding: 10px;
      border-radius: 10px;
    }

    [data-theme="dark"] .bonding-member-checkboxes {
      border-color: #283852;
      background: #1a2436;
    }

    .bonding-check-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: var(--text-2, #334155);
      cursor: pointer;
    }

    [data-theme="dark"] .bonding-check-label {
      color: #e5e7eb;
    }

    .bonding-emoji-popup {
      position: absolute;
      background: #ffffff;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 12px;
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
