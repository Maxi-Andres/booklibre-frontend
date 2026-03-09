import { Link, useNavigate} from 'react-router-dom'
import { UserType } from '../../domain/user'
import { useState} from 'react'
import type { SyntheticEvent } from 'react'
import { ValidationMessage } from '../../domain/validationMessage'
import { userService } from '../../services/UserService'
import { getErrorMessage } from '../../domain/errorHandler'
import { USERS_LIST_MOCK } from '../../data/userMock'


export const Login = () => {
const navigate = useNavigate()
const [errors, setErrors] = useState<Array<ValidationMessage>>([])

const onSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault() // cancela el comportamiento por defecto del navegador frente al evento del submit
    const form = ev.currentTarget as HTMLFormElement
    const formData = new FormData(form)     

    const user = new UserType(
      (formData.get("mail") ?? "").toString(),
      (formData.get("password") ?? "").toString()
    )

    user.validate()
    
    if (user.errors.length > 0) {
    user.errors.forEach(error => {
      alert(`Error: ${error.field} - ${error.message}`)
      // despues implemento el toast
      // toast.error(`${error.field}: ${error.message}`);
    });
    setErrors(user.errors)
    return errors
  }

    try {
      let validation = await userService.getUser(user.mail, user.password)
      if (validation) {
        navigate("/editBook", { replace: true })
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      //aca va a ir el toast
      alert(errorMessage)
    } finally {
      setErrors([])
    }
  }

  console.log(USERS_LIST_MOCK);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mx-auto h-10 w-auto size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Book Libre
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit}  className="space-y-6" noValidate>
            <div>
              <label htmlFor="mail" className="block text-sm/6 font-medium text-gray-900">
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="mail"
                  name="mail"
                  type="mail"
                  required
                  autoComplete="mail"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ingresar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
           
            <span>¿No tienes cuenta? <Link to={'/register'} className='auth-anchor'>Registrate</Link></span>
          </p>
        </div>
      </div>
    </>
  )
}