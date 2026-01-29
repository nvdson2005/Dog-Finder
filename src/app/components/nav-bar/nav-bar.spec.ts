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
class MockDashboardComponent {
}

describe('NavBar', () => {
  let component: NavBar;
  let fixture: ComponentFixture<NavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBar],
      providers: [
        provideRouter([
          {path: '', loadChildren: () => MockHomeComponent},
          {path: 'dashboard', loadChildren: () => MockDashboardComponent},
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
