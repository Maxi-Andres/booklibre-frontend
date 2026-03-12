

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
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

import { booksMOCK } from '@/mocks/booksMOCK'
import type { Book } from '@/model/book'
import BookCardHome from '@/components/BookCardHome'
import { bookService } from '@/services/bookService'
import { Reservation } from '@/model/reservation'
import { BookGender } from '@/types/bookGender'
import type { BookFilters } from '@/types/bookFilters'
import MultiRangeSlider from '@/components/MultiRangeSlider/MultiRangeSlider'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
// const subCategories = [
//   { name: 'Totes', href: '#' },
//   { name: 'Backpacks', href: '#' },
//   { name: 'Travel Bags', href: '#' },
//   { name: 'Hip Bags', href: '#' },
//   { name: 'Laptop Sleeves', href: '#' },
// ]
const genderFilters = {
    id: 'genero',
    name: 'Genero',
    options: [
      { value: 'SciencieFiction', label: 'Ciencia Ficción', checked: false },
      { value: 'Drama', label: 'Drama', checked: false },
      { value: 'SelfHelp', label: 'Autoayuda', checked: false },
      { value: 'Romance', label: 'Romance', checked: false },
      { value: 'Design', label: 'Diseño', checked: false },
      { value: 'ClassicLiterature', label: 'Literatura Clásica', checked: false },
    ],
  }

const InitialFilters: BookFilters = {
  genders: [], //! debe ser keyof enum BookGender
  numPagesRange: {
    min: 0,
    max: 1500
  },
  //-- necesario una Reserva o solo fechaIni - fechaFin ??
  reservation: new Reservation(/*id*/ 0, /*userID*/ 1, new Date(), new Date()),
  ISBN: "",
  ownersName: ""
}

//! ========== FIJATE EL ANY[] por si trae problemas despues !! ==========
// Esto le pone las clases a las opciones del Select de Ordenar por.
// Si está seleccionado, bold o no
function classNames(...classes : any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  const isInitializedRef = useRef(false)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [filters, setFilters] = useState<BookFilters>(InitialFilters)

  const getFilteredBooks = async (newFilters: BookFilters) => {
    // const availableBooks = await bookService.getAvailableBooks(newFilters)
    const availableBooks = bookService.getFilteredBooks(newFilters)
    
    setFilteredBooks(availableBooks)
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

  const updateNumPagesRange = (
    key: keyof BookFilters["numPagesRange"],
    value: number
  ) => {
    setFilters(prev => ({
      ...prev,
      numPagesRange: {
        ...prev.numPagesRange,
        [key]: value
      }
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
    updateNumPagesRange("min", values.min)
    updateNumPagesRange("max", values.max) 
  };


  if(!isInitializedRef.current) {
    getFilteredBooks(InitialFilters)

    isInitializedRef.current = true
  }

  //* ==== Reloads when filters change ====
  useEffect(() => {
    getFilteredBooks(filters)
  }, [filters])

  return (
    <div className="bg-white">
      <div>
{/* =============== MAIN ================ */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div>
            <h1 className='text-4xl font-bold'>Encuentra tu próxima lectura</h1>
            
          </div>


          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Libros populares</h2>

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

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[1fr_3fr]">

{/* ========== FILTERS ========== */}
              <form className="hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

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
                                  onClick={() => toggleGenderFilter(option.label)}
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
                    onChange={handleRangeChange} trackColor={'#cecece'} rangeColor={'#2790F1'} width={'300px'} />
                </Disclosure>

              </form>

{/* ============ Product grid ============== */}
              <div className="lg:block">
              
                {/* Your content */}

                 {/* <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"> */}
                  <h2 className="sr-only">Products</h2>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {filteredBooks.map((book: Book) => (
                      <BookCardHome book={book} />
                    ))}
                  </div>
                {/* </div> */}
              
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
