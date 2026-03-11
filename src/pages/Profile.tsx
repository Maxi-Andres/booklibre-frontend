import {
  GearIcon,
  PlusCircleIcon,
  UserCircleIcon,
  CalendarBlankIcon,
  MapPinIcon,
  ChartLineIcon,
} from "@phosphor-icons/react"

export default function Profile() {
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
            <p className="text-3xl font-bold">Emilia Romero</p>
            <p className="text-blue-400">Pedazo de lectora</p>
            <div className="flex gap-1 text-sm text-gray-400">
              <p><CalendarBlankIcon size={15} className="inline" /> Se unio en 2001 ·</p>
              <p><MapPinIcon size={15} className="inline" /> Gonzalez Catán, BA · </p>
              <p><ChartLineIcon size={15} className="inline" /> Bibliokarmas 2345 </p>
            </div>
          </div>

          <button className="max-w-25 rounded-lg text-sm bg-gray-200">
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
                <p>user@email.com</p>
              </article>
              <article className="border-b-2 border-gray-300 pb-2">
                <p className="text-xs font-bold text-gray-500">TELÉFONO</p>
                <p>+54 (11) 1111-2222</p>
              </article>
              <article>
                <p className="text-xs font-bold text-gray-500">
                  TIPO DE PERFIL
                </p>
                <p>Lector / Publicador</p>
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
              <button className="rounded-lg p-1.5 text-sm bg-red-300">
                <PlusCircleIcon size={20} className="mr-1 inline" />
                <p className="inline font-bold">Agregar Nuevo Libro</p>
              </button>
            </section>

            <section className="h-102 flex-1 rounded-xl border border-gray-200 bg-white"></section>
          </div>
        </section>
      </section>
    </div>
  )
}
