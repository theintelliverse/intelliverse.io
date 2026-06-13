"use client";

export default function Team() {
  return (
    <section id="team" className="py-20 reveal-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Meet the Founders</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Dhruvil Thummar */}
          <div className="team-card glass-card p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-blue-500/35 hover:border-blue-500 hover:scale-105 transition-all duration-300 object-cover"
              src="/founder_dhruvil.jpg"
              alt="Photo of Dhruvil Thummar"
            />
            <h3 className="text-xl font-bold mb-1">Dhruvil Thummar</h3>
            <p className="text-blue-400 font-medium mb-3">Co-founder &amp; CTO</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/dhruvilthummar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          {/* Rudra Kankotiya */}
          <div className="team-card glass-card p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-blue-500/35 hover:border-blue-500 hover:scale-105 transition-all duration-300 object-cover"
              src="/founder_rudra.jpg"
              alt="Photo of Rudra Kankotiya"
            />
            <h3 className="text-xl font-bold mb-1">Rudra Kankotiya</h3>
            <p className="text-blue-400 font-medium mb-3">Co-founder &amp; CMO</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/rudra-kankotiya-2173ab31a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          {/* Jal Anghan */}
          <div className="team-card glass-card p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-blue-500/35 hover:border-blue-500 hover:scale-105 transition-all duration-300 object-cover"
              src="/founder_jal.jpg"
              alt="Photo of Jal Anghan"
            />
            <h3 className="text-xl font-bold mb-1">Jal Anghan</h3>
            <p className="text-blue-400 font-medium mb-3">Founder &amp; Director</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/jal-anghan-534628309"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
