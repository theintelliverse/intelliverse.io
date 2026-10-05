"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login: reload the page to check cookie and render dashboard
        router.refresh();
      } else {
        setError(data.error || "Invalid username or password. Please try again.");
      }
    } catch (err) {
      setError("Network error. Failed to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans px-4 select-none"
      style={{
        backgroundColor: "var(--night)",
        color: "var(--cream)",
      }}
    >
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-[var(--blue)]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-[var(--orange)]/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Glassmorphic Login Container */}
      <div
        className="w-full max-w-md p-8 md:p-10 rounded-2xl relative z-10 animate-fade-in transition-all duration-500"
        style={{
          backgroundColor: "rgba(18, 30, 68, 0.85)",
          border: "1px solid rgba(228, 218, 195, 0.16)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div className="text-center mb-8">
          <div
            className="inline-block p-1 rounded-2xl mb-4 transition-all duration-500 group"
            style={{
              backgroundColor: "rgba(11, 21, 48, 0.8)",
              border: "1px solid rgba(228, 218, 195, 0.2)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/the%20intelliverse%20logo.jpg"
              alt="The Intelliverse Logo"
              className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "2.25rem",
              letterSpacing: "-0.02em",
              color: "var(--cream)",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
            }}
          >
            The Intelliverse
          </h1>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--orange)",
              fontWeight: 700,
            }}
          >
            Studio Admin Console
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <label
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(248, 242, 228, 0.75)",
                display: "block",
                fontWeight: 600,
              }}
            >
              Username
            </label>
            <div
              className="relative flex items-center rounded-xl transition-all duration-300 overflow-hidden"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.05)",
                border: "1px solid rgba(228, 218, 195, 0.18)",
              }}
            >
              <span className="pl-4 flex items-center pointer-events-none text-[var(--orange)]">
                <i className="fas fa-user text-xs"></i>
              </span>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "0.85rem 1rem 0.85rem 0.75rem",
                  color: "var(--cream)",
                  outline: "none",
                  fontSize: "0.875rem",
                  fontFamily: "'Satoshi', sans-serif",
                }}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(248, 242, 228, 0.75)",
                display: "block",
                fontWeight: 600,
              }}
            >
              Password
            </label>
            <div
              className="relative flex items-center rounded-xl transition-all duration-300 overflow-hidden"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.05)",
                border: "1px solid rgba(228, 218, 195, 0.18)",
              }}
            >
              <span className="pl-4 flex items-center pointer-events-none text-[var(--orange)]">
                <i className="fas fa-key text-xs"></i>
              </span>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "0.85rem 1rem 0.85rem 0.75rem",
                  color: "var(--cream)",
                  outline: "none",
                  fontSize: "0.875rem",
                  fontFamily: "'Satoshi', sans-serif",
                }}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Error Message banner */}
          {error && (
            <div
              className="py-3 px-4 rounded-xl flex items-center gap-2.5 animate-fade-in select-none text-xs"
              style={{
                backgroundColor: "rgba(255, 107, 123, 0.15)",
                border: "1px solid rgba(255, 107, 123, 0.3)",
                color: "var(--coral)",
              }}
            >
              <i className="fas fa-exclamation-circle text-xs shrink-0"></i>
              <span className="font-semibold text-[11px] leading-snug">{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
            style={{
              backgroundColor: "var(--blue-deep)",
              color: "var(--cream)",
              border: "none",
              boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-press)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-deep)")}
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch animate-spin text-xs"></i>
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Access Console</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-7">
          <Link
            href="/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(248, 242, 228, 0.6)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248, 242, 228, 0.6)")}
          >
            <i className="fas fa-home text-[9px]"></i>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
