"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const QUICK_SUGGESTIONS = [
  { label: "💰 Pricing & Quotes", query: "price" },
  { label: "👨‍💻 Founders & Team", query: "founder" },
  { label: "🌐 Services & Scope", query: "service" },
  { label: "🚀 Live Projects", query: "What projects have you built?" },
  { label: "📩 Contact Founders", query: "contact" },
];

/**
 * Format markdown-like text safely:
 * - **bold**
 * - bullet points (- or *)
 * - clickable email links
 * - newlines
 */
function FormattedMessage({ text }) {
  if (!text) return null;
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-[0.84rem] leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={`empty-${lineIdx}`} className="h-1" />;
        }

        const isBullet = /^[-*•]\s+/.test(trimmed);
        const content = isBullet ? trimmed.replace(/^[-*•]\s+/, "") : trimmed;

        // Parse inline tokens: **bold**, emails
        const regex = /(\*\*[^*]+\*\*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
          if (match.index > lastIndex) {
            parts.push(content.slice(lastIndex, match.index));
          }
          const token = match[0];
          if (token.startsWith("**") && token.endsWith("**")) {
            parts.push(
              <strong key={`b-${match.index}`} style={{ color: "#ffffff", fontWeight: 600 }}>
                {token.slice(2, -2)}
              </strong>
            );
          } else if (token.includes("@")) {
            parts.push(
              <a
                key={`a-${match.index}`}
                href={`mailto:${token}`}
                style={{
                  color: "#60a5fa",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  fontWeight: 500,
                }}
              >
                {token}
              </a>
            );
          }
          lastIndex = regex.lastIndex;
        }
        if (lastIndex < content.length) {
          parts.push(content.slice(lastIndex));
        }

        if (isBullet) {
          return (
            <div
              key={`line-${lineIdx}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                marginTop: "0.25rem",
                marginBottom: "0.25rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "var(--blue, #3d7bf7)",
                  marginTop: "0.45rem",
                  flexShrink: 0,
                  boxShadow: "0 0 6px rgba(61, 123, 247, 0.7)",
                }}
              />
              <div style={{ flex: 1 }}>{parts}</div>
            </div>
          );
        }

        return (
          <p key={`p-${lineIdx}`} style={{ margin: "0.15rem 0" }}>
            {parts}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Modernized Floating AI Assistant Chatbot
 */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I'm the Intelliverse assistant. Ask me anything about our software engineering, custom SaaS, pricing, or say 'Contact' to reach the founders directly.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    };
    window.addEventListener("open-chatbot", handleOpen);
    return () => window.removeEventListener("open-chatbot", handleOpen);
  }, []);

  const send = async (explicitText) => {
    const textToSend = typeof explicitText === "string" ? explicitText.trim() : input.trim();
    if (!textToSend || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: textToSend }]);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });
      const json = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            json.reply ||
            "I'll pass that to the founders — or you can reach us directly at theintelliverse@gmail.com.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. You can reach out directly to the founders at theintelliverse@gmail.com.",
        },
      ]);
    }
    setTyping(false);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "bot",
        text: "Hi 👋 I'm the Intelliverse assistant. Ask me anything about our software engineering, custom SaaS, pricing, or say 'Contact' to reach the founders directly.",
      },
    ]);
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
          {/* Top subtle gradient accent line */}
          <div
            style={{
              height: "2px",
              background: "linear-gradient(90deg, #3d7bf7 0%, #6366f1 50%, #22c55e 100%)",
              flexShrink: 0,
            }}
          />

          {/* Header */}
          <div
            style={{
              padding: "0.85rem 1.15rem",
              borderBottom: "1px solid rgba(228, 218, 195, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(14, 23, 48, 0.65)",
              backdropFilter: "blur(12px)",
              flexShrink: 0,
            }}
          >
            {/* Left Brand Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  position: "relative",
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(61, 123, 247, 0.12)",
                  border: "1px solid rgba(61, 123, 247, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 12px rgba(61, 123, 247, 0.2)",
                }}
              >
                <Image
                  src="/the-intelliverse-mark.png"
                  alt="The Intelliverse"
                  width={22}
                  height={22}
                  style={{ objectFit: "contain" }}
                />
                {/* Status Dot */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    right: "-2px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    border: "2px solid #0a1022",
                    boxShadow: "0 0 6px #22c55e",
                  }}
                />
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  The Intelliverse
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.15rem" }}>
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "var(--blue, #3d7bf7)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.5625rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(248, 242, 228, 0.6)",
                      margin: 0,
                    }}
                  >
                    AI Concierge · Instant
                  </p>
                </div>
              </div>
            </div>

            {/* Actions: Reset & Close */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <button
                onClick={resetChat}
                title="Restart Conversation"
                aria-label="Restart chat"
                data-cursor="link"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  color: "rgba(248, 242, 228, 0.65)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.background = "rgba(61, 123, 247, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(248, 242, 228, 0.65)";
                  e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.12)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              >
                ↺
              </button>

              <button
                onClick={() => setOpen(false)}
                title="Close Chat"
                aria-label="Close chat"
                data-cursor="link"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  color: "rgba(248, 242, 228, 0.65)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.5)";
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(248, 242, 228, 0.65)";
                  e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.12)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="chatbot-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem 1.15rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
            role="log"
            aria-label="Chat messages"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "flex-start",
                }}
              >
                {/* Assistant micro avatar */}
                {msg.role === "bot" && (
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "rgba(61, 123, 247, 0.15)",
                      border: "1px solid rgba(61, 123, 247, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Image
                      src="/the-intelliverse-mark.png"
                      alt="Mark"
                      width={14}
                      height={14}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}

                <div
                  style={{
                    padding: "0.75rem 1rem",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                        : "rgba(255, 255, 255, 0.055)",
                    color: msg.role === "user" ? "#ffffff" : "var(--cream)",
                    borderRadius:
                      msg.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                    border:
                      msg.role === "bot"
                        ? "1px solid rgba(228, 218, 195, 0.14)"
                        : "none",
                    boxShadow:
                      msg.role === "user"
                        ? "0 4px 14px rgba(37, 99, 235, 0.3)"
                        : "0 4px 12px rgba(0, 0, 0, 0.2)",
                    fontFamily: "'Satoshi', 'Inter', sans-serif",
                    backdropFilter: msg.role === "bot" ? "blur(8px)" : "none",
                  }}
                >
                  <FormattedMessage text={msg.text} />
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    background: "rgba(61, 123, 247, 0.15)",
                    border: "1px solid rgba(61, 123, 247, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/the-intelliverse-mark.png"
                    alt="Mark"
                    width={14}
                    height={14}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div
                  style={{
                    padding: "0.65rem 0.95rem",
                    background: "rgba(255, 255, 255, 0.055)",
                    border: "1px solid rgba(228, 218, 195, 0.14)",
                    borderRadius: "14px 14px 14px 3px",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                  }}
                  aria-label="Assistant is typing"
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--blue, #3d7bf7)",
                        boxShadow: "0 0 6px rgba(61, 123, 247, 0.8)",
                        animation: `bounce 1.2s ${d * 0.2}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.625rem",
                      color: "rgba(248, 242, 228, 0.5)",
                      marginLeft: "4px",
                    }}
                  >
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div
            style={{
              padding: "0.45rem 1rem",
              display: "flex",
              gap: "0.45rem",
              overflowX: "auto",
              borderTop: "1px solid rgba(228, 218, 195, 0.08)",
              background: "rgba(10, 16, 34, 0.4)",
              scrollbarWidth: "none",
              flexShrink: 0,
            }}
          >
            {QUICK_SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="chatbot-chip"
                onClick={() => send(item.query)}
                data-cursor="link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div
            style={{
              padding: "0.75rem 1rem 0.85rem",
              borderTop: "1px solid rgba(228, 218, 195, 0.12)",
              background: "rgba(10, 16, 34, 0.85)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(228, 218, 195, 0.18)",
                borderRadius: "9999px",
                padding: "0.3rem 0.4rem 0.3rem 1rem",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--blue, #3d7bf7)";
                e.currentTarget.style.boxShadow = "0 0 14px rgba(61, 123, 247, 0.25)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.18)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask about pricing, tech, services…"
                aria-label="Message input"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: "var(--cream, #fff)",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.85rem",
                  padding: "0.35rem 0",
                  outline: "none",
                }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                data-cursor="link"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: input.trim() && !typing
                    ? "linear-gradient(135deg, #3d7bf7 0%, #2563eb 100%)"
                    : "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: input.trim() && !typing ? "#ffffff" : "rgba(248, 242, 228, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !typing ? "pointer" : "not-allowed",
                  flexShrink: 0,
                  boxShadow:
                    input.trim() && !typing
                      ? "0 0 12px rgba(61, 123, 247, 0.5)"
                      : "none",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Helper footer note */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5625rem",
                letterSpacing: "0.06em",
                color: "rgba(248, 242, 228, 0.4)",
              }}
            >
              <span>The Intelliverse Studio</span>
              <span>Enter ↵ to send</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="chatbot-trigger"
        aria-label={open ? "Close assistant chat" : "Open assistant chat"}
        aria-expanded={open}
        data-cursor="link"
        data-cursor-magnetic
      >
        {/* Brand Mark Icon */}
        <div
          style={{
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Image
            src="/the-intelliverse-mark.png"
            alt="The Intelliverse"
            width={18}
            height={18}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Live Status Pulse */}
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#22c55e",
            flexShrink: 0,
            boxShadow: "0 0 8px #22c55e",
            animation: "hud-blink 2s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        <span>{open ? "Close Assistant" : "Ask Concierge"}</span>
      </button>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
