import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form.component';
import { MessageService } from '../../services/MessageService';
import { ValidationService } from '../../services/ValidationService';

describe('UserRegistrationFormComponent', () => {
    let component: UserRegistrationFormComponent;
    let fixture: ComponentFixture<UserRegistrationFormComponent>;
    let mockMessageService: jasmine.SpyObj<MessageService>;
    let mockValidationService: jasmine.SpyObj<ValidationService>;

    beforeEach(async () => {
        mockMessageService = jasmine.createSpyObj('MessageService', ['showFormMessage', 'getMessage']);
        mockValidationService = jasmine.createSpyObj('ValidationService', ['validateAllFormFields']);

        mockMessageService.getMessage.and.returnValue({
            message: 'Sample message',
            type: 'info',
            visible: true
        });

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                UserRegistrationFormComponent
            ],
            providers: [
                { provide: MessageService, useValue: mockMessageService },
                { provide: ValidationService, useValue: mockValidationService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserRegistrationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('form valid when all fields are filled correctly', () => {
    component.userForm.setValue({
      name: 'Jane',
      surname: 'Doe',
      email: 'jane.doe@example.com',
      workingExperience: '3'
    });
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should display error message when form is invalid after submission', () => {
    component.submitForm();
    expect(mockMessageService.showFormMessage).toHaveBeenCalledWith('Form is not valid.', 'error');
  });

  it('should validate fields when form is submitted', () => {
    component.submitForm();
    expect(mockValidationService.validateAllFormFields).toHaveBeenCalledWith(component.userForm);
  });

  it('should handle form submission with success', fakeAsync(() => {
    component.userForm.setValue({
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      workingExperience: '5'
    });
    component.submitForm();
    tick();
    expect(mockMessageService.showFormMessage).toHaveBeenCalledWith('Form is successfully submitted.', 'success');
  }));

  it('should display error message when form is invalid and submitted', () => {
    component.userForm.reset();
    component.submitForm();
    expect(mockMessageService.showFormMessage).toHaveBeenCalledWith('Form is not valid.', 'error');
  });
});
