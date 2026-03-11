import { mockBook} from '../mock/books';

function StarRating({ rating, max = 5, size = "sm" }: { rating: number; max?: number; size?: "sm" | "md" }) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} className={`${starSize} ${i < Math.floor(rating) ? "text-yellow-400" : i < rating ? "text-yellow-300" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BookDetail() {
  const book = mockBook
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <div className="px-6 py-3">
        <ol className="flex items-center text-sm text-gray-500 gap-1">
          <li>
            <a href="./" className="hover:text-gray-700">Explorar</a>
          </li>
          <li>
            <svg className="w-4 h-4 mx-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="text-gray-700 font-medium">{book.title}</li>
        </ol>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Top section */}
        <div className="flex gap-6 items-start">
          {/* Book Cover */}
          <div className="w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col gap-3">
            <img
              src={book.img}
              alt={book.title}
              className="w-64 h-78 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Book Info */}
          <div className="flex-1 flex flex-col">
            {/* bookType + Rating */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                {book.bookType}
              </span>
              <div className="flex items-center gap-1.5">
                {/* <StarRating rating={book.rating} size="md" />
                <span className="text-sm font-semibold text-gray-700">({book.reviews})</span> */}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>

            {/* Author */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Autor</span>
              <img src={book.author.avatar} alt={book.author.avatar} className="w-7 h-7 rounded-full object-cover" />
              <span className="text-sm font-semibold text-gray-700">{book.author.name}</span>
            </div>

            {/* Synopsis */}
            <h2 className="text-base font-bold text-gray-900 mb-2">Sinopsis</h2>
              {book.desc}
          </div>
        </div>

        {/* Bottom grid: Reservation + Details */}
        <div className="flex gap-6 items-start">
          {/* Reservation Card */}
          <div className="w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <span className="text-red-400">📅</span> Tu Reserva
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 ">Fechas Seleccionadas:</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#F8FAFC] rounded px-3 py-2">
                <span>📅</span>
                <span>{book.reservation?.pickupDate.toLocaleDateString()} - {book.reservation?.returnDate.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between bg-[#F8FAFC] rounded px-3 py-1">
                <span className="text-gray-500">Recogida</span>
                <span className="font-semibold text-gray-800">{book.reservation?.pickupDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between bg-[#F8FAFC] rounded px-3 py-1">
                <span className="text-gray-500">Devolución</span>
                <span className="font-semibold text-gray-800">{book.reservation?.returnDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between bg-[#F8FAFC] rounded px-3 py-1">
                <span className="text-gray-500">Duración</span>
                <span className="font-semibold text-blue-500">{book.reservation?.durationInDays} Días</span>
              </div>
            </div>
            <button className="mt-1 w-full py-2.5 rounded-xl bg-[#FF8A80] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition">
              Confirmar Reserva ✓
            </button>
            <p className="text-xs text-gray-400 text-center">Con la reserva no se encontrará disponible en el rango de fechas</p>
          </div>

          {/* Row 1: Tipo (izquierda) y Bibliokarmas (derecha) */}
        <div className="flex-1 flex flex-col gap-4">
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 gap-6 p-6'>
            <h2 className="text-l font-bold text-gray-900 border-b border-gray-100">Detalles del Libro</h2>
              <div className="grid grid-cols-6 gap-4 py-2">
                <div className="col-start-1 col-end-3">
                  <p className="text-xs text-[#A3B0C2] uppercase">Tipo</p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFFBEB] text-[#C77F44] text-xs font-medium">
                    {book.bookType}
                  </span>
                </div>
                {/* col-start-4 lo empuja a la última columna */}
                <div className="col-span-2 col-end-7 text-center">
                  <p className="text-xs text-[#A3B0C2] uppercase">Bibliokarmas</p>
                  <span className="inline-block px-3 py-0.5 rounded bg-green-100 text-green-700 text-sm">
                    {book.calculateBibliokarmas()}
                  </span>
                </div>
              </div>

            {/* Filas 2 y 3: 4 columnas iguales */}
            <div className="grid grid-cols-4 gap-x-6 gap-y-3 py-2">
              <div className='pr-[<3>]'>
                <p className="text-xs text-[#A3B0C2] uppercase">Género</p>
                <p className="text-base text-gray-800 lowercase">{book.gender}</p>
              </div>
              <div className='pr-[<3>]'>
                <p className="text-xs text-[#A3B0C2] uppercase">Páginas</p>
                <p className="text-base text-gray-800">{book.pages}</p>
              </div>
              <div className='pr-[<3>]'>
                <p className="text-xs text-[#A3B0C2] uppercase">Idioma</p>
                <p className="text-base text-gray-800">{book.language}</p>
              </div>
              <div className='pr-[<3>]'>
                <p className="text-xs text-[#A3B0C2] uppercase">Editorial</p>
                <p className="text-base text-gray-800">{book.editorial}</p>
              </div>

              <div className='pr-[<3>]'>
                <p className="text-xs text-[#A3B0C2] uppercase">ISBN-13</p>
                <p className="text-base text-gray-800">{book.ISBN}</p>
              </div>
              <div className='pr-[<3>]'>
                <p className="text-xs text-[#A3B0C2] uppercase">Publicado</p>
                <p className="text-base text-gray-800">{book.publishDate.toLocaleDateString()}</p>
              </div>
              <div className='pr-[3]'>
                <p className="text-xs text-[#A3B0C2] uppercase">Estado</p>
                <p className="text-base text-green-600">{book.condition}</p>
              </div>
              <div>
                <p className="text-xs text-[#A3B0C2] uppercase">Ranking</p>
                <p className="text-base text-gray-800">{book.reviews.find(r => r.rate)?.rate}</p>
              </div>
            </div>
          </div>

            {/* Community Reviews */}
            <div className="mt-2  gap-2 p-2">
              <div className="flex justify-between items-center">
                <h2 className="text-l font-bold text-gray-900 border-b border-gray-100">Reseñas de la Comunidad</h2>
                <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">Ver las 124 reseñas →</a>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {book.reviews.map((review, i) => (
                  <div key={i} className="flex flex-col gap-3 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${review.color || 'bg-blue-400'} flex items-center justify-center text-white font-bold`}>
                        {review.reviewer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{review.reviewer.name}</p>
                        <StarRating rating={review.rate} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic">"{review.review}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}