export interface IMessage {
  $key?: string;
  text: string;
  author: string;
  uid: string;
}

export class Message implements IMessage {
  text: string;
  author: string;
  uid: string;
  constructor(text: string, author: string, uid: string) {
    this.text = text;
    this.author = author;
    this.uid = uid;
  }
}
