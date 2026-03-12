import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    routerMock = { navigate: vi.fn() };
    vi.mocked(localStorage.getItem).mockReturnValue(null);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should read username from localStorage on init', () => {
      expect(localStorage.getItem).toHaveBeenCalledWith('username');
    });

    it('should have empty username when localStorage returns null', () => {
      expect(service.getUsername()).toBe('');
    });

    it('should not be authenticated when username is empty', () => {
      expect(service.isAuthenticated).toBe(false);
    });

    it('should restore username from localStorage on init', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('john');
      const freshService = TestBed.runInInjectionContext(() => new AuthService());
      expect(freshService.getUsername()).toBe('john');
    });

    it('should be authenticated when username exists in localStorage', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('john');
      const freshService = TestBed.runInInjectionContext(() => new AuthService());
      expect(freshService.isAuthenticated).toBe(true);
    });
  });

  describe('setUsername()', () => {
    it('should update the username signal', () => {
      service.setUsername('alice');
      expect(service.getUsername()).toBe('alice');
    });

    it('should persist username to localStorage', () => {
      service.setUsername('alice');
      expect(localStorage.setItem).toHaveBeenCalledWith('username', 'alice');
    });

    it('should set isAuthenticated to true', () => {
      service.setUsername('alice');
      expect(service.isAuthenticated).toBe(true);
    });

    it('should update the readonly username signal', () => {
      service.setUsername('alice');
      expect(service.username()).toBe('alice');
    });
  });

  describe('clearUsername()', () => {
    beforeEach(() => {
      service.setUsername('alice');
    });

    it('should clear the username signal', () => {
      service.clearUsername();
      expect(service.getUsername()).toBe('');
    });

    it('should remove username from localStorage', () => {
      service.clearUsername();
      expect(localStorage.removeItem).toHaveBeenCalledWith('username');
    });

    it('should set isAuthenticated to false', () => {
      service.clearUsername();
      expect(service.isAuthenticated).toBe(false);
    });

    it('should navigate to onboarding', () => {
      service.clearUsername();
      expect(routerMock.navigate).toHaveBeenCalledWith(['onboarding']);
    });
  });

  describe('username signal reactivity', () => {
    it('should update after setUsername()', () => {
      expect(service.username()).toBe('');
      service.setUsername('bob');
      expect(service.username()).toBe('bob');
    });

    it('should clear after clearUsername()', () => {
      service.setUsername('bob');
      service.clearUsername();
      expect(service.username()).toBe('');
    });
  });
});
