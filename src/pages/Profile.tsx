import ProfileBook from "@/components/ProfileBook"
import Tag from "@/components/Tag"
import { useOnInit } from "@/hooks/UseOnInit"
import { UserProfile } from "@/model/userProfile"
import { userProfileService } from "@/services/userProfileService"
import { UserKind } from "@/types/userKind"
import type { ValidationMessage } from "@/validation/validationMessage"
import { useState } from "react"

import {
  GearIcon,
  PlusCircleIcon,
  UserCircleIcon,
  CalendarBlankIcon,
  MapPinIcon,
  ChartLineIcon,
  ArrowsDownUpIcon,
} from "@phosphor-icons/react"

// import { getErrorMessage } from "@/validation/errorHandler"
import { reserveService } from "@/services/reserveService"
import type { ReservationProfileBook } from "@/model/reservationProfile"

export default function Profile() {
  // const [errors, setErrors] = useState<ValidationMessage[]>([])
  const [profile, setProfile] = useState<UserProfile>(new UserProfile())
  const [userOwnBooks, setUserOwnBooks] = useState<ReservationProfileBook[]>([])
  const [userReadBooksNumber, setUserReadBooksNumber] = useState<number>(0)
  const [shownBooks, setShownBooks] = useState<ReservationProfileBook[]>([])
  const [filter, setFilter] = useState<string>("Todos")

  // const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {}

  const showAllBooks = () => {
    setFilter("Todos")
    setShownBooks(userOwnBooks)
  }

  const showFilteredBooks = (state: string) => {
    setFilter(state)
    setShownBooks(userOwnBooks.filter((book) => book.state == state))
  }

  const getUser = async () => {
    try {
      const userProfile = await userProfileService.getProfile()
      setProfile(userProfile)
    } catch (error) {
      // const errorMessage = getErrorMessage(error)
      // showToast('Error al traer el usuario. ' + errorMessage, 'error')
    }
  }

  const getUserOwnBooks = async () => {
    try {
      const userOwnBooks = await reserveService.getUserOwnBooks()
      setUserOwnBooks(userOwnBooks)
      setShownBooks(userOwnBooks)

    } catch (error) {
      // const errorMessage = getErrorMessage(error)
      // showToast('Error al traer el usuario. ' + errorMessage, 'error')
    }
  }

  const getUserReadBooksNumber = async () => {
    try {
      const userReadBooksNumber = await reserveService.getUserReadBooksNumber()
      setUserReadBooksNumber(userReadBooksNumber)
    } catch (error) {
      // const errorMessage = getErrorMessage(error)
      // showToast('Error al traer el usuario. ' + errorMessage, 'error')
    }
  }

  const handleProfileLoad = async () => {
    getUser()
    getUserOwnBooks()
    getUserReadBooksNumber()
    showAllBooks()
  }

  useOnInit(() => handleProfileLoad())

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 pt-12">
      <section className="flex w-245 flex-col gap-7">
        <section className="col-span-3 flex h-42 items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <img
            src={`http://localhost:9000/${profile.img}`}
            alt="Profile Image"
            className="h-26 w-26 rounded-full object-cover"
          />
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-3xl font-bold">{profile.name}</p>
            <p className="text-blue-400">{profile.description}</p>
            <div className="flex gap-1 text-sm text-gray-400">
              <p>
                <CalendarBlankIcon size={15} className="inline" /> Se unio en
                {" " + profile.timestamp.slice(6)} ·
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

          <button className="max-w-25 cursor-pointer rounded-lg bg-gray-200 text-sm hover:bg-gray-300">
            <div className="flex flex-row items-center p-2">
              <GearIcon size={20} />
              <p className="font-bold">Editar Perfil</p>
            </div>
          </button>
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
                <p>{profile.email}</p>
              </article>
              <article className="border-b-2 border-gray-300 pb-2">
                <p className="text-xs font-bold text-gray-500">TELÉFONO</p>
                <p>
                  {profile.cel.slice(0, 3) + ' (' + profile.cel.slice(4,6) + ') ' + profile.cel.slice(7)}
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
                <p className="text-xl font-extrabold text-gray-800">{userOwnBooks.filter((book) => book.state == "Prestado").length}</p>
                <p className="text-center text-sm text-gray-500">
                  Libros Prestados
                </p>
              </article>

              <article className="flex h-22 w-28 flex-col items-center justify-center gap-1 rounded-xl bg-gray-50 p-2">
                <p className="text-xl font-extrabold text-gray-800">{userReadBooksNumber}</p>
                <p className="text-center text-sm text-gray-500">
                  Libros Leídos
                </p>
              </article>
            </section>
          </div>

          <div className="flex flex-1 flex-col">
            <section className="mb-4 flex justify-between">
              <p className="text-2xl font-bold">Gestión de Mis Libros</p>
              <button className="cursor-pointer rounded-lg bg-red-300 p-1.5 text-sm hover:bg-red-400">
                <PlusCircleIcon size={20} className="mr-1 inline" />
                <p className="inline font-bold">Agregar Nuevo Libro</p>
              </button>
            </section>

            <section className="flex h-102 flex-1 flex-col gap-1 rounded-xl border border-gray-200 bg-white">
              <section className="flex gap-2 p-4">
                <Tag filterKind="Todos" filter={filter} text="Todos" buttonOnClickFunction={showAllBooks}></Tag>
                <Tag filterKind="Disponible" filter={filter} text="Disponibles" buttonOnClickFunction={() => showFilteredBooks("Disponible")}></Tag>
                <Tag filterKind="Prestado" filter={filter} text="Prestados" buttonOnClickFunction={() => showFilteredBooks("Prestado")}></Tag>
              </section>
              <section className="flex gap-2 px-3">
                <div className="flex w-3/5 items-center justify-between">
                  <p>Titulo y Autor</p>
                  <button className="hover:cursor-pointer">
                    <ArrowsDownUpIcon size={15} />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <p>Disponible</p>
                  <button className="hover:cursor-pointer">
                    <ArrowsDownUpIcon size={15} />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <p>Agregado</p>
                  <button className="hover:cursor-pointer">
                    <ArrowsDownUpIcon size={15} />
                  </button>
                </div>
                <p>Acciones</p>
              </section>
              <section className="pr-1">
                {shownBooks.map((reserve) => (
                  <ProfileBook key={reserve.book.id} 
                    bookImg={reserve.book.imageSrc}
                    bookAuthor={reserve.book.authorName}
                    bookGender={reserve.book.gender}
                    bookName={reserve.book.title}
                    bookState={reserve.state}
                    additionDate={reserve.book.timestamp}
                  />
                ))}
              </section>
            </section>
          </div>
        </section>
      </section>
    </div>
  )
}
