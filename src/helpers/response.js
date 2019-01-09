export default class Response {
  constructor(status, code, messages, data) {
    this.status = status;
    this.code = code;
    this.messages = messages;
    this.data = data;
  }
}
