"use client";

import { useState, useRef, useEffect } from "react";

/**
 * Floating assistant button + compact chat panel
 * UI only — /api/chat placeholder route, no fake AI replies.
 */
export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I'm the Intelliverse assistant. Ask me anything about our services, or say 'Contact' to reach the team directly.",
    },
  ]);
  const [typing, setTyping]   = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-chatbot", handleOpen);
    return () => window.removeEventListener("open-chatbot", handleOpen);
  }, []);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const json = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: json.reply || "I'll pass that to the team — or you can email us at theintelliverse@gmail.com." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Email us at theintelliverse@gmail.com instead." }]);
    }
    setTyping(false);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div id="chatbot-container" aria-live="polite">
      {/* Chat window */}
      {open && (
        <div
          className="chatbot-window"
          role="dialog"
          aria-label="Chat with The Intelliverse assistant"
          aria-modal="true"
          data-cursor="hide"
        >
          {/* Header */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid rgba(228, 218, 195, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--blue)" }}>
                Intelliverse Assistant
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(248, 242, 228, 0.5)", marginTop: "0.2rem" }}>
                Replies in seconds
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              data-cursor="link"
              style={{ background: "none", border: "none", color: "rgba(248, 242, 228, 0.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.875rem" }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
            role="log"
            aria-label="Chat messages"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "0.75rem 1rem",
                  background: msg.role === "user" ? "var(--blue-deep)" : "rgba(255, 255, 255, 0.06)",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  border: msg.role === "bot" ? "1px solid rgba(228, 218, 195, 0.15)" : "none",
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                }}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "0.75rem 1rem",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(228, 218, 195, 0.15)",
                  borderRadius: "12px 12px 12px 2px",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
                aria-label="Assistant is typing"
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    style={{
                      width: 6, height: 6,
                      borderRadius: "50%",
                      background: "var(--blue)",
                      animation: `bounce 1.2s ${d * 0.2}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.875rem 1.25rem",
              borderTop: "1px solid rgba(228, 218, 195, 0.15)",
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type a message…"
              aria-label="Message input"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(228, 218, 195, 0.25)",
                color: "var(--cream)",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.875rem",
                padding: "0.5rem 0",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              aria-label="Send message"
              data-cursor="link"
              style={{
                background: "var(--blue-deep)",
                border: "none",
                color: "var(--cream)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.625rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.5rem 0.875rem",
                borderRadius: "4px",
                flexShrink: 0,
                fontWeight: 600,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="chatbot-trigger"
        aria-label={open ? "Close assistant chat" : "Open assistant chat"}
        aria-expanded={open}
        data-cursor="link"
        data-cursor-magnetic
      >
        <span
          style={{
            width: "7px", height: "7px",
            borderRadius: "50%",
            background: "var(--blue)",
            flexShrink: 0,
            boxShadow: "0 0 8px var(--blue)",
            animation: "hud-blink 2s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        Need assistance? Ask me!
      </button>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
