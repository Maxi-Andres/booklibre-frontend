import { Routes, Route, Navigate } from 'react-router'
import { Login } from '@/pages/Login'
import Home from './pages/Home'
import { PrivateLayer } from './components/PrivateLayer'
import Profile from "@/pages/Profile"
import BookDetail from "@/pages/BookDetail"
import LoanDetails from "@/pages/LoanDetails"
import { useAuth } from './context/AuthContext'


function App() {
  const {user} = useAuth()

  return (
    <Routes>
      {user ? (
        <Route element={<PrivateLayer/>}>
          <Route path="/" element={<Home />} />
          <Route path="/detalle-de-libro" element={<BookDetail />} />
          <Route path="/prestamos-de-libros" element={<LoanDetails />} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      ) : (<>
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Navigate to="/login" />} /> </>
      )}
      
    </Routes>
  );
}

export default App;