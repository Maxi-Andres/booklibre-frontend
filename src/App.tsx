import { Link } from "react-router"

export default function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-300">
      <h1 className="mb-6 text-3xl font-bold text-blue-500">App</h1>
      <div className="flex gap-2">
        <Link className="rounded-md border bg-red-200 p-1" to="/">
          App
        </Link>
        <Link
          className="rounded-md border bg-red-200 p-1"
          to="home"
        >
          Home
        </Link>
        <Link
          className="rounded-md border bg-red-200 p-1"
          to="detalle-de-libro"
        >
          BookDetail
        </Link>
        <Link
          className="rounded-md border bg-red-200 p-1"
          to="prestamos-de-libros"
        >
          LoanDetails
        </Link>
      </div>
    </div>
  )
}
