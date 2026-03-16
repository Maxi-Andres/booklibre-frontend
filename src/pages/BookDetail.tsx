// import { BookReview } from "@/model/review"
import { useLocation, useParams } from 'react-router'
import { bookService } from "@/services/bookService"
import { useOnInit } from "@/hooks/UseOnInit"
import { useState } from "react"
// import { Book } from "@/model/book"
import type { Book } from "@/model/book"
// import DatePicker from "react-datepicker"
// import { Disclosure } from "@headlessui/react"
import { ReservationCard } from '@/components/ReservationDatePicker'

// function StarRating({
//   rating,
//   max = 5,
//   size = "sm",
// }: {
//   rating: number
//   max?: number
//   size?: "sm" | "md"
// }) {
//   const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
//   return (
//     <div className="flex gap-0.5">
//       {Array.from({ length: max }).map((_, i) => (
//         <svg
//           key={i}
//           className={`${starSize} ${i < Math.floor(rating) ? "text-yellow-400" : i < rating ? "text-yellow-300" : "text-gray-300"}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ))}
//     </div>
//   )
// }

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState<Book>()
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const getBook = async () => {
    try {
      const bookResponse = await bookService.getBookDetail(Number(id))
      setBook(bookResponse)
    } catch (error) {
      console.error("Error: ", error)
    } finally {
      setLoading(false)
    }
  }

  useOnInit(() => {
    getBook()
  })

  if (loading) return <div>Cargando...</div>
  if (!book) return <div>Libro no encontrado</div>

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================ Breadcrumb ================ */}
      <div className="px-6 py-3">
        <ol className="flex items-center gap-1 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-gray-700">Explorar</a>
          </li>
          <li>
            <svg
              className="mx-1 inline h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 18 6-6-6-6"
              />
            </svg>
          </li>
          <li className="font-medium text-gray-700">{book!.title}</li>
        </ol>
      </div>

      {/* ================ Top Section ================ */}
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <div className="flex items-start gap-6">
          <div className="flex w-80 shrink-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <img
              src={book!.imageSrc}
              alt={book!.title}
              className="h-78 w-64 rounded-xl object-cover shadow-md"
            />
          </div>

          {/* ================ Book Info ================ */}
          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wide text-blue-600 uppercase">
                {book!.bookType}
              </span>
              <div className="flex items-center gap-1.5">
                {/* <StarRating rating={book.rating} size="md" />
                <span className="text-sm font-semibold text-gray-700">({book.reviews})</span> */}
              </div>
            </div>

            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              {book!.title}
            </h1>

            <div className="mb-5 flex items-center gap-2">
              <span className="text-xs tracking-wide text-gray-400 uppercase">
                Autor
              </span>
              <img
                src={book!.author.avatar}
                alt={book!.author.avatar}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-gray-700">
                {book!.author.name}
              </span>
            </div>

            <h2 className="mb-2 text-base font-bold text-gray-900">Sinopsis</h2>
            {book!.desc}
          </div>
        </div>

        {/* ================ Reservation ================ */}
        <div className="flex items-start gap-6">
        <ReservationCard
          book={book}
          initialPickUpDate={location.state?.pickUpDate}
          initialDropOffDate={location.state?.dropOffDate}
        />

        <div className="flex flex-1 flex-col gap-4">
          <div className="gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-l border-b border-gray-100 font-bold text-gray-900">
              Detalles del Libro
            </h2>
            <div className="grid grid-cols-6 gap-4 py-2">
              <div className="col-start-1 col-end-3">
                <p className="text-xs text-[#A3B0C2] uppercase">Tipo</p>
                <span className="inline-flex items-center gap-1 rounded bg-[#FFFBEB] px-2 py-0.5 text-xs font-medium text-[#C77F44]">
                  {book!.bookType}
                </span>
              </div>
              <div className="col-span-2 col-end-7 text-center">
                <p className="text-xs text-[#A3B0C2] uppercase">
                  Bibliokarmas
                </p>
                <span className="inline-block rounded bg-green-100 px-3 py-0.5 text-sm text-green-700">
                  {book!.calculateBibliokarmas()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-x-6 gap-y-3 py-2">
              <div className="pr-[<3>]">
                <p className="text-xs text-[#A3B0C2] uppercase">Género</p>
                <p className="text-base text-gray-800 lowercase">
                  {book!.gender}
                </p>
              </div>
              <div className="pr-[<3>]">
                <p className="text-xs text-[#A3B0C2] uppercase">Páginas</p>
                <p className="text-base text-gray-800">{book!.numPages}</p>
              </div>
              <div className="pr-[<3>]">
                <p className="text-xs text-[#A3B0C2] uppercase">Idioma</p>
                <p className="text-base text-gray-800">{book!.language}</p>
              </div>
              <div className="pr-[<3>]">
                <p className="text-xs text-[#A3B0C2] uppercase">Editorial</p>
                <p className="text-base text-gray-800">{book!.editorial}</p>
              </div>
              <div className="pr-[<3>]">
                <p className="text-xs text-[#A3B0C2] uppercase">ISBN-13</p>
                <p className="text-base text-gray-800">{book!.ISBN}</p>
              </div>
              <div className="pr-[<3>]">
                <p className="text-xs text-[#A3B0C2] uppercase">Publicado</p>
                <p className="text-base text-gray-800">
                  {book!.publishDate.toLocaleDateString()}
                </p>
              </div>
              <div className="pr-[3]">
                <p className="text-xs text-[#A3B0C2] uppercase">Estado</p>
                <p className="text-base text-green-600">{book!.condition}</p>
              </div>
              <div>
                <p className="text-xs text-[#A3B0C2] uppercase">Ranking</p>
                {/* <p className="text-base text-gray-800">{book.reviews.find(r => r.rate)?.rate}</p> */}
              </div>
            </div>
          </div>

          {/* ================ Community Reviews ================ */}
          <div className="mt-2 gap-2 p-2">
            <div className="flex items-center justify-between">
              <h2 className="text-l border-b border-gray-100 font-bold text-gray-900">
                Reseñas de la Comunidad
              </h2>
              <a
                href="#"
                className="text-sm font-semibold text-blue-500 hover:underline"
              >
                Ver las 124 reseñas →
              </a>
            </div>

            {/* <div className="grid grid-cols-2 gap-6">
              {BookReview.map((review: BookReview, i: number) => (
                <div key={i} className="flex flex-col gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${review.color || "bg-blue-400"} flex items-center justify-center font-bold text-white`}
                    >
                      {review.userName.charAt(0) + review.userName.charAt(1)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {review.userName}
                      </p>
                      <StarRating rating={review.rate} />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 italic">
                    "{review.review}"
                  </p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
