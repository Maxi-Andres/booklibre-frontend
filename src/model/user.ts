import { ValidationMessage } from "@/validation/validationMessage"

export type UserJSONLoginRequest = {
  mail: string
  password: string
}

export interface UserJSONResponse {
  mail:string
  name:string
  id:number
}

export interface UserJSONRoginRequest {
  name:string
  mail:string
  password:string
  passwordRetry:string
}

export class UserType {
  errors: ValidationMessage[] = []

  public mail: string = ''.trim()
  public password: string = ''.trim()  
  public name: string = 'nombre'.trim()
  

  constructor(mail:string,password:string, name:string ) {
    this.mail = mail
    this.password = password
    this.name = name
  }

  static fromJson(userJSON: UserJSONResponse): UserType {
  return Object.assign(new UserType(userJSON.mail,'', userJSON.name,),userJSON, {})
  }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }

  validate() {
  this.errors = [];

  if (!this.mail?.trim()) {
    this.addError('email', 'Debe ingresar un email');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.mail)) {
      this.addError('email', 'El formato del email no es válido');
    }
  }


  if (!this.password) {
    this.addError('password', 'Debe ingresar una contraseña');
  } else if (this.password.length < 6) {
    this.addError('password', 'La contraseña debe tener al menos 6 caracteres');
  }

  // if(!this.name){
  //   this.addError('name','Debe ingresar un nombre')
  // }
  return this.errors;
}
}