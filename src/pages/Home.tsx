

// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home

'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { IconSearch } from '@tabler/icons-react';
import { Book } from '@/model/book'
import BookCardHome from '@/components/BookCardHome'
import { BookGender } from '@/types/bookGender'
import type { BookFilters } from '@/types/bookFilters'
import MultiRangeSlider from '@/components/MultiRangeSlider/MultiRangeSlider'
import { addDays } from '@/utils/addDays'
import Pagination from '@/components/Pagination'
import { bookService } from '@/services/bookService'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const genderFilters = {
    id: 'genero',
    name: 'Genero',
    options: [
      { value: 'DRAMA', label: 'Drama', checked: false },
      { value: 'SCIENCE_FICTION', label: 'Ciencia Ficción', checked: false },
      { value: 'ROMANCE', label: 'Romance', checked: false },
      { value: 'SELF_HELP', label: 'Autoayuda', checked: false },
      { value: 'DESIGN', label: 'Diseño', checked: false },
      { value: 'CLASSIC_LITERATURE', label: 'Literatura Clásica', checked: false },
    ],
  }

const InitialFilters: BookFilters = {
  title: "",
  genders: [], //! debe ser value de keyof enum BookGender
  pagesRangeMin: 0,
  pagesRangeMax: 1500,
  pickUpDate: new Date().toISOString().split("T")[0],
  dropOffDate: addDays(new Date(), 1).toISOString().split("T")[0], // 1 dia despues
  ISBN: "",
  ownersName: "",
  page: 0,
  pageSize: 6
}

//! ========== FIJATE EL ANY[] por si trae problemas despues !! ==========
// Esto le pone las clases a las opciones del Select de Ordenar por.
// Si está seleccionado, bold o no (active)
function classNames(...classes : any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  const isInitializedRef = useRef(false)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  // const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([])
  const [filters, setFilters] = useState<BookFilters>(InitialFilters)
  const [page, setPage] = useState(0)
  const pageSize = 6
  const [totalPages, setTotalPages] = useState(0)

  const getFilteredBooksPage = async (newFilters: BookFilters) => {
    // Los mapeos ver si hacerlos aca o extraerlos 
    // a alguna funcion que se encargue alguien mas?
    const response = await bookService.getFilteredBooksPage(newFilters)
    // console.log("reservas: ", response)
    const filtered = response.content.map(book => Book.fromJSON(book))
    setFilteredBooks(filtered)
    setTotalPages(response.totalPages)
  }
  

  //* ==== FILTERS UPDATE ====
  const updateSimpleFilter = <K extends keyof BookFilters>(
    key: K,
    value: BookFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleGenderFilter = (gender: BookGender) => {
    setFilters(prev => {
      const alreadySelected = prev.genders.includes(gender)

      return {
        ...prev,
        genders: alreadySelected
          ? prev.genders.filter(g => g !== gender)
          : [...prev.genders, gender]
      }
    })
  }

  //* ==== Range values for MultiRangeSlider ====
  // const [rangeValues, setRangeValues] = useState({ min: 0, max: 1500 })
  const handleRangeChange = (values: { min: number; max: number }) => {
    // setRangeValues(values)
    // update filters
    updateSimpleFilter("pagesRangeMin", values.min)
    updateSimpleFilter("pagesRangeMax", values.max) 
  };


  if(!isInitializedRef.current) {
    getFilteredBooksPage(InitialFilters)

    isInitializedRef.current = true
  }

  //! NOOOOO ==== Reloads when filters change ====
  useEffect(() => {
    getFilteredBooksPage({...filters, page: page})
  }, [page])

  const handleApplyFilters = () => {
    console.log("Applying filters: ", filters)
    getFilteredBooksPage(filters)
    setPage(0)
  }

  return (
    <div className="w-full">
      <div>
{/* =============== MAIN ================ */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h1 id="products-heading" className="sr-only">
              Products
            </h1>

  {/* ========== PRODUCTOS + FILTERS ========== */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[300px_1fr]">
    {/* ========== FILTERS ========== */}
              <form className="hidden lg:flex flex flex-col bg-white p-5 rounded-2xl border border-gray-200 h-max">
                  {/* ========== GENDER FILTERS ========== */}
                  <Disclosure key={genderFilters.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{genderFilters.name.toUpperCase()}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {genderFilters.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${genderFilters.id}-${optionIdx}`}
                                  name={`${genderFilters.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  onClick={() => toggleGenderFilter(option.value as BookGender)}
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${genderFilters.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>

                {/* ========== NUM PAGE RANGE FILTERS ========== */}
                <Disclosure key="numPageRangeFilter" as="div" className="border-b border-gray-200 py-6">
                  <label htmlFor="steps-range" className="block mb-2.5 text-sm font-medium text-heading">RANGO DE PÁGINAS</label>
                  <MultiRangeSlider
                    min={0}
                    max={1500}
                    onChange={handleRangeChange} trackColor={'#cecece'} rangeColor={'#2790F1'} width={'260px'} />
                </Disclosure>

                {/* ========== RESERVATION DATES RANGE FILTERS ========== */}
                <Disclosure key="reservationDatesRangeFilter" as="div" className="border-b border-gray-200 py-6">
                  <label className="block mb-2.5 text-sm font-medium text-heading">RANGO DE FECHAS DE RESERVA</label>
                  <div className='w-full grid grid-cols-2 gap-x-2 justify-center align-items-center'>
                    <input type='date' name="" id="date-from" 
                    className='py-2 px-2 text-sm focus:outline-none bg-gray-100 border border-gray-200 text-gray-500 rounded' 
                    value={filters.pickUpDate}
                    onChange={(e) => updateSimpleFilter("pickUpDate", e.target.value)} />
                    <input type='date' name="" id="date-to" 
                    className='py-2 px-2 text-sm focus:outline-none bg-gray-100 border border-gray-200 text-gray-500 rounded' 
                    value={filters.dropOffDate}
                    onChange={(e) => updateSimpleFilter("dropOffDate", e.target.value)} />
                  </div>
                </Disclosure>

                {/* ========== DETAILS FILTERS ========== */}
                <Disclosure key="detailsFilter" as="div" className="flex flex-col gap-y-4 border-b border-gray-200 py-6">
                  <label className="block mb-2.5 text-sm font-medium text-heading">DETALLES</label>

                  <div className='flex flex-col justify-start align-items-start'>
                    <label htmlFor="isbn" className='text-gray-600'>ISBN</label>
                    <input type='text' name="isbn" id="isbn" placeholder='978-950-xxxx-xx-x'
                    className='py-2 px-4 text-sm bg-gray-100 border border-gray-200 text-gray-600 rounded' 
                    value={filters.ISBN}
                    onChange={(e) => updateSimpleFilter("ISBN", e.target.value)} />
                  </div>

                  <div className='flex flex-col justify-start align-items-start'>
                    <label htmlFor="owner" className='text-gray-600'>Prestado por</label>
                    <input type='text' name="owner" id="owner" placeholder='Usuario...'
                    className='py-2 px-4 text-sm bg-gray-100 border border-gray-200 text-gray-600 rounded' 
                    value={filters.ownersName}
                    onChange={(e) => updateSimpleFilter("ownersName", e.target.value)} />
                  </div>
                </Disclosure>

                {/* ========== APPLY FILTERS ========== */}
                <Disclosure key="applyFiltersBtn" as="div" className="border-b border-gray-200 py-6 flex justify-center">
                  <button type='button' onClick={handleApplyFilters} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Aplicar Filtros
                  </button>
                </Disclosure>

              </form>

    {/* ========== BUSQUEDA + ORDENAR + PRODUCTOS ========== */}
              <div className="lg:block lg:flex flex-col gap-y-4 justify-center items-center">

          {/* ========== BUSQUEDA POR TITULO ========== */}
                <div className='w-full flex flex-col gap-y-2 bg-white p-10 rounded-2xl border border-gray-200'>
                  <h1 className='text-4xl font-bold'>Encuentra tu próxima lectura</h1>
                  <p className='text-gray-400'>Explora miles de libros disponibles para préstamo en nuestra comunidad.</p>

                  <div className='w-full grid grid-cols-3 grid-cols-[min-content_1fr_min-content] gap-x-2 justify-start items-center bg-gray-100 border border-gray-200 rounded-lg px-5 py-2'>
                    <IconSearch stroke={2} className='text-gray-400'/>
                    <input type='text' name="owner" id="owner" placeholder='Buscar por título...'
                    className='py-2 px-4 text-sm bg-gray-100 text-gray-600 rounded focus:outline-none' 
                    value={filters.title}
                    onChange={(e) => updateSimpleFilter("title", e.target.value)} />
                    <button onClick={handleApplyFilters} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                      Buscar
                    </button>
                  </div>
                  
                </div>

          {/* ========== ORDERAR POR ========== */}
                <div className="w-full flex items-baseline justify-between border-b border-gray-200 pt-4 pb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Libros populares</h2>

                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Ordenar por:
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                      </MenuButton>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <MenuItem key={option.name}>
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                                )}
                              >
                                {option.name}
                              </a>
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Menu>

                  </div>
                </div>

          {/* ============ PRODUCT GRID ============== */}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {filteredBooks.map((book: Book) => (
                      <BookCardHome key={book.id} book={book} filters={filters} />
                    ))}
                  </div>
          
          {/* ============ PAGINACION============== */}
                  <div className="flex gap-2 mt-4 justify-center items-center">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                      />
                  </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
