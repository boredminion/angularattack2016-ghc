export interface IMessage {
  $key?: string;
  text: string;
  author: string;
  uid: string;
  link: string;
}

export class Message implements IMessage {
  text: string;
  author: string;
  uid: string;
  link: string;
  constructor(text: string, author: string, uid: string, link: string) {
    this.text = text;
    this.author = author;
    this.uid = uid;
    this.link = link;
  }
}
