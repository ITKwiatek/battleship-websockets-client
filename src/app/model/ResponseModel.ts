
export class ResponseModel {
    From: string;
    Message:string;
    Command:string;

  constructor(from: string, message: string, command: string) {
    this.From = from
    this.Message = message
    this.Command = command
  }
}