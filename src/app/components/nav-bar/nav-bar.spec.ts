import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBar } from './nav-bar';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock-home',
  template: `<p>Mock Home Component</p>`,
})
class MockHomeComponent {}

@Component({
  selector: 'app-mock-dashboard',
  template: `<p>Mock Dashboard Component</p>`,
})
class MockDashboardComponent {}

describe('NavBar', () => {
  let component: NavBar;
  let fixture: ComponentFixture<NavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBar],
      providers: [
        provideRouter([
          { path: '', loadChildren: () => MockHomeComponent },
          { path: 'dashboard', loadChildren: () => MockDashboardComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have links to Home and Dashboard', () => {
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll('a');
    const linkHrefs = Array.from(links).map((link) => link.getAttribute('href'));
    expect(linkHrefs).toContain('/');
    expect(linkHrefs).toContain('/dashboard');
  });

  it('should display the correct link texts', () => {
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll('a');
    const linkTexts = Array.from(links).map((link) => link.textContent?.trim());
    expect(linkTexts).toContain('🐶');
    expect(linkTexts).toContain('Dashboard');
    expect(linkTexts).toContain('🐕‍🦺');
  });

  it('should have correct minimal CSS classes for styling', () => {
    const element = fixture.nativeElement as HTMLElement;
    const navBarDiv = element.querySelector('div');
    expect(navBarDiv).toBeTruthy();
    expect(navBarDiv?.classList).toContain('fixed');
    expect(navBarDiv?.classList).toContain('inset-0');
    expect(navBarDiv?.classList).toContain('w-screen');
    expect(navBarDiv?.classList).toContain('flex');
    expect(navBarDiv?.classList).toContain('items-center');
    expect(navBarDiv?.classList).toContain('justify-between');
  });

  it('should have cursor-pointer class on links', () => {
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
      expect(link.classList).toContain('cursor-pointer');
    });
  });

  it('should have correct text color classes on links', () => {
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
      expect(link.classList).toContain('text-white');
    });
  });
});
