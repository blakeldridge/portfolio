import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/projects" },
    { name: "Gymnastics", to: "/gymnastics" },
    { name: "Resume", to: "/resume" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-[90vw] sm:w-1/2 rounded-xl shadow-md bottom-4 z-50 bg-[rgba(255,255,255,0.5)] backdrop-blur-sm fixed left-1/2 transform -translate-x-1/2 flex items-center justify-between px-8 py-8 sm:py-4 transition-all duration-300 ease-in-out`}
    >
      {/* Left: Icon / Logo */}
      <div className="flex items-center gap-2 sm:flex hidden">
        <span
          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
          className="font-semibold text-xl"
        >
          BE
        </span>
      </div>

      {/* Center: Nav Links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-10 justify-center items-center">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `relative font-medium transition-all duration-300 text-gray-600 ${
                isActive ? "scale-110" : "hover:text-blue-500"
              }`
            }
          >
            {({ isActive }) => (
              <div className="flex items-center justify-center relative">
                {isActive && <span className="text-blue-500 absolute -left-3">&#123;</span>}
                <span className={`${isActive ? "text-gray-700" : "text-gray-600 hover:text-blue-700"}`}>
                  {link.name}
                </span>
                {isActive && <span className="text-blue-500 absolute -right-3">&#125;</span>}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* Right: Contact Button */}
      <div className="bg-blue-500 text-white items-center px-4 py-2 rounded-lg hover:bg-blue-600 sm:flex hidden">
        <NavLink key="/contact" to="/contact" end>
          Contact Me
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
