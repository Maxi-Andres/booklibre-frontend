export interface FilterValues {
  filter: string,
  orderBy: string
}

export interface ProfilePagination {
  page: number,
  hasMore: boolean,
  init: boolean,
  fetchAnotherPage: () => {}
  filteredBooksLength: number
}

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function PaginationButtons( {page, hasMore, fetchAnotherPage, filteredBooksLength}: ProfilePagination ) {
  const hoverIfMore = hasMore == true ? "hover:cursor-pointer" : ""
  
  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-300">
          Showing <span className="font-medium">4</span> of{' '}<span className="font-medium">{filteredBooksLength}</span> results
        </p>
        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md">
          <button
            className="hover:cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
          >
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </button>
          <p className="relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            {page}
          </p>
          <button
            disabled={hasMore}
            className={`${hoverIfMore} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0`}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </button>
        </nav>
      </div>
    </div>
  )
}
