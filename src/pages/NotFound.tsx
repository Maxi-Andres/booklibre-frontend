import { div } from "motion/react-client"
import { useRouteError, isRouteErrorResponse, Link } from "react-router"

export default function NotFound() {
  // const error = useRouteError() // esto es un hook que agarra el error que tiro React Router

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        {/* {isRouteErrorResponse(error) ? error.status : "Error"} */}
        {/* devuelve true si tiro un error React Router */}
      </h1>
      <p className="text-gray-500">
        Parece que te perdiste...
      </p>
      <img
        src="/assets/john-travolta-lost.gif"
        alt="John Travolta perdido"
        className="w-250 rounded-lg"
      />
      <Link to="/" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  )
}
