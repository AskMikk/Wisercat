import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMessageComponent } from './ui-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UiMessageComponent', () => {
  let component: UiMessageComponent;
  let fixture: ComponentFixture<UiMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiMessageComponent,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.text).toBe('');
    expect(component.type).toBe('info');
  });

  it('should display message and apply correct type class when text is set', () => {
    component.text = 'Test message';
    component.type = 'error';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const messageDiv = compiled.querySelector('.message');
    expect(messageDiv.textContent).toContain('Test message');
    expect(messageDiv.classList.contains('error')).toBeTrue();
  });

  it('should apply different classes based on type', () => {
    component.text = 'Visible message';
    component.type = 'success';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const messageDiv = compiled.querySelector('.message');
    expect(messageDiv.classList.contains('success')).toBeTrue();
    expect(messageDiv.classList.contains('error')).toBeFalse();
  });
});
