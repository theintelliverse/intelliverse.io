"use client";

import DragDropZone from "../DragDropZone";

export default function TeamTab({
  founders,
  selectedFounderIndex,
  setSelectedFounderIndex,
  teamEditorTab,
  setTeamEditorTab,
  isEditingMobile,
  setIsEditingMobile,
  handleAddFounder,
  handleDeleteFounder,
  handleMoveFounder,
  handleFounderChange,
  handleImageClick,
  handleImageUpload,
  handleAddCustomLink,
  handleCustomLinkChange,
  handleDeleteCustomLink,
  handleSaveCMS,
  loading,
  notify
}) {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">Team Members</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Manage founders and team members, their roles, images, positions, and display order.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddFounder}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95 duration-200"
          >
            <i className="fas fa-plus"></i>
            <span>Add Member</span>
          </button>
          <button
            onClick={handleSaveCMS}
            disabled={loading}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 disabled:opacity-50 active:scale-95 duration-200"
          >
            <i className="fas fa-save"></i>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Split Dual-Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR: Members list */}
        <div className={`lg:col-span-4 bg-gray-900/30 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobile ? "hidden lg:block animate-fade-out" : "block animate-fade-in"}`}>
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Member Cards ({founders.length})</h3>
            {founders.length > 0 && (
              <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
            {founders.map((founder, index) => {
              const isSelected = selectedFounderIndex === index;
              const imageX = founder.imageX !== undefined ? founder.imageX : 50;
              const imageY = founder.imageY !== undefined ? founder.imageY : 50;
              const avatarImg = founder.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedFounderIndex(index);
                    setIsEditingMobile(true);
                  }}
                  className={`group/item p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none ${
                    isSelected
                      ? "bg-blue-600/10 border-blue-500/35 shadow-lg shadow-blue-500/5"
                      : "bg-gray-950/30 border-gray-855 hover:border-gray-755 hover:bg-gray-950/70"
                  }`}
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-r-md"></div>
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    {/* Mini Cropped Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-gray-900 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={avatarImg}
                        alt={founder.name || "Avatar"}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: `${imageX}% ${imageY}%` }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                        }}
                      />
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">
                        {founder.name || <span className="text-gray-600 italic">Unnamed Member</span>}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-mono truncate mt-0.5 max-w-[120px] sm:max-w-none">
                        {founder.role || <span className="text-gray-600 italic">No role specified</span>}
                      </p>
                    </div>
                  </div>

                  {/* Controls (Move & Delete) */}
                  <div className="flex items-center gap-1 shrink-0 opacity-85 group-hover/item:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveFounder(index, "up");
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
                        handleMoveFounder(index, "down");
                      }}
                      disabled={index === founders.length - 1}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                      title="Move Down"
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFounder(index);
                      }}
                      className="w-6 h-6 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[10px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                      title="Delete Card"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>

                  {/* Order badge */}
                  <div className="absolute right-2.5 top-1.5 text-[8px] font-mono text-gray-600">
                    #{founder.order || index + 1}
                  </div>
                </div>
              );
            })}

            {founders.length === 0 && (
              <div className="text-center py-10 border border-dashed border-gray-850 rounded-xl bg-gray-950/20">
                <i className="fas fa-users-slash text-gray-600 text-lg mb-2 block"></i>
                <p className="text-[11px] text-gray-500">No members configured.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DETAIL PANEL: Sub-tabs Forms */}
        <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobile ? "block animate-fade-in" : "hidden lg:block"}`}>
          {selectedFounderIndex !== null && (founders[selectedFounderIndex] || founders[founders.length - 1]) ? (
            (() => {
              const index = founders[selectedFounderIndex] ? selectedFounderIndex : founders.length - 1;
              const founder = founders[index];

              return (
                <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                  {/* Mobile Back Button */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsEditingMobile(false)}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-855 active:scale-95 transition"
                    >
                      <i className="fas fa-arrow-left"></i>
                      <span>Back to Members List</span>
                    </button>
                  </div>

                  {/* Detail Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-gray-950 shadow-inner z-10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={founder.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                          alt={founder.name || "Preview"}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: `${founder.imageX || 50}% ${founder.imageY || 50}%` }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                          }}
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{founder.name || <span className="text-gray-500 italic">Unnamed Member</span>}</span>
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                            INDEX #{index + 1}
                          </span>
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-0.5 font-mono">{founder.role || "No role specified yet"}</p>
                      </div>
                    </div>

                    {/* Editor Tabs Navigation */}
                    <div className="flex p-0.5 bg-gray-950 border border-gray-850 rounded-xl max-w-sm">
                      {[
                        { id: "basic", label: "Basic Details" },
                        { id: "photo", label: "Profile Photo" },
                        { id: "socials", label: "Socials & Buttons" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTeamEditorTab(t.id)}
                          className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition duration-200 cursor-pointer ${
                            teamEditorTab === t.id
                              ? "bg-blue-600 text-white shadow"
                              : "text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SUB-TAB 1: Basic details */}
                  {teamEditorTab === "basic" && (
                    <div className="space-y-4 text-left animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-semibold block">Full Name</label>
                          <input
                            type="text"
                            value={founder.name}
                            onChange={(e) => handleFounderChange(index, "name", e.target.value)}
                            className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-bold"
                            placeholder="e.g. Dhruvil Patel"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-semibold block">Company Role</label>
                          <input
                            type="text"
                            value={founder.role}
                            onChange={(e) => handleFounderChange(index, "role", e.target.value)}
                            className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                            placeholder="e.g. Founder & CEO"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold block">Tagline / Motto</label>
                        <input
                          type="text"
                          value={founder.tagline}
                          onChange={(e) => handleFounderChange(index, "tagline", e.target.value)}
                          className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                          placeholder="e.g. Building the future of AI engineering."
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold block">Display Order Weight</label>
                        <input
                          type="number"
                          value={founder.order}
                          onChange={(e) => handleFounderChange(index, "order", e.target.value)}
                          className="w-32 mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 font-mono"
                          placeholder="e.g. 1"
                          min="1"
                          required
                        />
                        <span className="text-[9px] text-gray-500 block mt-1.5">Lower weights display first. Cards list display is automatically sorted.</span>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: Image alignment */}
                  {teamEditorTab === "photo" && (
                    <div className="space-y-5 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-semibold">Image Asset Path / URL</label>
                          <input
                            type="text"
                            value={founder.image}
                            onChange={(e) => handleFounderChange(index, "image", e.target.value)}
                            className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                            placeholder="e.g., /founder_dhruvil.jpg"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-semibold block">Upload Local Image File</label>
                          <DragDropZone index={index} onUploadSuccess={(url) => handleFounderChange(index, "image", url)} notify={notify} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-5">
                        {/* Left side: interactive position tagger */}
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] text-gray-400 uppercase font-semibold block">Interactive Focal Center Alignment</label>
                            <span className="text-[9px] text-gray-500 block leading-normal mt-0.5">Click directly on the subject&apos;s face/center inside the photo below.</span>
                          </div>
                          
                          <div 
                            onClick={(e) => handleImageClick(e, index)}
                            className="relative w-44 h-44 mx-auto bg-gray-950 border border-gray-805 rounded-2xl overflow-hidden cursor-crosshair group/crop select-none shadow-xl shadow-black/40 flex items-center justify-center active:scale-[0.98] transition-transform duration-100"
                          >
                            {founder.image ? (
                              <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={founder.image} 
                                  alt="Focal target aligner"
                                  className="w-full h-full object-cover pointer-events-none select-none"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                                  }}
                                />
                                {/* Crosshair Reticle Overlay */}
                                <div 
                                  className="absolute w-6 h-6 rounded-full border border-blue-400 bg-blue-500/10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                                  style={{ left: `${founder.imageX || 50}%`, top: `${founder.imageY || 50}%` }}
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
                                  <div className="absolute w-8 h-[1px] bg-blue-400/40"></div>
                                  <div className="absolute h-8 w-[1px] bg-blue-400/40"></div>
                                </div>
                              </>
                            ) : (
                              <div className="text-gray-600 text-[10px] flex flex-col items-center gap-1.5">
                                <i className="fas fa-image text-lg"></i>
                                <span>No Photo Configured</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right side: focal values preview */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div className="p-4 bg-gray-950/70 border border-gray-850 rounded-xl space-y-2.5">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold block">FOCAL POINT METADATA</span>
                            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                              <div className="p-2.5 bg-gray-900/40 rounded-lg border border-gray-850">
                                <span className="text-[9px] text-gray-500 block uppercase">Center X Offset</span>
                                <span className="text-blue-400 font-bold text-sm block mt-0.5">{founder.imageX !== undefined ? founder.imageX : 50}%</span>
                              </div>
                              <div className="p-2.5 bg-gray-900/40 rounded-lg border border-gray-850">
                                <span className="text-[9px] text-gray-500 block uppercase">Center Y Offset</span>
                                <span className="text-blue-400 font-bold text-sm block mt-0.5">{founder.imageY !== undefined ? founder.imageY : 50}%</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-500 leading-relaxed leading-normal">
                            This coordinate ensures the profile avatar is correctly centered on the landing page layout, regardless of varying viewport sizes (PC, Laptop, Fold phone, or Tablet).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 3: Social handles & buttons */}
                  {teamEditorTab === "socials" && (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-semibold">LinkedIn Profile URL (Optional)</label>
                          <div className="relative mt-1.5 flex items-center bg-gray-950 border border-gray-850 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 rounded-xl transition duration-300">
                            <span className="pl-3.5 text-gray-500"><i className="fab fa-linkedin-in text-xs"></i></span>
                            <input
                              type="url"
                              value={founder.linkedin || ""}
                              onChange={(e) => handleFounderChange(index, "linkedin", e.target.value)}
                              className="w-full bg-transparent border-none p-2.5 pl-2.5 text-xs text-white focus:outline-none"
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-semibold">Instagram Profile URL (Optional)</label>
                          <div className="relative mt-1.5 flex items-center bg-gray-950 border border-gray-855 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 rounded-xl transition duration-300">
                            <span className="pl-3.5 text-gray-500"><i className="fab fa-instagram text-xs"></i></span>
                            <input
                              type="url"
                              value={founder.instagram || ""}
                              onChange={(e) => handleFounderChange(index, "instagram", e.target.value)}
                              className="w-full bg-transparent border-none p-2.5 pl-2.5 text-xs text-white focus:outline-none"
                              placeholder="https://instagram.com/username"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Custom Action Buttons Sub-Editor */}
                      <div className="border-t border-white/5 pt-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Custom Action Buttons</h4>
                            <p className="text-[9px] text-gray-500 mt-0.5">Add link buttons below the founder card (e.g. Portfolio, GitHub, Calendly, Email).</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddCustomLink(index)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-[10px] transition active:scale-95 duration-200 cursor-pointer"
                          >
                            <i className="fas fa-plus mr-1"></i> Add Button
                          </button>
                        </div>

                        <div className="space-y-3.5 max-h-[40vh] overflow-y-auto pr-1">
                          {(founder.customLinks || []).map((link, lIdx) => (
                            <div key={lIdx} className="p-4 bg-gray-950/40 border border-gray-850 rounded-2xl flex flex-col md:flex-row gap-4 items-stretch justify-between relative group/link animate-fade-in hover:border-gray-800 transition">
                              
                              {/* Left inputs */}
                              <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="text-[9px] text-gray-500 font-bold uppercase block">Button Label</label>
                                  <input
                                    type="text"
                                    value={link.name}
                                    onChange={(e) => handleCustomLinkChange(index, lIdx, "name", e.target.value)}
                                    className="w-full mt-1.5 p-2 bg-gray-950 border border-gray-850 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-white rounded-lg text-xs focus:outline-none transition"
                                    placeholder="e.g., GitHub"
                                    required
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[9px] text-gray-500 font-bold uppercase block">Target URL / mailto Link</label>
                                  <div className="relative mt-1.5 flex items-center bg-gray-950 border border-gray-850 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20 rounded-lg transition duration-200">
                                    <span className="pl-3 text-gray-500 text-[10px]"><i className="fas fa-link"></i></span>
                                    <input
                                      type="text"
                                      value={link.url}
                                      onChange={(e) => handleCustomLinkChange(index, lIdx, "url", e.target.value)}
                                      className="w-full bg-transparent border-none p-2 pl-2 text-xs text-white focus:outline-none"
                                      placeholder="https://github.com/username or mailto:user@email.com"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Right Icon Picker & Delete */}
                              <div className="flex flex-row md:flex-col items-end md:justify-between justify-end gap-3 border-t md:border-t-0 border-white/[0.04] pt-3.5 md:pt-0 shrink-0 min-w-0 md:min-w-[120px]">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCustomLink(index, lIdx)}
                                  className="px-2 py-1 bg-red-950/10 hover:bg-red-950/40 text-red-500 border border-red-900/15 rounded text-[9px] font-bold transition md:order-none order-last"
                                >
                                  <i className="fas fa-trash-alt mr-1"></i> Delete
                                </button>
                                
                                <div className="w-full">
                                  <span className="text-[9px] text-gray-500 font-bold uppercase block text-left">Button Icon</span>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <div className="w-7 h-7 bg-gray-950 border border-gray-850 rounded flex items-center justify-center text-xs text-indigo-400">
                                      <i className={link.icon || "fas fa-link"}></i>
                                    </div>
                                    <input
                                      type="text"
                                      value={link.icon || ""}
                                      onChange={(e) => handleCustomLinkChange(index, lIdx, "icon", e.target.value)}
                                      className="flex-grow p-1.5 bg-gray-950 border border-gray-850 focus:border-emerald-500 text-white rounded text-[10px] focus:outline-none transition font-mono"
                                      placeholder="fas fa-link"
                                    />
                                  </div>

                                  {/* Quick preset suggestions */}
                                  <div className="flex flex-wrap gap-1.5 mt-2 justify-start">
                                    {[
                                      { icon: "fab fa-github", title: "GitHub" },
                                      { icon: "fas fa-briefcase", title: "Portfolio" },
                                      { icon: "fas fa-calendar-alt", title: "Schedule" },
                                      { icon: "fas fa-envelope", title: "Mail" },
                                    ].map((sug) => (
                                      <button
                                        key={sug.icon}
                                        type="button"
                                        onClick={() => handleCustomLinkChange(index, lIdx, "icon", sug.icon)}
                                        className="p-1 text-[10px] text-gray-500 hover:text-white bg-gray-900 border border-gray-850 rounded hover:border-gray-700 transition"
                                        title={sug.title}
                                      >
                                        <i className={sug.icon}></i>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {(founder.customLinks || []).length === 0 && (
                            <div className="text-center py-6 border border-dashed border-gray-850 rounded-xl bg-gray-950/20">
                              <i className="fas fa-link text-gray-600 text-base mb-1 block"></i>
                              <p className="text-[10px] text-gray-500 font-bold">No custom buttons added. Click &quot;Add Button&quot; above to create one.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl shadow-inner">
                <i className="fas fa-users"></i>
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Member Selected</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Select an existing team member card from the list on the left to begin editing their information, or add a new card.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
