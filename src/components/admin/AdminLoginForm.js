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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gray-950 font-sans px-4">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Glassmorphic Login Container */}
      <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-800/80 p-8 rounded-2xl shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block p-1 bg-gray-950 border border-gray-850 rounded-2xl mb-3 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/the%20intelliverse%20logo.jpg"
              alt="The Intelliverse Logo"
              className="w-16 h-16 rounded-xl object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">The Intelliverse</h1>
          <p className="text-sm text-gray-400 mt-1">Admin Panel Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-950/80 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-950/80 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                disabled={loading}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-950/30 border border-red-800/60 text-red-400 text-xs py-3 px-4 rounded-lg flex items-center gap-2 animate-pulse">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/15 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch animate-spin"></i>
                Verifying...
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5"
          >
            <i className="fas fa-home text-[10px]"></i>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
