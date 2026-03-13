import { ValidationMessage } from "@/validation/validationMessage"

export type UserJSON = {
  mail: string
  password: string
}

export class UserLogin {
  public mail: string = ''.trim()
  public password: string = ''.trim()  
  errors: ValidationMessage[] = []

  constructor(mail:string,password:string ) {
    this.mail = mail
    this.password = password

  }

  static fromJson(userJSON: UserJSON): UserLogin {
  return new UserLogin(
    userJSON.mail || '',      
    userJSON.password || '',  

     )
  }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }

  validate() {
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
  return this.errors;
}
}