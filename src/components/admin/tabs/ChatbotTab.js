"use client";

import { useState } from "react";

export default function ChatbotTab({
  chatbotKnowledge,
  selectedQAIndex,
  setSelectedQAIndex,
  isEditingMobileQA,
  setIsEditingMobileQA,
  handleAddQA,
  handleQAChange,
  handleDeleteQA,
  handleMoveQA,
  handleSaveCMS,
  loading
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [testQuery, setTestQuery] = useState("");

  const filteredKnowledge = chatbotKnowledge
    .map((qa, originalIndex) => ({ ...qa, originalIndex }))
    .filter((qa) => {
      const q = searchTerm.toLowerCase();
      return (
        qa.keywords.toLowerCase().includes(q) ||
        qa.response.toLowerCase().includes(q)
      );
    });

  // Calculate test simulation match
  const testMatchResult = (() => {
    if (!testQuery.trim()) return null;
    const query = testQuery.toLowerCase().trim();
    const matched = chatbotKnowledge.find((qa) => {
      const keys = (qa.keywords || "").split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
      return keys.some((k) => query.includes(k));
    });
    return matched;
  })();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--blue)] animate-pulse shadow-[0_0_10px_rgba(61,123,247,0.8)]"></span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-mono uppercase" style={{ color: "var(--cream)" }}>
              Chatbot Knowledge Base &amp; Q&amp;A
            </h2>
          </div>
          <p className="text-xs md:text-sm mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Configure keyword triggers, replies, and test simulation matcher for the website assistant.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddQA}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer font-mono active:scale-95"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.18)",
              color: "#34d399",
              border: "1px solid rgba(16, 185, 129, 0.35)",
            }}
          >
            <i className="fas fa-plus text-[10px]"></i>
            <span>Add Trigger</span>
          </button>
          <button
            onClick={handleSaveCMS}
            disabled={loading}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer font-mono disabled:opacity-50 active:scale-95"
            style={{
              backgroundColor: "var(--blue-deep)",
              color: "var(--cream)",
              border: "1px solid rgba(228, 218, 195, 0.2)",
              boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
            }}
          >
            <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-save"}`}></i>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Split Dual-Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR: QA list */}
        <div
          className={`lg:col-span-4 admin-console-card p-4 md:p-5 space-y-4 transition-all duration-300 ${
            isEditingMobileQA
              ? "hidden lg:block animate-fade-out lg:animate-none"
              : "block animate-fade-in lg:animate-none"
          }`}
        >
          <div className="flex items-center justify-between pb-3" style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono" style={{ color: "var(--cream)" }}>
              Triggers ({chatbotKnowledge.length})
            </h3>
            {chatbotKnowledge.length > 0 && (
              <span className="text-[10px] font-mono" style={{ color: "var(--orange)" }}>
                Click to Edit
              </span>
            )}
          </div>

          {/* Quick Search */}
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "rgba(248, 242, 228, 0.4)" }}></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter triggers..."
              className="admin-input-field pl-8 pr-7 text-xs font-mono py-2"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs hover:text-white"
                style={{ color: "rgba(248, 242, 228, 0.5)" }}
              >
                ✕
              </button>
            )}
          </div>

          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
            {filteredKnowledge.map((qa) => {
              const originalIndex = qa.originalIndex;
              const isSelected = selectedQAIndex === originalIndex;
              const keywordsSnippet = qa.keywords ? qa.keywords.split(",")[0] : "New Trigger";

              return (
                <div
                  key={originalIndex}
                  onClick={() => {
                    setSelectedQAIndex(originalIndex);
                    setIsEditingMobileQA(true);
                  }}
                  className="p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none group"
                  style={{
                    backgroundColor: isSelected ? "rgba(47, 99, 224, 0.15)" : "rgba(11, 21, 48, 0.7)",
                    borderColor: isSelected ? "var(--blue)" : "rgba(228, 218, 195, 0.1)",
                    boxShadow: isSelected ? "0 4px 16px rgba(47, 99, 224, 0.2)" : "none",
                  }}
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-[var(--blue)] rounded-r-md"></div>
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 text-xs"
                      style={{
                        backgroundColor: "rgba(18, 30, 68, 0.9)",
                        color: isSelected ? "var(--orange)" : "var(--blue)",
                        borderColor: isSelected ? "rgba(253, 179, 71, 0.3)" : "rgba(61, 123, 247, 0.2)",
                      }}
                    >
                      <i className="fas fa-robot"></i>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate max-w-[130px] sm:max-w-none font-mono" style={{ color: "var(--cream)" }}>
                        {keywordsSnippet}
                      </h4>
                      <p className="text-[10px] truncate mt-0.5 max-w-[130px] sm:max-w-none font-sans" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
                        {qa.keywords || "No keywords configured"}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveQA(originalIndex, "up");
                      }}
                      disabled={originalIndex === 0}
                      className="w-6 h-6 rounded text-[10px] flex items-center justify-center border transition cursor-pointer disabled:opacity-20"
                      style={{
                        backgroundColor: "rgba(18, 30, 68, 0.8)",
                        borderColor: "rgba(228, 218, 195, 0.12)",
                        color: "var(--cream)",
                      }}
                      title="Move Up"
                    >
                      <i className="fas fa-chevron-up"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveQA(originalIndex, "down");
                      }}
                      disabled={originalIndex === chatbotKnowledge.length - 1}
                      className="w-6 h-6 rounded text-[10px] flex items-center justify-center border transition cursor-pointer disabled:opacity-20"
                      style={{
                        backgroundColor: "rgba(18, 30, 68, 0.8)",
                        borderColor: "rgba(228, 218, 195, 0.12)",
                        color: "var(--cream)",
                      }}
                      title="Move Down"
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Delete this chatbot trigger?")) {
                          handleDeleteQA(originalIndex);
                        }
                      }}
                      className="w-6 h-6 rounded text-[10px] flex items-center justify-center border transition ml-1 cursor-pointer hover:bg-red-950/60"
                      style={{
                        backgroundColor: "rgba(255, 107, 123, 0.12)",
                        borderColor: "rgba(255, 107, 123, 0.25)",
                        color: "var(--coral)",
                      }}
                      title="Delete Trigger"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredKnowledge.length === 0 && (
              <div className="text-center py-10 border border-dashed rounded-xl" style={{ borderColor: "rgba(228, 218, 195, 0.15)" }}>
                <i className="fas fa-robot text-lg mb-2 block" style={{ color: "rgba(248, 242, 228, 0.3)" }}></i>
                <p className="text-[11px] font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
                  {searchTerm ? `No triggers matching "${searchTerm}".` : "No triggers configured."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DETAIL PANEL */}
        <div
          className={`lg:col-span-8 space-y-6 transition-all duration-300 ${
            isEditingMobileQA ? "block animate-fade-in" : "hidden lg:block"
          }`}
        >
          {selectedQAIndex !== null && chatbotKnowledge[selectedQAIndex] ? (
            (() => {
              const index = selectedQAIndex;
              const qa = chatbotKnowledge[index];

              return (
                <div className="admin-console-card p-5 md:p-6 space-y-6">
                  {/* Mobile Back Button */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsEditingMobileQA(false)}
                      className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl transition font-mono"
                      style={{
                        backgroundColor: "rgba(248, 242, 228, 0.08)",
                        color: "var(--cream)",
                        border: "1px solid rgba(228, 218, 195, 0.15)",
                      }}
                    >
                      <i className="fas fa-arrow-left"></i>
                      <span>Back to Triggers List</span>
                    </button>
                  </div>

                  {/* Detail Header */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3"
                    style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center border"
                        style={{
                          backgroundColor: "rgba(11, 21, 48, 0.9)",
                          color: "var(--orange)",
                          borderColor: "rgba(253, 179, 71, 0.3)",
                        }}
                      >
                        <i className="fas fa-robot text-base"></i>
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold flex items-center gap-2 font-mono" style={{ color: "var(--cream)" }}>
                          <span>Trigger: {qa.keywords ? qa.keywords.split(",")[0] : "New Trigger"}</span>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold"
                            style={{
                              backgroundColor: "rgba(47, 99, 224, 0.15)",
                              color: "var(--blue)",
                              border: "1px solid rgba(61, 123, 247, 0.3)",
                            }}
                          >
                            POSITION #{index + 1}
                          </span>
                        </h3>
                        <p className="text-[11px] mt-0.5 font-mono" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                          Matched keywords trigger the automated assistant reply instantly on the live site.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] uppercase font-semibold font-mono tracking-wider block mb-1.5" style={{ color: "var(--orange)" }}>
                        Keywords (Comma-Separated Triggers)
                      </label>
                      <input
                        type="text"
                        value={qa.keywords}
                        onChange={(e) => handleQAChange(index, "keywords", e.target.value)}
                        className="admin-input-field font-mono"
                        placeholder="e.g. pricing, rates, quote, cost, estimate"
                        required
                      />
                      {qa.keywords && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {qa.keywords
                            .split(",")
                            .map((k) => k.trim())
                            .filter(Boolean)
                            .map((word, wi) => (
                              <span
                                key={wi}
                                className="text-[10px] font-mono px-2.5 py-0.5 rounded-md"
                                style={{
                                  backgroundColor: "rgba(253, 179, 71, 0.12)",
                                  color: "var(--orange)",
                                  border: "1px solid rgba(253, 179, 71, 0.25)",
                                }}
                              >
                                {word}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-semibold font-mono tracking-wider block mb-1.5" style={{ color: "var(--cream)" }}>
                        Chatbot Automated Reply (Supports **bold**, bullet lines, and links)
                      </label>
                      <textarea
                        value={qa.response}
                        onChange={(e) => handleQAChange(index, "response", e.target.value)}
                        className="admin-input-field leading-relaxed font-sans"
                        placeholder="Describe what the assistant replies when any of the above keywords are mentioned in chat..."
                        rows={7}
                        required
                      ></textarea>
                    </div>

                    {/* Interactive Matcher Sandbox */}
                    <div
                      className="p-4 rounded-xl border space-y-3"
                      style={{
                        backgroundColor: "rgba(11, 21, 48, 0.7)",
                        borderColor: "rgba(228, 218, 195, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-vial" style={{ color: "var(--blue)" }}></i>
                          <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: "var(--cream)" }}>
                            Keyword Match Simulator &amp; Live Preview
                          </span>
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: "rgba(248, 242, 228, 0.5)" }}>
                          Test real-time accuracy
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={testQuery}
                          onChange={(e) => setTestQuery(e.target.value)}
                          placeholder="Type a sample question like 'How much does a project cost?'..."
                          className="admin-input-field text-xs font-mono"
                        />
                        {testQuery && (
                          <button
                            type="button"
                            onClick={() => setTestQuery("")}
                            className="px-3 py-1.5 rounded-xl text-xs font-mono border"
                            style={{
                              backgroundColor: "rgba(248, 242, 228, 0.08)",
                              color: "var(--cream)",
                              borderColor: "rgba(228, 218, 195, 0.15)",
                            }}
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      {testQuery.trim() && (
                        <div
                          className="p-3 rounded-lg text-xs font-mono border transition-all"
                          style={{
                            backgroundColor: testMatchResult ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 107, 123, 0.12)",
                            borderColor: testMatchResult ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 107, 123, 0.3)",
                            color: testMatchResult ? "#34d399" : "var(--coral)",
                          }}
                        >
                          <div className="flex items-center gap-2 font-bold mb-1">
                            <i className={`fas ${testMatchResult ? "fa-check-circle" : "fa-times-circle"}`}></i>
                            <span>
                              {testMatchResult
                                ? `Matched Trigger: "${testMatchResult.keywords.split(",")[0]}"`
                                : "No keyword matched — fallback bot response will be used."}
                            </span>
                          </div>
                          {testMatchResult && (
                            <p className="text-[11px] font-sans mt-1 p-2 rounded bg-black/30 text-white/90 whitespace-pre-wrap">
                              {testMatchResult.response}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="admin-console-card p-10 md:p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-inner font-mono border"
                style={{
                  backgroundColor: "rgba(47, 99, 224, 0.15)",
                  color: "var(--blue)",
                  borderColor: "rgba(61, 123, 247, 0.3)",
                }}
              >
                <i className="fas fa-robot"></i>
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono" style={{ color: "var(--cream)" }}>
                  No Trigger Selected
                </h3>
                <p className="text-xs font-sans" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                  Select an existing trigger keyword card from the list on the left to edit, or create a new Q&amp;A response.
                </p>
              </div>
              <button
                onClick={handleAddQA}
                className="px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer font-mono"
                style={{
                  backgroundColor: "var(--blue-deep)",
                  color: "var(--cream)",
                  border: "1px solid rgba(228, 218, 195, 0.2)",
                  boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
                }}
              >
                <i className="fas fa-plus mr-1.5"></i>
                Add New Trigger
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
