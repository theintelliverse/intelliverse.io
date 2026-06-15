"use client";

export default function TestimonialsTab({
  testimonials,
  selectedTestimonialIndex,
  setSelectedTestimonialIndex,
  isEditingMobileTestimonials,
  setIsEditingMobileTestimonials,
  handleAddTestimonial,
  handleTestimonialChange,
  handleDeleteTestimonial,
  handleMoveTestimonial,
  handleSaveCMS,
  loading
}) {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">Client Reviews &amp; Testimonials</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Manage client testimonials shown inside the reviews slider.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddTestimonial}
            className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95"
          >
            <i className="fas fa-plus"></i>
            <span>Add Review</span>
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
        
        {/* LEFT SIDEBAR: Testimonials list */}
        <div className={`lg:col-span-4 bg-gray-900/30 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobileTestimonials ? "hidden lg:block animate-fade-out" : "block animate-fade-in"}`}>
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Testimonials ({testimonials.length})</h3>
            {testimonials.length > 0 && (
              <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
            {testimonials.map((test, index) => {
              const isSelected = selectedTestimonialIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedTestimonialIndex(index);
                    setIsEditingMobileTestimonials(true);
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
                    {/* Quote Bubble Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-gray-900 shadow-inner ${isSelected ? "text-purple-400 border-purple-500/20" : "text-gray-400 border-white/10"}`}>
                      <i className="fas fa-quote-left text-xs"></i>
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">
                        {test.author || <span className="text-gray-600 italic">Unnamed Client</span>}
                      </h4>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5 max-w-[120px] sm:max-w-none">
                        &quot;{test.text || <span className="text-gray-600 italic">No text review</span>}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Controls (Move & Delete) */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveTestimonial(index, "up");
                      }}
                      disabled={index === 0}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-855 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-850 hover:border-gray-700 transition active:scale-90"
                      title="Move Up"
                    >
                      <i className="fas fa-chevron-up"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveTestimonial(index, "down");
                      }}
                      disabled={index === testimonials.length - 1}
                      className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-855 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                      title="Move Down"
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTestimonial(index);
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

            {testimonials.length === 0 && (
              <div className="text-center py-10 border border-dashed border-gray-855 rounded-xl bg-gray-950/20">
                <i className="fas fa-quote-right text-gray-600 text-lg mb-2 block"></i>
                <p className="text-[11px] text-gray-500">No testimonials configured.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DETAIL PANEL */}
        <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobileTestimonials ? "block animate-fade-in" : "hidden lg:block"}`}>
          {selectedTestimonialIndex !== null && testimonials[selectedTestimonialIndex] ? (
            (() => {
              const index = selectedTestimonialIndex;
              const test = testimonials[index];

              return (
                <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                  {/* Mobile Back Button */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsEditingMobileTestimonials(false)}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-850 active:scale-95 transition"
                    >
                      <i className="fas fa-arrow-left"></i>
                      <span>Back to Reviews List</span>
                    </button>
                  </div>

                  {/* Detail Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border border-purple-500/20 bg-gray-950 shadow-inner z-10 text-purple-400">
                        <i className="fas fa-comments text-base"></i>
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Editing: Review from {test.author || "New Client"}</span>
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                            INDEX #{index + 1}
                          </span>
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-0.5">Customize client name and their quote review description text below.</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono font-bold">Author / Client Name</label>
                      <input
                        type="text"
                        value={test.author}
                        onChange={(e) => handleTestimonialChange(index, "author", e.target.value)}
                        className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-sans"
                        placeholder="e.g. John Doe, CEO of Acme Inc."
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Client Review Quote Text</label>
                      <textarea
                        value={test.text}
                        onChange={(e) => handleTestimonialChange(index, "text", e.target.value)}
                        className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 leading-relaxed font-sans"
                        placeholder="Write client testimonial quote here..."
                        rows="5"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-2xl shadow-inner">
                <i className="fas fa-quote-left"></i>
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">No Testimonial Selected</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Select an existing testimonial card from the list on the left to begin editing, or add a new entry.
                </p>
              </div>
              <button
                onClick={handleAddTestimonial}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-purple-500/10 cursor-pointer active:scale-95 font-mono"
              >
                <i className="fas fa-plus mr-1.5"></i>
                Add Testimonial
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
