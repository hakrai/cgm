(function () {
    'use strict';
    if (window.__cgm_injected) { console.warn('Chat Group Manager already injected.'); return; }
    window.__cgm_injected = true;

    /* ================= CONSTANTS ================= */
    const STORAGE_KEY = 'cgm_data_v1';
    const SIDEBAR_SELECTOR = '[data-sidebar="content"]';
    const ACCENT_PRESETS = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#64748b'];

    /* ================= ICONS (lucide-style inline SVG) ================= */
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
        'circle-dot': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/>'
    };
    function icon(name, cls) {
        return `<svg class="cgm_icon ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
    }

    /* ================= STATE ================= */
    function defaultData() {
        return {
            chats: {},
            groups: [],
            order: { pinned: [], ungrouped: [], byGroup: {} },
            settings: {
                scrollDelay: 2,
                sidebarPosition: 'right',
                accent: '#6366f1',
                accentTextMode: 'auto', // 'auto' | 'light' | 'dark' | 'custom'
                accentTextColor: '#ffffff',
                sidebarOpen: true,
                closeOnOutsideClick: true,
                showChatIcons: true
            },
            collapse: { pinned: false, ungrouped: true }
        };
    }
    let DATA = loadData();
    let searchTerm = '';
    let dragState = null;
    let pendingDrop = null;
    let rootEl, panelEl, toggleTabEl;
    let lastUrl = location.href;

    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const d = defaultData();
                d.chats = parsed.chats || {};
                d.groups = parsed.groups || [];
                d.order.pinned = (parsed.order && parsed.order.pinned) || [];
                d.order.ungrouped = (parsed.order && parsed.order.ungrouped) || [];
                d.order.byGroup = (parsed.order && parsed.order.byGroup) || {};
                d.settings = Object.assign(d.settings, parsed.settings || {});
                d.collapse = Object.assign(d.collapse, parsed.collapse || {});
                return d;
            }
        } catch (e) { console.error('CGM: failed to load data', e); }
        return defaultData();
    }
    function saveData() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA)); }
        catch (e) { console.error('CGM: failed to save data', e); }
    }

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
        if (groupId) { if (!DATA.order.byGroup[groupId]) DATA.order.byGroup[groupId] = []; return DATA.order.byGroup[groupId]; }
        return DATA.order.ungrouped;
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
        const mode = DATA.settings.accentTextMode || 'auto';
        if (mode === 'light') return '#ffffff';
        if (mode === 'dark') return '#0a0a0a';
        if (mode === 'custom') return DATA.settings.accentTextColor || '#ffffff';
        try {
            const { r, g, b } = hexToRgb(DATA.settings.accent);
            const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            return lum > 0.6 ? '#0a0a0a' : '#ffffff';
        } catch (e) { return '#ffffff'; }
    }

    /* ================= MODALS (replace native alert/confirm) ================= */
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
            if (DATA.chats[id]) {
                const c = DATA.chats[id];
                if (!c.customName && name) c.name = name;
                c.url = url;
                if (iconHtml) c.iconHtml = iconHtml;
            } else {
                DATA.chats[id] = { id, name: name || id, url, groupId: null, pinned: false, customName: false, iconHtml };
                DATA.order.ungrouped.unshift(id);
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
            await autoScrollAndLoad(container, DATA.settings.scrollDelay);
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
        const chat = DATA.chats[chatId]; if (!chat) return;
        chat.pinned = !chat.pinned;
        if (chat.pinned) { if (!DATA.order.pinned.includes(chatId)) DATA.order.pinned.push(chatId); }
        else { removeIdFromArray(DATA.order.pinned, chatId); }
        saveData(); renderAll();
    }
    function moveChatToGroup(chatId, targetGroupId) {
        const chat = DATA.chats[chatId]; if (!chat) return;
        const oldArr = getHomeArray(chat.groupId);
        removeIdFromArray(oldArr, chatId);
        chat.groupId = targetGroupId || null;
        getHomeArray(chat.groupId).unshift(chatId);
        saveData(); renderAll();
    }
    function createGroup(name) {
        const g = { id: genId('g'), name: name || 'New Group', collapsed: true };
        DATA.groups.push(g);
        DATA.order.byGroup[g.id] = [];
        saveData(); renderAll();
    }
    async function deleteGroup(groupId) {
        const group = DATA.groups.find(g => g.id === groupId); if (!group) return;
        const ok = await showConfirm(`Delete group "${group.name}"?\n\nIts chats will move to Ungrouped (kept at the top).`, 'Delete Group', true);
        if (!ok) return;
        const arr = DATA.order.byGroup[groupId] || [];
        arr.forEach(chatId => { const c = DATA.chats[chatId]; if (c) c.groupId = null; });
        DATA.order.ungrouped = arr.concat(DATA.order.ungrouped.filter(id => !arr.includes(id)));
        delete DATA.order.byGroup[groupId];
        DATA.groups = DATA.groups.filter(g => g.id !== groupId);
        saveData(); renderAll();
    }
    async function deleteChat(chatId) {
        const chat = DATA.chats[chatId]; if (!chat) return;
        const ok = await showConfirm(`Delete "${chat.name}" from Chat Groups?\n\nThis only removes it from the manager (pins/groups/name). It does NOT delete the actual chat from the website.`, 'Delete Chat', true);
        if (!ok) return;
        removeIdFromArray(DATA.order.pinned, chatId);
        removeIdFromArray(DATA.order.ungrouped, chatId);
        Object.keys(DATA.order.byGroup).forEach(gid => removeIdFromArray(DATA.order.byGroup[gid], chatId));
        delete DATA.chats[chatId];
        saveData(); renderAll();
    }

    /* ================= DRAG & DROP (event delegation - robust) ================= */
    function handleChatDrop(ds, pd) {
        const chat = DATA.chats[ds.id]; if (!chat) return;
        if (pd.containerType === 'pinned') {
            chat.pinned = true;
            insertAtDropTarget(DATA.order.pinned, ds.id, pd);
        } else {
            if (ds.sourceType === 'pinned') { chat.pinned = false; removeIdFromArray(DATA.order.pinned, ds.id); }
            const oldArr = getHomeArray(chat.groupId);
            removeIdFromArray(oldArr, ds.id);
            chat.groupId = pd.containerType === 'group' ? pd.containerId : null;
            const newArr = getHomeArray(chat.groupId);
            insertAtDropTarget(newArr, ds.id, pd);
        }
    }
    function handleGroupDrop(ds, pd) {
        const idx = DATA.groups.findIndex(g => g.id === ds.id);
        if (idx === -1) return;
        const [group] = DATA.groups.splice(idx, 1);
        const targetIdx = DATA.groups.findIndex(g => g.id === pd.targetGroupId);
        if (targetIdx === -1) { DATA.groups.push(group); return; }
        DATA.groups.splice(pd.before ? targetIdx : targetIdx + 1, 0, group);
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
                try { e.dataTransfer.setData('text/plain', item.dataset.id); } catch (err) { }
            } else if (groupHeader) {
                const groupEl = groupHeader.closest('.cgm_group');
                dragState = { type: 'group', id: groupHeader.dataset.id };
                if (groupEl) groupEl.classList.add('cgm_dragging');
                e.dataTransfer.effectAllowed = 'move';
                try { e.dataTransfer.setData('text/plain', groupHeader.dataset.id); } catch (err) { }
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

    /* ================= ANCHORED POPUPS (rename / new group / chat menu / group menu) ================= */
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
        const chat = DATA.chats[chatId]; if (!chat) return;
        closeAllPopups();
        const overlay = document.createElement('div');
        overlay.className = 'cgm_popup_overlay';
        document.body.appendChild(overlay);

        const menu = document.createElement('div');
        menu.className = 'cgm_popup cgm_menu';
        const groupsHtml = `<button class="cgm_menu_item" data-move="">${icon('folder')} Ungrouped</button>` +
            DATA.groups.map(g => `<button class="cgm_menu_item" data-move="${g.id}">${icon('folder')} ${escapeHtml(g.name)}</button>`).join('');
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

    /* ================= ACTIVE NAV INDICATOR ================= */
    function highlightActiveChat() {
        const currentId = extractId(location.href);
        panelEl.querySelectorAll('.cgm_chat_item').forEach(el => {
            el.classList.toggle('cgm_active', !!currentId && el.dataset.id === currentId);
        });
    }
    function watchUrlChanges() {
        setInterval(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                highlightActiveChat();
            }
        }, 800);
    }

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
        const showIcon = DATA.settings.showChatIcons !== false && chat.iconHtml;
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
        const rawArr = DATA.order.byGroup[group.id] || (DATA.order.byGroup[group.id] = []);
        const validIds = rawArr.filter(id => DATA.chats[id] && DATA.chats[id].groupId === group.id);
        DATA.order.byGroup[group.id] = validIds;
        const ordered = validIds.filter(id => DATA.chats[id].pinned).concat(validIds.filter(id => !DATA.chats[id].pinned));
        const filtered = ordered.filter(id => matchesSearch(DATA.chats[id]));
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
            filtered.forEach(id => ul.appendChild(buildChatEl(DATA.chats[id])));
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
        DATA.order.pinned = DATA.order.pinned.filter(id => DATA.chats[id] && DATA.chats[id].pinned);
        const filtered = DATA.order.pinned.filter(id => matchesSearch(DATA.chats[id]));
        const effectiveCollapsed = DATA.collapse.pinned && !searchTerm;

        const section = panelEl.querySelector('#cgm_pinned_section');
        const toggleBtn = section.querySelector('[data-act="toggle-pinned"]');
        toggleBtn.innerHTML = icon(effectiveCollapsed ? 'chevron-right' : 'chevron-down');
        section.querySelector('#cgm_pinned_count').textContent = DATA.order.pinned.length;

        const wrap = panelEl.querySelector('#cgm_pinned_list');
        wrap.style.display = effectiveCollapsed ? 'none' : 'flex';
        wrap.innerHTML = '';
        if (filtered.length === 0) {
            const hint = document.createElement('div');
            hint.className = 'cgm_empty_hint';
            hint.textContent = searchTerm ? 'No matches' : 'No pinned chats — drag chats here';
            wrap.appendChild(hint);
        } else {
            filtered.forEach(id => wrap.appendChild(buildChatEl(DATA.chats[id])));
        }
    }
    function renderGroups() {
        const wrap = panelEl.querySelector('#cgm_groups_list');
        wrap.innerHTML = '';
        DATA.groups.forEach(g => wrap.appendChild(buildGroupEl(g)));
    }
    function renderUngrouped() {
        DATA.order.ungrouped = DATA.order.ungrouped.filter(id => DATA.chats[id] && DATA.chats[id].groupId === null);
        const ordered = DATA.order.ungrouped.filter(id => DATA.chats[id].pinned).concat(DATA.order.ungrouped.filter(id => !DATA.chats[id].pinned));
        const filtered = ordered.filter(id => matchesSearch(DATA.chats[id]));
        const effectiveCollapsed = DATA.collapse.ungrouped && !searchTerm;

        const section = panelEl.querySelector('#cgm_ungrouped_section');
        const toggleBtn = section.querySelector('[data-act="toggle-ungrouped"]');
        toggleBtn.innerHTML = icon(effectiveCollapsed ? 'chevron-right' : 'chevron-down');
        section.querySelector('#cgm_ungrouped_count').textContent = DATA.order.ungrouped.length;

        const wrap = panelEl.querySelector('#cgm_ungrouped_list');
        wrap.style.display = effectiveCollapsed ? 'none' : 'flex';
        wrap.innerHTML = '';
        if (filtered.length === 0) {
            const hint = document.createElement('div');
            hint.className = 'cgm_empty_hint';
            hint.textContent = searchTerm ? 'No matches' : 'No ungrouped chats';
            wrap.appendChild(hint);
        } else {
            filtered.forEach(id => wrap.appendChild(buildChatEl(DATA.chats[id])));
        }
    }
    function applySettingsToDOM() {
        const pos = DATA.settings.sidebarPosition;
        rootEl.classList.toggle('cgm_pos_left', pos === 'left');
        rootEl.classList.toggle('cgm_pos_right', pos !== 'left');
        rootEl.classList.toggle('cgm_open', !!DATA.settings.sidebarOpen);
        rootEl.style.setProperty('--cgm-accent', DATA.settings.accent);
        document.documentElement.style.setProperty('--cgm-accent', DATA.settings.accent);
        const accentText = computeAccentTextColor();
        rootEl.style.setProperty('--cgm-accent-text', accentText);
        document.documentElement.style.setProperty('--cgm-accent-text', accentText);
        toggleTabEl.innerHTML = icon(pos === 'left' ? 'chevron-right' : 'chevron-left');
    }
    function renderAll() {
        applySettingsToDOM();
        renderPinned();
        renderGroups();
        renderUngrouped();
        highlightActiveChat();
        const total = Object.keys(DATA.chats).length;
        const statsEl = panelEl.querySelector('#cgm_stats');
        if (statsEl) statsEl.textContent = total ? `${total} chat${total !== 1 ? 's' : ''} · ${DATA.groups.length} group${DATA.groups.length !== 1 ? 's' : ''}` : 'No chats found yet — open sidebar & click refresh';
    }

    /* ================= SETTINGS MODAL ================= */
    function exportData() {
        const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'chat-groups-backup-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a); a.click(); a.remove();
    }
    function openSettingsModal() {
        const wait = Math.max(DATA.settings.scrollDelay - 0.5, 0.3).toFixed(1);
        openCenteredModal({
            title: 'Settings',
            width: 380,
            bodyBuilder: (body) => {
                const textMode = DATA.settings.accentTextMode || 'auto';
                body.innerHTML = `
          <div class="cgm_setting_group">
            <label>Scroll Delay: <span id="cgm_delay_label">${DATA.settings.scrollDelay}s</span> (content wait: <span id="cgm_wait_label">${wait}s</span>)</label>
            <input type="range" id="cgm_delay_slider" min="1" max="60" step="0.5" value="${DATA.settings.scrollDelay}">
          </div>
          <div class="cgm_setting_group">
            <label>Sidebar Position</label>
            <div class="cgm_segmented">
              <button data-pos="left" class="cgm_seg_btn ${DATA.settings.sidebarPosition === 'left' ? 'active' : ''}">Left</button>
              <button data-pos="right" class="cgm_seg_btn ${DATA.settings.sidebarPosition === 'right' ? 'active' : ''}">Right</button>
            </div>
          </div>
          <div class="cgm_setting_group">
            <label>Close sidebar on outside click</label>
            <div class="cgm_segmented">
              <button data-outside="true" class="cgm_seg_btn ${DATA.settings.closeOnOutsideClick ? 'active' : ''}">Enabled</button>
              <button data-outside="false" class="cgm_seg_btn ${!DATA.settings.closeOnOutsideClick ? 'active' : ''}">Disabled</button>
            </div>
            <div class="cgm_setting_hint">When disabled, use the ✕ button to close the sidebar.</div>
          </div>
          <div class="cgm_setting_group">
            <label>Show Chat Icons</label>
            <div class="cgm_segmented">
              <button data-icons="true" class="cgm_seg_btn ${DATA.settings.showChatIcons !== false ? 'active' : ''}">Enabled</button>
              <button data-icons="false" class="cgm_seg_btn ${DATA.settings.showChatIcons === false ? 'active' : ''}">Disabled</button>
            </div>
            <div class="cgm_setting_hint">Uses the site's own chat icon (if present) next to the chat name.</div>
          </div>
          <div class="cgm_setting_group">
            <label>Accent Color</label>
            <div class="cgm_swatches">
              ${ACCENT_PRESETS.map(c => `<button class="cgm_swatch ${DATA.settings.accent === c ? 'active' : ''}" data-color="${c}" style="background:${c}"></button>`).join('')}
              <input type="color" id="cgm_custom_color" value="${DATA.settings.accent}">
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
            <input type="color" id="cgm_accent_text_custom" value="${DATA.settings.accentTextColor || '#ffffff'}" style="${textMode === 'custom' ? '' : 'display:none'}">
            <div class="cgm_setting_hint">Auto picks black/white text based on accent brightness — useful when choosing light accent colors.</div>
          </div>
          <div class="cgm_setting_group">
            <label>Backup</label>
            <div class="cgm_row_btns">
              <button class="cgm_btn" id="cgm_export_btn">${icon('download')} Export</button>
              <button class="cgm_btn" id="cgm_import_btn">${icon('upload')} Import</button>
              <input type="file" id="cgm_import_file" accept="application/json" style="display:none">
            </div>
          </div>
          <div class="cgm_setting_group">
            <button class="cgm_btn cgm_btn_danger cgm_btn_block" id="cgm_reset_btn">${icon('trash-2')} Reset All Data</button>
          </div>`;

                const slider = body.querySelector('#cgm_delay_slider');
                slider.addEventListener('input', () => {
                    const v = parseFloat(slider.value);
                    DATA.settings.scrollDelay = v;
                    body.querySelector('#cgm_delay_label').textContent = v + 's';
                    body.querySelector('#cgm_wait_label').textContent = Math.max(v - 0.5, 0.3).toFixed(1) + 's';
                    saveData();
                });
                body.querySelectorAll('[data-pos]').forEach(btn => {
                    btn.onclick = () => {
                        DATA.settings.sidebarPosition = btn.dataset.pos;
                        saveData(); applySettingsToDOM();
                        body.querySelectorAll('[data-pos]').forEach(b => b.classList.toggle('active', b === btn));
                    };
                });
                body.querySelectorAll('[data-outside]').forEach(btn => {
                    btn.onclick = () => {
                        DATA.settings.closeOnOutsideClick = btn.dataset.outside === 'true';
                        saveData();
                        body.querySelectorAll('[data-outside]').forEach(b => b.classList.toggle('active', b === btn));
                    };
                });
                body.querySelectorAll('[data-icons]').forEach(btn => {
                    btn.onclick = () => {
                        DATA.settings.showChatIcons = btn.dataset.icons === 'true';
                        saveData(); renderAll();
                        body.querySelectorAll('[data-icons]').forEach(b => b.classList.toggle('active', b === btn));
                    };
                });
                body.querySelectorAll('.cgm_swatch').forEach(btn => {
                    btn.onclick = () => {
                        DATA.settings.accent = btn.dataset.color;
                        saveData(); applySettingsToDOM();
                        body.querySelectorAll('.cgm_swatch').forEach(b => b.classList.toggle('active', b === btn));
                        body.querySelector('#cgm_custom_color').value = btn.dataset.color;
                        // refresh auto-computed text color preview if in auto mode
                        if ((DATA.settings.accentTextMode || 'auto') === 'auto') applySettingsToDOM();
                    };
                });
                body.querySelector('#cgm_custom_color').addEventListener('input', (e) => {
                    DATA.settings.accent = e.target.value;
                    saveData(); applySettingsToDOM();
                });
                body.querySelectorAll('[data-textmode]').forEach(btn => {
                    btn.onclick = () => {
                        DATA.settings.accentTextMode = btn.dataset.textmode;
                        saveData(); applySettingsToDOM();
                        body.querySelectorAll('[data-textmode]').forEach(b => b.classList.toggle('active', b === btn));
                        body.querySelector('#cgm_accent_text_custom').style.display = btn.dataset.textmode === 'custom' ? 'inline-block' : 'none';
                    };
                });
                body.querySelector('#cgm_accent_text_custom').addEventListener('input', (e) => {
                    DATA.settings.accentTextColor = e.target.value;
                    DATA.settings.accentTextMode = 'custom';
                    saveData(); applySettingsToDOM();
                    body.querySelectorAll('[data-textmode]').forEach(b => b.classList.toggle('active', b.dataset.textmode === 'custom'));
                });
                body.querySelector('#cgm_export_btn').onclick = exportData;
                body.querySelector('#cgm_import_btn').onclick = () => body.querySelector('#cgm_import_file').click();
                body.querySelector('#cgm_import_file').addEventListener('change', (e) => {
                    const file = e.target.files[0]; if (!file) return;
                    const reader = new FileReader();
                    reader.onload = async () => {
                        try {
                            const parsed = JSON.parse(reader.result);
                            if (!parsed.chats || !parsed.groups || !parsed.order) throw new Error('Invalid backup file');
                            DATA = Object.assign(defaultData(), parsed, {
                                settings: Object.assign(defaultData().settings, parsed.settings || {}),
                                collapse: Object.assign(defaultData().collapse, parsed.collapse || {})
                            });
                            saveData(); renderAll();
                            await showAlert('Backup imported successfully.', 'Import Complete');
                        } catch (err) {
                            await showAlert('Failed to import backup: ' + err.message, 'Import Failed');
                        }
                    };
                    reader.readAsText(file);
                });
                body.querySelector('#cgm_reset_btn').onclick = async () => {
                    const ok = await showConfirm('This will erase all groups, pins and renames. Continue?', 'Reset All Data', true);
                    if (ok) { DATA = defaultData(); saveData(); renderAll(); }
                };
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
            <span class="cgm_logo">${icon('folder')} <b>Chat Groups</b></span>
            <div class="cgm_header_actions">
              <button class="cgm_icon_btn" id="cgm_refresh_btn" draggable="false" title="Refresh from sidebar">${icon('refresh-cw')}</button>
              <button class="cgm_icon_btn" id="cgm_settings_btn" draggable="false" title="Settings">${icon('settings')}</button>
              <button class="cgm_icon_btn" id="cgm_close_btn" draggable="false" title="Close panel">${icon('x')}</button>
            </div>
          </div>
          <div class="cgm_search_wrap">
            ${icon('search', 'cgm_search_icon')}
            <input type="text" id="cgm_search_input" placeholder="Search by name or ID...">
          </div>
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
        panelEl.querySelector('#cgm_refresh_btn').addEventListener('click', (e) => handleRefresh(e.currentTarget));
        panelEl.querySelector('#cgm_settings_btn').addEventListener('click', openSettingsModal);
        panelEl.querySelector('#cgm_close_btn').addEventListener('click', () => { DATA.settings.sidebarOpen = false; saveData(); applySettingsToDOM(); });
        toggleTabEl.addEventListener('click', () => { DATA.settings.sidebarOpen = true; saveData(); applySettingsToDOM(); });
        panelEl.querySelector('#cgm_new_group_btn').addEventListener('click', (e) => {
            openPopup({ title: 'New group name', value: '', anchorEl: e.currentTarget, onSave: (val) => { if (val) createGroup(val); } });
        });
        panelEl.querySelector('#cgm_search_input').addEventListener('input', (e) => { searchTerm = e.target.value; renderAll(); });

        // Single-click-to-toggle on entire Pinned / Ungrouped section headers
        panelEl.querySelector('#cgm_pinned_section .cgm_section_header').addEventListener('click', () => {
            DATA.collapse.pinned = !DATA.collapse.pinned; saveData(); renderAll();
        });
        panelEl.querySelector('#cgm_ungrouped_section .cgm_section_header').addEventListener('click', () => {
            DATA.collapse.ungrouped = !DATA.collapse.ungrouped; saveData(); renderAll();
        });

        // Auto-close sidebar when clicking outside (configurable in Settings)
        document.addEventListener('mousedown', (e) => {
            if (!DATA.settings.sidebarOpen) return;
            if (!DATA.settings.closeOnOutsideClick) return;
            if (rootEl.contains(e.target)) return;
            if (e.target.closest && (e.target.closest('.cgm_popup') || e.target.closest('.cgm_popup_overlay') || e.target.closest('.cgm_modal_overlay'))) return;
            DATA.settings.sidebarOpen = false;
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
      --cgm-accent-text: #ffffff;
    }
    #cgm_root{ position:fixed; top:0; height:100vh; z-index:2147483000; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }
    #cgm_root *{ box-sizing:border-box; }
    #cgm_root.cgm_pos_right{ right:0; } #cgm_root.cgm_pos_left{ left:0; }
    .cgm_icon{ width:16px; height:16px; flex-shrink:0; }
    .cgm_panel{ position:absolute; top:0; height:100%; width:320px; background:var(--cgm-bg); color:var(--cgm-fg); display:flex; flex-direction:column; box-shadow:0 0 24px rgba(0,0,0,.4); transition:transform .2s ease; border:1px solid var(--cgm-border); }
    #cgm_root.cgm_pos_right .cgm_panel{ right:0; } #cgm_root.cgm_pos_left .cgm_panel{ left:0; }
    #cgm_root:not(.cgm_open) .cgm_panel{ transform:translateX(100%); }
    #cgm_root.cgm_pos_left:not(.cgm_open) .cgm_panel{ transform:translateX(-100%); }
    .cgm_toggle_tab{ display:none; position:absolute; top:50%; transform:translateY(-50%); width:22px; height:56px; background:var(--cgm-accent); color:var(--cgm-accent-text, #fff); align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,.35); }
    #cgm_root:not(.cgm_open) .cgm_toggle_tab{ display:flex; }
    #cgm_root.cgm_pos_right .cgm_toggle_tab{ right:0; border-radius:8px 0 0 8px; }
    #cgm_root.cgm_pos_left .cgm_toggle_tab{ left:0; border-radius:0 8px 8px 0; }
    .cgm_header{ padding:12px; border-bottom:1px solid var(--cgm-border); display:flex; flex-direction:column; gap:8px; }
    .cgm_header_top{ display:flex; align-items:center; justify-content:space-between; }
    .cgm_logo{ display:flex; align-items:center; gap:6px; font-size:14px; }
    .cgm_header_actions{ display:flex; gap:4px; }
    .cgm_icon_btn{ background:transparent; border:none; color:var(--cgm-muted); cursor:pointer; padding:6px; border-radius:6px; display:flex; align-items:center; justify-content:center; }
    .cgm_icon_btn:hover{ background:var(--cgm-bg-elevated); color:var(--cgm-fg); }
    .cgm_spin .cgm_icon{ animation:cgm_spin 1s linear infinite; }
    @keyframes cgm_spin{ to{ transform:rotate(360deg); } }
    .cgm_search_wrap{ position:relative; display:flex; align-items:center; }
    .cgm_search_wrap .cgm_search_icon{ position:absolute; left:8px; color:var(--cgm-muted); }
    #cgm_search_input{ width:100%; padding:7px 8px 7px 30px; background:var(--cgm-bg-elevated); border:1px solid var(--cgm-border); border-radius:6px; color:var(--cgm-fg); font-size:13px; }
    #cgm_search_input:focus{ outline:none; border-color:var(--cgm-accent); }
    .cgm_stats{ font-size:11px; color:var(--cgm-muted); }
    .cgm_scroll_area{ flex:1; overflow-y:auto; padding:10px 12px; display:flex; flex-direction:column; gap:12px; }
    .cgm_section_header{ display:flex; align-items:center; gap:6px; margin-bottom:6px; cursor:pointer; user-select:none; border-radius:6px; padding:2px 2px; }
    .cgm_section_header:hover{ background:var(--cgm-bg-elevated); }
    .cgm_section_title{ display:flex; align-items:center; gap:6px; font-size:11px; text-transform:uppercase; letter-spacing:.05em; color:var(--cgm-muted); flex:1; }
    .cgm_chat_list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:2px; min-height:8px; border-radius:6px; }
    .cgm_empty_hint{ font-size:12px; color:var(--cgm-muted); padding:8px; border:1px dashed var(--cgm-border); border-radius:6px; text-align:center; }
    .cgm_chat_item{ display:flex; align-items:center; gap:6px; padding:6px; border-radius:6px; cursor:grab; }
    .cgm_chat_item:hover{ background:var(--cgm-bg-elevated); }
    .cgm_chat_item .cgm_grip{ color:var(--cgm-muted); display:flex; }
    .cgm_chat_item.cgm_active{ background:var(--cgm-bg-elevated); box-shadow: inset 3px 0 0 0 var(--cgm-accent); }
    .cgm_chat_item.cgm_active .cgm_chat_name{ color:var(--cgm-accent); font-weight:600; }
    .cgm_active_dot{ color:var(--cgm-accent); display:flex; }
    .cgm_pin_ind{ color:var(--cgm-accent) !important; padding:4px !important; }
    .cgm_pin_ind:hover{ background:var(--cgm-bg) !important; color:#ff6b6b !important; }
    .cgm_chat_main{ display:flex; align-items:center; gap:6px; flex:1; min-width:0; cursor:pointer; }
    .cgm_chat_icon{ display:flex; align-items:center; flex-shrink:0; color:var(--cgm-muted); }
    .cgm_chat_icon svg{ width:14px; height:14px; }
    .cgm_chat_name{ font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .cgm_mark{ background:var(--cgm-accent); color:var(--cgm-accent-text, #fff); border-radius:3px; padding:0 2px; }
    .cgm_more_btn{ opacity:0; }
    .cgm_chat_item:hover .cgm_more_btn{ opacity:1; }
    .cgm_dragging{ opacity:.35; }
    .cgm_drop_before{ box-shadow: inset 0 2px 0 0 var(--cgm-accent); }
    .cgm_drop_after{ box-shadow: inset 0 -2px 0 0 var(--cgm-accent); }
    .cgm_drop_inside_empty{ outline:2px dashed var(--cgm-accent); outline-offset:-2px; }
    .cgm_btn{ background:var(--cgm-bg-elevated); border:1px solid var(--cgm-border); color:var(--cgm-fg); padding:7px 10px; border-radius:6px; font-size:13px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; justify-content:center; }
    .cgm_btn:hover{ border-color:var(--cgm-accent); }
    .cgm_btn_block{ width:100%; }
    .cgm_btn_primary{ background:var(--cgm-accent); border-color:var(--cgm-accent); color:var(--cgm-accent-text, #fff); }
    .cgm_btn_secondary{ background:transparent; }
    .cgm_btn_danger{ color:#ff6b6b; border-color:#5a2a2a; }
    .cgm_btn_danger_solid{ background:#e5484d; border-color:#e5484d; color:#fff; }
    .cgm_group{ border:1px solid var(--cgm-border); border-radius:8px; margin-bottom:8px; background:var(--cgm-bg-elevated); }
    .cgm_group_header{ display:flex; align-items:center; gap:6px; padding:8px; cursor:pointer; }
    .cgm_group_header .cgm_grip{ cursor:grab; }
    .cgm_group_name{ flex:1; font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .cgm_badge{ font-size:10px; background:var(--cgm-border); color:var(--cgm-muted); padding:1px 6px; border-radius:10px; }
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

    .cgm_setting_group{ margin-bottom:18px; display:flex; flex-direction:column; gap:8px; }
    .cgm_setting_group:last-child{ margin-bottom:0; }
    .cgm_setting_group label{ font-size:12px; color:var(--cgm-muted); }
    .cgm_setting_hint{ font-size:11px; color:var(--cgm-muted); }
    .cgm_segmented{ display:flex; border:1px solid var(--cgm-border); border-radius:6px; overflow:hidden; }
    .cgm_seg_btn{ flex:1; padding:7px; background:var(--cgm-bg); border:none; color:var(--cgm-fg); cursor:pointer; font-size:12px; }
    .cgm_seg_btn.active{ background:var(--cgm-accent); color:var(--cgm-accent-text, #fff); }
    .cgm_swatches{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
    .cgm_swatch{ width:24px; height:24px; border-radius:50%; border:2px solid transparent; cursor:pointer; }
    .cgm_swatch.active{ border-color:#fff; }
    #cgm_custom_color, #cgm_accent_text_custom{ width:28px; height:28px; padding:0; border:none; background:none; cursor:pointer; }
    .cgm_row_btns{ display:flex; gap:8px; flex-wrap:wrap; }
    input[type=range]{ accent-color: var(--cgm-accent); width:100%; }
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
        watchUrlChanges();
    }
    if (document.body) init();
    else document.addEventListener('DOMContentLoaded', init);
})();
