import { type UserJSONLoginRequest, type UserJSONResponse, UserType } from '@/model/user'
import { USERS_LIST_MOCK } from '../data/userMock'
import axios from 'axios'
import { REST_SERVER_URL } from './configuration'

class UserService {
  async login(emailSent: string, passwordSent: string): Promise<UserType> {
    // console.log('Mocks:', USERS_LIST_MOCK);
    // // localStorage.setItem(email, password)
    // return USERS_LIST_MOCK.find((user: UserJSONLoginRequest) => 
    //   user.email === email && 
    //   user.password === password)
    const userLogin:UserJSONLoginRequest = {
      email: emailSent, password: passwordSent
    }

    const response = await axios.post<UserJSONResponse>(REST_SERVER_URL + '/login', userLogin)
    
    localStorage.setItem('id', response.data.id.toString())

    return UserType.fromJson(response.data)
  }

  async alreadyRegisteredUsername(username: string) {
    const foundUser = USERS_LIST_MOCK.find(user => 
      user.email !== undefined && 
      user.email === username
    )
    return !foundUser
  }

  async createUser(user: UserType) {
    const userJSON = { ...user }
    USERS_LIST_MOCK.push(userJSON)
    return userJSON  
  }
}

export const userService = new UserService()