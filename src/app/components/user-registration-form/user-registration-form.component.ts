import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customNumberValidator } from '../../validators/custom-number.validator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { UiMessageComponent } from '../shared/ui-message/ui-message.component';
import { ValidationService } from '../../services/ValidationService';
import { MessageService } from '../../services/MessageService';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, UiMessageComponent, MatCardModule],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  userForm!: FormGroup;
  formFields!: any[];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.configureFormFields();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workingExperience: ['', [Validators.required, customNumberValidator(1)]]
    });
  }

  configureFormFields(): void {
    this.formFields = [
      { label: 'Name', controlName: 'name', type: 'text' },
      { label: 'Surname', controlName: 'surname', type: 'text' },
      {
        label: 'Email', controlName: 'email', type: 'email', errors: [
          { type: 'email' }
        ]
      },
      {
        label: 'Working Experience', controlName: 'workingExperience', type: 'text', errors: [
          { type: 'invalidNumber' }
        ]
      }
    ];
  }
  
  getErrorMessage(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    const field = this.formFields.find(f => f.controlName === controlName);
    const label = field ? field.label : controlName;
  
    if (control && control.errors) {
      if (control.hasError('required')) {
        return `${label} is required.`;
      }
      if (control.hasError('email')) {
        return 'Please enter a valid email address.';
      }
      if (control.hasError('invalidNumber')) {
        return 'Please enter a valid number. Only one digit after the decimal is allowed.';
      }
    }
    return null;
  }
  
  submitForm(): void {
    if (this.userForm.valid) {
      this.messageService.showFormMessage('Form is successfully submitted.', 'success');
      this.resetForm(); 
    } else {
      this.messageService.showFormMessage('Form is not valid.', 'error');
      this.validationService.validateAllFormFields(this.userForm);
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.messageService.showFormMessage('Form has been cleared.', 'info');
  }

  onFieldFocus(fieldName: string): void {
    const control = this.userForm.get(fieldName);
    control?.markAsPristine();
    control?.markAsUntouched();
  }
  
  getMessageData() {
    return this.messageService.getMessage();
  }
}
