import {
  type UserJSONLoginRequest,
  type UserJSONRegisterRequest,
  type UserJSONResponse,
  UserType,
} from "@/domain/user"
import axios from "axios"

class UserService {
  async login(emailSent: string, passwordSent: string): Promise<UserType> {
    const userLogin: UserJSONLoginRequest = {
      email: emailSent,
      password: passwordSent,
    }

    const response = await axios.post<UserJSONResponse>(
      import.meta.env.VITE_API_URL + "/api/auth",
      userLogin,
    )

    //localStorage.setItem('id', response.data.id.toString())

    return UserType.fromJson(response.data)
  }

  async createUser(user: UserType): Promise<void> {
    const userRegister: UserJSONRegisterRequest = {
      name: user.name,
      email: user.email,
      password: user.password,
      passwordRetry: "",
    }

    await axios.post<UserJSONResponse>(
      import.meta.env.VITE_API_URL + "/register",
      userRegister,
    )
  }
}

export const userService = new UserService()
