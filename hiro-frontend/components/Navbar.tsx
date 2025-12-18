"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [active, setActive] = useState<string>("Home");
  const [activeService, setActiveService] = useState<string>("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userName");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser.split(" ")[0]);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (mobileProfileRef.current && !mobileProfileRef.current.contains(e.target as Node)) {
        setMobileProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleLinkClick = (title: string) => {
    setActive(title);
    setIsOpen(false);
    setMobileServiceOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "#" },
    { name: "Gallery", path: "/gallery" },
    { name: "Get Quote", path: "/get-quote" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Hiring of Catering Equipment", path: "/services/hiring-catering-equipment" },
    { name: "Short Term Waiters / Waitress & Hostess", path: "/services/short-term-waiters" },
    { name: "Corporate Services", path: "/services/corporate-services" },
    { name: "Catering & Hospitality Services", path: "/services/catering-hospitality-services" },
    { name: "Repairing Catering Equipment", path: "/services/repairing-catering-equipment" },
  ];

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActive("Home");
        setActiveService("");
        break;
      case "/about":
        setActive("About");
        setActiveService("");
        break;
      case "/gallery":
        setActive("Gallery");
        setActiveService("");
        break;
      case "/get-quote":
        setActive("Get Quote");
        setActiveService("");
        break;
      case "/contact":
        setActive("Contact");
        setActiveService("");
        break;
      default:
        if (pathname.startsWith("/services")) {
          setActive("Services");
          const matchedService = services.find((s) => pathname.startsWith(s.path));
          setActiveService(matchedService ? matchedService.name : "");
        } else {
          setActive("");
          setActiveService("");
        }
        break;
    }
  }, [pathname]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-200/40 backdrop-blur-lg shadow-sm border-b border-white/30"
          : "bg-gray-200"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 font-['Figtree']">
     {/* Logo */}
<Link href="/" className="flex items-center">
  <img
    src="/logo.png"
    alt="Hiro Catering"
    className="h-14 w-auto object-contain scale-180"
  />
</Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) =>
            item.name === "Services" ? (
              <div key="services" className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 font-medium text-[#001f3f] group ${
                    active === "Services" ? "text-[#5cc3ff]" : ""
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-0 mt-3 w-64 bg-white shadow-lg rounded-md border border-gray-100 transition-all duration-300 ${
                    dropdownOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.path}
                      className={`block px-4 py-2 text-sm text-[#001f3f] hover:bg-gray-100 ${
                        activeService === service.name ? "text-[#5cc3ff]" : ""
                      }`}
                      onClick={() => handleLinkClick("Services")}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => handleLinkClick(item.name)}
                className={`font-medium text-[#001f3f] transition-colors relative group ${
                  active === item.name ? "text-[#5cc3ff]" : ""
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center space-x-6">
          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="px-5 py-2 border border-[#001f3f] text-[#001f3f] rounded-md hover:bg-[#001f3f] hover:text-white transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 bg-[#001f3f] text-white rounded-md hover:bg-[#005f99] transition-all"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="flex items-center space-x-3" ref={profileRef}>
              <span className="text-[#001f3f] font-medium">Welcome, {userName}</span>
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)}>
                  <UserCircleIcon className="w-8 h-8 text-[#001f3f] hover:text-[#005f99] transition" />
                </button>

                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 mt-3 w-36 bg-white shadow-lg rounded-md border border-gray-100 transition-all duration-300 ${
                    profileOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Toggle with Profile */}
        <div className="md:hidden flex items-center gap-3">
          {isLoggedIn && (
            <div className="relative" ref={mobileProfileRef}>
              <button onClick={() => setMobileProfileOpen(!mobileProfileOpen)}>
                <UserCircleIcon className="w-8 h-8 text-[#001f3f] hover:text-[#005f99] transition" />
              </button>
              {mobileProfileOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md border border-gray-100 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-3 space-y-2">
          {navItems.map((item) =>
            item.name === "Services" ? (
              <div key="mobile-services" className="space-y-1">
                <button
                  onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                  className="flex justify-between w-full text-[#001f3f] font-medium px-3 py-2 hover:text-[#005f99]"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileServiceOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileServiceOpen && (
                  <div className="pl-4 space-y-1">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.path}
                        onClick={() => handleLinkClick("Services")}
                        className="block text-[#001f3f] text-sm py-1 hover:text-[#005f99]"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.path === "#" ? "/" : item.path}
                onClick={() => handleLinkClick(item.name)}
                className={`block text-[#001f3f] font-medium hover:text-[#005f99] ${
                  active === item.name ? "text-[#5cc3ff]" : ""
                }`}
              >
                {item.name}
              </Link>
            )
          )}

          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="block bg-white border border-[#001f3f] text-[#001f3f] px-5 py-2 rounded-md mt-3 text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block bg-[#001f3f] text-white px-5 py-2 rounded-md mt-2 text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;