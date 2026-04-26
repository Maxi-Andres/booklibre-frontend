import { createContext, useContext, useState } from "react"


export interface AuthUser {
  id: number
  accessToken: string
  refreshToken: string
  email: string
  name: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (userData: AuthUser, rememberMe?: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const getId = (): number | null => {
  try {
    const stored = localStorage.getItem("id") || sessionStorage.getItem("id")
    return stored ? JSON.parse(stored) as number : null
  } catch {
    localStorage.removeItem("id")
    sessionStorage.removeItem("id")
    return null
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getId() ? { id: getId()! } as AuthUser : null)

  const login = (userData: AuthUser, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("id", JSON.stringify(userData.id))
    storage.setItem("accessToken", userData.accessToken)
    storage.setItem("refreshToken", userData.refreshToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")
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