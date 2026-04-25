import { Routes, Route, Navigate } from "react-router"
// import HomePage from './pages/HomePages'
import Home from "./pages/Home"
import { PrivateLayer } from "./components/PrivateLayer"
import Profile from "@/pages/Profile"
import BookDetail from "@/pages/BookDetail"
import LoanDetails from "@/pages/LoanDetails"
import { useAuth } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Login } from "@/pages/Login"
import EditBook from "@/pages/EditBook"
import { Register } from "./pages/Register"
import { useUserData } from "./hooks/UseUserData"
import { useMemo } from "react"
import { useUserProfile } from "./context/UserProfileContext"


// App.tsx
function App() {
  const { user } = useAuth()
  const { userProfile } = useUserProfile()
  const { isPublisher } = useUserData()

   const publisherRedirect = useMemo(() => isPublisher(), [userProfile]) // re-evalúa cuando user cambia
  // console.log("isPublisher:", isPublisher(), "user:", userProfile)

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={4000} />
      <Routes>
        {/* Rutas públicas - siempre disponibles */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/registrarse" element={!user ? <Register /> : <Navigate to="/" replace />} />

        {/* Rutas privadas */}
        <Route element={<PrivateLayer />}>
          <Route path="/" element={publisherRedirect ? <Navigate to="/perfil" replace/> : <Home />} />
          <Route path="/detalle-de-libro/:id" element={<BookDetail />} />
          <Route path="/prestamos-de-libros" element={<LoanDetails />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/editar-libro/:id" element={<EditBook />} />
          <Route path="/crear-libro" element={<EditBook />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </>
  )
}

export default App
