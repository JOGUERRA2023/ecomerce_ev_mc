import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChatMessage } from '@shared/interfaces/ChatMessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  http = inject(HttpClient);

  sendMessage(currentMessage: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>('/api/chat', { message: currentMessage });
  }
}
