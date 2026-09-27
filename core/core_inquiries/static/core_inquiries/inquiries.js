document.addEventListener("DOMContentLoaded", () => {
  // Tab switching (Messages / Requests)
  const tabs = document.querySelectorAll(".inquiry-tab");
  const panels = document.querySelectorAll(".inquiry-tabpanel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => {
        p.hidden = p.id !== `tab-${tab.dataset.tab}`;
      });
    });
  });

  // Open / close a conversation
  const threadList = document.getElementById("messages-view");
  const convo = document.getElementById("conversation-view");
  if (!threadList || !convo) return;

  const input = convo.querySelector("[data-message-input]");
  const send = convo.querySelector("[data-message-send]");

  document.querySelectorAll('[data-action="open-conversation"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.querySelector(".thread-name").textContent.trim();
      convo.querySelector("[data-conversation-name]").textContent = name;
      convo.querySelector("[data-conversation-initials]").textContent = name[0];
      input.disabled = false;
      send.disabled = false;
      threadList.hidden = true;
      convo.hidden = false;
      // later: fetch this conversation's messages using btn.dataset.conversationId
    });
  });

  convo.querySelector('[data-action="back-to-threads"]').addEventListener("click", () => {
    convo.hidden = true;
    threadList.hidden = false;
  });
});