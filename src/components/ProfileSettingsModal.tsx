import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { UserProfile } from "@/model/userProfile"
import { GearIcon, PencilIcon } from "@phosphor-icons/react"
import { InputField } from "@/components/InputField"
import { getErrorMessage } from "@/validation/errorHandler"
import { showToast } from "@/utils/toast"
import { userProfileService } from "@/services/userProfileService"
import { ValidationMessage } from "@/validation/validationMessage"

type ProfileSettingsIntf = {
  profile: UserProfile
  onProfileUpdated: (updatedProfile: UserProfile) => void
}

export default function ProfileSettingsModal({
  profile,
  onProfileUpdated,
}: ProfileSettingsIntf) {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<ValidationMessage[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImg, setPreviewImg] = useState<string>(
    `http://localhost:9000/${profile.img}`,
  )
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreviewImg(URL.createObjectURL(file))
    setSelectedImageFile(file)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleCancel = () => {
    setPreviewImg(`http://localhost:9000/${profile.img}`)
    setSelectedImageFile(null)
    setErrors([])
    setOpen(false)
  }

  const handleSave = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    var newProfileData: UserProfile = new UserProfile(
      profile.id,
      (formData.get("name") as string) || profile.name,
      (formData.get("description") as string) || profile.description,
      profile.img,
      (formData.get("location") as string) || profile.location,
      profile.timestamp,
      profile.bibliokarmas,
      (formData.get("email") as string) || profile.email,
      (formData.get("celphone") as string) || profile.cel,
      (formData.get("userType") as string) || profile.userType,
    )

    setErrors([])
    newProfileData.validate()
    if (newProfileData.errors.length > 0) {
      setErrors(newProfileData.errors)
      return errors
    }
    try {
      const updatedProfile = await userProfileService.updateProfile(
        newProfileData,
        selectedImageFile,
      )
      onProfileUpdated(updatedProfile)
      setOpen(false)
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      showToast.httpError(
        "Error al guardar los cambios. " + errorMessage,
        "error",
      )
    } finally {
      setErrors([])
    }
  }

  useEffect(() => {
    if (profile.img) {
      setPreviewImg(`http://localhost:9000/${profile.img}`)
    }
  }, [profile.img])

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex gap-2 rounded-md px-2.5 py-1.5 text-sm font-semibold inset-ring hover:bg-gray-200"
      >
        <GearIcon size={20} />
        <p className="font-bold">Editar Perfil</p>
      </button>
      <Dialog open={open} onClose={handleCancel} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-400 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-4 pb-3 sm:p-6 sm:pb-4">
                <div className="mb-5 p-2">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-semibold text-gray-700"
                    >
                      Edicion de perfil
                    </DialogTitle>
                    <div className="mt-5 flex gap-10">
                      <section>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="image"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />

                        <div
                          className="group relative h-24 w-24 cursor-pointer"
                          onClick={handleImageClick}
                        >
                          <img
                            src={previewImg}
                            alt="profile image"
                            className="h-full w-full rounded-full object-cover transition-all duration-200 group-hover:brightness-50"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <PencilIcon
                              size={24}
                              className="text-amber-50"
                              weight="bold"
                            />
                          </div>
                        </div>
                      </section>
                      <form
                        onSubmit={handleSave}
                        className="flex w-full flex-col gap-2"
                      >
                        <InputField
                          id="nameInputField"
                          name="name"
                          label="Nombre"
                          defaultValue={profile.name}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                          field="invalid-name"
                          errors={errors}
                        />
                        <InputField
                          id="descInputField"
                          name="description"
                          label="Descripcion"
                          defaultValue={profile.description}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                          field="too-long-desc"
                          errors={errors}
                        />
                        <InputField
                          id="locInputField"
                          name="location"
                          label="Ubicacion"
                          defaultValue={profile.location}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                          field="invalid-format-loc"
                          errors={errors}
                        />
                        <InputField
                          id="emailInputField"
                          name="email"
                          label="Email"
                          defaultValue={profile.email}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                          field="invalid-format-email"
                          errors={errors}
                        />
                        <InputField
                          id="celInputField"
                          name="celphone"
                          label="Teléfono"
                          defaultValue={profile.cel}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                          field="invalid-format-cel"
                          errors={errors}
                        />
                        <InputField
                          id="userTypeInputField"
                          name="userType"
                          label="Tipo de perfil"
                          defaultValue={profile.userType}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                          // field="invalid-name"
                          // errors={errors}
                        />
                        <div className="mt-5 flex justify-end">
                          <button
                            type="button"
                            data-autofocus
                            onClick={handleCancel}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-red-400 px-2 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-red-500 sm:mt-0 sm:w-auto"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-green-500 px-7 py-2 text-sm font-semibold text-white hover:bg-green-600 sm:ml-3 sm:w-auto"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
