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
      "bg-blue-900/40 text-blue-300 border-blue-500/20",
      "bg-teal-900/40 text-teal-300 border-teal-500/20",
      "bg-indigo-900/40 text-indigo-300 border-indigo-500/20",
      "bg-purple-900/40 text-purple-300 border-purple-500/20",
      "bg-rose-900/40 text-rose-300 border-rose-500/20",
      "bg-emerald-900/40 text-emerald-300 border-emerald-500/20",
      "bg-amber-900/40 text-amber-300 border-amber-500/20"
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

  const filteredAdmins = adminsList.filter(u =>
    u.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">
          Manage Administrator Accounts
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Configure administrator login credentials and update system access settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Password Update Form */}
        <div className="bg-gray-900/30 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm space-y-6 shadow-xl shadow-black/20">
          <h3 className="text-xs font-bold text-white pb-3 border-b border-white/5 flex items-center gap-2 font-mono uppercase tracking-wider">
            <i className="fas fa-lock text-blue-400 font-bold"></i>
            <span>Change My Password</span>
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">Current Password</label>
              <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                <input
                  type={showCurrentPass ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                >
                  <i className={`fas ${showCurrentPass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">New Password</label>
              <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                <input
                  type={showNewPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                >
                  <i className={`fas ${showNewPass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-gray-500 font-mono">PASSWORD STRENGTH:</span>
                    <span className={`${newPassStrength.text} font-mono`}>{newPassStrength.label}</span>
                  </div>
                  <div className="h-1 bg-gray-950 border border-white/5 rounded-full overflow-hidden flex">
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
              <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">Confirm New Password</label>
              <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                >
                  <i className={`fas ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
              {newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword && (
                <p className="text-[9px] text-rose-400 font-bold mt-1.5 font-mono">
                  ⚠️ Passwords do not match.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || (newPassword.length > 0 && newPassword !== confirmPassword)}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 duration-200 font-mono"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>

        {/* Create New Admin Form */}
        <div className="bg-gray-900/30 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm space-y-6 shadow-xl shadow-black/20">
          <h3 className="text-xs font-bold text-white pb-3 border-b border-white/5 flex items-center gap-2 font-mono uppercase tracking-wider">
            <i className="fas fa-user-plus text-green-400 font-bold"></i>
            <span>Create Administrator</span>
          </h3>

          <form onSubmit={handleCreateAdmin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">New Admin Username</label>
              <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                <input
                  type="text"
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  className="w-full bg-transparent border-none py-3 px-4 text-white focus:outline-none text-xs transition"
                  placeholder="e.g., john_doe"
                  required
                />
              </div>
              {newAdminUsername.length > 0 && !isCreateUsernameValid && (
                <p className="text-[9px] text-rose-400 font-bold mt-1.5 font-mono">
                  ⚠️ Usernames can only contain letters, numbers, hyphens, and underscores.
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">Password</label>
              <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                <input
                  type={showCreatePass ? "text" : "password"}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCreatePass(!showCreatePass)}
                  className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                >
                  <i className={`fas ${showCreatePass ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newAdminPassword.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-gray-500 font-mono">PASSWORD STRENGTH:</span>
                    <span className={`${createPassStrength.text} font-mono`}>{createPassStrength.label}</span>
                  </div>
                  <div className="h-1 bg-gray-950 border border-white/5 rounded-full overflow-hidden flex">
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
                className="w-full sm:w-auto px-5 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md shadow-green-500/10 active:scale-95 duration-200 font-mono"
              >
                Register Admin Account
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Active Admin List */}
      <div className="bg-gray-900/30 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm space-y-4 shadow-xl shadow-black/20 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-white/5">
          <h3 className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
            <i className="fas fa-users text-purple-400 font-bold"></i>
            <span>Active Admin Accounts</span>
          </h3>

          {/* Search filter bar */}
          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]"></i>
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Search accounts..."
              className="w-full pl-8.5 pr-3 py-2 bg-gray-950 border border-gray-850 text-white rounded-xl text-[10px] focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition duration-300 font-medium font-mono"
            />
          </div>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-none text-xs">
          {filteredAdmins.map((username, index) => {
            const isSelf = username.toLowerCase() === currentUser.toLowerCase();
            const canDelete = !isSelf && adminsList.length > 1;
            const avatar = getAvatarStyle(username);

            return (
              <div
                key={index}
                className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-800 transition duration-300 font-mono"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Initials Avatar badge */}
                  <div className={`w-8.5 h-8.5 rounded-full border flex items-center justify-center font-bold font-mono text-[10px] shrink-0 select-none ${avatar.classes}`}>
                    {avatar.initials}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-white break-all">{username}</span>
                    {isSelf && (
                      <span className="inline-block ml-2 px-2.5 py-0.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[8px] rounded-full font-bold whitespace-nowrap uppercase tracking-wider font-mono">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {canDelete ? (
                  <button
                    onClick={() => setAdminToDelete(username)}
                    disabled={loading}
                    className="px-3.5 py-1.5 bg-red-950/15 hover:bg-red-950/35 border border-red-900/15 text-red-500 hover:text-red-400 rounded-xl text-[10px] font-bold transition cursor-pointer shrink-0 active:scale-95 duration-250 font-mono"
                  >
                    <i className="fas fa-trash-alt mr-1"></i>
                    Delete
                  </button>
                ) : (
                  !isSelf && (
                    <span className="text-[10px] text-gray-500 italic text-right whitespace-nowrap font-sans">
                      Cannot delete last admin
                    </span>
                  )
                )}
              </div>
            );
          })}

          {filteredAdmins.length === 0 && (
            <p className="text-center text-xs text-gray-500 py-6 italic font-sans">No matching administrators found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
