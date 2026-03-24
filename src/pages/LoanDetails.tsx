import { useState, useEffect } from "react"
import { Link } from "react-router"
import { IconSearch, IconBook } from "@tabler/icons-react"
import { reserveService } from "@/services/reserveService"
import { useOnInit } from "@/hooks/UseOnInit"
import { showToast } from "@/utils/toast"
import { mapReservation, type ReservationDTO } from "@/types/reservationType"

import BookCard from "@/components/BookCard"
import { getId } from "@/context/AuthContext"

//! hace TESTS
//! arregla lo de los bibliokarmas

export default function LoanDetails() {
  const [activeTab, setActiveTab] = useState<
    "prestados-a-mi" | "prestados-por-mi"
  >("prestados-a-mi")
  const [search, setSearch] = useState("")
  // cuando esto cambia se vuelve a renderizar el componente y se vuelve a llamar
  const [reserves, setReserves] = useState<ReservationDTO[]>([])
  const [activePage, setActivePage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState(1)

  const pageSizeLoanBooks = 4
  const id = getId()

  const handleSearch = () => {
    if (activeTab == "prestados-a-mi") {
      getReservesByUserId()
    } else {
      getLoansMadeByUserId()
    }
  }

  const getReservesByUserId = async () => {
    if (!id) return
    try {
      const backResponse = await reserveService.getReservesByUserId(
        id, // le prometo que no es null
        search,
        activePage,
        pageSizeLoanBooks,
      )
      const reservesByUser = backResponse.items.map(mapReservation)
      setReserves(reservesByUser)
      setTotalPages(backResponse.totalPages)
    } catch (error) {
      showToast.httpError(error, "Error al cargar las reservas")
      console.error(error)
    }
  }

  const getLoansMadeByUserId = async () => {
    if (!id) return
    try {
      const backResponse = await reserveService.getLoansMadeByUserId(
        id, // le prometo que no es null
        search,
        activePage,
        pageSizeLoanBooks,
      )
      const reservesByUser = backResponse.items.map(mapReservation)
      setReserves(reservesByUser)
      setTotalPages(backResponse.totalPages)
    } catch (error) {
      showToast.httpError(error, "Error al cargar las reservas")
    }
  }

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage])

  useOnInit(() => handleSearch()) // la primera busqueda es vacia

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
                  getReservesByUserId()
                } else {
                  getLoansMadeByUserId()
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
          <button onClick={handleSearch} className="group">
            <IconSearch
              size={18}
              className="cursor-pointer text-gray-400 transition-all duration-300 group-hover:scale-115 group-hover:text-blue-500"
            />
          </button>

          <input
            type="text"
            placeholder="Buscar por título, autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* =================== Cards =================== */}
        <div className="mt-6 grid min-h-[465px] grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {reserves.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              activeTab={activeTab}
              onRated={() => handleSearch()}
            />
          ))}
        </div>

        {/* =================== Pagination =================== */}
        {/* no te tiene que dejas tocar ni los bordes ni el que esta seleccionado */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          <button
            onClick={() => setActivePage((prev) => prev - 1)}
            disabled={activePage === 0}
            className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 text-sm font-bold text-gray-400 transition-all duration-150 ease-out hover:scale-[1.09] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 hover:shadow-xl hover:shadow-gray-300/60 disabled:pointer-events-none disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className={`h-9 w-9 cursor-pointer rounded-lg text-sm transition-all duration-150 ease-out hover:scale-[1.09] hover:shadow-xl hover:shadow-gray-300/60 ${
                activePage === i
                  ? "bg-blue-500 font-bold text-white shadow-sm shadow-blue-200"
                  : "border border-gray-200 font-semibold text-gray-400 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setActivePage((prev) => prev + 1)}
            disabled={activePage === totalPages - 1}
            className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 text-sm font-bold text-gray-400 transition-all duration-150 ease-out hover:scale-[1.09] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 hover:shadow-xl hover:shadow-gray-300/60 disabled:pointer-events-none disabled:opacity-40"
          >
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
