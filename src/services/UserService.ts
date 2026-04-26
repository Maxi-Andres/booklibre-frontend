import {
  type UserJSONLoginRequest,
  type UserJSONRegisterRequest,
  type UserJSONResponse,
  UserType,
} from "@/domain/user"
import axios from "axios"
import { REST_SERVER_URL } from "@/config/configuration"
import type { AuthUser } from "@/context/AuthContext"

class UserService {
  async login(emailSent: string, passwordSent: string): Promise<AuthUser> {
    const response = await axios.post<UserJSONResponse>(
        REST_SERVER_URL + "/api/auth",
        { email: emailSent, password: passwordSent }
    )
    return {
        id: response.data.id,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        email: response.data.email,
        name: response.data.name,
    }
}

  async createUser(user: UserType): Promise<void> {
    const userRegister: UserJSONRegisterRequest = {
      name: user.name,
      email: user.email,
      password: user.password,
      passwordRetry: "",
    }

    await axios.post<UserJSONResponse>(
      REST_SERVER_URL + "/register",
      userRegister,
    )
  }
}

export const userService = new UserService()
