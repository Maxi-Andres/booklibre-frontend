import { createContext, useContext, useState } from "react"

interface AuthContextType {
  user: object | null
  login: (userData: object, rememberMe?: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const getUser = () => {
  try {
    const stored =
      localStorage.getItem("user") || sessionStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  } catch {
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")
    return null
  }
}

export const getId = () => {
  const user = getUser()
  return user?.id ?? null
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => getUser())

  const login = (userData: object, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("id")
    sessionStorage.removeItem("user")
    localStorage.removeItem("id")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
