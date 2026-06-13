"use client";

export default function Projects({ data }) {
  // Hide section completely if there are no projects in the database
  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="py-20 reveal-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Worked Projects</h2>
          <p className="text-gray-400 mt-2">Discover some of the outstanding solutions we have delivered for our clients.</p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((project, idx) => (
            <div key={idx} className="service-card glass-card p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  {project.rating > 0 && (
                    <div className="flex text-yellow-400 space-x-1 text-sm">
                      {Array.from({ length: Math.min(5, Math.max(1, project.rating)) }).map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                {project.review && (
                  <div className="border-t border-gray-700/50 pt-4 mt-4 italic text-gray-400 text-xs leading-relaxed">
                    <i className="fas fa-quote-left mr-1 text-blue-500 opacity-60"></i>
                    {project.review}
                  </div>
                )}
              </div>

              {project.link && (
                <div className="mt-6 pt-4 border-t border-gray-700/30">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Project <i className="fas fa-arrow-up-right-from-square ml-2 text-xs"></i>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
