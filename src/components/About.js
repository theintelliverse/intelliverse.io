"use client";

export default function About({ data }) {
  return (
    <section id="about" className="py-20 reveal-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About The Intelliverse</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 md:h-auto rounded-lg shadow-2xl overflow-hidden">
            <div className="animated-vision-bg w-full h-full flex items-center justify-center p-8 min-h-[300px]">
              <div className="text-center vision-content-animate">
                <i className="fas fa-rocket text-6xl text-white opacity-50 mb-4" aria-hidden="true"></i>
                <h3 className="text-2xl font-bold text-white opacity-90">Our Vision</h3>
                <p className="text-white opacity-70 mt-2">
                  To be at the forefront of digital innovation, creating solutions that drive progress.
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Innovation, Create and Grow</h3>
            <p id="about-p1" className="text-gray-300 mb-4">
              {data.p1}
            </p>
            <p className="text-gray-300">
              Our mission is to transform your ideas into powerful digital realities, ensuring growth and success through technology and creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
