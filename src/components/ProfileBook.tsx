import { DotIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { formatDate } from "@/utils/formatDate"
import { bookService } from "@/services/bookService"
import { showToast } from "@/utils/toast"

export const statusStyles: Record<string, string> = {
  ACTIVE: "bg-orange-400 text-white",
  AVAILABLE: "bg-green-500 text-white",
  RESERVED: "bg-green-500 text-white",
  BORROWED: "bg-orange-400 text-white",
  SOON_TO_END: "bg-orange-400 text-white",
  RETURNED: "bg-green-500 text-white",
}

export const statusLabels: Record<string, string> = {
  ACTIVE: "Prestado",
  AVAILABLE: "Disponible",
  BORROWED: "Prestado",
  RESERVED: "Disponible",
  SOON_TO_END: "Prestado",
  RETURNED: "Disponible",
}

export default function ProfileBook({
  bookImg,
  bookName,
  bookAuthor,
  bookGender,
  bookState,
  additionDate,
  bookId,
  onDelete,
}: {
  bookImg: string
  bookName: string
  bookAuthor: string
  bookGender: string
  bookState: string
  additionDate: Date
  bookId: Number
  onDelete: () => void
}) {
  const navigate = useNavigate()

  //A PESAR DE QUE LOS ELIMINA, FALTA VER SI PONER UN USE EFFECT O UN STATE DE MODIFICACION PARA RE RENDERIZAR Y QUE YA NO APAREZCA EN LA LISTA
  const handleDelete = async () => {

    console.log(bookState)
    console.log(JSON.stringify(bookState)) // muestra caracteres ocultos
console.log(bookState === 'RETURNED')  // debería ser true
      if (bookState === 'SOON_TO_END' || bookState === 'BORROWED' || bookState === 'ACTIVE') {
        showToast.error("No es posible eliminar un libro que esta prestado")}
        else {
          try { 
              await bookService.deleteBook(Number(bookId))
              showToast.success("Libro eliminado con éxito")
              onDelete()
            }
            catch (error: any) {
            const data = error.response?.data
            const message = data?.detail || "No se pudo eliminar el libro"
            showToast.error(message)
          }  
  }}

  return (
    <div className="flex h-25 items-center justify-center gap-4 pl-2 pr-2">
      <img src={bookImg} alt="" className="h-23 w-15 rounded-lg" />
      <div className="min-w-0 flex-1 max-w-65">
        <p className="truncate">{bookName}</p>
        <p className="truncate">{bookAuthor}</p>
        <p className="truncate">{bookGender}</p>
      </div>
      <div className="w-28">
        <span
          className={`flex rounded-full pr-1 font-semibold ${statusStyles[bookState]}`}
        >
          {<DotIcon size={20}/>}
          {statusLabels[bookState] ?? bookState}
        </span>
      </div>
      <div className="w-24 text-sm text-gray-400">
        {formatDate(additionDate)}
      </div>
      <div className="w-14">
        <button className="text-gray-500 hover:cursor-pointer hover:text-gray-900">
          <PencilIcon
            size={24}
            onClick={() => navigate(`/editar-libro/${bookId}`)}
          />
        </button>
        <button className="text-gray-500 hover:cursor-pointer hover:text-red-500">
          <TrashIcon size={24} onClick={() => handleDelete()} />
        </button>
      </div>

    </div>
  )
}
