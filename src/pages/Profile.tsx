import ProfileBook from "@/components/ProfileBook"
import Tag from "@/components/Tag"
import { useOnInit } from "@/hooks/UseOnInit"
import { UserProfile } from "@/domain/userProfile"
import { userProfileService } from "@/services/userProfileService"
import { useEffect, useState } from "react"

import {
  PlusCircleIcon,
  UserCircleIcon,
  CalendarBlankIcon,
  MapPinIcon,
  ChartLineIcon,
  ArrowsDownUpIcon,
} from "@phosphor-icons/react"

// import { getErrorMessage } from "@/validation/errorHandler"
import { reserveService } from "@/services/reserveService"
import { ReservationProfileBook } from "@/domain/reservationProfile"
import ProfileSettingsModal from "@/components/ProfileSettingsModal"
import { showToast } from "@/utils/toast"
import PaginationButtons from "@/components/PaginationButtons"
import { useLocation, useNavigate, Link } from "react-router"
import { REST_SERVER_URL } from "@/config/configuration"

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(new UserProfile())
  const [userReadBooksNumber, setUserReadBooksNumber] = useState<number>(0)
  const [userLentBooksNumber, setUserLentBooksNumber] = useState<number>(0)
  const [shownBooks, setShownBooks] = useState<ReservationProfileBook[]>([])
  const [filter, setFilter] = useState<string>("ALL")
  const [sort, setSort] = useState<string>("DATE_DESC")
  const [activePage, setActivePage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalBooksNumber, setTotalBooksNumber] = useState<number>(0)
  const location = useLocation()
  const navigate = useNavigate()

  var pageSize: number = 4

  var disabledCondition: boolean = totalBooksNumber <= 1

  const toggleTitleSort = () => {
    const newSort =
      sort == "ALPHABETICAL_ASC" ? "ALPHABETICAL_DESC" : "ALPHABETICAL_ASC"
    setSort(newSort)
    getUserOwnBooks(filter, newSort, activePage)
  }

  const toggleDateSort = () => {
    const newSort = sort == "DATE_ASC" ? "DATE_DESC" : "DATE_ASC"
    setSort(newSort)
    getUserOwnBooks(filter, newSort, activePage)
  }

  const getUser = async () => {
    try {
      const userProfile = await userProfileService.getProfile()
      setProfile(userProfile)
    } catch (error) {
      showToast.httpError(error, "Error al traer su usuario")
    }
  }

  const getUserOwnBooks = async (
    filterCriteria: string,
    sortCriteria: string,
    page: number,
  ) => {
    setFilter(filterCriteria)
    try {
      const backResponse = await reserveService.getUserOwnBooks(
        filterCriteria,
        sortCriteria,
        page,
        pageSize,
      )
      setShownBooks(backResponse.items.map(ReservationProfileBook.fromJSON))
      setTotalPages(backResponse.totalPages)
      setTotalBooksNumber(backResponse.total)
    } catch (error) {
      showToast.httpError(error, "Error buscar sus libros")
    }
  }

  const getUserReadBooksNumber = async () => {
    try {
      const userReadBooksNumber = await reserveService.getUserReadBooksNumber()
      setUserReadBooksNumber(userReadBooksNumber)
    } catch (error) {
      showToast.httpError(error, "Error al contar sus libros leidos")
    }
  }

  const getUserLentBooksNumber = async () => {
    try {
      const userLentBooksNumber = await reserveService.getUserLentBooksNumber()
      setUserLentBooksNumber(userLentBooksNumber)
    } catch (error) {
      showToast.httpError(error, "Error al contar sus libros prestados")
    }
  }

  const handleProfileLoad = async (filter: string, sortBy: string) => {
    getUser()
    getUserOwnBooks(filter, sortBy, 0)
    getUserReadBooksNumber()
    getUserLentBooksNumber()
  }

  useEffect(() => {
    if (location.state?.refreshBooks) {
      handleProfileLoad(filter, sort)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state])

  useOnInit(() => handleProfileLoad(filter, sort))

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 pt-12">
      <section className="flex w-245 flex-col gap-7">
        <section className="col-span-3 flex h-42 items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <img
            src={
              profile.img
                ? `${REST_SERVER_URL}/${profile.img}`
                : "/assets/default-img.png"
            }
            alt="Profile Image"
            className="h-26 w-26 rounded-full object-cover"
          />
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-3xl font-bold">{profile.name}</p>
            <p className="text-blue-400">{profile.description}</p>
            <div className="flex gap-1 text-sm text-gray-400">
              <p>
                <CalendarBlankIcon size={15} className="inline" /> Se unio en
                {" " +
                  (profile.timestamp
                    ? profile.timestamp.slice(6)
                    : new Date().getFullYear())}{" "}
                ·
              </p>
              <p>
                <MapPinIcon size={15} className="inline" />{" "}
                {profile.location + " "}·
              </p>
              <p>
                <ChartLineIcon size={15} className="inline" /> Bibliokarmas
                {" " + profile.bibliokarmas}
              </p>
            </div>
          </div>
          <ProfileSettingsModal
            profile={profile}
            onProfileUpdated={setProfile}
          />
        </section>

        <section className="flex gap-7">
          <div className="flex w-2/7 flex-col gap-14">
            <section className="flex h-74 flex-col gap-6 rounded-xl border border-gray-200 bg-white p-5">
              <article className="flex items-center gap-1">
                <UserCircleIcon size={25} />
                <p className="text-xl font-bold">Mis Datos</p>
              </article>
              <article className="border-b-2 border-gray-300 pb-2">
                <p className="text-xs font-bold text-gray-500">EMAIL</p>
                <p className="truncate" title={profile.email}>
                  {profile.email}
                </p>
              </article>
              <article className="border-b-2 border-gray-300 pb-2">
                <p className="text-xs font-bold text-gray-500">TELÉFONO</p>
                <p>
                  {profile.cel
                    ? "+54" +
                      " (" +
                      profile.cel.slice(0, 2) +
                      ") " +
                      profile.cel.slice(3)
                    : "Aun no registrado"}
                </p>
              </article>
              <article>
                <p className="text-xs font-bold text-gray-500">
                  TIPO DE PERFIL
                </p>
                <p>{profile.userType}</p>
              </article>
            </section>

            <section className="flex h-42 items-center justify-center gap-4 rounded-xl border border-gray-200 bg-red-100 p-5">
              <article className="flex w-28 flex-col items-center gap-1 rounded-xl bg-gray-50 p-2">
                <p className="text-xl font-extrabold text-gray-800">
                  {userLentBooksNumber}
                </p>
                <p className="text-center text-sm text-gray-500">
                  Libros Prestados
                </p>
              </article>

              <article className="flex h-22 w-28 flex-col items-center justify-center gap-1 rounded-xl bg-gray-50 p-2">
                <p className="text-xl font-extrabold text-gray-800">
                  {userReadBooksNumber}
                </p>
                <p className="text-center text-sm text-gray-500">
                  Libros Leídos
                </p>
              </article>
            </section>
          </div>

          <div className="flex flex-1 flex-col">
            <section className="mb-4 flex justify-between">
              <p className="text-2xl font-bold">Gestión de Mis Libros</p>
              <Link
                to="/crear-libro"
                className="cursor-pointer rounded-lg bg-red-300 p-1.5 text-sm hover:bg-red-400"
              >
                <PlusCircleIcon size={20} className="mr-1 inline" />
                <p className="inline font-bold">Agregar Nuevo Libro</p>
              </Link>
            </section>

            <section className="flex h-102 flex-1 flex-col gap-1 rounded-xl border border-gray-200 bg-white">
              <section className="flex gap-2 p-4">
                <Tag
                  filterKind="ALL"
                  filter={filter}
                  text="Todos"
                  buttonOnClickFunction={() => {
                    setActivePage(0)
                    getUserOwnBooks("ALL", sort, 0)
                  }}
                ></Tag>
                <Tag
                  filterKind="AVAILABLE"
                  filter={filter}
                  text="Disponibles"
                  buttonOnClickFunction={() => {
                    setActivePage(0)
                    getUserOwnBooks("AVAILABLE", sort, 0)
                  }}
                ></Tag>
                <Tag
                  filterKind="BORROWED"
                  filter={filter}
                  text="Prestados"
                  buttonOnClickFunction={() => {
                    setActivePage(0)
                    getUserOwnBooks("BORROWED", sort, 0)
                  }}
                ></Tag>
              </section>
              <section className="flex items-center gap-4 pr-2 pl-2 text-sm text-gray-500">
                <div className="flex flex-1 items-center justify-between">
                  <p>Titulo y Autor</p>
                  <button
                    className={disabledCondition ? "" : "hover:cursor-pointer"}
                    disabled={disabledCondition}
                  >
                    <ArrowsDownUpIcon
                      size={15}
                      onClick={() => {
                        toggleTitleSort()
                      }}
                    />
                  </button>
                </div>
                <div className="flex w-28 items-center justify-center">
                  <p>Disponibilidad</p>
                </div>
                <div className="flex w-24 items-center justify-center">
                  <p>Agregado</p>
                  <button
                    className={disabledCondition ? "" : "hover:cursor-pointer"}
                    disabled={disabledCondition}
                  >
                    <ArrowsDownUpIcon
                      size={15}
                      onClick={() => {
                        toggleDateSort()
                      }}
                    />
                  </button>
                </div>
                <p className="w-16 text-center">Acciones</p>
              </section>
              <div>
                <section className="pr-1">
                  {shownBooks.map((reserve) => (
                    <ProfileBook
                      key={reserve.book.id}
                      bookId={reserve.book.id}
                      bookImg={reserve.book.imageSrc}
                      bookAuthor={reserve.book.authorName}
                      bookGender={reserve.book.gender}
                      bookName={reserve.book.title}
                      bookState={reserve.state}
                      additionDate={reserve.book.timestamp}
                      onDelete={() => getUserOwnBooks(filter, sort, activePage)}
                    />
                  ))}
                </section>
                <PaginationButtons
                  page={activePage}
                  listSize={shownBooks.length}
                  totalPages={totalPages}
                  onPageChange={(newPage) => {
                    setActivePage(newPage)
                    getUserOwnBooks(filter, sort, newPage)
                  }}
                  filteredBooksLength={totalBooksNumber}
                />
              </div>
            </section>
          </div>
        </section>
      </section>
    </div>
  )
}
