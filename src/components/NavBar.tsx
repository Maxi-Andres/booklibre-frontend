import logo from "../assets/logo.svg"
import userAvatar from "../assets/user-avatar.jpg"
import { Link } from "react-router"

const navigation = [
  { name: "Inicio", href: "/", current: true },
  { name: "Mis Préstamos", href: "/prestamos", current: false },
  { name: "Perfil", href: "/profile", current: false },
]

export default function NavBar() {
  return (
    <nav className="border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src={logo}
                className="h-6 w-6 brightness-99 hue-rotate-177 invert-57 saturate-1468 sepia-10"
              />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Book<span className="font-extra-bold">Libre</span>
              </span>
            </div>

            {/* Nav links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                      item.current
                        ? "text-blue-500"
                        : "text-[#636F80] hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Bibliokarma + Avatar */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 3v18h18" />
                <path d="M20 18v3" />
                <path d="M16 16v5" />
                <path d="M12 13v8" />
                <path d="M8 16v5" />
                <path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" />
              </svg>
              <span className="font-semibold text-[#636F80]">
                Bibliokarma{" "}
                <span className="font-semibold text-[#636F80]">2345</span>
              </span>
            </div>

            {/* Avatar */}
            <Link to={"/profile"}>
              <img
                alt="User avatar"
                src={userAvatar}
                className="size-8 rounded-full object-cover ring-2 ring-gray-100"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
