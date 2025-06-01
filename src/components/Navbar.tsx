import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "/images/logo-bumiverse.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    const ok = window.confirm("Yakin ingin keluar?");
    if (!ok) return;

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const mainNavItems = [
    { label: "Beranda", to: "/" },
    { label: "Artikel", to: "/artikel" },
    { label: "Edukasi", to: "/edukasi" },
    { label: "Kategori", to: "/kategori" },
    { label: "Tentang", to: "/tentang" },
    { label: "Logout", to: "/login" },
  ];

  const authNavItems = [
    { label: "Login", to: "/login" },
    { label: "Signup", to: "/register" },
  ];

  const userNavItems = [
    { label: "Profil", to: "/dashboard" },
    { label: "Logout", to: "#", onClick: handleLogout },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-100 via-green-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md border-b border-green-200 dark:border-gray-700 fixed top-0 left-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <span className="text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-tight">
            Bumiverse
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-base font-semibold">
          {(isAuthPage ? authNavItems : mainNavItems).map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `transition-all duration-200 ${
                    isActive
                      ? "text-green-700 dark:text-green-300 border-b-2 border-green-500 pb-1"
                      : "text-gray-700 dark:text-gray-300 hover:text-green-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {!isAuthPage &&
            isLoggedIn &&
            userNavItems.map((item) => (
              <li key={item.label}>
                {item.label === "Logout" ? (
                  <button
                    onClick={item.onClick}
                    className="text-red-500 hover:text-red-600 transition font-semibold"
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `transition-all duration-200 ${
                        isActive
                          ? "text-green-700 dark:text-green-300 border-b-2 border-green-500 pb-1"
                          : "text-gray-700 dark:text-gray-300 hover:text-green-600"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-green-200 dark:border-gray-700 shadow-md transition-all">
          <ul className="flex flex-col space-y-4 text-base font-semibold pt-3">
            {(isAuthPage ? authNavItems : mainNavItems).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block transition-all duration-200 ${
                      isActive
                        ? "text-green-700 dark:text-green-300 font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:text-green-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {!isAuthPage &&
              isLoggedIn &&
              userNavItems.map((item) => (
                <li key={item.label}>
                  {item.label === "Logout" ? (
                    <button
                      onClick={() => {
                        item.onClick();
                        setIsOpen(false);
                      }}
                      className="text-red-500 hover:text-red-600 transition font-semibold w-full text-left"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block transition-all duration-200 ${
                          isActive
                            ? "text-green-700 dark:text-green-300 font-bold"
                            : "text-gray-700 dark:text-gray-300 hover:text-green-600"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
