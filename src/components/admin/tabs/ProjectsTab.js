"use client";

export default function ProjectsTab({
  projects,
  setProjects,
  selectedProjectIndex,
  setSelectedProjectIndex,
  isEditingMobileProjects,
  setIsEditingMobileProjects,
  handleAddProject,
  handleProjectChange,
  handleDeleteProject,
  handleMoveProject,
  handleSaveCMS,
  loading
}) {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">Worked Projects Portfolio</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Manage Worked Projects and their highlights, taglines, ratings, and features.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddProject}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95"
          >
            <i className="fas fa-plus"></i>
            <span>Add Project</span>
          </button>
          <button
            onClick={handleSaveCMS}
            disabled={loading}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 disabled:opacity-50 active:scale-95"
          >
            <i className="fas fa-save"></i>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Split Dual-Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDEBAR: Projects list */}
        <div className={`lg:col-span-4 bg-gray-900/30 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobileProjects ? "hidden lg:block animate-fade-out" : "block animate-fade-in"}`}>
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Project Cards ({projects.length})</h3>
            {projects.length > 0 && (
              <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
            {projects.map((proj, index) => {
              const isSelected = selectedProjectIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedProjectIndex(index);
                    setIsEditingMobileProjects(true);
                  }}
                  className={`group/item p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none ${
                    isSelected
                      ? "bg-blue-600/10 border-blue-500/35 shadow-lg shadow-blue-500/5"
                      : "bg-gray-950/30 border-gray-855 hover:border-gray-700/60 hover:bg-gray-950/70"
                  }`}
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-r-md"></div>
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    {/* Folder/Briefcase Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-gray-900 shadow-inner ${proj.isFeatured ? "text-amber-400 border-amber-500/20" : "text-blue-400 border-white/10"}`}>
                      <i className={`fas ${proj.isFeatured ? "fa-star" : "fa-briefcase"} text-sm`}></i>
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">
                        {proj.name || <span className="text-gray-600 italic">Unnamed Project</span>}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-mono truncate mt-0.5 max-w-[120px] sm:max-w-none">
                        {proj.type || <span className="text-gray-600 italic">No type selected</span>}
                      </p>
                    </div>
                  </div>

                  {/* Controls (Move & Delete) */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveProject(index, "up");
                      }}
                      disabled={index === 0}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-850 hover:border-gray-700 transition active:scale-90"
                      title="Move Up"
                    >
                      <i className="fas fa-chevron-up"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveProject(index, "down");
                      }}
                      disabled={index === projects.length - 1}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                      title="Move Down"
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(index);
                      }}
                      className="w-6 h-6 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[10px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                      title="Delete Card"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>

                  {/* Featured badge */}
                  {proj.isFeatured && (
                    <div className="absolute right-2.5 top-1.5 text-[8px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                      ★ Featured
                    </div>
                  )}
                </div>
              );
            })}

            {projects.length === 0 && (
              <div className="text-center py-10 border border-dashed border-gray-855 rounded-xl bg-gray-950/20">
                <i className="fas fa-folder-open text-gray-600 text-lg mb-2 block"></i>
                <p className="text-[11px] text-gray-500">No projects configured.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DETAIL PANEL */}
        <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobileProjects ? "block animate-fade-in" : "hidden lg:block"}`}>
          {selectedProjectIndex !== null && projects[selectedProjectIndex] ? (
            (() => {
              const index = selectedProjectIndex;
              const proj = projects[index];

              return (
                <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                  {/* Mobile Back Button */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsEditingMobileProjects(false)}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-850 active:scale-95 transition"
                    >
                      <i className="fas fa-arrow-left"></i>
                      <span>Back to Projects List</span>
                    </button>
                  </div>

                  {/* Detail Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`relative w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border bg-gray-950 shadow-inner z-10 ${proj.isFeatured ? "text-amber-400 border-amber-500/20" : "text-blue-400 border-blue-500/20"}`}>
                        <i className={`fas ${proj.isFeatured ? "fa-star" : "fa-folder-open"} text-base`}></i>
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Editing: {proj.name || "New Project Entry"}</span>
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                            INDEX #{index + 1}
                          </span>
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-0.5">Customize project tech stack tags, reviews, walkthrough parameters, and metrics.</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-sans"
                          placeholder="e.g., Appointory Portal"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Working Link URL</label>
                        <input
                          type="url"
                          value={proj.link}
                          onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-sans"
                          placeholder="https://appointory.in"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Project Category Type</label>
                        <select
                          value={proj.type || ""}
                          onChange={(e) => handleProjectChange(index, "type", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 cursor-pointer text-gray-300 font-sans"
                        >
                          <option value="">Select Category...</option>
                          <option value="SaaS Portal">SaaS Portal</option>
                          <option value="Web App">Web App</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Cloud Platform">Cloud Platform</option>
                          <option value="Landing Page">Landing Page</option>
                          <option value="Dashboard">Dashboard</option>
                          <option value="API Service">API Service</option>
                          <option value="Enterprise">Enterprise</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Project Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-sans leading-relaxed"
                        placeholder="Describe target user, tech stack, key highlights and development processes..."
                        rows="3"
                        required
                      ></textarea>
                    </div>

                    {/* Featured Toggle + Tagline */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-3 pt-4 select-none">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={proj.isFeatured || false}
                            onChange={(e) => handleProjectChange(index, "isFeatured", e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold font-mono">★ Featured Project</span>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Card Tagline Footer</label>
                        <input
                          type="text"
                          value={proj.tagline || ""}
                          onChange={(e) => handleProjectChange(index, "tagline", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-mono text-blue-400"
                          placeholder="e.g. // DIGITAL HEALTHCARE"
                        />
                      </div>
                    </div>

                    {/* Walkthrough/Feature link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Custom Walkthrough Link (Optional)</label>
                        <input
                          type="url"
                          value={proj.featureLink || ""}
                          onChange={(e) => handleProjectChange(index, "featureLink", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-sans"
                          placeholder="e.g., https://appointory.in/#features"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Walkthrough Button Label Text</label>
                        <input
                          type="text"
                          value={proj.featureText || ""}
                          onChange={(e) => handleProjectChange(index, "featureText", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-sans"
                          placeholder="e.g., See How It Works"
                        />
                      </div>
                    </div>

                    {/* Tech Tags */}
                    <div className="border-t border-white/5 pt-4">
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Tech Stack Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={(proj.techTags || []).join(", ")}
                        onChange={(e) => handleProjectChange(index, "techTags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                        className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-mono text-gray-300"
                        placeholder="e.g. Next.js, Node.js, WebSockets, WhatsApp API"
                      />
                      {(proj.techTags || []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {proj.techTags.map((tag, ti) => (
                            <span key={ti} className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-gray-850 text-blue-400 border border-gray-800">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Client Review quote */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-white/5 pt-4">
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Client Review Quote (Optional)</label>
                        <input
                          type="text"
                          value={proj.review}
                          onChange={(e) => handleProjectChange(index, "review", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-sans"
                          placeholder="Fabulous solutions provided by this company..."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Client Rating Stars (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={proj.rating || 5}
                          onChange={(e) => handleProjectChange(index, "rating", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 font-mono"
                        />
                      </div>
                    </div>

                    {/* Featured Project Highlights */}
                    <div className="border-t border-white/5 pt-4">
                      <div className="flex items-center justify-between pb-2">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-semibold block font-mono">Feature Bullet Points Highlights</label>
                          <span className="text-[9px] text-gray-500 block leading-normal mt-0.5 font-sans">Configure highlights displayed inside the featured project layout card.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...projects];
                            if (!updated[index].features) updated[index].features = [];
                            updated[index].features.push({ icon: "fa-star", label: "" });
                            setProjects(updated);
                          }}
                          className="px-2.5 py-1 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 text-green-400 rounded text-[9px] font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 font-mono"
                        >
                          <i className="fas fa-plus"></i>Add Feature
                        </button>
                      </div>
                      
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                        {(proj.features || []).map((feat, fi) => (
                          <div key={fi} className="flex items-center gap-2 animate-fade-in">
                            <input
                              type="text"
                              value={feat.icon}
                              onChange={(e) => {
                                const updated = [...projects];
                                updated[index].features[fi].icon = e.target.value;
                                setProjects(updated);
                              }}
                              className="w-28 p-2 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none font-mono"
                              placeholder="fa-star"
                            />
                            <input
                              type="text"
                              value={feat.label}
                              onChange={(e) => {
                                const updated = [...projects];
                                updated[index].features[fi].label = e.target.value;
                                setProjects(updated);
                              }}
                              className="flex-1 p-2 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none font-sans"
                              placeholder="e.g. Automated Appointment Queues"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...projects];
                                updated[index].features = updated[index].features.filter((_, ffi) => ffi !== fi);
                                setProjects(updated);
                              }}
                              className="p-1.5 text-red-500 hover:text-red-400 cursor-pointer active:scale-90 transition"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}

                        {(proj.features || []).length === 0 && (
                          <div className="text-center py-4 border border-dashed border-white/5 rounded-xl bg-gray-950/20">
                            <p className="text-[10px] text-gray-600 italic font-sans">No feature highlights added. Click &quot;Add Feature&quot; above to list highlights.</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()
          ) : (
            <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl shadow-inner">
                <i className="fas fa-folder-open"></i>
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">No Project Selected</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Select an existing worked project card from the list on the left to begin editing its details, or add a new one.
                </p>
              </div>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95 font-mono"
              >
                <i className="fas fa-plus mr-1.5"></i>
                Add New Project
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
