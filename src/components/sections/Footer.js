"use client";

import Link from "next/link";

export default function Footer() {
  const playHover = () => {};

  const playClick = () => {};

  const handleSmoothScroll = (e, targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
            element.scrollIntoView({ behavior: "smooth" });
    } else {
          }
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05020c]/85 backdrop-blur-xl pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/the%20intelliverse%20logo.jpg"
                alt="The Intelliverse Logo"
                className="h-9 w-9 rounded-lg border border-white/10"
              />
              <span className="text-white font-black tracking-widest text-sm font-mono uppercase">
                THE INTELLIVERSE
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-normal">
              Your innovation partner for premium software development, custom web engineering, and enterprise-grade IT architectures.
            </p>
            {/* Status indicator */}
            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-4">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/#services"
                  onClick={(e) => handleSmoothScroll(e, "services")}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  onClick={(e) => handleSmoothScroll(e, "services")}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  onClick={(e) => handleSmoothScroll(e, "services")}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  IT Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/#about"
                  onClick={(e) => handleSmoothScroll(e, "about")}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#team"
                  onClick={(e) => handleSmoothScroll(e, "team")}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Meet Founders
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  onClick={(e) => handleSmoothScroll(e, "projects")}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Worked Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div>
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-4">
              LEGAL & SOCIAL
            </h4>
            <ul className="space-y-2 text-xs font-mono mb-4">
              <li>
                <Link
                  href="/terms"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/the-intelliverse/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-gray-400 hover:text-white text-base transition-colors duration-200"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.instagram.com/the_intelliverse/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-gray-400 hover:text-white text-base transition-colors duration-200"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="mailto:theintelliverse@gmail.com"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-gray-400 hover:text-white text-base transition-colors duration-200"
                title="Email Us"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} The Intelliverse. All Rights Reserved.
          </p>
          <p className="text-[9px] text-gray-600">
            DESIGNED & ENGINEERED FOR EXCELLENCE
          </p>
        </div>
      </div>
    </footer>
  );
}
