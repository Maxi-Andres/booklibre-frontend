import { type ReactNode } from "react"
import { DotIcon } from "@phosphor-icons/react"

export default function Tag({ text, buttonOnClickFunction, filterKind, filter }: { text: ReactNode, buttonOnClickFunction?: () => void, filterKind: string, filter: string }) {
  const isStatusBadge = text == "Disponible" || text == "Prestado"

  const statusColor =
    text == "Disponible"
      ? "bg-green-300 text-white"
      : text == "Prestado"
        ? "bg-orange-300 text-white"
        : ""

  const filterColor = 
    filter == filterKind
      ? "bg-black text-white"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200"

  return (
    <button
      key={filterKind}
      className={`rounded-full flex items-center p-2 pr-3 pl-3 text-xs font-bold ${isStatusBadge ? statusColor : filterColor}`}
      onClick={buttonOnClickFunction}
    >
      {isStatusBadge && <DotIcon size={24} />}
      {text}
    </button>
  )
}
