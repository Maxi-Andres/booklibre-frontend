import SessionExpiredModal from "@/components/SessionExpiredModal"
import { createContext, useContext, useEffect, useRef, useState } from "react"
interface AuthContextType {
  user: object | null
  login: (userData: object, expirationTime: number, rememberMe?: boolean) => void
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [sessionExpiredModal, setSessionExpiredModal] = useState(false)
  
  const login = (userData: object, expirationTime: number, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage
    const sessionExpiresAt = Date.now() + expirationTime
    storage.setItem("user", JSON.stringify({...userData, sessionExpiresAt}))
    setUser({...userData, sessionExpiresAt})
  }
  
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("id")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("id")
    setUser(null)
  }

  const handleSessionExpired = () => {
    // console.log("Ejecutando timeout...")
    setSessionExpiredModal(false)
    logout()
    sessionStorage.setItem("sessionExpiredMessage", "Tu sesión expiró")
  }
  
  useEffect(() => {
    // console.log("Hubo un cambio en user")
    if (!user) return

    const sessionExpiresAt = (user as any).sessionExpiresAt
    if (!sessionExpiresAt) return

    const msUntilExpiry = sessionExpiresAt - Date.now()

    if (msUntilExpiry <= 0) {
      // Ya expiró (ej: el usuario volvió después de mucho tiempo)
      handleSessionExpired()
      return
    }

    timerRef.current = setTimeout(() => {setSessionExpiredModal(true)}, msUntilExpiry)

    // Cleanup: evita timers duplicados si user cambia
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [user])

  // Visibilitychange: cubre tabs en background o congeladas
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" || !user) return

      const sessionExpiresAt = (user as any).sessionExpiresAt
      if (sessionExpiresAt && Date.now() >= sessionExpiresAt) {
        setSessionExpiredModal(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}

      {sessionExpiredModal && (
        <SessionExpiredModal onClick={handleSessionExpired} showing={sessionExpiredModal}/>
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
