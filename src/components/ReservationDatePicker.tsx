// components/ReservationCard.tsx
import { useState } from "react"
import type { Book } from "@/model/book"
import { reserveService } from "@/services/reserveService"
import { showToast } from "@/utils/toast"
import { formatDate } from "@/utils/formatDate"

type Props = {
  book: Book
  initialPickUpDate?: string
  initialDropOffDate?: string
}

export function ReservationCard({ book, initialPickUpDate, initialDropOffDate }: Props) {
  const [pickUpDate, setPickUpDate] = useState(initialPickUpDate ?? "")
  const [dropOffDate, setDropOffDate] = useState(initialDropOffDate ?? "")
  const [showPicker, setShowPicker] = useState(false)

  const calculateDays = () => {
    if (!pickUpDate || !dropOffDate) return 0
    const from = new Date(pickUpDate + "T00:00:00")
    const to = new Date(dropOffDate + "T00:00:00")
    return Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
  }

  const handleConfirmReservation = async () => {
    try {
        await reserveService.createReservation(book.id, pickUpDate, dropOffDate)
        showToast.success("Reserva confirmada!")
    } catch (error) {
        showToast.httpError(error, "Error al reservar")
    }
  }

  return (
    <div className="flex w-80 shrink-0 flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      
      {/* ===== Header ===== */}
      <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
        <span className="text-[#FF8A80]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
            <path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" />
            <path d="M15 19l2 2l4 -4" />
          </svg>
        </span>
        Tu Reserva
      </div>

      {/* ===== Date Picker ===== */}
      <div>
        <p className="mb-1 text-xs tracking-wide text-gray-400 uppercase">Fechas Seleccionadas:</p>
        <div className="relative">
          <div
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2 text-sm text-gray-600 cursor-pointer border border-gray-200"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-calendar-week text-[#FF8A80]"
                >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 2c.183 0 .355 .05 .502 .135l.033 .02c.28 .177 .465 .49 .465 .845v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 .514 -.874l.093 -.046l.066 -.025l.1 -.029l.107 -.019l.12 -.007q .083 0 .161 .013l.122 .029l.04 .012l.06 .023c.328 .135 .568 .44 .61 .806l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16z" />
                <path d="M9.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
                <path d="M13.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
                <path d="M17.02 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
                <path d="M12.02 15a1 1 0 0 1 0 2a1.001 1.001 0 1 1 -.005 -2z" />
                <path d="M9.015 16a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
            </svg>
            <span className="whitespace-nowrap text-s">
              {pickUpDate && dropOffDate
                ? `${formatDate(pickUpDate)} — ${formatDate(dropOffDate)}`
                : "Seleccioná un rango"}
            </span>
          </div>

          {showPicker && (
            <div className="absolute top-full left-0 z-10 mt-1 w-full grid grid-cols-2 gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div>
                <label className="text-xs text-gray-400 uppercase">Desde</label>
                <input
                  type="date"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                  className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase">Hasta</label>
                <input
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== Summary ===== */}
      <div className="flex flex-col gap-3 border-t border-gray-100 pt-3 text-sm">
        <div className="flex justify-between rounded bg-[#F8FAFC] px-3 py-1">
          <span className="text-gray-500">Recogida</span>
          <span className="font-semibold text-gray-800">{formatDate(pickUpDate) || "—"}</span>
        </div>
        <div className="flex justify-between rounded bg-[#F8FAFC] px-3 py-1">
          <span className="text-gray-500">Devolución</span>
          <span className="font-semibold text-gray-800">{formatDate(dropOffDate) || "—"}</span>
        </div>
        <div className="flex justify-between rounded bg-[#F8FAFC] px-3 py-1">
          <span className="text-gray-500">Duración</span>
          <span className="font-semibold text-blue-500">{calculateDays()} días</span>
        </div>
      </div>

      {/* ===== Confirm Button ===== */}
      <button
        onClick={handleConfirmReservation}
        disabled={!pickUpDate || !dropOffDate}
        className="mt-1 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF8A80] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirmar Reserva
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
      </button>

      {/* <p className="text-center text-xs text-gray-400">
        Con la reserva no se encontrará disponible en el rango de fechas
      </p> */}
    </div>
  )
}