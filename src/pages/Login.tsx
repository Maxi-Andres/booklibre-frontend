import "@/css/checkbox.css"
import { Link, useNavigate } from "react-router"
import type { UserJSONLoginRequest } from "@/domain/user"
import { UserType } from "@/domain/user"
import { useState } from "react"
import { ValidationMessage } from "@/validation/validationMessage"
import ValidationField from "@/validation/ValidationField"
import { userService } from "@/services/UserService"
import { InputField } from "@/components/InputField"
import { useAuth, type AuthUser } from "@/context/AuthContext"
import { showToast } from "@/utils/toast"
import { useOnInit } from "@/hooks/UseOnInit"

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [user, setUser] = useState<UserJSONLoginRequest>({
    email: "",
    password: "",
  })
  
  const [errors, setErrors] = useState<Array<ValidationMessage>>([])
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const userLogin = new UserType(user.email, user.password, "")

    userLogin.validateLogin()

    if (userLogin.errors.length > 0) {
      setErrors(userLogin.errors)
      return
    }

    try {
      const validation = await userService.login(user.email, user.password)

      if (validation) {
        // console.log(validation)
        const userData : AuthUser = {
          id: validation.id,
          accessToken: validation.accessToken,
          refreshToken: validation.refreshToken,
          sessionExpiresAt: 0
        }
        login(userData, validation.expirationTime, rememberMe)
        navigate("/", { replace: true })
      }
    } catch (error) {
      showToast.httpError(error, "Error al iniciar sesion")
    }
  }

  const update = (key: keyof typeof user, value: unknown) => {
    setUser({ ...user, [key]: value })
  }

  useOnInit(() => {
    if (sessionStorage.getItem("sessionExpired")) {
      setTimeout(() => {
        sessionStorage.removeItem("sessionExpired")
      }, 1000)
      showToast.warning("Tu sesión expiró. Volvé a iniciar sesión")
      // const msg = sessionStorage.getItem("sessionExpiredMessage")
      // showToast.error(msg!!)
    }
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Book Libre</h1>
          <p className="mt-2 text-sm text-gray-600">Ingresá a tu cuenta</p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <InputField
                label="Email"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <ValidationField field="email" errors={errors} />
            </div>

            {/* Password Field */}
            <div>
              <InputField
                label="Password"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => update("password", e.target.value)}
              />
              <ValidationField field="password" errors={errors} />
            </div>
          </div>
          {/* Remember checkbox */}

          <div className="flex items-center gap-2">
            <div className="cntr">
              <input
                type="checkbox"
                id="cbx"
                className="hidden-xs-up"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="cbx" className="cbx"></label>
            </div>
            <label
              htmlFor="cbx"
              className="cursor-pointer text-sm text-gray-800"
            >
              Recuérdame
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {"Iniciar sesión"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/registrarse"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
