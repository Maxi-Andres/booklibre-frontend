import logo from "../assets/logo.svg"
import userAvatar from "../assets/user-avatar.jpg"
import { Link, useLocation } from "react-router"
import type { LogProps } from "@/types/authState";


const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Mis Préstamos", href: "/prestamos-de-libros" },
  { name: "Perfil", href: "/perfil" },
];

export default function NavBar({ onLog }: LogProps) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
  onLog(null)
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-6 w-6" alt="Logo" />
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Book<span className="font-extra-bold">Libre</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                  isActive(item.href)
                    ? "text-blue-500"
                    : "text-[#636F80] hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Bibliokarma */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="font-semibold text-[#636F80]">
                Bibliokarma <span className="font-semibold">2345</span>
              </span>
            </div>

            {/* Avatar */}
            <img
              alt="User avatar"
              src={userAvatar}
              className="size-8 rounded-full object-cover ring-2 ring-gray-100"
            />

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}