import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-message.component.html',
  styleUrl: './ui-message.component.scss'
})
export class UiMessageComponent {
  @Input() text: string = '';
  @Input() type: 'info' | 'error' | 'success' = 'info';
}