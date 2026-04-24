import { getTokenPayload } from "@/utils/jwt"
import axios from "axios"
import { BACKEND_URL, REFRESH_TOKEN_KEY, TOKEN_KEY } from "./constants"

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
}

const listeners = new Set<() => void>()
let tokensSnapshot = {
  accessToken: localStorage.getItem(TOKEN_KEY),
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  isRefreshing: false,
  refreshCount: 0,
}

function updateSnapshot() {
  tokensSnapshot = {
    ...tokensSnapshot,
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  }
}

function notifyListeners() {
  updateSnapshot()
  listeners.forEach((callback) => {
    callback()
  })
}

function setRefreshing(value: boolean) {
  tokensSnapshot = { ...tokensSnapshot, isRefreshing: value }
  notifyListeners()
}

export function subscribeToTokens(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

export function getTokens() {
  return tokensSnapshot
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  notifyListeners()
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  tokensSnapshot = { ...tokensSnapshot, refreshCount: 0 }
  notifyListeners()
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null
}

export function isTokenExpiredError(headers?: Record<string, string>): boolean {
  const wwwAuthenticate =
    headers?.["www-authenticate"] ?? headers?.["WWW-Authenticate"]
  return !!wwwAuthenticate?.includes('error="invalid_token"')
}

export function getPrimaryRole(): string | null {
  const payload = getTokenPayload(getAccessToken())
  const rawRoles = payload?.roles
  if (Array.isArray(rawRoles)) {
    const first = rawRoles.find(
      (role): role is string => typeof role === "string",
    )
    return first ?? null
  }
  return null
}

export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    throw new Error("No refresh token available")
  }

  setRefreshing(true)

  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${BACKEND_URL}/refresh`,
      { refreshToken },
      {
        withXSRFToken: true,
        withCredentials: true,
        xsrfHeaderName: "X-XSRF-TOKEN",
        xsrfCookieName: "XSRF-TOKEN",
      },
    )

    const { accessToken, refreshToken: newRefreshToken } = response.data
    tokensSnapshot = {
      ...tokensSnapshot,
      refreshCount: tokensSnapshot.refreshCount + 1,
    }
    setRefreshing(false)
    setTokens(accessToken, newRefreshToken)
    return { accessToken, refreshToken: newRefreshToken }
  } catch (error) {
    setRefreshing(false)
    clearTokens()
    throw error
  }
}
