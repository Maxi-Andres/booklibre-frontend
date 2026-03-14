import { Link, useNavigate, useLocation } from "react-router"
import { UserLogin } from "../model/user"
import { useState } from "react"
import { ValidationMessage } from "../validation/validationMessage"
import ValidationField from "../validation/ValidationField"
import { userService } from "../services/UserService"
import { getErrorMessage } from "../validation/errorHandler"
import { useOnInit } from "../hooks/UseOnInit"
import type { LogProps } from "../types/authState"
import { InputField } from "@/components/InputField"
import { Field } from "@headlessui/react"

interface LoginFormData {
  email: string
  password: string
}

export const Login = ({ onLog }: LogProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  // estado del formulario
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<ValidationMessage[]>([])

  // muestra mensaje si viene de una ruta protegida
  useOnInit(() => {
    if (from !== "/") {
      alert("Debe iniciar sesión para acceder a esa página")
    }
  })

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setErrors([])

    // crea el usuario con los datos del form
    const user = new UserLogin(formData.email, formData.password)

    user.validate()

    if (user.errors.length > 0) {
      setErrors(user.errors)
      return
    }

    try {
      const validation = await userService.getUser(user.mail, user.password)

      if (validation) {
        // Guardar en localStorage
        localStorage.setItem("user", JSON.stringify(validation))
        onLog(validation)
        navigate(from, { replace: true })
        // navigate("/", { replace: true })
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      // aca va a ir el toast
    } 
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Book Libre</h1>
          <p className="mt-2 text-sm text-gray-600">Ingresá a tu cuenta</p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <InputField 
              label="Email"
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <ValidationField field="email" errors={errors} />
            </div>

            {/* Password Field */}
            <div>
              <InputField 
              label="Password"
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e)=> handleInputChange("password", e.target.value)}
              />
              <ValidationField field="password" errors={errors} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            { "Iniciar sesión"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
