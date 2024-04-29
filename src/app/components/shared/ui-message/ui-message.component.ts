import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageType } from '../../../models/message-types.interface';

@Component({
  selector: 'app-ui-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-message.component.html',
  styleUrl: './ui-message.component.scss'
})
export class UiMessageComponent {
  @Input() text = '';
  @Input() type: MessageType = 'info';
}