"use client";

import { useState } from "react";

export default function CaseStudiesTab({
  caseStudies,
  setCaseStudies,
  selectedCaseStudyIndex,
  setSelectedCaseStudyIndex,
  isEditingMobileCaseStudies,
  setIsEditingMobileCaseStudies,
  handleAddCaseStudy,
  handleCaseStudyChange,
  handleDeleteCaseStudy,
  handleMoveCaseStudy,
  handleSaveCMS,
  loading
}) {
  const [newTagInput, setNewTagInput] = useState("");

  const currentItem =
    selectedCaseStudyIndex !== null && caseStudies[selectedCaseStudyIndex]
      ? caseStudies[selectedCaseStudyIndex]
      : null;

  const handleAddTag = (e) => {
    if (e) e.preventDefault();
    if (!newTagInput.trim() || !currentItem) return;
    const currentStack = Array.isArray(currentItem.stack) ? currentItem.stack : [];
    if (!currentStack.includes(newTagInput.trim())) {
      handleCaseStudyChange(selectedCaseStudyIndex, "stack", [...currentStack, newTagInput.trim()]);
    }
    setNewTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    if (!currentItem) return;
    const currentStack = Array.isArray(currentItem.stack) ? currentItem.stack : [];
    handleCaseStudyChange(
      selectedCaseStudyIndex,
      "stack",
      currentStack.filter((t) => t !== tagToRemove)
    );
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Case Studies &amp; Engineering Specifications
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Manage deep architectural case studies, technical engineering specifications, impact metrics, and production deployments.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddCaseStudy}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10 active:scale-95"
          >
            <i className="fas fa-plus"></i>
            <span>Add Case Study</span>
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

      {/* Strict Display Rule Alert Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-start gap-3">
        <i className="fas fa-shield-halved mt-0.5 shrink-0 text-sm"></i>
        <div>
          <strong className="font-semibold">Strict Conditional Rendering:</strong> Any section or individual field (Role, Brief, Impact, Live Link, Review, Tags) that is left empty will be <strong>automatically hidden</strong> on the frontend. If all Case Studies are removed, the entire Case Studies section will not render.
        </div>
      </div>

      {/* Split Dual-Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR: Case Studies list */}
        <div
          className={`lg:col-span-4 bg-gray-900/30 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${
            isEditingMobileCaseStudies
              ? "hidden lg:block animate-fade-out lg:animate-none"
              : "block animate-fade-in lg:animate-none"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Case Studies ({caseStudies.length})
            </h3>
            {caseStudies.length > 0 && (
              <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
            {caseStudies.map((cs, index) => {
              const isSelected = selectedCaseStudyIndex === index;

              return (
                <div
                  key={cs.id || index}
                  onClick={() => {
                    setSelectedCaseStudyIndex(index);
                    setIsEditingMobileCaseStudies(true);
                  }}
                  className={`group/item p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none ${
                    isSelected
                      ? "bg-amber-600/10 border-amber-500/40 shadow-lg shadow-amber-500/5"
                      : "bg-gray-950/30 border-gray-800 hover:border-gray-700/60 hover:bg-gray-950/70"
                  }`}
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-amber-500 rounded-r-md"></div>
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    {/* Plate Index Badge */}
                    <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center border shrink-0 bg-gray-900 text-amber-400 border-amber-500/20 font-mono text-[10px] font-bold">
                      <span>PL</span>
                      <span>0{index + 1}</span>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-none">
                        {cs.name || <span className="text-gray-600 italic">Unnamed Case Study</span>}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono truncate mt-0.5 max-w-[140px] sm:max-w-none">
                        {cs.category || cs.role || <span className="text-gray-600 italic">No category</span>}
                      </p>
                    </div>
                  </div>

                  {/* Controls (Move & Delete) */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveCaseStudy(index, "up");
                      }}
                      disabled={index === 0}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-800 hover:text-amber-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-800 hover:border-gray-700 transition active:scale-90"
                      title="Move Up"
                    >
                      <i className="fas fa-chevron-up"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveCaseStudy(index, "down");
                      }}
                      disabled={index === caseStudies.length - 1}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-800 hover:text-amber-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-800 hover:border-gray-700 transition active:scale-90"
                      title="Move Down"
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCaseStudy(index);
                      }}
                      className="w-6 h-6 rounded bg-red-950/20 hover:bg-red-900/40 text-red-400 text-[10px] flex items-center justify-center border border-red-500/20 hover:border-red-500/40 transition active:scale-90 ml-1"
                      title="Delete Case Study"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            {caseStudies.length === 0 && (
              <div className="p-8 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl">
                <i className="fas fa-microchip text-2xl mb-2 opacity-40"></i>
                <p className="text-xs">No case studies added yet.</p>
                <button
                  onClick={handleAddCaseStudy}
                  className="mt-3 px-3 py-1.5 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 text-xs rounded-lg transition"
                >
                  Create First Case Study
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT MAIN PANEL: Detailed Specification Form */}
        <div
          className={`lg:col-span-8 bg-gray-900/30 border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-sm transition-all duration-300 ${
            isEditingMobileCaseStudies
              ? "block animate-fade-in lg:animate-none"
              : "hidden lg:block animate-fade-out lg:animate-none"
          }`}
        >
          {currentItem ? (
            <div className="space-y-6">
              {/* Top Bar inside form */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingMobileCaseStudies(false)}
                    className="lg:hidden w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center text-xs transition"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      PLATE 0{selectedCaseStudyIndex + 1}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {currentItem.name || "Untitled Specification"}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {currentItem.link && (
                    <a
                      href={currentItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs text-blue-400 rounded-lg transition flex items-center gap-1.5"
                    >
                      <span>Visit Live</span>
                      <i className="fas fa-external-link-alt text-[10px]"></i>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteCaseStudy(selectedCaseStudyIndex)}
                    className="px-3 py-1.5 bg-red-950/30 hover:bg-red-900/50 text-xs text-red-400 rounded-lg transition flex items-center gap-1.5 border border-red-500/20"
                  >
                    <i className="fas fa-trash-alt"></i>
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Case Study Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    System / Product Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentItem.name || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "name", e.target.value)
                    }
                    placeholder="e.g. Appointory, Vrix Jewellery, Pulse ERP"
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition"
                  />
                </div>

                {/* 2. Domain / Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Industry / System Category
                  </label>
                  <input
                    type="text"
                    value={currentItem.category || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "category", e.target.value)
                    }
                    placeholder="e.g. Healthcare SaaS Platform, Luxury E-Commerce"
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition"
                  />
                </div>

                {/* 3. Architectural / Engineering Role */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Architectural &amp; Engineering Role
                  </label>
                  <input
                    type="text"
                    value={currentItem.role || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "role", e.target.value)
                    }
                    placeholder="e.g. Full-Stack Product Architecture & Real-Time Cloud Integration"
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Shown in uppercase above the project title on the plate card. Leave empty to hide.
                  </p>
                </div>

                {/* 4. Quantifiable Impact & Benchmark */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Quantifiable Impact &amp; Performance Metric
                  </label>
                  <input
                    type="text"
                    value={currentItem.impact || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "impact", e.target.value)
                    }
                    placeholder="e.g. 40% clinic queue reduction · 15k+ monthly active consultations"
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Highlighted in an amber impact banner. Leave empty to hide.
                  </p>
                </div>

                {/* 5. Comprehensive Engineering Brief */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Comprehensive Engineering Brief &amp; Architecture Description
                  </label>
                  <textarea
                    rows={4}
                    value={currentItem.summary || currentItem.description || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "summary", e.target.value)
                    }
                    placeholder="Provide full technical details: problem solved, architectural approach, real-time queues, security locker, scalability guarantees..."
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition leading-relaxed"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Add full brief details here. Will only display if text is provided.
                  </p>
                </div>

                {/* 6. Tech Stack Tags */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Tech Stack Tags
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="e.g. Next.js 15, Node.js, MongoDB, Cloud Messaging API"
                      className="flex-grow bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      + Add Tag
                    </button>
                  </div>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(currentItem.stack || []).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/80 border border-white/10 rounded-lg text-xs text-gray-200 font-mono"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-400 hover:text-red-400 transition"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    {(!currentItem.stack || currentItem.stack.length === 0) && (
                      <span className="text-[10px] text-gray-500 italic font-mono">
                        No tech tags added yet. (Tags section will be omitted if empty)
                      </span>
                    )}
                  </div>
                </div>

                {/* 7. Working Live Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Working Live URL
                  </label>
                  <input
                    type="url"
                    value={currentItem.link || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "link", e.target.value)
                    }
                    placeholder="https://appointory.in"
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    If provided, renders a &quot;Live Site ↗&quot; button. If empty, button is hidden.
                  </p>
                </div>

                {/* 7b. Case Study Internal Link */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-medium text-amber-300">
                      Case Study Page URL
                    </label>
                    {currentItem.caseStudyLink && (
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        LINKED
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={currentItem.caseStudyLink || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "caseStudyLink", e.target.value)
                    }
                    placeholder="e.g. /work/appointory or /work/vrix"
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition"
                  />
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-[9px] text-gray-500 font-mono">Presets:</span>
                    <button
                      type="button"
                      onClick={() => handleCaseStudyChange(selectedCaseStudyIndex, "caseStudyLink", "/work/appointory")}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white"
                    >
                      /work/appointory
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCaseStudyChange(selectedCaseStudyIndex, "caseStudyLink", "/work/vrix")}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white"
                    >
                      /work/vrix
                    </button>
                  </div>
                </div>

                {/* 8. Star Rating */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Quality Rating (1–5 Stars)
                  </label>
                  <select
                    value={currentItem.rating || 5}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "rating", e.target.value)
                    }
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 transition"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                    <option value={2}>2 Stars (★★☆☆☆)</option>
                    <option value={1}>1 Star (★☆☆☆☆)</option>
                  </select>
                </div>

                {/* 9. Client Endorsement / Quote */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-mono font-medium text-gray-300">
                    Client Endorsement / Testimonial Quote
                  </label>
                  <textarea
                    rows={2}
                    value={currentItem.review || ""}
                    onChange={(e) =>
                      handleCaseStudyChange(selectedCaseStudyIndex, "review", e.target.value)
                    }
                    placeholder="e.g. The Intelliverse delivered an outstanding medical scheduling platform..."
                    className="w-full bg-gray-950/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60 transition leading-relaxed"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Shown as an italicized client quote inside the card. Leave blank to omit.
                  </p>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="pt-6 border-t border-white/5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                  Card Real-Time Preview (As Displayed on Site)
                </span>

                <div
                  style={{
                    background: "#ede8df",
                    color: "#1a1a18",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    border: "1px solid rgba(43,39,33,0.15)",
                  }}
                  className="space-y-3 font-sans shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-amber-700">
                      PLATE 0{selectedCaseStudyIndex + 1}
                    </span>
                    {currentItem.category && (
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-black/5 rounded text-gray-700">
                        {currentItem.category}
                      </span>
                    )}
                  </div>

                  {currentItem.role && (
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold">
                      {currentItem.role}
                    </div>
                  )}

                  <h4
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    className="text-2xl text-gray-900 leading-tight"
                  >
                    {currentItem.name || "Untitled System"}
                  </h4>

                  {(currentItem.summary || currentItem.description) && (
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {currentItem.summary || currentItem.description}
                    </p>
                  )}

                  {currentItem.impact && (
                    <div className="p-2 bg-amber-500/10 border-l-2 border-amber-600 text-xs text-gray-900 font-mono">
                      <strong>Impact:</strong> {currentItem.impact}
                    </div>
                  )}

                  {currentItem.review && (
                    <div className="p-2 bg-black/5 rounded italic text-xs text-gray-700 border-l-2 border-gray-400">
                      &ldquo;{currentItem.review}&rdquo;
                    </div>
                  )}

                  {((currentItem.stack && currentItem.stack.length > 0) || currentItem.link) && (
                    <div className="pt-3 border-t border-black/10 flex justify-between items-center flex-wrap gap-2">
                      <div className="flex flex-wrap gap-1">
                        {(currentItem.stack || []).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-mono bg-black/5 rounded text-gray-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {currentItem.link && (
                        <span className="text-xs font-mono font-bold text-gray-900 underline">
                          Live Project ↗
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <i className="fas fa-hand-pointer text-3xl mb-3 opacity-40"></i>
              <p className="text-xs font-mono">Select a Case Study from the left or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
