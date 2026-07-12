export interface ChatMessage {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}
