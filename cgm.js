(function () {
  'use strict';
  if (window.__cgm_injected) { console.warn('Chat Group Manager already injected.'); return; }
  window.__cgm_injected = true;

  /* ================= CONSTANTS ================= */
  const STORAGE_KEY = 'cgm_data_v2';
  const LEGACY_STORAGE_KEY = 'cgm_data_v1';
  const SIDEBAR_SELECTOR = '[data-sidebar="content"]';
  const ACCENT_PRESETS = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#64748b'];

  /* ================= ICONS ================= */
  const ICONS = {
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73Z"/><circle cx="12" cy="12" r="3"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    pin: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1Z"/>',
    pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    'folder-plus': '<path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'grip-vertical': '<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    'refresh-cw': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    'more-vertical': '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    'trash-2': '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
    'circle-dot': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
  };
  function icon(name, cls) {
    return `<svg class="cgm_icon ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
  }

  /* ================= DEFAULTS ================= */
  function defaultSettings() {
    return {
      scrollDelay: 2,
      sidebarPosition: 'right',
      accent: '#6366f1',
      accentTextMode: 'auto',
      accentTextColor: '#ffffff',
      sidebarOpen: true,
      closeOnOutsideClick: true,
      showChatIcons: true,
      fallbackAccountName: 'Default Account',
      accountMode: 'auto', // 'auto' | 'manual'
      hideAccountLabel: false,
      newChatHref: '/text/direct',
      dockedMode: false,
      hideSidebarHeaderFooter: false,
      hideSidebarFull: false,
      hideOriginalHeader: false
    };
  }
  function defaultAccountData() {
    return {
      chats: {},
      groups: [],
      order: { pinned: [], ungrouped: [], byGroup: {} },
      collapse: { pinned: false, ungrouped: true }
    };
  }
  function defaultRoot() {
    return { settings: defaultSettings(), accounts: {}, currentAccountKey: null };
  }

  /* ================= STORAGE ================= */
  function loadRoot() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const root = defaultRoot();
        root.settings = Object.assign(root.settings, parsed.settings || {});
        root.accounts = parsed.accounts || {};
        root.currentAccountKey = parsed.currentAccountKey || null;
        return root;
      }
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw);
        const root = defaultRoot();
        root.settings = Object.assign(root.settings, legacy.settings || {});
        const key = root.settings.fallbackAccountName || 'Default Account';
        root.accounts[key] = {
          chats: legacy.chats || {},
          groups: legacy.groups || [],
          order: legacy.order || { pinned: [], ungrouped: [], byGroup: {} },
          collapse: legacy.collapse || { pinned: false, ungrouped: true }
        };
        root.currentAccountKey = key;
        return root;
      }
    } catch (e) { console.error('CGM: failed to load data', e); }
    return defaultRoot();
  }
  function ensureAccount(key) {
    if (!ROOT.accounts[key]) ROOT.accounts[key] = defaultAccountData();
    return ROOT.accounts[key];
  }
  function saveData() {
    try {
      ROOT.settings = SETTINGS;
      ROOT.accounts[currentAccountKey] = ACC;
      ROOT.currentAccountKey = currentAccountKey;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ROOT));
    } catch (e) { console.error('CGM: failed to save data', e); }
  }

  /* ================= ACCOUNT DETECTION ================= */
  function detectAccountKey() {
    try {
      const el = document.querySelector('[data-sidebar="footer"] .font-heading');
      const raw = el ? (el.innerText || el.textContent || '').trim() : '';
      if (raw && raw.length > 0 && raw.length < 64) return raw;
    } catch (e) {}
    return null;
  }
  function resolveAccountKey() {
    return detectAccountKey() || SETTINGS.fallbackAccountName || 'Default Account';
  }
  function switchAccount(key, opts) {
    opts = opts || {};
    if (!key) return;
    if (opts.manual) SETTINGS.accountMode = 'manual';
    currentAccountKey = key;
    ACC = ensureAccount(key);
    saveData();
    renderAll();
  }
  function forceAutoDetect() {
    const key = resolveAccountKey();
    currentAccountKey = key;
    ACC = ensureAccount(key);
    saveData();
    quickInitialScan();
    renderAll();
  }
  function checkAccountChange() {
    if ((SETTINGS.accountMode || 'auto') !== 'auto') return;
    const key = resolveAccountKey();
    if (key !== currentAccountKey) {
      currentAccountKey = key;
      ACC = ensureAccount(key);
      saveData();
      quickInitialScan();
      renderAll();
    }
  }

  /* ================= STATE (INITIALIZED) ================= */
  let ROOT = loadRoot();
  let SETTINGS = ROOT.settings;
  let currentAccountKey = ROOT.currentAccountKey || resolveAccountKey();
  let ACC = ensureAccount(currentAccountKey);

  let searchTerm = '';
  let dragState = null;
  let pendingDrop = null;
  let rootEl, panelEl, toggleTabEl;
  let lastUrl = location.href;

  /* ================= HELPERS ================= */
  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function highlightHtml(name) {
    const esc = escapeHtml(name);
    if (!searchTerm) return esc;
    const idx = esc.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (idx === -1) return esc;
    return esc.slice(0, idx) + '<mark class="cgm_mark">' + esc.slice(idx, idx + searchTerm.length) + '</mark>' + esc.slice(idx + searchTerm.length);
  }
  function matchesSearch(chat) {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return chat.name.toLowerCase().includes(term) || (chat.id || '').toLowerCase().includes(term);
  }
  function extractId(url) {
    try {
      const u = new URL(url, location.href);
      const parts = u.pathname.split('/').filter(Boolean);
      return parts.length ? decodeURIComponent(parts[parts.length - 1]) : null;
    } catch (e) { return null; }
  }
  function genId(prefix) { return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function removeIdFromArray(arr, id) { const i = arr.indexOf(id); if (i > -1) arr.splice(i, 1); }
  function getHomeArray(groupId) {
    if (groupId) { if (!ACC.order.byGroup[groupId]) ACC.order.byGroup[groupId] = []; return ACC.order.byGroup[groupId]; }
    return ACC.order.ungrouped;
  }
  function insertAtDropTarget(arr, id, dropTarget) {
    removeIdFromArray(arr, id);
    if (!dropTarget || !dropTarget.targetId) { arr.push(id); return; }
    const idx = arr.indexOf(dropTarget.targetId);
    if (idx === -1) { arr.push(id); return; }
    arr.splice(dropTarget.before ? idx : idx + 1, 0, id);
  }
  function hexToRgb(hex) {
    let h = (hex || '#6366f1').replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const bigint = parseInt(h, 16) || 0;
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }
  function computeAccentTextColor() {
    const mode = SETTINGS.accentTextMode || 'auto';
    if (mode === 'light') return '#ffffff';
    if (mode === 'dark') return '#0a0a0a';
    if (mode === 'custom') return SETTINGS.accentTextColor || '#ffffff';
    try {
      const { r, g, b } = hexToRgb(SETTINGS.accent);
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return lum > 0.6 ? '#0a0a0a' : '#ffffff';
    } catch (e) { return '#ffffff'; }
  }

  /* ================= MODALS ================= */
  function closeAllPopups() {
    document.querySelectorAll('.cgm_popup, .cgm_popup_overlay, .cgm_modal_overlay').forEach(el => el.remove());
  }
  function openCenteredModal({ title, width = 340, bodyBuilder }) {
    closeAllPopups();
    const overlay = document.createElement('div');
    overlay.className = 'cgm_modal_overlay';
    const modal = document.createElement('div');
    modal.className = 'cgm_modal';
    modal.style.width = width + 'px';
    modal.innerHTML = `
      <div class="cgm_modal_header">
        <b>${escapeHtml(title)}</b>
        <button class="cgm_icon_btn" data-act="close">${icon('x')}</button>
      </div>
      <div class="cgm_modal_body"></div>`;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    const body = modal.querySelector('.cgm_modal_body');
    function escHandler(e) { if (e.key === 'Escape') api.close(); }
    const api = {
      modal, overlay, body,
      close: () => { overlay.remove(); document.removeEventListener('keydown', escHandler); }
    };
    modal.querySelector('[data-act="close"]').onclick = api.close;
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) api.close(); });
    document.addEventListener('keydown', escHandler);
    if (bodyBuilder) bodyBuilder(body, api);
    return api;
  }
  function showAlert(message, title = 'Notice') {
    return new Promise(resolve => {
      openCenteredModal({
        title, width: 320,
        bodyBuilder: (body, modalApi) => {
          body.innerHTML = `
            <p class="cgm_modal_text">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
            <div class="cgm_modal_actions">
              <button class="cgm_btn cgm_btn_primary" data-act="ok">OK</button>
            </div>`;
          const finish = () => { modalApi.close(); resolve(); };
          body.querySelector('[data-act="ok"]').onclick = finish;
        }
      });
    });
  }
  function showConfirm(message, title = 'Please confirm', danger = false) {
    return new Promise(resolve => {
      openCenteredModal({
        title, width: 320,
        bodyBuilder: (body, modalApi) => {
          body.innerHTML = `
            <p class="cgm_modal_text">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
            <div class="cgm_modal_actions">
              <button class="cgm_btn cgm_btn_secondary" data-act="cancel">Cancel</button>
              <button class="cgm_btn ${danger ? 'cgm_btn_danger_solid' : 'cgm_btn_primary'}" data-act="ok">${danger ? 'Delete' : 'Confirm'}</button>
            </div>`;
          body.querySelector('[data-act="cancel"]').onclick = () => { modalApi.close(); resolve(false); };
          body.querySelector('[data-act="ok"]').onclick = () => { modalApi.close(); resolve(true); };
        }
      });
    });
  }

  /* ================= SCAN & SCROLL ================= */
  function autoScrollAndLoad(container, delaySec) {
    return new Promise(resolve => {
      let lastHeight = container.scrollHeight;
      let stopped = false;
      const delay = Math.max(delaySec, 1) * 1000;
      const wait = Math.max(delay - 500, 300);
      const interval = setInterval(() => {
        if (stopped) return;
        container.scrollTop = container.scrollHeight;
        setTimeout(() => {
          if (container.scrollHeight === lastHeight) {
            stopped = true;
            clearInterval(interval);
            resolve();
          } else {
            lastHeight = container.scrollHeight;
          }
        }, wait);
      }, delay);
    });
  }
  function scanLinks(container) {
    const links = container.querySelectorAll('li[data-sidebar="menu-item"] a');
    if (!links.length) return 0;
    let added = 0;
    links.forEach(a => {
      const url = a.href;
      const name = (a.innerText || a.textContent || '').trim();
      const id = extractId(url);
      if (!id) return;
      const svgEls = a.querySelectorAll('svg');
      let iconHtml = '';
      svgEls.forEach(svg => { iconHtml += svg.outerHTML; });
      if (ACC.chats[id]) {
        const c = ACC.chats[id];
        if (!c.customName && name) c.name = name;
        c.url = url;
        if (iconHtml) c.iconHtml = iconHtml;
      } else {
        ACC.chats[id] = { id, name: name || id, url, groupId: null, pinned: false, customName: false, iconHtml };
        ACC.order.ungrouped.unshift(id);
        added++;
      }
    });
    return added;
  }
  async function handleRefresh(btn) {
    const container = document.querySelector(SIDEBAR_SELECTOR);
    if (!container) {
      await showAlert('Original chat sidebar not found.\n\nPlease open the sidebar first, then click Refresh again.', 'Sidebar Not Found');
      return;
    }
    btn.classList.add('cgm_spin');
    btn.disabled = true;
    try {
      await autoScrollAndLoad(container, SETTINGS.scrollDelay);
      scanLinks(container);
      saveData();
      renderAll();
    } finally {
      btn.classList.remove('cgm_spin');
      btn.disabled = false;
    }
  }
  function quickInitialScan() {
    const container = document.querySelector(SIDEBAR_SELECTOR);
    if (container) { scanLinks(container); saveData(); }
  }

  /* ================= DATA ACTIONS ================= */
  function togglePin(chatId) {
    const chat = ACC.chats[chatId]; if (!chat) return;
    chat.pinned = !chat.pinned;
    if (chat.pinned) { if (!ACC.order.pinned.includes(chatId)) ACC.order.pinned.push(chatId); }
    else { removeIdFromArray(ACC.order.pinned, chatId); }
    saveData(); renderAll();
  }
  function moveChatToGroup(chatId, targetGroupId) {
    const chat = ACC.chats[chatId]; if (!chat) return;
    const oldArr = getHomeArray(chat.groupId);
    removeIdFromArray(oldArr, chatId);
    chat.groupId = targetGroupId || null;
    getHomeArray(chat.groupId).unshift(chatId);
    saveData(); renderAll();
  }
  function createGroup(name) {
    const g = { id: genId('g'), name: name || 'New Group', collapsed: true };
    ACC.groups.push(g);
    ACC.order.byGroup[g.id] = [];
    saveData(); renderAll();
  }
  async function deleteGroup(groupId) {
    const group = ACC.groups.find(g => g.id === groupId); if (!group) return;
    const ok = await showConfirm(`Delete group "${group.name}"?\n\nIts chats will move to Ungrouped (kept at the top).`, 'Delete Group', true);
    if (!ok) return;
    const arr = ACC.order.byGroup[groupId] || [];
    arr.forEach(chatId => { const c = ACC.chats[chatId]; if (c) c.groupId = null; });
    ACC.order.ungrouped = arr.concat(ACC.order.ungrouped.filter(id => !arr.includes(id)));
    delete ACC.order.byGroup[groupId];
    ACC.groups = ACC.groups.filter(g => g.id !== groupId);
    saveData(); renderAll();
  }
  async function deleteChat(chatId) {
    const chat = ACC.chats[chatId]; if (!chat) return;
    const ok = await showConfirm(`Delete "${chat.name}" from Chat Groups?\n\nThis only removes it from the manager. It does NOT delete the actual chat from the website.`, 'Delete Chat', true);
    if (!ok) return;
    removeIdFromArray(ACC.order.pinned, chatId);
    removeIdFromArray(ACC.order.ungrouped, chatId);
    Object.keys(ACC.order.byGroup).forEach(gid => removeIdFromArray(ACC.order.byGroup[gid], chatId));
    delete ACC.chats[chatId];
    saveData(); renderAll();
  }

  /* ================= DRAG & DROP ================= */
  function handleChatDrop(ds, pd) {
    const chat = ACC.chats[ds.id]; if (!chat) return;
    if (pd.containerType === 'pinned') {
      chat.pinned = true;
      insertAtDropTarget(ACC.order.pinned, ds.id, pd);
    } else {
      if (ds.sourceType === 'pinned') { chat.pinned = false; removeIdFromArray(ACC.order.pinned, ds.id); }
      const oldArr = getHomeArray(chat.groupId);
      removeIdFromArray(oldArr, ds.id);
      chat.groupId = pd.containerType === 'group' ? pd.containerId : null;
      const newArr = getHomeArray(chat.groupId);
      insertAtDropTarget(newArr, ds.id, pd);
    }
  }
  function handleGroupDrop(ds, pd) {
    const idx = ACC.groups.findIndex(g => g.id === ds.id);
    if (idx === -1) return;
    const [group] = ACC.groups.splice(idx, 1);
    const targetIdx = ACC.groups.findIndex(g => g.id === pd.targetGroupId);
    if (targetIdx === -1) { ACC.groups.push(group); return; }
    ACC.groups.splice(pd.before ? targetIdx : targetIdx + 1, 0, group);
  }
  function clearDropIndicators() {
    panelEl.querySelectorAll('.cgm_drop_before,.cgm_drop_after,.cgm_drop_inside_empty').forEach(el => {
      el.classList.remove('cgm_drop_before', 'cgm_drop_after', 'cgm_drop_inside_empty');
    });
  }
  function cleanupDrag() {
    dragState = null; pendingDrop = null;
    panelEl.querySelectorAll('.cgm_dragging').forEach(el => el.classList.remove('cgm_dragging'));
    clearDropIndicators();
  }
  function bindDelegatedEvents() {
    panelEl.addEventListener('dragstart', (e) => {
      const item = e.target.closest('[data-dnd="item"]');
      const groupHeader = e.target.closest('[data-dnd="group"]');
      if (item) {
        const container = item.closest('[data-container-type]');
        dragState = { type: 'chat', id: item.dataset.id, sourceType: container ? container.dataset.containerType : null };
        item.classList.add('cgm_dragging');
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', item.dataset.id); } catch (err) {}
      } else if (groupHeader) {
        const groupEl = groupHeader.closest('.cgm_group');
        dragState = { type: 'group', id: groupHeader.dataset.id };
        if (groupEl) groupEl.classList.add('cgm_dragging');
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', groupHeader.dataset.id); } catch (err) {}
      } else {
        dragState = null;
      }
    });
    panelEl.addEventListener('dragover', (e) => {
      if (!dragState) return;
      e.preventDefault();
      clearDropIndicators();
      if (dragState.type === 'chat') {
        const li = e.target.closest('[data-dnd="item"]');
        const container = e.target.closest('[data-container-type]');
        if (li) {
          const rect = li.getBoundingClientRect();
          const before = (e.clientY - rect.top) < rect.height / 2;
          li.classList.add(before ? 'cgm_drop_before' : 'cgm_drop_after');
          const c = li.closest('[data-container-type]');
          pendingDrop = { containerType: c.dataset.containerType, containerId: c.dataset.containerId, targetId: li.dataset.id, before };
        } else if (container) {
          container.classList.add('cgm_drop_inside_empty');
          pendingDrop = { containerType: container.dataset.containerType, containerId: container.dataset.containerId, targetId: null, before: false };
        } else {
          pendingDrop = null;
        }
      } else if (dragState.type === 'group') {
        const groupEl = e.target.closest('.cgm_group');
        if (groupEl && groupEl.dataset.id !== dragState.id) {
          const rect = groupEl.getBoundingClientRect();
          const before = (e.clientY - rect.top) < rect.height / 2;
          groupEl.classList.add(before ? 'cgm_drop_before' : 'cgm_drop_after');
          pendingDrop = { targetGroupId: groupEl.dataset.id, before };
        } else {
          pendingDrop = null;
        }
      }
    });
    panelEl.addEventListener('drop', (e) => {
      e.preventDefault();
      if (dragState && pendingDrop) {
        if (dragState.type === 'chat') handleChatDrop(dragState, pendingDrop);
        else if (dragState.type === 'group') handleGroupDrop(dragState, pendingDrop);
        saveData();
      }
      cleanupDrag();
      renderAll();
    });
    panelEl.addEventListener('dragend', () => cleanupDrag());
  }

  /* ================= ANCHORED POPUPS ================= */
  function positionPopover(pop, anchorEl) {
    const rect = anchorEl.getBoundingClientRect();
    let top = rect.bottom + 6, left = rect.left;
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
    if (left < 8) left = 8;
    if (top + ph > window.innerHeight - 8) top = rect.top - ph - 6;
    if (top < 8) top = 8;
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
  }
  function openPopup({ title, value = '', onSave, anchorEl }) {
    closeAllPopups();
    const overlay = document.createElement('div');
    overlay.className = 'cgm_popup_overlay';
    document.body.appendChild(overlay);

    const pop = document.createElement('div');
    pop.className = 'cgm_popup';
    pop.innerHTML = `
      <div class="cgm_popup_title">${escapeHtml(title)}</div>
      <input type="text" class="cgm_popup_input">
      <div class="cgm_popup_actions">
        <button class="cgm_btn cgm_btn_secondary" data-act="cancel">Cancel</button>
        <button class="cgm_btn cgm_btn_primary" data-act="save">Save</button>
      </div>`;
    document.body.appendChild(pop);
    const input = pop.querySelector('input');
    input.value = value;
    positionPopover(pop, anchorEl);
    input.focus(); input.select();

    const closeAll = () => { pop.remove(); overlay.remove(); document.removeEventListener('mousedown', outsideCloser); };
    const save = () => { const v = input.value.trim(); closeAll(); if (v) onSave(v); };
    pop.querySelector('[data-act="save"]').onclick = save;
    pop.querySelector('[data-act="cancel"]').onclick = closeAll;
    overlay.addEventListener('mousedown', closeAll);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') closeAll(); });
    setTimeout(() => document.addEventListener('mousedown', outsideCloser), 0);
    function outsideCloser(e) { if (!pop.contains(e.target)) closeAll(); }
  }
  function openChatActionMenu(chatId, anchorEl) {
    const chat = ACC.chats[chatId]; if (!chat) return;
    closeAllPopups();
    const overlay = document.createElement('div');
    overlay.className = 'cgm_popup_overlay';
    document.body.appendChild(overlay);

    const menu = document.createElement('div');
    menu.className = 'cgm_popup cgm_menu';
    const groupsHtml = `<button class="cgm_menu_item" data-move="">${icon('folder')} Ungrouped</button>` +
      ACC.groups.map(g => `<button class="cgm_menu_item" data-move="${g.id}">${icon('folder')} ${escapeHtml(g.name)}</button>`).join('');
    menu.innerHTML = `
      <button class="cgm_menu_item" data-act="pin">${icon('pin')} ${chat.pinned ? 'Unpin' : 'Pin'}</button>
      <button class="cgm_menu_item" data-act="rename">${icon('pencil')} Rename</button>
      <div class="cgm_menu_divider"></div>
      <div class="cgm_menu_label">Move to</div>
      ${groupsHtml}
      <div class="cgm_menu_divider"></div>
      <button class="cgm_menu_item cgm_menu_item_danger" data-act="delete">${icon('trash-2')} Delete Chat</button>`;
    document.body.appendChild(menu);
    positionPopover(menu, anchorEl);

    const closeAll = () => { menu.remove(); overlay.remove(); document.removeEventListener('mousedown', outsideCloser); };
    menu.querySelector('[data-act="pin"]').onclick = () => { closeAll(); togglePin(chatId); };
    menu.querySelector('[data-act="rename"]').onclick = () => {
      closeAll();
      openPopup({ title: 'Rename chat', value: chat.name, anchorEl, onSave: (v) => { chat.name = v; chat.customName = true; saveData(); renderAll(); } });
    };
    menu.querySelector('[data-act="delete"]').onclick = () => { closeAll(); deleteChat(chatId); };
    menu.querySelectorAll('[data-move]').forEach(btn => {
      btn.onclick = () => { closeAll(); moveChatToGroup(chatId, btn.dataset.move || null); };
    });
    overlay.addEventListener('mousedown', closeAll);
    setTimeout(() => document.addEventListener('mousedown', outsideCloser), 0);
    function outsideCloser(e) { if (!menu.contains(e.target)) closeAll(); }
  }
  function openGroupActionMenu(group, anchorEl) {
    closeAllPopups();
    const overlay = document.createElement('div');
    overlay.className = 'cgm_popup_overlay';
    document.body.appendChild(overlay);

    const menu = document.createElement('div');
    menu.className = 'cgm_popup cgm_menu';
    menu.innerHTML = `
      <button class="cgm_menu_item" data-act="rename">${icon('pencil')} Rename Group</button>
      <div class="cgm_menu_divider"></div>
      <button class="cgm_menu_item cgm_menu_item_danger" data-act="delete">${icon('trash-2')} Delete Group</button>`;
    document.body.appendChild(menu);
    positionPopover(menu, anchorEl);

    const closeAll = () => { menu.remove(); overlay.remove(); document.removeEventListener('mousedown', outsideCloser); };
    menu.querySelector('[data-act="rename"]').onclick = () => {
      closeAll();
      openPopup({ title: 'Rename group', value: group.name, anchorEl, onSave: (v) => { group.name = v; saveData(); renderAll(); } });
    };
    menu.querySelector('[data-act="delete"]').onclick = () => { closeAll(); deleteGroup(group.id); };
    overlay.addEventListener('mousedown', closeAll);
    setTimeout(() => document.addEventListener('mousedown', outsideCloser), 0);
    function outsideCloser(e) { if (!menu.contains(e.target)) closeAll(); }
  }

  /* ================= ACTIVE NAV / ACCOUNT / HOST DOM TWEAKS ================= */
  function highlightActiveChat() {
    const currentId = extractId(location.href);
    panelEl.querySelectorAll('.cgm_chat_item').forEach(el => {
      el.classList.toggle('cgm_active', !!currentId && el.dataset.id === currentId);
    });
  }
  function applyOriginalSidebarTweaks() {
    try {
      const menuButtonDiv = document.querySelector('[data-sidebar="menu-button"] > div > div.items-center');
      const footerEl = document.querySelector('[data-sidebar="footer"]');
      if (SETTINGS.hideSidebarHeaderFooter) {
        if (menuButtonDiv) menuButtonDiv.style.width = '0px';
        if (footerEl) footerEl.style.width = '0px';
      } else {
        if (menuButtonDiv && menuButtonDiv.style.width === '0px') menuButtonDiv.style.width = '';
        if (footerEl && footerEl.style.width === '0px') footerEl.style.width = '';
      }

      const variantEl = document.querySelector('[data-variant="sidebar"]');
      const sidebarEl = document.querySelector('[data-sidebar="sidebar"]');
      const sidebarParent = sidebarEl ? sidebarEl.parentElement : null;
      if (SETTINGS.hideSidebarFull) {
        if (variantEl) variantEl.style.width = '0px';
        if (sidebarParent) sidebarParent.style.width = '0px';
      } else {
        if (variantEl && variantEl.style.width === '0px') variantEl.style.width = '';
        if (sidebarParent && sidebarParent.style.width === '0px') sidebarParent.style.width = '';
      }

      const headerEl = document.querySelector('[id="chat-area"] > div');
      if (SETTINGS.hideOriginalHeader) {
        if (headerEl) headerEl.style.display = 'none';
      } else {
        if (headerEl && headerEl.style.display === 'none') headerEl.style.display = '';
      }

      const rootPortal = document.querySelector('[id="root-portal-target"]');
      if (rootPortal) {
        if (SETTINGS.dockedMode && SETTINGS.sidebarOpen) {
          const width = '320px';
          if (SETTINGS.sidebarPosition === 'left') {
            rootPortal.style.marginLeft = width;
            rootPortal.style.marginRight = '';
          } else {
            rootPortal.style.marginRight = width;
            rootPortal.style.marginLeft = '';
          }
          rootPortal.style.transition = 'margin 0.2s ease';
          rootPortal.style.boxSizing = 'border-box';
        } else {
          rootPortal.style.marginLeft = '';
          rootPortal.style.marginRight = '';
        }
      }
    } catch (e) { /* host DOM may vary between releases */ }
  }
  function heartbeat() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      highlightActiveChat();
    }
    checkAccountChange();
    applyOriginalSidebarTweaks();
  }
  function startHeartbeat() { setInterval(heartbeat, 1000); }

  /* ================= RENDER ================= */
  function buildChatEl(chat) {
    const currentId = extractId(location.href);
    const isActive = !!currentId && chat.id === currentId;
    const li = document.createElement('li');
    li.className = 'cgm_chat_item' + (chat.pinned ? ' cgm_pinned_item' : '') + (isActive ? ' cgm_active' : '');
    li.dataset.id = chat.id;
    li.dataset.dnd = 'item';
    li.draggable = true;
    li.title = chat.name;
    const showIcon = SETTINGS.showChatIcons !== false && chat.iconHtml;
    li.innerHTML = `
      <span class="cgm_grip">${icon('grip-vertical')}</span>
      ${isActive ? `<span class="cgm_active_dot" title="Currently viewing">${icon('circle-dot')}</span>` : ''}
      ${chat.pinned ? `<button class="cgm_icon_btn cgm_pin_ind" draggable="false" title="Unpin">${icon('pin')}</button>` : ''}
      <span class="cgm_chat_main">
        ${showIcon ? `<span class="cgm_chat_icon">${chat.iconHtml}</span>` : ''}
        <span class="cgm_chat_name">${highlightHtml(chat.name)}</span>
      </span>
      <button class="cgm_icon_btn cgm_more_btn" draggable="false" title="Actions">${icon('more-vertical')}</button>`;
    li.querySelector('.cgm_chat_main').addEventListener('click', () => { window.location.href = chat.url; });
    li.querySelector('.cgm_more_btn').addEventListener('click', (e) => { e.stopPropagation(); openChatActionMenu(chat.id, e.currentTarget); });
    const pinBtn = li.querySelector('.cgm_pin_ind');
    if (pinBtn) pinBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePin(chat.id); });
    return li;
  }
  function buildGroupEl(group) {
    const rawArr = ACC.order.byGroup[group.id] || (ACC.order.byGroup[group.id] = []);
    const validIds = rawArr.filter(id => ACC.chats[id] && ACC.chats[id].groupId === group.id);
    ACC.order.byGroup[group.id] = validIds;
    const ordered = validIds.filter(id => ACC.chats[id].pinned).concat(validIds.filter(id => !ACC.chats[id].pinned));
    const filtered = ordered.filter(id => matchesSearch(ACC.chats[id]));
    const effectiveCollapsed = group.collapsed && !searchTerm;

    const div = document.createElement('div');
    div.className = 'cgm_group' + (effectiveCollapsed ? ' cgm_collapsed' : '');
    div.dataset.id = group.id;
    div.innerHTML = `
      <div class="cgm_group_header" data-dnd="group" data-id="${group.id}" draggable="true">
        <span class="cgm_grip">${icon('grip-vertical')}</span>
        <button class="cgm_icon_btn" draggable="false" tabindex="-1">${icon(effectiveCollapsed ? 'chevron-right' : 'chevron-down')}</button>
        <span class="cgm_group_name">${escapeHtml(group.name)}</span>
        <span class="cgm_badge">${validIds.length}</span>
        <button class="cgm_icon_btn cgm_group_more_btn" draggable="false" title="Group actions">${icon('more-vertical')}</button>
      </div>
      <ul class="cgm_chat_list" data-container-type="group" data-container-id="${group.id}"></ul>`;
    const ul = div.querySelector('.cgm_chat_list');
    if (filtered.length === 0) {
      const hint = document.createElement('div');
      hint.className = 'cgm_empty_hint';
      hint.textContent = searchTerm ? 'No matches' : 'Drag chats here';
      ul.appendChild(hint);
    } else {
      filtered.forEach(id => ul.appendChild(buildChatEl(ACC.chats[id])));
    }
    const headerEl = div.querySelector('.cgm_group_header');
    headerEl.addEventListener('click', (e) => {
      if (e.target.closest('.cgm_grip') || e.target.closest('.cgm_group_more_btn')) return;
      group.collapsed = !group.collapsed; saveData(); renderAll();
    });
    headerEl.querySelector('.cgm_group_more_btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openGroupActionMenu(group, e.currentTarget);
    });
    return div;
  }
  function renderPinned() {
    ACC.order.pinned = ACC.order.pinned.filter(id => ACC.chats[id] && ACC.chats[id].pinned);
    const filtered = ACC.order.pinned.filter(id => matchesSearch(ACC.chats[id]));
    const effectiveCollapsed = ACC.collapse.pinned && !searchTerm;

    const section = panelEl.querySelector('#cgm_pinned_section');
    const toggleBtn = section.querySelector('[data-act="toggle-pinned"]');
    toggleBtn.innerHTML = icon(effectiveCollapsed ? 'chevron-right' : 'chevron-down');
    section.querySelector('#cgm_pinned_count').textContent = ACC.order.pinned.length;

    const wrap = panelEl.querySelector('#cgm_pinned_list');
    wrap.style.display = effectiveCollapsed ? 'none' : 'flex';
    wrap.innerHTML = '';
    if (filtered.length === 0) {
      const hint = document.createElement('div');
      hint.className = 'cgm_empty_hint';
      hint.textContent = searchTerm ? 'No matches' : 'No pinned chats — drag chats here';
      wrap.appendChild(hint);
    } else {
      filtered.forEach(id => wrap.appendChild(buildChatEl(ACC.chats[id])));
    }
  }
  function renderGroups() {
    const wrap = panelEl.querySelector('#cgm_groups_list');
    wrap.innerHTML = '';
    ACC.groups.forEach(g => wrap.appendChild(buildGroupEl(g)));
  }
  function renderUngrouped() {
    ACC.order.ungrouped = ACC.order.ungrouped.filter(id => ACC.chats[id] && ACC.chats[id].groupId === null);
    const ordered = ACC.order.ungrouped.filter(id => ACC.chats[id].pinned).concat(ACC.order.ungrouped.filter(id => !ACC.chats[id].pinned));
    const filtered = ordered.filter(id => matchesSearch(ACC.chats[id]));
    const effectiveCollapsed = ACC.collapse.ungrouped && !searchTerm;

    const section = panelEl.querySelector('#cgm_ungrouped_section');
    const toggleBtn = section.querySelector('[data-act="toggle-ungrouped"]');
    toggleBtn.innerHTML = icon(effectiveCollapsed ? 'chevron-right' : 'chevron-down');
    section.querySelector('#cgm_ungrouped_count').textContent = ACC.order.ungrouped.length;

    const wrap = panelEl.querySelector('#cgm_ungrouped_list');
    wrap.style.display = effectiveCollapsed ? 'none' : 'flex';
    wrap.innerHTML = '';
    if (filtered.length === 0) {
      const hint = document.createElement('div');
      hint.className = 'cgm_empty_hint';
      hint.textContent = searchTerm ? 'No matches' : 'No ungrouped chats';
      wrap.appendChild(hint);
    } else {
      filtered.forEach(id => wrap.appendChild(buildChatEl(ACC.chats[id])));
    }
  }
  function updateAccountLabelUI() {
    const el = panelEl.querySelector('#cgm_account_label');
    if (!el) return;
    if (SETTINGS.hideAccountLabel) { el.style.display = 'none'; return; }
    el.style.display = 'flex';
    el.innerHTML = `${icon('user')} <span>${escapeHtml(currentAccountKey)}</span>`;
  }
  function applySettingsToDOM() {
    const pos = SETTINGS.sidebarPosition;
    rootEl.classList.toggle('cgm_pos_left', pos === 'left');
    rootEl.classList.toggle('cgm_pos_right', pos !== 'left');
    rootEl.classList.toggle('cgm_open', !!SETTINGS.sidebarOpen);
    rootEl.classList.toggle('cgm_docked', !!SETTINGS.dockedMode && !!SETTINGS.sidebarOpen);
    rootEl.style.setProperty('--cgm-accent', SETTINGS.accent);
    document.documentElement.style.setProperty('--cgm-accent', SETTINGS.accent);
    const { r, g, b } = hexToRgb(SETTINGS.accent);
    const rgbStr = `${r}, ${g}, ${b}`;
    rootEl.style.setProperty('--cgm-accent-rgb', rgbStr);
    document.documentElement.style.setProperty('--cgm-accent-rgb', rgbStr);
    const accentText = computeAccentTextColor();
    rootEl.style.setProperty('--cgm-accent-text', accentText);
    document.documentElement.style.setProperty('--cgm-accent-text', accentText);
    const logoChevron = panelEl.querySelector('.cgm_logo_chevron');
    if (logoChevron) logoChevron.innerHTML = icon(pos === 'left' ? 'chevron-left' : 'chevron-right');
    toggleTabEl.innerHTML = icon(pos === 'left' ? 'chevron-right' : 'chevron-left');
    updateAccountLabelUI();
    applyOriginalSidebarTweaks();
  }
  function renderAll() {
    applySettingsToDOM();
    renderPinned();
    renderGroups();
    renderUngrouped();
    highlightActiveChat();
    const total = Object.keys(ACC.chats).length;
    const statsEl = panelEl.querySelector('#cgm_stats');
    if (statsEl) statsEl.textContent = total ? `${total} chat${total !== 1 ? 's' : ''} · ${ACC.groups.length} group${ACC.groups.length !== 1 ? 's' : ''}` : 'No chats found yet — open sidebar & click refresh';
  }

  /* ================= SETTINGS MODAL (tabbed) ================= */
  function exportData() {
    const blob = new Blob([JSON.stringify(ROOT, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'chat-groups-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
  }
  function buildGeneralTab(el) {
    const wait = Math.max(SETTINGS.scrollDelay - 0.5, 0.3).toFixed(1);
    el.innerHTML = `
      <div class="cgm_setting_group">
        <label>Scroll Delay: <span id="cgm_delay_label">${SETTINGS.scrollDelay}s</span> (content wait: <span id="cgm_wait_label">${wait}s</span>)</label>
        <input type="range" id="cgm_delay_slider" min="1" max="60" step="0.5" value="${SETTINGS.scrollDelay}">
      </div>
      <div class="cgm_setting_group">
        <label>Close sidebar on outside click</label>
        <div class="cgm_segmented">
          <button data-outside="true" class="cgm_seg_btn ${SETTINGS.closeOnOutsideClick ? 'active' : ''}">Enabled</button>
          <button data-outside="false" class="cgm_seg_btn ${!SETTINGS.closeOnOutsideClick ? 'active' : ''}">Disabled</button>
        </div>
        <div class="cgm_setting_hint">Ignored automatically while Docked Mode (Sidebar tab) is on.</div>
      </div>
      <div class="cgm_setting_group">
        <label>Show Chat Icons</label>
        <div class="cgm_segmented">
          <button data-icons="true" class="cgm_seg_btn ${SETTINGS.showChatIcons !== false ? 'active' : ''}">Enabled</button>
          <button data-icons="false" class="cgm_seg_btn ${SETTINGS.showChatIcons === false ? 'active' : ''}">Disabled</button>
        </div>
      </div>
      <div class="cgm_setting_group">
        <label>New Chat Link</label>
        <input type="text" id="cgm_new_chat_href" class="cgm_text_input" value="${escapeHtml(SETTINGS.newChatHref || '/text/direct')}" placeholder="/text/direct">
        <div class="cgm_setting_hint">Path used by the "New Chat" button.</div>
      </div>`;
    el.querySelector('#cgm_delay_slider').addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      SETTINGS.scrollDelay = v;
      el.querySelector('#cgm_delay_label').textContent = v + 's';
      el.querySelector('#cgm_wait_label').textContent = Math.max(v - 0.5, 0.3).toFixed(1) + 's';
      saveData();
    });
    el.querySelectorAll('[data-outside]').forEach(btn => {
      btn.onclick = () => {
        SETTINGS.closeOnOutsideClick = btn.dataset.outside === 'true';
        saveData();
        el.querySelectorAll('[data-outside]').forEach(b => b.classList.toggle('active', b === btn));
      };
    });
    el.querySelectorAll('[data-icons]').forEach(btn => {
      btn.onclick = () => {
        SETTINGS.showChatIcons = btn.dataset.icons === 'true';
        saveData(); renderAll();
        el.querySelectorAll('[data-icons]').forEach(b => b.classList.toggle('active', b === btn));
      };
    });
    el.querySelector('#cgm_new_chat_href').addEventListener('change', (e) => {
      SETTINGS.newChatHref = e.target.value.trim() || '/text/direct';
      saveData();
    });
  }
  function buildAppearanceTab(el) {
    const textMode = SETTINGS.accentTextMode || 'auto';
    el.innerHTML = `
      <div class="cgm_setting_group">
        <label>Sidebar Position</label>
        <div class="cgm_segmented">
          <button data-pos="left" class="cgm_seg_btn ${SETTINGS.sidebarPosition === 'left' ? 'active' : ''}">Left</button>
          <button data-pos="right" class="cgm_seg_btn ${SETTINGS.sidebarPosition === 'right' ? 'active' : ''}">Right</button>
        </div>
      </div>
      <div class="cgm_setting_group">
        <label>Accent Color</label>
        <div class="cgm_swatches">
          ${ACCENT_PRESETS.map(c => `<button class="cgm_swatch ${SETTINGS.accent === c ? 'active' : ''}" data-color="${c}" style="background:${c}"></button>`).join('')}
          <input type="color" id="cgm_custom_color" value="${SETTINGS.accent}">
        </div>
      </div>
      <div class="cgm_setting_group">
        <label>Accent Text Color</label>
        <div class="cgm_segmented">
          <button data-textmode="auto" class="cgm_seg_btn ${textMode === 'auto' ? 'active' : ''}">Auto</button>
          <button data-textmode="light" class="cgm_seg_btn ${textMode === 'light' ? 'active' : ''}">Light</button>
          <button data-textmode="dark" class="cgm_seg_btn ${textMode === 'dark' ? 'active' : ''}">Dark</button>
          <button data-textmode="custom" class="cgm_seg_btn ${textMode === 'custom' ? 'active' : ''}">Custom</button>
        </div>
        <input type="color" id="cgm_accent_text_custom" value="${SETTINGS.accentTextColor || '#ffffff'}" style="${textMode === 'custom' ? '' : 'display:none'}">
        <div class="cgm_setting_hint">Auto picks black/white text based on accent brightness — useful for light accent colors.</div>
      </div>`;
    el.querySelectorAll('[data-pos]').forEach(btn => {
      btn.onclick = () => {
        SETTINGS.sidebarPosition = btn.dataset.pos;
        saveData(); applySettingsToDOM();
        el.querySelectorAll('[data-pos]').forEach(b => b.classList.toggle('active', b === btn));
      };
    });
    el.querySelectorAll('.cgm_swatch').forEach(btn => {
      btn.onclick = () => {
        SETTINGS.accent = btn.dataset.color;
        saveData(); applySettingsToDOM();
        el.querySelectorAll('.cgm_swatch').forEach(b => b.classList.toggle('active', b === btn));
        el.querySelector('#cgm_custom_color').value = btn.dataset.color;
      };
    });
    el.querySelector('#cgm_custom_color').addEventListener('input', (e) => {
      SETTINGS.accent = e.target.value; saveData(); applySettingsToDOM();
    });
    el.querySelectorAll('[data-textmode]').forEach(btn => {
      btn.onclick = () => {
        SETTINGS.accentTextMode = btn.dataset.textmode;
        saveData(); applySettingsToDOM();
        el.querySelectorAll('[data-textmode]').forEach(b => b.classList.toggle('active', b === btn));
        el.querySelector('#cgm_accent_text_custom').style.display = btn.dataset.textmode === 'custom' ? 'inline-block' : 'none';
      };
    });
    el.querySelector('#cgm_accent_text_custom').addEventListener('input', (e) => {
      SETTINGS.accentTextColor = e.target.value;
      SETTINGS.accentTextMode = 'custom';
      saveData(); applySettingsToDOM();
      el.querySelectorAll('[data-textmode]').forEach(b => b.classList.toggle('active', b.dataset.textmode === 'custom'));
    });
  }
  function buildSidebarTab(el) {
    el.innerHTML = `
      <div class="cgm_setting_group">
        <label>Docked Mode</label>
        <div class="cgm_segmented">
          <button data-docked="true" class="cgm_seg_btn ${SETTINGS.dockedMode ? 'active' : ''}">Enabled</button>
          <button data-docked="false" class="cgm_seg_btn ${!SETTINGS.dockedMode ? 'active' : ''}">Disabled</button>
        </div>
        <div class="cgm_setting_hint">Keeps the sidebar open and pushes the page content instead of overlaying it. Disables auto-close on outside click.</div>
      </div>
      <div class="cgm_setting_group">
        <label>Hide Original Sidebar Labels</label>
        <div class="cgm_segmented">
          <button data-hidelf="true" class="cgm_seg_btn ${SETTINGS.hideSidebarHeaderFooter ? 'active' : ''}">Hidden</button>
          <button data-hidelf="false" class="cgm_seg_btn ${!SETTINGS.hideSidebarHeaderFooter ? 'active' : ''}">Visible</button>
        </div>
      </div>
      <div class="cgm_setting_group">
        <label>Hide Original Sidebar Completely</label>
        <div class="cgm_segmented">
          <button data-hidefull="true" class="cgm_seg_btn ${SETTINGS.hideSidebarFull ? 'active' : ''}">Hidden</button>
          <button data-hidefull="false" class="cgm_seg_btn ${!SETTINGS.hideSidebarFull ? 'active' : ''}">Visible</button>
        </div>
      </div>
      <div class="cgm_setting_group">
        <label>Hide Original Top Header</label>
        <div class="cgm_segmented">
          <button data-hideheader="true" class="cgm_seg_btn ${SETTINGS.hideOriginalHeader ? 'active' : ''}">Hidden</button>
          <button data-hideheader="false" class="cgm_seg_btn ${!SETTINGS.hideOriginalHeader ? 'active' : ''}">Visible</button>
        </div>
      </div>`;
    function bindSeg(attr, settingKey) {
      el.querySelectorAll(`[data-${attr}]`).forEach(btn => {
        btn.onclick = () => {
          SETTINGS[settingKey] = btn.dataset[attr] === 'true';
          saveData(); applyOriginalSidebarTweaks(); applySettingsToDOM();
          el.querySelectorAll(`[data-${attr}]`).forEach(b => b.classList.toggle('active', b === btn));
        };
      });
    }
    bindSeg('docked', 'dockedMode');
    bindSeg('hidelf', 'hideSidebarHeaderFooter');
    bindSeg('hidefull', 'hideSidebarFull');
    bindSeg('hideheader', 'hideOriginalHeader');
  }
  function buildAccountTab(el) {
    function refresh() {
      const detected = detectAccountKey();
      const mode = SETTINGS.accountMode || 'auto';
      const accountKeys = Object.keys(ROOT.accounts).sort((a, b) => a.localeCompare(b));
      el.innerHTML = `
        <div class="cgm_setting_group">
          <label>Detection Mode</label>
          <div class="cgm_segmented">
            <button data-mode="auto" class="cgm_seg_btn ${mode === 'auto' ? 'active' : ''}">Auto-detect</button>
            <button data-mode="manual" class="cgm_seg_btn ${mode === 'manual' ? 'active' : ''}">Manual</button>
          </div>
          <div class="cgm_setting_hint">${mode === 'auto' ? 'Reads the account name from the sidebar automatically and switches when it changes.' : 'Auto-switching is paused — pick an account manually below.'}</div>
        </div>
        <div class="cgm_setting_group">
          <label>Sidebar Detected Name</label>
          <div class="cgm_readonly_box">${escapeHtml(detected || '(not detected)')}</div>
        </div>
        <div class="cgm_setting_group">
          <label>Fallback Account Name</label>
          <input type="text" id="cgm_fallback_name" class="cgm_text_input" value="${escapeHtml(SETTINGS.fallbackAccountName || 'Default Account')}" placeholder="Default Account">
          <div class="cgm_setting_hint">Used in Auto mode when a name can't be detected.</div>
        </div>
        <div class="cgm_setting_group">
          <label>Hide Account Name in Sidebar</label>
          <div class="cgm_segmented">
            <button data-hideacc="true" class="cgm_seg_btn ${SETTINGS.hideAccountLabel ? 'active' : ''}">Hidden</button>
            <button data-hideacc="false" class="cgm_seg_btn ${!SETTINGS.hideAccountLabel ? 'active' : ''}">Visible</button>
          </div>
        </div>
        <div class="cgm_setting_group">
          <label>Switch Account (${accountKeys.length})</label>
          <div class="cgm_account_list" id="cgm_account_list"></div>
          <button class="cgm_btn cgm_btn_block" id="cgm_add_account_btn">${icon('plus')} Add Account</button>
        </div>`;

      const listEl = el.querySelector('#cgm_account_list');
      if (accountKeys.length === 0) {
        listEl.innerHTML = `<div class="cgm_empty_hint">No accounts yet</div>`;
      } else {
        accountKeys.forEach(key => {
          const isActive = key === currentAccountKey;
          const item = document.createElement('div');
          item.className = 'cgm_account_item' + (isActive ? ' active' : '');
          item.innerHTML = `
            <span class="cgm_account_item_icon">${icon('user')}</span>
            <span class="cgm_account_item_name">${escapeHtml(key)}</span>
            ${isActive ? `<span class="cgm_account_item_badge">Active</span>` : `<button class="cgm_icon_btn cgm_account_item_delete" title="Delete account" data-del="${escapeHtml(key)}">${icon('trash-2')}</button>`}
          `;
          item.addEventListener('click', (e) => {
            if (e.target.closest('.cgm_account_item_delete')) return;
            if (isActive) return;
            switchAccount(key, { manual: true });
            refresh();
          });
          listEl.appendChild(item);
        });
        listEl.querySelectorAll('.cgm_account_item_delete').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const key = btn.dataset.del;
            const ok = await showConfirm(`Delete all data for account "${key}"? This cannot be undone.`, 'Delete Account', true);
            if (ok) { delete ROOT.accounts[key]; saveData(); refresh(); }
          });
        });
      }

      el.querySelectorAll('[data-mode]').forEach(btn => {
        btn.onclick = () => {
          const newMode = btn.dataset.mode;
          SETTINGS.accountMode = newMode;
          saveData();
          if (newMode === 'auto') forceAutoDetect();
          else renderAll();
          refresh();
        };
      });
      el.querySelectorAll('[data-hideacc]').forEach(btn => {
        btn.onclick = () => {
          SETTINGS.hideAccountLabel = btn.dataset.hideacc === 'true';
          saveData(); applySettingsToDOM();
          refresh();
        };
      });
      el.querySelector('#cgm_fallback_name').addEventListener('change', (e) => {
        const v = e.target.value.trim().slice(0, 63) || 'Default Account';
        SETTINGS.fallbackAccountName = v;
        saveData();
        if ((SETTINGS.accountMode || 'auto') === 'auto') forceAutoDetect();
        refresh();
      });
      el.querySelector('#cgm_add_account_btn').addEventListener('click', (e) => {
        openPopup({
          title: 'New account name', value: '', anchorEl: e.currentTarget, onSave: (name) => {
            const trimmed = name.trim().slice(0, 63);
            if (!trimmed) return;
            ensureAccount(trimmed);
            switchAccount(trimmed, { manual: true });
            refresh();
          }
        });
      });
    }
    refresh();
  }
  function buildBackupTab(el) {
    el.innerHTML = `
      <div class="cgm_setting_group">
        <label>Backup (all accounts + settings)</label>
        <div class="cgm_row_btns">
          <button class="cgm_btn" id="cgm_export_btn">${icon('download')} Export</button>
          <button class="cgm_btn" id="cgm_import_btn">${icon('upload')} Import</button>
          <input type="file" id="cgm_import_file" accept="application/json" style="display:none">
        </div>
      </div>
      <div class="cgm_setting_group">
        <button class="cgm_btn cgm_btn_danger cgm_btn_block" id="cgm_reset_account_btn">${icon('trash-2')} Reset Current Account Only</button>
      </div>
      <div class="cgm_setting_group">
        <button class="cgm_btn cgm_btn_danger cgm_btn_block" id="cgm_reset_btn">${icon('trash-2')} Reset Everything</button>
      </div>`;
    el.querySelector('#cgm_export_btn').onclick = exportData;
    el.querySelector('#cgm_import_btn').onclick = () => el.querySelector('#cgm_import_file').click();
    el.querySelector('#cgm_import_file').addEventListener('change', (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (!parsed.accounts || !parsed.settings) throw new Error('Invalid backup file');
          ROOT = Object.assign(defaultRoot(), parsed, { settings: Object.assign(defaultSettings(), parsed.settings || {}) });
          SETTINGS = ROOT.settings;
          currentAccountKey = ROOT.currentAccountKey || resolveAccountKey();
          ACC = ensureAccount(currentAccountKey);
          saveData(); renderAll(); applyOriginalSidebarTweaks();
          await showAlert('Backup imported successfully.', 'Import Complete');
        } catch (err) {
          await showAlert('Failed to import backup: ' + err.message, 'Import Failed');
        }
      };
      reader.readAsText(file);
    });
    el.querySelector('#cgm_reset_account_btn').onclick = async () => {
      const ok = await showConfirm(`Reset all data for account "${currentAccountKey}"? Other accounts are unaffected.`, 'Reset Account', true);
      if (ok) { ACC = defaultAccountData(); ROOT.accounts[currentAccountKey] = ACC; saveData(); renderAll(); }
    };
    el.querySelector('#cgm_reset_btn').onclick = async () => {
      const ok = await showConfirm('This will erase ALL accounts, groups, pins, and settings. Continue?', 'Reset Everything', true);
      if (ok) {
        ROOT = defaultRoot();
        SETTINGS = ROOT.settings;
        currentAccountKey = resolveAccountKey();
        ACC = ensureAccount(currentAccountKey);
        saveData(); renderAll(); applyOriginalSidebarTweaks();
      }
    };
  }
  function openSettingsModal() {
    openCenteredModal({
      title: 'Settings',
      width: 420,
      bodyBuilder: (body) => {
        body.innerHTML = `
          <div class="cgm_tabs">
            <button class="cgm_tab_btn active" data-tab="general">General</button>
            <button class="cgm_tab_btn" data-tab="appearance">Appearance</button>
            <button class="cgm_tab_btn" data-tab="sidebar">Sidebar</button>
            <button class="cgm_tab_btn" data-tab="account">Account</button>
            <button class="cgm_tab_btn" data-tab="backup">Backup</button>
          </div>
          <div class="cgm_tab_panels">
            <div class="cgm_tab_panel" data-panel="general"></div>
            <div class="cgm_tab_panel" data-panel="appearance" style="display:none"></div>
            <div class="cgm_tab_panel" data-panel="sidebar" style="display:none"></div>
            <div class="cgm_tab_panel" data-panel="account" style="display:none"></div>
            <div class="cgm_tab_panel" data-panel="backup" style="display:none"></div>
          </div>`;
        buildGeneralTab(body.querySelector('[data-panel="general"]'));
        buildAppearanceTab(body.querySelector('[data-panel="appearance"]'));
        buildSidebarTab(body.querySelector('[data-panel="sidebar"]'));
        buildAccountTab(body.querySelector('[data-panel="account"]'));
        buildBackupTab(body.querySelector('[data-panel="backup"]'));

        body.querySelectorAll('.cgm_tab_btn').forEach(btn => {
          btn.addEventListener('click', () => {
            body.querySelectorAll('.cgm_tab_btn').forEach(b => b.classList.toggle('active', b === btn));
            body.querySelectorAll('.cgm_tab_panel').forEach(p => { p.style.display = (p.dataset.panel === btn.dataset.tab) ? 'block' : 'none'; });
          });
        });
      }
    });
  }

  /* ================= DOM SCAFFOLD ================= */
  function buildDOM() {
    rootEl = document.createElement('div');
    rootEl.id = 'cgm_root';
    rootEl.innerHTML = `
      <div id="cgm_toggle_tab" class="cgm_toggle_tab" title="Open Chat Manager"></div>
      <div id="cgm_panel" class="cgm_panel">
        <div class="cgm_header">
          <div class="cgm_header_top">
            <button class="cgm_logo_btn" id="cgm_logo_btn" title="Toggle sidebar">
              ${icon('folder')} <b>Chat Groups</b> <span class="cgm_logo_chevron"></span>
            </button>
            <div class="cgm_header_actions">
              <button class="cgm_icon_btn" id="cgm_refresh_btn" draggable="false" title="Refresh from sidebar">${icon('refresh-cw')}</button>
              <button class="cgm_icon_btn" id="cgm_settings_btn" draggable="false" title="Settings">${icon('settings')}</button>
            </div>
          </div>
          <div id="cgm_account_label" class="cgm_account_label"></div>
          <div class="cgm_search_wrap">
            ${icon('search', 'cgm_search_icon')}
            <input type="text" id="cgm_search_input" placeholder="Search by name or ID...">
          </div>
          <button class="cgm_btn cgm_btn_primary cgm_btn_block" id="cgm_new_chat_btn" draggable="false">${icon('plus')} New Chat</button>
          <div id="cgm_stats" class="cgm_stats"></div>
        </div>
        <div class="cgm_scroll_area" id="cgm_scroll_area">
          <div class="cgm_section" id="cgm_pinned_section">
            <div class="cgm_section_header">
              <button class="cgm_icon_btn" data-act="toggle-pinned" draggable="false" tabindex="-1"></button>
              <span class="cgm_section_title">${icon('pin')} Pinned</span>
              <span class="cgm_badge" id="cgm_pinned_count">0</span>
            </div>
            <ul class="cgm_chat_list" id="cgm_pinned_list" data-container-type="pinned" data-container-id=""></ul>
          </div>
          <button class="cgm_btn cgm_btn_block" id="cgm_new_group_btn" draggable="false">${icon('folder-plus')} New Group</button>
          <div class="cgm_section" id="cgm_groups_section"><div id="cgm_groups_list"></div></div>
          <div class="cgm_section" id="cgm_ungrouped_section">
            <div class="cgm_section_header">
              <button class="cgm_icon_btn" data-act="toggle-ungrouped" draggable="false" tabindex="-1"></button>
              <span class="cgm_section_title">${icon('folder')} Ungrouped</span>
              <span class="cgm_badge" id="cgm_ungrouped_count">0</span>
            </div>
            <ul class="cgm_chat_list" id="cgm_ungrouped_list" data-container-type="ungrouped" data-container-id=""></ul>
          </div>
        </div>
      </div>`;
    document.body.appendChild(rootEl);
    panelEl = rootEl.querySelector('#cgm_panel');
    toggleTabEl = rootEl.querySelector('#cgm_toggle_tab');
  }
  function bindStaticControls() {
    panelEl.querySelector('#cgm_logo_btn').addEventListener('click', () => {
      SETTINGS.sidebarOpen = !SETTINGS.sidebarOpen;
      saveData(); applySettingsToDOM();
    });
    panelEl.querySelector('#cgm_refresh_btn').addEventListener('click', (e) => handleRefresh(e.currentTarget));
    panelEl.querySelector('#cgm_settings_btn').addEventListener('click', openSettingsModal);
    toggleTabEl.addEventListener('click', () => { SETTINGS.sidebarOpen = true; saveData(); applySettingsToDOM(); });
    panelEl.querySelector('#cgm_new_chat_btn').addEventListener('click', () => {
      let target;
      try { target = new URL(SETTINGS.newChatHref || '/text/direct', location.origin).toString(); }
      catch (e) { target = SETTINGS.newChatHref || '/text/direct'; }
      window.location.href = target;
    });
    panelEl.querySelector('#cgm_new_group_btn').addEventListener('click', (e) => {
      openPopup({ title: 'New group name', value: '', anchorEl: e.currentTarget, onSave: (val) => { if (val) createGroup(val); } });
    });
    panelEl.querySelector('#cgm_search_input').addEventListener('input', (e) => { searchTerm = e.target.value; renderAll(); });

    panelEl.querySelector('#cgm_pinned_section .cgm_section_header').addEventListener('click', () => {
      ACC.collapse.pinned = !ACC.collapse.pinned; saveData(); renderAll();
    });
    panelEl.querySelector('#cgm_ungrouped_section .cgm_section_header').addEventListener('click', () => {
      ACC.collapse.ungrouped = !ACC.collapse.ungrouped; saveData(); renderAll();
    });

    document.addEventListener('mousedown', (e) => {
      if (!SETTINGS.sidebarOpen) return;
      if (SETTINGS.dockedMode) return;
      if (!SETTINGS.closeOnOutsideClick) return;
      if (rootEl.contains(e.target)) return;
      if (e.target.closest && (e.target.closest('.cgm_popup') || e.target.closest('.cgm_popup_overlay') || e.target.closest('.cgm_modal_overlay'))) return;
      SETTINGS.sidebarOpen = false;
      saveData();
      applySettingsToDOM();
    });
  }

  /* ================= STYLES ================= */
  function injectStyles() {
    if (document.getElementById('cgm_styles')) return;
    const style = document.createElement('style');
    style.id = 'cgm_styles';
    style.textContent = `
    :root{
      --cgm-primary: 60 3% 14%;
      --cgm-secondary: 24 5% 19%;
      --cgm-tertiary: 34 7% 13%;
      --cgm-bg: hsl(var(--cgm-primary));
      --cgm-bg-elevated: hsl(var(--cgm-secondary));
      --cgm-border: hsl(34 7% 26%);
      --cgm-fg: #ebebee;
      --cgm-muted: #9c9ca3;
      --cgm-accent: #6366f1;
      --cgm-accent-rgb: 99, 102, 241;
      --cgm-accent-text: #ffffff;
    }
    #cgm_root{ position:fixed; top:0; height:100vh; z-index:2147483000; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }
    #cgm_root *{ box-sizing:border-box; }
    #cgm_root.cgm_pos_right{ right:0; } #cgm_root.cgm_pos_left{ left:0; }
    .cgm_icon{ width:16px; height:16px; flex-shrink:0; }
    .cgm_panel{ position:absolute; top:0; height:100%; width:320px; background:var(--cgm-bg); color:var(--cgm-fg); display:flex; flex-direction:column; box-shadow:0 0 24px rgba(0,0,0,.4); transition:transform .2s ease; border:1px solid var(--cgm-border); }
    #cgm_root.cgm_docked .cgm_panel{ box-shadow:none; }
    #cgm_root.cgm_pos_right .cgm_panel{ right:0; } #cgm_root.cgm_pos_left .cgm_panel{ left:0; }
    #cgm_root:not(.cgm_open) .cgm_panel{ transform:translateX(100%); }
    #cgm_root.cgm_pos_left:not(.cgm_open) .cgm_panel{ transform:translateX(-100%); }
    .cgm_toggle_tab{ display:none; position:absolute; top:50%; transform:translateY(-50%); width:22px; height:56px; background: var(--cgm-accent); color:var(--cgm-accent-text); align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,.35); }
    #cgm_root:not(.cgm_open) .cgm_toggle_tab{ display:flex; }
    #cgm_root.cgm_pos_right .cgm_toggle_tab{ right:0; border-radius:8px 0 0 8px; }
    #cgm_root.cgm_pos_left .cgm_toggle_tab{ left:0; border-radius:0 8px 8px 0; }
    .cgm_header{ padding:12px; border-bottom:1px solid var(--cgm-border); display:flex; flex-direction:column; gap:8px; }
    .cgm_header_top{ display:flex; align-items:center; justify-content:space-between; }
    .cgm_logo_btn{ display:flex; align-items:center; gap:6px; background:transparent; border:none; color:var(--cgm-fg); font-size:14px; cursor:pointer; padding:4px 6px; border-radius:6px; }
    .cgm_logo_btn:hover{ background: var(--cgm-bg-elevated); }
    .cgm_logo_chevron{ display:flex; color:var(--cgm-muted); margin-left:2px; }
    .cgm_header_actions{ display:flex; gap:4px; }
    .cgm_icon_btn{ background:transparent; border:none; color:var(--cgm-muted); cursor:pointer; padding:6px; border-radius:6px; display:flex; align-items:center; justify-content:center; }
    .cgm_icon_btn:hover{ background:var(--cgm-bg-elevated); color:var(--cgm-fg); }
    .cgm_spin .cgm_icon{ animation:cgm_spin 1s linear infinite; }
    @keyframes cgm_spin{ to{ transform:rotate(360deg); } }
    .cgm_account_label{ display:flex; align-items:center; gap:6px; font-size:11px; color:var(--cgm-muted); }
    .cgm_account_label svg{ width:12px; height:12px; }
    .cgm_search_wrap{ position:relative; display:flex; align-items:center; }
    .cgm_search_wrap .cgm_search_icon{ position:absolute; left:8px; color:var(--cgm-muted); }
    #cgm_search_input{ width:100%; padding:7px 8px 7px 30px; background:var(--cgm-bg-elevated); border:1px solid var(--cgm-border); border-radius:6px; color:var(--cgm-fg); font-size:13px; }
    #cgm_search_input:focus{ outline:none; border-color:var(--cgm-accent); }
    .cgm_stats{ font-size:11px; color:var(--cgm-muted); }
    .cgm_scroll_area{ flex:1; overflow-y:auto; padding:10px 12px; display:flex; flex-direction:column; gap:12px; }
    .cgm_scroll_area::-webkit-scrollbar{ width:8px; }
    .cgm_scroll_area::-webkit-scrollbar-thumb{ background: rgba(var(--cgm-accent-rgb),0.4); border-radius:8px; }
    .cgm_scroll_area::-webkit-scrollbar-track{ background:transparent; }
    .cgm_section_header{ display:flex; align-items:center; gap:6px; margin-bottom:6px; cursor:pointer; user-select:none; border-radius:6px; padding:2px 2px; }
    .cgm_section_header:hover{ background: var(--cgm-bg-elevated); }
    .cgm_section_title{ display:flex; align-items:center; gap:6px; font-size:11px; text-transform:uppercase; letter-spacing:.05em; color:var(--cgm-muted); flex:1; }
    .cgm_chat_list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:2px; min-height:8px; border-radius:6px; }
    .cgm_empty_hint{ font-size:12px; color:var(--cgm-muted); padding:8px; border:1px dashed var(--cgm-border); border-radius:6px; text-align:center; }
    .cgm_chat_item{ display:flex; align-items:center; gap:6px; padding:6px; border-radius:6px; cursor:grab; }
    .cgm_chat_item:hover{ background: var(--cgm-bg-elevated); }
    .cgm_chat_item .cgm_grip{ color:var(--cgm-muted); display:flex; }
    .cgm_chat_item.cgm_active{ background: rgba(var(--cgm-accent-rgb), 0.18); box-shadow: inset 3px 0 0 0 var(--cgm-accent); }
    .cgm_chat_item.cgm_active .cgm_chat_name{ color:var(--cgm-accent); font-weight:600; }
    .cgm_active_dot{ color:var(--cgm-accent); display:flex; }
    .cgm_pin_ind{ color:var(--cgm-accent) !important; padding:4px !important; }
    .cgm_pin_ind:hover{ background:var(--cgm-bg) !important; color:#ff6b6b !important; }
    .cgm_chat_main{ display:flex; align-items:center; gap:6px; flex:1; min-width:0; cursor:pointer; }
    .cgm_chat_icon{ display:flex; align-items:center; flex-shrink:0; color:var(--cgm-muted); }
    .cgm_chat_icon svg{ width:14px; height:14px; }
    .cgm_chat_name{ font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .cgm_mark{ background:var(--cgm-accent); color:var(--cgm-accent-text); border-radius:3px; padding:0 2px; }
    .cgm_more_btn{ opacity:0; }
    .cgm_chat_item:hover .cgm_more_btn{ opacity:1; }
    .cgm_dragging{ opacity:.35; }
    .cgm_drop_before{ box-shadow: inset 0 2px 0 0 var(--cgm-accent); }
    .cgm_drop_after{ box-shadow: inset 0 -2px 0 0 var(--cgm-accent); }
    .cgm_drop_inside_empty{ outline:2px dashed var(--cgm-accent); outline-offset:-2px; }
    .cgm_btn{ background:var(--cgm-bg-elevated); border:1px solid var(--cgm-border); color:var(--cgm-fg); padding:7px 10px; border-radius:6px; font-size:13px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; justify-content:center; }
    .cgm_btn:hover{ border-color:var(--cgm-accent); background: rgba(var(--cgm-accent-rgb),0.08); }
    .cgm_btn_block{ width:100%; }
    .cgm_btn_primary{ background:var(--cgm-accent); border-color:var(--cgm-accent); color:var(--cgm-accent-text); }
    .cgm_btn_primary:hover{ background:var(--cgm-accent); filter:brightness(1.08); }
    .cgm_btn_secondary{ background:transparent; }
    .cgm_btn_danger{ color:#ff6b6b; border-color:#5a2a2a; }
    .cgm_btn_danger_solid{ background:#e5484d; border-color:#e5484d; color:#fff; }
    .cgm_group{ border:1px solid var(--cgm-border); border-left:3px solid rgba(var(--cgm-accent-rgb),0.55); border-radius:8px; margin-bottom:8px; background:var(--cgm-bg-elevated); }
    .cgm_group_header{ display:flex; align-items:center; gap:6px; padding:8px; cursor:pointer; }
    .cgm_group_header .cgm_grip{ cursor:grab; }
    .cgm_group_name{ flex:1; font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .cgm_badge{ font-size:10px; background: rgba(var(--cgm-accent-rgb),0.15); color:var(--cgm-accent); padding:1px 6px; border-radius:10px; }
    .cgm_group .cgm_chat_list{ padding:0 6px 6px 6px; max-height:none; }
    .cgm_group.cgm_collapsed .cgm_chat_list{ display:none; }
    .cgm_popup{
      position:fixed; z-index:2147483647;
      background: var(--cgm-bg-elevated) !important;
      opacity:1 !important;
      border:1px solid var(--cgm-border);
      border-radius:10px; padding:10px; width:230px;
      box-shadow:0 10px 32px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04);
      color: var(--cgm-fg);
    }
    .cgm_popup_overlay{ position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:2147483646; }
    .cgm_popup_title{ font-size:12px; color:var(--cgm-muted); margin-bottom:6px; }
    .cgm_popup_input{ width:100%; padding:6px 8px; background: var(--cgm-bg) !important; border:1px solid var(--cgm-border); border-radius:6px; color:var(--cgm-fg); font-size:13px; margin-bottom:8px; }
    .cgm_popup_actions{ display:flex; justify-content:flex-end; gap:6px; }
    .cgm_menu{ padding:6px; display:flex; flex-direction:column; background: var(--cgm-bg-elevated) !important; }
    .cgm_menu_item{ display:flex; align-items:center; gap:8px; background:transparent; border:none; color:var(--cgm-fg); padding:8px; border-radius:6px; font-size:13px; cursor:pointer; text-align:left; }
    .cgm_menu_item:hover{ background:var(--cgm-bg); }
    .cgm_menu_item_danger{ color:#ff6b6b; }
    .cgm_menu_item_danger:hover{ background:rgba(255,107,107,.12) !important; }
    .cgm_menu_divider{ height:1px; background:var(--cgm-border); margin:4px 0; }
    .cgm_menu_label{ font-size:10px; text-transform:uppercase; color:var(--cgm-muted); padding:4px 8px; }

    .cgm_modal_overlay{ position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:2147483647; display:flex; align-items:center; justify-content:center; }
    .cgm_modal{ background: var(--cgm-bg-elevated) !important; border:1px solid var(--cgm-border); border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,.6); color:var(--cgm-fg); max-height:85vh; display:flex; flex-direction:column; }
    .cgm_modal_header{ display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--cgm-border); }
    .cgm_modal_body{ padding:16px; overflow-y:auto; }
    .cgm_modal_text{ font-size:13px; line-height:1.5; color:var(--cgm-fg); margin:0 0 14px 0; }
    .cgm_modal_actions{ display:flex; justify-content:flex-end; gap:8px; }

    .cgm_tabs{ display:flex; gap:4px; border-bottom:1px solid var(--cgm-border); margin-bottom:14px; overflow-x:auto; }
    .cgm_tab_btn{ background:transparent; border:none; color:var(--cgm-muted); padding:8px 10px; font-size:12px; cursor:pointer; white-space:nowrap; border-bottom:2px solid transparent; }
    .cgm_tab_btn.active{ color:var(--cgm-accent); border-bottom-color:var(--cgm-accent); }

    .cgm_setting_group{ margin-bottom:18px; display:flex; flex-direction:column; gap:8px; }
    .cgm_setting_group:last-child{ margin-bottom:0; }
    .cgm_setting_group label{ font-size:12px; color:var(--cgm-muted); }
    .cgm_setting_hint{ font-size:11px; color:var(--cgm-muted); }
    .cgm_segmented{ display:flex; border:1px solid var(--cgm-border); border-radius:6px; overflow:hidden; }
    .cgm_seg_btn{ flex:1; padding:7px; background:var(--cgm-bg); border:none; color:var(--cgm-fg); cursor:pointer; font-size:12px; }
    .cgm_seg_btn.active{ background:var(--cgm-accent); color:var(--cgm-accent-text); }
    .cgm_swatches{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
    .cgm_swatch{ width:24px; height:24px; border-radius:50%; border:2px solid transparent; cursor:pointer; }
    .cgm_swatch.active{ border-color:#fff; }
    #cgm_custom_color, #cgm_accent_text_custom{ width:28px; height:28px; padding:0; border:none; background:none; cursor:pointer; }
    .cgm_row_btns{ display:flex; gap:8px; flex-wrap:wrap; }
    .cgm_readonly_box{ font-size:12px; padding:7px 8px; background:var(--cgm-bg); border:1px solid var(--cgm-border); border-radius:6px; color:var(--cgm-fg); word-break:break-all; }
    .cgm_text_input{ width:100%; padding:7px 8px; background:var(--cgm-bg); border:1px solid var(--cgm-border); border-radius:6px; color:var(--cgm-fg); font-size:13px; }
    .cgm_text_input:focus{ outline:none; border-color:var(--cgm-accent); }
    input[type=range]{ accent-color: var(--cgm-accent); width:100%; }

    .cgm_account_list{ display:flex; flex-direction:column; gap:6px; max-height:220px; overflow-y:auto; margin-bottom:8px; }
    .cgm_account_item{ display:flex; align-items:center; gap:8px; padding:8px; border-radius:8px; border:1px solid var(--cgm-border); background:var(--cgm-bg); cursor:pointer; font-size:13px; transition: background .12s ease, border-color .12s ease; }
    .cgm_account_item:hover{ border-color:var(--cgm-accent); background: rgba(var(--cgm-accent-rgb),0.08); }
    .cgm_account_item.active{ border-color:var(--cgm-accent); background: rgba(var(--cgm-accent-rgb),0.16); cursor:default; }
    .cgm_account_item_icon{ display:flex; color:var(--cgm-muted); flex-shrink:0; }
    .cgm_account_item.active .cgm_account_item_icon{ color:var(--cgm-accent); }
    .cgm_account_item_name{ flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .cgm_account_item_badge{ font-size:10px; background:var(--cgm-accent); color:var(--cgm-accent-text); padding:2px 6px; border-radius:10px; flex-shrink:0; }
    .cgm_account_item_delete{ opacity:0; flex-shrink:0; }
    .cgm_account_item:hover .cgm_account_item_delete{ opacity:1; }
    `;
    document.head.appendChild(style);
  }

  /* ================= INIT ================= */
  function init() {
    injectStyles();
    buildDOM();
    bindDelegatedEvents();
    bindStaticControls();
    applySettingsToDOM();
    quickInitialScan();
    renderAll();
    applyOriginalSidebarTweaks();
    startHeartbeat();
  }
  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
