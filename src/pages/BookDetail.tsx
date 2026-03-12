import type { BookReview } from '@/model/bookReview';
import { bookOne } from '../mocks/booksMOCK';

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
  const book = bookOne
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================ Breadcrumb ================ */}
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

      {/* ================ Top Section ================ */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex gap-6 items-start">
          <div className="w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col gap-3">
            <img
              src={book.imageSrc}
              alt={book.title}
              className="w-64 h-78 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* ================ Book Info ================ */}
          <div className="flex-1 flex flex-col">
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

            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Autor</span>
              <img src={book.author.avatar} alt={book.author.avatar} className="w-7 h-7 rounded-full object-cover" />
              <span className="text-sm font-semibold text-gray-700">{book.author.name}</span>
            </div>

            <h2 className="text-base font-bold text-gray-900 mb-2">Sinopsis</h2>
            {book.desc}
          </div>
        </div>

        {/* ================ Reservation ================ */}
        <div className="flex gap-6 items-start">
          <div className="w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <span className="text-[#FF8A80]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M15 19l2 2l4 -4" /></svg></span> Tu Reserva
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 ">Fechas Seleccionadas:</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#F8FAFC] rounded px-3 py-2">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-calendar-week text-[#FF8A80]"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 2c.183 0 .355 .05 .502 .135l.033 .02c.28 .177 .465 .49 .465 .845v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 .514 -.874l.093 -.046l.066 -.025l.1 -.029l.107 -.019l.12 -.007q .083 0 .161 .013l.122 .029l.04 .012l.06 .023c.328 .135 .568 .44 .61 .806l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16z" /><path d="M9.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" /><path d="M13.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" /><path d="M17.02 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" /><path d="M12.02 15a1 1 0 0 1 0 2a1.001 1.001 0 1 1 -.005 -2z" /><path d="M9.015 16a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" /></svg></span>
                {/* <span>{book.reservation?.pickupDate.toLocaleDateString()} - {book.reservation?.returnDate.toLocaleDateString()}</span> */}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-3 text-sm">
              <div className="flex justify-between bg-[#F8FAFC] rounded px-3 py-1">
                <span className="text-gray-500">Recogida</span>
                {/* <span className="font-semibold text-gray-800">{book.reservation?.pickupDate.toLocaleDateString()}</span> */}
              </div>
              <div className="flex justify-between bg-[#F8FAFC] rounded px-3 py-1">
                <span className="text-gray-500">Devolución</span>
                {/* <span className="font-semibold text-gray-800">{book.reservation?.returnDate.toLocaleDateString()}</span> */}
              </div>
              <div className="flex justify-between bg-[#F8FAFC] rounded px-3 py-1">
                <span className="text-gray-500">Duración</span>
                {/* <span className="font-semibold text-blue-500">{book.reservation?.durationInDays} Días</span> */}
              </div>
            </div>
            <button className="mt-1 w-full py-2.5 rounded-xl bg-[#FF8A80] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition">
              Confirmar Reserva <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>
            </button>
            <p className="text-xs text-gray-400 text-center">Con la reserva no se encontrará disponible en el rango de fechas</p>
          </div>

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
                <div className="col-span-2 col-end-7 text-center">
                  <p className="text-xs text-[#A3B0C2] uppercase">Bibliokarmas</p>
                  <span className="inline-block px-3 py-0.5 rounded bg-green-100 text-green-700 text-sm">
                    {book.calculateBibliokarmas()}
                  </span>
                </div>
              </div>

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
                  {/* <p className="text-base text-gray-800">{book.reviews.find(r => r.rate)?.rate}</p> */}
                </div>
              </div>
            </div>

            {/* ================ Community Reviews ================ */}
            <div className="mt-2  gap-2 p-2">
              <div className="flex justify-between items-center">
                <h2 className="text-l font-bold text-gray-900 border-b border-gray-100">Reseñas de la Comunidad</h2>
                <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">Ver las 124 reseñas →</a>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {book.reviews.map((review: BookReview, i: number) => (
                  <div key={i} className="flex flex-col gap-3 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${review.color || 'bg-blue-400'} flex items-center justify-center text-white font-bold`}>
                        {review.userName.charAt(0) + review.userName.charAt(1)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{review.userName}</p>
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