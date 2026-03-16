import { Routes, Route, Navigate } from "react-router"
import { Login } from "@/pages/Login"
// import HomePage from './pages/HomePages'
import Home from "./pages/Home"
import { PrivateLayer } from "./components/PrivateLayer"
import Profile from "@/pages/Profile"
import BookDetail from "@/pages/BookDetail"
import LoanDetails from "@/pages/LoanDetails"
import { useAuth } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// const BookDetail = () => <div className="p-8">Detalle del Libro</div>;
// const LoanDetails = () => <div className="p-8">Detalle de Préstamos</div>;

function App() {
  const { user } = useAuth()

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={4000} />
      <Routes>
        {user ? (
          <Route element={<PrivateLayer />}>
            <Route path="/" element={<Home />} />
            <Route path="/book-detail/:id" element={<BookDetail />} />
            <Route path="/prestamos-de-libros" element={<LoanDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />{" "}
          </>
        )}
      </Routes>
    </>
  )
}

export default App
