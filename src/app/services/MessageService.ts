import { Injectable } from '@angular/core';
import { MessageType } from '../models/message-types.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private showMessage: boolean = false;
  private formMessage: string = '';
  private messageType: MessageType = 'info';
  private timeoutRef: any = null;

  public showFormMessage(message: string, messageType: MessageType): void {
    clearTimeout(this.timeoutRef);
    this.formMessage = message;
    this.messageType = messageType;
    this.showMessage = true;
    this.timeoutRef = setTimeout(() => this.hideMessage(), 5000);
  }

  private hideMessage(): void {
    this.showMessage = false;
  }

  public getMessage(): { message: string; type: MessageType; visible: boolean } {
    return { message: this.formMessage, type: this.messageType, visible: this.showMessage };
  }
}
