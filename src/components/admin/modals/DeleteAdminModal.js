"use client";

export default function DeleteAdminModal({
  adminToDelete,
  setAdminToDelete,
  handleDeleteAdmin
}) {
  if (!adminToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 text-red-500 flex items-center justify-center text-xl mx-auto animate-bounce">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-bold text-sm font-mono uppercase tracking-wider">Delete Admin Account?</h3>
          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
            Are you sure you want to permanently delete the admin account for <strong className="text-white font-semibold">{adminToDelete}</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 pt-2 font-mono">
          <button
            onClick={() => setAdminToDelete(null)}
            className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs py-2 rounded-lg cursor-pointer transition text-center"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              const target = adminToDelete;
              setAdminToDelete(null);
              await handleDeleteAdmin(target);
            }}
            className="w-1/2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2 rounded-lg cursor-pointer transition text-center"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
