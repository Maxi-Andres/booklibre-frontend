import { Link } from "react-router"

export default function Navbar() {
  return (
    <div className="flex justify-center">
      <Link className="bg-red-200 p-2" to="/">
        NavBar
      </Link>
    </div>
  )
}
