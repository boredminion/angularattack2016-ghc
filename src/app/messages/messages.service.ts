import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Observable} from 'rxjs/Rx';
import {IMessage, Message} from './message';

@Injectable()
export class MessagesService {
  messages$: FirebaseListObservable<IMessage[]>;
  limitedMessages$: FirebaseListObservable<IMessage[]>;

  constructor(private af: AngularFire, private authService: AuthService) {}

  getMessages(): void {
    this.messages$ = this.af.database.list('/messages') as FirebaseListObservable<IMessage[]>;
    this.limitedMessages$ = this.af.database.list('/messages', {query: {limitToLast: 20}}) as FirebaseListObservable<IMessage[]>;
  }

  removeMessages(): void { this.af.database.list(`/messages`).remove(); }

  sendMessage(text: string): Promise<any> {
    return this.messages$.push(new Message(text, this.authService.username, this.authService.id));
  }
}
