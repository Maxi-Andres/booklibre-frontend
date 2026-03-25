import { DotIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { formatDate } from "@/utils/formatDate"
import { bookService } from "@/services/bookService"
import { showToast } from "@/utils/toast"

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-orange-400 text-white",
  AVAILABLE: "bg-green-500 text-white",
  BORROWED: "bg-orange-400 text-white",
  SOON_TO_END: "bg-orange-400 text-white",
  RETURNED: "bg-green-500 text-white",
}

const statusLabels: Record<string, string> = {
  ACTIVE: "PRESTADO",
  AVAILABLE: "DISPONIBLE",
  BORROWED: "PRESTADO",
  SOON_TO_END: "PRESTADO",
  RETURNED: "DISPONIBLE",
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
  const [showConfirm, setShowConfirm] = useState(false)

  //A PESAR DE QUE LOS ELIMINA, FALTA VER SI PONER UN USE EFFECT O UN STATE DE MODIFICACION PARA RE RENDERIZAR Y QUE YA NO APAREZCA EN LA LISTA
  const handleDelete = async () => {
    try {
      await bookService.deleteBook(Number(bookId))
      showToast.success("Libro eliminado con éxito")
      setShowConfirm(false)
      onDelete()
    } catch (error) {
      showToast.httpError(error, "Error al eliminar el libro")
    }
  }

  return (
    <div className="flex h-25 items-center justify-center gap-4 pl-3">
      <img src={bookImg} alt="" className="h-23 w-16 rounded-lg" />
      <div className="w-3/8">
        <p>{bookName}</p>
        <p>{bookAuthor}</p>
        <p>{bookGender}</p>
      </div>
      <span
        className={`flex rounded-full pr-1 font-semibold ${statusStyles[bookState]}`}
      >
        {<DotIcon size={20}/>}
        {statusLabels[bookState] ?? bookState}
      </span>
      <div className="min-w-20 items-center text-sm text-gray-400">
        {formatDate(additionDate)}
      </div>
      <div>
        <button className="text-gray-500 hover:cursor-pointer hover:text-gray-900">
          <PencilIcon
            size={24}
            onClick={() => navigate(`/editar-libro/${bookId}`)}
          />
        </button>
        <button className="text-gray-500 hover:cursor-pointer hover:text-red-500">
          <TrashIcon size={24} onClick={() => setShowConfirm(true)} />
        </button>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg">
            <p className="font-medium text-gray-800">
              ¿Estás seguro que querés eliminar{" "}
              <span className="font-bold">{bookName}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
