<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#000000" />
<title>Calculatrice</title>
<link rel="manifest" href="manifest.json" />
<link rel="icon" type="image/svg+xml" href="icon.svg" />
<link rel="apple-touch-icon" href="icon.svg" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-title" content="Calc" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="robots" content="noindex,nofollow" />
<style>
  :root {
    --bg-0: #07070d;
    --bg-1: #0d0d18;
    --bg-2: #12121f;
    --bg-3: #181826;
    --glass: rgba(255, 255, 255, 0.04);
    --glass-strong: rgba(255, 255, 255, 0.08);
    --border: rgba(255, 255, 255, 0.07);
    --border-strong: rgba(255, 255, 255, 0.13);
    --text-0: #fafafe;
    --text-1: #c5c5d2;
    --text-2: #8e8e9c;
    --text-3: #5e5e6e;
    --accent: #7c5cff;
    --accent-2: #4ad6c4;
    --accent-warm: #ff6f8d;
    --accent-warm-2: #ff9d5c;
    --signal-blue: #3a76f0;
    --danger: #ff5470;
    --ok: #4ad68a;
    --warn: #ffb347;
    --radius: 16px;
    --radius-sm: 10px;
    --radius-lg: 22px;
    --shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
    --shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.28);
    --grad-warm: linear-gradient(135deg, #ff6f8d 0%, #ff9d5c 100%);
    --grad-cool: linear-gradient(135deg, #7c5cff 0%, #4ad6c4 100%);
    --grad-brand: linear-gradient(135deg, #7c5cff 0%, #ff6f8d 100%);
    --font: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
  body {
    font-family: var(--font);
    color: var(--text-0);
    background:
      radial-gradient(1200px 800px at 10% -10%, rgba(124, 92, 255, 0.18), transparent 60%),
      radial-gradient(900px 600px at 110% 110%, rgba(74, 214, 196, 0.12), transparent 60%),
      linear-gradient(180deg, var(--bg-0), var(--bg-1) 40%, var(--bg-0));
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body::before {
    content: ""; position: fixed; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.06'/></svg>");
    mix-blend-mode: overlay; opacity: 0.4; z-index: 0;
  }
  .app { position: relative; z-index: 1; height: 100vh; display: flex; flex-direction: column; }

  /* ============ SCROLLBAR ============ */
  *::-webkit-scrollbar { width: 8px; height: 8px; }
  *::-webkit-scrollbar-track { background: transparent; }
  *::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 4px; }
  *::-webkit-scrollbar-thumb:hover { background: var(--text-3); }

  /* ============ TOP BAR ============ */
  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 22px;
    background: var(--glass);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-logo {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 6px 22px rgba(124, 92, 255, 0.45);
    display: grid; place-items: center;
    color: #fff; font-weight: 800; font-size: 16px; letter-spacing: 0.5px;
  }
  .brand-name { font-weight: 700; letter-spacing: 0.3px; font-size: 16px; }
  .brand-name span { color: var(--text-2); font-weight: 500; margin-left: 6px; }

  .secure-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 12px;
    background: rgba(74, 214, 138, 0.08);
    border: 1px solid rgba(74, 214, 138, 0.28);
    color: #b6f0cf;
    border-radius: 999px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.3px;
  }
  .secure-pill .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--ok); box-shadow: 0 0 10px var(--ok);
    animation: pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

  .user-chip {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 10px 6px 6px;
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    font-size: 13px; cursor: pointer;
    transition: background .15s;
  }
  .user-chip:hover { background: rgba(255,255,255,0.1); }
  .user-chip .avatar {
    width: 26px; height: 26px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--signal-blue));
    display: grid; place-items: center;
    font-size: 12px; font-weight: 700;
  }

  /* ============ CALCULATRICE (FAÇADE) ============ */
  body.calc {
    background: #000;
  }
  body.calc::before { opacity: 0; }
  body.calc .topbar { display: none; }
  body.calc .install-hint { display: none !important; }

  .calc-view {
    flex: 1; display: flex; flex-direction: column;
    background: #000;
    color: #fff;
    padding: 14px;
    max-width: 480px; margin: 0 auto; width: 100%;
    justify-content: flex-end;
  }
  .calc-display {
    font-size: 78px;
    font-weight: 200;
    text-align: right;
    padding: 30px 12px 18px;
    min-height: 130px;
    overflow: hidden;
    word-wrap: break-word;
    line-height: 1.05;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
    user-select: none;
  }
  @media (max-width: 380px) { .calc-display { font-size: 60px; } }
  .calc-pad {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    padding: 8px 4px 18px;
  }
  .calc-btn {
    aspect-ratio: 1;
    border-radius: 50%;
    border: 0;
    font-size: 30px;
    font-weight: 400;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
    transition: filter 0.06s, transform 0.06s;
    user-select: none; -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .calc-btn:active { filter: brightness(1.35); transform: scale(0.96); }
  .calc-btn.num {
    background: #333;
    color: #fff;
  }
  .calc-btn.fn {
    background: #a5a5a5;
    color: #000;
    font-size: 26px;
  }
  .calc-btn.op {
    background: #ff9500;
    color: #fff;
    font-size: 34px;
    font-weight: 500;
  }
  .calc-btn.op.active {
    background: #fff;
    color: #ff9500;
  }
  .calc-btn.zero {
    grid-column: span 2;
    aspect-ratio: auto;
    border-radius: 999px;
    text-align: left;
    padding-left: 30px;
  }

  /* ============ LOGIN ============ */
  .login-wrap { flex: 1; display: none; place-items: center; padding: 24px; }
  .login-card {
    width: 100%; max-width: 380px;
    background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02));
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    border: 1px solid var(--border-strong);
    border-radius: 28px; padding: 36px 30px;
    box-shadow: var(--shadow);
  }
  .login-card h1 {
    margin: 0 0 8px 0;
    font-size: 28px; font-weight: 700;
    letter-spacing: -0.6px;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .login-card .subtitle { color: var(--text-2); font-size: 14px; margin-bottom: 28px; line-height: 1.45; }
  .login-card .lock-hero {
    width: 64px; height: 64px; border-radius: 20px;
    background: var(--grad-brand);
    display: grid; place-items: center;
    margin: 0 auto 22px;
    box-shadow:
      0 14px 36px rgba(124, 92, 255, 0.45),
      0 6px 18px rgba(255, 111, 141, 0.35),
      inset 0 1px 0 rgba(255,255,255,0.2);
    position: relative;
  }
  .login-card .lock-hero::after {
    content: ""; position: absolute; inset: -10px;
    border-radius: 30px;
    background: var(--grad-brand);
    filter: blur(24px); opacity: 0.35; z-index: -1;
  }
  .field { margin-bottom: 16px; }
  .field label {
    display: block; font-size: 12px; color: var(--text-2);
    margin-bottom: 8px; letter-spacing: 0.3px; text-transform: uppercase;
  }
  .field input, .field textarea, .field select {
    width: 100%; padding: 13px 14px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-0); font-size: 15px; font-family: inherit;
    transition: border-color .15s, background .15s, box-shadow .15s;
    outline: none; resize: vertical;
  }
  .field input:focus, .field textarea:focus, .field select:focus {
    border-color: var(--accent);
    background: rgba(124, 92, 255, 0.06);
    box-shadow: 0 0 0 4px rgba(124, 92, 255, 0.15);
  }
  .btn {
    padding: 12px 18px;
    background: linear-gradient(135deg, var(--accent), #5c7cff);
    color: #fff; border: 0; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: transform .1s, box-shadow .15s, filter .15s;
    box-shadow: 0 8px 22px rgba(124, 92, 255, 0.32);
    font-family: inherit;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn:hover { filter: brightness(1.08); }
  .btn:active { transform: translateY(1px); }
  .btn[disabled] { opacity: 0.55; cursor: not-allowed; filter: none; }
  .btn.full { width: 100%; padding: 14px; font-size: 15px; }
  .btn.ghost {
    background: transparent; border: 1px solid var(--border-strong);
    color: var(--text-1); box-shadow: none;
  }
  .btn.ghost:hover { background: var(--glass-strong); color: var(--text-0); }
  .btn.danger {
    background: linear-gradient(135deg, var(--danger), #ff7a5c);
    box-shadow: 0 8px 22px rgba(255, 84, 112, 0.32);
  }
  .btn.signal {
    background: linear-gradient(135deg, var(--signal-blue), #5a8fff);
    box-shadow: 0 8px 22px rgba(58, 118, 240, 0.32);
  }

  .login-foot {
    margin-top: 22px; text-align: center;
    font-size: 12px; color: var(--text-2);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .login-foot svg { width: 14px; height: 14px; opacity: 0.85; }
  .error-msg {
    margin-top: 14px; padding: 10px 12px;
    background: rgba(255, 84, 112, 0.08);
    border: 1px solid rgba(255, 84, 112, 0.35);
    color: #ffb3c0; border-radius: 10px; font-size: 13px; display: none;
  }
  .error-msg.show { display: block; }

  /* ============ MAIN APP ============ */
  .main-app { flex: 1; display: none; min-height: 0; overflow: hidden; }
  .main-app.active { display: flex; }

  /* ============ SIDEBAR ============ */
  .sidebar {
    width: 320px; flex-shrink: 0;
    background: rgba(13, 13, 24, 0.6);
    backdrop-filter: blur(18px);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    min-height: 0;
    position: relative;
  }
  .sidebar-head {
    padding: 18px 18px 4px;
    flex-shrink: 0;
  }
  .sidebar-top {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .sidebar-title {
    font-size: 22px; font-weight: 700;
    color: var(--text-0);
    letter-spacing: -0.5px;
  }
  .sidebar-icon-actions { display: flex; gap: 2px; }
  .sidebar-icon-btn {
    background: transparent; border: 0;
    color: var(--text-1); width: 38px; height: 38px;
    border-radius: 50%; cursor: pointer;
    display: grid; place-items: center;
    transition: background .15s, color .15s, transform .08s;
  }
  .sidebar-icon-btn:hover { background: var(--glass-strong); color: var(--text-0); }
  .sidebar-icon-btn:active { transform: scale(0.92); }

  .search-wrap {
    padding: 0 0 14px;
    position: relative;
  }
  .search-icon-inner {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: var(--text-2); pointer-events: none;
  }
  .search-input {
    width: 100%; padding: 11px 16px 11px 40px;
    background: rgba(255,255,255,0.05);
    border: 1px solid transparent;
    border-radius: 22px;
    color: var(--text-0); font-size: 14px;
    font-family: inherit; outline: none;
    transition: border-color .15s, background .15s;
    box-sizing: border-box;
  }
  .search-input:focus { border-color: rgba(124,92,255,0.4); background: rgba(255,255,255,0.08); }
  .search-input::placeholder { color: var(--text-2); }

  .sidebar-fab {
    position: absolute; bottom: 80px; right: 18px;
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--grad-brand);
    border: 0; color: #fff; cursor: pointer;
    display: grid; place-items: center;
    box-shadow: 0 10px 28px rgba(124,92,255,0.5), 0 4px 10px rgba(255,111,141,0.35);
    transition: transform .15s, filter .15s, box-shadow .15s;
    z-index: 10;
  }
  .sidebar-fab:hover { filter: brightness(1.12); transform: scale(1.08) rotate(8deg); box-shadow: 0 14px 32px rgba(124,92,255,0.55); }
  .sidebar-fab:active { transform: scale(0.96); }

  /* ============ ASSISTANT IA (style "Mon IA" Snap) ============ */
  .ai-pin {
    width: 100%;
    margin: 4px 0 12px;
    padding: 10px 12px;
    display: flex; align-items: center; gap: 12px;
    background: linear-gradient(135deg, rgba(124,92,255,0.18), rgba(255,111,141,0.18));
    border: 1px solid rgba(255,111,141,0.3);
    border-radius: 14px;
    cursor: pointer;
    transition: filter .15s, transform .08s;
    font-family: inherit;
    color: var(--text-0);
    text-align: left;
  }
  .ai-pin:hover { filter: brightness(1.15); }
  .ai-pin:active { transform: scale(0.985); }
  .ai-pin.active {
    background: linear-gradient(135deg, rgba(124,92,255,0.32), rgba(255,111,141,0.32));
    border-color: rgba(255,111,141,0.55);
  }
  .ai-pin-avatar {
    width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
    background: var(--grad-brand);
    display: grid; place-items: center;
    color: #fff;
    box-shadow: 0 4px 14px rgba(124,92,255,0.45);
    position: relative;
  }
  .ai-pin-avatar::after {
    content: ""; position: absolute; inset: -3px;
    border-radius: 50%;
    background: var(--grad-warm); opacity: 0.4;
    filter: blur(8px); z-index: -1;
  }
  .ai-pin-info { flex: 1; min-width: 0; }
  .ai-pin-name {
    font-size: 14px; font-weight: 700;
    letter-spacing: -0.2px;
    display: flex; align-items: center; gap: 6px;
  }
  .ai-pin-badge {
    display: inline-block;
    background: rgba(74, 214, 138, 0.18);
    color: #b6f0cf;
    border: 1px solid rgba(74,214,138,0.35);
    border-radius: 999px;
    font-size: 9px; font-weight: 700;
    padding: 1px 6px; text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .ai-pin-sub { font-size: 11px; color: var(--text-2); margin-top: 1px; }

  .ai-view { flex: 1; display: none; flex-direction: column; min-height: 0; }
  .ai-view.active { display: flex; }
  .ai-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 22px;
    background: linear-gradient(135deg, rgba(124,92,255,0.12), rgba(255,111,141,0.12));
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    backdrop-filter: blur(14px);
  }
  .ai-header-left { display: flex; align-items: center; gap: 12px; }
  .ai-header-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--grad-brand);
    display: grid; place-items: center; color: #fff;
    box-shadow: 0 4px 14px rgba(124,92,255,0.4);
  }
  .ai-header-name { font-size: 16px; font-weight: 700; letter-spacing: -0.2px; position: relative; }
  .thread-switcher {
    background: transparent; border: 0;
    color: var(--text-0); font-weight: 700; font-size: 16px;
    letter-spacing: -0.2px; cursor: pointer;
    font-family: inherit;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 8px; margin-left: -8px;
    border-radius: 8px;
    transition: background .12s;
  }
  .thread-switcher:hover { background: var(--glass-strong); }
  .thread-switcher svg { opacity: 0.6; }
  .thread-menu {
    position: absolute; top: 36px; left: 0;
    width: 280px; max-height: 380px;
    background: rgba(20, 20, 32, 0.98);
    border: 1px solid var(--border-strong);
    border-radius: 14px;
    box-shadow: var(--shadow);
    z-index: 50;
    overflow: hidden;
    display: flex; flex-direction: column;
    animation: slideUp .12s ease-out;
  }
  .thread-menu-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
    font-size: 12px; text-transform: uppercase;
    letter-spacing: 0.5px; color: var(--text-2);
    font-weight: 700;
  }
  .thread-menu-head button {
    width: 26px; height: 26px; border-radius: 50%;
    background: var(--accent); border: 0; color: #fff;
    cursor: pointer; display: grid; place-items: center;
  }
  .thread-list { flex: 1; overflow-y: auto; padding: 6px; }
  .thread-item {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 10px; border-radius: 9px;
    cursor: pointer; transition: background .1s;
    margin-bottom: 2px;
  }
  .thread-item:hover { background: var(--glass-strong); }
  .thread-item.active { background: rgba(124,92,255,0.18); }
  .thread-item-title { flex: 1; font-size: 13px; font-weight: 500; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-0); }
  .thread-item-actions { display: flex; gap: 2px; opacity: 0; transition: opacity .12s; }
  .thread-item:hover .thread-item-actions { opacity: 1; }
  .thread-item-actions button {
    width: 24px; height: 24px; border-radius: 50%;
    background: transparent; border: 0; color: var(--text-2);
    cursor: pointer; display: grid; place-items: center;
  }
  .thread-item-actions button:hover { background: rgba(255,84,112,0.18); color: var(--danger); }
  .ai-header-sub { font-size: 11px; color: var(--text-2); margin-top: 2px; }
  .ai-header-sub .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); display: inline-block; vertical-align: 1px; margin-right: 5px; }
  .ai-msgs {
    flex: 1; overflow-y: auto;
    padding: 22px 18px 12px;
    display: flex; flex-direction: column; gap: 4px;
    background: var(--bg-1);
  }
  .ai-msg {
    max-width: 78%;
    padding: 11px 15px;
    border-radius: 18px;
    font-size: 14.5px; line-height: 1.45;
    word-wrap: break-word; white-space: pre-wrap;
    animation: msgIn .15s ease-out;
  }
  .ai-msg.them {
    background: var(--bg-3);
    color: var(--text-0);
    border-bottom-left-radius: 6px;
    align-self: flex-start;
  }
  .ai-msg.me {
    background: var(--grad-brand);
    color: #fff;
    border-bottom-right-radius: 6px;
    align-self: flex-end;
  }
  .ai-msg.system {
    align-self: center;
    background: rgba(74, 214, 138, 0.10);
    border: 1px solid rgba(74,214,138,0.3);
    color: #b6f0cf;
    font-size: 12px;
    padding: 7px 14px;
    border-radius: 999px;
    text-align: center;
    max-width: 90%;
  }
  .ai-msg-time {
    font-size: 10px; color: var(--text-3);
    padding: 0 8px; margin-top: 2px;
  }
  .ai-msg-time.me { align-self: flex-end; }
  .ai-msg-time.them { align-self: flex-start; }
  .ai-quick {
    display: flex; gap: 8px; padding: 10px 18px 0;
    flex-wrap: wrap;
    background: var(--bg-1);
  }
  .ai-quick button {
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    color: var(--text-1);
    padding: 7px 12px; border-radius: 999px;
    font-size: 12px; font-weight: 500;
    cursor: pointer; font-family: inherit;
    display: inline-flex; align-items: center; gap: 6px;
    transition: background .12s, color .12s, transform .08s;
  }
  .ai-quick button:hover { background: rgba(255,255,255,0.12); color: var(--text-0); }
  .ai-quick button:active { transform: scale(0.94); }
  .ai-input-bar {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 18px 16px;
    background: var(--bg-1);
    border-top: 1px solid var(--border);
  }
  .ai-input-bar input {
    flex: 1; padding: 12px 16px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-0); font-size: 14.5px;
    outline: none; font-family: inherit;
  }
  .ai-input-bar input:focus { border-color: rgba(124,92,255,0.45); }
  .ai-send {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--grad-brand);
    border: 0; color: #fff;
    display: grid; place-items: center; cursor: pointer;
    transition: transform .1s, filter .12s;
    box-shadow: 0 6px 18px rgba(124,92,255,0.35);
  }
  .ai-send:hover { filter: brightness(1.1); }
  .ai-send:active { transform: scale(0.92); }
  .ai-send[disabled] { opacity: 0.5; cursor: not-allowed; }
  .ai-mic {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    color: var(--text-1);
    display: grid; place-items: center;
    cursor: pointer; transition: background .12s, color .12s, transform .08s;
  }
  .ai-mic:hover { background: rgba(255,255,255,0.12); color: var(--text-0); }
  .ai-mic.recording {
    background: rgba(255,84,112,0.2);
    color: var(--danger);
    border-color: var(--danger);
    animation: pulseMic 1.2s ease-in-out infinite;
  }
  @keyframes pulseMic { 0%,100% { box-shadow: 0 0 0 0 rgba(255,84,112,0.45); } 50% { box-shadow: 0 0 0 8px rgba(255,84,112,0); } }
  .streaming-cursor {
    display: inline-block; width: 8px; vertical-align: -1px;
    animation: blink 1s steps(2) infinite;
    color: var(--accent);
  }
  @keyframes blink { 50% { opacity: 0; } }

  /* Actions sous chaque bulle IA */
  .ai-msg-actions {
    display: flex; gap: 6px;
    align-self: flex-start;
    margin: -2px 0 6px;
    opacity: 0; transition: opacity .15s;
  }
  .ai-msg.them:hover + .ai-msg-actions,
  .ai-msg-actions:hover { opacity: 1; }
  .ai-msg-actions button {
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    color: var(--text-2);
    padding: 4px 9px;
    border-radius: 999px;
    font-size: 11px; font-family: inherit;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 4px;
    transition: background .12s, color .12s;
  }
  .ai-msg-actions button:hover { background: rgba(255,255,255,0.1); color: var(--text-0); }

  /* Markdown */
  .ai-msg.them .md-list { margin: 6px 0 6px 18px; padding: 0; }
  .ai-msg.them .md-list li { margin: 2px 0; }
  .ai-msg.them .md-code {
    background: rgba(0,0,0,0.4);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 12px;
    margin: 8px 0;
    overflow-x: auto;
    font-family: "SF Mono", Consolas, Monaco, monospace;
    font-size: 12.5px;
    line-height: 1.5;
  }
  .ai-msg.them .md-code code { background: transparent; padding: 0; }
  .ai-msg.them .md-inline {
    background: rgba(0,0,0,0.35);
    padding: 1px 6px;
    border-radius: 5px;
    font-family: "SF Mono", Consolas, Monaco, monospace;
    font-size: 0.92em;
  }
  .ai-msg.them strong { color: var(--text-0); }
  .ai-msg-img {
    max-width: 100%; max-height: 280px;
    border-radius: 12px; display: block;
    margin: -4px -4px 8px;
  }
  .ai-image-preview {
    background: var(--bg-3); border-top: 1px solid var(--border);
    padding: 10px 18px;
    display: flex; align-items: center; gap: 12px;
  }
  .ai-image-preview img {
    width: 56px; height: 56px;
    border-radius: 10px; object-fit: cover;
  }
  .ai-image-preview #aiImageHint { font-size: 12px; color: var(--text-2); flex: 1; }
  .ai-image-preview button {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--glass-strong); border: 0;
    color: var(--text-1); cursor: pointer;
    display: grid; place-items: center;
  }
  .ai-image-preview button:hover { background: rgba(255,84,112,0.18); color: var(--danger); }

  .icon-btn.on { background: rgba(124,92,255,0.22); color: var(--accent); border-color: var(--accent); }

  /* Mémoire IA */
  .memory-list { margin-top: 18px; max-height: 320px; overflow-y: auto; }
  .memory-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: var(--glass);
    border: 1px solid var(--border);
    margin-bottom: 6px;
    font-size: 13.5px;
  }
  .memory-item .text { flex: 1; color: var(--text-1); }
  .memory-item .when { font-size: 11px; color: var(--text-3); }
  .memory-item button {
    background: transparent; border: 0; color: var(--text-2);
    cursor: pointer; width: 28px; height: 28px;
    border-radius: 50%; display: grid; place-items: center;
  }
  .memory-item button:hover { background: rgba(255,84,112,0.15); color: var(--danger); }
  .memory-empty { padding: 30px; text-align: center; color: var(--text-2); font-size: 13px; }

  /* ============ Cerveau (Obsidian-like) ============ */
  .brain-tabs { display: flex; gap: 4px; background: var(--glass-strong); padding: 3px; border-radius: 999px; }
  .brain-tab {
    background: transparent; border: 0;
    color: var(--text-2);
    padding: 6px 14px; border-radius: 999px;
    font-size: 12px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: background .12s, color .12s;
  }
  .brain-tab.on { background: var(--bg-3); color: var(--text-0); }
  .brain-tab:hover:not(.on) { color: var(--text-1); }

  .brain-body { padding: 0 !important; height: 100%; }
  .brain-pane { height: 100%; display: flex; }
  .brain-notes-pane { display: flex; }
  .brain-sidebar {
    width: 280px; flex-shrink: 0;
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    background: rgba(0,0,0,0.18);
  }
  .brain-search-wrap {
    padding: 14px;
    display: flex; gap: 8px; align-items: center;
    border-bottom: 1px solid var(--border);
  }
  .brain-search-wrap input {
    flex: 1; padding: 8px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-0); font-size: 13px;
    outline: none; font-family: inherit;
  }
  .brain-search-wrap input:focus { border-color: var(--accent); }
  .brain-new {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--grad-brand);
    border: 0; color: #fff; cursor: pointer;
    display: grid; place-items: center;
    transition: transform .08s, filter .12s;
  }
  .brain-new:hover { filter: brightness(1.1); }
  .brain-new:active { transform: scale(0.92); }
  .brain-list { flex: 1; overflow-y: auto; padding: 6px; }
  .brain-list-item {
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer; transition: background .1s;
    margin-bottom: 2px;
  }
  .brain-list-item:hover { background: var(--glass-strong); }
  .brain-list-item.active { background: rgba(124,92,255,0.18); }
  .brain-list-title { font-size: 13.5px; font-weight: 600; color: var(--text-0); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .brain-list-excerpt { font-size: 11.5px; color: var(--text-2); margin-top: 3px; line-height: 1.4; max-height: 32px; overflow: hidden; }
  .brain-list-meta { font-size: 10.5px; color: var(--text-3); margin-top: 4px; display: flex; gap: 8px; align-items: center; }
  .brain-list-tag { background: rgba(124,92,255,0.2); color: #c8b8ff; padding: 1px 6px; border-radius: 999px; font-size: 10px; }

  .brain-editor { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow-y: auto; }
  .brain-empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px; text-align: center;
  }
  .brain-empty h3 { margin: 16px 0 6px; font-size: 18px; }
  .brain-empty p { color: var(--text-2); font-size: 13px; max-width: 320px; line-height: 1.5; margin: 0; }
  .brain-edit { padding: 22px 26px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .brain-title {
    background: transparent; border: 0; border-bottom: 1px solid var(--border);
    padding: 8px 0; color: var(--text-0);
    font-size: 22px; font-weight: 700; letter-spacing: -0.4px;
    font-family: inherit; outline: none;
  }
  .brain-title:focus { border-color: var(--accent); }
  .brain-tags {
    background: transparent; border: 0;
    padding: 2px 0;
    color: var(--text-2); font-size: 12px;
    font-family: inherit; outline: none;
  }
  .brain-tabs-content { display: flex; gap: 4px; }
  .brain-mode {
    background: var(--glass-strong); border: 0;
    color: var(--text-2);
    padding: 5px 12px; border-radius: 999px;
    font-size: 11px; font-weight: 600; cursor: pointer;
    font-family: inherit;
  }
  .brain-mode.on { background: var(--accent); color: #fff; }
  .brain-content {
    width: 100%; min-height: 220px;
    background: var(--bg-1); border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
    color: var(--text-0); font-size: 14px;
    font-family: "SF Mono", Consolas, Monaco, monospace;
    line-height: 1.55;
    outline: none; resize: vertical;
  }
  .brain-content:focus { border-color: var(--accent); }
  .brain-preview {
    min-height: 220px;
    background: var(--bg-1); border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
    color: var(--text-0); font-size: 14px;
    line-height: 1.6;
  }
  .brain-preview a.wikilink {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px dashed var(--accent);
    cursor: pointer;
  }
  .brain-preview a.wikilink:hover { color: var(--accent-warm); border-color: var(--accent-warm); }
  .brain-preview a.wikilink.missing { color: var(--text-3); border-color: var(--text-3); }

  .brain-links { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px; }
  @media (max-width: 700px) { .brain-links { grid-template-columns: 1fr; } }
  .brain-links-title { font-size: 11px; color: var(--text-2); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .brain-links-list { display: flex; flex-wrap: wrap; gap: 6px; min-height: 28px; }
  .brain-links-list .chip {
    background: var(--glass-strong); border: 1px solid var(--border-strong);
    padding: 4px 10px; border-radius: 999px;
    font-size: 12px; cursor: pointer;
    transition: background .1s, color .1s;
  }
  .brain-links-list .chip:hover { background: rgba(124,92,255,0.2); color: var(--text-0); }
  .brain-links-list .empty { color: var(--text-3); font-size: 12px; font-style: italic; }

  .brain-suggest {
    margin-top: -2px; padding: 8px 10px;
    background: rgba(124,92,255,0.08);
    border: 1px solid rgba(124,92,255,0.25);
    border-radius: 10px;
  }
  .brain-suggest-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-2); margin-bottom: 6px; }
  .brain-suggest-list { display: flex; flex-wrap: wrap; gap: 5px; }
  .brain-suggest-list .sg {
    background: var(--bg-3); border: 1px solid var(--border-strong);
    color: var(--text-1);
    padding: 3px 9px; border-radius: 999px;
    font-size: 12px; cursor: pointer;
    transition: background .1s, color .1s;
  }
  .brain-suggest-list .sg:hover, .brain-suggest-list .sg.focus { background: var(--accent); color: #fff; border-color: var(--accent); }

  .brain-edit-actions { display: flex; justify-content: space-between; gap: 8px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); }

  /* Graphe */
  .brain-graph-wrap { width: 100%; height: 100%; position: relative; background: var(--bg-1); }
  #brainGraph { width: 100%; height: 100%; }
  .brain-graph-empty { position: absolute; inset: 0; display: grid; place-items: center; color: var(--text-2); text-align: center; padding: 30px; font-size: 13px; line-height: 1.5; }
  .brain-graph-empty.show { display: grid; }
  #brainGraph .gnode-bg { fill: var(--bg-3); stroke: var(--accent); stroke-width: 1.8; cursor: pointer; transition: fill .12s; }
  #brainGraph .gnode:hover .gnode-bg { fill: var(--accent); }
  #brainGraph .gnode-label { fill: var(--text-0); font-size: 11px; font-family: var(--font); pointer-events: none; }
  #brainGraph .gedge { stroke: var(--text-3); stroke-width: 1.2; opacity: 0.6; }

  @media (max-width: 700px) {
    .brain-sidebar { width: 200px; }
    .brain-edit { padding: 16px; }
  }
  .ai-typing {
    align-self: flex-start; background: var(--bg-3);
    padding: 12px 16px; border-radius: 18px;
    border-bottom-left-radius: 6px;
    display: none;
  }
  .ai-typing.show { display: inline-block; }
  .ai-typing span {
    display: inline-block;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--text-2); margin: 0 2px;
    animation: typingDot 1.2s infinite;
  }
  .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
  .ai-typing span:nth-child(3) { animation-delay: 0.4s; }
  .ai-empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px 30px; text-align: center;
  }
  .ai-empty .ai-empty-avatar {
    width: 88px; height: 88px; border-radius: 50%;
    background: var(--grad-brand);
    display: grid; place-items: center; color: #fff;
    margin-bottom: 22px;
    box-shadow:
      0 14px 40px rgba(124,92,255,0.4),
      0 6px 18px rgba(255,111,141,0.3);
  }
  .ai-empty h2 {
    margin: 0 0 8px;
    font-size: 22px; font-weight: 700;
    letter-spacing: -0.4px;
    background: var(--grad-brand);
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
  }
  .ai-empty p { margin: 0 0 24px; color: var(--text-2); max-width: 360px; line-height: 1.5; font-size: 14px; }
  .ai-suggestions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 400px; }
  .ai-suggestion {
    background: var(--glass-strong); border: 1px solid var(--border-strong);
    color: var(--text-1); padding: 9px 14px;
    border-radius: 999px; font-size: 13px;
    cursor: pointer; font-family: inherit;
    transition: background .12s, color .12s, transform .08s;
  }
  .ai-suggestion:hover { background: rgba(255,255,255,0.1); color: var(--text-0); }
  .ai-suggestion:active { transform: scale(0.96); }

  .rooms-list { flex: 1; overflow-y: auto; padding: 4px 8px 100px; min-height: 0; }
  .room-item {
    display: flex; align-items: center; gap: 14px;
    padding: 11px 12px; border-radius: 14px;
    cursor: pointer; transition: background .12s;
    margin-bottom: 2px;
  }
  .room-item:hover { background: var(--glass-strong); }
  .room-item.active {
    background: rgba(124, 92, 255, 0.13);
  }
  .room-avatar {
    width: 52px; height: 52px; border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    display: grid; place-items: center;
    color: #fff; font-weight: 700; font-size: 18px;
    background-size: cover; background-position: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  }
  .avatar-wrap { position: relative; flex-shrink: 0; }
  /* Anneau "story" autour des avatars dont le contact est en ligne */
  .avatar-wrap.is-online::before {
    content: ""; position: absolute; inset: -3px;
    border-radius: 50%;
    background: var(--grad-warm);
    z-index: -1;
    -webkit-mask: radial-gradient(circle, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
            mask: radial-gradient(circle, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
  }
  .online-dot {
    position: absolute; bottom: 1px; right: 1px;
    width: 13px; height: 13px;
    border-radius: 50%;
    border: 2.5px solid var(--bg-1);
  }
  .online-dot.online { background: var(--ok); }
  .online-dot.idle   { background: var(--warn); }
  .room-info { flex: 1; min-width: 0; }
  .room-name {
    font-size: 15px; font-weight: 600;
    color: var(--text-0);
    letter-spacing: -0.1px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .room-meta {
    font-size: 13px; color: var(--text-2); margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .room-preview {
    color: var(--text-2); font-size: 13px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-top: 3px;
  }
  .room-top-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .room-time {
    font-size: 11px; color: var(--text-3);
    flex-shrink: 0; font-variant-numeric: tabular-nums;
  }
  .room-unread {
    background: var(--accent); color: #fff;
    border-radius: 12px; font-size: 11px; font-weight: 700;
    padding: 1px 6px; flex-shrink: 0;
  }

  .rooms-empty {
    padding: 40px 20px; text-align: center; color: var(--text-2);
    font-size: 13px; line-height: 1.5;
  }

  .sidebar-foot {
    padding: 14px 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    gap: 10px;
    background: rgba(0,0,0,0.18);
  }
  .sidebar-foot .me {
    display: flex; align-items: center; gap: 11px; min-width: 0;
  }
  .sidebar-foot .me .avatar {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    background: var(--grad-brand);
    background-size: cover; background-position: center;
    display: grid; place-items: center;
    font-size: 13px; font-weight: 700;
  }
  .sidebar-foot .me .label {
    font-size: 14px; font-weight: 600; min-width: 0;
    letter-spacing: -0.2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .icon-btn {
    background: transparent; border: 0;
    color: var(--text-1); width: 36px; height: 36px;
    border-radius: 50%; cursor: pointer;
    display: grid; place-items: center;
    transition: background .15s, color .15s, transform .08s;
  }
  .icon-btn:hover { background: var(--glass-strong); color: var(--text-0); }
  .icon-btn:active { transform: scale(0.92); }

  /* ============ CHAT PANEL ============ */
  .chat-panel { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; }

  .chat-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 22px;
    background: rgba(13, 13, 24, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0; gap: 12px;
  }
  .chat-header-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .chat-header-name { font-size: 15px; font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chat-header-sub { font-size: 11px; color: var(--text-2); margin-top: 2px; display: flex; align-items: center; gap: 8px; }
  .chat-header-sub .ok { color: var(--ok); }
  .chat-header-sub .warn { color: var(--warn); }
  .chat-actions { display: flex; gap: 8px; flex-shrink: 0; }

  .action-btn {
    background: var(--glass-strong); border: 1px solid var(--border-strong);
    color: var(--text-1); width: 38px; height: 38px;
    border-radius: 12px; cursor: pointer;
    display: grid; place-items: center;
    transition: all .15s;
  }
  .action-btn:hover { background: rgba(255,255,255,0.12); color: var(--text-0); border-color: rgba(255,255,255,0.22); }
  .action-btn.call:hover { background: rgba(74, 214, 138, 0.15); color: var(--ok); border-color: var(--ok); }
  .action-btn.video:hover { background: rgba(58, 118, 240, 0.15); color: var(--signal-blue); border-color: var(--signal-blue); }
  .action-btn.timer.on { background: rgba(255, 179, 71, 0.15); color: var(--warn); border-color: var(--warn); }
  .action-btn.on { background: rgba(124, 92, 255, 0.18); color: var(--accent); border-color: var(--accent); }

  .chat-frame-container {
    flex: 1; position: relative;
    margin: 12px 18px 18px 18px;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--bg-2);
    box-shadow: var(--shadow);
    min-height: 0;
  }
  .chat-frame-container iframe { width: 100%; height: 100%; border: 0; display: block; background: var(--bg-2); }
  .announce-bar {
    position: absolute; top: 0; left: 0; right: 0; z-index: 10;
    background: linear-gradient(135deg, rgba(255,179,71,0.15), rgba(255,111,141,0.12));
    border-bottom: 1px solid rgba(255,179,71,0.3);
    backdrop-filter: blur(14px);
    padding: 8px 16px;
    display: flex; align-items: center; gap: 10px;
    color: var(--text-1); font-size: 13px;
  }
  .announce-bar .pin-ic { color: var(--warn); flex-shrink: 0; }
  .announce-bar .text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }
  .announce-bar .text:hover { color: var(--text-0); }
  .announce-bar .count {
    background: var(--warn); color: #1a1500;
    border-radius: 999px; font-size: 11px; font-weight: 700;
    padding: 2px 8px;
  }
  #announceList .ann-item {
    padding: 10px 12px; border-radius: 10px;
    background: var(--glass); border: 1px solid var(--border);
    margin-bottom: 6px;
    display: flex; align-items: flex-start; gap: 10px;
  }
  #announceList .ann-item .text { flex: 1; font-size: 13px; line-height: 1.45; white-space: pre-wrap; }
  #announceList .ann-item button {
    background: transparent; border: 0; color: var(--text-2);
    cursor: pointer; padding: 4px;
  }
  #announceList .ann-item button:hover { color: var(--danger); }

  .no-room-placeholder {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px; text-align: center;
  }
  .no-room-placeholder .icon {
    width: 80px; height: 80px; border-radius: 22px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    display: grid; place-items: center;
    margin-bottom: 20px;
    box-shadow: 0 14px 40px rgba(124, 92, 255, 0.35);
  }
  .no-room-placeholder h2 { margin: 0 0 8px 0; font-size: 22px; }
  .no-room-placeholder p { margin: 0; color: var(--text-2); max-width: 360px; line-height: 1.55; }

  /* ============ MODALES ============ */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(5, 5, 10, 0.7);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: none; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn .15s ease-out;
  }
  .modal-overlay.active { display: flex; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    width: 100%; max-width: 460px;
    background: var(--bg-2);
    border: 1px solid var(--border-strong);
    border-radius: 24px;
    box-shadow: var(--shadow);
    overflow: hidden;
    animation: slideUp .22s cubic-bezier(.2,.7,.3,1.1);
  }
  @keyframes slideUp { from { transform: translateY(24px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
  .modal-full { max-width: 95vw; height: 90vh; display: flex; flex-direction: column; }
  .modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
  }
  .modal-head h3 {
    margin: 0; font-size: 18px; font-weight: 700;
    letter-spacing: -0.3px;
  }
  .modal-body { padding: 22px 24px; max-height: 70vh; overflow-y: auto; }
  .modal-full .modal-body { flex: 1; padding: 0; max-height: none; }
  .modal-foot {
    display: flex; gap: 10px; justify-content: flex-end;
    padding: 16px 24px 20px; border-top: 1px solid var(--border);
  }

  .close-btn {
    background: transparent; border: 0; color: var(--text-2);
    width: 36px; height: 36px; border-radius: 50%;
    cursor: pointer; display: grid; place-items: center;
    transition: background .15s, color .15s, transform .08s;
  }
  .close-btn:hover { background: var(--glass-strong); color: var(--text-0); }
  .close-btn:active { transform: scale(0.92); }

  .chip-list {
    display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;
  }
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 10px; border-radius: 999px;
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    font-size: 13px;
  }
  .chip button {
    background: transparent; border: 0; color: var(--text-2);
    cursor: pointer; padding: 0; display: grid; place-items: center;
    width: 18px; height: 18px; border-radius: 50%;
  }
  .chip button:hover { color: var(--danger); background: rgba(255,84,112,0.12); }

  .user-suggestions {
    margin-top: 10px;
    max-height: 180px; overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(0,0,0,0.2);
    display: none;
  }
  .user-suggestions.show { display: block; }
  .user-suggestion {
    padding: 10px 14px; cursor: pointer; font-size: 14px;
    display: flex; align-items: center; gap: 10px;
    transition: background .12s;
  }
  .user-suggestion:hover, .user-suggestion.focused { background: var(--glass-strong); }
  .user-suggestion .avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--signal-blue));
    display: grid; place-items: center;
    font-size: 12px; font-weight: 700;
  }

  /* timer options */
  .timer-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    margin-top: 6px;
  }
  .timer-opt {
    padding: 14px 10px; text-align: center;
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    border-radius: 12px; cursor: pointer;
    transition: all .15s;
    font-size: 14px;
  }
  .timer-opt:hover { background: rgba(255,255,255,0.1); }
  .timer-opt.selected {
    background: rgba(255, 179, 71, 0.15);
    border-color: var(--warn);
    color: var(--warn);
    font-weight: 600;
  }
  .timer-opt.off.selected {
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--border-strong);
    color: var(--text-1);
  }

  /* call modal (element-call iframe) */
  #callModal .modal-body { display: flex; flex-direction: column; }
  #callModal iframe { width: 100%; flex: 1; border: 0; background: #000; }
  .call-hint {
    padding: 10px 16px;
    font-size: 11px; color: var(--text-2);
    background: rgba(0,0,0,0.4);
    border-top: 1px solid var(--border);
    text-align: center;
  }
  .call-hint strong { color: var(--text-1); }

  .info-row {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px; margin-bottom: 8px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 12px;
    font-size: 13px;
  }
  .info-row .ic {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(74, 214, 138, 0.12); color: var(--ok);
    display: grid; place-items: center; flex-shrink: 0;
  }
  .info-row strong { display: block; color: var(--text-0); margin-bottom: 2px; }
  .info-row span { color: var(--text-2); font-size: 12px; }

  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: rgba(20, 20, 32, 0.95);
    border: 1px solid var(--border-strong);
    color: var(--text-0);
    padding: 12px 18px; border-radius: 12px;
    font-size: 13px;
    box-shadow: var(--shadow);
    z-index: 2000;
    display: flex; align-items: center; gap: 10px;
    opacity: 0; pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .toast.ok { border-color: rgba(74, 214, 138, 0.4); }
  .toast.err { border-color: rgba(255, 84, 112, 0.4); }

  /* ============ RESPONSIVE ============ */
  @media (max-width: 760px) {
    .topbar { padding: 10px 14px; }
    .brand-name span { display: none; }
    .secure-pill span { display: none; }
    .sidebar { position: absolute; inset: 56px 0 0 0; width: 100%; z-index: 5; }
    .sidebar.hidden-mobile { display: none; }
    .chat-panel { width: 100%; }
    .chat-frame-container { margin: 8px; border-radius: 12px; }
    .modal { max-width: 95vw; }
    .timer-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ============ VAULT MODE (hidden conversations) ============ */
  body.vault {
    background:
      radial-gradient(1200px 800px at 10% -10%, rgba(255, 84, 112, 0.15), transparent 60%),
      radial-gradient(900px 600px at 110% 110%, rgba(255, 179, 71, 0.10), transparent 60%),
      linear-gradient(180deg, #0a0507, #120709 40%, #0a0507);
  }
  body.vault .brand-logo {
    background: linear-gradient(135deg, var(--danger), var(--warn));
    box-shadow: 0 6px 22px rgba(255, 84, 112, 0.45);
  }
  body.vault .secure-pill {
    background: rgba(255, 84, 112, 0.10);
    border-color: rgba(255, 84, 112, 0.35);
    color: #ffc7d1;
  }
  body.vault .secure-pill .dot {
    background: var(--danger);
    box-shadow: 0 0 10px var(--danger);
  }
  .vault-badge {
    display: none;
    align-items: center; gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    background: rgba(255, 84, 112, 0.15);
    border: 1px solid rgba(255, 84, 112, 0.4);
    color: #ffc7d1;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.5px; text-transform: uppercase;
  }
  body.vault .vault-badge { display: inline-flex; }

  /* ============ PROFILE MENU ============ */
  .profile-menu {
    position: fixed;
    bottom: 70px; left: 12px;
    width: 290px;
    background: rgba(20, 20, 32, 0.96);
    backdrop-filter: blur(22px);
    border: 1px solid var(--border-strong);
    border-radius: 16px;
    box-shadow: var(--shadow);
    z-index: 900;
    overflow: hidden;
    display: none;
    animation: slideUp .15s ease-out;
  }
  .profile-menu.show { display: block; }
  .profile-header {
    padding: 18px;
    display: flex; align-items: center; gap: 12px;
    border-bottom: 1px solid var(--border);
  }
  .profile-header .avatar-lg {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--signal-blue));
    display: grid; place-items: center;
    font-size: 18px; font-weight: 700;
    user-select: none; -webkit-user-select: none;
    cursor: pointer;
    transition: transform .15s;
    flex-shrink: 0;
  }
  .profile-header .avatar-lg:active { transform: scale(0.95); }
  .profile-header .info { min-width: 0; }
  .profile-header .name {
    font-size: 15px; font-weight: 600;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .profile-header .mxid {
    font-size: 11px; color: var(--text-2); margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .profile-section { padding: 6px; }
  .profile-section + .profile-section { border-top: 1px solid var(--border); }
  .profile-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    color: var(--text-1);
    transition: background .12s, color .12s;
    border: 0; background: transparent; width: 100%; font-family: inherit;
    text-align: left;
  }
  .profile-item:hover { background: var(--glass-strong); color: var(--text-0); }
  .profile-item .ic {
    width: 22px; height: 22px;
    display: grid; place-items: center;
    color: var(--text-2); flex-shrink: 0;
  }
  .profile-item .arrow { margin-left: auto; color: var(--text-3); }
  .profile-item.danger { color: #ff9aa8; }
  .profile-item.danger:hover { background: rgba(255, 84, 112, 0.12); color: var(--danger); }
  .profile-item .toggle {
    margin-left: auto;
    width: 36px; height: 20px; border-radius: 999px;
    background: var(--border-strong); position: relative;
    transition: background .15s;
  }
  .profile-item .toggle::after {
    content: ""; position: absolute;
    top: 2px; left: 2px;
    width: 16px; height: 16px; border-radius: 50%;
    background: #fff;
    transition: transform .15s;
  }
  .profile-item .toggle.on { background: var(--ok); }
  .profile-item .toggle.on::after { transform: translateX(16px); }

  /* discreet "secret" hint - just a small dot in profile menu corner */
  .profile-secret-zone {
    padding: 14px 18px 16px;
    text-align: center;
    font-size: 10px; color: var(--text-3);
    border-top: 1px solid var(--border);
    cursor: default; user-select: none;
    letter-spacing: 0.5px;
  }
  .profile-secret-zone .dot-row {
    display: inline-flex; gap: 6px; margin-top: 6px;
  }
  .profile-secret-zone .dot-row span {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--border-strong);
    transition: background .2s, transform .2s;
  }
  .profile-secret-zone.charging .dot-row span {
    background: var(--accent);
    animation: dotFill 2s linear;
  }
  @keyframes dotFill { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }

  /* ============ PIN MODAL ============ */
  .pin-display {
    display: flex; justify-content: center; gap: 12px;
    margin: 28px 0;
  }
  .pin-dot {
    width: 14px; height: 14px; border-radius: 50%;
    background: var(--border-strong);
    transition: background .15s, transform .15s;
  }
  .pin-dot.filled {
    background: var(--accent);
    transform: scale(1.15);
  }
  .pin-pad {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    max-width: 280px; margin: 0 auto;
  }
  .pin-btn {
    aspect-ratio: 1.4;
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    color: var(--text-0);
    font-size: 22px; font-weight: 500;
    border-radius: 12px; cursor: pointer;
    transition: background .12s, transform .08s;
    font-family: inherit;
    display: grid; place-items: center;
  }
  .pin-btn:hover { background: rgba(255,255,255,0.10); }
  .pin-btn:active { transform: scale(0.95); }
  .pin-btn.fn {
    background: transparent;
    color: var(--text-2);
    font-size: 14px;
  }
  .pin-error {
    text-align: center; color: var(--danger);
    font-size: 13px; min-height: 18px; margin-top: 8px;
    opacity: 0; transition: opacity .15s;
  }
  .pin-error.show { opacity: 1; }
  .pin-title {
    text-align: center; color: var(--text-2);
    font-size: 13px; margin-top: -6px; margin-bottom: 0;
  }

  /* ============ CONTEXT MENU ============ */
  .ctx-menu {
    position: fixed;
    background: rgba(20, 20, 32, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-strong);
    border-radius: 12px;
    box-shadow: var(--shadow);
    padding: 6px;
    min-width: 200px;
    z-index: 950;
    display: none;
    animation: slideUp .12s ease-out;
  }
  .ctx-menu.show { display: block; }
  .ctx-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    font-size: 13px; color: var(--text-1);
    cursor: pointer; transition: background .1s, color .1s;
    border: 0; background: transparent; width: 100%; font-family: inherit;
    text-align: left;
  }
  .ctx-item:hover { background: var(--glass-strong); color: var(--text-0); }
  .ctx-item .ic { width: 18px; height: 18px; display: grid; place-items: center; color: var(--text-2); }
  .ctx-item.danger { color: #ff9aa8; }
  .ctx-item.danger:hover { background: rgba(255, 84, 112, 0.12); color: var(--danger); }
  .ctx-divider { height: 1px; background: var(--border); margin: 4px 6px; }

  /* ============ LOCK SCREEN ============ */
  .lockscreen {
    position: fixed; inset: 0;
    background: rgba(5, 5, 10, 0.95);
    backdrop-filter: blur(20px);
    z-index: 9000;
    display: none;
    flex-direction: column; align-items: center; justify-content: center;
    padding: 30px;
    animation: fadeIn .2s ease-out;
  }
  .lockscreen.show { display: flex; }
  .lockscreen .lock-icon {
    width: 72px; height: 72px; border-radius: 22px;
    background: linear-gradient(135deg, var(--accent), var(--signal-blue));
    display: grid; place-items: center;
    margin-bottom: 18px;
    box-shadow: 0 14px 40px rgba(124, 92, 255, 0.35);
  }
  .lockscreen h2 { margin: 0 0 6px; font-size: 20px; }
  .lockscreen p { margin: 0 0 22px; color: var(--text-2); font-size: 13px; text-align: center; }
  .lockscreen .lock-form { width: 100%; max-width: 320px; }

  /* hidden room display in sidebar (when vault unlocked) */
  .room-item.hidden-room .room-meta::before {
    content: ""; display: inline-block;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--danger);
    margin-right: 2px;
  }
  .star-mini { color: var(--warn); margin-right: 5px; }
  .lvl { font-size: 9px; margin-left: 6px; letter-spacing: 1px; vertical-align: 1px; }
  .lvl.high { color: var(--warn); }
  .lvl.max  { color: var(--danger); }

  /* Niveau MAX : bordure rouge subtile sur l'élément actif */
  .room-item.lvl-max.active { border: 1px solid rgba(255, 84, 112, 0.45); }
  .room-item.lvl-max { box-shadow: inset 3px 0 0 var(--danger); }
  .room-item.lvl-high { box-shadow: inset 3px 0 0 var(--warn); }

  /* Auto-blur de l'iframe quand la fenêtre perd le focus en niveau MAX */
  body.blur-on-blur .chat-frame-container iframe { filter: blur(24px); }
  body.blur-on-blur .chat-frame-container::after {
    content: "Fenêtre en arrière-plan · contenu masqué";
    position: absolute; inset: 0;
    display: grid; place-items: center;
    background: rgba(7, 7, 13, 0.6);
    color: var(--text-1); font-size: 13px;
    z-index: 5;
  }

  /* ============ DECOY MODE (fausses conversations) ============ */
  body.decoy {
    background:
      radial-gradient(1200px 800px at 10% -10%, rgba(124, 92, 255, 0.18), transparent 60%),
      linear-gradient(180deg, var(--bg-0), var(--bg-1) 40%, var(--bg-0));
  }
  body.decoy .secure-pill { background: rgba(74,214,138,0.05); }
  body.decoy .vault-badge { display: none !important; }
  /* Aucun signe visuel "vous êtes en leurre" pour l'inconnu */

  .decoy-chat {
    flex: 1; display: flex; flex-direction: column;
    background: var(--bg-2);
    border-radius: var(--radius);
    margin: 12px 18px 18px 18px;
    border: 1px solid var(--border);
    overflow: hidden;
    min-height: 0;
  }
  .decoy-msgs {
    flex: 1; overflow-y: auto;
    padding: 18px 14px;
    display: flex; flex-direction: column;
    gap: 4px;
  }
  .decoy-day {
    text-align: center;
    font-size: 11px; color: var(--text-2);
    margin: 14px 0 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .decoy-msg {
    max-width: 75%;
    padding: 9px 13px;
    border-radius: 16px;
    font-size: 14px; line-height: 1.4;
    word-wrap: break-word; white-space: pre-wrap;
    position: relative;
    animation: msgIn .15s ease-out;
  }
  @keyframes msgIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  .decoy-msg.them {
    background: var(--glass-strong);
    color: var(--text-0);
    border-bottom-left-radius: 4px;
    align-self: flex-start;
  }
  .decoy-msg.me {
    background: linear-gradient(135deg, var(--signal-blue), var(--accent));
    color: #fff;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
  .decoy-time {
    font-size: 10px;
    color: var(--text-2);
    margin-top: 2px;
    padding: 0 6px;
    align-self: flex-end;
  }
  .decoy-msg.them + .decoy-time { align-self: flex-start; }
  .decoy-typing {
    align-self: flex-start;
    background: var(--glass-strong);
    padding: 12px 16px;
    border-radius: 16px;
    border-bottom-left-radius: 4px;
    display: none;
  }
  .decoy-typing.show { display: inline-block; }
  .decoy-typing span {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--text-2);
    margin: 0 2px;
    animation: typingDot 1.2s infinite;
  }
  .decoy-typing span:nth-child(2) { animation-delay: 0.2s; }
  .decoy-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingDot {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
  }
  .decoy-input-bar {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 14px;
    border-top: 1px solid var(--border);
    background: rgba(0,0,0,0.2);
  }
  .decoy-input-bar input {
    flex: 1; padding: 10px 14px;
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    color: var(--text-0); font-size: 14px;
    outline: none; font-family: inherit;
  }
  .decoy-input-bar input:focus { border-color: var(--accent); }
  .decoy-send {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, var(--signal-blue), var(--accent));
    border: 0; color: #fff;
    display: grid; place-items: center; cursor: pointer;
    transition: transform .1s;
  }
  .decoy-send:active { transform: scale(0.92); }

  /* ============ GROUP HEADER (édition photo / nom / topic) ============ */
  .group-header {
    display: flex; align-items: flex-start; gap: 16px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border);
  }
  .group-avatar-wrap {
    position: relative; flex-shrink: 0;
  }
  .group-avatar-big {
    width: 80px; height: 80px; border-radius: 50%;
    background: var(--grad-brand);
    background-size: cover; background-position: center;
    display: grid; place-items: center;
    color: #fff; font-weight: 700; font-size: 28px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  }
  .group-avatar-edit {
    position: absolute; bottom: 0; right: 0;
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--bg-3);
    border: 2px solid var(--bg-2);
    color: var(--text-1);
    cursor: pointer;
    display: grid; place-items: center;
    transition: background .12s, color .12s;
  }
  .group-avatar-edit:hover { background: var(--accent); color: #fff; }
  .group-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
  .group-name-input {
    width: 100%; padding: 9px 12px;
    background: var(--glass-strong);
    border: 1px solid var(--border-strong);
    border-radius: 10px;
    color: var(--text-0); font-size: 15px; font-weight: 600;
    font-family: inherit; outline: none;
  }
  .group-name-input:focus { border-color: var(--accent); }
  .group-topic-input {
    width: 100%; padding: 8px 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-1); font-size: 13px;
    font-family: inherit; outline: none;
  }
  .group-topic-input:focus { border-color: var(--accent); }
  .group-save-row { display: flex; justify-content: flex-end; }

  /* ============ MEMBERS / LEVELS ============ */
  .lvl-legend {
    margin: 16px 0 18px;
    font-size: 12px; color: var(--text-1);
    display: flex; flex-direction: column; gap: 6px;
  }
  .lvl-legend strong { color: var(--text-0); }
  .lvl-dot {
    display: inline-block;
    width: 9px; height: 9px; border-radius: 50%;
    vertical-align: 0;
    margin-right: 6px;
  }
  .lvl-dot.normal { background: var(--text-2); }
  .lvl-dot.high   { background: var(--warn); }
  .lvl-dot.max    { background: var(--danger); }
  .members-list {
    border-top: 1px solid var(--border);
    padding-top: 12px;
  }
  .member-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 6px;
    border-radius: 10px;
    transition: background .12s;
  }
  .member-row + .member-row { border-top: 1px solid var(--border); }
  .member-row .avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--signal-blue));
    display: grid; place-items: center;
    font-size: 14px; font-weight: 700;
    flex-shrink: 0;
  }
  .member-row .info { flex: 1; min-width: 0; }
  .member-row .name {
    font-size: 14px; font-weight: 600;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .member-row .mxid {
    font-size: 11px; color: var(--text-2); margin-top: 2px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .lvl-selector {
    display: flex; gap: 4px;
    background: var(--glass-strong);
    border-radius: 999px;
    padding: 3px;
  }
  .lvl-selector button {
    background: transparent; border: 0;
    color: var(--text-2);
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 11px; font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background .12s, color .12s;
  }
  .lvl-selector button.on { color: #fff; }
  .lvl-selector button.on[data-lvl="normal"] { background: var(--text-3); }
  .lvl-selector button.on[data-lvl="high"]   { background: var(--warn); color: #1a1500; }
  .lvl-selector button.on[data-lvl="max"]    { background: var(--danger); }

  /* ============ NUKE BUTTONS ============ */
  .nuke-section { padding: 14px 12px; }
  .profile-nuke {
    width: 100%;
    padding: 14px 16px;
    background: linear-gradient(135deg, var(--danger), #d63045);
    border: 0; border-radius: 12px;
    color: #fff; font-weight: 700; font-size: 14px;
    letter-spacing: 0.5px; text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    font-family: inherit;
    box-shadow: 0 8px 22px rgba(255, 84, 112, 0.35);
    transition: transform .08s, filter .12s;
  }
  .profile-nuke:hover { filter: brightness(1.08); }
  .profile-nuke:active { transform: scale(0.98); }
  .profile-nuke.max {
    margin-top: 12px;
    background: linear-gradient(135deg, #6b1a2c, #2a0810);
    color: #ff9aa8;
    border: 1px solid rgba(255, 84, 112, 0.5);
  }
  .nuke-desc {
    font-size: 11px; color: var(--text-3);
    margin: 6px 4px 0;
    line-height: 1.4;
  }

  /* ============ PWA INSTALL HINT ============ */
  .install-hint {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, var(--signal-blue), var(--accent));
    color: #fff; padding: 12px 18px; border-radius: 14px;
    font-size: 13px; font-weight: 600;
    display: none; gap: 10px; align-items: center;
    box-shadow: 0 14px 40px rgba(58, 118, 240, 0.4);
    z-index: 800;
    cursor: pointer;
  }
  .install-hint.show { display: flex; }
  .install-hint button {
    background: rgba(255,255,255,0.2);
    border: 0; color: #fff;
    width: 22px; height: 22px; border-radius: 50%;
    cursor: pointer;
    display: grid; place-items: center;
    font-family: inherit;
  }

/* ======================================================================
   SYMBALYX SOCIAL UI V2
   Inspiration: Telegram clarity (clean cells, strong hierarchy) +
   Instagram profile cues (gradient avatar rings, soft cards). No assets copied.
   ====================================================================== */
:root {
  --bg-0: #05070d;
  --bg-1: #080b13;
  --bg-2: #0d111a;
  --bg-3: #151b27;
  --glass: rgba(15, 19, 31, 0.68);
  --glass-strong: rgba(255, 255, 255, 0.095);
  --border: rgba(255, 255, 255, 0.095);
  --border-strong: rgba(255, 255, 255, 0.18);
  --text-0: #f8fbff;
  --text-1: #d3d9e6;
  --text-2: #8d98aa;
  --text-3: #596275;
  --accent: #2f8cff;
  --accent-2: #22d3c5;
  --accent-warm: #ff4f8b;
  --accent-warm-2: #ffb347;
  --signal-blue: #2f8cff;
  --grad-warm: linear-gradient(135deg, #ff4f8b 0%, #ffb347 45%, #22d3c5 100%);
  --grad-cool: linear-gradient(135deg, #2f8cff 0%, #22d3c5 100%);
  --grad-brand: linear-gradient(135deg, #7c5cff 0%, #2f8cff 45%, #22d3c5 100%);
  --shadow: 0 28px 90px rgba(0, 0, 0, 0.50);
  --shadow-soft: 0 12px 32px rgba(0, 0, 0, 0.30);
}
body:not(.calc) {
  background:
    radial-gradient(760px 520px at 13% 0%, rgba(47, 140, 255, .20), transparent 64%),
    radial-gradient(640px 520px at 78% 8%, rgba(255, 79, 139, .13), transparent 62%),
    radial-gradient(760px 680px at 88% 96%, rgba(34, 211, 197, .12), transparent 64%),
    linear-gradient(180deg, #05070d 0%, #090c14 56%, #05070d 100%);
}
body:not(.calc)::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(circle at 60% 30%, black, transparent 76%);
}
.topbar {
  min-height: 58px;
  padding: 10px 18px;
  background: rgba(6, 9, 16, 0.76);
  border-bottom: 1px solid rgba(255,255,255,.08);
  box-shadow: 0 10px 34px rgba(0,0,0,.24);
}
.brand-logo,
.sidebar-foot .me .avatar,
.profile-header .avatar-lg,
.room-avatar,
.ai-pin-avatar,
.ai-header-avatar {
  background: var(--grad-brand);
  box-shadow: 0 10px 28px rgba(47,140,255,.24), inset 0 0 0 1px rgba(255,255,255,.18);
}
.brand-name { font-size: 15px; font-weight: 800; letter-spacing: -.25px; }
.secure-pill {
  background: rgba(34,211,197,.105);
  border-color: rgba(34,211,197,.35);
  color: #bffaf3;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.035);
}
.main-app.active {
  gap: 16px;
  padding: 14px;
}
.sidebar {
  width: 372px;
  margin: 0;
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 26px;
  background:
    linear-gradient(180deg, rgba(18,24,38,.88), rgba(9,12,20,.78)),
    radial-gradient(420px 260px at 50% -16%, rgba(47,140,255,.20), transparent 68%);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
}
.sidebar::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
  background: var(--grad-warm);
  opacity: .9;
}
.sidebar-head { padding: 20px 18px 8px; }
.sidebar-title {
  font-size: 25px;
  font-weight: 850;
  letter-spacing: -.75px;
  background: linear-gradient(135deg, #fff 10%, #b7d5ff 52%, #8cf3e9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.sidebar-icon-btn,
.icon-btn,
.action-btn {
  border-radius: 16px;
  background: rgba(255,255,255,.055);
  border: 1px solid rgba(255,255,255,.08);
}
.sidebar-icon-btn:hover,
.icon-btn:hover,
.action-btn:hover {
  transform: translateY(-1px);
  background: rgba(255,255,255,.12);
  border-color: rgba(255,255,255,.18);
}
.search-wrap { padding-bottom: 12px; }
.search-input {
  height: 46px;
  padding-left: 44px;
  border-radius: 18px;
  background: rgba(255,255,255,.075);
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
}
.search-input:focus {
  background: rgba(255,255,255,.105);
  border-color: rgba(47,140,255,.65);
  box-shadow: 0 0 0 4px rgba(47,140,255,.12);
}
.ai-pin {
  min-height: 76px;
  margin: 6px 0 14px;
  padding: 12px;
  border-radius: 22px;
  background:
    radial-gradient(130px 80px at 12% 0%, rgba(255,255,255,.16), transparent 70%),
    linear-gradient(135deg, rgba(124,92,255,.24), rgba(47,140,255,.16) 50%, rgba(34,211,197,.16));
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 12px 28px rgba(0,0,0,.20);
}
.ai-pin-name { font-size: 15px; }
.ai-pin-sub { color: #aeb8ca; }
.ai-pin-badge {
  background: rgba(34,211,197,.16);
  color: #a9fff7;
  border-color: rgba(34,211,197,.34);
}
.rooms-list { padding: 6px 10px 116px; }
.room-item {
  gap: 13px;
  margin: 3px 0;
  padding: 10px 12px;
  border-radius: 20px;
  border: 1px solid transparent;
  position: relative;
}
.room-item:hover {
  background: rgba(255,255,255,.07);
  border-color: rgba(255,255,255,.08);
}
.room-item.active {
  background: linear-gradient(135deg, rgba(47,140,255,.18), rgba(34,211,197,.09));
  border-color: rgba(47,140,255,.38);
  box-shadow: 0 12px 26px rgba(47,140,255,.10), inset 3px 0 0 rgba(34,211,197,.82);
}
.room-avatar {
  width: 50px;
  height: 50px;
  border: 2px solid rgba(7,10,18,.92);
  outline: 2px solid rgba(255,255,255,.06);
}
.avatar-wrap.is-online::before,
.profile-header .avatar-lg::before {
  filter: saturate(1.2);
}
.online-dot {
  width: 14px;
  height: 14px;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(255,255,255,.08);
}
.room-name { font-size: 15px; font-weight: 760; letter-spacing: -.18px; }
.room-meta,
.room-preview { color: #9aa6b8; }
.room-time { color: #728097; }
.room-unread {
  min-width: 22px;
  height: 22px;
  display: inline-grid;
  place-items: center;
  border-radius: 99px;
  background: var(--grad-cool);
  color: #fff;
  box-shadow: 0 8px 18px rgba(47,140,255,.24);
}
.sidebar-foot {
  margin: 10px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 22px;
  background: rgba(255,255,255,.055);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
}
.sidebar-foot .me .avatar {
  width: 42px;
  height: 42px;
  position: relative;
}
.sidebar-foot .me .avatar::after {
  content: "";
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ok);
  border: 3px solid #111827;
}
.sidebar-foot .me .label { font-weight: 760; }
.me-sub {
  margin-top: 2px;
  font-size: 11px;
  color: var(--text-2);
}
.sidebar-fab {
  bottom: 92px;
  right: 24px;
  width: 58px;
  height: 58px;
  background: var(--grad-warm);
  box-shadow: 0 18px 44px rgba(255,79,139,.24), 0 10px 24px rgba(47,140,255,.18);
}
.chat-panel {
  border-radius: 26px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.10);
  background:
    radial-gradient(820px 460px at 50% -12%, rgba(47,140,255,.11), transparent 60%),
    linear-gradient(180deg, rgba(12,16,26,.88), rgba(6,8,13,.84));
  box-shadow: var(--shadow-soft);
}
.chat-header,
.ai-header {
  min-height: 74px;
  padding: 14px 20px;
  background: rgba(9,12,20,.72);
  border-bottom: 1px solid rgba(255,255,255,.10);
}
.chat-header-name,
.ai-header-name { font-size: 17px; font-weight: 830; letter-spacing: -.35px; }
.chat-header-sub,
.ai-header-sub { font-size: 12px; color: #9ba7bb; }
.action-btn {
  width: 42px;
  height: 42px;
  color: #b4bfd0;
}
.action-btn.call:hover { background: rgba(34,211,197,.15); color: #8ff7ed; }
.action-btn.video:hover { background: rgba(47,140,255,.16); color: #a9ceff; }
.chat-frame-container {
  margin: 18px;
  border-radius: 28px;
  border: 1px solid rgba(255,255,255,.12);
  background:
    radial-gradient(660px 480px at 16% 0%, rgba(47,140,255,.13), transparent 68%),
    radial-gradient(560px 400px at 84% 100%, rgba(34,211,197,.10), transparent 68%),
    #090d14;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 22px 60px rgba(0,0,0,.36);
}
.chat-frame-container::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  background:
    linear-gradient(180deg, rgba(5,7,13,.26), transparent 18%, transparent 82%, rgba(5,7,13,.28)),
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: auto, 48px 48px, 48px 48px;
  opacity: .55;
}
.chat-frame-container iframe {
  border-radius: 28px;
  background: #090d14;
}
.no-room-placeholder .icon {
  border-radius: 28px;
  background: var(--grad-brand);
  box-shadow: 0 20px 54px rgba(47,140,255,.24);
}
.no-room-placeholder h2 {
  font-size: 28px;
  letter-spacing: -.8px;
}
.no-room-placeholder p { color: #9aa6b8; max-width: 520px; }
.profile-menu {
  left: 24px;
  bottom: 92px;
  width: 340px;
  border-radius: 28px;
  background:
    radial-gradient(280px 160px at 20% 0%, rgba(47,140,255,.22), transparent 66%),
    linear-gradient(180deg, rgba(18,24,38,.98), rgba(9,12,20,.98));
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 28px 90px rgba(0,0,0,.58);
}
.profile-header {
  padding: 22px;
  border-bottom: 1px solid rgba(255,255,255,.10);
}
.profile-header .avatar-lg {
  width: 62px;
  height: 62px;
  border: 3px solid rgba(9,12,20,.95);
  outline: 2px solid rgba(255,255,255,.08);
  position: relative;
}
.profile-header .avatar-lg::after {
  content: "Profil";
  position: absolute;
  left: 50%;
  bottom: -15px;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .5px;
  color: #061015;
  background: #bffaf3;
  box-shadow: 0 8px 18px rgba(34,211,197,.22);
}
.profile-header .name { font-size: 18px; font-weight: 830; }
.profile-header .mxid { color: #99a7bb; }
.profile-section { padding: 8px; }
.profile-item {
  min-height: 44px;
  border-radius: 16px;
  color: #d8deea;
}
.profile-item:hover {
  background: rgba(255,255,255,.08);
}
.profile-item.danger { color: #ff8ca0; }
.login-card {
  border-radius: 30px;
  background:
    radial-gradient(280px 160px at 50% 0%, rgba(47,140,255,.18), transparent 70%),
    rgba(10,14,23,.88);
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 30px 100px rgba(0,0,0,.48);
}
.lock-hero { border-radius: 24px; background: var(--grad-brand); }
.btn.full,
.btn {
  border-radius: 18px;
  background: var(--grad-brand);
  box-shadow: 0 14px 36px rgba(47,140,255,.20);
}
.field input {
  border-radius: 18px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.10);
}
.field input:focus {
  border-color: rgba(47,140,255,.65);
  box-shadow: 0 0 0 4px rgba(47,140,255,.13);
}
.ai-view {
  background:
    radial-gradient(720px 460px at 12% 0%, rgba(124,92,255,.13), transparent 68%),
    radial-gradient(720px 460px at 90% 100%, rgba(34,211,197,.10), transparent 68%);
}
.ai-msgs { background: transparent; }
.ai-bubble,
.ai-msg .bubble,
.ai-message {
  border-radius: 22px;
}
.decoy-chat {
  margin: 18px;
  border-radius: 28px;
  border: 1px solid rgba(255,255,255,.12);
  background: #090d14;
  overflow: hidden;
}
.decoy-input-bar {
  background: rgba(255,255,255,.055);
  border-top: 1px solid rgba(255,255,255,.10);
}
.decoy-input-bar input {
  border-radius: 18px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.10);
}
@media (max-width: 980px) {
  .main-app.active { padding: 8px; gap: 8px; }
  .sidebar { width: 340px; border-radius: 22px; }
  .chat-panel { border-radius: 22px; }
  .chat-frame-container { margin: 10px; border-radius: 22px; }
  .chat-frame-container iframe { border-radius: 22px; }
}
@media (max-width: 760px) {
  .main-app.active { padding: 0; }
  .sidebar, .chat-panel { border-radius: 0; border-left: 0; border-right: 0; }
  .sidebar { width: 100%; }
  .chat-header, .ai-header { min-height: 64px; padding: 10px 12px; }
  .chat-actions { gap: 4px; overflow-x: auto; max-width: 52vw; padding-bottom: 2px; }
  .action-btn { width: 38px; height: 38px; border-radius: 14px; }
}



/* ======================================================================
   SYMBALYX SOCIAL UI V3 — Telegram/Instagram inspired
   - Telegram: clean chat cells, readable hierarchy, compact actions.
   - Instagram: gradient avatar rings, profile card, bot dock visibility.
   No third-party assets copied from the inspiration zips.
   ====================================================================== */
:root {
  --v3-bg: #080b12;
  --v3-panel: rgba(14, 18, 29, .94);
  --v3-panel-2: rgba(21, 27, 41, .86);
  --v3-cell: rgba(255,255,255,.062);
  --v3-cell-hover: rgba(255,255,255,.10);
  --v3-stroke: rgba(255,255,255,.12);
  --v3-stroke-strong: rgba(255,255,255,.22);
  --v3-text: #f7f9ff;
  --v3-muted: #9aa7bb;
  --v3-blue: #3390ec;
  --v3-cyan: #29d4c6;
  --v3-pink: #ff4f8b;
  --v3-orange: #ffb347;
  --v3-green: #38e89a;
  --v3-ring: conic-gradient(from 210deg, #ff4f8b, #ffb347, #29d4c6, #3390ec, #8b5cf6, #ff4f8b);
}
body:not(.calc) {
  background:
    radial-gradient(920px 620px at 0% -10%, rgba(51,144,236,.23), transparent 60%),
    radial-gradient(820px 520px at 98% 0%, rgba(255,79,139,.16), transparent 58%),
    radial-gradient(720px 560px at 80% 110%, rgba(41,212,198,.13), transparent 58%),
    linear-gradient(180deg, #060810 0%, #0a0d15 52%, #05070c 100%) !important;
}
.topbar { display: none !important; }
.main-app.active {
  display: grid !important;
  grid-template-columns: minmax(318px, 372px) minmax(0, 1fr) minmax(270px, 318px);
  gap: 14px !important;
  padding: 14px !important;
  height: 100vh;
}
.sidebar,
.chat-panel,
.profile-rail {
  border: 1px solid var(--v3-stroke) !important;
  background: linear-gradient(180deg, rgba(16,20,32,.94), rgba(8,11,18,.90)) !important;
  box-shadow: 0 28px 90px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.045) !important;
}
.sidebar {
  border-radius: 28px !important;
  overflow: hidden;
}
.sidebar::before { height: 3px !important; background: var(--v3-ring) !important; opacity: 1 !important; }
.sidebar-head { padding: 18px 16px 10px !important; }
.sidebar-top { margin-bottom: 12px !important; }
.sidebar-title {
  font-size: 28px !important;
  letter-spacing: -1px !important;
  color: var(--v3-text) !important;
  background: none !important;
  -webkit-text-fill-color: initial !important;
  display: inline-flex;
  align-items: center;
  gap: 9px;
}
.sidebar-title::before {
  content: "";
  width: 34px;
  height: 34px;
  border-radius: 13px;
  background: var(--v3-ring);
  box-shadow: 0 10px 26px rgba(51,144,236,.28);
}
.search-input {
  height: 48px !important;
  border-radius: 18px !important;
  background: rgba(255,255,255,.075) !important;
  color: var(--v3-text) !important;
  border: 1px solid rgba(255,255,255,.11) !important;
  font-size: 14px !important;
}
.search-input:focus {
  background: rgba(255,255,255,.105) !important;
  border-color: rgba(51,144,236,.72) !important;
  box-shadow: 0 0 0 4px rgba(51,144,236,.14) !important;
}
.ai-pin {
  position: relative;
  min-height: 86px !important;
  border-radius: 24px !important;
  margin: 6px 0 12px !important;
  background:
    radial-gradient(160px 90px at 10% 0%, rgba(255,255,255,.18), transparent 60%),
    linear-gradient(135deg, rgba(51,144,236,.28), rgba(139,92,246,.21) 45%, rgba(41,212,198,.18)) !important;
  border: 1px solid rgba(255,255,255,.18) !important;
  color: #fff !important;
}
.ai-pin::after {
  content: "Assistant principal";
  position: absolute;
  right: 12px;
  top: 10px;
  padding: 4px 8px;
  border-radius: 999px;
  color: #b8fff6;
  background: rgba(41,212,198,.13);
  border: 1px solid rgba(41,212,198,.34);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .45px;
}
.ai-pin-name { font-size: 17px !important; font-weight: 900 !important; letter-spacing: -.35px; }
.ai-pin-sub { font-size: 12px !important; color: #c6d3e6 !important; max-width: 190px; }
.ai-pin-avatar,
.ai-header-avatar,
.room-avatar,
.profile-header .avatar-lg,
.sidebar-foot .me .avatar {
  position: relative;
  background: #111827 !important;
  border: 3px solid #111827 !important;
  outline: 2px solid rgba(255,255,255,.06) !important;
  box-shadow: 0 0 0 3px rgba(51,144,236,.22), 0 12px 24px rgba(0,0,0,.22) !important;
}
.ai-pin-avatar::before,
.ai-header-avatar::before,
.room-avatar::before,
.profile-header .avatar-lg::before,
.sidebar-foot .me .avatar::before {
  content: "";
  position: absolute;
  inset: -5px;
  border-radius: inherit;
  background: var(--v3-ring);
  z-index: -1;
}
.bot-dock {
  margin: 4px 0 14px;
  padding: 12px;
  border-radius: 24px;
  background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.10);
}
.bot-dock-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
}
.bot-dock-title {
  font-size: 11px;
  letter-spacing: .68px;
  text-transform: uppercase;
  color: #cbd6e8;
  font-weight: 900;
}
.bot-dock-status {
  font-size: 10px;
  padding: 4px 7px;
  border-radius: 999px;
  color: #aaffea;
  background: rgba(56,232,154,.12);
  border: 1px solid rgba(56,232,154,.24);
}
.bot-list { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.bot-card {
  border: 1px solid rgba(255,255,255,.10);
  background: linear-gradient(180deg, rgba(255,255,255,.075), rgba(255,255,255,.035));
  border-radius: 18px;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  color: var(--v3-text);
  transition: transform .14s ease, background .14s ease, border-color .14s ease;
  font-family: inherit;
}
.bot-card:hover { transform: translateY(-2px); background: rgba(255,255,255,.10); border-color: rgba(51,144,236,.42); }
.bot-ico {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(51,144,236,.35), rgba(41,212,198,.22));
  margin-bottom: 8px;
}
.bot-name { font-weight: 850; font-size: 12.5px; margin-bottom: 2px; }
.bot-desc { font-size: 10.7px; color: #92a0b4; line-height: 1.25; }
.rooms-list { padding: 6px 10px 116px !important; }
.room-item {
  min-height: 68px;
  border-radius: 22px !important;
  padding: 9px 12px !important;
  gap: 13px !important;
  margin: 4px 0 !important;
  border: 1px solid transparent !important;
}
.room-item:hover { background: var(--v3-cell-hover) !important; border-color: rgba(255,255,255,.10) !important; }
.room-item.active {
  background: linear-gradient(135deg, rgba(51,144,236,.22), rgba(41,212,198,.12)) !important;
  border-color: rgba(51,144,236,.42) !important;
  box-shadow: inset 4px 0 0 rgba(41,212,198,.9), 0 12px 28px rgba(51,144,236,.10) !important;
}
.room-avatar { width: 48px !important; height: 48px !important; font-size: 16px !important; }
.room-name { font-size: 15.5px !important; font-weight: 850 !important; }
.room-meta { color: #93a2b7 !important; font-size: 12px !important; }
.sidebar-foot {
  margin: 10px !important;
  border-radius: 24px !important;
  background: rgba(255,255,255,.06) !important;
}
.chat-panel {
  border-radius: 30px !important;
  overflow: hidden !important;
  min-width: 0;
}
.chat-header,
.ai-header {
  min-height: 74px !important;
  background: rgba(10,14,23,.86) !important;
  border-bottom: 1px solid rgba(255,255,255,.10) !important;
  backdrop-filter: blur(18px);
}
.chat-header-name,
.ai-header-name { font-size: 18px !important; font-weight: 900 !important; }
.action-btn,
.icon-btn,
.sidebar-icon-btn {
  border-radius: 16px !important;
  background: rgba(255,255,255,.07) !important;
  border: 1px solid rgba(255,255,255,.12) !important;
  color: #cad5e7 !important;
}
.action-btn:hover,
.icon-btn:hover,
.sidebar-icon-btn:hover { background: rgba(255,255,255,.13) !important; color: #fff !important; }
.action-btn.ai-action {
  background: linear-gradient(135deg, rgba(51,144,236,.35), rgba(41,212,198,.22)) !important;
  color: #dffffb !important;
  border-color: rgba(41,212,198,.35) !important;
}
.chat-frame-container {
  margin: 16px !important;
  border-radius: 28px !important;
  background: #0b1019 !important;
  border: 1px solid rgba(255,255,255,.12) !important;
}
.chat-frame-container iframe { border-radius: 28px !important; }
.no-room-placeholder {
  background:
    radial-gradient(420px 260px at 50% 0%, rgba(51,144,236,.18), transparent 68%),
    rgba(255,255,255,.025);
}
.profile-rail {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 28px;
  padding: 14px;
  overflow-y: auto;
  min-width: 0;
}
.rail-card {
  border: 1px solid rgba(255,255,255,.105);
  border-radius: 24px;
  background: rgba(255,255,255,.055);
  padding: 14px;
}
.rail-profile {
  text-align: center;
  padding-top: 18px;
  background:
    radial-gradient(220px 130px at 50% 0%, rgba(255,79,139,.20), transparent 70%),
    rgba(255,255,255,.052);
}
.rail-avatar {
  width: 74px;
  height: 74px;
  border-radius: 28px;
  display: grid;
  place-items: center;
  margin: 0 auto 12px;
  color: #fff;
  font-size: 26px;
  font-weight: 950;
  position: relative;
  background: #111827;
  border: 4px solid #111827;
  box-shadow: 0 0 0 4px rgba(255,255,255,.045), 0 18px 38px rgba(0,0,0,.24);
}
.rail-avatar::before {
  content: "";
  position: absolute;
  inset: -7px;
  border-radius: 32px;
  background: var(--v3-ring);
  z-index: -1;
}
.rail-title { font-size: 18px; font-weight: 950; letter-spacing: -.45px; }
.rail-sub { margin-top: 5px; color: var(--v3-muted); font-size: 12px; }
.rail-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px; }
.rail-kpi {
  padding: 10px 6px;
  border-radius: 16px;
  background: rgba(255,255,255,.055);
  border: 1px solid rgba(255,255,255,.08);
}
.rail-kpi strong { display:block; font-size: 15px; }
.rail-kpi span { display:block; color: var(--v3-muted); font-size: 10px; margin-top: 2px; }
.rail-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 950;
  letter-spacing: .7px;
  text-transform: uppercase;
  color: #cbd6e8;
  margin-bottom: 10px;
}
.rail-ai-status {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 11px;
  border-radius: 18px;
  background: rgba(51,144,236,.10);
  border: 1px solid rgba(51,144,236,.20);
  color: #dfeeff;
  font-size: 12px;
  line-height: 1.35;
}
.rail-ai-status .pulse {
  width: 10px;
  height: 10px;
  margin-top: 3px;
  border-radius: 50%;
  background: var(--v3-green);
  box-shadow: 0 0 0 0 rgba(56,232,154,.6);
  animation: railPulse 2s infinite;
  flex: 0 0 auto;
}
@keyframes railPulse { 70% { box-shadow: 0 0 0 10px rgba(56,232,154,0); } 100% { box-shadow: 0 0 0 0 rgba(56,232,154,0); } }
.rail-actions { display: grid; gap: 8px; margin-top: 12px; }
.rail-btn {
  min-height: 42px;
  border: 0;
  border-radius: 16px;
  color: #fff;
  font-family: inherit;
  font-weight: 850;
  cursor: pointer;
  background: linear-gradient(135deg, var(--v3-blue), var(--v3-cyan));
  box-shadow: 0 12px 26px rgba(51,144,236,.20);
}
.rail-btn.secondary {
  color: #dce8fa;
  background: rgba(255,255,255,.075);
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: none;
}
.rail-btn:hover { filter: brightness(1.09); transform: translateY(-1px); }
.ai-view {
  background:
    radial-gradient(620px 330px at 50% -10%, rgba(51,144,236,.18), transparent 64%),
    linear-gradient(180deg, rgba(8,12,20,.94), rgba(6,8,13,.92));
}
.ai-msgs { padding: 22px !important; }
.ai-msg.them,
.ai-msg.me {
  max-width: min(720px, 78%) !important;
  border-radius: 24px !important;
  padding: 14px 16px !important;
  line-height: 1.52 !important;
  font-size: 14px !important;
}
.ai-msg.them {
  background: rgba(255,255,255,.075) !important;
  border: 1px solid rgba(255,255,255,.10) !important;
}
.ai-msg.me {
  background: linear-gradient(135deg, rgba(51,144,236,.95), rgba(41,212,198,.84)) !important;
  color: #fff !important;
}
.ai-empty-avatar {
  background: var(--v3-ring) !important;
  box-shadow: 0 20px 50px rgba(51,144,236,.20) !important;
}
.ai-suggestion,
.ai-quick button {
  border-radius: 999px !important;
  background: rgba(255,255,255,.07) !important;
  border: 1px solid rgba(255,255,255,.12) !important;
}
.ai-input-bar {
  margin: 0 18px 18px !important;
  border-radius: 24px !important;
  background: rgba(255,255,255,.075) !important;
  border: 1px solid rgba(255,255,255,.12) !important;
  padding: 10px !important;
}
.ai-input-bar input {
  height: 46px !important;
  background: transparent !important;
  border: 0 !important;
  color: #fff !important;
}
.ai-send { width: 46px !important; height: 46px !important; background: linear-gradient(135deg, var(--v3-blue), var(--v3-cyan)) !important; }
.ai-empty p::after {
  content: "\A\ACommandes utiles : !remember, !recall, !learn, !html, !patch dans un salon Matrix avec @assistant invité.";
  white-space: pre-line;
  color: #90a0b7;
  display: block;
  font-size: 12px;
}
@media (max-width: 1220px) {
  .main-app.active { grid-template-columns: minmax(306px, 348px) minmax(0, 1fr); }
  .profile-rail { display: none; }
}
@media (max-width: 760px) {
  .main-app.active { display: flex !important; padding: 0 !important; gap: 0 !important; }
  .sidebar { border-radius: 0 !important; }
  .bot-list { grid-template-columns: 1fr; }
  .chat-panel { border-radius: 0 !important; }
}

</style>
</head>
<body class="calc">
<div class="app">

  <!-- ========= TOP BAR ========= -->
  <header class="topbar">
    <div class="brand">
      <button class="icon-btn mobile-only" id="toggleSidebar" style="display:none">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <div class="brand-logo" id="brandLogo"></div>
      <div class="brand-name" id="brandName"></div>
    </div>

    <div style="display:flex; align-items:center; gap:10px;">
      <div class="vault-badge" id="vaultBadge">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
        Coffre
      </div>
      <div class="secure-pill" title="Chiffrement de bout en bout actif">
        <span class="dot"></span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Chiffré E2E</span>
      </div>
    </div>
  </header>

  <!-- ========= CALCULATRICE (FAÇADE) ========= -->
  <main class="calc-view" id="calcView">
    <div class="calc-display" id="calcDisplay">0</div>
    <div class="calc-pad">
      <button class="calc-btn fn" data-act="clear">AC</button>
      <button class="calc-btn fn" data-act="sign">+/−</button>
      <button class="calc-btn fn" data-act="percent">%</button>
      <button class="calc-btn op" data-op="/">÷</button>

      <button class="calc-btn num" data-num="7">7</button>
      <button class="calc-btn num" data-num="8">8</button>
      <button class="calc-btn num" data-num="9">9</button>
      <button class="calc-btn op" data-op="*">×</button>

      <button class="calc-btn num" data-num="4">4</button>
      <button class="calc-btn num" data-num="5">5</button>
      <button class="calc-btn num" data-num="6">6</button>
      <button class="calc-btn op" data-op="-">−</button>

      <button class="calc-btn num" data-num="1">1</button>
      <button class="calc-btn num" data-num="2">2</button>
      <button class="calc-btn num" data-num="3">3</button>
      <button class="calc-btn op" data-op="+">+</button>

      <button class="calc-btn num zero" data-num="0">0</button>
      <button class="calc-btn num" data-num=".">,</button>
      <button class="calc-btn op" data-op="=">=</button>
    </div>
  </main>

  <!-- ========= LOGIN ========= -->
  <main class="login-wrap" id="loginView">
    <div class="login-card">
      <div class="lock-hero">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h1 style="text-align:center;">Connexion</h1>
      <div class="subtitle" style="text-align:center;">Messagerie privée chiffrée de bout en bout.</div>

      <form id="loginForm" autocomplete="off">
        <div class="field">
          <label for="user">Identifiant</label>
          <input id="user" type="text" placeholder="alice" autocapitalize="off" autocorrect="off" required />
        </div>
        <div class="field">
          <label for="pass">Mot de passe</label>
          <input id="pass" type="password" placeholder="••••••••" required />
        </div>
        <button class="btn full" type="submit" id="loginBtn">Se connecter</button>
        <div class="error-msg" id="loginError"></div>
      </form>

      <div class="login-foot">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Vos messages restent sur votre serveur local.
      </div>
    </div>
  </main>

  <!-- ========= SETUP (premier démarrage) ========= -->
  <main class="login-wrap" id="setupView" style="display:none">
    <div class="login-card">
      <div class="lock-hero">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      </div>
      <h1 style="text-align:center;">Première connexion</h1>
      <div class="subtitle" style="text-align:center;">Créez votre compte sur ce serveur privé.</div>
      <form id="setupForm" autocomplete="off">
        <div class="field">
          <label for="setupUser">Identifiant</label>
          <input id="setupUser" type="text" placeholder="ex: alice" autocapitalize="off" autocorrect="off" required />
        </div>
        <div class="field">
          <label for="setupPass">Mot de passe</label>
          <input id="setupPass" type="password" placeholder="••••••••" required />
        </div>
        <div class="field">
          <label for="setupPass2">Confirmer</label>
          <input id="setupPass2" type="password" placeholder="••••••••" required />
        </div>
        <button class="btn full" type="submit" id="setupBtn">Créer mon compte</button>
        <div class="error-msg" id="setupError"></div>
      </form>
      <div style="margin-top:14px; text-align:center;">
        <button style="background:none;border:0;color:var(--text-2);font-size:12px;cursor:pointer;" id="setupToLogin">Déjà un compte ? Se connecter</button>
      </div>
    </div>
  </main>

  <!-- ========= MAIN APP ========= -->
  <section class="main-app" id="mainApp">

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-head">
        <div class="sidebar-top">
          <span class="sidebar-title">Symbalyx</span>
          <div class="sidebar-icon-actions">
            <button class="sidebar-icon-btn" id="btnSelfNote" title="Note à moi-même">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><polygon points="18.5 2.5 22 6 12 16 8 17 9 13 18.5 2.5"/></svg>
            </button>
          </div>
        </div>
        <div class="search-wrap">
          <svg class="search-icon-inner" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" id="roomSearch" type="text" placeholder="Rechercher…" autocomplete="off" />
        </div>
        <button class="ai-pin" id="btnAssistant">
          <div class="ai-pin-avatar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.5 12 2"/></svg>
          </div>
          <div class="ai-pin-info">
            <div class="ai-pin-name">Mon IA <span class="ai-pin-badge">local</span></div>
            <div class="ai-pin-sub">Pose-moi n'importe quoi</div>
          </div>
        </button>
        <div class="bot-dock" id="botDock">
          <div class="bot-dock-head">
            <span class="bot-dock-title">Bots IA</span>
            <span class="bot-dock-status" id="botDockStatus">local</span>
          </div>
          <div class="bot-list">
            <button class="bot-card" data-bot="devweb">
              <span class="bot-ico">💻</span>
              <div class="bot-name">Dev Web</div>
              <div class="bot-desc">HTML clean & CSS</div>
            </button>
            <button class="bot-card" data-bot="debug">
              <span class="bot-ico">🧩</span>
              <div class="bot-name">Debug</div>
              <div class="bot-desc">patch erreurs JS</div>
            </button>
            <button class="bot-card" data-bot="memory">
              <span class="bot-ico">🧠</span>
              <div class="bot-name">Mémoire</div>
              <div class="bot-desc">Obsidian local</div>
            </button>
            <button class="bot-card" data-bot="resume">
              <span class="bot-ico">📄</span>
              <div class="bot-name">Résumé</div>
              <div class="bot-desc">salon / appel</div>
            </button>
          </div>
        </div>
      </div>

      <div class="rooms-list" id="roomsList">
        <div class="rooms-empty" id="roomsEmpty">
          Aucune conversation pour l'instant.<br>
          Créez un groupe privé pour démarrer.
        </div>
      </div>

      <div class="sidebar-foot">
        <div class="me" id="meTrigger" style="cursor:pointer; flex:1;">
          <div class="avatar" id="myAvatar">?</div>
          <div class="me-meta"><div class="label" id="myLabel">…</div><div class="me-sub">Profil local sécurisé</div></div>
        </div>
        <button class="icon-btn" id="lockNowBtn" title="Verrouiller maintenant">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>
      </div>
        <button class="sidebar-fab" id="btnNewGroup" title="Nouveau groupe chiffré">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
    </aside>

    <!-- Chat panel -->
    <div class="chat-panel" id="chatPanel">

      <div class="no-room-placeholder" id="noRoomView">
        <div class="icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <h2>Choisissez un chat</h2>
        <p>Une interface plus claire, inspirée des apps sociales modernes : salons à gauche, profil rapide en bas, sécurité visible sans polluer le chat.</p>
      </div>

      <div id="roomView" style="display:none; flex:1; flex-direction: column; min-height: 0;">
        <div class="chat-header">
          <div class="chat-header-left">
            <div class="room-avatar" id="curRoomAvatar" style="width:38px; height:38px; font-size:14px;">?</div>
            <div style="min-width:0;">
              <div class="chat-header-name" id="curRoomName">…</div>
              <div class="chat-header-sub">
                <span class="ok">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Chiffré
                </span>
                <span id="curRoomTimer" style="display:none" class="warn">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span id="curRoomTimerLabel"></span>
                </span>
                <span id="curRoomMembers"></span>
              </div>
            </div>
          </div>
          <div class="chat-actions">
            <button class="action-btn timer" id="btnTimer" title="Messages éphémères">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </button>
            <button class="action-btn call" id="btnVoiceCall" title="Appel voix">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
            <button class="action-btn video" id="btnVideoCall" title="Appel vidéo">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </button>
            <button class="action-btn ai-action" id="btnInviteAssistantQuick" title="Inviter le bot IA dans ce salon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6.5 7 .8-5 4.8 1.2 6.9L12 17.8 5.8 21 7 14.1 2 9.3l7-.8L12 2z"/></svg>
            </button>
            <button class="action-btn" id="btnAnnounce" title="Annonce épinglée">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
            </button>
            <button class="action-btn" id="btnPoll" title="Lancer un sondage">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </button>
            <button class="action-btn" id="btnAttach" title="Joindre un fichier chiffré">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <button class="action-btn" id="btnViewOnce" title="Le prochain fichier sera Voir une fois">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"/><line x1="2" y1="2" x2="22" y2="22" id="vo-slash" style="display:none"/></svg>
            </button>
            <input type="file" id="attachFile" style="display:none" multiple />
            <button class="action-btn" id="btnMembers" title="Membres et confidentialité">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </button>
            <button class="action-btn" id="btnSummary" title="Résumé / transcription">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </button>
            <button class="action-btn" id="btnInvite" title="Inviter des membres">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </button>
          </div>
        </div>

        <div class="chat-frame-container" id="elementFrameWrap">
          <div class="announce-bar" id="announceBar" style="display:none"></div>
          <iframe id="elementFrame" src="about:blank" allow="camera; microphone; display-capture; autoplay; clipboard-read; clipboard-write"></iframe>
        </div>

        <!-- Decoy fake chat — remplace l'iframe Element en mode leurre -->
        <div class="decoy-chat" id="decoyChat" style="display:none">
          <div class="decoy-msgs" id="decoyMsgs"></div>
          <div class="decoy-typing" id="decoyTyping">
            <span></span><span></span><span></span>
          </div>
          <div class="decoy-input-bar">
            <input id="decoyInput" type="text" placeholder="Message" autocomplete="off" />
            <button class="decoy-send" id="decoySend">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Vue Assistant IA (style "My AI" Snapchat) -->
      <div class="ai-view" id="assistantView">
        <div class="ai-header">
          <div class="ai-header-left">
            <div class="ai-header-avatar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.5 12 2"/></svg>
            </div>
            <div style="min-width:0;">
              <div class="ai-header-name">
                <button class="thread-switcher" id="threadSwitcher">
                  <span id="threadTitle">Mon IA</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="thread-menu" id="threadMenu" style="display:none">
                  <div class="thread-menu-head">
                    <span>Conversations</span>
                    <button id="threadNew" title="Nouvelle conversation">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                  <div class="thread-list" id="threadList"></div>
                </div>
              </div>
              <div class="ai-header-sub"><span class="dot"></span>Modèle local · vos messages ne quittent jamais l'appareil</div>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="icon-btn" id="aiToggleReason" title="Raisonnement étape par étape">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
            </button>
            <button class="icon-btn" id="aiMemoryBtn" title="Ma mémoire">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </button>
            <button class="icon-btn" id="aiBrainBtn" title="Cerveau (notes liées)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><line x1="7" y1="7" x2="11" y2="11"/><line x1="17" y1="7" x2="13" y2="11"/><line x1="7" y1="17" x2="11" y2="13"/><line x1="17" y1="17" x2="13" y2="13"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/></svg>
            </button>
            <button class="icon-btn" id="aiClear" title="Effacer la conversation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg>
            </button>
          </div>
        </div>

        <div class="ai-msgs" id="aiMsgs">
          <div id="aiMsgsList"></div>
          <div class="ai-empty" id="aiEmpty">
            <div class="ai-empty-avatar">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.5 12 2"/></svg>
            </div>
            <h2>Bonjour 👋</h2>
            <p>Je suis ton assistant local. Pose-moi une question, demande-moi de rédiger, traduire, résumer, calculer, ou de te poser un rappel.</p>
            <div class="ai-suggestions">
              <button class="ai-suggestion" data-prompt="Rédige un mail poli pour décliner un rendez-vous">✍️ Rédige un mail</button>
              <button class="ai-suggestion" data-prompt="/traduire en anglais Je vous prie d'agréer mes salutations distinguées">🌍 Traduire</button>
              <button class="ai-suggestion" data-prompt="/calc 1250 * 1.20">🧮 Calcule</button>
              <button class="ai-suggestion" data-prompt="/rappel 15m sortir le courrier">⏰ Rappel 15 min</button>
              <button class="ai-suggestion" data-prompt="Donne-moi 5 idées pour un dîner rapide">💡 Idées</button>
              <button class="ai-suggestion" data-prompt="Explique-moi simplement ce qu'est le chiffrement de bout en bout">📚 Explique</button>
            </div>
          </div>
        </div>
        <div class="ai-typing" id="aiTyping">
          <span></span><span></span><span></span>
        </div>

        <div class="ai-quick">
          <button data-prefix="/calc ">🧮 Calculer</button>
          <button data-prefix="/note ">📝 Note</button>
          <button data-prefix="/rappel 10m ">⏰ Rappel</button>
          <button data-prefix="/traduire en anglais ">🌍 Traduire</button>
          <button data-prefix="/rédige ">✍️ Rédiger</button>
          <button data-prefix="/résumer ">📄 Résumer</button>
        </div>
        <div class="ai-image-preview" id="aiImagePreview" style="display:none">
          <img id="aiImagePreviewImg" />
          <button id="aiImageClear" title="Retirer l'image">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <span id="aiImageHint">Image jointe · l'IA analysera son contenu</span>
        </div>
        <div class="ai-input-bar">
          <button class="ai-mic" id="aiAttachImg" title="Joindre une image">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><polyline points="21 15 16 10 5 21"/></svg>
          </button>
          <input type="file" id="aiImageInput" accept="image/*" style="display:none" />
          <button class="ai-mic" id="aiAttachFile" title="Joindre un fichier texte (.txt, .md, .csv, .json)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </button>
          <input type="file" id="aiFileInput" accept=".txt,.md,.csv,.json,.log,.yml,.yaml,text/*" style="display:none" />
          <input id="aiInput" type="text" placeholder="Pose ta question à Mon IA…" autocomplete="off" />
          <button class="ai-mic" id="aiMic" title="Dicter (Web Speech API)" style="display:none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          </button>
          <button class="ai-send" id="aiSend" title="Envoyer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

    </div>

    <!-- Profil conversation + bots IA visibles -->
    <aside class="profile-rail" id="profileRail">
      <div class="rail-card rail-profile">
        <div class="rail-avatar" id="railAvatar">IA</div>
        <div class="rail-title" id="railTitle">Assistant IA</div>
        <div class="rail-sub" id="railSub">Mémoire longue · HTML · debug</div>
        <div class="rail-kpis">
          <div class="rail-kpi"><strong id="railMembers">—</strong><span>membres</span></div>
          <div class="rail-kpi"><strong id="railMode">E2E</strong><span>sécurité</span></div>
          <div class="rail-kpi"><strong id="railBotState">IA</strong><span>bot</span></div>
        </div>
      </div>

      <div class="rail-card">
        <div class="rail-section-title">État IA <span id="railOllamaStatus">test…</span></div>
        <div class="rail-ai-status"><span class="pulse"></span><div id="railAiText">Ouvre “Mon IA” pour l'assistant local. Dans un salon, clique “Inviter IA” pour ajouter @assistant.</div></div>
        <div class="rail-actions">
          <button class="rail-btn" id="railOpenAI">Ouvrir Mon IA</button>
          <button class="rail-btn secondary" id="railInviteBot">Inviter @assistant dans ce salon</button>
        </div>
      </div>

      <div class="rail-card">
        <div class="rail-section-title">Profils rapides</div>
        <div class="rail-actions">
          <button class="rail-btn secondary" data-bot="devweb">Dev Web · génère HTML</button>
          <button class="rail-btn secondary" data-bot="debug">Debug · corrige bugs</button>
          <button class="rail-btn secondary" data-bot="memory">Mémoire · Obsidian</button>
        </div>
      </div>
    </aside>
  </section>

</div>

<!-- ========= PWA install hint ========= -->
<div class="install-hint" id="installHint">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  <span>Installer l'application</span>
  <button id="installDismiss" title="Plus tard">×</button>
</div>

<!-- ========= Summary / transcription modal ========= -->
<div class="modal-overlay" id="summaryModal">
  <div class="modal" style="max-width: 580px;">
    <div class="modal-head">
      <h3>Résumé · Transcription</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body" id="summaryBody">
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom: 16px;">
        <button class="btn ghost" id="btnTranscribeLast">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          Transcrire le dernier vocal
        </button>
        <button class="btn ghost" id="btnSummarizeCall">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          Enregistrer & résumer
        </button>
      </div>
      <div id="summaryOutput" style="min-height: 100px; padding: 14px; background: var(--bg-1); border-radius: 12px; font-size: 13px; line-height: 1.5; color: var(--text-1); white-space: pre-wrap;">
        Aucun contenu pour l'instant.
      </div>
    </div>
  </div>
</div>

<!-- ========= MODALES ========= -->

<!-- Création groupe -->
<div class="modal-overlay" id="modalNewGroup">
  <div class="modal">
    <div class="modal-head">
      <h3>Nouveau groupe privé chiffré</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="info-row">
        <div class="ic">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div>
          <strong>Chiffrement automatique</strong>
          <span>Tous les messages, fichiers et appels seront chiffrés de bout en bout.</span>
        </div>
      </div>

      <div class="field" style="margin-top:18px;">
        <label>Nom du groupe</label>
        <input id="newGroupName" type="text" placeholder="Équipe projet, Famille, …" maxlength="80" />
      </div>

      <div class="field">
        <label>Inviter des membres</label>
        <input id="newGroupInvite" type="text" placeholder="alice, bob, carol… (sans @)" autocapitalize="off" autocorrect="off" />
        <div class="user-suggestions" id="inviteSuggestions"></div>
        <div class="chip-list" id="newGroupChips"></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" data-close>Annuler</button>
      <button class="btn signal" id="btnCreateGroup">Créer le groupe</button>
    </div>
  </div>
</div>

<!-- Invitations dans groupe existant -->
<div class="modal-overlay" id="modalInvite">
  <div class="modal">
    <div class="modal-head">
      <h3>Inviter des membres</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label>Utilisateurs à inviter</label>
        <input id="inviteInput" type="text" placeholder="bob, carol… (sans @)" autocapitalize="off" autocorrect="off" />
        <div class="user-suggestions" id="inviteRoomSuggestions"></div>
        <div class="chip-list" id="inviteChips"></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" data-close>Annuler</button>
      <button class="btn signal" id="btnSendInvites">Inviter</button>
    </div>
  </div>
</div>

<!-- Timer messages éphémères -->
<div class="modal-overlay" id="modalTimer">
  <div class="modal">
    <div class="modal-head">
      <h3>Messages éphémères</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="info-row">
        <div class="ic" style="background: rgba(255, 179, 71, 0.12); color: var(--warn);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div>
          <strong>Auto-disparition serveur</strong>
          <span>Les messages plus anciens que la durée choisie sont effacés automatiquement par le serveur.</span>
        </div>
      </div>

      <p style="color: var(--text-2); font-size: 13px; margin: 18px 0 10px;">Durée de rétention :</p>
      <div class="timer-grid" id="timerGrid">
        <div class="timer-opt off" data-ms="0">Désactivé</div>
        <div class="timer-opt" data-ms="300000">5 min</div>
        <div class="timer-opt" data-ms="1800000">30 min</div>
        <div class="timer-opt" data-ms="3600000">1 heure</div>
        <div class="timer-opt" data-ms="18000000">5 heures</div>
        <div class="timer-opt" data-ms="54000000">15 heures</div>
        <div class="timer-opt" data-ms="86400000">1 jour</div>
        <div class="timer-opt" data-ms="604800000">1 semaine</div>
        <div class="timer-opt" data-ms="2592000000">1 mois</div>
        <div class="timer-opt" data-ms="7776000000">3 mois</div>
        <div class="timer-opt" data-ms="31536000000">1 an</div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" data-close>Annuler</button>
      <button class="btn" id="btnApplyTimer">Appliquer</button>
    </div>
  </div>
</div>

<!-- Appel en cours (Element Call iframe) -->
<div class="modal-overlay" id="callModal">
  <div class="modal modal-full">
    <div class="modal-head">
      <h3 id="callTitle">Appel en cours</h3>
      <div style="display:flex; gap:8px; align-items:center;">
        <button class="btn ghost" id="btnInviteCall">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Inviter
        </button>
        <button class="btn ghost" id="btnCopyCallLink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          Copier le lien
        </button>
        <button class="close-btn" id="btnEndCall" title="Quitter l'appel">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="modal-body">
      <iframe id="callFrame" src="about:blank" allow="camera; microphone; display-capture; autoplay; clipboard-read; clipboard-write"></iframe>
      <div class="call-hint">
        Pendant l'appel : cliquez sur l'icône <strong>micro</strong> pour vous muter, l'icône <strong>caméra</strong> pour couper la vidéo, et le <strong>moniteur</strong> pour partager votre écran.
      </div>
    </div>
  </div>
</div>

<!-- ========= MENU PROFIL ========= -->
<div class="profile-menu" id="profileMenu">
  <div class="profile-header">
    <div class="avatar-lg" id="profileAvatar">?</div>
    <div class="info">
      <div class="name" id="profileName">…</div>
      <div class="mxid" id="profileMxid">…</div>
    </div>
  </div>

  <div class="profile-section">
    <button class="profile-item" id="profStealth">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      </div>
      <span>Mode discret</span>
      <div class="toggle" id="stealthToggle"></div>
    </button>
    <button class="profile-item" id="profAutolock">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <span>Verrouillage auto</span>
      <span class="arrow" id="autolockLabel">5 min</span>
    </button>
    <button class="profile-item" id="profPhoto">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      </div>
      <span>Modifier ma photo</span>
    </button>
    <input type="file" id="profPhotoInput" accept="image/*" style="display:none" />
    <button class="profile-item" id="profBio">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.041.054-.09A13.916 13.916 0 0 0 8 11a4 4 0 0 1 8 0c0 .595-.034 1.184-.101 1.766M12 11v.01M17.94 17.94c-1.142 1.142-2.467 2.108-3.94 2.866M7 6.418a8 8 0 0 1 10.5 1.582M3 11c0-2.143.624-4.18 1.78-5.9"/></svg>
      </div>
      <span>Touch ID / Face ID</span>
      <span class="arrow" id="bioLabel">Activer</span>
    </button>
    <button class="profile-item" id="profClearLocal">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
      </div>
      <span>Effacer les données locales</span>
    </button>
  </div>

  <div class="profile-section">
    <button class="profile-item" id="profVaultAccount">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
      </div>
      <span>Compte coffre</span>
      <span class="arrow" id="vaultAccountLabel">Lier</span>
    </button>
    <button class="profile-item" id="profDecoy">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <span>Mode visiteur</span>
      <span class="arrow" id="decoyLabel">Configurer</span>
    </button>
  </div>

  <div class="profile-section">
    <button class="profile-item" id="profLogout">
      <div class="ic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </div>
      <span>Déconnexion</span>
    </button>
  </div>

  <div class="profile-section nuke-section">
    <button class="profile-nuke" id="profPanic">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
      TOUT SUPPRIMER
    </button>
    <div class="nuke-desc">Efface session, clés, cache, code coffre, code leurre, IndexedDB, service worker. Local.</div>
    <button class="profile-nuke max" id="profNuke">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
      ANNIHILATION SERVEUR
    </button>
    <div class="nuke-desc">Désactive aussi le compte Matrix côté serveur. Irréversible.</div>
  </div>

  <div class="profile-secret-zone" id="profSecretZone">
    <div>Symbalyx · v1</div>
    <div class="dot-row"><span></span><span></span><span></span></div>
  </div>
</div>

<!-- ========= PIN MODAL ========= -->
<div class="modal-overlay" id="pinModal">
  <div class="modal" style="max-width: 360px;">
    <div class="modal-head">
      <h3 id="pinTitle">Coffre</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <p class="pin-title" id="pinSubtitle">Entrez votre code à 4 chiffres</p>
      <div class="pin-display" id="pinDisplay">
        <div class="pin-dot"></div>
        <div class="pin-dot"></div>
        <div class="pin-dot"></div>
        <div class="pin-dot"></div>
      </div>
      <div class="pin-error" id="pinError">&nbsp;</div>
      <div class="pin-pad">
        <button class="pin-btn" data-d="1">1</button>
        <button class="pin-btn" data-d="2">2</button>
        <button class="pin-btn" data-d="3">3</button>
        <button class="pin-btn" data-d="4">4</button>
        <button class="pin-btn" data-d="5">5</button>
        <button class="pin-btn" data-d="6">6</button>
        <button class="pin-btn" data-d="7">7</button>
        <button class="pin-btn" data-d="8">8</button>
        <button class="pin-btn" data-d="9">9</button>
        <button class="pin-btn fn" id="pinReset">Reset</button>
        <button class="pin-btn" data-d="0">0</button>
        <button class="pin-btn fn" id="pinBack">←</button>
      </div>
    </div>
  </div>
</div>

<!-- ========= LOCK SCREEN (auto-lock après inactivité) ========= -->
<div class="lockscreen" id="lockscreen">
  <div class="lock-icon">
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  </div>
  <h2>Session verrouillée</h2>
  <p>Réauthentifiez-vous pour accéder à vos conversations.</p>
  <form id="unlockForm" class="lock-form">
    <div class="field">
      <input id="unlockPass" type="password" placeholder="Mot de passe Matrix" autofocus />
    </div>
    <button class="btn full" type="submit" id="unlockBtn">Déverrouiller</button>
    <div class="error-msg" id="unlockError"></div>
  </form>
</div>

<!-- ========= CONTEXT MENU (room actions) ========= -->
<div class="ctx-menu" id="ctxMenu">
  <button class="ctx-item" data-act="important">
    <div class="ic">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    </div>
    <span id="ctxImportantLabel">Conversation importante</span>
  </button>
  <button class="ctx-item" data-act="hide">
    <div class="ic">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    </div>
    <span id="ctxHideLabel">Masquer la conversation</span>
  </button>
  <button class="ctx-item" data-act="mute">
    <div class="ic">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
    </div>
    <span id="ctxMuteLabel">Couper les notifications</span>
  </button>
  <div class="ctx-divider"></div>
  <button class="ctx-item danger" data-act="leave">
    <div class="ic">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    </div>
    <span>Quitter la conversation</span>
  </button>
</div>

<!-- ========= Membres + niveau de confidentialité ========= -->
<div class="modal-overlay" id="modalMembers">
  <div class="modal" style="max-width: 520px;">
    <div class="modal-head">
      <h3>Membres · niveau de confidentialité</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="group-header" id="groupHeader">
        <div class="group-avatar-wrap">
          <div class="group-avatar-big" id="groupAvatarBig">?</div>
          <button class="group-avatar-edit" id="groupAvatarEdit" title="Changer la photo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
          <input type="file" id="groupAvatarInput" accept="image/*" style="display:none" />
        </div>
        <div class="group-meta">
          <input type="text" class="group-name-input" id="groupNameInput" placeholder="Nom du groupe" />
          <input type="text" class="group-topic-input" id="groupTopicInput" placeholder="Sujet / description du groupe (facultatif)" />
          <div class="group-save-row">
            <button class="btn" id="groupSaveBtn">Enregistrer les modifications</button>
          </div>
        </div>
      </div>

      <div class="info-row" style="margin-top:18px;">
        <div class="ic">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div>
          <strong>Comment ça fonctionne</strong>
          <span>Chaque contact a un niveau. Le niveau de la conversation = le plus élevé parmi les membres.</span>
        </div>
      </div>

      <div class="lvl-legend">
        <div><span class="lvl-dot normal"></span> <strong>Normal</strong> — fonctionnement standard</div>
        <div><span class="lvl-dot high"></span> <strong>Élevé</strong> — notifications silencieuses, aperçus masqués dans la liste</div>
        <div><span class="lvl-dot max"></span> <strong>Maximum</strong> — efface auto à 5 min, flou si fenêtre en arrière-plan, aucune notif</div>
      </div>

      <div class="members-list" id="membersList"></div>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" data-close>Fermer</button>
      <button class="btn" id="btnInviteAssistant">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect x="2" y="2" width="20" height="14" rx="2" ry="2"/><path d="M2 12h20"/><path d="M6 16h4"/><path d="M14 16h4"/></svg>
        Inviter l'Assistant IA
      </button>
    </div>
  </div>
</div>

<!-- Annonce épinglée -->
<div class="modal-overlay" id="modalAnnounce">
  <div class="modal" style="max-width: 480px;">
    <div class="modal-head">
      <h3>Annonces du groupe</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div id="announceList"></div>
      <div class="field" style="margin-top:16px;">
        <label>Nouvelle annonce</label>
        <textarea id="announceInput" placeholder="Ex : Réunion exceptionnelle demain 10h en visio." rows="3"></textarea>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" data-close>Annuler</button>
      <button class="btn signal" id="btnAnnouncePost">Épingler</button>
    </div>
  </div>
</div>

<!-- Sondage rapide -->
<div class="modal-overlay" id="modalPoll">
  <div class="modal" style="max-width: 460px;">
    <div class="modal-head">
      <h3>Nouveau sondage</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label>Question</label>
        <input id="pollQuestion" type="text" placeholder="Ex : On se voit quand ?" />
      </div>
      <div class="field">
        <label>Options (une par ligne, 2 à 8 max)</label>
        <textarea id="pollOptions" rows="6" placeholder="Vendredi 19h&#10;Samedi 14h&#10;Dimanche après-midi"></textarea>
      </div>
      <div class="info-row" style="margin-top:8px;">
        <div class="ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg></div>
        <div><strong>Comment ça marche</strong><span>Les membres réagissent aux options 1️⃣ 2️⃣ 3️⃣… pour voter dans Element.</span></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" data-close>Annuler</button>
      <button class="btn signal" id="btnPollSend">Publier</button>
    </div>
  </div>
</div>

<!-- Cerveau Obsidian-like de Mon IA -->
<div class="modal-overlay" id="modalBrain">
  <div class="modal modal-full">
    <div class="modal-head">
      <div style="display:flex; align-items:center; gap:14px;">
        <h3 style="margin:0;">Cerveau</h3>
        <div class="brain-tabs">
          <button class="brain-tab on" data-tab="notes">Notes</button>
          <button class="brain-tab" data-tab="graph">Graphe</button>
        </div>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button class="icon-btn" id="brainExportBtn" title="Exporter (JSON ou Markdown)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
        <button class="icon-btn" id="brainImportBtn" title="Importer un export JSON">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </button>
        <input type="file" id="brainImportInput" accept=".json,application/json" style="display:none" />
        <button class="close-btn" data-close>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="modal-body brain-body">
      <!-- Vue Notes : liste à gauche + éditeur à droite -->
      <div class="brain-pane brain-notes-pane" data-pane="notes">
        <div class="brain-sidebar">
          <div class="brain-search-wrap">
            <input type="text" id="brainSearch" placeholder="Rechercher dans le cerveau…" />
            <button class="brain-new" id="brainNew" title="Nouvelle note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <div class="brain-list" id="brainList"></div>
        </div>
        <div class="brain-editor" id="brainEditor">
          <div class="brain-empty" id="brainEditorEmpty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <h3>Aucune note ouverte</h3>
            <p>Sélectionne une note à gauche ou crée-en une nouvelle. L'IA en crée aussi automatiquement quand tu lui demandes de retenir quelque chose d'important.</p>
          </div>
          <div class="brain-edit" id="brainEdit" style="display:none">
            <input type="text" class="brain-title" id="brainTitle" placeholder="Titre" />
            <input type="text" class="brain-tags" id="brainTags" placeholder="tags séparés par des virgules" />
            <div class="brain-tabs-content">
              <button class="brain-mode on" data-mode="edit">Édition</button>
              <button class="brain-mode" data-mode="preview">Aperçu</button>
            </div>
            <textarea class="brain-content" id="brainContent" placeholder="Contenu (markdown). Tu peux lier d'autres notes avec [[Titre]]."></textarea>
            <div class="brain-suggest" id="brainSuggest" style="display:none">
              <div class="brain-suggest-label">Liens suggérés (Tab pour insérer)</div>
              <div class="brain-suggest-list" id="brainSuggestList"></div>
            </div>
            <div class="brain-preview" id="brainPreview" style="display:none"></div>
            <div class="brain-links">
              <div class="brain-links-section">
                <div class="brain-links-title">Liens sortants</div>
                <div id="brainOutlinks" class="brain-links-list"></div>
              </div>
              <div class="brain-links-section">
                <div class="brain-links-title">Mentionné dans (backlinks)</div>
                <div id="brainBacklinks" class="brain-links-list"></div>
              </div>
            </div>
            <div class="brain-edit-actions">
              <button class="btn ghost" id="brainDelete">Supprimer</button>
              <button class="btn" id="brainSave">Enregistrer</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Vue Graphe : visualisation force-directed -->
      <div class="brain-pane" data-pane="graph" style="display:none">
        <div class="brain-graph-wrap">
          <svg id="brainGraph" preserveAspectRatio="xMidYMid meet"></svg>
          <div class="brain-graph-empty" id="brainGraphEmpty" style="display:none">
            Aucune note pour le moment.<br>Crée des notes et relie-les avec [[Titre]] pour voir le graphe.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Mémoire long terme de Mon IA -->
<div class="modal-overlay" id="modalMemory">
  <div class="modal" style="max-width: 520px;">
    <div class="modal-head">
      <h3>Mémoire de Mon IA</h3>
      <button class="close-btn" data-close>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="info-row">
        <div class="ic">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <div>
          <strong>Ce que l'IA retient de toi</strong>
          <span>Stocké uniquement sur cet appareil. Tu peux supprimer un fait, en ajouter, ou tout effacer.</span>
        </div>
      </div>

      <div class="field" style="margin-top:14px;">
        <input id="memAddInput" type="text" placeholder="Ajouter un fait que l'IA doit retenir…" />
      </div>

      <div id="memoryList" class="memory-list"></div>
    </div>
    <div class="modal-foot">
      <button class="btn ghost" id="memClearAll">Tout effacer</button>
      <button class="btn" data-close>Fermer</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script src="templates.js">

/* ======================================================================
   Social UI V3 helpers: visible bots + profile rail
   ====================================================================== */
function refreshProfileRail(room) {
  const rail = document.getElementById("profileRail");
  if (!rail) return;
  const avatar = document.getElementById("railAvatar");
  const title = document.getElementById("railTitle");
  const sub = document.getElementById("railSub");
  const members = document.getElementById("railMembers");
  const botState = document.getElementById("railBotState");
  const mode = document.getElementById("railMode");
  const text = document.getElementById("railAiText");
  if (!room) {
    avatar.textContent = "IA";
    title.textContent = "Bots IA";
    sub.textContent = "Dev web · mémoire · debug · résumé";
    members.textContent = "4";
    mode.textContent = "local";
    botState.textContent = "visible";
    text.textContent = "Les bots sont visibles ici : Dev Web, Debug, Mémoire et Résumé. Pour un vrai bot Matrix dans un salon, crée le compte assistant puis invite @assistant.";
    return;
  }
  const assistantMxid = `@assistant:${CONFIG.serverName}`;
  const hasAssistant = Array.isArray(room.members) && (room.members.includes(assistantMxid) || room.members.includes("@assistant:localhost"));
  avatar.textContent = initials(room.name || "IA");
  title.textContent = room.name || "Conversation";
  sub.textContent = hasAssistant ? "@assistant est dans ce salon" : "Bot IA non invité dans ce salon";
  members.textContent = String(room.members?.length || 0);
  mode.textContent = room.retention ? "éph." : "E2E";
  botState.textContent = hasAssistant ? "actif" : "absent";
  text.textContent = hasAssistant
    ? "Tu peux parler au bot dans ce salon avec !help, !remember, !recall, !html ou !patch."
    : "Clique “Inviter @assistant” pour voir le bot IA dans ce salon. Si l'invitation échoue, lance le profil Docker IA et crée le compte assistant.";
}

const BOT_PROMPTS_V3 = {
  devweb: "Mode Dev Web : génère un fichier HTML propre, responsive, premium, sans casser l'existant. Donne le code complet et explique où le mettre.",
  debug: "Mode Debug : analyse ce bug, trouve la cause probable, puis propose un patch minimal sans réécrire tout le projet. Bug : ",
  memory: "Mode Mémoire : explique comment utiliser !remember, !recall, !learn, !feedback et le vault Obsidian local. Propose une structure de mémoire pour ce projet.",
  resume: "/résumer"
};
function openBotProfile(kind) {
  aiOpen();
  const input = document.getElementById("aiInput");
  if (!input) return;
  input.value = BOT_PROMPTS_V3[kind] || "";
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  toast(`Bot IA ouvert : ${kind}`, "ok");
}
function wireSocialV3() {
  document.querySelectorAll(".bot-card[data-bot], .rail-btn[data-bot]").forEach(btn => {
    btn.addEventListener("click", () => openBotProfile(btn.dataset.bot));
  });
  const quick = document.getElementById("btnInviteAssistantQuick");
  if (quick) quick.addEventListener("click", () => document.getElementById("btnInviteAssistant")?.click());
  const railInvite = document.getElementById("railInviteBot");
  if (railInvite) railInvite.addEventListener("click", () => document.getElementById("btnInviteAssistant")?.click());
  const railOpen = document.getElementById("railOpenAI");
  if (railOpen) railOpen.addEventListener("click", () => openBotProfile("devweb"));
  refreshProfileRail(null);
  fetch("/ollama/api/tags")
    .then(r => r.ok ? r.json() : Promise.reject(new Error("off")))
    .then(data => {
      const count = Array.isArray(data.models) ? data.models.length : 0;
      const label = count ? `${count} modèle${count > 1 ? "s" : ""}` : "Ollama vide";
      document.getElementById("railOllamaStatus") && (document.getElementById("railOllamaStatus").textContent = label);
      document.getElementById("botDockStatus") && (document.getElementById("botDockStatus").textContent = count ? "prêt" : "modèle ?");
    })
    .catch(() => {
      document.getElementById("railOllamaStatus") && (document.getElementById("railOllamaStatus").textContent = "Ollama off");
      document.getElementById("botDockStatus") && (document.getElementById("botDockStatus").textContent = "à lancer");
    });
}
setTimeout(wireSocialV3, 0);

</script>
<script>
/* =======================================================================
   Symbalyx UI — config
   ======================================================================= */
const APP_HOST = (window.location.hostname && window.location.hostname !== "")
  ? window.location.hostname
  : "localhost";
const APP_PROTO = window.location.protocol === "https:" ? "https" : "http";
const APP_ORIGIN = (window.location.origin && window.location.origin !== "null")
  ? window.location.origin
  : `${APP_PROTO}://${APP_HOST}`;
const IS_SINGLE_ORIGIN = window.location.port === "8443";

const CONFIG = {
  brandName:    "Symbalyx",
  brandSuffix:  "· secure",
  brandLetter:  "S",
  // Important : ne pas figer localhost. Sur téléphone, localhost = le téléphone,
  // pas le PC qui héberge Matrix. On reprend donc automatiquement l'hôte de l'URL.
  homeserver:   IS_SINGLE_ORIGIN ? "" : `${APP_PROTO}://${APP_HOST}:8008`,
  elementUrl:   IS_SINGLE_ORIGIN ? `${APP_ORIGIN}/element/` : `${APP_PROTO}://${APP_HOST}:8080`,
  elementCall:  IS_SINGLE_ORIGIN ? `${APP_ORIGIN}/call/` : `${APP_PROTO}://${APP_HOST}:8181`,
  whisperUrl:   IS_SINGLE_ORIGIN ? `${APP_ORIGIN}/whisper` : `${APP_PROTO}://${APP_HOST}:9000`,
  serverName:   APP_HOST === "127.0.0.1" ? "localhost" : APP_HOST
};

// Le branding n'est appliqué QUE quand l'app est déverrouillée.
// Tant qu'on est sur la calculatrice façade, le DOM ne contient
// aucun indice (title "Calculatrice", topbar masquée).
function applyBrand() {
  document.getElementById("brandLogo").textContent = CONFIG.brandLetter;
  document.getElementById("brandName").innerHTML   =
    `${CONFIG.brandName}<span>${CONFIG.brandSuffix}</span>`;
  // On NE change PAS document.title — il reste "Calculatrice" pour
  // que le titre de l'onglet ne révèle jamais rien.
}

/* =======================================================================
   Matrix client minimal
   ======================================================================= */
const M = {
  hs: CONFIG.homeserver,
  token: null,
  userId: null,
  deviceId: null,

  async req(method, path, body, opts = {}) {
    const headers = { "Content-Type": "application/json" };
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;
    let res;
    try {
      res = await fetch(`${this.hs}${path}`, {
        method, headers,
        body: body ? JSON.stringify(body) : undefined
      });
    } catch (networkErr) {
      const err = new Error(
        `Serveur Matrix injoignable (${this.hs || APP_ORIGIN}). ` +
        `Vérifie que Docker tourne et que tu ouvres l'app avec l'IP du PC, pas localhost sur téléphone.`
      );
      err.code = "NETWORK_ERROR";
      throw err;
    }
    if (!res.ok && !opts.silent) {
      const data = await res.json().catch(() => ({}));
      const err = new Error(data.error || `HTTP ${res.status}`);
      err.code = data.errcode; err.status = res.status; err.data = data;
      throw err;
    }
    return res.ok ? res.json() : null;
  },

  async login(user, pass) {
    const cleanUser = String(user || "").trim();
    const attempts = [cleanUser];
    if (cleanUser && !cleanUser.startsWith("@")) {
      attempts.push(`@${cleanUser}:${CONFIG.serverName}`);
      if (CONFIG.serverName !== "localhost") attempts.push(`@${cleanUser}:localhost`);
    }

    let lastErr = null;
    for (const candidate of [...new Set(attempts)]) {
      try {
        const data = await this.req("POST", "/_matrix/client/v3/login", {
          type: "m.login.password",
          identifier: { type: "m.id.user", user: candidate },
          password: pass,
          initial_device_display_name: "Symbalyx UI"
        });
        this.token    = data.access_token;
        this.userId   = data.user_id;
        this.deviceId = data.device_id;
        return data;
      } catch (err) {
        lastErr = err;
        // Une erreur réseau ou serveur ne sera pas corrigée par un autre format d'identifiant.
        if (err.code === "NETWORK_ERROR" || err.status >= 500) break;
      }
    }
    throw lastErr || new Error("Identifiants invalides");
  },

  async logout() {
    try { await this.req("POST", "/_matrix/client/v3/logout"); } catch {}
    this.token = this.userId = this.deviceId = null;
  },

  async whoami() {
    return this.req("GET", "/_matrix/client/v3/account/whoami");
  },

  async joinedRooms() {
    const data = await this.req("GET", "/_matrix/client/v3/joined_rooms");
    return data.joined_rooms || [];
  },

  async roomName(roomId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.name/`,
        null, { silent: true });
      return d?.name || null;
    } catch { return null; }
  },

  async roomMembers(roomId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/joined_members`);
      return Object.keys(d.joined || {});
    } catch { return []; }
  },

  async roomRetention(roomId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.retention/`,
        null, { silent: true });
      return d?.max_lifetime || 0;
    } catch { return 0; }
  },

  async setRoomRetention(roomId, maxLifetime) {
    const body = maxLifetime > 0 ? { max_lifetime: maxLifetime } : {};
    return this.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.retention/`,
      body);
  },

  async createPrivateGroup(name, invites) {
    return this.req("POST", "/_matrix/client/v3/createRoom", {
      preset: "private_chat",
      name: name || undefined,
      invite: invites,
      visibility: "private",
      initial_state: [
        {
          type: "m.room.encryption",
          state_key: "",
          content: { algorithm: "m.megolm.v1.aes-sha2" }
        },
        {
          type: "m.room.history_visibility",
          state_key: "",
          content: { history_visibility: "invited" }
        },
        {
          type: "m.room.guest_access",
          state_key: "",
          content: { guest_access: "forbidden" }
        }
      ]
    });
  },

  async invite(roomId, userId) {
    return this.req("POST",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/invite`,
      { user_id: userId });
  },

  async searchUsers(term) {
    try {
      const d = await this.req("POST", "/_matrix/client/v3/user_directory/search",
        { search_term: term, limit: 8 });
      return d?.results || [];
    } catch { return []; }
  }
};

/* =======================================================================
   CALCULATRICE FAÇADE
   La séquence de déverrouillage n'est pas stockée en clair dans le code.
   Seul son empreinte SHA-256 est présente : un attaquant qui lit le code
   source ne peut pas en déduire la séquence par lecture passive.
   ======================================================================= */
const SECRET_HASH = "f1dca364694135d21d30f1e1d12c7443bce2ccf8fc2e828264e523bfa799cd2b";

async function sha256Hex(s) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, "0")).join("");
}
async function isSecretSequence(a, op, b) {
  return (await sha256Hex(`${a}${op}${b}`)) === SECRET_HASH;
}

const calc = {
  display: "0",
  accumulator: 0,
  pendingOp: null,
  justComputed: false,
  prevB: null,   // pour détecter "a op b"
  unlocked: false
};

function fmtNumber(n) {
  if (n === undefined || n === null || Number.isNaN(n)) return "Erreur";
  if (!Number.isFinite(n)) return "∞";
  const s = (Math.abs(n) >= 1e16 || (Math.abs(n) < 1e-6 && n !== 0))
    ? n.toExponential(6)
    : String(Math.round(n * 1e10) / 1e10);
  // virgule comme séparateur décimal
  return s.replace(".", ",");
}

function updateCalcDisplay() {
  const el = document.getElementById("calcDisplay");
  if (!el) return;
  if (calc.display.includes(".") || calc.display.includes("e")) {
    el.textContent = calc.display.replace(".", ",");
  } else {
    // séparateurs de milliers
    const n = parseFloat(calc.display);
    el.textContent = Number.isFinite(n)
      ? n.toLocaleString("fr-FR", { maximumFractionDigits: 10 })
      : calc.display;
  }
  // Highlight l'opérateur courant
  document.querySelectorAll(".calc-btn.op").forEach(b => {
    b.classList.toggle("active",
      !calc.justComputed && b.dataset.op === calc.pendingOp);
  });
}

function calcInputDigit(d) {
  if (calc.justComputed) { calc.display = "0"; calc.justComputed = false; }
  if (d === ".") {
    if (!calc.display.includes(".")) calc.display += ".";
  } else if (calc.display === "0") {
    calc.display = d;
  } else if (calc.display.length < 16) {
    calc.display += d;
  }
  updateCalcDisplay();
}

function evalOp(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? NaN : a / b;
  }
  return b;
}

function calcInputOp(op) {
  if (op === "=") {
    if (calc.pendingOp == null) return;
    const a = calc.accumulator;
    const b = parseFloat(calc.display);
    const r = evalOp(a, calc.pendingOp, b);

    calc.display = fmtNumber(r);
    updateCalcDisplay();

    // Détection séquence de déverrouillage (asynchrone, via SHA-256)
    const opStr = calc.pendingOp;
    isSecretSequence(a, opStr, b).then(match => {
      if (match) setTimeout(unlockApp, 400);
    });

    calc.accumulator = r;
    calc.pendingOp = null;
    calc.justComputed = true;
  } else {
    if (calc.pendingOp && !calc.justComputed) {
      const b = parseFloat(calc.display);
      const r = evalOp(calc.accumulator, calc.pendingOp, b);
      calc.accumulator = r;
      calc.display = fmtNumber(r);
    } else {
      calc.accumulator = parseFloat(calc.display);
    }
    calc.pendingOp = op;
    calc.justComputed = true;
  }
  updateCalcDisplay();
}

function calcAction(act) {
  if (act === "clear") {
    calc.display = "0"; calc.accumulator = 0;
    calc.pendingOp = null; calc.justComputed = false;
  } else if (act === "sign") {
    if (calc.display !== "0") {
      calc.display = calc.display.startsWith("-")
        ? calc.display.slice(1) : "-" + calc.display;
    }
  } else if (act === "percent") {
    calc.display = fmtNumber(parseFloat(calc.display) / 100).replace(",", ".");
    calc.justComputed = true;
  }
  updateCalcDisplay();
}

function wireCalculator() {
  document.querySelectorAll(".calc-btn[data-num]").forEach(b =>
    b.addEventListener("click", () => calcInputDigit(b.dataset.num)));
  document.querySelectorAll(".calc-btn[data-op]").forEach(b =>
    b.addEventListener("click", () => calcInputOp(b.dataset.op)));
  document.querySelectorAll(".calc-btn[data-act]").forEach(b =>
    b.addEventListener("click", () => calcAction(b.dataset.act)));

  // Support clavier physique
  document.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("calc")) return;
    const k = e.key;
    if (/^[0-9]$/.test(k)) calcInputDigit(k);
    else if (k === "." || k === ",") calcInputDigit(".");
    else if (k === "+" || k === "-" || k === "*" || k === "/") calcInputOp(k);
    else if (k === "Enter" || k === "=") calcInputOp("=");
    else if (k === "Escape" || k.toLowerCase() === "c") calcAction("clear");
    else if (k === "%") calcAction("percent");
  });
}

function showCalc() {
  document.body.classList.add("calc");
  document.getElementById("calcView").style.display = "flex";
  document.getElementById("loginView").style.display = "none";
  const main = document.getElementById("mainApp");
  if (main) main.classList.remove("active");
  // Reset état calculatrice
  calc.display = "0"; calc.accumulator = 0;
  calc.pendingOp = null; calc.justComputed = false;
  calc.unlocked = false;
  updateCalcDisplay();
}

/* =======================================================================
   Touch ID / Face ID via WebAuthn (biométrie navigateur)
   ======================================================================= */
function bioCredKey() { return "c_d"; }
function hasBiometric() { return !!localStorage.getItem(bioCredKey()); }

function b64FromBytes(arr) {
  let s = ""; const b = new Uint8Array(arr);
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s);
}
function bytesFromB64(s) {
  const bin = atob(s);
  const u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
}

async function registerBiometric(userId) {
  if (!navigator.credentials || !window.PublicKeyCredential) {
    toast("Biométrie non supportée par ce navigateur", "err");
    return false;
  }
  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const userIdBytes = new TextEncoder().encode(userId || "anon");
    const cred = await navigator.credentials.create({
      publicKey: {
        challenge,
        // Nom volontairement neutre : c'est ce qui apparaît dans le
        // prompt OS natif ("XYZ veut utiliser Touch ID"). Une calculatrice
        // n'éveille aucun soupçon.
        rp: { name: "Calculatrice", id: location.hostname },
        user: {
          id: userIdBytes,
          name: userId || "user",
          displayName: (userId || "user").replace(/^@/, "").split(":")[0]
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },   // ES256
          { type: "public-key", alg: -257 }  // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",  // Touch ID / Face ID / Windows Hello
          userVerification: "required",
          residentKey: "preferred"
        },
        timeout: 60000,
        attestation: "none"
      }
    });
    if (!cred) return false;
    localStorage.setItem(bioCredKey(), b64FromBytes(cred.rawId));
    return true;
  } catch (e) {
    console.warn("biometric register failed", e);
    return false;
  }
}

async function verifyBiometric() {
  if (!hasBiometric()) return true;  // pas configuré = on laisse passer
  try {
    const credIdB64 = localStorage.getItem(bioCredKey());
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const res = await navigator.credentials.get({
      publicKey: {
        challenge,
        allowCredentials: [{ id: bytesFromB64(credIdB64), type: "public-key" }],
        userVerification: "required",
        timeout: 60000
      }
    });
    return !!res;
  } catch (e) {
    console.warn("biometric verify failed", e);
    return false;
  }
}

/* =======================================================================
   Déverrouillage de l'app depuis la calculatrice
   ======================================================================= */
async function unlockApp() {
  if (calc.unlocked) return;
  calc.unlocked = true;

  // Touch ID si configuré
  if (hasBiometric()) {
    const ok = await verifyBiometric();
    if (!ok) {
      // Échec biométrie → on reste sur la calculatrice, RAZ silencieux
      calc.display = "0"; calc.accumulator = 0;
      calc.pendingOp = null; calc.justComputed = false;
      calc.unlocked = false;
      updateCalcDisplay();
      return;
    }
  }

  // Bascule sur l'app
  document.body.classList.remove("calc");
  document.getElementById("calcView").style.display = "none";

  // Si jamais aucun compte créé depuis cet appareil → setup.
  // Le bouton "Déjà un compte" reste disponible si les comptes ont été créés en CLI.
  if (!localStorage.getItem("c_setup_done") && !sessionStorage.getItem("c_t")) {
    showSetup();
    return;
  }

  // Restaure une session si dispo
  const raw = sessionStorage.getItem("c_t");
  if (raw) {
    try {
      const s = JSON.parse(raw);
      M.token = s.token; M.userId = s.userId; M.deviceId = s.deviceId;
      const who = await M.whoami();
      if (who && who.user_id) { enterApp(); return; }
    } catch {}
  }
  showLogin();
}

/* =======================================================================
   UI state
   ======================================================================= */
const state = {
  rooms: [],          // [{id, name, members, retention, hidden, important, level}]
  currentRoomId: null,
  newGroupInvites: [],
  inviteChips: [],
  contactLevels: {},  // mxid -> "high" | "max"   (depuis account_data)
  avatars: {},        // mxid -> mxc URL (photo de profil)
  presences: {}       // mxid -> "online" | "unavailable" | "offline" | null
};

/* =======================================================================
   Helpers
   ======================================================================= */
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return Array.from(document.querySelectorAll(sel)); }

function toast(msg, type = "") {
  const t = $("#toast");
  t.textContent = msg;
  t.className = `toast show ${type}`;
  setTimeout(() => t.classList.remove("show"), 3000);
}

function ensureMxid(handle) {
  if (!handle) return null;
  handle = handle.trim();
  if (handle.startsWith("@")) return handle;
  if (handle.includes(":")) return "@" + handle;
  return `@${handle}:${CONFIG.serverName}`;
}

function initials(s) {
  if (!s) return "?";
  const parts = s.replace(/^[@#!]/, "").split(/[\s:_\-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return s.replace(/^[@#!]/, "").slice(0, 2).toUpperCase();
}

function fmtRetention(ms) {
  if (!ms) return null;
  const min = ms / 60000;
  if (min < 60) return `${Math.round(min)}min`;
  const h = min / 60;
  if (h < 24) return `${Math.round(h)}h`;
  const d = h / 24;
  if (d < 7) return `${Math.round(d)}j`;
  if (d < 30) return `${Math.round(d / 7)}sem`;
  if (d < 365) return `${Math.round(d / 30)}mois`;
  return `${Math.round(d / 365)}an${d >= 730 ? "s" : ""}`;
}

/* =======================================================================
   Auth flow
   ======================================================================= */
const loginForm  = $("#loginForm");
const loginBtn   = $("#loginBtn");
const loginErr   = $("#loginError");
const loginView  = $("#loginView");
const mainApp    = $("#mainApp");

function showLogin() {
  document.body.classList.remove("calc");
  document.getElementById("calcView").style.display = "none";
  loginView.style.display = "grid";
  mainApp.classList.remove("active");
  sessionStorage.removeItem("c_t");
}

function enterApp() {
  applyBrand();
  loginView.style.display = "none";
  mainApp.classList.add("active");
  const short = M.userId.replace(/^@/, "").split(":")[0];
  $("#myAvatar").textContent = initials(short);
  $("#myLabel").textContent  = short;
  loadRooms();
  startSyncLoop();
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginErr.classList.remove("show");
  const user = $("#user").value.trim();
  const pass = $("#pass").value;
  if (!user || !pass) return;
  loginBtn.disabled = true; loginBtn.textContent = "Connexion…";
  try {
    const data = await M.login(user, pass);
    sessionStorage.setItem("c_t", JSON.stringify({
      token: data.access_token, userId: data.user_id, deviceId: data.device_id
    }));
    enterApp();
  } catch (err) {
    if (err.code === "NETWORK_ERROR") {
      loginErr.textContent = err.message;
    } else if (err.code === "M_FORBIDDEN" || err.code === "M_UNKNOWN_TOKEN") {
      loginErr.textContent = "Connexion refusée : vérifie le mot de passe ou recrée le compte côté serveur.";
    } else {
      loginErr.textContent = err.message || "Identifiants invalides";
    }
    loginErr.classList.add("show");
  } finally {
    loginBtn.disabled = false; loginBtn.textContent = "Se connecter";
  }
});

/* logout géré par #profLogout dans le menu profil */

/* Boot : la calculatrice est l'écran d'accueil systématique.
   Pour passer outre, taper 2020 + 6 = (+ Touch ID si configuré). */
(function boot() {
  wireCalculator();
  showCalc();
})();

/* Search filter for room list */
document.getElementById("roomSearch")?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderRooms(q);
});

/* Premier démarrage — affiche setup si jamais connecté, login sinon */
function showSetup() {
  document.body.classList.remove("calc");
  document.getElementById("calcView").style.display = "none";
  document.getElementById("loginView").style.display = "none";
  document.getElementById("setupView").style.display = "grid";
}

document.getElementById("setupToLogin")?.addEventListener("click", () => {
  document.getElementById("setupView").style.display = "none";
  showLogin();
});

document.getElementById("setupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errEl = document.getElementById("setupError");
  errEl.classList.remove("show");
  const user = document.getElementById("setupUser").value.trim().toLowerCase().replace(/[^a-z0-9._\-]/g, "");
  const pass = document.getElementById("setupPass").value;
  const pass2 = document.getElementById("setupPass2").value;
  if (!user) { errEl.textContent = "Identifiant invalide (lettres et chiffres uniquement)"; errEl.classList.add("show"); return; }
  if (pass.length < 8) { errEl.textContent = "Mot de passe trop court (8 caractères min)"; errEl.classList.add("show"); return; }
  if (pass !== pass2) { errEl.textContent = "Les mots de passe ne correspondent pas"; errEl.classList.add("show"); return; }
  const btn = document.getElementById("setupBtn");
  btn.disabled = true; btn.textContent = "Création…";
  try {
    await M.req("POST", "/_matrix/client/v3/register", {
      username: user, password: pass,
      auth: { type: "m.login.dummy" }
    });
    localStorage.setItem("c_setup_done", "1");
    // Auto-login
    const data = await M.login(user, pass);
    sessionStorage.setItem("c_t", JSON.stringify({ token: data.access_token, userId: data.user_id, deviceId: data.device_id }));
    document.getElementById("setupView").style.display = "none";
    enterApp();
  } catch (err) {
    if (err.code === "M_FORBIDDEN" || /Registration has been disabled/i.test(err.message || "")) {
      errEl.textContent = "Création bloquée côté Synapse : active l'inscription locale dans homeserver.yaml ou utilise la commande register_new_matrix_user du README.";
    } else if (err.code === "NETWORK_ERROR") {
      errEl.textContent = err.message;
    } else if (err.code === "M_USER_IN_USE") {
      errEl.textContent = "Cet identifiant existe déjà. Clique sur ‘Déjà un compte ? Se connecter’.";
    } else {
      errEl.textContent = err.message || "Erreur lors de la création du compte";
    }
    errEl.classList.add("show");
  } finally {
    btn.disabled = false; btn.textContent = "Créer mon compte";
  }
});

/* =======================================================================
   Rooms list
   ======================================================================= */
async function loadRooms() {
  try {
    const ids = await M.joinedRooms();
    const rooms = [];
    for (const id of ids) {
      const [name, members, retention] = await Promise.all([
        M.roomName(id),
        M.roomMembers(id),
        M.roomRetention(id)
      ]);
      rooms.push({ id, name: name || "Conversation", members, retention });
    }
    rooms.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    state.rooms = rooms;
    renderRooms();
  } catch (err) {
    console.error(err);
    toast("Erreur de chargement des conversations", "err");
  }
}

function renderRooms() {
  const list = $("#roomsList");
  if (!state.rooms.length) {
    list.innerHTML = `<div class="rooms-empty">
      Aucune conversation pour l'instant.<br>Créez un groupe privé pour démarrer.
    </div>`;
    return;
  }
  list.innerHTML = state.rooms.map(r => `
    <div class="room-item ${r.id === state.currentRoomId ? "active" : ""}" data-id="${r.id}">
      <div class="room-avatar">${initials(r.name)}</div>
      <div class="room-info">
        <div class="room-name">${escapeHtml(r.name)}</div>
        <div class="room-meta">
          <span class="lock-mini">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          <span>${r.members.length} membre${r.members.length > 1 ? "s" : ""}</span>
          ${r.retention ? `<span class="timer-mini">· ${fmtRetention(r.retention)}</span>` : ""}
        </div>
      </div>
    </div>
  `).join("");

  $$("#roomsList .room-item").forEach(el => {
    el.addEventListener("click", () => selectRoom(el.dataset.id));
  });
}

function escapeHtml(s) {
  return (s || "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

async function selectRoom(roomId) {
  const r = state.rooms.find(x => x.id === roomId);
  if (!r) return;
  state.currentRoomId = roomId;
  $("#noRoomView").style.display = "none";
  $("#roomView").style.display   = "flex";
  const star = r.important ? "★ " : "";
  $("#curRoomName").textContent  = star + r.name;
  $("#curRoomAvatar").textContent = initials(r.name);
  let sub = `· ${r.members.length} membre${r.members.length > 1 ? "s" : ""}`;
  if (r.level === "max")  sub += " · niveau Maximum";
  else if (r.level === "high") sub += " · niveau Élevé";
  $("#curRoomMembers").textContent = sub;

  if (r.retention) {
    $("#curRoomTimer").style.display = "";
    $("#curRoomTimerLabel").textContent = `Auto-suppression ${fmtRetention(r.retention)}`;
    $("#btnTimer").classList.add("on");
  } else {
    $("#curRoomTimer").style.display = "none";
    $("#btnTimer").classList.remove("on");
  }

  // Tint header for high/max
  $("#roomView").className = `room-view lvl-${r.level || "normal"}`;
  $("#roomView").style.display = "flex";
  $("#roomView").style.flexDirection = "column";
  $("#roomView").style.minHeight = "0";
  $("#roomView").style.flex = "1";

  // Load Element on this room
  $("#elementFrame").src =
    `${CONFIG.elementUrl}/#/room/${encodeURIComponent(roomId)}`;

  refreshProfileRail(r);
  refreshBlurState();
  renderRooms();

  if (window.innerWidth <= 760) $("#sidebar").classList.add("hidden-mobile");
}

/* =======================================================================
   Sync loop (refresh rooms list periodically)
   ======================================================================= */
let syncTimer = null, presenceTimer = null;
function startSyncLoop() {
  if (syncTimer) clearInterval(syncTimer);
  if (presenceTimer) clearInterval(presenceTimer);
  syncTimer = setInterval(loadRooms, 15000);
  presenceTimer = setInterval(refreshPresence, 25000);
  setTimeout(refreshPresence, 1500);
}

/* =======================================================================
   Modal helpers
   ======================================================================= */
function openModal(id) { $(id).classList.add("active"); }
function closeModal(id) { $(id).classList.remove("active"); }
$$(".modal-overlay [data-close]").forEach(b => {
  b.addEventListener("click", e => {
    e.target.closest(".modal-overlay").classList.remove("active");
  });
});
$$(".modal-overlay").forEach(o => {
  o.addEventListener("click", e => {
    if (e.target === o) o.classList.remove("active");
  });
});

/* =======================================================================
   New group flow
   ======================================================================= */
/* Note à moi-même (WhatsApp / Signal) : un room privé sans autre membre */
$("#btnSelfNote").addEventListener("click", async () => {
  const existing = state.rooms.find(r =>
    /note à moi-même/i.test(r.name) ||
    (r.members.length === 1 && r.members[0] === M.userId)
  );
  if (existing) { selectRoom(existing.id); return; }
  try {
    const res = await M.createPrivateGroup("Note à moi-même", []);
    toast("Espace personnel créé", "ok");
    await loadRooms();
    selectRoom(res.room_id);
  } catch (err) {
    toast(err.message || "Erreur", "err");
  }
});

$("#btnNewGroup").addEventListener("click", () => {
  $("#newGroupName").value = "";
  $("#newGroupInvite").value = "";
  state.newGroupInvites = [];
  refreshNewGroupChips();
  openModal("#modalNewGroup");
  setTimeout(() => $("#newGroupName").focus(), 100);
});

function renderChips(sel, arr, onRemove) {
  const el = $(sel);
  el.innerHTML = arr.map((u, i) => `
    <div class="chip">
      <span>${escapeHtml(u.replace(/^@/, "").split(":")[0])}</span>
      <button data-i="${i}" title="Retirer">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join("");
  el.querySelectorAll("button").forEach(b => {
    b.addEventListener("click", () => {
      const idx = parseInt(b.dataset.i, 10);
      if (onRemove) onRemove(idx);
    });
  });
}

function attachSuggest(inputSel, suggSel, chipArr, onAdd) {
  const input = $(inputSel);
  const box   = $(suggSel);
  let timer = null;

  input.addEventListener("input", () => {
    const v = input.value.trim();
    clearTimeout(timer);
    if (!v) { box.classList.remove("show"); box.innerHTML = ""; return; }
    timer = setTimeout(async () => {
      const results = await M.searchUsers(v);
      if (!results.length) {
        box.innerHTML = `<div class="user-suggestion" data-id="${ensureMxid(v)}">
          <div class="avatar">${initials(v)}</div>
          <div>Inviter <strong>${escapeHtml(v)}</strong> (utilisateur local)</div>
        </div>`;
      } else {
        box.innerHTML = results.map(r => `
          <div class="user-suggestion" data-id="${escapeHtml(r.user_id)}">
            <div class="avatar">${initials(r.display_name || r.user_id)}</div>
            <div>
              <div style="font-weight:600">${escapeHtml(r.display_name || r.user_id.replace(/^@/, "").split(":")[0])}</div>
              <div style="font-size:11px; color:var(--text-2)">${escapeHtml(r.user_id)}</div>
            </div>
          </div>
        `).join("");
      }
      box.classList.add("show");
      box.querySelectorAll(".user-suggestion").forEach(el => {
        el.addEventListener("click", () => {
          const mxid = el.dataset.id;
          if (mxid && mxid !== M.userId && !chipArr.includes(mxid)) {
            chipArr.push(mxid);
            onAdd();
          }
          input.value = "";
          box.classList.remove("show");
          input.focus();
        });
      });
    }, 180);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = input.value.trim();
      if (v) {
        const mxid = ensureMxid(v);
        if (mxid !== M.userId && !chipArr.includes(mxid)) {
          chipArr.push(mxid);
          onAdd();
        }
        input.value = "";
        box.classList.remove("show");
      }
    } else if (e.key === "Backspace" && !input.value && chipArr.length) {
      chipArr.pop();
      onAdd();
    }
  });
}

function refreshNewGroupChips() {
  renderChips("#newGroupChips", state.newGroupInvites, (i) => {
    state.newGroupInvites.splice(i, 1);
    refreshNewGroupChips();
  });
}
attachSuggest("#newGroupInvite", "#inviteSuggestions", state.newGroupInvites, refreshNewGroupChips);

$("#btnCreateGroup").addEventListener("click", async () => {
  const name = $("#newGroupName").value.trim();
  // pickup any pending text in input
  const pending = $("#newGroupInvite").value.trim();
  if (pending) {
    const mxid = ensureMxid(pending);
    if (mxid !== M.userId && !state.newGroupInvites.includes(mxid)) {
      state.newGroupInvites.push(mxid);
    }
  }
  if (!name) { toast("Donnez un nom à votre groupe", "err"); return; }
  if (state.newGroupInvites.length === 0) {
    if (!confirm("Créer le groupe sans inviter personne pour l'instant ?")) return;
  }

  const btn = $("#btnCreateGroup");
  btn.disabled = true; btn.textContent = "Création…";
  try {
    const res = await M.createPrivateGroup(name, state.newGroupInvites);
    closeModal("#modalNewGroup");
    toast("Groupe créé · chiffrement activé", "ok");
    await loadRooms();
    selectRoom(res.room_id);
  } catch (err) {
    toast(err.message || "Erreur lors de la création", "err");
  } finally {
    btn.disabled = false; btn.textContent = "Créer le groupe";
  }
});

/* =======================================================================
   Invite existing
   ======================================================================= */
$("#btnInvite").addEventListener("click", () => {
  if (!state.currentRoomId) return;
  state.inviteChips = [];
  $("#inviteInput").value = "";
  renderChips("#inviteChips", state.inviteChips);
  openModal("#modalInvite");
  setTimeout(() => $("#inviteInput").focus(), 100);
});

function refreshInviteChips() {
  renderChips("#inviteChips", state.inviteChips, (i) => {
    state.inviteChips.splice(i, 1);
    refreshInviteChips();
  });
}
attachSuggest("#inviteInput", "#inviteRoomSuggestions", state.inviteChips, refreshInviteChips);

$("#btnSendInvites").addEventListener("click", async () => {
  const pending = $("#inviteInput").value.trim();
  if (pending) {
    const mxid = ensureMxid(pending);
    if (mxid !== M.userId && !state.inviteChips.includes(mxid)) {
      state.inviteChips.push(mxid);
    }
  }
  if (!state.inviteChips.length) { toast("Aucun utilisateur sélectionné", "err"); return; }
  const btn = $("#btnSendInvites");
  btn.disabled = true; btn.textContent = "Envoi…";
  let ok = 0, ko = 0;
  for (const mxid of state.inviteChips) {
    try { await M.invite(state.currentRoomId, mxid); ok++; }
    catch { ko++; }
  }
  btn.disabled = false; btn.textContent = "Inviter";
  closeModal("#modalInvite");
  toast(`${ok} invitation${ok > 1 ? "s" : ""} envoyée${ok > 1 ? "s" : ""}${ko ? ` · ${ko} échec` : ""}`, ko ? "err" : "ok");
  loadRooms();
});

/* =======================================================================
   Retention / messages éphémères
   ======================================================================= */
let selectedTimerMs = 0;

$("#btnTimer").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  const r = state.rooms.find(x => x.id === state.currentRoomId);
  selectedTimerMs = r?.retention || 0;
  $$("#timerGrid .timer-opt").forEach(el => {
    el.classList.toggle("selected", parseInt(el.dataset.ms, 10) === selectedTimerMs);
  });
  openModal("#modalTimer");
});

$$("#timerGrid .timer-opt").forEach(el => {
  el.addEventListener("click", () => {
    selectedTimerMs = parseInt(el.dataset.ms, 10);
    $$("#timerGrid .timer-opt").forEach(x => x.classList.remove("selected"));
    el.classList.add("selected");
  });
});

$("#btnApplyTimer").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  const btn = $("#btnApplyTimer");
  btn.disabled = true; btn.textContent = "Application…";
  try {
    await M.setRoomRetention(state.currentRoomId, selectedTimerMs);
    closeModal("#modalTimer");
    toast(selectedTimerMs ? `Messages éphémères : ${fmtRetention(selectedTimerMs)}` : "Messages éphémères désactivés", "ok");
    await loadRooms();
    selectRoom(state.currentRoomId);
  } catch (err) {
    toast(err.message || "Erreur de configuration", "err");
  } finally {
    btn.disabled = false; btn.textContent = "Appliquer";
  }
});

/* =======================================================================
   Appels voix / vidéo (Element Call)
   ======================================================================= */
function launchCall(audioOnly) {
  if (!state.currentRoomId) return;
  const r = state.rooms.find(x => x.id === state.currentRoomId);
  $("#callTitle").textContent =
    `${audioOnly ? "Appel voix" : "Appel vidéo"} · ${r?.name || ""}`;

  // Element Call standalone embed URL.
  // Les credentials Matrix sont passés via hash params pour éviter
  // que le token ne soit logué (referer/history).
  const hashParams = new URLSearchParams({
    roomId: state.currentRoomId,
    baseUrl: CONFIG.homeserver,
    userId: M.userId,
    deviceId: M.deviceId || "",
    token: M.token,
    displayName: M.userId.replace(/^@/, "").split(":")[0],
    perParticipantE2EE: "true",
    embed: "true",
    hideHeader: "true",
    appPrompt: "false",
    confineToRoom: "true",
    enableE2EE: "true",
    initialAudioInput: "default",
    initialVideoInput: audioOnly ? "off" : "default"
  });
  $("#callFrame").src = `${CONFIG.elementCall}/room/#?${hashParams.toString()}`;
  openModal("#callModal");
}

/* =======================================================================
   Upload de fichier chiffré (format Matrix EncryptedFile · AES-CTR)
   Le binaire est chiffré côté navigateur avant upload, la clé est
   transmise dans l'event m.room.message (chiffré ensuite par Megolm
   au niveau du salon E2E).
   ======================================================================= */
function b64UrlFromBytes(arr) {
  return b64FromBytes(arr).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function encryptedUpload(file) {
  // Génère clé AES-CTR 256 bits + IV 16o (8 premiers pour counter, le reste 0)
  const rawKey = crypto.getRandomValues(new Uint8Array(32));
  const iv     = new Uint8Array(16);
  crypto.getRandomValues(iv.subarray(0, 8));   // counter prefix
  const key = await crypto.subtle.importKey("raw", rawKey, "AES-CTR", true, ["encrypt"]);
  const buf = await file.arrayBuffer();
  const ct  = new Uint8Array(await crypto.subtle.encrypt(
    { name: "AES-CTR", counter: iv, length: 64 }, key, buf));

  // Hash SHA-256 du ciphertext (pour intégrité)
  const hashBuf = await crypto.subtle.digest("SHA-256", ct);

  // Upload vers Synapse media repo
  const url = `${CONFIG.homeserver}/_matrix/media/v3/upload?filename=${encodeURIComponent(file.name)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${M.token}`,
      "Content-Type": "application/octet-stream"
    },
    body: ct
  });
  if (!res.ok) throw new Error("Échec upload (" + res.status + ")");
  const { content_uri } = await res.json();

  // Construit l'event content au format Matrix EncryptedFile
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");
  return {
    msgtype: isImage ? "m.image" : isVideo ? "m.video" : isAudio ? "m.audio" : "m.file",
    body: file.name,
    info: { mimetype: file.type, size: file.size },
    file: {
      v: "v2",
      url: content_uri,
      mimetype: file.type,
      key: {
        kty: "oct",
        alg: "A256CTR",
        ext: true,
        k: b64UrlFromBytes(rawKey),
        key_ops: ["encrypt", "decrypt"]
      },
      iv: b64UrlFromBytes(iv),
      hashes: { sha256: b64UrlFromBytes(new Uint8Array(hashBuf)) }
    }
  };
}

async function sendFile(file, viewOnce = false) {
  if (!state.currentRoomId) return;
  if (file.size > 250 * 1024 * 1024) {
    toast("Fichier > 250 Mo, refusé par le serveur", "err");
    return;
  }
  if (file.size > 50 * 1024 * 1024) {
    toast(`Fichier volumineux (${Math.round(file.size/1024/1024)} Mo) · chiffrement en cours`, "");
  } else {
    toast(`Chiffrement de "${file.name}"…`, "");
  }
  try {
    const content = await encryptedUpload(file);
    if (viewOnce) {
      content["org.matrix.msc3531.view_once"] = true;
      content.body = "📷 " + content.body + " (à usage unique)";
    }
    const txnId = "t" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    const sent = await M.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(state.currentRoomId)}/send/m.room.message/${txnId}`,
      content);
    // Pour les Voir une fois, on programme une redaction côté serveur : 60s après
    // l'envoi, l'event original est supprimé. Pour un vrai "à la lecture" il
    // faudrait coordonner avec le destinataire, mais le délai court suffit
    // largement à empêcher la sauvegarde silencieuse.
    if (viewOnce && sent && sent.event_id) {
      setTimeout(() => {
        const tx = "r" + Date.now();
        M.req("PUT",
          `/_matrix/client/v3/rooms/${encodeURIComponent(state.currentRoomId)}/redact/${encodeURIComponent(sent.event_id)}/${tx}`,
          { reason: "view-once expired" }).catch(() => {});
      }, 60_000);
    }
    toast(`Envoyé · ${file.name}`, "ok");
  } catch (e) {
    toast("Échec : " + (e.message || "erreur"), "err");
  }
}

/* "Voir une fois" : flag posé sur le prochain fichier envoyé.
   Inspiré WhatsApp / Signal : la pièce jointe disparaît après 1 lecture. */
state.viewOnceNext = false;
$("#btnViewOnce").addEventListener("click", () => {
  state.viewOnceNext = !state.viewOnceNext;
  $("#btnViewOnce").classList.toggle("on", state.viewOnceNext);
  toast(state.viewOnceNext
    ? "Le prochain fichier sera Voir une fois"
    : "Voir une fois désactivé", "ok");
});
$("#btnAttach").addEventListener("click", () => $("#attachFile").click());
$("#attachFile").addEventListener("change", async (e) => {
  const files = Array.from(e.target.files || []);
  e.target.value = "";
  for (const f of files) await sendFile(f, state.viewOnceNext);
  if (state.viewOnceNext) {
    state.viewOnceNext = false;
    $("#btnViewOnce").classList.remove("on");
  }
});

/* =======================================================================
   Membres + niveau de confidentialité par contact
   ======================================================================= */
$("#btnInviteAssistant").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  const assistantMxid = `@assistant:${CONFIG.serverName}`;
  const r = state.rooms.find(x => x.id === state.currentRoomId);
  if (r && r.members.includes(assistantMxid)) {
    toast("L'assistant est déjà dans cette conversation", "ok");
    return;
  }
  try {
    await M.invite(state.currentRoomId, assistantMxid);
    toast("Assistant invité · il rejoint dans quelques secondes", "ok");
    closeModal("#modalMembers");
    setTimeout(loadRooms, 2000);
  } catch (err) {
    if ((err.code || "").includes("FORBIDDEN") || /403/.test(err.message)) {
      toast("Le compte 'assistant' n'existe pas encore (voir README)", "err");
    } else {
      toast(err.message || "Erreur", "err");
    }
  }
});

$("#btnMembers").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  const r = state.rooms.find(x => x.id === state.currentRoomId);
  if (!r) return;
  await renderGroupHeader(r);
  await renderMembers(r);
  openModal("#modalMembers");
});

async function renderGroupHeader(room) {
  const [topic, avatarMxc] = await Promise.all([
    M.getRoomTopic(room.id),
    M.getRoomAvatar(room.id)
  ]);
  const ab = $("#groupAvatarBig");
  if (avatarMxc) {
    ab.style.backgroundImage = `url("${M.mxcToHttp(avatarMxc, 192, 192)}")`;
    ab.textContent = "";
  } else {
    ab.style.backgroundImage = "";
    ab.textContent = initials(room.name);
  }
  $("#groupNameInput").value  = room.name === "Conversation" ? "" : room.name;
  $("#groupTopicInput").value = topic || "";
  $("#groupNameInput").dataset.original  = $("#groupNameInput").value;
  $("#groupTopicInput").dataset.original = $("#groupTopicInput").value;
}

$("#groupAvatarEdit").addEventListener("click", () => $("#groupAvatarInput").click());
$("#groupAvatarInput").addEventListener("change", async (e) => {
  const f = e.target.files[0]; e.target.value = "";
  if (!f || !state.currentRoomId) return;
  if (!f.type.startsWith("image/")) { toast("Doit être une image", "err"); return; }
  if (f.size > 5 * 1024 * 1024) { toast("Photo > 5 Mo", "err"); return; }
  try {
    const mxc = await M.uploadMedia(f, f.name);
    await M.setRoomAvatar(state.currentRoomId, mxc);
    $("#groupAvatarBig").style.backgroundImage = `url("${M.mxcToHttp(mxc, 192, 192)}")`;
    $("#groupAvatarBig").textContent = "";
    toast("Photo de groupe mise à jour", "ok");
  } catch (err) {
    toast("Échec : " + (err.message || "erreur"), "err");
  }
});

$("#groupSaveBtn").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  const name  = $("#groupNameInput").value.trim();
  const topic = $("#groupTopicInput").value.trim();
  const origName  = $("#groupNameInput").dataset.original;
  const origTopic = $("#groupTopicInput").dataset.original;
  const btn = $("#groupSaveBtn");
  btn.disabled = true; btn.textContent = "Enregistrement…";
  try {
    if (name && name !== origName) {
      await M.setRoomName(state.currentRoomId, name);
    }
    if (topic !== origTopic) {
      await M.setRoomTopic(state.currentRoomId, topic);
    }
    toast("Groupe mis à jour", "ok");
    await loadRooms();
    selectRoom(state.currentRoomId);
  } catch (err) {
    toast("Échec : " + (err.message || "erreur"), "err");
  } finally {
    btn.disabled = false; btn.textContent = "Enregistrer les modifications";
  }
});

async function renderMembers(room) {
  const list = $("#membersList");
  const others = (room.members || []).filter(m => m !== M.userId);
  const lvls = state.contactLevels || {};
  list.innerHTML = others.map(m => {
    const short = m.replace(/^@/, "").split(":")[0];
    const cur = lvls[m] || "normal";
    return `
      <div class="member-row" data-mxid="${escapeHtml(m)}">
        <div class="avatar">${initials(short)}</div>
        <div class="info">
          <div class="name">${escapeHtml(short)}</div>
          <div class="mxid">${escapeHtml(m)}</div>
        </div>
        <div class="lvl-selector" data-mxid="${escapeHtml(m)}">
          <button data-lvl="normal" class="${cur==='normal'?'on':''}">Normal</button>
          <button data-lvl="high"   class="${cur==='high'?'on':''}">Élevé</button>
          <button data-lvl="max"    class="${cur==='max'?'on':''}">Max</button>
        </div>
      </div>
    `;
  }).join("");
  list.querySelectorAll(".lvl-selector").forEach(sel => {
    sel.querySelectorAll("button").forEach(b => {
      b.addEventListener("click", async () => {
        const mxid = sel.dataset.mxid;
        const lvl  = b.dataset.lvl;
        sel.querySelectorAll("button").forEach(x => x.classList.remove("on"));
        b.classList.add("on");
        state.contactLevels = state.contactLevels || {};
        if (lvl === "normal") delete state.contactLevels[mxid];
        else state.contactLevels[mxid] = lvl;
        try {
          await M.req("PUT",
            `/_matrix/client/v3/user/${encodeURIComponent(M.userId)}/account_data/org.symbalyx.contact_levels`,
            state.contactLevels);
          toast(`Niveau ${lvl} pour ${mxid.replace(/^@/, "").split(":")[0]}`, "ok");
          await loadRooms();
        } catch (e) { toast(e.message || "Erreur", "err"); }
      });
    });
  });
}

/* Auto-blur quand la fenêtre perd le focus et qu'on est sur une conv niveau MAX */
function refreshBlurState() {
  const r = state.rooms.find(x => x.id === state.currentRoomId);
  if (r && r.level === "max" && !document.hasFocus()) {
    document.body.classList.add("blur-on-blur");
  } else {
    document.body.classList.remove("blur-on-blur");
  }
}
window.addEventListener("blur", refreshBlurState);
window.addEventListener("focus", refreshBlurState);
document.addEventListener("visibilitychange", refreshBlurState);

$("#btnVoiceCall").addEventListener("click", () => launchCall(true));
$("#btnVideoCall").addEventListener("click", () => launchCall(false));
$("#btnEndCall").addEventListener("click", () => {
  $("#callFrame").src = "about:blank";
  closeModal("#callModal");
});
$("#btnCopyCallLink").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  // Lien Element Call standalone vers ce room (les destinataires devront se loger)
  const link = `${CONFIG.elementCall}/room/?roomId=${encodeURIComponent(state.currentRoomId)}`;
  try {
    await navigator.clipboard.writeText(link);
    toast("Lien copié — colle-le dans la conversation pour inviter quelqu'un", "ok");
  } catch {
    prompt("Copie ce lien :", link);
  }
});

$("#btnInviteCall").addEventListener("click", () => {
  // Ouvre la modale d'invitation sans fermer l'appel : l'utilisateur
  // invite, ferme la modale, l'invité reçoit la notif et peut rejoindre.
  state.inviteChips = [];
  $("#inviteInput").value = "";
  renderChips("#inviteChips", state.inviteChips);
  openModal("#modalInvite");
  setTimeout(() => $("#inviteInput").focus(), 100);
});

/* =======================================================================
   Mobile sidebar toggle
   ======================================================================= */
function refreshMobile() {
  const isMobile = window.innerWidth <= 760;
  $("#toggleSidebar").style.display = isMobile ? "" : "none";
  if (!isMobile) $("#sidebar").classList.remove("hidden-mobile");
}
window.addEventListener("resize", refreshMobile);
refreshMobile();
$("#toggleSidebar").addEventListener("click", () => {
  $("#sidebar").classList.toggle("hidden-mobile");
});

/* =======================================================================
   Tags API (rooms cachés)
   ======================================================================= */
const HIDDEN_TAG    = "u.symbalyx.hidden";
const IMPORTANT_TAG = "m.favourite";

Object.assign(M, {
  async tagRoom(roomId, tag, order = 0) {
    return this.req("PUT",
      `/_matrix/client/v3/user/${encodeURIComponent(this.userId)}/rooms/${encodeURIComponent(roomId)}/tags/${encodeURIComponent(tag)}`,
      { order });
  },
  async untagRoom(roomId, tag) {
    return this.req("DELETE",
      `/_matrix/client/v3/user/${encodeURIComponent(this.userId)}/rooms/${encodeURIComponent(roomId)}/tags/${encodeURIComponent(tag)}`);
  },
  async getRoomTags(roomId) {
    const d = await this.req("GET",
      `/_matrix/client/v3/user/${encodeURIComponent(this.userId)}/rooms/${encodeURIComponent(roomId)}/tags`,
      null, { silent: true });
    return d?.tags || {};
  },
  async leaveRoom(roomId) {
    return this.req("POST",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/leave`, {});
  },
  async forgetRoom(roomId) {
    return this.req("POST",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/forget`, {});
  },
  async setPushRule(scope, kind, ruleId, body) {
    return this.req("PUT",
      `/_matrix/client/v3/pushrules/${scope}/${kind}/${encodeURIComponent(ruleId)}`, body);
  },
  // ---- Profil : photo et nom affiché ----
  async getAvatarUrl(userId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/profile/${encodeURIComponent(userId)}/avatar_url`,
        null, { silent: true });
      return d?.avatar_url || null;
    } catch { return null; }
  },
  async setAvatarUrl(mxc) {
    return this.req("PUT",
      `/_matrix/client/v3/profile/${encodeURIComponent(this.userId)}/avatar_url`,
      { avatar_url: mxc });
  },
  async setDisplayName(name) {
    return this.req("PUT",
      `/_matrix/client/v3/profile/${encodeURIComponent(this.userId)}/displayname`,
      { displayname: name });
  },
  mxcToHttp(mxc, w = 64, h = 64) {
    if (!mxc || !mxc.startsWith("mxc://")) return null;
    const [, server, mediaId] = mxc.match(/^mxc:\/\/([^/]+)\/(.+)$/);
    return `${CONFIG.homeserver}/_matrix/client/v1/media/thumbnail/${server}/${mediaId}?width=${w}&height=${h}&method=crop`;
  },
  async uploadMedia(blob, filename) {
    const res = await fetch(
      `${CONFIG.homeserver}/_matrix/media/v3/upload?filename=${encodeURIComponent(filename || "file")}`,
      { method: "POST",
        headers: { "Authorization": `Bearer ${this.token}`, "Content-Type": blob.type || "application/octet-stream" },
        body: blob });
    if (!res.ok) throw new Error("upload failed");
    return (await res.json()).content_uri;
  },
  // ---- Présence (en ligne / dernière activité) ----
  async getPresence(userId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/presence/${encodeURIComponent(userId)}/status`,
        null, { silent: true });
      return d || null;
    } catch { return null; }
  },
  async setMyPresence(presence) {
    return this.req("PUT",
      `/_matrix/client/v3/presence/${encodeURIComponent(this.userId)}/status`,
      { presence });
  },
  // ---- Métadonnées de groupe ----
  async setRoomName(roomId, name) {
    return this.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.name/`,
      { name });
  },
  async setRoomTopic(roomId, topic) {
    return this.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.topic/`,
      { topic });
  },
  async getRoomTopic(roomId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.topic/`,
        null, { silent: true });
      return d?.topic || "";
    } catch { return ""; }
  },
  async setRoomAvatar(roomId, mxc) {
    return this.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.avatar/`,
      { url: mxc });
  },
  async getRoomAvatar(roomId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.avatar/`,
        null, { silent: true });
      return d?.url || null;
    } catch { return null; }
  },
  // ---- Messages épinglés (annonces) ----
  async getPinnedEvents(roomId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.pinned_events/`,
        null, { silent: true });
      return d?.pinned || [];
    } catch { return []; }
  },
  async setPinnedEvents(roomId, eventIds) {
    return this.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.pinned_events/`,
      { pinned: eventIds });
  },
  // ---- Annonces Symbalyx (state event custom) ----
  async getAnnouncements(roomId) {
    try {
      const d = await this.req("GET",
        `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/org.symbalyx.announcements/`,
        null, { silent: true });
      return d?.announcements || [];
    } catch { return []; }
  },
  async setAnnouncements(roomId, announcements) {
    return this.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/org.symbalyx.announcements/`,
      { announcements });
  }
});

/* =======================================================================
   PIN (vault unlock) — PBKDF2 250 000 itérations + salt aléatoire 16o
   Format stocké : pbkdf2_v1:saltHex:iterations:hashHex
   ======================================================================= */
async function sha256(s) {
  const buf = new TextEncoder().encode(s);
  const h   = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(h))
    .map(b => b.toString(16).padStart(2, "0")).join("");
}

const PIN_ITER = 250000;
function randomSalt() {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return Array.from(a).map(b => b.toString(16).padStart(2, "0")).join("");
}
async function pbkdf2(secret, saltHex, iter, bits = 256) {
  const enc = new TextEncoder();
  const saltBytes = new Uint8Array(saltHex.match(/.{2}/g).map(h => parseInt(h, 16)));
  const km = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "PBKDF2" }, false, ["deriveBits"]
  );
  const d = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBytes, iterations: iter, hash: "SHA-256" },
    km, bits
  );
  return Array.from(new Uint8Array(d)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function pinKey()    { return `c_a_${M.userId || "anon"}`; }
function hasPinSet() { return !!localStorage.getItem(pinKey()); }

async function setPin(pin) {
  const salt = randomSalt();
  const hash = await pbkdf2(`${M.userId}:${pin}`, salt, PIN_ITER);
  localStorage.setItem(pinKey(), `pbkdf2_v1:${salt}:${PIN_ITER}:${hash}`);
}

async function pinMatches(pin) {
  const stored = localStorage.getItem(pinKey());
  if (!stored) return false;
  // Legacy SHA-256 fallback : migrer au prochain bon PIN
  if (!stored.startsWith("pbkdf2_v1:")) {
    const legacyOk = (await sha256(`${M.userId}:${pin}`)) === stored;
    if (legacyOk) await setPin(pin); // upgrade silencieux
    return legacyOk;
  }
  const [, salt, iterStr, expected] = stored.split(":");
  const h = await pbkdf2(`${M.userId}:${pin}`, salt, parseInt(iterStr, 10));
  return h === expected;
}
function clearPin() { localStorage.removeItem(pinKey()); }

/* =======================================================================
   Vault state — re-filtre la sidebar
   ======================================================================= */
state.vault = false;        // true = on affiche UNIQUEMENT les rooms cachées
state.hiddenRooms = new Set();

const origLoadRooms = loadRooms;
loadRooms = async function () {
  try {
    const ids = await M.joinedRooms();
    const rooms = [];
    state.hiddenRooms.clear();
    // Charger les niveaux de confidentialité par contact (account_data)
    try {
      const lvl = await M.req("GET",
        `/_matrix/client/v3/user/${encodeURIComponent(M.userId)}/account_data/org.symbalyx.contact_levels`,
        null, { silent: true });
      state.contactLevels = lvl || {};
    } catch { state.contactLevels = {}; }

    for (const id of ids) {
      const [name, members, retention, tags, avatar] = await Promise.all([
        M.roomName(id),
        M.roomMembers(id),
        M.roomRetention(id),
        M.getRoomTags(id),
        M.getRoomAvatar(id)
      ]);
      const hidden    = !!tags[HIDDEN_TAG];
      const important = !!tags[IMPORTANT_TAG];
      if (hidden) state.hiddenRooms.add(id);
      const room = { id, name: name || "Conversation", members, retention, hidden, important, avatar };
      room.level = roomMaxLevel(room);
      rooms.push(room);

      // Niveau MAX : auto-suppression 5 min + chiffrement renforcé
      // (rotation de clés Megolm toutes les heures et tous les 10 messages,
      //  au lieu de 1 semaine / 100 messages par défaut → fenêtre d'attaque
      //  divisée par ~150 si une clé fuit)
      if (room.level === "max") {
        if (!retention || retention > 300000) {
          try { await M.setRoomRetention(id, 300000); room.retention = 300000; } catch {}
        }
        try { await hardenEncryption(id); } catch {}
      }
    }
    // Tri : importantes en premier, puis alphabétique
    rooms.sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return (a.name || "").localeCompare(b.name || "");
    });
    state.rooms = rooms;
    renderRooms();
  } catch (err) {
    console.error(err); toast("Erreur de chargement", "err");
  }
};

/* Chiffrement renforcé pour rooms niveau MAX : rotation rapide des clés */
async function hardenEncryption(roomId) {
  const cur = await M.req("GET",
    `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.encryption/`,
    null, { silent: true });
  if (cur && cur.rotation_period_ms === 3600000 && cur.rotation_period_msgs === 10) return;
  await M.req("PUT",
    `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state/m.room.encryption/`,
    {
      algorithm: "m.megolm.v1.aes-sha2",
      rotation_period_ms: 3600000,
      rotation_period_msgs: 10
    });
}

function roomMaxLevel(room) {
  let max = "normal";
  const levels = state.contactLevels || {};
  for (const m of room.members || []) {
    if (m === M.userId) continue;
    const l = levels[m];
    if (l === "max") return "max";
    if (l === "high") max = "high";
  }
  return max;
}

const origRenderRooms = renderRooms;
renderRooms = function (query = "") {
  const list = $("#roomsList");
  let filtered = state.rooms.filter(r => state.vault ? r.hidden : !r.hidden);
  if (query) filtered = filtered.filter(r => r.name.toLowerCase().includes(query));
  if (!filtered.length) {
    list.innerHTML = `<div class="rooms-empty">
      ${state.vault
        ? "Le coffre est vide.<br>Masquez une conversation depuis le menu contextuel."
        : "Aucune conversation pour l'instant.<br>Créez un groupe privé pour démarrer."}
    </div>`;
    return;
  }
  list.innerHTML = filtered.map(r => {
    const lvl = r.level || "normal";
    const lvlBadge = lvl === "max"  ? `<span class="lvl max">●●●</span>`
                  : lvl === "high" ? `<span class="lvl high">●●</span>` : "";
    const star = r.important ? `<span class="star-mini">★</span>` : "";

    // Détermine l'avatar à afficher : pour un DM 1-1, photo de l'autre.
    // Pour un groupe : photo personnalisée si définie, sinon initiales.
    // Pour un DM 1-1 : photo de l'autre personne + dot online.
    let avatarHtml = `<div class="room-avatar">${initials(r.name)}</div>`;
    let onlineDot = "";
    let wrapClass = "avatar-wrap";
    if (r.avatar) {
      // Photo de groupe explicite, priorité absolue
      avatarHtml = `<div class="room-avatar" style="background-image:url('${M.mxcToHttp(r.avatar, 128, 128)}')"></div>`;
    } else {
      const others = (r.members || []).filter(m => m !== M.userId);
      if (others.length === 1) {
        const mxc = state.avatars[others[0]];
        if (mxc) {
          const url = M.mxcToHttp(mxc, 128, 128);
          avatarHtml = `<div class="room-avatar" style="background-image:url('${url}')"></div>`;
        }
      }
    }
    const others = (r.members || []).filter(m => m !== M.userId);
    if (others.length === 1) {
      const p = state.presences[others[0]];
      if (p === "online") {
        wrapClass += " is-online";
        onlineDot = `<span class="online-dot online"></span>`;
      } else if (p === "unavailable") {
        onlineDot = `<span class="online-dot idle"></span>`;
      }
    }

    return `
    <div class="room-item ${r.id === state.currentRoomId ? "active" : ""} ${r.hidden ? "hidden-room" : ""} lvl-${lvl}"
         data-id="${r.id}">
      <div class="${wrapClass}">${avatarHtml}${onlineDot}</div>
      <div class="room-info">
        <div class="room-top-row">
          <div class="room-name">${star}${escapeHtml(r.name)}${lvlBadge}</div>
          <span class="room-time">${r.lastTime || ""}</span>
        </div>
        <div class="room-meta">
          <span class="room-preview">${r.lastMsg ? escapeHtml(r.lastMsg) : "Chiffré E2E · " + r.members.length + " membre" + (r.members.length > 1 ? "s" : "")}</span>
        </div>
      </div>
    </div>
  `;
  }).join("");

  $$("#roomsList .room-item").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-ctx]")) return;
      selectRoom(el.dataset.id);
    });
    el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      openCtxMenu(el.dataset.id, e.clientX, e.clientY);
    });
    // long-press for mobile
    let lpTimer = null;
    el.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      lpTimer = setTimeout(() => {
        openCtxMenu(el.dataset.id, t.clientX, t.clientY);
      }, 550);
    }, { passive: true });
    el.addEventListener("touchend", () => clearTimeout(lpTimer));
    el.addEventListener("touchmove", () => clearTimeout(lpTimer));
  });
};

function toggleVault(on) {
  state.vault = on;
  document.body.classList.toggle("vault", on);
  state.currentRoomId = null;
  $("#noRoomView").style.display = "flex";
  $("#roomView").style.display = "none";
  $("#elementFrame").src = "about:blank";
  renderRooms();
}

/* =======================================================================
   PIN modal (setup + verify)
   ======================================================================= */
const pinState = { buf: "", mode: "verify", confirm: "", onSuccess: null };

function openPinModal(mode, onSuccess) {
  pinState.buf = ""; pinState.mode = mode; pinState.confirm = ""; pinState.onSuccess = onSuccess;
  $("#pinTitle").textContent = mode === "setup" ? "Créer un code coffre" : "Coffre";
  $("#pinSubtitle").textContent = mode === "setup"
    ? "Choisissez un code à 4 chiffres"
    : "Entrez votre code à 4 chiffres";
  updatePinDisplay();
  $("#pinError").classList.remove("show");
  openModal("#pinModal");
}

function updatePinDisplay() {
  $$("#pinDisplay .pin-dot").forEach((d, i) => {
    d.classList.toggle("filled", i < pinState.buf.length);
  });
}

async function submitPin() {
  if (pinState.mode === "setup") {
    if (!pinState.confirm) {
      pinState.confirm = pinState.buf;
      pinState.buf = "";
      $("#pinSubtitle").textContent = "Confirmez le code";
      updatePinDisplay();
      return;
    }
    if (pinState.confirm !== pinState.buf) {
      $("#pinError").textContent = "Les codes ne correspondent pas";
      $("#pinError").classList.add("show");
      pinState.buf = ""; pinState.confirm = "";
      $("#pinSubtitle").textContent = "Choisissez un code à 4 chiffres";
      updatePinDisplay();
      return;
    }
    await setPin(pinState.buf);
    closeModal("#pinModal");
    toast("Code coffre créé", "ok");
    if (pinState.onSuccess) pinState.onSuccess();
  } else {
    if (await pinMatches(pinState.buf)) {
      closeModal("#pinModal");
      if (pinState.onSuccess) pinState.onSuccess();
    } else {
      $("#pinError").textContent = "Code incorrect";
      $("#pinError").classList.add("show");
      pinState.buf = "";
      updatePinDisplay();
    }
  }
}

$$("#pinModal .pin-btn[data-d]").forEach(b => {
  b.addEventListener("click", () => {
    if (pinState.buf.length >= 4) return;
    pinState.buf += b.dataset.d;
    updatePinDisplay();
    $("#pinError").classList.remove("show");
    if (pinState.buf.length === 4) setTimeout(submitPin, 150);
  });
});
$("#pinBack").addEventListener("click", () => {
  pinState.buf = pinState.buf.slice(0, -1);
  updatePinDisplay();
});
$("#pinReset").addEventListener("click", () => {
  pinState.buf = ""; pinState.confirm = "";
  $("#pinSubtitle").textContent = pinState.mode === "setup"
    ? "Choisissez un code à 4 chiffres"
    : "Entrez votre code à 4 chiffres";
  updatePinDisplay();
  $("#pinError").classList.remove("show");
});

/* =======================================================================
   Profile menu
   ======================================================================= */
const profileMenu = $("#profileMenu");

function openProfileMenu() {
  const short = M.userId.replace(/^@/, "").split(":")[0];
  $("#profileAvatar").textContent = initials(short);
  $("#profileName").textContent   = short;
  $("#profileMxid").textContent   = M.userId;
  // refresh toggles
  $("#stealthToggle").classList.toggle("on", !!settings.stealth);
  $("#autolockLabel").textContent = autolockLabel(settings.autolockMs);
  profileMenu.classList.add("show");
}
function closeProfileMenu() { profileMenu.classList.remove("show"); }

document.addEventListener("click", (e) => {
  if (profileMenu.classList.contains("show")
      && !profileMenu.contains(e.target)
      && !$("#meTrigger").contains(e.target)) {
    closeProfileMenu();
  }
});

$("#meTrigger").addEventListener("click", (e) => {
  e.stopPropagation();
  profileMenu.classList.contains("show") ? closeProfileMenu() : openProfileMenu();
});

/* Avatar in profile menu = long-press 2s → vault */
let avatarLpTimer = null, avatarCharging = false;
function startAvatarLp() {
  if (avatarCharging) return;
  avatarCharging = true;
  $("#profileAvatar").style.transform = "scale(0.92)";
  avatarLpTimer = setTimeout(triggerVault, 2000);
}
function cancelAvatarLp() {
  avatarCharging = false;
  $("#profileAvatar").style.transform = "";
  clearTimeout(avatarLpTimer);
}
["mousedown","touchstart"].forEach(ev =>
  $("#profileAvatar").addEventListener(ev, (e) => { e.preventDefault(); startAvatarLp(); })
);
["mouseup","mouseleave","touchend","touchcancel"].forEach(ev =>
  $("#profileAvatar").addEventListener(ev, cancelAvatarLp)
);

/* Secret zone in profile menu = 5 taps on the version row */
let tapCount = 0, tapTimer = null;
$("#profSecretZone").addEventListener("click", () => {
  tapCount++;
  $("#profSecretZone").classList.add("charging");
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => {
    tapCount = 0;
    $("#profSecretZone").classList.remove("charging");
  }, 1500);
  if (tapCount >= 5) {
    tapCount = 0;
    $("#profSecretZone").classList.remove("charging");
    triggerVault();
  }
});

function triggerVault() {
  closeProfileMenu();
  if (state.vault) { toggleVault(false); toast("Coffre verrouillé", "ok"); return; }
  if (!hasPinSet()) {
    openPinModal("setup", () => toggleVault(true));
  } else {
    openPinModal("verify", () => {
      toggleVault(true);
      toast("Coffre ouvert", "ok");
    });
  }
}

/* =======================================================================
   Settings (stealth, auto-lock)
   ======================================================================= */
const settings = {
  stealth: localStorage.getItem("c_s") === "1",
  autolockMs: parseInt(localStorage.getItem("c_l") || "300000", 10)  // 5 min default
};
function saveSettings() {
  localStorage.setItem("c_s", settings.stealth ? "1" : "0");
  localStorage.setItem("c_l", String(settings.autolockMs));
}
function autolockLabel(ms) {
  if (ms === 0) return "Désactivé";
  if (ms < 60000) return `${ms/1000}s`;
  return `${ms/60000} min`;
}

$("#profStealth").addEventListener("click", async () => {
  settings.stealth = !settings.stealth;
  saveSettings();
  $("#stealthToggle").classList.toggle("on", settings.stealth);
  // Set a global override push rule when stealth is on (silent for all rooms)
  try {
    if (settings.stealth) {
      await M.setPushRule("global", "override", "symbalyx_stealth", {
        conditions: [],
        actions: ["dont_notify"]
      });
    } else {
      await M.req("DELETE",
        `/_matrix/client/v3/pushrules/global/override/${encodeURIComponent("symbalyx_stealth")}`,
        null, { silent: true });
    }
    toast(settings.stealth ? "Mode discret activé" : "Mode discret désactivé", "ok");
  } catch (err) {
    toast("Mode discret : appliqué localement", "ok");
  }
});

$("#profAutolock").addEventListener("click", () => {
  const opts = [0, 60000, 300000, 900000, 1800000];
  const cur = opts.indexOf(settings.autolockMs);
  settings.autolockMs = opts[(cur + 1) % opts.length];
  saveSettings();
  $("#autolockLabel").textContent = autolockLabel(settings.autolockMs);
  resetAutolock();
  toast(`Verrouillage auto : ${autolockLabel(settings.autolockMs)}`, "ok");
});

$("#profClearLocal").addEventListener("click", () => {
  if (!confirm("Effacer toutes les données locales (codes coffre, préférences, session) ?")) return;
  localStorage.clear();
  sessionStorage.clear();
  toast("Données locales effacées", "ok");
  setTimeout(() => location.reload(), 600);
});

$("#profLogout").addEventListener("click", async () => {
  await M.logout();
  sessionStorage.clear();
  closeProfileMenu();
  showLogin();
});

/* =======================================================================
   ANNIHILATION TOTALE
   Efface TOUT, pour de vrai, sans demi-mesure :
   - Révoque tous les tokens du compte Matrix (logout/all)
   - Vide localStorage, sessionStorage, IndexedDB, Cache API, cookies
   - Désinscrit les service workers
   - Demande à chaque origin externe de se wiper (Clear-Site-Data via /wipe)
   - (Option destructrice) Désactive le compte Matrix → suppression côté serveur
   - Redirige vers about:blank et replace history
   ======================================================================= */
async function annihilate(opts = {}) {
  const { serverDeactivate = false, password = null } = opts;

  // 1. Révoquer tous les tokens Matrix de tous les devices du user
  if (M.token) {
    try { await M.req("POST", "/_matrix/client/v3/logout/all", {}); } catch {}
  }

  // 2. (Option destructrice) Deactivate compte côté serveur (irréversible)
  if (serverDeactivate && password && M.token && M.userId) {
    try {
      const userHandle = M.userId.replace(/^@/, "").split(":")[0];
      await M.req("POST", "/_matrix/client/v3/account/deactivate", {
        auth: {
          type: "m.login.password",
          identifier: { type: "m.id.user", user: userHandle },
          password
        },
        erase: true
      });
    } catch (e) { console.warn("deactivate failed", e); }
  }

  // 3. Wiper localStorage TOTAL (y compris PIN coffre/leurre - on veut TOUT)
  try { localStorage.clear(); } catch {}
  try { sessionStorage.clear(); } catch {}

  // 4. Wiper toutes les IndexedDB du même origin
  try {
    if (indexedDB.databases) {
      const dbs = await indexedDB.databases();
      await Promise.all(dbs.map(db =>
        new Promise(res => {
          const r = indexedDB.deleteDatabase(db.name);
          r.onsuccess = r.onerror = r.onblocked = () => res();
        })
      ));
    }
  } catch {}

  // 5. Wiper l'API Cache (service worker)
  try {
    if (window.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
  } catch {}

  // 6. Désinscrire les service workers
  try {
    if (navigator.serviceWorker) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
  } catch {}

  // 7. Cookies du domaine courant
  try {
    document.cookie.split(";").forEach(c => {
      const eq = c.indexOf("=");
      const name = (eq > -1 ? c.substr(0, eq) : c).trim();
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${location.hostname}`;
      }
    });
  } catch {}

  // 8. Demander à chaque origin tiers de se wiper via la route /wipe (Clear-Site-Data)
  //    Fonctionne automatiquement si Caddy single-origin est actif (même origin).
  //    Sinon, on tente en best-effort (no-cors fetch).
  const externalOrigins = [
    CONFIG.elementUrl, CONFIG.elementCall, CONFIG.homeserver
  ];
  await Promise.all(externalOrigins.map(o =>
    fetch(`${o}/wipe`, { mode: "no-cors", credentials: "include" }).catch(() => {})
  ));

  // 9. Replace history et redirige
  try {
    history.pushState({}, "", "about:blank");
    history.replaceState({}, "", "about:blank");
  } catch {}
  document.title = "";
  document.body.innerHTML = "";
  setTimeout(() => location.replace("about:blank"), 100);
}

/* ====== Bouton "TOUT SUPPRIMER" visible (effacement local immédiat) ====== */
$("#profPanic").addEventListener("click", async () => {
  const code = prompt(
    "TOUT SUPPRIMER\n\n" +
    "Cette action est IRRÉVERSIBLE.\n" +
    "Vont être effacés : session, tokens, clés Megolm, messages chiffrés " +
    "stockés localement, code coffre, code leurre, service workers, cache.\n\n" +
    "Tape SUPPRIMER (en majuscules) pour confirmer :"
  );
  if (code !== "SUPPRIMER") return;
  await annihilate({ serverDeactivate: false });
});

/* ====== Bouton "ANNIHILATION SERVEUR" (désactive le compte Matrix) ====== */
$("#profNuke").addEventListener("click", async () => {
  const code = prompt(
    "ANNIHILATION COMPTE SERVEUR\n\n" +
    "Cette action désactive votre compte Matrix sur le serveur.\n" +
    "Vos messages dans les conversations seront marqués 'effacés'.\n" +
    "Le compte ne pourra plus être réactivé.\n\n" +
    "Tape ANNIHILER (en majuscules) pour confirmer :"
  );
  if (code !== "ANNIHILER") return;
  const password = prompt("Mot de passe Matrix (validation requise par le serveur) :");
  if (!password) return;
  await annihilate({ serverDeactivate: true, password });
});

/* Raccourci clavier Ctrl+Shift+Q : effacement local seulement (rapide) */
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "q") {
    e.preventDefault();
    annihilate({ serverDeactivate: false });
  }
});

/* =======================================================================
   Auto-lock après inactivité
   ======================================================================= */
let autolockTimer = null;
function resetAutolock() {
  clearTimeout(autolockTimer);
  if (!settings.autolockMs || !M.token) return;
  autolockTimer = setTimeout(showLockscreen, settings.autolockMs);
}
function showLockscreen() {
  if (!mainApp.classList.contains("active")) return;
  $("#lockscreen").classList.add("show");
  $("#unlockPass").value = "";
  setTimeout(() => $("#unlockPass").focus(), 100);
}
function hideLockscreen() {
  $("#lockscreen").classList.remove("show");
  resetAutolock();
}
["mousemove","keydown","touchstart","scroll","click"].forEach(ev =>
  document.addEventListener(ev, resetAutolock, { passive: true })
);
/* "Verrouiller maintenant" = retour direct à la calculatrice façade */
$("#lockNowBtn").addEventListener("click", () => {
  $("#elementFrame").src = "about:blank";
  showCalc();
});

/* Toggle Touch ID / Face ID depuis le menu profil — silencieux par design.
   Aucun message annonçant la biométrie : seul le prompt OS-natif apparaît
   au moment du déverrouillage, exactement comme une calculatrice standard. */
$("#profBio").addEventListener("click", async () => {
  closeProfileMenu();
  if (hasBiometric()) {
    if (confirm("Désactiver la biométrie ?")) {
      localStorage.removeItem(bioCredKey());
      $("#bioLabel").textContent = "Activer";
    }
  } else {
    const ok = await registerBiometric(M.userId);
    if (ok) $("#bioLabel").textContent = "Désactiver";
  }
});

/* ----- Photo de profil ----- */
$("#profPhoto").addEventListener("click", () => {
  closeProfileMenu();
  $("#profPhotoInput").click();
});
$("#profPhotoInput").addEventListener("change", async (e) => {
  const f = e.target.files[0]; e.target.value = "";
  if (!f) return;
  if (!f.type.startsWith("image/")) { toast("Doit être une image", "err"); return; }
  if (f.size > 5 * 1024 * 1024)     { toast("Photo > 5 Mo", "err"); return; }
  toast("Envoi de la photo…", "");
  try {
    const mxc = await M.uploadMedia(f, f.name);
    await M.setAvatarUrl(mxc);
    state.avatars[M.userId] = mxc;
    renderMyAvatar();
    toast("Photo mise à jour", "ok");
  } catch (err) {
    toast("Échec : " + (err.message || "erreur"), "err");
  }
});

function renderMyAvatar() {
  const mxc = state.avatars[M.userId];
  const url = mxc ? M.mxcToHttp(mxc, 96, 96) : null;
  const short = (M.userId || "").replace(/^@/, "").split(":")[0];
  for (const id of ["myAvatar", "profileAvatar"]) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (url) {
      el.style.backgroundImage = `url("${url}")`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      el.textContent = "";
    } else {
      el.style.backgroundImage = "";
      el.textContent = initials(short);
    }
  }
}

/* ----- Présence en ligne ----- */
async function refreshPresence() {
  if (!M.token) return;
  // marquer ma présence en ligne (sauf si mode discret)
  try { await M.setMyPresence(settings.stealth ? "unavailable" : "online"); } catch {}

  // collecter tous les contacts des conversations affichées
  const others = new Set();
  for (const r of state.rooms) for (const m of (r.members || [])) {
    if (m !== M.userId) others.add(m);
  }
  // récupère présence + avatar de chacun
  await Promise.all(Array.from(others).map(async (mxid) => {
    if (state.presences[mxid] === undefined) state.presences[mxid] = null;
    const [pres, av] = await Promise.all([
      M.getPresence(mxid),
      state.avatars[mxid] === undefined ? M.getAvatarUrl(mxid) : Promise.resolve(state.avatars[mxid])
    ]);
    if (pres) state.presences[mxid] = pres.presence || null;
    if (av !== undefined) state.avatars[mxid] = av;
  }));
  // refresh ma propre photo
  if (state.avatars[M.userId] === undefined) {
    state.avatars[M.userId] = await M.getAvatarUrl(M.userId);
    renderMyAvatar();
  }
  renderRooms();
}

const origOpenProfileMenu3 = openProfileMenu;
openProfileMenu = function () {
  origOpenProfileMenu3();
  $("#bioLabel").textContent = hasBiometric() ? "Désactiver" : "Activer";
};

$("#unlockForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("#unlockError").classList.remove("show");
  const pass = $("#unlockPass").value;
  const btn  = $("#unlockBtn");
  btn.disabled = true; btn.textContent = "Vérification…";
  try {
    const userHandle = M.userId.replace(/^@/, "").split(":")[0];
    // Re-login : valide le mot de passe sans casser la session courante
    const r = await fetch(`${CONFIG.homeserver}/_matrix/client/v3/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "m.login.password",
        identifier: { type: "m.id.user", user: userHandle },
        password: pass
      })
    });
    if (!r.ok) throw new Error("Mot de passe incorrect");
    const data = await r.json();
    // Logout de cette session de vérification pour ne pas accumuler les devices
    try {
      await fetch(`${CONFIG.homeserver}/_matrix/client/v3/logout`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${data.access_token}` }
      });
    } catch {}
    hideLockscreen();
  } catch (err) {
    $("#unlockError").textContent = err.message || "Erreur";
    $("#unlockError").classList.add("show");
  } finally {
    btn.disabled = false; btn.textContent = "Déverrouiller";
  }
});

/* =======================================================================
   Context menu sur les rooms
   ======================================================================= */
const ctxMenu = $("#ctxMenu");
let ctxRoomId = null;

function openCtxMenu(roomId, x, y) {
  ctxRoomId = roomId;
  const r = state.rooms.find(x => x.id === roomId);
  $("#ctxHideLabel").textContent = r?.hidden
    ? "Sortir du coffre"
    : "Masquer la conversation";
  $("#ctxImportantLabel").textContent = r?.important
    ? "Retirer l'importance"
    : "Conversation importante";
  ctxMenu.style.left = `${Math.min(x, window.innerWidth - 220)}px`;
  ctxMenu.style.top  = `${Math.min(y, window.innerHeight - 180)}px`;
  ctxMenu.classList.add("show");
}
function closeCtxMenu() { ctxMenu.classList.remove("show"); ctxRoomId = null; }

document.addEventListener("click", (e) => {
  if (ctxMenu.classList.contains("show") && !ctxMenu.contains(e.target)) closeCtxMenu();
});
window.addEventListener("scroll", closeCtxMenu, true);
window.addEventListener("resize", closeCtxMenu);

$$("#ctxMenu .ctx-item").forEach(item => {
  item.addEventListener("click", async () => {
    const act = item.dataset.act;
    const id  = ctxRoomId;
    closeCtxMenu();
    if (!id) return;
    const r = state.rooms.find(x => x.id === id);
    try {
      if (act === "important") {
        if (r?.important) {
          await M.untagRoom(id, IMPORTANT_TAG);
          toast("Importance retirée", "ok");
        } else {
          await M.tagRoom(id, IMPORTANT_TAG);
          // Retire la rétention pour ne plus jamais effacer
          try { await M.req("PUT",
            `/_matrix/client/v3/rooms/${encodeURIComponent(id)}/state/m.room.retention/`,
            {}); } catch {}
          toast("Conversation importante · ne s'efface plus", "ok");
        }
        await loadRooms();
      } else if (act === "hide") {
        if (r?.hidden) {
          await M.untagRoom(id, HIDDEN_TAG);
          toast("Conversation visible", "ok");
        } else {
          await M.tagRoom(id, HIDDEN_TAG);
          toast("Conversation masquée", "ok");
        }
        await loadRooms();
      } else if (act === "mute") {
        await M.req("PUT",
          `/_matrix/client/v3/pushrules/global/room/${encodeURIComponent(id)}`,
          { actions: ["dont_notify"] });
        toast("Notifications coupées", "ok");
      } else if (act === "leave") {
        if (!confirm("Quitter cette conversation définitivement ?")) return;
        await M.leaveRoom(id);
        try { await M.forgetRoom(id); } catch {}
        toast("Conversation quittée", "ok");
        if (state.currentRoomId === id) {
          state.currentRoomId = null;
          $("#noRoomView").style.display = "flex";
          $("#roomView").style.display   = "none";
          $("#elementFrame").src = "about:blank";
        }
        await loadRooms();
      }
    } catch (err) {
      toast(err.message || "Erreur", "err");
    }
  });
});

/* =======================================================================
   ASSISTANT IA — Mon IA (style My AI Snap), 100% local via Ollama.
   Skills :
     /calc <expr>            calcul math sans appel LLM
     /note <texte>           sauvegarde dans la conv "Note à moi-même"
     /rappel <durée> <texte> notif locale à expiration
     /traduire <texte>       traduction via LLM
     /rédige <consigne>      rédaction (mail, message, lettre…)
     /résumer                résumé de la conv courante
     /persona <nom>          change le persona (assistant|secrétaire|coach|expert)
     /clear                  vide l'historique
     <texte>                 conversation libre avec contexte
   ======================================================================= */
const ASSISTANT = {
  view: null,
  history: [],         // Alias vers le thread courant (compatibilité)
  threads: [],         // [{id, title, history, createdAt, updatedAt}]
  currentThreadId: null,
  persona: "assistant",
  model: "llama3.2:3b",
  visionModel: "llava:7b",
  busy: false,
  abortCtrl: null,
  memory: [],
  brain: [],
  brainCurrent: null,
  reasoning: true,
  pendingImage: null,
  pendingFile: null    // {name, content} pour les fichiers texte joints
};

function threadGenId() { return "th_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6); }
function threadCurrent() { return ASSISTANT.threads.find(t => t.id === ASSISTANT.currentThreadId); }
function threadCreate(title) {
  const t = { id: threadGenId(), title: title || "Nouvelle conversation", history: [], createdAt: Date.now(), updatedAt: Date.now() };
  ASSISTANT.threads.unshift(t);
  ASSISTANT.currentThreadId = t.id;
  ASSISTANT.history = t.history;
  aiSave();
  return t;
}
function threadSwitch(id) {
  const t = ASSISTANT.threads.find(x => x.id === id);
  if (!t) return;
  ASSISTANT.currentThreadId = t.id;
  ASSISTANT.history = t.history;
  aiSave(); aiRender(); renderThreadList();
}
function threadDelete(id) {
  const i = ASSISTANT.threads.findIndex(t => t.id === id);
  if (i < 0) return;
  ASSISTANT.threads.splice(i, 1);
  if (ASSISTANT.currentThreadId === id) {
    const next = ASSISTANT.threads[0];
    if (next) { ASSISTANT.currentThreadId = next.id; ASSISTANT.history = next.history; }
    else { threadCreate("Nouvelle conversation"); }
  }
  aiSave(); aiRender(); renderThreadList();
}
function threadRename(id, title) {
  const t = ASSISTANT.threads.find(x => x.id === id);
  if (t) { t.title = title.trim() || "Sans titre"; t.updatedAt = Date.now(); aiSave(); renderThreadList(); }
}
// Auto-titrage du thread : prend les premiers mots du 1er message utilisateur
function threadAutoTitle() {
  const t = threadCurrent();
  if (!t || t.title !== "Nouvelle conversation") return;
  const firstUser = t.history.find(m => m.from === "me");
  if (!firstUser) return;
  t.title = firstUser.text.replace(/\s+/g, " ").slice(0, 40).trim() + (firstUser.text.length > 40 ? "…" : "");
  aiSave();
  renderThreadList();
}

const AI_PERSONAS_BASE = {
  assistant:   "Tu es un assistant personnel chaleureux et précis. Tu réponds en français.",
  "secrétaire": "Tu es une secrétaire pro. Tu vouvoies, tu rédiges propre, tu reformules. En français.",
  coach:       "Tu es un coach bienveillant et direct. Tu poses des questions ouvertes, tu reformules, tu suggères des actions concrètes. En français.",
  expert:      "Tu es un expert généraliste précis. Tu vérifies tes faits, tu indiques quand tu ne sais pas. En français."
};

const AI_REASONING_INSTR = `\n\nMéthode :
1. Avant de répondre, prends une seconde pour décomposer la question : que demande exactement la personne, quels sont les éléments en jeu.
2. Si la question est complexe ou ambiguë, propose ta meilleure interprétation et précise si tu hypothèses quelque chose.
3. Structure ta réponse avec des phrases courtes ou des puces si c'est une liste. Pas de blabla.
4. Si tu ne sais pas, dis-le clairement plutôt que d'inventer.
5. Quand c'est utile, finis par une action concrète ou une question de relance.`;

const AI_MEMORY_INSTR = `\n\nMémoire :
- Tu disposes d'une mémoire long terme de l'utilisateur (ci-dessous, le cas échéant). Utilise-la naturellement, sans la réciter.
- Si tu apprends quelque chose de durable et utile sur l'utilisateur (préférence forte, prénom, profession, projet en cours, agenda récurrent, relation importante), ajoute en TOUTE FIN de ta réponse une ligne au format exact :
  [MEMORISE: <fait court d'une ligne, sans guillemets, à la 3e personne>]
- N'enregistre PAS les états passagers (humeur, sujet d'un seul message), uniquement ce qui sera utile à long terme.
- Une seule ligne [MEMORISE: …] par réponse au maximum.`;

const AI_BRAIN_INSTR = `\n\nCerveau (base de notes Obsidian-like) :
- Tu peux créer des notes structurées pour stocker des informations détaillées (recettes, projets, listes, méthodes, références, résumés). Les notes survivent entre les conversations.
- Pour CRÉER ou METTRE À JOUR une note, ajoute à la fin de ta réponse une ligne :
  [NOTE: <Titre court> || <contenu markdown> || tags: <tag1, tag2>]
  (le tags est facultatif)
- Tu peux lier des notes entre elles avec la syntaxe [[Titre exact d'une autre note]] dans le contenu.
- Quand l'utilisateur évoque un sujet qui te rappelle une note (cf. "Notes pertinentes" ci-dessous), réfère-t'y naturellement.
- Tu ne peux créer qu'UNE note par réponse. Pour modifier une note existante, réutilise EXACTEMENT le même titre.
- N'inonde pas le cerveau : crée une note uniquement quand l'info mérite d'être conservée structurée (pas juste mémorisée comme un fait court).`;

const AI_PERSONAS = new Proxy({}, {
  get(_t, key) {
    const base = AI_PERSONAS_BASE[key] || AI_PERSONAS_BASE.assistant;
    let prompt = base;
    if (ASSISTANT.reasoning) prompt += AI_REASONING_INSTR;
    prompt += AI_MEMORY_INSTR;
    prompt += AI_BRAIN_INSTR;
    if (ASSISTANT.memory && ASSISTANT.memory.length) {
      prompt += "\n\nCe que tu sais de l'utilisateur :\n" +
        ASSISTANT.memory.slice(-30).map(m => "- " + m.fact).join("\n");
    }
    // Le RAG (recherche dans le cerveau pour la requête courante) est ajouté
    // juste-avant-l'appel dans aiAskOllamaStream via brainContextForQuery().
    return prompt;
  }
});

/* =======================================================================
   Cerveau (Obsidian-like) — notes liées + backlinks + recherche + RAG
   ======================================================================= */
function brainKey() { return `c_ai_brain_${M.userId || "anon"}`; }

function brainLoad() {
  try {
    const raw = localStorage.getItem(brainKey());
    ASSISTANT.brain = raw ? JSON.parse(raw) : [];
  } catch { ASSISTANT.brain = []; }
}
function brainSave() {
  try { localStorage.setItem(brainKey(), JSON.stringify(ASSISTANT.brain)); } catch {}
}

function brainGenId() {
  return "n_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
}

function brainFindByTitle(title) {
  const t = (title || "").trim().toLowerCase();
  return ASSISTANT.brain.find(n => n.title.toLowerCase() === t);
}
function brainGet(id) { return ASSISTANT.brain.find(n => n.id === id); }

function brainCreate({ title, content, tags }) {
  const note = {
    id: brainGenId(),
    title: (title || "Sans titre").trim(),
    content: (content || "").trim(),
    tags: Array.isArray(tags) ? tags : [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  ASSISTANT.brain.push(note);
  brainSave();
  return note;
}
function brainUpdate(id, patch) {
  const n = brainGet(id);
  if (!n) return null;
  Object.assign(n, patch, { updatedAt: Date.now() });
  brainSave();
  return n;
}
function brainDelete(id) {
  const i = ASSISTANT.brain.findIndex(n => n.id === id);
  if (i >= 0) { ASSISTANT.brain.splice(i, 1); brainSave(); }
}

/* Backlinks : trouve toutes les notes qui mentionnent [[title]] de cette note */
function brainBacklinks(noteId) {
  const n = brainGet(noteId);
  if (!n) return [];
  const linkRe = new RegExp("\\[\\[\\s*" + escapeRegex(n.title) + "\\s*\\]\\]", "i");
  return ASSISTANT.brain.filter(x => x.id !== noteId && linkRe.test(x.content));
}
/* Liens sortants : noms cités via [[X]] dans la note */
function brainOutlinks(noteId) {
  const n = brainGet(noteId);
  if (!n) return [];
  const titles = [...n.content.matchAll(/\[\[([^\]]+?)\]\]/g)].map(m => m[1].trim());
  const out = [];
  for (const t of titles) {
    const target = brainFindByTitle(t);
    if (target && !out.some(o => o.id === target.id)) out.push(target);
  }
  return out;
}
function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

/* Recherche full-text simple : score par occurrences pondérées */
function brainSearch(query, limit = 50) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return ASSISTANT.brain.slice().sort((a, b) => b.updatedAt - a.updatedAt).slice(0, limit);
  const words = [...new Set(q.match(/\b[\wÀ-ÿ]{2,}\b/g) || [])];
  const scored = ASSISTANT.brain.map(n => {
    const hay = (n.title + " " + n.content + " " + (n.tags||[]).join(" ")).toLowerCase();
    let s = 0;
    for (const w of words) {
      const re = new RegExp("\\b" + escapeRegex(w), "g");
      const occ = (hay.match(re) || []).length;
      s += occ;
      if (n.title.toLowerCase().includes(w)) s += 5;
      if ((n.tags||[]).some(t => t.toLowerCase().includes(w))) s += 3;
    }
    return { n, s };
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  return scored.slice(0, limit).map(x => x.n);
}

/* RAG : injecte les 3 notes les plus pertinentes dans le system prompt */
function brainContextForQuery(query) {
  const relevant = brainSearch(query, 3);
  if (!relevant.length) return "";
  return "\n\nNotes pertinentes (extraits de ton cerveau, à réutiliser quand pertinent) :\n" +
    relevant.map(n => `\n## ${n.title}${n.tags?.length ? "  ·  tags: " + n.tags.join(", ") : ""}\n${n.content.slice(0, 800)}`).join("\n");
}

/* Parse [NOTE: titre || contenu || tags: a,b] dans une réponse IA */
function aiParseNotes(text) {
  const re = /\[NOTE:\s*([^|]+?)\s*\|\|\s*([\s\S]+?)(?:\s*\|\|\s*tags?:\s*([^\]]+?))?\]/gi;
  let m;
  let created = null;
  while ((m = re.exec(text)) !== null) {
    const title = m[1].trim();
    const content = m[2].trim();
    const tags = m[3] ? m[3].split(",").map(t => t.trim()).filter(Boolean) : [];
    const existing = brainFindByTitle(title);
    if (existing) {
      brainUpdate(existing.id, { content, tags });
      created = existing;
    } else {
      created = brainCreate({ title, content, tags });
    }
  }
  const cleaned = text.replace(re, "").trim();
  return { cleaned, created };
}

/* Mini renderer Markdown (gras, italique, code, listes, liens basiques) */
function mdRender(text) {
  if (!text) return "";
  // Échappe d'abord, puis applique les transforms en travaillant sur du HTML.
  let h = escapeHtml(text);
  // Code blocks ```lang\n...```
  h = h.replace(/```([a-zA-Z0-9]*)\n?([\s\S]*?)```/g,
    (_, lang, code) => `<pre class="md-code"><code>${code.replace(/\n$/, "")}</code></pre>`);
  // Inline code
  h = h.replace(/`([^`\n]+)`/g, "<code class=\"md-inline\">$1</code>");
  // Bold then italic
  h = h.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  // Lists
  h = h.replace(/^[ \t]*[-*][ \t]+(.+)$/gm, "<li>$1</li>");
  h = h.replace(/^[ \t]*\d+\.[ \t]+(.+)$/gm, "<li class=\"md-ol\">$1</li>");
  // Regroupe les <li> consécutifs
  h = h.replace(/(<li[^>]*>.*?<\/li>(?:\s*<br>\s*)?)+/gs, m => {
    const isOl = /class="md-ol"/.test(m);
    const cleaned = m.replace(/\s*<br>\s*/g, "").replace(/ class="md-ol"/g, "");
    return `<${isOl ? "ol" : "ul"} class="md-list">${cleaned}</${isOl ? "ol" : "ul"}>`;
  });
  // Newlines restants → <br>
  h = h.replace(/\n/g, "<br>");
  return h;
}

// AI_PERSONAS est maintenant un Proxy dynamique (cf. plus haut) qui injecte
// raisonnement + mémoire long terme dans le system prompt.

function aiKey()    { return `c_ai_${M.userId || "anon"}`; }
function aiMemKey() { return `c_ai_mem_${M.userId || "anon"}`; }

function aiLoad() {
  try {
    const raw = localStorage.getItem(aiKey());
    if (raw) {
      const data = JSON.parse(raw);
      ASSISTANT.persona   = data.persona   || "assistant";
      ASSISTANT.reasoning = data.reasoning !== false;
      // Migration : si pas de threads mais un historique simple, on encapsule
      if (Array.isArray(data.threads) && data.threads.length) {
        ASSISTANT.threads = data.threads;
        ASSISTANT.currentThreadId = data.currentThreadId || data.threads[0].id;
      } else if (Array.isArray(data.history) && data.history.length) {
        const t = { id: threadGenId(), title: "Conversation", history: data.history, createdAt: Date.now(), updatedAt: Date.now() };
        ASSISTANT.threads = [t];
        ASSISTANT.currentThreadId = t.id;
      }
    }
    if (!ASSISTANT.threads.length) {
      threadCreate("Nouvelle conversation");
    } else {
      const cur = threadCurrent();
      ASSISTANT.history = cur ? cur.history : [];
    }
    const memRaw = localStorage.getItem(aiMemKey());
    ASSISTANT.memory = memRaw ? JSON.parse(memRaw) : [];
  } catch {}
}
function aiSave() {
  try {
    // Synchronise le thread courant avec ASSISTANT.history (alias)
    const cur = threadCurrent();
    if (cur) { cur.history = ASSISTANT.history.slice(-200); cur.updatedAt = Date.now(); }
    localStorage.setItem(aiKey(), JSON.stringify({
      persona: ASSISTANT.persona,
      reasoning: ASSISTANT.reasoning,
      threads: ASSISTANT.threads.slice(0, 50),
      currentThreadId: ASSISTANT.currentThreadId
    }));
  } catch {}
}
function aiMemSave() {
  try {
    localStorage.setItem(aiMemKey(), JSON.stringify(ASSISTANT.memory.slice(-200)));
  } catch {}
}
function aiMemAdd(fact) {
  fact = (fact || "").trim();
  if (!fact || fact.length > 280) return;
  // Dédupe approximatif
  const lower = fact.toLowerCase();
  if (ASSISTANT.memory.some(m => m.fact.toLowerCase() === lower)) return;
  ASSISTANT.memory.push({ fact, addedAt: Date.now() });
  aiMemSave();
}
function aiMemRemove(idx) {
  ASSISTANT.memory.splice(idx, 1);
  aiMemSave();
}
function aiMemClear() {
  ASSISTANT.memory = [];
  aiMemSave();
}

// Parse [MEMORISE: ...] dans une réponse, sauve + retourne le texte nettoyé
function aiParseMemorize(text) {
  const matches = [...text.matchAll(/\[MEMORISE:\s*([^\]]+?)\]/g)];
  for (const m of matches) aiMemAdd(m[1]);
  return text.replace(/\s*\[MEMORISE:\s*[^\]]+?\]\s*$/g, "").trim();
}

function aiOpen() {
  document.body.classList.add("ai-active");
  refreshProfileRail(null);
  $("#noRoomView").style.display = "none";
  $("#roomView").style.display   = "none";
  $("#decoyChat").style.display  = "none";
  $("#elementFrameWrap") && ($("#elementFrameWrap").style.display = "none");
  $("#assistantView").classList.add("active");
  $("#btnAssistant").classList.add("active");

  // Désactiver la sélection de room dans la sidebar
  state.currentRoomId = null;
  $$("#roomsList .room-item").forEach(el => el.classList.remove("active"));

  aiLoad();
  brainLoad();
  aiRender();
  const cur = threadCurrent();
  if ($("#threadTitle")) $("#threadTitle").textContent = cur ? cur.title : "Mon IA";
  $("#aiToggleReason").classList.toggle("on", ASSISTANT.reasoning);

  if (window.innerWidth <= 760) $("#sidebar").classList.add("hidden-mobile");
  setTimeout(() => $("#aiInput").focus(), 60);
}

function aiClose() {
  document.body.classList.remove("ai-active");
  $("#assistantView").classList.remove("active");
  $("#btnAssistant").classList.remove("active");
}

function aiRender() {
  const list  = $("#aiMsgsList");
  const empty = $("#aiEmpty");
  if (!ASSISTANT.history.length) {
    list.innerHTML = "";
    if (empty) empty.style.display = "";
    return;
  }
  if (empty) empty.style.display = "none";
  let html = "";
  ASSISTANT.history.forEach((m, idx) => {
    if (m.from === "system") {
      html += `<div class="ai-msg system">${escapeHtml(m.text)}</div>`;
    } else {
      const side = m.from === "me" ? "me" : "them";
      const content = m.from === "them" ? mdRender(m.text) : escapeHtml(m.text);
      const imgHtml = (m.from === "me" && m.image)
        ? `<img class="ai-msg-img" src="${m.image}" alt="image jointe">` : "";
      html += `<div class="ai-msg ${side}" data-idx="${idx}">${imgHtml}${content}</div>`;
      if (m.from === "them") {
        html += `<div class="ai-msg-actions" data-idx="${idx}">
          <button data-act="copy" title="Copier"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copier</button>
          <button data-act="regen" title="Régénérer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg> Refaire</button>
          <button data-act="share" title="Envoyer vers une conversation"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Envoyer</button>
        </div>`;
      }
      if (m.time) html += `<div class="ai-msg-time ${side}">${escapeHtml(m.time)}</div>`;
    }
  });
  list.innerHTML = html;
  list.querySelectorAll(".ai-msg-actions").forEach(actions => {
    const idx = parseInt(actions.dataset.idx, 10);
    actions.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => aiAction(btn.dataset.act, idx));
    });
  });
  const wrap = $("#aiMsgs");
  wrap.scrollTop = wrap.scrollHeight;
}

async function aiAction(act, idx) {
  const msg = ASSISTANT.history[idx];
  if (!msg) return;
  if (act === "copy") {
    try {
      await navigator.clipboard.writeText(msg.text);
      toast("Copié dans le presse-papiers", "ok");
    } catch {
      toast("Copie impossible", "err");
    }
  } else if (act === "regen") {
    // Trouve le dernier message "me" avant cette réponse
    let prevUser = null;
    for (let i = idx - 1; i >= 0; i--) {
      if (ASSISTANT.history[i].from === "me") { prevUser = ASSISTANT.history[i]; break; }
    }
    if (!prevUser) { toast("Rien à refaire", "err"); return; }
    // Retire le message IA actuel + relance
    ASSISTANT.history.splice(idx, 1);
    aiSave(); aiRender();
    await aiRunUserMessage(prevUser.text, true);
  } else if (act === "share") {
    await aiShareToRoom(msg.text);
  }
}

async function aiShareToRoom(text) {
  if (!state.rooms || !state.rooms.length) {
    toast("Aucune conversation où envoyer", "err");
    return;
  }
  const names = state.rooms.filter(r => !r.hidden).map(r => `${r.name} → ${r.id}`).join("\n");
  const choice = prompt(
    "Envoyer vers quelle conversation ? Tape le nom (ou un mot du nom) :\n\n" +
    state.rooms.filter(r => !r.hidden).map(r => "• " + r.name).join("\n")
  );
  if (!choice) return;
  const room = state.rooms.find(r => !r.hidden && r.name.toLowerCase().includes(choice.toLowerCase()));
  if (!room) { toast("Conversation introuvable", "err"); return; }
  try {
    const txnId = "t" + Date.now();
    await M.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(room.id)}/send/m.room.message/${txnId}`,
      { msgtype: "m.text", body: text });
    toast(`Envoyé dans "${room.name}"`, "ok");
  } catch (e) { toast(e.message || "Erreur", "err"); }
}

function aiPush(from, text) {
  const t = new Date();
  const time = `${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;
  ASSISTANT.history.push({ from, text, time });
  aiSave();
  aiRender();
}

/* ============ Skills ============ */

function aiSafeCalc(expr) {
  if (!/^[\d+\-*/().,\s%]+$/.test(expr)) return null;
  try {
    const cleaned = expr.replace(/,/g, ".");
    // eslint-disable-next-line no-new-func
    const r = Function(`"use strict"; return (${cleaned})`)();
    if (typeof r !== "number" || !Number.isFinite(r)) return null;
    return r;
  } catch { return null; }
}

function parseDuration(s) {
  const m = String(s).match(/^(\d+)\s*([smhj])?$/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  const u = (m[2] || "m").toLowerCase();
  const mult = { s: 1000, m: 60_000, h: 3_600_000, j: 86_400_000 }[u];
  return mult ? n * mult : null;
}

async function aiSkillNote(text) {
  // Trouve ou crée le room "Note à moi-même"
  let r = state.rooms.find(x => /note à moi-même/i.test(x.name)
    || (x.members.length === 1 && x.members[0] === M.userId));
  if (!r) {
    try {
      const res = await M.createPrivateGroup("Note à moi-même", []);
      await loadRooms();
      r = state.rooms.find(x => x.id === res.room_id);
    } catch (e) { return "Impossible de créer l'espace personnel : " + e.message; }
  }
  try {
    const txnId = "t" + Date.now();
    await M.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(r.id)}/send/m.room.message/${txnId}`,
      { msgtype: "m.text", body: text });
    return `📝 Note enregistrée dans ta conversation "Note à moi-même".`;
  } catch (e) { return "Erreur lors de l'enregistrement : " + e.message; }
}

function aiSkillRappel(rest) {
  const m = rest.match(/^(\d+\s*[smhj]?)\s+(.+)$/i);
  if (!m) return "Format : /rappel 15m faire X  (s, m, h ou j)";
  const ms = parseDuration(m[1]);
  if (!ms) return "Durée invalide.";
  const text = m[2];
  setTimeout(() => {
    toast(`⏰ Rappel : ${text}`, "ok");
    try { new Notification("Rappel", { body: text }); } catch {}
  }, ms);
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
  }
  const at = new Date(Date.now() + ms);
  const hhmm = `${String(at.getHours()).padStart(2,"0")}:${String(at.getMinutes()).padStart(2,"0")}`;
  return `⏰ OK, je te rappellerai à ${hhmm} : « ${text} »`;
}

async function aiSkillResumer() {
  // Si on était dans un room avant d'ouvrir l'assistant, on a sauvé l'ID
  const roomId = ASSISTANT.lastRoomId || state.currentRoomId;
  if (!roomId) return "Aucune conversation à résumer. Ouvre une conversation d'abord, puis utilise /résumer.";
  try {
    const data = await M.req("GET",
      `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/messages?dir=b&limit=50`);
    const lines = [];
    for (const ev of (data.chunk || []).reverse()) {
      if (ev.type !== "m.room.message") continue;
      const body = ev.content?.body;
      if (!body) continue;
      const sender = ev.sender.split(":")[0].replace(/^@/, "");
      lines.push(`${sender}: ${body}`);
    }
    if (!lines.length) return "Pas de messages à résumer (ou messages chiffrés non lisibles depuis l'assistant).";
    return await llmSummary(lines.join("\n"));
  } catch (e) {
    return "Erreur : " + e.message;
  }
}

async function aiAskOllamaStream(userMsg, onChunk, imageBase64 = null) {
  // System prompt = persona dynamique + RAG (notes pertinentes pour cette requête)
  const systemPrompt = AI_PERSONAS[ASSISTANT.persona] + brainContextForQuery(userMsg);
  const messages = [{ role: "system", content: systemPrompt }];
  const tail = ASSISTANT.history.filter(m => m.from === "me" || m.from === "them").slice(-20);
  for (const t of tail) {
    messages.push({ role: t.from === "me" ? "user" : "assistant", content: t.text });
  }
  const userTurn = { role: "user", content: userMsg };
  if (imageBase64) userTurn.images = [imageBase64];
  messages.push(userTurn);

  // Si une image est jointe et que le modèle courant n'est pas vision,
  // bascule automatiquement sur visionModel
  const model = imageBase64 ? ASSISTANT.visionModel : ASSISTANT.model;

  const res = await fetch("/ollama/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: true })
  });
  if (!res.ok) throw new Error("LLM indisponible (HTTP " + res.status + ")");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "", full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop();
    for (const line of lines) {
      const s = line.trim();
      if (!s) continue;
      try {
        const obj = JSON.parse(s);
        const chunk = obj.message?.content;
        if (chunk) {
          full += chunk;
          onChunk(full);
        }
        if (obj.done) return full;
      } catch {}
    }
  }
  return full;
}

async function aiAskOllama(userMsg) {
  // Compat non-stream pour les skills /traduire et /rédige
  return aiAskOllamaStream(userMsg, () => {});
}

async function aiHandle(text) {
  // Skills à préfixe
  if (/^\/clear\b/i.test(text)) {
    ASSISTANT.history = [];
    aiSave(); aiRender();
    return null;
  }
  let m;
  if ((m = text.match(/^\/persona\s+(\w+)/i))) {
    const p = m[1].toLowerCase();
    if (!AI_PERSONAS[p]) return `Personas dispo : ${Object.keys(AI_PERSONAS).join(", ")}`;
    ASSISTANT.persona = p; aiSave();
    return `Persona changé : ${p}`;
  }
  if ((m = text.match(/^\/calc\s+(.+)/i))) {
    const r = aiSafeCalc(m[1]);
    return r === null ? "Expression invalide." : `Résultat : ${r.toLocaleString("fr-FR")}`;
  }
  if ((m = text.match(/^\/note\s+(.+)/i))) {
    return await aiSkillNote(m[1]);
  }
  if ((m = text.match(/^\/rappel\s+(.+)/i))) {
    return aiSkillRappel(m[1]);
  }
  if (/^\/r[ée]sumer\b/i.test(text)) {
    return await aiSkillResumer();
  }
  if ((m = text.match(/^\/traduire\b(.+)/i))) {
    return await aiAskOllama("Traduis ceci en gardant le ton : " + m[1].trim());
  }
  if ((m = text.match(/^\/r[ée]dige[r]?\b(.+)/i))) {
    return await aiAskOllama("Rédige ce qui est demandé : " + m[1].trim());
  }
  // Conversation libre
  return await aiAskOllama(text);
}

async function aiRunUserMessage(text, skipPushUser = false) {
  const pendingImage = ASSISTANT.pendingImage;
  const pendingFile  = ASSISTANT.pendingFile;
  ASSISTANT.pendingImage = null;
  ASSISTANT.pendingFile  = null;
  if ($("#aiImagePreview")) $("#aiImagePreview").style.display = "none";
  $("#aiImagePreviewImg") && ($("#aiImagePreviewImg").style.display = "");
  $("#aiImageHint") && ($("#aiImageHint").textContent = "Image jointe · l'IA analysera son contenu");

  if (!skipPushUser) {
    if (pendingImage) {
      ASSISTANT.history.push({ from: "me", text, image: pendingImage.dataUrl, time: nowHHMM() });
      aiSave(); aiRender();
    } else if (pendingFile) {
      ASSISTANT.history.push({ from: "me", text: `📄 ${pendingFile.name}\n\n${text || "(analyse le fichier)"}`, time: nowHHMM() });
      aiSave(); aiRender();
    } else {
      aiPush("me", text);
    }
  }

  ASSISTANT.busy = true;
  $("#aiSend").disabled = true;

  // Détecte d'abord les skills locaux (calc, note, rappel…). Si c'en est un,
  // pas besoin de streaming.
  const isSkill = /^\/(calc|note|rappel|persona|clear|r[ée]sumer)\b/i.test(text);

  if (isSkill) {
    $("#aiTyping").classList.add("show");
    try {
      const reply = await aiHandle(text);
      $("#aiTyping").classList.remove("show");
      if (reply) aiPush("them", reply);
    } catch (e) {
      $("#aiTyping").classList.remove("show");
      aiPush("them", "⚠ " + e.message);
    } finally {
      ASSISTANT.busy = false; $("#aiSend").disabled = false;
    }
    return;
  }

  // Prompt LLM. Construit le message utilisateur (avec préfixe pour /traduire et /rédige)
  let userMsg = text;
  if (/^\/traduire\b/i.test(text)) {
    userMsg = "Traduis ceci en gardant le ton, sans commentaire : " + text.replace(/^\/traduire\b/i, "").trim();
  } else if (/^\/r[ée]dige[r]?\b/i.test(text)) {
    userMsg = "Rédige ce qui est demandé, ton et longueur adaptés : " + text.replace(/^\/r[ée]dige[r]?\b/i, "").trim();
  }
  // Si un fichier texte est joint, on l'injecte dans le message
  if (pendingFile) {
    userMsg = `${text || "Analyse ce fichier et résume-le."}\n\n--- Contenu du fichier "${pendingFile.name}" ---\n${pendingFile.content}\n--- Fin du fichier ---`;
  }

  // Crée la bulle vide pour le streaming
  if ($("#aiEmpty")) $("#aiEmpty").style.display = "none";
  const list = $("#aiMsgsList");
  const bubble = document.createElement("div");
  bubble.className = "ai-msg them streaming";
  bubble.innerHTML = "<span class=\"streaming-cursor\">▍</span>";
  list.appendChild(bubble);
  $("#aiMsgs").scrollTop = $("#aiMsgs").scrollHeight;

  try {
    const full = await aiAskOllamaStream(userMsg, (partial) => {
      // Pendant le streaming, on retire les balises spéciales [MEMORISE: ...] [NOTE: ...] pour pas qu'elles apparaissent
      const clean = partial
        .replace(/\[MEMORISE:[^\]]*\]?\s*$/g, "")
        .replace(/\[NOTE:[\s\S]*?\]?\s*$/g, "");
      bubble.innerHTML = mdRender(clean) + "<span class=\"streaming-cursor\">▍</span>";
      $("#aiMsgs").scrollTop = $("#aiMsgs").scrollHeight;
    }, pendingImage ? pendingImage.base64 : null);
    bubble.remove();
    // Parsing : d'abord NOTE (peut contenir des sauts de ligne), puis MEMORISE
    const { cleaned: noteClean, created } = aiParseNotes(full || "");
    const cleaned = aiParseMemorize(noteClean);
    aiPush("them", cleaned || "(réponse vide)");
    if (created) {
      toast(`Note ajoutée : "${created.title}"`, "ok");
    }
  } catch (e) {
    bubble.remove();
    aiPush("them", "⚠ " + (e.message || "Erreur. Vérifie qu'Ollama tourne et qu'un modèle est téléchargé."));
  } finally {
    ASSISTANT.busy = false; $("#aiSend").disabled = false;
  }
}

async function aiSend() {
  if (ASSISTANT.busy) return;
  const input = $("#aiInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  await aiRunUserMessage(text);
  threadAutoTitle();
}

/* ===== Multi-threads UI ===== */
function renderThreadList() {
  const list = $("#threadList");
  if (!ASSISTANT.threads.length) { list.innerHTML = ""; return; }
  list.innerHTML = ASSISTANT.threads.map(t => `
    <div class="thread-item ${t.id === ASSISTANT.currentThreadId ? "active" : ""}" data-id="${t.id}">
      <div class="thread-item-title">${escapeHtml(t.title || "Sans titre")}</div>
      <div class="thread-item-actions">
        <button data-act="rename" title="Renommer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </button>
        <button data-act="delete" title="Supprimer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg>
        </button>
      </div>
    </div>
  `).join("");
  const cur = threadCurrent();
  $("#threadTitle").textContent = cur ? cur.title : "Mon IA";
  list.querySelectorAll(".thread-item").forEach(el => {
    const id = el.dataset.id;
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-act]")) return;
      threadSwitch(id);
      $("#threadMenu").style.display = "none";
    });
    el.querySelectorAll("[data-act]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (btn.dataset.act === "rename") {
          const newTitle = prompt("Nouveau titre :", ASSISTANT.threads.find(t => t.id === id)?.title);
          if (newTitle) threadRename(id, newTitle);
        } else if (btn.dataset.act === "delete") {
          if (confirm("Supprimer cette conversation ?")) threadDelete(id);
        }
      });
    });
  });
}

$("#threadSwitcher").addEventListener("click", (e) => {
  e.stopPropagation();
  const menu = $("#threadMenu");
  if (menu.style.display === "none") {
    renderThreadList();
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
});

$("#threadNew").addEventListener("click", () => {
  threadCreate("Nouvelle conversation");
  aiRender();
  renderThreadList();
  $("#threadMenu").style.display = "none";
  setTimeout(() => $("#aiInput").focus(), 60);
});

document.addEventListener("click", (e) => {
  const menu = $("#threadMenu");
  if (menu && menu.style.display !== "none"
      && !menu.contains(e.target)
      && !$("#threadSwitcher").contains(e.target)) {
    menu.style.display = "none";
  }
});

/* Wiring */
$("#btnAssistant").addEventListener("click", () => {
  // Mémorise le dernier room pour /résumer
  ASSISTANT.lastRoomId = state.currentRoomId;
  aiOpen();
});

$("#aiSend").addEventListener("click", aiSend);
$("#aiInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); aiSend(); }
});

$("#aiClear").addEventListener("click", () => {
  if (!confirm("Effacer toute la conversation avec Mon IA ?")) return;
  ASSISTANT.history = []; aiSave(); aiRender();
  toast("Conversation effacée", "ok");
});

document.querySelectorAll(".ai-quick button").forEach(b => {
  b.addEventListener("click", () => {
    $("#aiInput").value = b.dataset.prefix;
    $("#aiInput").focus();
    $("#aiInput").setSelectionRange(b.dataset.prefix.length, b.dataset.prefix.length);
  });
});
/* Toggle raisonnement étape par étape (affecte le system prompt) */
$("#aiToggleReason").addEventListener("click", () => {
  ASSISTANT.reasoning = !ASSISTANT.reasoning;
  aiSave();
  $("#aiToggleReason").classList.toggle("on", ASSISTANT.reasoning);
  toast(ASSISTANT.reasoning ? "Mode raisonnement activé" : "Mode raisonnement désactivé", "ok");
});

/* Joindre une image au prochain message (vision) */
$("#aiAttachImg").addEventListener("click", () => $("#aiImageInput").click());
$("#aiImageInput").addEventListener("change", async (e) => {
  const f = e.target.files[0]; e.target.value = "";
  if (!f) return;
  if (!f.type.startsWith("image/")) { toast("Doit être une image", "err"); return; }
  if (f.size > 6 * 1024 * 1024) { toast("Image > 6 Mo", "err"); return; }
  // Encode en base64
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    const base64 = String(dataUrl).split(",")[1];
    ASSISTANT.pendingImage = { dataUrl, base64, mime: f.type };
    $("#aiImagePreviewImg").src = dataUrl;
    $("#aiImagePreview").style.display = "flex";
    $("#aiInput").focus();
  };
  reader.readAsDataURL(f);
});
$("#aiImageClear").addEventListener("click", () => {
  ASSISTANT.pendingImage = null;
  $("#aiImagePreview").style.display = "none";
});

/* Joindre un fichier texte au prochain message */
$("#aiAttachFile").addEventListener("click", () => $("#aiFileInput").click());
$("#aiFileInput").addEventListener("change", async (e) => {
  const f = e.target.files[0]; e.target.value = "";
  if (!f) return;
  if (f.size > 500 * 1024) { toast("Fichier > 500 Ko", "err"); return; }
  try {
    const text = await f.text();
    if (text.length > 80000) {
      toast("Fichier trop volumineux (~80 000 caractères max)", "err");
      return;
    }
    ASSISTANT.pendingFile = { name: f.name, content: text };
    // Réutilise le bandeau preview avec un message différent
    $("#aiImagePreviewImg").src = "";
    $("#aiImagePreviewImg").style.display = "none";
    $("#aiImageHint").textContent = `📄 ${f.name} · ${Math.ceil(text.length/1000)} k caractères · sera analysé par l'IA`;
    $("#aiImagePreview").style.display = "flex";
    $("#aiInput").focus();
  } catch (err) {
    toast("Lecture échouée : " + err.message, "err");
  }
});

// Le bouton clear vide aussi le fichier
const _aiImgClearOrig = () => {};
$("#aiImageClear").addEventListener("click", () => {
  ASSISTANT.pendingFile = null;
  $("#aiImagePreviewImg").style.display = "";
});

/* Mémoire long terme : ouverture modale */
$("#aiMemoryBtn").addEventListener("click", () => {
  renderMemoryList();
  openModal("#modalMemory");
});

/* =======================================================================
   Cerveau Obsidian-like : UI
   ======================================================================= */
$("#aiBrainBtn").addEventListener("click", () => {
  brainLoad();
  renderBrainList();
  switchBrainTab("notes");
  openModal("#modalBrain");
});

function switchBrainTab(name) {
  document.querySelectorAll(".brain-tab").forEach(b => b.classList.toggle("on", b.dataset.tab === name));
  document.querySelectorAll(".brain-pane").forEach(p => p.style.display = p.dataset.pane === name ? "flex" : "none");
  if (name === "graph") setTimeout(renderBrainGraph, 50);
}
document.querySelectorAll(".brain-tab").forEach(b => {
  b.addEventListener("click", () => switchBrainTab(b.dataset.tab));
});

function renderBrainList(q = "") {
  const list = $("#brainList");
  const items = brainSearch(q);
  if (!items.length) {
    list.innerHTML = `<div class="memory-empty" style="padding:24px;">${q ? "Aucune note ne correspond." : "Aucune note pour l'instant. Crée-en une avec le bouton +, ou demande à l'IA d'en créer."}</div>`;
    return;
  }
  list.innerHTML = items.map(n => {
    const excerpt = n.content.replace(/\[\[/g, "").replace(/\]\]/g, "").slice(0, 80);
    const tags = (n.tags || []).slice(0, 3).map(t => `<span class="brain-list-tag">${escapeHtml(t)}</span>`).join(" ");
    const back = brainBacklinks(n.id).length;
    return `
      <div class="brain-list-item ${n.id === ASSISTANT.brainCurrent ? "active" : ""}" data-id="${n.id}">
        <div class="brain-list-title">${escapeHtml(n.title)}</div>
        <div class="brain-list-excerpt">${escapeHtml(excerpt)}</div>
        <div class="brain-list-meta">${tags}${back ? `<span>↩ ${back}</span>` : ""}</div>
      </div>
    `;
  }).join("");
  list.querySelectorAll(".brain-list-item").forEach(el => {
    el.addEventListener("click", () => openBrainNote(el.dataset.id));
  });
}

function openBrainNote(id) {
  const n = brainGet(id);
  if (!n) return;
  ASSISTANT.brainCurrent = id;
  $("#brainEditorEmpty").style.display = "none";
  $("#brainEdit").style.display = "flex";
  $("#brainTitle").value   = n.title;
  $("#brainTags").value    = (n.tags || []).join(", ");
  $("#brainContent").value = n.content;
  renderBrainLinks(n);
  renderBrainPreview();
  // Switch en mode edit par défaut
  document.querySelectorAll(".brain-mode").forEach(b => b.classList.toggle("on", b.dataset.mode === "edit"));
  $("#brainContent").style.display = "block";
  $("#brainPreview").style.display = "none";
  renderBrainList($("#brainSearch").value);
}

function renderBrainLinks(n) {
  const out = brainOutlinks(n.id);
  const back = brainBacklinks(n.id);
  $("#brainOutlinks").innerHTML = out.length
    ? out.map(x => `<div class="chip" data-id="${x.id}">${escapeHtml(x.title)}</div>`).join("")
    : `<span class="empty">aucun</span>`;
  $("#brainBacklinks").innerHTML = back.length
    ? back.map(x => `<div class="chip" data-id="${x.id}">${escapeHtml(x.title)}</div>`).join("")
    : `<span class="empty">aucun</span>`;
  document.querySelectorAll("#brainOutlinks .chip, #brainBacklinks .chip").forEach(c => {
    c.addEventListener("click", () => openBrainNote(c.dataset.id));
  });
}

function renderBrainPreview() {
  const raw = $("#brainContent").value;
  // Convertit [[Titre]] en lien wiki
  let html = mdRender(raw);
  html = html.replace(/\[\[([^\]]+?)\]\]/g, (_, t) => {
    const exists = !!brainFindByTitle(t.trim());
    return `<a class="wikilink${exists ? "" : " missing"}" data-title="${escapeHtml(t.trim())}">${escapeHtml(t.trim())}</a>`;
  });
  $("#brainPreview").innerHTML = html;
  $("#brainPreview").querySelectorAll(".wikilink").forEach(a => {
    a.addEventListener("click", () => {
      const title = a.dataset.title;
      const target = brainFindByTitle(title);
      if (target) openBrainNote(target.id);
      else {
        // Crée la note si elle n'existe pas
        if (confirm(`La note "${title}" n'existe pas. La créer ?`)) {
          const n = brainCreate({ title, content: "", tags: [] });
          renderBrainList(); openBrainNote(n.id);
        }
      }
    });
  });
}

document.querySelectorAll(".brain-mode").forEach(b => {
  b.addEventListener("click", () => {
    const mode = b.dataset.mode;
    document.querySelectorAll(".brain-mode").forEach(x => x.classList.toggle("on", x === b));
    if (mode === "edit") {
      $("#brainContent").style.display = "block";
      $("#brainPreview").style.display = "none";
    } else {
      renderBrainPreview();
      $("#brainContent").style.display = "none";
      $("#brainPreview").style.display = "block";
    }
  });
});

$("#brainNew").addEventListener("click", () => {
  const n = brainCreate({ title: "Nouvelle note", content: "", tags: [] });
  renderBrainList();
  openBrainNote(n.id);
  setTimeout(() => $("#brainTitle").select(), 60);
});

$("#brainSave").addEventListener("click", () => {
  if (!ASSISTANT.brainCurrent) return;
  const title = $("#brainTitle").value.trim() || "Sans titre";
  const content = $("#brainContent").value;
  const tags = $("#brainTags").value.split(",").map(t => t.trim()).filter(Boolean);
  brainUpdate(ASSISTANT.brainCurrent, { title, content, tags });
  toast("Note enregistrée", "ok");
  renderBrainList($("#brainSearch").value);
  const n = brainGet(ASSISTANT.brainCurrent);
  renderBrainLinks(n);
});

$("#brainDelete").addEventListener("click", () => {
  if (!ASSISTANT.brainCurrent) return;
  if (!confirm("Supprimer cette note ? (les backlinks d'autres notes resteront cassés)")) return;
  brainDelete(ASSISTANT.brainCurrent);
  ASSISTANT.brainCurrent = null;
  $("#brainEdit").style.display = "none";
  $("#brainEditorEmpty").style.display = "flex";
  renderBrainList($("#brainSearch").value);
});

$("#brainSearch").addEventListener("input", (e) => renderBrainList(e.target.value));

/* ===== Export / Import du cerveau ===== */
function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
}
function slugify(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "note"; }

function brainExportJson() {
  const data = {
    type: "symbalyx-brain-export",
    version: 1,
    exportedAt: new Date().toISOString(),
    notes: ASSISTANT.brain,
    memory: ASSISTANT.memory
  };
  const stamp = new Date().toISOString().slice(0, 10);
  downloadFile(`cerveau-${stamp}.json`, JSON.stringify(data, null, 2), "application/json");
}

function brainExportMarkdown() {
  if (!ASSISTANT.brain.length) { toast("Cerveau vide", "err"); return; }
  // Format simple : un seul .md avec front-matter par note séparé par ---
  const stamp = new Date().toISOString().slice(0, 10);
  const parts = ASSISTANT.brain.map(n => {
    const fm = [
      "---",
      `title: "${n.title.replace(/"/g, '\\"')}"`,
      `tags: [${(n.tags || []).map(t => `"${t}"`).join(", ")}]`,
      `created: ${new Date(n.createdAt).toISOString()}`,
      `updated: ${new Date(n.updatedAt).toISOString()}`,
      "---"
    ].join("\n");
    return `${fm}\n\n# ${n.title}\n\n${n.content}\n`;
  });
  const memBlock = ASSISTANT.memory.length
    ? `\n\n---\n# Mémoire long terme\n\n${ASSISTANT.memory.map(m => "- " + m.fact).join("\n")}\n`
    : "";
  downloadFile(`cerveau-${stamp}.md`, parts.join("\n\n") + memBlock, "text/markdown");
}

$("#brainExportBtn").addEventListener("click", () => {
  const fmt = prompt(`Format d'export ?\n  1 = JSON (réimportable)\n  2 = Markdown (lisible / portable Obsidian)\n\nTape 1 ou 2 :`, "1");
  if (fmt === "1") brainExportJson();
  else if (fmt === "2") brainExportMarkdown();
});

$("#brainImportBtn").addEventListener("click", () => $("#brainImportInput").click());
$("#brainImportInput").addEventListener("change", async (e) => {
  const f = e.target.files[0]; e.target.value = "";
  if (!f) return;
  try {
    const text = await f.text();
    const data = JSON.parse(text);
    if (data.type !== "symbalyx-brain-export" || !Array.isArray(data.notes)) {
      throw new Error("Format non reconnu");
    }
    const mode = prompt(`Importer ${data.notes.length} notes (export du ${data.exportedAt?.slice(0,10)}) :\n  1 = fusionner avec le cerveau actuel\n  2 = remplacer le cerveau actuel (efface tout)\n\nTape 1 ou 2 :`, "1");
    if (mode === "2") {
      ASSISTANT.brain = [];
    }
    let added = 0, updated = 0;
    for (const n of data.notes) {
      if (!n.title) continue;
      const existing = brainFindByTitle(n.title);
      if (existing) {
        Object.assign(existing, n, { id: existing.id, updatedAt: Date.now() });
        updated++;
      } else {
        ASSISTANT.brain.push({
          id: n.id || brainGenId(),
          title: n.title,
          content: n.content || "",
          tags: n.tags || [],
          createdAt: n.createdAt || Date.now(),
          updatedAt: Date.now()
        });
        added++;
      }
    }
    if (Array.isArray(data.memory) && confirm("Importer aussi la mémoire long terme ?")) {
      for (const m of data.memory) if (m.fact) aiMemAdd(m.fact);
    }
    brainSave();
    renderBrainList();
    toast(`Import : ${added} ajoutées, ${updated} mises à jour`, "ok");
  } catch (err) {
    toast("Import échoué : " + (err.message || "format invalide"), "err");
  }
});

/* Auto-save sur blur du contenu */
$("#brainContent").addEventListener("blur", () => {
  setTimeout(() => $("#brainSuggest").style.display = "none", 200);
  if (ASSISTANT.brainCurrent && $("#brainEdit").style.display !== "none") {
    const title = $("#brainTitle").value.trim() || "Sans titre";
    const content = $("#brainContent").value;
    const tags = $("#brainTags").value.split(",").map(t => t.trim()).filter(Boolean);
    brainUpdate(ASSISTANT.brainCurrent, { title, content, tags });
    const n = brainGet(ASSISTANT.brainCurrent);
    renderBrainLinks(n);
  }
});

/* ===== Suggestions de liens style Obsidian ===== */
function getCurrentWord(textarea) {
  const pos = textarea.selectionStart;
  const before = textarea.value.slice(0, pos);
  const m = before.match(/([\wÀ-ÿ]{2,})$/);
  return m ? { word: m[1], start: pos - m[1].length, end: pos } : null;
}

function refreshBrainSuggestions() {
  const ta = $("#brainContent");
  const wrap = $("#brainSuggest");
  const list = $("#brainSuggestList");
  const cur = getCurrentWord(ta);
  if (!cur || !ASSISTANT.brainCurrent) { wrap.style.display = "none"; return; }
  // On ne suggère pas dans un [[lien]] en cours
  const ctx = ta.value.slice(Math.max(0, cur.start - 2), cur.start);
  if (ctx === "[[") { wrap.style.display = "none"; return; }
  const candidates = ASSISTANT.brain
    .filter(n => n.id !== ASSISTANT.brainCurrent
              && n.title.toLowerCase().includes(cur.word.toLowerCase())
              && n.title.toLowerCase() !== cur.word.toLowerCase())
    .slice(0, 6);
  if (!candidates.length) { wrap.style.display = "none"; return; }
  list.innerHTML = candidates.map((n, i) =>
    `<span class="sg ${i === 0 ? "focus" : ""}" data-id="${n.id}" data-title="${escapeHtml(n.title)}">${escapeHtml(n.title)}</span>`
  ).join("");
  wrap.style.display = "block";
  list.querySelectorAll(".sg").forEach(el => {
    el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      insertBrainLink(el.dataset.title);
    });
  });
}

function insertBrainLink(title) {
  const ta = $("#brainContent");
  const cur = getCurrentWord(ta);
  if (!cur) return;
  const before = ta.value.slice(0, cur.start);
  const after  = ta.value.slice(cur.end);
  const replacement = `[[${title}]]`;
  ta.value = before + replacement + after;
  const newPos = (before + replacement).length;
  ta.focus();
  ta.setSelectionRange(newPos, newPos);
  $("#brainSuggest").style.display = "none";
}

$("#brainContent").addEventListener("input", refreshBrainSuggestions);
$("#brainContent").addEventListener("keyup", (e) => {
  if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) refreshBrainSuggestions();
});
$("#brainContent").addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const wrap = $("#brainSuggest");
  if (wrap.style.display === "none") return;
  const focused = wrap.querySelector(".sg.focus");
  if (focused) {
    e.preventDefault();
    insertBrainLink(focused.dataset.title);
  }
});

/* ===== Graphe force-directed simple ===== */
function renderBrainGraph() {
  const svg = $("#brainGraph");
  const empty = $("#brainGraphEmpty");
  if (!ASSISTANT.brain.length) {
    empty.style.display = "grid"; svg.innerHTML = "";
    return;
  }
  empty.style.display = "none";
  const rect = svg.getBoundingClientRect();
  const W = rect.width || 800, H = rect.height || 500;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  // Construit nodes & edges
  const nodes = ASSISTANT.brain.map((n, i) => ({
    id: n.id, title: n.title,
    x: W/2 + Math.cos(i * 2 * Math.PI / ASSISTANT.brain.length) * Math.min(W, H) * 0.3,
    y: H/2 + Math.sin(i * 2 * Math.PI / ASSISTANT.brain.length) * Math.min(W, H) * 0.3,
    vx: 0, vy: 0
  }));
  const idIndex = {};
  nodes.forEach((n, i) => idIndex[n.id] = i);
  const edges = [];
  for (const n of ASSISTANT.brain) {
    const outs = brainOutlinks(n.id);
    for (const o of outs) {
      const a = idIndex[n.id], b = idIndex[o.id];
      if (a != null && b != null) edges.push([a, b]);
    }
  }

  // Simulation force-directed (Fruchterman-Reingold simplifié)
  const area = W * H, k = Math.sqrt(area / Math.max(nodes.length, 1)) * 0.6;
  for (let iter = 0; iter < 120; iter++) {
    // Répulsion entre tous les nodes
    for (let i = 0; i < nodes.length; i++) {
      let fx = 0, fy = 0;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d2 = dx*dx + dy*dy + 0.01;
        const d = Math.sqrt(d2);
        const f = (k*k) / d;
        fx += (dx/d) * f;
        fy += (dy/d) * f;
      }
      nodes[i].vx = fx;
      nodes[i].vy = fy;
    }
    // Attraction sur les arêtes
    for (const [a, b] of edges) {
      const dx = nodes[b].x - nodes[a].x, dy = nodes[b].y - nodes[a].y;
      const d = Math.sqrt(dx*dx + dy*dy + 0.01);
      const f = (d*d) / k;
      const ux = (dx/d) * f, uy = (dy/d) * f;
      nodes[a].vx += ux; nodes[a].vy += uy;
      nodes[b].vx -= ux; nodes[b].vy -= uy;
    }
    // Applique avec amortissement, contraintes border
    const temp = 0.05;
    for (const n of nodes) {
      const sp = Math.sqrt(n.vx*n.vx + n.vy*n.vy);
      const m = Math.min(sp, 30) * temp;
      n.x += (n.vx/sp || 0) * m;
      n.y += (n.vy/sp || 0) * m;
      n.x = Math.max(30, Math.min(W - 30, n.x));
      n.y = Math.max(30, Math.min(H - 30, n.y));
    }
  }

  // Rendu SVG
  let html = "";
  for (const [a, b] of edges) {
    html += `<line class="gedge" x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}"/>`;
  }
  for (const n of nodes) {
    const label = n.title.length > 22 ? n.title.slice(0, 20) + "…" : n.title;
    html += `<g class="gnode" data-id="${n.id}" transform="translate(${n.x}, ${n.y})">
      <circle class="gnode-bg" r="22"/>
      <text class="gnode-label" text-anchor="middle" dy="40">${escapeHtml(label)}</text>
    </g>`;
  }
  svg.innerHTML = html;
  svg.querySelectorAll(".gnode").forEach(g => {
    g.addEventListener("click", () => {
      switchBrainTab("notes");
      openBrainNote(g.dataset.id);
    });
  });
}

/* Mémoire long terme : ouverture modale (déjà au-dessus) */

function renderMemoryList() {
  const list = $("#memoryList");
  if (!ASSISTANT.memory.length) {
    list.innerHTML = `<div class="memory-empty">Aucun souvenir pour l'instant.<br>L'IA en ajoutera automatiquement au fil des conversations.</div>`;
    return;
  }
  list.innerHTML = ASSISTANT.memory.map((m, i) => {
    const dt = new Date(m.addedAt);
    const when = `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}/${dt.getFullYear()}`;
    return `
      <div class="memory-item" data-i="${i}">
        <div class="text">${escapeHtml(m.fact)}</div>
        <div class="when">${when}</div>
        <button data-act="del" title="Oublier">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg>
        </button>
      </div>`;
  }).join("");
  list.querySelectorAll(".memory-item button").forEach(b => {
    b.addEventListener("click", () => {
      const i = parseInt(b.closest(".memory-item").dataset.i, 10);
      aiMemRemove(i);
      renderMemoryList();
    });
  });
}

$("#memAddInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const v = e.target.value.trim();
    if (v) { aiMemAdd(v); e.target.value = ""; renderMemoryList(); }
  }
});

$("#memClearAll").addEventListener("click", () => {
  if (!confirm("Effacer tous les souvenirs de l'IA ?")) return;
  aiMemClear();
  renderMemoryList();
});

/* =======================================================================
   Annonces épinglées (state event custom org.symbalyx.announcements)
   ======================================================================= */
$("#btnAnnounce").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  await renderAnnouncementsModal();
  $("#announceInput").value = "";
  openModal("#modalAnnounce");
});

async function loadAnnouncementsBar() {
  if (!state.currentRoomId) {
    $("#announceBar").style.display = "none";
    return;
  }
  const list = await M.getAnnouncements(state.currentRoomId);
  const bar = $("#announceBar");
  if (!list.length) { bar.style.display = "none"; return; }
  const latest = list[list.length - 1];
  bar.innerHTML = `
    <svg class="pin-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
    <span class="text" id="announceBarText">${escapeHtml(latest.text)}</span>
    ${list.length > 1 ? `<span class="count">${list.length}</span>` : ""}
  `;
  bar.style.display = "flex";
  $("#announceBarText").addEventListener("click", async () => {
    await renderAnnouncementsModal(); openModal("#modalAnnounce");
  });
}

async function renderAnnouncementsModal() {
  const list = await M.getAnnouncements(state.currentRoomId);
  const wrap = $("#announceList");
  if (!list.length) {
    wrap.innerHTML = `<div class="rooms-empty">Pas d'annonce épinglée.</div>`;
    return;
  }
  wrap.innerHTML = list.map((a, i) => `
    <div class="ann-item" data-i="${i}">
      <div class="text">${escapeHtml(a.text)}</div>
      <button title="Détacher">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg>
      </button>
    </div>
  `).join("");
  wrap.querySelectorAll(".ann-item button").forEach(b => {
    b.addEventListener("click", async () => {
      const i = parseInt(b.closest(".ann-item").dataset.i, 10);
      const cur = await M.getAnnouncements(state.currentRoomId);
      cur.splice(i, 1);
      await M.setAnnouncements(state.currentRoomId, cur);
      await renderAnnouncementsModal();
      await loadAnnouncementsBar();
      toast("Annonce détachée", "ok");
    });
  });
}

$("#btnAnnouncePost").addEventListener("click", async () => {
  const text = $("#announceInput").value.trim();
  if (!text) return;
  if (!state.currentRoomId) return;
  const cur = await M.getAnnouncements(state.currentRoomId);
  cur.push({ text, by: M.userId, at: Date.now() });
  try {
    await M.setAnnouncements(state.currentRoomId, cur);
    $("#announceInput").value = "";
    toast("Annonce épinglée", "ok");
    await renderAnnouncementsModal();
    await loadAnnouncementsBar();
  } catch (e) {
    toast(e.message || "Erreur", "err");
  }
});

/* =======================================================================
   Sondage rapide (message texte standardisé avec puces 1️⃣2️⃣3️⃣)
   ======================================================================= */
const POLL_EMOJIS = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣"];

$("#btnPoll").addEventListener("click", () => {
  if (!state.currentRoomId) return;
  $("#pollQuestion").value = "";
  $("#pollOptions").value  = "";
  openModal("#modalPoll");
  setTimeout(() => $("#pollQuestion").focus(), 100);
});

$("#btnPollSend").addEventListener("click", async () => {
  const q = $("#pollQuestion").value.trim();
  const opts = $("#pollOptions").value.split("\n").map(s => s.trim()).filter(Boolean).slice(0, 8);
  if (!q || opts.length < 2) {
    toast("Question + au moins 2 options", "err");
    return;
  }
  const body =
    "📊 " + q + "\n\n" +
    opts.map((o, i) => `${POLL_EMOJIS[i]}  ${o}`).join("\n") +
    "\n\n_Réagis avec l'emoji correspondant pour voter._";
  try {
    const txnId = "t" + Date.now();
    await M.req("PUT",
      `/_matrix/client/v3/rooms/${encodeURIComponent(state.currentRoomId)}/send/m.room.message/${txnId}`,
      { msgtype: "m.text", body, format: "org.matrix.custom.html",
        formatted_body: "<strong>📊 " + escapeHtml(q) + "</strong><br><br>" +
          opts.map((o, i) => `${POLL_EMOJIS[i]}&nbsp;&nbsp;${escapeHtml(o)}`).join("<br>") +
          "<br><br><em>Réagis avec l'emoji correspondant pour voter.</em>" });
    toast("Sondage publié", "ok");
    closeModal("#modalPoll");
  } catch (e) {
    toast(e.message || "Erreur", "err");
  }
});

/* Refresh la barre d'annonces quand on change de room */
const origSelectRoom2 = selectRoom;
selectRoom = async function(roomId) {
  await origSelectRoom2(roomId);
  loadAnnouncementsBar();
};

/* Voice input via Web Speech API si supporté (Chrome / Safari récents) */
(function setupAiMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = $("#aiMic");
  if (!SR || !mic) return;
  mic.style.display = "grid";
  let rec = null, listening = false;
  mic.addEventListener("click", () => {
    if (listening) { rec && rec.stop(); return; }
    rec = new SR();
    rec.lang = "fr-FR";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart  = () => { listening = true;  mic.classList.add("recording"); };
    rec.onend    = () => { listening = false; mic.classList.remove("recording"); };
    rec.onerror  = () => { listening = false; mic.classList.remove("recording"); };
    rec.onresult = (e) => {
      let t = "";
      for (const r of e.results) t += r[0].transcript;
      $("#aiInput").value = t;
      if (e.results[e.results.length - 1].isFinal) {
        setTimeout(aiSend, 200);  // envoie automatiquement après la dictée finale
      }
    };
    try { rec.start(); }
    catch (e) { console.warn("speech rec failed:", e); }
  });
})();

document.querySelectorAll(".ai-suggestion").forEach(b => {
  b.addEventListener("click", () => {
    $("#aiInput").value = b.dataset.prompt;
    aiSend();
  });
});

// Fermer la vue assistant quand on clique sur une room normale
const origSelectRoom = selectRoom;
selectRoom = async function(roomId) {
  aiClose();
  return origSelectRoom(roomId);
};

/* Bootstrap autolock once logged in */
const origEnterApp = enterApp;
enterApp = function () {
  origEnterApp();
  resetAutolock();
};

/* =======================================================================
   COMPTE COFFRE — isolement cryptographique réel
   Stocke les credentials d'un 2e compte Matrix dans localStorage,
   chiffrés AES-GCM avec une clé dérivée du PIN coffre (PBKDF2).
   Le déchiffrement n'est possible qu'avec le bon PIN.
   ======================================================================= */
function vaultAcctKey() { return `c_v_${M.userId || "anon"}`; }
function hasVaultAccount() { return !!localStorage.getItem(vaultAcctKey()); }

async function deriveAesKey(pin, saltHex) {
  const enc = new TextEncoder();
  const saltBytes = new Uint8Array(saltHex.match(/.{2}/g).map(h => parseInt(h, 16)));
  const km = await crypto.subtle.importKey(
    "raw", enc.encode(`${M.userId}:vault-acct:${pin}`),
    { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltBytes, iterations: PIN_ITER, hash: "SHA-256" },
    km,
    { name: "AES-GCM", length: 256 },
    false, ["encrypt", "decrypt"]
  );
}

function bytesToHex(b) { return Array.from(b).map(x => x.toString(16).padStart(2, "0")).join(""); }
function hexToBytes(h) { return new Uint8Array(h.match(/.{2}/g).map(x => parseInt(x, 16))); }

async function storeVaultAccount(pin, username, password) {
  const salt = randomSalt();
  const iv   = new Uint8Array(12); crypto.getRandomValues(iv);
  const key  = await deriveAesKey(pin, salt);
  const enc  = new TextEncoder();
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(JSON.stringify({ username, password }))
  );
  localStorage.setItem(vaultAcctKey(), JSON.stringify({
    v: 1, salt, iv: bytesToHex(iv), ct: bytesToHex(new Uint8Array(ct))
  }));
}

async function loadVaultAccount(pin) {
  const raw = localStorage.getItem(vaultAcctKey());
  if (!raw) return null;
  const { salt, iv, ct } = JSON.parse(raw);
  const key  = await deriveAesKey(pin, salt);
  const ivB  = hexToBytes(iv);
  const ctB  = hexToBytes(ct);
  let pt;
  try {
    pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivB }, key, ctB);
  } catch { return null; }   // mauvais PIN
  return JSON.parse(new TextDecoder().decode(pt));
}

// État pour switcher entre compte principal et compte coffre
const vaultAcct = {
  mainSession: null,   // { token, userId, deviceId } pour revenir au principal
  active: false
};

async function switchToVaultAccount(pin) {
  const creds = await loadVaultAccount(pin);
  if (!creds) { toast("Code incorrect", "err"); return false; }

  // Sauvegarder la session principale pour la restaurer plus tard
  vaultAcct.mainSession = { token: M.token, userId: M.userId, deviceId: M.deviceId };

  // Logout du compte principal (révoque le device courant)
  try { await M.logout(); } catch {}

  // Login sur le compte coffre
  try {
    await M.login(creds.username, creds.password);
    vaultAcct.active = true;
    document.body.classList.add("vault");
    state.currentRoomId = null;
    $("#noRoomView").style.display = "flex";
    $("#roomView").style.display = "none";
    $("#elementFrame").src = "about:blank";
    await loadRooms();
    startSyncLoop();
    toast("Compte coffre ouvert", "ok");
    return true;
  } catch (err) {
    toast("Login compte coffre échoué : " + err.message, "err");
    // Restaurer la session principale en silencieux n'est pas possible sans password
    showLogin();
    return false;
  }
}

async function switchBackToMain() {
  // Logout du compte coffre
  try { await M.logout(); } catch {}
  vaultAcct.active = false;
  document.body.classList.remove("vault");
  // On ne peut pas restaurer le main sans password : afficher login
  showLogin();
  toast("Reconnectez-vous à votre compte principal", "ok");
}

$("#profVaultAccount").addEventListener("click", async () => {
  closeProfileMenu();
  if (vaultAcct.active) {
    if (confirm("Fermer le compte coffre et revenir au login ?")) {
      await switchBackToMain();
    }
    return;
  }
  if (!hasVaultAccount()) {
    // Liaison d'un compte coffre existant (créé manuellement via la CLI Synapse)
    alert(
      "Liaison d'un compte coffre.\n\n" +
      "Vous devez d'abord créer un 2e compte Matrix dédié au coffre via la CLI Synapse :\n\n" +
      "docker exec -it symbalyx_synapse register_new_matrix_user " +
      "-u VOTREPSEUDO_v -p MOTDEPASSEFORT --no-admin " +
      "-c /data/homeserver.yaml http://localhost:8008\n\n" +
      "Puis revenez ici."
    );
    const u = prompt("Identifiant du compte coffre (sans @ ni domaine) :");
    if (!u) return;
    const p = prompt("Mot de passe du compte coffre :");
    if (!p) return;
    const pin = prompt("Code PIN à 4 chiffres pour ouvrir le compte coffre :");
    if (!pin || !/^\d{4,8}$/.test(pin)) { toast("Code invalide (4-8 chiffres)", "err"); return; }

    // Test du login pour valider les credentials
    const tmp = await fetch(`${CONFIG.homeserver}/_matrix/client/v3/login`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "m.login.password",
        identifier: { type: "m.id.user", user: u },
        password: p
      })
    });
    if (!tmp.ok) { toast("Credentials coffre invalides", "err"); return; }
    const tmpData = await tmp.json();
    // Logout immédiat du device de test
    await fetch(`${CONFIG.homeserver}/_matrix/client/v3/logout`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${tmpData.access_token}` }
    });

    await storeVaultAccount(pin, u, p);
    toast("Compte coffre lié", "ok");
    $("#vaultAccountLabel").textContent = "Ouvrir";
  } else {
    const pin = prompt("Code coffre :");
    if (!pin) return;
    await switchToVaultAccount(pin);
  }
});

const origOpenProfileMenu2 = openProfileMenu;
openProfileMenu = function () {
  origOpenProfileMenu2();
  $("#vaultAccountLabel").textContent = vaultAcct.active ? "Fermer" : (hasVaultAccount() ? "Ouvrir" : "Lier");
};

/* =======================================================================
   DECOY MODE — fausses conversations crédibles
   ======================================================================= */
const decoy = {
  active: false,
  currentId: null,
  msgs: {},        // id => array de messages (modifications locales volatiles)
  profile: null    // profil chargé pour l'utilisateur courant
};

function decoyPinKey() { return `c_b_${M.userId || "anon"}`; }
function hasDecoyPin() { return !!localStorage.getItem(decoyPinKey()); }
async function setDecoyPin(pin) {
  const salt = randomSalt();
  const hash = await pbkdf2(`${M.userId}:decoy:${pin}`, salt, PIN_ITER);
  localStorage.setItem(decoyPinKey(), `pbkdf2_v1:${salt}:${PIN_ITER}:${hash}`);
}
async function decoyPinMatches(pin) {
  const stored = localStorage.getItem(decoyPinKey());
  if (!stored) return false;
  if (!stored.startsWith("pbkdf2_v1:")) {
    const legacyOk = (await sha256(`${M.userId}:decoy:${pin}`)) === stored;
    if (legacyOk) await setDecoyPin(pin);
    return legacyOk;
  }
  const [, salt, iterStr, expected] = stored.split(":");
  return (await pbkdf2(`${M.userId}:decoy:${pin}`, salt, parseInt(iterStr, 10))) === expected;
}

async function enterDecoy() {
  // Charger le profil correspondant à l'utilisateur AVANT de couper la session
  decoy.profile = window.DECOY_DATA.getForUser(M.userId);

  // SÉCURITÉ : invalider le token Matrix AVANT d'activer le leurre.
  // Plus de M.token, plus de M.userId, plus de session navigateur.
  // Si l'inconnu inspecte la console : il ne voit rien d'utilisable.
  try { await M.logout(); } catch {}
  sessionStorage.clear();

  decoy.active = true;
  decoy.msgs   = {};
  document.body.classList.add("decoy");
  closeProfileMenu();

  if (syncTimer) { clearInterval(syncTimer); syncTimer = null; }
  if (autolockTimer) { clearTimeout(autolockTimer); autolockTimer = null; }

  $("#elementFrame").src = "about:blank";
  $("#elementFrameWrap").style.display = "none";
  $("#decoyChat").style.display = "none";

  renderDecoyRooms();

  // Cache toute action Matrix qui pourrait révéler la vraie nature de l'app
  $("#btnTimer").style.display     = "none";
  $("#btnSummary").style.display   = "none";
  $("#btnInvite").style.display    = "none";
  $("#btnVoiceCall").style.display = "";
  $("#btnVideoCall").style.display = "";

  // Avatar et label depuis le profil de leurre (identité plausible)
  $("#myAvatar").textContent  = decoy.profile.me.avatar;
  $("#myLabel").textContent   = decoy.profile.me.name;
  $("#profileAvatar").textContent = decoy.profile.me.avatar;
  $("#profileName").textContent   = decoy.profile.me.name;
  $("#profileMxid").textContent   = "";

  $("#noRoomView").style.display = "flex";
  $("#roomView").style.display   = "none";

  // Pas de toast crédible — pour l'inconnu, rien ne doit indiquer un "switch de mode"
}

function exitDecoy() {
  // Sortie = revenir à l'écran de login. La session Matrix a été
  // invalidée à l'entrée du leurre, l'utilisateur doit se reconnecter
  // manuellement pour accéder à ses vraies conversations.
  decoy.active = false;
  decoy.currentId = null;
  decoy.msgs = {};
  decoy.profile = null;
  document.body.classList.remove("decoy");
  $("#decoyChat").style.display = "none";
  $("#elementFrameWrap").style.display = "";
  $("#btnTimer").style.display     = "";
  $("#btnSummary").style.display   = "";
  $("#btnInvite").style.display    = "";
  showLogin();
}

function renderDecoyRooms() {
  const list = $("#roomsList");
  const convs = (decoy.profile && decoy.profile.conversations) || [];
  const pinned = convs.filter(c => c.pinned);
  const rest   = convs.filter(c => !c.pinned);
  const ordered = pinned.concat(rest);

  list.innerHTML = ordered.map(c => {
    const last = [...c.messages].reverse().find(m => m && m.text && m.from) || {};
    const preview = (last.text || "").slice(0, 38) + (last.text && last.text.length > 38 ? "…" : "");
    return `
      <div class="room-item ${c.id === decoy.currentId ? "active" : ""}" data-decoy-id="${c.id}">
        <div class="room-avatar" style="background:${c.color}">${escapeHtml(c.avatar)}</div>
        <div class="room-info">
          <div class="room-name">${escapeHtml(c.name)}${c.pinned ? " 📌" : ""}${c.muted ? " 🔕" : ""}</div>
          <div class="room-meta">
            <span>${escapeHtml(preview)}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  $$("#roomsList .room-item").forEach(el => {
    el.addEventListener("click", () => openDecoyConv(el.dataset.decoyId));
  });
}

function openDecoyConv(id) {
  const conv = (decoy.profile?.conversations || []).find(c => c.id === id);
  if (!conv) return;
  decoy.currentId = id;
  if (!decoy.msgs[id]) decoy.msgs[id] = conv.messages.slice();

  $("#noRoomView").style.display = "none";
  $("#roomView").style.display = "flex";
  $("#elementFrameWrap").style.display = "none";
  $("#decoyChat").style.display = "flex";

  $("#curRoomName").textContent = conv.name;
  $("#curRoomAvatar").textContent = conv.avatar;
  $("#curRoomAvatar").style.background = conv.color;
  $("#curRoomMembers").textContent = `· ${conv.lastSeen || ""}`;
  $("#curRoomTimer").style.display = "none";

  renderDecoyMessages();
  renderDecoyRooms();

  if (window.innerWidth <= 760) $("#sidebar").classList.add("hidden-mobile");

  setTimeout(() => $("#decoyInput").focus(), 60);
}

function renderDecoyMessages() {
  if (!decoy.currentId) return;
  const wrap = $("#decoyMsgs");
  const msgs = decoy.msgs[decoy.currentId] || [];
  let html = "";
  let lastDay = null;
  for (const m of msgs) {
    if (m.day && m.day !== lastDay) {
      html += `<div class="decoy-day">${escapeHtml(m.day)}</div>`;
      lastDay = m.day;
    }
    if (!m.text || !m.from) continue;  // séparateurs de jour purs
    html += `<div class="decoy-msg ${m.from === "me" ? "me" : "them"}">${escapeHtml(m.text)}</div>`;
    html += `<div class="decoy-time">${escapeHtml(m.time || "")}</div>`;
  }
  wrap.innerHTML = html;
  wrap.scrollTop = wrap.scrollHeight;
}

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}
function rnd(min, max) { return Math.floor(min + Math.random() * (max - min)); }

/* Profil de réactivité par contact pour rendre les délais naturels.
   Famille/proches : répondent souvent, parfois lentement.
   Services      : répondent rarement et tardivement (heures ouvrées).
   Pros          : répondent normalement en quelques minutes. */
function reactivityProfile(convId) {
  if (/_mom|_femme|_pere|_papa|_claire|_amel|_jean|_thomas/.test(convId))
    return { chance: 0.75, minMs:  60_000, maxMs:  900_000 };  // 1-15 min
  if (/_associe|_marc|_compta|_avocat|_clientX|_client/.test(convId))
    return { chance: 0.65, minMs: 120_000, maxMs: 1_500_000 }; // 2-25 min
  if (/_pressing|_garage|_pharma|_banque|_assur|_plombier|_fournisseur|_prof|_pizza|_school/.test(convId))
    return { chance: 0.30, minMs: 300_000, maxMs: 2_700_000 }; // 5-45 min
  if (/_team|_groupe|_coloc/.test(convId))
    return { chance: 0.55, minMs:  90_000, maxMs: 1_200_000 }; // 1.5-20 min
  return { chance: 0.55, minMs: 120_000, maxMs:  900_000 };
}

function decoySend() {
  if (!decoy.currentId) return;
  const input = $("#decoyInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  decoy.msgs[decoy.currentId].push({ from: "me", text, time: nowHHMM() });
  renderDecoyMessages();
  renderDecoyRooms();

  // Si un envoi est déjà programmé pour cette conv, on annule (l'utilisateur a renvoyé)
  if (decoy.pendingReplies?.[decoy.currentId]) {
    clearTimeout(decoy.pendingReplies[decoy.currentId].timer);
    clearTimeout(decoy.pendingReplies[decoy.currentId].typingTimer);
  }
  decoy.pendingReplies = decoy.pendingReplies || {};

  const conv = (decoy.profile?.conversations || []).find(c => c.id === decoy.currentId);
  const rule = ((conv && conv.autoreply) || []).find(r => r.match.test(text));
  if (!rule) return;  // pas de motif déclencheur → silence (la personne a "vu", c'est tout)

  // Profil de réactivité : probabilité, fenêtre de délai
  const prof = reactivityProfile(decoy.currentId);
  const chance = rule.chance ?? prof.chance;
  if (Math.random() > chance) return;   // la personne ne répond pas cette fois

  const minMs = rule.minMs ?? prof.minMs;
  const maxMs = rule.maxMs ?? prof.maxMs;
  const delay = rnd(minMs, maxMs);

  // L'indicateur "écrit…" n'apparaît qu'à la toute fin du délai (~3-12s avant
  // la réponse), pas immédiatement, sinon ça paraît artificiel
  const typingLead = Math.min(delay * 0.15, 12_000);
  const targetConvId = decoy.currentId;

  const typingTimer = setTimeout(() => {
    if (decoy.currentId === targetConvId) {
      $("#decoyTyping").classList.add("show");
      $("#decoyMsgs").scrollTop = $("#decoyMsgs").scrollHeight;
    }
  }, delay - typingLead);

  const timer = setTimeout(() => {
    $("#decoyTyping").classList.remove("show");
    const reply = Array.isArray(rule.replies)
      ? rule.replies[Math.floor(Math.random() * rule.replies.length)]
      : rule.reply;
    if (!reply) return;
    decoy.msgs[targetConvId].push({ from: "them", text: reply, time: nowHHMM() });
    delete decoy.pendingReplies[targetConvId];
    if (decoy.currentId === targetConvId) {
      renderDecoyMessages();
    }
    renderDecoyRooms();
    // Petit son discret ? Non — l'inconnu se demanderait pourquoi.
  }, delay);

  decoy.pendingReplies[targetConvId] = { timer, typingTimer };
}

$("#decoySend").addEventListener("click", decoySend);
$("#decoyInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); decoySend(); }
});

/* Configuration / activation du mode visiteur depuis le profil */
$("#profDecoy").addEventListener("click", async () => {
  closeProfileMenu();
  if (!hasDecoyPin()) {
    const pin = prompt("Créer un code à 4 chiffres pour le mode visiteur :");
    if (!pin) return;
    if (!/^\d{4}$/.test(pin)) { toast("Code invalide (4 chiffres requis)", "err"); return; }
    await setDecoyPin(pin);
    $("#decoyLabel").textContent = "Activer";
    toast("Code de leurre enregistré", "ok");
  } else {
    if (confirm("Activer le mode visiteur ? Les vraies conversations seront masquées.")) {
      enterDecoy();
    }
  }
});
// Met à jour le label "Configurer / Activer" à l'ouverture du menu
const origOpenProfileMenu = openProfileMenu;
openProfileMenu = function () {
  origOpenProfileMenu();
  $("#decoyLabel").textContent = hasDecoyPin() ? "Activer" : "Configurer";
};

/* Geste secret : 5 taps sur le pill "Chiffré E2E" */
let pillTaps = 0, pillTimer = null;
document.querySelector(".secure-pill").addEventListener("click", () => {
  pillTaps++;
  clearTimeout(pillTimer);
  pillTimer = setTimeout(() => { pillTaps = 0; }, 1500);
  if (pillTaps >= 5) {
    pillTaps = 0;
    if (!decoy.active) {
      if (!hasDecoyPin()) {
        // Pas configuré : prompt rapide
        const pin = prompt("Créer un code à 4 chiffres pour le mode visiteur :");
        if (pin && /^\d{4}$/.test(pin)) {
          setDecoyPin(pin).then(() => {
            toast("Code créé", "ok");
            enterDecoy();
          });
        }
      } else {
        enterDecoy();
      }
    } else {
      // Sortie du leurre : demander le PIN normal (vault) si configuré, sinon le mot de passe
      const pin = prompt("Code pour quitter le mode visiteur (4 chiffres) :");
      if (pin) {
        decoyPinMatches(pin).then(ok => {
          if (ok || !hasPinSet()) exitDecoy();
          else {
            pinMatches(pin).then(ok2 => {
              if (ok2) exitDecoy();
              else toast("Code incorrect", "err");
            });
          }
        });
      }
    }
  }
});

/* =======================================================================
   SUMMARY / TRANSCRIPTION (Whisper)
   ======================================================================= */
$("#btnSummary").addEventListener("click", () => {
  $("#summaryOutput").textContent = "Aucun contenu pour l'instant.";
  openModal("#summaryModal");
});

$("#btnTranscribeLast").addEventListener("click", async () => {
  if (!state.currentRoomId) return;
  const out = $("#summaryOutput");
  out.textContent = "Recherche du dernier message vocal…";
  try {
    const data = await M.req("GET",
      `/_matrix/client/v3/rooms/${encodeURIComponent(state.currentRoomId)}/messages?dir=b&limit=40`);
    const audio = (data.chunk || []).find(e =>
      e.type === "m.room.message" &&
      (e.content?.msgtype === "m.audio" || e.content?.info?.mimetype?.startsWith("audio"))
    );
    if (!audio) { out.textContent = "Aucun message vocal trouvé dans les 40 derniers messages."; return; }

    let url = audio.content.url || audio.content.file?.url;
    if (!url) { out.textContent = "Impossible de récupérer l'audio (peut-être chiffré sans clé partagée à Symbalyx)."; return; }
    if (url.startsWith("mxc://")) {
      const [, server, mediaId] = url.match(/^mxc:\/\/([^/]+)\/(.+)$/);
      url = `${CONFIG.homeserver}/_matrix/client/v1/media/download/${server}/${mediaId}`;
    }

    out.textContent = "Téléchargement…";
    const audioRes = await fetch(url, { headers: { Authorization: `Bearer ${M.token}` } });
    if (!audioRes.ok) throw new Error("Téléchargement échoué");
    const blob = await audioRes.blob();

    out.textContent = "Transcription en cours (local)…";
    const fd = new FormData();
    fd.append("audio_file", blob, "audio.ogg");
    const w = await fetch(`${CONFIG.whisperUrl}/asr?task=transcribe&language=fr&output=json`, {
      method: "POST", body: fd
    });
    if (!w.ok) throw new Error("Service Whisper indisponible");
    const j = await w.json();
    out.textContent = j.text || "(transcription vide)";
  } catch (err) {
    out.textContent = `Erreur : ${err.message}`;
  }
});

/* Enregistrement local + transcription + résumé d'appel */
let recState = { recorder: null, chunks: [], stream: null };
$("#btnSummarizeCall").addEventListener("click", async () => {
  const out = $("#summaryOutput");
  const btn = $("#btnSummarizeCall");
  if (!recState.recorder || recState.recorder.state === "inactive") {
    try {
      recState.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recState.recorder = new MediaRecorder(recState.stream, { mimeType: "audio/webm" });
      recState.chunks = [];
      recState.recorder.ondataavailable = (e) => { if (e.data.size > 0) recState.chunks.push(e.data); };
      recState.recorder.onstop = async () => {
        try { recState.stream.getTracks().forEach(t => t.stop()); } catch {}
        const blob = new Blob(recState.chunks, { type: "audio/webm" });
        out.textContent = "Transcription…";
        const fd = new FormData();
        fd.append("audio_file", blob, "call.webm");
        const w = await fetch(`${CONFIG.whisperUrl}/asr?task=transcribe&language=fr&output=json`, {
          method: "POST", body: fd
        });
        if (!w.ok) { out.textContent = "Whisper indisponible. Démarrez le service avec : docker compose up -d whisper"; return; }
        const j = await w.json();
        const text = j.text || "";
        out.textContent = "Génération du résumé par l'IA locale…";
        const summary = await llmSummary(text);
        out.textContent =
          `── Résumé ──\n${summary}\n\n── Transcription complète ──\n${text}`;
      };
      recState.recorder.start();
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg> Arrêter et résumer`;
      out.textContent = "🔴 Enregistrement en cours…";
    } catch (e) {
      out.textContent = `Micro indisponible : ${e.message}`;
    }
  } else {
    recState.recorder.stop();
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> Enregistrer & résumer`;
  }
});

/* Résumé via Ollama (LLM local). Le service est exposé par nginx UI sous /ollama/
 * pour ne pas exposer le port natif sur le LAN. Fallback heuristique si KO. */
async function llmSummary(text) {
  if (!text || text.length < 50) return "Pas assez de contenu pour un résumé.";
  try {
    const r = await fetch("/ollama/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:3b",
        prompt:
          "Voici une transcription d'appel ou de conversation. Résume-la en français en 3 à 5 puces concises, en gardant les décisions, dates et chiffres précis.\n\n---\n" +
          text + "\n---\n\nRésumé :",
        stream: false
      })
    });
    if (!r.ok) throw new Error("Ollama HTTP " + r.status);
    const j = await r.json();
    return (j.response || "").trim() || simpleSummary(text);
  } catch (e) {
    console.warn("LLM indisponible, fallback heuristique :", e.message);
    return simpleSummary(text);
  }
}

function simpleSummary(text) {
  if (!text || text.length < 50) return "Pas assez de contenu pour un résumé.";
  // Heuristique : 3 premières phrases significatives + bullet topics simples
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 12);
  const intro = sentences.slice(0, 2).join(" ");
  // Mots-clés grossiers (compte des noms communs > 4 lettres, hors stop-words)
  const stop = new Set("alors avoir ainsi après aussi celui cette chez comme dans depuis donc elle entre étais étant étant être fait faire faut leur leurs mais même moi mon mes nous parce plus pour quand quel quelle quels quoi sans sera serait sont sous tout tous toute toutes très vers votre vous voilà voici sait voir hein juste plutôt".split(/\s+/));
  const words = text.toLowerCase().match(/\b[a-zà-ÿ]{5,}\b/g) || [];
  const freq = {};
  for (const w of words) if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1;
  const top = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, 5).map(e => e[0]);
  return `${intro}\n\nSujets clés : ${top.join(", ") || "—"}`;
}

/* =======================================================================
   PWA — registration du service worker + prompt d'installation
   ======================================================================= */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $("#installHint").classList.add("show");
});
$("#installHint").addEventListener("click", async (e) => {
  if (e.target.id === "installDismiss") {
    $("#installHint").classList.remove("show");
    return;
  }
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  $("#installHint").classList.remove("show");
});
$("#installDismiss").addEventListener("click", (e) => {
  e.stopPropagation();
  $("#installHint").classList.remove("show");
});
</script>
</body>
</html>
