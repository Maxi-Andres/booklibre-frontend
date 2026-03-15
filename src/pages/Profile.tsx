import ProfileBook from "@/components/ProfileBook"
import Tag from "@/components/Tag"
import { useOnInit } from "@/hooks/UseOnInit"
import { UserProfile } from "@/model/userProfile"
import { userProfileService } from "@/services/userProfileService"
import { Reader, type UserType } from "@/types/userType"
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
import { getErrorMessage } from "@/validation/errorHandler"
import { bookService } from "@/services/bookService"
import type { Book } from "@/model/book"
import { reserveService } from "@/services/reserveService"

interface UserProfileFormData {
  name: string
  desc: string
  img: string
  location: string
  timestamp: string
  bibliokarmas: string
  mail: string
  cel: string
  userType: UserType
}



export default function Profile() {
  const [errors, setErrors] = useState<ValidationMessage[]>([]);
  const [profile, setProfile] = useState<UserProfile>(new UserProfile())
  const [userOwnBooks, setUserOwnBooks] = useState<Book[]>([])
  var userReadBooks = 0
 
  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement> ) => {

  
  }

  const getUser = async () => {
    try {
      const userProfile = await userProfileService.getProfile()
      setProfile(userProfile)

    } catch (error) {
      const errorMessage = getErrorMessage(error)
      // showToast('Error al traer el usuario. ' + errorMessage, 'error')
    }
  }

  const getUserOwnBooks = async() => {
    try {
      const userOwnBooks = await bookService.getUserOwnBooks()
      setUserOwnBooks(userOwnBooks)

    } catch (error) {
      const errorMessage = getErrorMessage(error)
    }
  }

  const getUserReadBooks = async() => {
    try {
      const userReadBooksAmount = await reserveService.getUserReadBooks()
      userReadBooks = userReadBooksAmount

    } catch (error) {
      const errorMessage = getErrorMessage(error)
    }
  }

  const handleProfileLoad = async() => {
    getUser()
    getUserOwnBooks()
    getUserReadBooks()
  }


  useOnInit(() => handleProfileLoad())

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 pt-12">
      <section className="flex w-245 flex-col gap-7">
        <section className="col-span-3 flex h-42 items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <img
            src="/src/assets/user-avatar.jpg"
            alt=""
            className="h-26 w-26 rounded-full object-cover"
          />
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-3xl font-bold">{profile.name}</p>
            <p className="text-blue-400">{profile.desc}</p>
            <div className="flex gap-1 text-sm text-gray-400">
              <p>
                <CalendarBlankIcon size={15} className="inline" /> Se unio en 
                {' ' + profile.timestamp.slice(6)} ·
              </p>
              <p>
                <MapPinIcon size={15} className="inline" /> {profile.location + ' '}
                ·
              </p>
              <p>
                <ChartLineIcon size={15} className="inline" /> Bibliokarmas
                {' ' + profile.bibliokarmas}
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
                <p>{profile.mail}</p>
              </article>
              <article className="border-b-2 border-gray-300 pb-2">
                <p className="text-xs font-bold text-gray-500">TELÉFONO</p>
                <p>{'+54' + ' (' + profile.cel.slice(0, 2) + ') ' + profile.cel.slice(2)}</p>
              </article>
              <article>
                <p className="text-xs font-bold text-gray-500">
                  TIPO DE PERFIL
                </p>
                <p>{profile.userType.type}</p>
              </article>
            </section>

            <section className="flex h-42 items-center justify-center gap-4 rounded-xl border border-gray-200 bg-red-100 p-5">
              <article className="flex w-28 flex-col items-center gap-1 rounded-xl bg-gray-50 p-2">
                <p className="text-xl font-extrabold text-gray-800">12</p>
                <p className="text-center text-sm text-gray-500">
                  Libros Prestados
                </p>
              </article>

              <article className="flex h-22 w-28 flex-col items-center justify-center gap-1 rounded-xl bg-gray-50 p-2">
                <p className="text-xl font-extrabold text-gray-800">45</p>
                <p className="text-center text-sm text-gray-500">
                  Libros Leídos
                </p>
              </article>
            </section>
          </div>

          <div className="flex flex-1 flex-col">
            <section className="mb-4 flex justify-between">
              <p className="text-2xl font-bold">Gestión de Mis Libros</p>
              <a className="cursor-pointer rounded-lg bg-red-300 p-1.5 text-sm hover:bg-red-400" href='/crear-libro'>
                <PlusCircleIcon size={20} className="mr-1 inline" />
                <p className="inline font-bold">Agregar Nuevo Libro</p>
              </a>
            </section>

            <section className="flex h-102 flex-1 flex-col rounded-xl border border-gray-200 bg-white gap-1">
              <section className="flex gap-2 p-4">
                <Tag text="Todos"></Tag>
                <Tag text="Disponibles"></Tag>
                <Tag text="Prestados"></Tag>
              </section>
              <section className="flex pl-3 gap-2">
                <div className="flex items-center w-3/5 justify-between">
                  <p>Titulo y Autor</p>
                  <button className="hover:cursor-pointer">
                    <ArrowsDownUpIcon size={15} />
                  </button>
                </div>
                <div className="flex justify-center items-center ">
                  <p>Disponible</p>
                  <button className="hover:cursor-pointer">
                    <ArrowsDownUpIcon size={15} />
                  </button>
                </div>
                <div className="flex justify-center items-center ">
                  <p>Agregado</p>
                  <button className="hover:cursor-pointer">
                    <ArrowsDownUpIcon size={15} />
                  </button>
                </div>
                <p>Acciones</p>
              </section>
              <ProfileBook
                bookImg="/src/assets/book_cover1.png"
                bookAuthor="Ray Bradbury"
                bookGender="PsyFi"
                bookName="Farenheit 451"
                bookState="Prestado"
                additionDate="4 Oct, 2023"
              />
              <ProfileBook 
                bookImg="/src/assets/book_cover2.png"
                bookAuthor="Stephen King"
                bookGender="Terror"
                bookName="Pet Semetary"
                bookState="Disponible"
                additionDate="24 Feb, 2023"
              />
              <ProfileBook 
                bookImg="/src/assets/book_cover3.png"
                bookAuthor="Hannah Kaner"
                bookGender="Fantasia"
                bookName="Godkiller"
                bookState="Disponible"
                additionDate="1 Mar, 2023"
              />
            </section>
          </div>
        </section>
      </section>
    </div>
  )
}
