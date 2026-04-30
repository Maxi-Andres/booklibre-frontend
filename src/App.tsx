import { Routes, Route, Navigate } from "react-router"
// import HomePage from './pages/HomePages'
import Home from "./pages/Home"
import { PrivateLayer } from "./components/PrivateLayer"
import { PublisherLayer } from "./components/PublisherLayer"
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
import { useEffect, useMemo } from "react"
import { useUserProfile } from "./context/UserProfileContext"

// App.tsx
function App() {
  const { user, isInitializing } = useAuth()
  const { userProfile, refreshProfile } = useUserProfile()
  const { isPublisher } = useUserData()

  useEffect(() => {
    if (user && !isInitializing) refreshProfile()
  }, [user, isInitializing])

  const publisherRedirect = useMemo(() => isPublisher(), [userProfile, user])

  if (isInitializing) return (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <p className="animate-spin h-8 w-8 text-muted-foreground"> CARGANDOOOO </p>
  </div>
)

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={4000} />
      <Routes>
        {/* Rutas públicas - siempre disponibles */}
        <Route path="/login" element={user ? <Navigate to="/" replace />  : <Login />}/>
        <Route path="/registrarse" element={!user ? <Register /> : <Navigate to="/" replace />} />

        {/* Rutas privadas */}
        <Route element={<PrivateLayer />}>
          <Route path="/" element={publisherRedirect ? <Navigate to="/perfil" replace/> : <Home />} />
          <Route path="/detalle-de-libro/:id" element={<BookDetail />} />
          <Route path="/prestamos-de-libros" element={<LoanDetails />} />
          <Route path="/perfil" element={<Profile />} />
          <Route element={<PublisherLayer />}>
            <Route path="/editar-libro/:id" element={<EditBook />} />
            <Route path="/crear-libro" element={<EditBook />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </>
  )
}

export default App
