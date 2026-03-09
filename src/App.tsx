// Temporalmente, en el archivo de rutas
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Login} from './pages/auth/login'
import {EditBook} from './pages/auth/editBook'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editBook" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
