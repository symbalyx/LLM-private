/* =====================================================================
   Symbalyx Element Skin v4
   But : transformer l'iframe Element brute en interface plus premium.
   Inspiration visuelle : densité Telegram + cartes/profils Instagram.
   ===================================================================== */
:root {
  --sy-bg: #070b14;
  --sy-panel: rgba(12, 18, 31, .92);
  --sy-panel-2: rgba(19, 26, 43, .9);
  --sy-border: rgba(148, 163, 184, .16);
  --sy-border-strong: rgba(129, 140, 248, .32);
  --sy-text: #eef4ff;
  --sy-muted: #93a4bc;
  --sy-blue: #4f7cff;
  --sy-violet: #8b5cf6;
  --sy-pink: #ec4899;
  --sy-green: #35d89f;
  --sy-shadow: 0 22px 70px rgba(0, 0, 0, .48);
  --sy-radius: 22px;
}

html, body,
.mx_MatrixChat,
.mx_LoggedInView,
.mx_MainSplit,
.mx_RoomView,
.mx_RightPanel,
.mx_LeftPanel,
.mx_HomePage,
.mx_MatrixChat_wrapper {
  background: var(--sy-bg) !important;
}

body {
  color: var(--sy-text) !important;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 8% 5%, rgba(79, 124, 255, .22), transparent 30%),
    radial-gradient(circle at 86% 4%, rgba(236, 72, 153, .17), transparent 32%),
    radial-gradient(circle at 50% 100%, rgba(53, 216, 159, .10), transparent 35%),
    linear-gradient(180deg, #080b16 0%, #05070d 100%);
  z-index: 0;
}

.mx_MatrixChat > *, .mx_LoggedInView > * { position: relative; z-index: 1; }

/* Layout général */
.mx_LeftPanel, .mx_SpacePanel, .mx_RoomSublist, .mx_RoomList, .mx_LeftPanel_roomListContainer {
  background: rgba(8, 12, 22, .78) !important;
  backdrop-filter: blur(22px) saturate(150%) !important;
}

.mx_LeftPanel {
  border-right: 1px solid var(--sy-border) !important;
  box-shadow: inset -1px 0 0 rgba(255,255,255,.03) !important;
}

.mx_RoomView {
  border-radius: 22px 0 0 0 !important;
  overflow: hidden !important;
}

.mx_RoomView_body,
.mx_RoomView_MessageList,
.mx_RoomView_timeline,
.mx_MessagePanel,
.mx_ScrollPanel {
  background:
    linear-gradient(180deg, rgba(10, 15, 26, .52), rgba(7, 10, 18, .98)),
    radial-gradient(circle at 58% 10%, rgba(79, 124, 255, .08), transparent 38%) !important;
}

/* Header chat */
.mx_RoomHeader, .mx_RoomHeader_wrapper, .mx_TopUnreadMessagesBar, .mx_RoomView_auxPanel {
  background: rgba(11, 15, 25, .82) !important;
  backdrop-filter: blur(24px) saturate(150%) !important;
  border-bottom: 1px solid var(--sy-border) !important;
}

.mx_RoomHeader {
  min-height: 70px !important;
  box-shadow: 0 12px 35px rgba(0,0,0,.24) !important;
}

.mx_RoomHeader_name, .mx_RoomHeader_nametext, .mx_RoomHeader_topic, .mx_RoomHeader_info, .mx_EntityTile_name {
  color: var(--sy-text) !important;
}

/* Rooms list façon Telegram compact premium */
.mx_RoomTile, .mx_RoomSublist_tiles .mx_RoomTile {
  margin: 4px 8px !important;
  border-radius: 18px !important;
  min-height: 52px !important;
  transition: transform .14s ease, background .14s ease, border-color .14s ease !important;
  border: 1px solid transparent !important;
}

.mx_RoomTile:hover {
  transform: translateY(-1px) !important;
  background: rgba(255,255,255,.055) !important;
  border-color: rgba(255,255,255,.09) !important;
}

.mx_RoomTile_selected, .mx_RoomTile.mx_RoomTile_selected {
  background: linear-gradient(135deg, rgba(79,124,255,.28), rgba(139,92,246,.24)) !important;
  border-color: rgba(139,92,246,.42) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.11), 0 12px 28px rgba(79,124,255,.12) !important;
}

.mx_RoomTile_name, .mx_RoomTile_subtext, .mx_RoomSublist_labelContainer, .mx_RoomSublist_label {
  color: var(--sy-text) !important;
}

.mx_RoomTile_subtext, .mx_RoomSublist_label { color: var(--sy-muted) !important; }

.mx_BaseAvatar, .mx_DecoratedRoomAvatar_avatar, .mx_RoomAvatar, .mx_UserInfo_avatar, .mx_MessageComposer_avatar {
  border-radius: 999px !important;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, .30), 0 0 0 5px rgba(79, 124, 255, .10) !important;
}

/* Timeline : messages plus modernes */
.mx_EventTile {
  margin: 8px 18px !important;
}

.mx_EventTile_line, .mx_EventTile_content, .mx_MTextBody {
  color: #f8fbff !important;
  line-height: 1.55 !important;
}

.mx_EventTile_senderDetailsLink,
.mx_DisambiguatedProfile_displayName,
.mx_SenderProfile_name {
  color: #62d2ff !important;
  font-weight: 750 !important;
}

.mx_EventTile_last .mx_EventTile_line,
.mx_EventTile_continuation .mx_EventTile_line {
  border-radius: 14px !important;
}

.mx_EventTile:hover {
  background: rgba(255,255,255,.035) !important;
  border-radius: 16px !important;
}

.mx_DateSeparator > hr, .mx_DateSeparator_line { border-color: rgba(148,163,184,.18) !important; }
.mx_DateSeparator > span, .mx_DateSeparator_date { color: #cbd8f1 !important; background: rgba(8,12,22,.85) !important; }

.mx_RoomView_MessageList::before {
  content: "Symbalyx Secure";
  position: absolute;
  top: 92px;
  right: 34px;
  color: rgba(148,163,184,.10);
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -1px;
  pointer-events: none;
}

/* Composer façon app moderne */
.mx_MessageComposer, .mx_MessageComposer_wrapper, .mx_BasicMessageComposer, .mx_SendMessageComposer {
  background: rgba(11, 16, 27, .86) !important;
  border-top: 1px solid var(--sy-border) !important;
  backdrop-filter: blur(24px) saturate(145%) !important;
}

.mx_BasicMessageComposer, .mx_BasicMessageComposer_input, .mx_SendMessageComposer .mx_BasicMessageComposer {
  border-radius: 22px !important;
  background: rgba(255,255,255,.055) !important;
  border: 1px solid rgba(255,255,255,.10) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05) !important;
}

.mx_BasicMessageComposer_input, [contenteditable="true"] {
  color: #f8fbff !important;
}

/* Boutons */
button, .mx_AccessibleButton, .mx_Field input, .mx_Field select, .mx_Field textarea {
  border-radius: 14px !important;
}

.mx_AccessibleButton:hover, button:hover {
  filter: brightness(1.08) saturate(1.04) !important;
}

/* Panneau Bots IA visible en permanence */
#symbalyx-ai-dock {
  position: fixed;
  right: 18px;
  top: 88px;
  width: 286px;
  max-width: calc(100vw - 36px);
  z-index: 99999;
  border: 1px solid rgba(139,92,246,.34);
  background:
    linear-gradient(150deg, rgba(14, 19, 34, .93), rgba(17, 14, 34, .92)),
    radial-gradient(circle at 15% 0%, rgba(79,124,255,.24), transparent 34%);
  border-radius: 24px;
  box-shadow: var(--sy-shadow);
  backdrop-filter: blur(26px) saturate(160%);
  overflow: hidden;
  color: var(--sy-text);
}

#symbalyx-ai-dock.minimized .sym-ai-body { display: none; }
#symbalyx-ai-dock.minimized { width: 188px; }

.sym-ai-head {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 14px 12px;
  border-bottom: 1px solid rgba(255,255,255,.09);
}
.sym-ai-logo {
  width: 40px; height: 40px; border-radius: 15px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, var(--sy-blue), var(--sy-violet), var(--sy-pink));
  box-shadow: 0 12px 28px rgba(79,124,255,.25);
  font-weight: 900;
}
.sym-ai-title { font-weight: 900; letter-spacing: -.02em; }
.sym-ai-sub { color: var(--sy-muted); font-size: 12px; margin-top: 1px; }
.sym-ai-min {
  margin-left: auto;
  width: 30px; height: 30px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.06);
  color: var(--sy-text);
  cursor: pointer;
}
.sym-ai-body { padding: 12px; }
.sym-ai-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.sym-ai-card {
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.055);
  border-radius: 18px;
  padding: 10px;
  cursor: pointer;
  min-height: 72px;
  transition: transform .15s ease, border-color .15s ease, background .15s ease;
}
.sym-ai-card:hover {
  transform: translateY(-2px);
  border-color: rgba(98,210,255,.34);
  background: rgba(79,124,255,.13);
}
.sym-ai-icon { font-size: 18px; margin-bottom: 7px; }
.sym-ai-name { font-weight: 850; font-size: 13px; }
.sym-ai-desc { color: var(--sy-muted); font-size: 11px; margin-top: 2px; }
.sym-ai-actions { display: grid; gap: 8px; margin-top: 12px; }
.sym-ai-btn {
  border: 1px solid rgba(255,255,255,.12);
  background: linear-gradient(135deg, rgba(79,124,255,.78), rgba(139,92,246,.78));
  color: white;
  font-weight: 850;
  padding: 11px 12px;
  cursor: pointer;
  border-radius: 16px !important;
}
.sym-ai-btn.secondary { background: rgba(255,255,255,.07); color: #dbe8ff; }
.sym-ai-note { color: var(--sy-muted); font-size: 11px; line-height: 1.35; margin-top: 10px; }

#symbalyx-ai-toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100000;
  padding: 12px 14px;
  background: rgba(5, 9, 17, .92);
  color: #f8fbff;
  border: 1px solid rgba(98,210,255,.28);
  border-radius: 16px;
  box-shadow: var(--sy-shadow);
  max-width: 380px;
  font-weight: 700;
}

@media (max-width: 1250px) {
  #symbalyx-ai-dock { top: auto; bottom: 76px; right: 12px; width: 260px; }
}

@media (max-width: 760px) {
  #symbalyx-ai-dock { width: calc(100vw - 24px); bottom: 84px; }
  .sym-ai-grid { grid-template-columns: 1fr; }
}
