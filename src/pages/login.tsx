import { Link, useNavigate, useLocation } from "react-router"
import type { UserJSONLoginRequest } from "@/model/user"
import { UserType } from "@/model/user"
import { useState } from "react"
import { ValidationMessage } from "@/validation/validationMessage"
import ValidationField from "@/validation/ValidationField"
import { userService } from "@/services/UserService"
import { getErrorMessage } from "@/validation/errorHandler"
import { useOnInit } from "@/hooks/UseOnInit"
import { InputField } from "@/components/InputField"
import { useAuth } from '@/context/AuthContext'




export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {login} = useAuth()
  const [user, setUser] = useState<UserJSONLoginRequest>({email:'',password:''})
  const [errors, setErrors] = useState<Array<ValidationMessage>>([])
  const from = location.state?.from?.pathname || "/"


  const handleSubmit = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const userLogin = new UserType(user.email, user.password,'')

    userLogin.validate()

    if (userLogin.errors.length > 0) {
      setErrors(userLogin.errors)
      return
    }

    try {
      const validation = await userService.login(user.email, user.password)

      if (validation) {
        // Guardar en localStorage
        //localStorage.setItem("user", JSON.stringify(validation))
        login(validation)
        navigate(from, { replace: true })
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      // aca va a ir el toast
    } 
  }

  const update = (key: keyof typeof user, value:unknown) => {
    setUser({...user, [key]:value})
  }

  useOnInit(() => { if (location.state?.from?.pathname != '/' && location.state?.from?.pathname != undefined) alert('Debe loguearse')})

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
              required
              value={user.password}
              onChange={(e)=> update("password", e.target.value)}
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
