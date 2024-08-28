import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../../apiservices/chat.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatadmin',
  templateUrl: './chatadmin.component.html',
  styleUrl: './chatadmin.component.css'
})
export class ChatadminComponent {
  chats: any[] = [];
  currentChatMessages: any[] = [];
  currentChatUser: any;
  user: any = null;
  userId: any | null = null;
  newMessage: string = '';
  newimage: string = '';
  currentChatId: number | null = null;
  selectedFile!: File;
  showError: boolean = false;
  private echo: Echo;
  Allchats: any[] = [];
  userNames: { [userId: number]: any } = {};

  constructor(
    private chatService: ChatService,
    private Authserv: AuthApiFunctionService,
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient
  ) {
    this.echo = this.chatService.getEcho();
  }

  ngOnInit(): void {
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.userId = this.user.id;
      if (this.user.seller_id) {
        this.route.queryParams.subscribe(params => {
          if (params['chatId']) {
            this.currentChatId = +params['chatId']; // Ensure chatId is a number
            this.openChat(this.currentChatId);
          }
        });

        this.chatService.getUserChats(this.userId).subscribe(chats => {
          this.chats = chats;
          this.chats.forEach(chat => {
            this.getChatUserName(chat);
            chat.lastMessageText = chat.last_message ? chat.last_message.message : 'No messages yet';
          });
        }, error => {
          console.error('Error fetching user chats:', error);
        });
      } else {

        this.route.queryParams.subscribe(params => {
          if (params['chatId']) {
            this.currentChatId = +params['chatId']; // Ensure chatId is a number
            this.openAllchat(this.currentChatId);
          }
        });

        this.chatService.getAllChats().subscribe((data: any[]) => {
          this.Allchats = data;
          this.Allchats.forEach(chat => {
            this.getUserNameById(chat.user1).subscribe(user1Name => {
              chat.user1Name = user1Name;
            });
            this.getUserNameById(chat.user2).subscribe(user2Name => {
              chat.user2Name = user2Name;
            });
            chat.allMessages = chat.messages; // Get all messages
          });
        }, error => {
          console.error('Error fetching all chats:', error);
        });
      }
    }
  }
  getUserNameById(userId: any): Observable<string> {
    return this.Authserv.getUserByID(userId).pipe(
      map(user => user?.name || 'Unknown User'), // Use a default value for undefined
      catchError(error => {
        console.error('Error fetching user data:', error);
        return of('Unknown User');
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and listeners
    if (this.currentChatId) {
      this.echo.leaveChannel('chat.' + this.currentChatId);
    }
  }

  subscribeToChatChannel(): void {
    if (this.currentChatId) {
      this.echo.channel('chat.' + this.currentChatId)
        .listen('MessageSent', (event: any) => {
          this.currentChatMessages.push(event.message);
        });
    }
  }

  getChatUserName(chat: any): void {
    const otherUserId = chat.user1 === this.userId ? chat.user2 : chat.user1;
    this.Authserv.getUserByID(otherUserId).subscribe(data => {
      chat.otherUserName = data.name;
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }
  fetchUserNames(): void {
    this.Authserv.getuser().subscribe(users => {
      users.forEach(user => {
        this.userNames[user.id] = user.name;
      });
    }, error => {
      console.error('Error fetching user names:', error);
    });
  }
  openAllchat(chatId: number): void {
    this.chatService.getMessages(chatId).subscribe(messages => {
      this.currentChatMessages = messages;
      const chat = this.Allchats.find(c => c.id === chatId);
      if (chat) {
        this.currentChatUser = { name: `${chat.user1Name} & ${chat.user2Name}` };
      }
      // Ensure user names are fetched and assigned correctly
      this.fetchUserNames();
    }, error => {
      console.error('Error fetching messages:', error);
    });

    this.router.navigate(['/admin/chats'], { queryParams: { chatId: chatId } });
  }
  openChat(chatId: number): void {
    this.chatService.getMessages(chatId).subscribe(messages => {
      this.currentChatMessages = messages; // Ensure messages are fetched correctly
      const chat = this.chats.find(chat => chat.id === chatId);
      if (chat) {
        const otherUserId = chat.user1 === this.userId ? chat.user2 : chat.user1;
        this.Authserv.getUserByID(otherUserId).subscribe(user => {
          this.currentChatUser = user;
          this.subscribeToChatChannel();
        }, error => {
          console.error('Error fetching chat user:', error);
        });
      }
    }, error => {
      console.error('Error fetching messages:', error);
    });

    this.router.navigate(['/admin/chats'], { queryParams: { chatId: chatId } });
  }
  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      const fileUrl = URL.createObjectURL(this.selectedFile);


      this.upload(this.selectedFile).subscribe(url => {
        this.newimage = url;
        console.log(this.newimage);

      });
    }
  }

  upload(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ path: string }>('http://localhost:8000/api/upload', formData).pipe(
      map(response => response.path),
      catchError(error => {
        console.error('Upload failed', error);
        return throwError(error);
      })
    );
  }
  sendMessage(): void {
    if ((this.newMessage.trim() !== '' || this.newimage) && this.currentChatUser && this.currentChatId) {
      this.chatService.sendMessage(this.currentChatId, this.userId, this.currentChatUser.id, this.newMessage, this.newimage)
        .subscribe(message => {
          this.currentChatMessages.push(message);
          this.newMessage = '';
          this.newimage = '';
          this.showError = false;
        }, error => {
          console.error('Error sending message:', error);
          alert('Failed to send message. Please try again.');
        });
    } else {
      this.showError = true;
    }
  }
}
