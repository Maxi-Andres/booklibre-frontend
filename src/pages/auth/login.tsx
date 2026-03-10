import { Link, useNavigate, useLocation} from 'react-router'
import { UserType } from '../../domain/user'
import { useState} from 'react'
import { ValidationMessage } from '../../domain/validationMessage'
import ValidationField from '../../ValidationField/ValidationField'
import { userService } from '../../services/UserService'
import { getErrorMessage } from '../../domain/errorHandler'
import { useOnInit } from '../../hooks/UseOnInit'
import type { LogProps } from '../../types/authState'

interface LoginFormData {
  email: string;
  password: string;
}

export const Login = ({ onLog }: LogProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  // Estado del formulario
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<ValidationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  


  // Muestra mensaje si viene de una ruta protegida
  useOnInit(() => {
    if (from !== '/') {
      alert('Debe iniciar sesión para acceder a esa página')
    }
  });

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // crea el usuario con los datos del form
    const user = new UserType(
      formData.email,
      formData.password
    );

    user.validate();

    if (user.errors.length > 0) {
      setErrors(user.errors);
      setIsLoading(false);
      return;
    }

    try {
      const validation = await userService.getUser(user.mail, user.password)
      
      if (validation) {
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(validation))
        onLog(validation)
        navigate(from, { replace: true })
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      // aca va a ir el toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Book Libre</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ingresá a tu cuenta
          </p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
              />
              <ValidationField field="email" errors={errors} />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
              />
              <ValidationField field="password" errors={errors} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}