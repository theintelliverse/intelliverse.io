"use client";

export default function Services() {
  return (
    <section id="services" className="py-20 reveal-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Services</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="service-card glass-card p-8 rounded-lg shadow-lg text-center">
            <div className="text-blue-500 mb-4">
              <i className="fas fa-laptop-code text-4xl" aria-hidden="true"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Web Development</h3>
            <p className="text-gray-400">
              Crafting beautiful, responsive, and high-performing websites tailored to your business needs.
            </p>
          </div>
          <div className="service-card glass-card p-8 rounded-lg shadow-lg text-center">
            <div className="text-blue-500 mb-4">
              <i className="fas fa-cogs text-4xl" aria-hidden="true"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Software Development</h3>
            <p className="text-gray-400">
              Building custom software solutions to streamline your operations and drive efficiency.
            </p>
          </div>
          <div className="service-card glass-card p-8 rounded-lg shadow-lg text-center">
            <div className="text-blue-500 mb-4">
              <i className="fas fa-shield-alt text-4xl" aria-hidden="true"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">IT Services</h3>
            <p className="text-gray-400">
              Providing reliable IT support and services to keep your business running smoothly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
