import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private echo: Echo;

  constructor(private http: HttpClient) {
    (window as any)['Pusher'] = Pusher;
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '23829db4e05c003d7f44',
      cluster: 'eu',
      encrypted: true
    });
  }
  getEcho(): Echo {
    return this.echo;
  }

  getOrCreateChat(user1: number, user2: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/chat`, { user1, user2 });
  }

  getMessages(chatId: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/chat/${chatId}/messages`);
  }

  getUserChats(userId: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/chat/user/${userId}`);
  }
  getAllChats(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/chats');
  }
  sendMessage(chatId: number, sender: number, receiver: number, message: string, image: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/message`, { chat_id: chatId, sender, receiver, message, image });
  }
}
