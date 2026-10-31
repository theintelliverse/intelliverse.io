"use client";

export default function SettingsTab({
  currentUser,
  adminsList,
  adminSearch,
  setAdminSearch,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  newAdminUsername,
  setNewAdminUsername,
  newAdminPassword,
  setNewAdminPassword,
  showCurrentPass,
  setShowCurrentPass,
  showNewPass,
  setShowNewPass,
  showConfirmPass,
  setShowConfirmPass,
  showCreatePass,
  setShowCreatePass,
  setAdminToDelete,
  handleChangePassword,
  handleCreateAdmin,
  loading
}) {
  // Password Strength Utility
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "bg-gray-800", text: "text-gray-500" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 25, label: "Weak Security", color: "bg-red-500", text: "text-red-400" };
    if (score === 2) return { score: 50, label: "Fair Security", color: "bg-amber-500", text: "text-amber-400" };
    if (score === 3) return { score: 75, label: "Good Security", color: "bg-blue-500", text: "text-blue-400" };
    return { score: 100, label: "Strong Security", color: "bg-emerald-500", text: "text-emerald-400" };
  };

  // Username Validation Utility
  const isUsernameValid = (uname) => {
    return /^[a-zA-Z0-9_-]*$/.test(uname);
  };

  // Avatar Theming Utility
  const getAvatarStyle = (name) => {
    const colors = [
      "bg-blue-900/50 text-blue-300 border-blue-500/30",
      "bg-emerald-900/50 text-emerald-300 border-emerald-500/30",
      "bg-indigo-900/50 text-indigo-300 border-indigo-500/30",
      "bg-purple-900/50 text-purple-300 border-purple-500/30",
      "bg-amber-900/50 text-amber-300 border-amber-500/30"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    const initials = name.slice(0, 2).toUpperCase();
    return { classes: colors[index], initials };
  };

  const newPassStrength = getPasswordStrength(newPassword);
  const createPassStrength = getPasswordStrength(newAdminPassword);
  const isCreateUsernameValid = isUsernameValid(newAdminUsername);

  const filteredAdmins = adminsList.filter((u) =>
    u.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight font-mono uppercase" style={{ color: "var(--cream)" }}>
            Security &amp; Administrator Access
          </h2>
        </div>
        <p className="text-xs md:text-sm mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
          Manage login credentials, password policies, and authenticated studio accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Password Update Form */}
        <div className="admin-console-card p-6 md:p-8 space-y-6">
          <h3
            className="text-xs font-bold pb-3 flex items-center gap-2 font-mono uppercase tracking-wider"
            style={{
              color: "var(--cream)",
              borderBottom: "1px solid rgba(228, 218, 195, 0.1)",
            }}
          >
            <i className="fas fa-lock" style={{ color: "var(--blue)" }}></i>
            <span>Update Personal Password</span>
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="text-[10px] uppercase font-semibold font-mono tracking-wider block mb-1.5" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Current Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCurrentPass ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="admin-input-field pr-10 font-mono"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3.5 text-xs hover:text-white transition cursor-pointer"
                  style={{ color: "rgba(248, 242, 228, 0.5)" }}
                >
                  <i className={`fas ${showCurrentPass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-[10px] uppercase font-semibold font-mono tracking-wider block mb-1.5" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                New Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showNewPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="admin-input-field pr-10 font-mono"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3.5 text-xs hover:text-white transition cursor-pointer"
                  style={{ color: "rgba(248, 242, 228, 0.5)" }}
                >
                  <i className={`fas ${showNewPass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-bold font-mono">
                    <span style={{ color: "rgba(248, 242, 228, 0.5)" }}>SECURITY STRENGTH:</span>
                    <span className={newPassStrength.text}>{newPassStrength.label}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden flex" style={{ backgroundColor: "rgba(11, 21, 48, 0.9)" }}>
                    <div
                      className={`h-full transition-all duration-300 ${newPassStrength.color}`}
                      style={{ width: `${newPassStrength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[10px] uppercase font-semibold font-mono tracking-wider block mb-1.5" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Confirm New Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="admin-input-field pr-10 font-mono"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3.5 text-xs hover:text-white transition cursor-pointer"
                  style={{ color: "rgba(248, 242, 228, 0.5)" }}
                >
                  <i className={`fas ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
              {newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword && (
                <p className="text-[10px] text-rose-400 font-bold mt-1.5 font-mono">
                  ⚠️ Passwords do not match.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || (newPassword.length > 0 && newPassword !== confirmPassword)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer font-mono active:scale-95 disabled:opacity-50"
                style={{
                  backgroundColor: "var(--blue-deep)",
                  color: "var(--cream)",
                  border: "1px solid rgba(228, 218, 195, 0.2)",
                  boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
                }}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>

        {/* Create New Admin Form */}
        <div className="admin-console-card p-6 md:p-8 space-y-6">
          <h3
            className="text-xs font-bold pb-3 flex items-center gap-2 font-mono uppercase tracking-wider"
            style={{
              color: "var(--cream)",
              borderBottom: "1px solid rgba(228, 218, 195, 0.1)",
            }}
          >
            <i className="fas fa-user-plus" style={{ color: "#34d399" }}></i>
            <span>Register New Admin</span>
          </h3>

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-[10px] uppercase font-semibold font-mono tracking-wider block mb-1.5" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Administrator Username
              </label>
              <input
                type="text"
                value={newAdminUsername}
                onChange={(e) => setNewAdminUsername(e.target.value)}
                className="admin-input-field font-mono"
                placeholder="e.g. system_admin"
                required
              />
              {newAdminUsername.length > 0 && !isCreateUsernameValid && (
                <p className="text-[10px] text-rose-400 font-bold mt-1.5 font-mono">
                  ⚠️ Username may only contain letters, numbers, hyphens, and underscores.
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] uppercase font-semibold font-mono tracking-wider block mb-1.5" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Initial Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCreatePass ? "text" : "password"}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="admin-input-field pr-10 font-mono"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCreatePass(!showCreatePass)}
                  className="absolute right-3.5 text-xs hover:text-white transition cursor-pointer"
                  style={{ color: "rgba(248, 242, 228, 0.5)" }}
                >
                  <i className={`fas ${showCreatePass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newAdminPassword.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-bold font-mono">
                    <span style={{ color: "rgba(248, 242, 228, 0.5)" }}>SECURITY STRENGTH:</span>
                    <span className={createPassStrength.text}>{createPassStrength.label}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden flex" style={{ backgroundColor: "rgba(11, 21, 48, 0.9)" }}>
                    <div
                      className={`h-full transition-all duration-300 ${createPassStrength.color}`}
                      style={{ width: `${createPassStrength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !isCreateUsernameValid || newAdminUsername.length === 0}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer font-mono active:scale-95 disabled:opacity-50"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#34d399",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                }}
              >
                Register Admin Account
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Active Admin List */}
      <div className="admin-console-card p-6 md:p-8 space-y-4">
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3"
          style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
        >
          <h3 className="text-xs font-bold flex items-center gap-2 font-mono uppercase tracking-wider" style={{ color: "var(--cream)" }}>
            <i className="fas fa-users" style={{ color: "var(--orange)" }}></i>
            <span>Active Administrator Accounts ({adminsList.length})</span>
          </h3>

          {/* Search filter bar */}
          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "rgba(248, 242, 228, 0.4)" }}></i>
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Filter accounts..."
              className="admin-input-field pl-8 pr-3 py-2 text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-none text-xs">
          {filteredAdmins.map((username, index) => {
            const isSelf = username.toLowerCase() === (currentUser || "").toLowerCase();
            const canDelete = !isSelf && adminsList.length > 1;
            const avatar = getAvatarStyle(username);

            return (
              <div
                key={index}
                className="flex justify-between items-center p-3.5 rounded-xl gap-2 transition duration-300 font-mono"
                style={{
                  backgroundColor: "rgba(11, 21, 48, 0.75)",
                  border: "1px solid rgba(228, 218, 195, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8.5 h-8.5 rounded-full border flex items-center justify-center font-bold font-mono text-[10px] shrink-0 select-none ${avatar.classes}`}>
                    {avatar.initials}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold break-all" style={{ color: "var(--cream)" }}>{username}</span>
                    {isSelf && (
                      <span
                        className="inline-block ml-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono"
                        style={{
                          backgroundColor: "rgba(47, 99, 224, 0.15)",
                          color: "var(--blue)",
                          border: "1px solid rgba(61, 123, 247, 0.3)",
                        }}
                      >
                        You (Active Session)
                      </span>
                    )}
                  </div>
                </div>

                {canDelete ? (
                  <button
                    onClick={() => setAdminToDelete(username)}
                    disabled={loading}
                    className="px-3.5 py-1.5 rounded-xl text-[10px] font-bold transition cursor-pointer shrink-0 active:scale-95 font-mono"
                    style={{
                      backgroundColor: "rgba(255, 107, 123, 0.12)",
                      color: "var(--coral)",
                      border: "1px solid rgba(255, 107, 123, 0.25)",
                    }}
                  >
                    <i className="fas fa-trash-alt mr-1"></i>
                    Revoke
                  </button>
                ) : (
                  !isSelf && (
                    <span className="text-[10px] font-mono italic text-right whitespace-nowrap" style={{ color: "rgba(248, 242, 228, 0.4)" }}>
                      Protected
                    </span>
                  )
                )}
              </div>
            );
          })}

          {filteredAdmins.length === 0 && (
            <p className="text-center text-xs py-6 italic font-mono" style={{ color: "rgba(248, 242, 228, 0.5)" }}>
              No matching administrators found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
