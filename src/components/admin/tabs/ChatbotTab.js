"use client";

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
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">Chatbot Q&amp;A Knowledge Base</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Configure keywords triggers and responses for the chatbot assistant.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddQA}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95"
          >
            <i className="fas fa-plus"></i>
            <span>Add Trigger</span>
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
        
        {/* LEFT SIDEBAR: QA list */}
        <div className={`lg:col-span-4 bg-gray-900/30 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobileQA ? "hidden lg:block animate-fade-out lg:animate-none" : "block animate-fade-in lg:animate-none"}`}>
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Triggers ({chatbotKnowledge.length})</h3>
            {chatbotKnowledge.length > 0 && (
              <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
            {chatbotKnowledge.map((qa, index) => {
              const isSelected = selectedQAIndex === index;
              const keywordsSnippet = qa.keywords ? qa.keywords.split(",")[0] : "New Trigger";

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedQAIndex(index);
                    setIsEditingMobileQA(true);
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
                    {/* Robot Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-gray-900 shadow-inner ${isSelected ? "text-amber-400 border-amber-500/20" : "text-gray-400 border-white/10"}`}>
                      <i className="fas fa-robot text-xs"></i>
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none font-mono">
                        {keywordsSnippet || <span className="text-gray-600 italic">No keywords</span>}
                      </h4>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5 max-w-[120px] sm:max-w-none">
                        {qa.keywords || <span className="text-gray-600 italic">No keywords configured</span>}
                      </p>
                    </div>
                  </div>

                  {/* Controls (Move & Delete) */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveQA(index, "up");
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
                        handleMoveQA(index, "down");
                      }}
                      disabled={index === chatbotKnowledge.length - 1}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                      title="Move Down"
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteQA(index);
                      }}
                      className="w-6 h-6 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[10px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                      title="Delete Card"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            {chatbotKnowledge.length === 0 && (
              <div className="text-center py-10 border border-dashed border-gray-855 rounded-xl bg-gray-950/20">
                <i className="fas fa-robot text-gray-600 text-lg mb-2 block"></i>
                <p className="text-[11px] text-gray-500">No QA triggers configured.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DETAIL PANEL */}
        <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobileQA ? "block animate-fade-in" : "hidden lg:block"}`}>
          {selectedQAIndex !== null && chatbotKnowledge[selectedQAIndex] ? (
            (() => {
              const index = selectedQAIndex;
              const qa = chatbotKnowledge[index];

              return (
                <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                  {/* Mobile Back Button */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsEditingMobileQA(false)}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-855 active:scale-95 transition"
                    >
                      <i className="fas fa-arrow-left"></i>
                      <span>Back to Triggers List</span>
                    </button>
                  </div>

                  {/* Detail Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border border-amber-500/20 bg-gray-950 shadow-inner z-10 text-amber-500">
                        <i className="fas fa-robot text-base"></i>
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Editing Trigger: {qa.keywords ? qa.keywords.split(",")[0] : "New Trigger"}</span>
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                            INDEX #{index + 1}
                          </span>
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-0.5 font-sans">Configure comma-separated keywords triggers and responses for the chatbot assistant.</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Keywords (comma-separated)</label>
                      <input
                        type="text"
                        value={qa.keywords}
                        onChange={(e) => handleQAChange(index, "keywords", e.target.value)}
                        className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-mono text-amber-400"
                        placeholder="e.g. pricing, rates, quote"
                        required
                      />
                      {qa.keywords && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {qa.keywords.split(",").map(k => k.trim()).filter(Boolean).map((word, wi) => (
                            <span key={wi} className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-gray-850 text-amber-400 border border-gray-800">{word}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Bot Response Message (Markdown-supported)</label>
                      <textarea
                        value={qa.response}
                        onChange={(e) => handleQAChange(index, "response", e.target.value)}
                        className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 leading-relaxed font-sans"
                        placeholder="Describe what the chatbot will answer if these keywords are matched..."
                        rows="8"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl shadow-inner font-mono">
                <i className="fas fa-robot"></i>
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">No Trigger Selected</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Select an existing trigger keywords card from the list on the left to begin editing, or add a new Q&amp;A trigger.
                </p>
              </div>
              <button
                onClick={handleAddQA}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-amber-500/10 cursor-pointer active:scale-95 font-mono"
              >
                <i className="fas fa-plus mr-1.5"></i>
                Add Q&amp;A Trigger
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
