import { type UserJSON } from '../domain/user'

const USER1_MOCK: UserJSON  = {
  mail: 'juancarlos@hotmail.com',
  password: '112233'
}
const USER2_MOCK: UserJSON  = {
  mail: 'matiasgonzales@hotmail.com',
  password: '112233'
}


export const USERS_LIST_MOCK: UserJSON[] = [
  USER1_MOCK,
  USER2_MOCK
]