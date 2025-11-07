"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState<string>("Home");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll effect for background blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (title: string) => {
    setActive(title);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "#", dropdown: true },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Hiring of Catering Equipment",
    "Short Term Waiters / Waitress & Hostess",
    "Corporate Services",
    "Catering & Hospitality Services",
    "Repairing Catering Equipment",
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-200/40 backdrop-blur-lg shadow-sm border-b border-white/30"
          : "bg-gray-200"
      }`}
      style={{
        backgroundImage: isScrolled
          ? "linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.3))"
          : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 font-['Figtree']">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#001f3f]">Hiro Catering</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 relative font-medium text-[#001f3f] transition-colors duration-200 ${
                    active === "Services" ? "text-[#5cc3ff]" : ""
                  } group`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 mt-[2px] transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#5cc3ff] transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute left-0 mt-3 w-64 bg-white shadow-lg rounded-md transition-all duration-300 ease-in-out border border-gray-100 ${
                    dropdownOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  {services.map((service) => (
                    <Link
                      key={service}
                      href="#"
                      onClick={() => handleLinkClick("Services")}
                      className="block px-4 py-2 text-sm text-[#001f3f] hover:bg-gray-100 rounded-md"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => handleLinkClick(item.name)}
                className={`relative font-medium transition-colors duration-200 text-[#001f3f] group ${
                  active === item.name ? "text-[#5cc3ff]" : ""
                }`}
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#5cc3ff] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Right Button */}
        <div className="hidden md:block">
          <button className="bg-[#001f3f] text-white px-5 py-2 rounded-md hover:bg-[#005f99] transition-all">
            Get Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-[#001f3f]">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path === "#" ? "/" : item.path}
              onClick={() => handleLinkClick(item.name)}
              className="block text-[#001f3f] font-medium hover:text-[#005f99]"
            >
              {item.name}
            </Link>
          ))}
          <button className="bg-[#001f3f] text-white px-5 py-2 rounded-md mt-3 w-full">
            Get Quote
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
