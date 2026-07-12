import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBot } from './chat-bot';
import { provideHttpClient } from '@angular/common/http';

describe('ChatBot', () => {
  let component: ChatBot;
  let fixture: ComponentFixture<ChatBot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBot],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
