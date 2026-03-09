import { USERS_LIST_MOCK } from "../data/userMock"
import { ValidationMessage } from "./validationMessage"

export type UserJSON = {
  mail: string
  password: string
}

export class UserType {
  public mail: string = ''.trim()
  public password: string = ''.trim()  
  errors: ValidationMessage[] = []

  constructor(mail:string,password:string ) {
    this.mail = mail
    this.password = password

  }

  static fromJson(userJSON: UserJSON): UserType {
  return new UserType(
    userJSON.mail || '',      
    userJSON.password || '',  

     )
  }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }

  validate(checkMock: boolean = true) {
  this.errors = [];
  
  // validacion de mail
  if (!this.mail?.trim()) {
    this.addError('email', 'Debe ingresar un email');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.mail)) {
      this.addError('email', 'El formato del email no es válido');
    }
  }

  // validacion de pass
  if (!this.password) {
    this.addError('password', 'Debe ingresar una contraseña');
  } else if (this.password.length < 6) {
    this.addError('password', 'La contraseña debe tener al menos 6 caracteres');
  }

  // valido en el mock
  if (checkMock && this.errors.length === 0) {
    // busco el usuario en el mock
    const userByEmail = USERS_LIST_MOCK.find(user => user.mail === this.mail);
    
    if (!userByEmail) {
      // el email no existe en el mock
      this.addError('email', 'Este email no está registrado');
    } else {
      // la contraseña no coincide con la mockeada
      if (userByEmail.password !== this.password) {
        this.addError('password', 'Contraseña incorrecta');
      }
    }
  }

  return this.errors;
}
}