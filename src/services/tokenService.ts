import axios from "axios"

const USER_KEY = "user"

let _accessToken: string | null = null

export const tokenMemory = {
  get: () => _accessToken,
  set: (token: string | null) => { _accessToken = token },
}

interface RefreshResponse {
  token: string
}

export const tokenService = {
  clearTokens(): void {
    tokenMemory.set(null)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(USER_KEY)
  },

  async refreshAccessToken(): Promise<string> {
    const rawClient = axios.create()
    rawClient.defaults.withCredentials = true
    const { data } = await rawClient.post<RefreshResponse>(
      `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    )

    tokenMemory.set(data.token)
    return data.token
  },
}
