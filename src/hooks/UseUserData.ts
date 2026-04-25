import { tokenService } from "@/services/tokenService"
import { UserKind } from "@/types/userKind"
import { getTokenPayload } from "@/utils/jwt"

const ROLE_MAP: Record<string, UserKind> = {
  PUBLISHER: UserKind.PUBLISHER,
  READER:    UserKind.READER,
  COMBINED:  UserKind.COMBINED,
}

export function useUserData() {
  const getRole = (): UserKind | null => {
    const token = tokenService.getAccessToken()   // ← lee del objeto "user" en sessionStorage
    console.log("token:", token)
    const payload = getTokenPayload(token)
    console.log("payload:", payload)
    const raw = (payload?.role?.[0] ?? payload?.roles?.[0])?.replace("ROLE_", "")
    return raw ? ROLE_MAP[raw] ?? null : null
  }

  const isPublisher = () =>
    getRole() === UserKind.PUBLISHER || getRole() === UserKind.COMBINED

  const isReader = () =>
    getRole() === UserKind.READER || getRole() === UserKind.COMBINED

  return { getRole, isPublisher, isReader }
}