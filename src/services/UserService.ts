import {
  type UserJSONLoginRequest,
  type UserJSONRegisterRequest,
  type UserJSONResponse,
  UserType,
} from "@/domain/user"
import axios from "axios"
import { REST_SERVER_URL } from "@/config/configuration"
import { body } from "motion/react-client"

class UserService {
  async login(emailSent: string, passwordSent: string): Promise<UserType> {
    const userLogin: UserJSONLoginRequest = {
      email: emailSent,
      password: passwordSent,
    }

    const response = await axios.post<UserJSONResponse>(
      REST_SERVER_URL + "/api/auth",
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
      REST_SERVER_URL + "/register",
      userRegister,
    )
  }
}

export const userService = new UserService()
