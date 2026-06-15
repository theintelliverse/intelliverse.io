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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gray-950 font-sans px-4 select-none">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6s]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8s]"></div>

      {/* Glassmorphic Login Container */}
      <div className="w-full max-w-md bg-gray-900/30 backdrop-blur-xl border border-white/5 hover:border-blue-500/25 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] relative z-10 animate-fade-in transition-all duration-500">
        <div className="text-center mb-8">
          <div className="inline-block p-1 bg-gray-950 border border-gray-850 rounded-2xl mb-4 shadow-lg hover:shadow-blue-500/25 hover:border-blue-500/35 transition-all duration-500 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/the%20intelliverse%20logo.jpg"
              alt="The Intelliverse Logo"
              className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide uppercase font-mono">The Intelliverse</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1.5 font-semibold">Admin Panel Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Username
            </label>
            <div className="relative flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 rounded-xl transition-all duration-300 overflow-hidden group">
              <span className="pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
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
                className="w-full bg-transparent border-none py-3.5 pl-3.5 pr-4 text-white focus:outline-none text-xs transition"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 rounded-xl transition-all duration-300 overflow-hidden group">
              <span className="pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
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
                className="w-full bg-transparent border-none py-3.5 pl-3.5 pr-4 text-white focus:outline-none text-xs transition"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Error Message banner */}
          {error && (
            <div className="bg-red-950/20 border border-red-900/30 text-red-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2.5 animate-fade-in select-none">
              <i className="fas fa-exclamation-circle text-xs shrink-0"></i>
              <span className="font-semibold text-[11px] leading-snug">{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-gray-800 disabled:to-gray-800 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch animate-spin text-xs"></i>
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-7">
          <Link
            href="/"
            className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-2"
          >
            <i className="fas fa-home text-[9px]"></i>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
