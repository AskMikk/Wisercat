import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private showMessage: boolean = false;
  private formMessage: string = '';
  private messageType: 'info' | 'error' | 'success' = 'info';
  private timeoutRef: any = null;

  showFormMessage(message: string, messageType: 'info' | 'error' | 'success'): void {
    clearTimeout(this.timeoutRef);
    this.formMessage = message;
    this.messageType = messageType;
    this.showMessage = true;
    this.timeoutRef = setTimeout(() => this.hideMessage(), 5000);
  }

  private hideMessage(): void {
    this.showMessage = false;
  }

  public getMessage(): { message: string; type: 'info' | 'error' | 'success'; visible: boolean } {
    return { message: this.formMessage, type: this.messageType, visible: this.showMessage };
  }
}
