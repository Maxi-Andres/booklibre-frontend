import { UserLogin } from '@/model/user'
import { USERS_LIST_MOCK } from '../data/userMock'

class UserService {
  async getAllUsers(){
    return USERS_LIST_MOCK.map(UserLogin.fromJson)
  }

  async getUser(mail: string, password: string) {
    console.log('Mocks:', USERS_LIST_MOCK);
    // localStorage.setItem(mail, password)
    return USERS_LIST_MOCK.find(user => 
      user.mail !== undefined && 
      user.mail === mail && 
      user.password === password)
  }

  async alreadyRegisteredUsername(username: string) {
    const foundUser = USERS_LIST_MOCK.find(user => 
      user.mail !== undefined && 
      user.mail === username
    )
    return !foundUser
  }

  async createUser(user: UserLogin) {
    const userJSON = { ...user }
    USERS_LIST_MOCK.push(userJSON)
    return userJSON  
  }
}

export const userService = new UserService()