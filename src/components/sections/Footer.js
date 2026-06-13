"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.linkedin.com/company/the-intelliverse/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 text-2xl footer-icon"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/the_intelliverse/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 text-2xl footer-icon"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="mailto:theintelliverse@gmail.com"
            className="text-gray-400 hover:text-blue-500 text-2xl footer-icon"
            title="Email Us"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <p>&copy; 2024 The Intelliverse. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
