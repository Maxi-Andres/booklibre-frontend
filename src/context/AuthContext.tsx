import SessionExpiredModal from "@/components/SessionExpiredModal"
import { createContext, useContext, useEffect, useRef, useState } from "react"


export interface AuthUser {
  id: number
  accessToken: string
  refreshToken: string
  sessionExpiresAt: number
}
interface AuthContextType {
  user: AuthUser | null
  login: (userData: AuthUser, expirationTime: number, rememberMe?: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const getId = (): number | null => {
  try {
    const stored = localStorage.getItem("user") || sessionStorage.getItem("user")
    return stored ? (JSON.parse(stored) as AuthUser).id : null
  } catch {
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")
    return null
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getId() ? { id: getId()! } as AuthUser : null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [sessionExpiredModal, setSessionExpiredModal] = useState(false)
  
  const login = (userData: AuthUser, expirationTime: number, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage
    const sessionExpiresAt = Date.now() + expirationTime
    // storage.setItem("id", JSON.stringify(userData.id))
    // storage.setItem("accessToken", userData.accessToken)
    storage.setItem("user", JSON.stringify({...userData, sessionExpiresAt}))
    setUser({...userData, sessionExpiresAt})
  }
  
  const logout = () => {
    // localStorage.removeItem("id")
    // localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    // sessionStorage.removeItem("id")
    // sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("user")
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