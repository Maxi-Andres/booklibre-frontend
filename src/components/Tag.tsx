import { type ReactNode } from "react"
import { DotIcon } from "@phosphor-icons/react"

export default function Tag({ text }: { text: ReactNode }) {
  const bg_color =
    text == "Disponible"
      ? "bg-green-300 text-white"
      : text == "Prestado"
        ? "bg-orange-300 text-white"
        : "bg-gray-200 hover:cursor-pointer hover:bg-gray-300 focus:text-white focus:bg-black"
  return (
    <button
      className={`rounded-full ${bg_color} flex items-center p-2 pr-3 pl-3 text-xs font-bold`}
    >
      {(text === "Disponible" || text === "Prestado") && <DotIcon size={24} />}
      {text}
    </button>
  )
}
