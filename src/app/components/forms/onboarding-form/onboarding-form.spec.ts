import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth';
import { OnboardingForm } from './onboarding-form';
import * as http from '@angular/common/http'

describe('OnboardingForm', () => {
  let component: OnboardingForm;
  let fixture: ComponentFixture<OnboardingForm>;
  let authServiceMock: { setUsername: ReturnType<typeof vi.fn> };
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authServiceMock = { setUsername: vi.fn() };
    routerMock = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [OnboardingForm],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        http.provideHttpClient(),
        provideRouter([])
      ],

    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    it('should be invalid when username is empty', () => {
      component['onboardingForm'].setValue({ username: '' });
      expect(component['onboardingForm'].valid).toBe(false);
    });

    it('should be valid when username is provided', () => {
      component['onboardingForm'].setValue({ username: 'alice' });
      expect(component['onboardingForm'].valid).toBe(true);
    });

    it('should have required error when username is empty', () => {
      const control = component['onboardingForm'].get('username')!;
      control.markAsTouched();
      expect(control.hasError('required')).toBe(true);
    });
  });

  describe('onSubmit()', () => {
    it('should call authService.setUsername with the form value on valid submit', () => {
      component['onboardingForm'].setValue({ username: 'alice' });
      component.onSubmit(new Event('submit'));
      expect(authServiceMock.setUsername).toHaveBeenCalledWith('alice');
    });

    it('should navigate to "/" on valid submit', () => {
      component['onboardingForm'].setValue({ username: 'alice' });
      component.onSubmit(new Event('submit'));
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should not call authService.setUsername when form is invalid', () => {
      component['onboardingForm'].setValue({ username: '' });
      component.onSubmit(new Event('submit'));
      expect(authServiceMock.setUsername).not.toHaveBeenCalled();
    });

    it('should not navigate when form is invalid', () => {
      component['onboardingForm'].setValue({ username: '' });
      component.onSubmit(new Event('submit'));
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should prevent default form submission', () => {
      const event = new Event('submit');
      vi.spyOn(event, 'preventDefault');
      component.onSubmit(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
