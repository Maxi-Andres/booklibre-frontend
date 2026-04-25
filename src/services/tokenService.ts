import axios from "axios"
import { REST_SERVER_URL } from "@/config/configuration"

const USER_KEY = "user"

interface StoredUser {
  accessToken: string
  refreshToken: string
  email: string
  name: string
  id: number
  [key: string]: unknown
}

interface RefreshResponse {
  token: string
}

const getStorageWithUser = (): Storage | null => {
  if (localStorage.getItem(USER_KEY)) return localStorage
  if (sessionStorage.getItem(USER_KEY)) return sessionStorage
  return null
}

const readUser = (): StoredUser | null => {
  const storage = getStorageWithUser()
  if (!storage) return null
  try {
    return JSON.parse(storage.getItem(USER_KEY)!) as StoredUser
  } catch {
    storage.removeItem(USER_KEY)
    return null
  }
}

export const tokenService = {
  getAccessToken(): string | null {
    return readUser()?.accessToken ?? null
  },

  // getRefreshToken(): string | null {
  //   return readUser()?.refreshToken ?? null
  // },

  updateAccessToken(newAccessToken: string): void {
    const storage = getStorageWithUser()
    const user = readUser()
    if (!storage || !user) return
    storage.setItem(
      USER_KEY,
      JSON.stringify({ ...user, accessToken: newAccessToken }),
    )
  },

  clearTokens(): void {
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(USER_KEY)
  },

  async refreshAccessToken(): Promise<string> {
    // const refreshToken = this.getRefreshToken()
    // if (!refreshToken) throw new Error("No refresh token available")

    const rawClient = axios.create() // crea una instancia de axios sin las configs asi no joden
    rawClient.defaults.withCredentials = true
    const { data } = await rawClient.post<RefreshResponse>(
      `${REST_SERVER_URL}/api/auth/refresh`,
    )

    this.updateAccessToken(data.token)
    return data.token
  },
}
