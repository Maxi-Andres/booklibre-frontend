export class ValidationMessage {
  public field: string;
  public message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}