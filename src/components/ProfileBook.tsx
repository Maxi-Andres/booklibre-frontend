import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import Tag from "./Tag";
import { useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "@/utils/formatDate";
import { bookService } from "@/services/bookService"
import { showToast } from "@/utils/toast"

export default function ProfileBook({bookImg, bookName, bookAuthor, bookGender, bookState, additionDate, bookId}: {bookImg: string, bookName: string, bookAuthor: string, bookGender: string, bookState: string, additionDate: Date, bookId:Number}) {
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)

    
//A PESAR DE QUE LOS ELIMINA, FALTA VER SI PONER UN USE EFFECT O UN STATE DE MODIFICACION PARA RE RENDERIZAR Y QUE YA NO APAREZCA EN LA LISTA
  const handleDelete = async () => {
    try {
      await bookService.deleteBook(Number(bookId))
      showToast.success('Libro eliminado con éxito')
      setShowConfirm(false)
    } catch (error) {
      showToast.httpError(error, 'Error al eliminar el libro')
    }
  }

  return (
    <div className="flex h-25 gap-4 justify-center items-center pl-3">
      <img src={bookImg} alt="" className="w-16 h-23 rounded-lg"/>
      <div className="w-3/8">
        <p>{bookName}</p>
        <p>{bookAuthor}</p>
        <p>{bookGender}</p>
      </div>
      <div className="min-w-28">
        <Tag filterKind="" filter="" text={bookState}></Tag>
      </div>
      <div className="text-sm text-gray-400 min-w-20 items-center">
        {formatDate(additionDate)}
      </div>
      <div>
        <button className="hover:cursor-pointer hover:text-gray-900 text-gray-500"><PencilIcon size={24} onClick={() => navigate(`/editar-libro/${bookId}`)}/></button>
        <button className="hover:cursor-pointer hover:text-red-500 text-gray-500"><TrashIcon size={24} onClick={() => setShowConfirm(true)} /></button>
      </div> 
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4">
            <p className="text-gray-800 font-medium">¿Estás seguro que querés eliminar <span className="font-bold">{bookName}</span>?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
                Cancelar
              </button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
