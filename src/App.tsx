import { Routes, Route, Navigate } from 'react-router'
import { useState} from 'react'
import { Login } from './pages/auth/login'
import HomePage from './pages/HomePages'
import { PrivateLayer } from './components/PrivateLayer'


const BookDetail = () => <div className="p-8">Detalle del Libro</div>;
const LoanDetails = () => <div className="p-8">Detalle de Préstamos</div>;

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
          <Route path="/" element={<HomePage />} />
          <Route path="/detalle-de-libro" element={<BookDetail />} />
          <Route path="/prestamos-de-libros" element={<LoanDetails />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      ) : (<>
        <Route path="/login" element={<Login onLog={setUser}/>} />
        <Route path="*" element={<Navigate to="/login" />} /> </>
      )}
      
    </Routes>
  );
}

export default App;