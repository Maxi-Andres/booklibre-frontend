// src/pages/LoanDetails.tsx
import { useState } from "react"
import { Link } from "react-router"

import {
  IconSearch,
  IconUser,
  IconCalendar,
  IconBook,
  IconStar,
} from "@tabler/icons-react"

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 4.8,
    loanedBy: "Juan Pérez",
    range: "01/10/23 - 15/10/23",
    karma: "+240",
    status: "ACTIVO",
    cover: "/assets/img/gatsby.png",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    rating: 4.9,
    loanedBy: "Ana Garcia",
    range: "05/10/23 - 20/10/23",
    karma: "+240",
    status: "PRÓXIMO A VENCER",
    cover: "/assets/img/1984.png",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    rating: 4.7,
    loanedBy: "Carlos Ruiz",
    range: "10/10/23 - 25/10/23",
    karma: "+240",
    status: "ACTIVO",
    cover: "/assets/img/killamock.png",
  },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    rating: 4.5,
    loanedBy: "Elena Beltran",
    range: "12/10/23 - 27/10/23",
    karma: "+240",
    status: "DEVUELTO",
    cover: "/assets/img/catcher.png",
    canRate: true,
  },
]

// Record<tipoDeClave, tipoDeValor>
const statusStyles: Record<string, string> = {
  ACTIVO: "bg-blue-500 text-white",
  "PRÓXIMO A VENCER": "bg-orange-400 text-white",
  DEVUELTO: "bg-red-400 text-white",
}

export default function LoanDetails() {
  const [activeTab, setActiveTab] = useState<
    "prestados-a-mi" | "prestados-por-mi"
  >("prestados-a-mi")

  const [search, setSearch] = useState("")
  // cuando esto cambia se vuelve a renderizar el componente y se vuelve a llamar
  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 font-sans">
      <div className="mx-auto max-w-5xl">
        {/* =================== Header =================== */}
        <h1 className="text-3xl font-bold text-gray-800">
          Préstamos de libros
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Aquí vas a encontrar toda la información sobre el intercambio de
          libros con otros usuarios.
        </p>

        {/* =================== Tabs =================== */}
        <div className="mt-6 flex gap-6 border-b border-gray-200">
          {(["prestados-a-mi", "prestados-por-mi"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-all ${
                activeTab === tab
                  ? "border-b-3 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "prestados-a-mi" ? "Prestados a mí" : "Prestados por mí"}
            </button>
          ))}
        </div>

        {/* =================== Search =================== */}
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <IconSearch size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Buscar por título, autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* =================== Cards =================== */}
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
            >
              {/* =================== Status badge =================== */}
              <span
                className={`absolute top-1 right-2 z-10 rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[book.status]}`}
              >
                {book.status}
              </span>

              {/* =================== Cover =================== */}
              <img
                src={book.cover}
                alt={book.title}
                className="h-68 object-cover transition duration-150 hover:scale-105"
              />

              {/* =================== Info =================== */}
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-start justify-between gap-1">
                  <p className="text-sm leading-tight font-bold text-gray-800">
                    {book.title}
                  </p>
                  <span className="flex items-center gap-1 text-xs font-bold whitespace-nowrap text-gray-500">
                    <IconStar
                      size={12}
                      fill="currentColor"
                      className="text-yellow-500"
                    />
                    {book.rating}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-400">{book.author}</p>

                <div className="border-b border-gray-100"></div>

                <div className="mt-1 space-y-1 text-xs text-gray-500">
                  <p className="flex items-center gap-1">
                    <IconUser size={14} />
                    Prestado por:
                    <span className="font-medium text-gray-700">
                      {book.loanedBy}
                    </span>
                  </p>

                  <p className="flex items-center gap-1">
                    <IconCalendar size={14} />
                    Rango:
                    <span className="font-medium text-gray-700">
                      {book.range}
                    </span>
                  </p>

                  <div className="flex items-center gap-1">
                    <IconBook size={14} className="text-blue-400" />
                    <p className="font-semibold text-blue-400">BIBLOKARMA</p>
                    <p className="font-semibold text-gray-700">{book.karma}</p>
                  </div>
                </div>

                {book.canRate && (
                  <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-50">
                    <IconStar size={12} />
                    Calificar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* =================== Pagination =================== */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50">
            ‹
          </button>
          <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white">
            1
          </button>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50">
            ›
          </button>
        </div>

        {/* =================== Banner =================== */}
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl">
            <IconBook size={26} className="text-blue-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            ¿Quieres leer algo nuevo?
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Explora la biblioteca y solicita libros en préstamo de otros
            lectores de la comunidad.
          </p>
          {/* no se a donde por ahora */}
          <Link
            to="/catalogo"
            className="mt-4 inline-block rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
