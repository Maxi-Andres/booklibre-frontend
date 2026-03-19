import { useState } from "react"
import { Link } from "react-router"
import { IconSearch, IconBook } from "@tabler/icons-react"
import { reserveService } from "@/services/reserveService"
import { useOnInit } from "@/hooks/UseOnInit"
import { showToast } from "@/utils/toast"
import type { ReservationDTO } from "@/types/reservationType"

import BookCard from "@/components/BookCard"

//! fijate si se busca con debouncing o con enter
//! fijate como vas a filtrar despeus igual te tienen que mostrar como implementar cache
//! fijate lo de activo, perstado, vence pronto, todo eso como implelmentarlo
//! hace DTOs en el back bobo
//! fijate porque pone cualquier fecha me parece
//! cuando se califica se vuelve a llamar al back lo que esta mal

export default function LoanDetails() {
  const [activeTab, setActiveTab] = useState<
    "prestados-a-mi" | "prestados-por-mi"
  >("prestados-a-mi")
  const [search, setSearch] = useState("")
  // cuando esto cambia se vuelve a renderizar el componente y se vuelve a llamar
  const [reserves, setReserves] = useState<ReservationDTO[]>([])

  const handleStateChange = (newSearch: string) => {
    setSearch(newSearch)
    if (activeTab == "prestados-a-mi") {
      getReservesByUserId(newSearch)
    } else {
      getLoansMadeByUserId(newSearch)
    }
  }

  const getReservesByUserId = async (newSearch: string) => {
    setSearch(newSearch)
    if (!localStorage.getItem("id")!) return
    try {
      const reservesByUser = await reserveService.getReservesByUserId(
        localStorage.getItem("id")!, // le prometo que no es null
        newSearch,
      )
      setReserves(reservesByUser)
    } catch (error) {
      showToast.httpError(error, "Error al cargar las reservas")
    }
  }

  const getLoansMadeByUserId = async (newSearch: string) => {
    setSearch(newSearch)
    if (!localStorage.getItem("id")!) return
    try {
      const reservesByUser = await reserveService.getLoansMadeByUserId(
        localStorage.getItem("id")!, // le prometo que no es null
        newSearch,
      )
      setReserves(reservesByUser)
    } catch (error) {
      showToast.httpError(error, "Error al cargar las reservas")
    }
  }

  useOnInit(() => handleStateChange(search)) // la primera busqueda es vacia

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
              onClick={() => {
                setActiveTab(tab)
                if (tab === "prestados-a-mi") {
                  getReservesByUserId(search)
                } else {
                  getLoansMadeByUserId(search)
                }
              }}
              className={`pb-2 text-sm font-medium transition-all hover:cursor-pointer ${
                activeTab === tab
                  ? "border-b-3 border-blue-500 text-blue-500"
                  : "border-b-3 text-gray-500 hover:text-gray-700"
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
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* =================== Cards =================== */}
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {reserves.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onRated={() => handleStateChange(search)}
            />
          ))}
        </div>

        {/* =================== Pagination =================== */}
        {/* no te tiene que dejas tocar ni los bordes ni el que esta seleccionado */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          <button className="h-8 w-8 rounded-lg border border-gray-200 text-sm text-gray-400 transition-all duration-150 ease-out hover:scale-[1.08] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 hover:shadow-xl hover:shadow-gray-300/60">
            ‹
          </button>
          <button className="h-8 w-8 rounded-lg bg-blue-500 text-sm font-semibold text-white shadow-sm shadow-blue-200">
            1
          </button>
          <button className="h-8 w-8 rounded-lg border border-gray-200 text-sm text-gray-400 transition-all duration-150 ease-out hover:scale-[1.08] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 hover:shadow-xl hover:shadow-gray-300/60">
            2
          </button>
          <button className="h-8 w-8 rounded-lg border border-gray-200 text-sm text-gray-400 transition-all duration-150 ease-out hover:scale-[1.08] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 hover:shadow-xl hover:shadow-gray-300/60">
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
          {/* creo que va a home */}
          <Link
            to="/"
            className="mt-4 inline-block rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-150 ease-out hover:scale-[1.08] hover:bg-blue-600"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
