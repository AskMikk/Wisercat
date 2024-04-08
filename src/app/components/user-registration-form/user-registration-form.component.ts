import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customNumberValidator } from '../../validators/custom-number.validator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { UiMessageComponent } from '../shared/ui-message/ui-message.component';


@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, UiMessageComponent, MatCardModule ],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  userForm!: FormGroup;
  formMessage: string = '';
  messageType: 'info' | 'error' | 'success' = 'info';
  showMessage: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workingExperience: ['', [Validators.required, customNumberValidator(1)]]
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.showFormMessage('Form is successfully submitted.', 'success');
    } else {
      this.showFormMessage('Form is not valid. Please review your input.', 'error');
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.showFormMessage('Form has been cleared.', 'info');
  }

  onFieldFocus(fieldName: string): void {
    const control = this.userForm.get(fieldName);
    if (control) {
      control.markAsPristine();
      control.markAsUntouched();
    }
  }

  private showFormMessage(message: string, messageType: 'info' | 'error' | 'success'): void {
    this.formMessage = message;
    this.messageType = messageType;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }
}