(() => {
  const VERSION = "v4-hard-element-skin";

  function toast(message) {
    let el = document.getElementById("symbalyx-ai-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "symbalyx-ai-toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    clearTimeout(el.__timer);
    el.__timer = setTimeout(() => el.remove(), 3600);
  }

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label || "Commande"} copié. Colle-le dans le salon.`);
    } catch {
      toast(text);
    }
  }

  function currentRoomId() {
    const hash = decodeURIComponent(location.hash || "");
    const m = hash.match(/#\/room\/([^/?]+)/);
    return m ? m[1] : "";
  }

  function injectDock() {
    if (document.getElementById("symbalyx-ai-dock")) return;
    const dock = document.createElement("aside");
    dock.id = "symbalyx-ai-dock";
    dock.innerHTML = `
      <div class="sym-ai-head">
        <div class="sym-ai-logo">AI</div>
        <div>
          <div class="sym-ai-title">Bots IA</div>
          <div class="sym-ai-sub">local · Ollama · mémoire</div>
        </div>
        <button class="sym-ai-min" title="Réduire">−</button>
      </div>
      <div class="sym-ai-body">
        <div class="sym-ai-grid">
          <div class="sym-ai-card" data-cmd="!persona devweb\n!html landing page premium propre et responsive">
            <div class="sym-ai-icon">🌐</div>
            <div class="sym-ai-name">Dev Web</div>
            <div class="sym-ai-desc">HTML clean</div>
          </div>
          <div class="sym-ai-card" data-cmd="!patch Colle ici le bug, l'erreur console ou le code à corriger">
            <div class="sym-ai-icon">🛠️</div>
            <div class="sym-ai-name">Debug</div>
            <div class="sym-ai-desc">patch bugs</div>
          </div>
          <div class="sym-ai-card" data-cmd="!remember Ce projet doit garder une UI claire, premium et ne jamais repartir de zéro.">
            <div class="sym-ai-icon">🧠</div>
            <div class="sym-ai-name">Mémoire</div>
            <div class="sym-ai-desc">Obsidian local</div>
          </div>
          <div class="sym-ai-card" data-cmd="!summary 40">
            <div class="sym-ai-icon">📄</div>
            <div class="sym-ai-name">Résumé</div>
            <div class="sym-ai-desc">derniers messages</div>
          </div>
        </div>
        <div class="sym-ai-actions">
          <button class="sym-ai-btn" data-action="invite">Inviter @assistant</button>
          <button class="sym-ai-btn secondary" data-action="help">Copier !help</button>
        </div>
        <div class="sym-ai-note">Le bot doit être lancé avec le profil Docker IA. Les cartes copient les commandes pour éviter de casser Element.</div>
      </div>`;
    document.body.appendChild(dock);

    dock.querySelector(".sym-ai-min").addEventListener("click", () => {
      dock.classList.toggle("minimized");
      dock.querySelector(".sym-ai-min").textContent = dock.classList.contains("minimized") ? "+" : "−";
    });
    dock.querySelectorAll(".sym-ai-card").forEach(card => {
      card.addEventListener("click", () => copy(card.dataset.cmd, card.querySelector(".sym-ai-name")?.textContent || "Commande"));
    });
    dock.querySelector('[data-action="help"]').addEventListener("click", () => copy("!help", "!help"));
    dock.querySelector('[data-action="invite"]').addEventListener("click", () => {
      const room = currentRoomId();
      copy("@assistant:localhost", room ? "MXID assistant copié" : "Assistant copié");
    });
  }

  function brandElement() {
    document.documentElement.setAttribute("data-symbalyx-skin", VERSION);
    const title = document.querySelector("title");
    if (title && !title.textContent.includes("Symbalyx")) title.textContent = "Symbalyx Secure";
  }

  function boot() {
    brandElement();
    injectDock();
    setInterval(() => {
      brandElement();
      injectDock();
    }, 2500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
