import { Routes, Route, Navigate } from 'react-router'
import { useState} from 'react'
import { Login } from '../src/pages/login'
// import HomePage from './pages/HomePages'
import Home from './pages/Home'
import { PrivateLayer } from './components/PrivateLayer'
import Profile from "@/pages/Profile"
import BookDetail from "@/pages/BookDetail"
import LoanDetails from "@/pages/LoanDetails"

// const BookDetail = () => <div className="p-8">Detalle del Libro</div>;
// const LoanDetails = () => <div className="p-8">Detalle de Préstamos</div>;

function App() {
  const [user, setUser] = useState(()=> {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })


  console.log('usuario:', user ? 'logueado' : 'no logueado');

  return (
    <Routes>
      {user ? (
        <Route element={<PrivateLayer onLog={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/detalle-de-libro" element={<BookDetail />} />
          <Route path="/prestamos-de-libros" element={<LoanDetails />} />
          <Route path="/profile" element={<Profile/>} />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Route>
      ) : (<>
        <Route path="/login" element={<Login onLog={setUser}/>} />
        <Route path="*" element={<Navigate to="/login" />} /> </>
      )}
      
    </Routes>
  );
}

export default App;