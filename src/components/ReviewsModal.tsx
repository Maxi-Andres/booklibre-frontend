import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { BookReview } from '@/model/review'
import { reserveService } from '@/services/reserveService'
import { showToast } from '@/utils/toast'

type ReviewsModalProps = {
  bookId: number
  bookTitle?: string
  initialReviews?: BookReview[]
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`size-3.5 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

export default function ReviewsModal({ bookId, bookTitle, initialReviews = [] }: ReviewsModalProps) {
  const [open, setOpen] = useState(false)
  const [reviews, setReviews] = useState<BookReview[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadReviews = async (pageToLoad: number) => {
    try {
      const response = await reserveService.getReviews(bookId, pageToLoad, 4)
      // console.log('Respuesta del back:', response.data)
      setReviews(prev => [...prev, ...response.data])
      // esto hace que no me deje seguir haciendo llamadas al back si la última respuesta no trajo 2 reseñas, es decir, si ya no hay más
      setHasMore(response.data.length === 4)
    } catch (error) {
      showToast.httpError(error, 'Error al cargar libro')
    }
  }

  const handleOpen = async () => {
    setOpen(true)
    setReviews(initialReviews)
    if (initialReviews.length < 4) {
      setHasMore(false)
    } else {
      const response = await reserveService.getReviews(bookId, 1, 4)
      setHasMore(response.data.length > 0)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setReviews([])
      setPage(0)
      setHasMore(true)
    }, 300)
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadReviews(nextPage)
  }

  return (
    <>
      <button onClick={handleOpen} className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10">
        Ver todas las reseñas →
      </button>

      <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-closed:sm:translate-y-0 data-closed:sm:scale-95">
              {/* Header */}
              <div className="flex items-center justify-between bg-white px-6 pt-5 pb-4 border-b border-gray-200">
                <div>
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">Reseñas</DialogTitle>
                  {bookTitle && <p className="text-sm text-gray-500 mt-0.5">{bookTitle}</p>}
                </div>
                <button onClick={handleClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <XMarkIcon className="size-5" />
                </button>
              </div>

              {/* Reviews list */}
              <div className="bg-white px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {reviews.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Este libro todavía no tiene reseñas.</p>
                ) : (
                  reviews.map((review, i) => (
                    <div key={`${review.id}-${i}`} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-100">
                      <div className="size-10 shrink-0 rounded-full bg-[#E0E7FF] flex items-center justify-center text-sm font-bold text-[#26A67D]">
                        {review.reviewerName.charAt(0).toUpperCase()}
                        {review.reviewerName.charAt(1)?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-900">{review.reviewerName}</span>
                          <span className="text-xs text-gray-400">{review.timestamp}</span>
                        </div>
                        <StarRating rating={review.rating} />
                        <p className="mt-1.5 text-sm text-gray-600 leading-relaxed italic">"{review.review}"</p>
                      </div>
                    </div>
                  ))
                )}

                {hasMore && (
                  <button
                    onClick={loadMore}
                    className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-950/5 text-sm font-semibold text-gray-800 hover:bg-gray-950/10"
                  >
                    Ver más reseñas ↓
                  </button>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <span className="text-xs text-gray-600">
                  Mostrando {reviews.length} reseñas
                </span>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}