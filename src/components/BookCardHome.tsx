import type { Book } from "@/model/book"
import type { BookFilters } from "@/types/bookFilters"
import { useNavigate } from 'react-router'


const BookCardHome = ({book, filters} : {book : Book, filters: BookFilters}) => {
  const navigate = useNavigate()
  return (
    <div key={book.id} 
      onClick={() => navigate(`/book-detail/${book.id}`, { 
        state: { pickUpDate: filters.pickUpDate, dropOffDate: filters.dropOffDate } 
      })}
      className="cursor-pointer group grid h-full grid-rows-[1fr_auto] bg-white rounded-2xl border border-gray-200"
    >
    <div className="group grid h-full grid-rows-[1fr_auto] bg-white rounded-2xl border border-gray-200">
      <img
        // alt={book.imageAlt}
        src={book.imageSrc ? book.imageSrc : "https://img.freepik.com/free-psd/blank-white-book-mockup-perfect-book-cover-designs-publishing-projects_191095-80351.jpg?semt=ais_hybrid&w=740&q=80"}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <div className="px-4 py-2 grid grid-rows-[auto_auto]">
        <div className="w-full grid grid-cols-[1fr_auto] justify-between p-2">
          <span className="w-fit px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">{book.gender}</span>
          <span className="w-fit font-bold">{0}</span>
        </div>

        <h3 className="mt-4 text-lg truncate font-bold text-gray-700">{book.title}</h3>
        <h3 className="mt-1 text-md text-gray-700">{book.author.name}</h3>
        <hr className="my-2 border-gray-300"/>

      {/* =========== VER SI SE PUEDE HACER DINAMICAMENTE !! ==== */}
        <div className="grid grid-cols-2 gap-x-6">
          <div className=''>
            <p className="mt-1 text-sm font-medium text-gray-400">ISBN</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{book.ISBN}</p>
          </div>

          <div className=''>
            <p className="mt-1 text-sm font-medium text-gray-400">IDIOMA</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{book.language}</p>
          </div>

          <div className=''>
            <p className="mt-1 text-sm font-medium text-gray-400">TIPO</p>
            <p className="mt-1 w-fit px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">{book.bookType}</p>
          </div>

          <div className=''>
            <p className="mt-1 text-sm font-medium text-gray-400">BIBLIOKARMAS</p>
            <p className="mt-1 text-sm font-medium text-gray-900">+{book.calculateBibliokarmas()}</p>
          </div>

          <div className=''>
            <p className="mt-1 text-sm font-medium text-gray-400">ESTADO</p>
            <p className="mt-1 w-fit px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full whitespace-no-wrap">{book.condition}</p>
          </div>
        </div>

        <hr className="my-2 border-gray-300"/>

        <div className="w-full flex justify-start gap-x-2 items-center">
          {/* AVATAR + USERNAME DE OWNER  */}
          <span className="w-fit px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
            {/* {book.owner.avatar} */}
            {book.owner.name.charAt(0)}
            </span>
          <p className="w-fit font-bold">@{book.owner.name}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default BookCardHome