import { Component } from '@angular/core';
import { CardActionDirective } from './card-action.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [CardActionDirective],
  template: `<div appCardAction="like"></div>`,
})
class TestComponent {}

describe('cardactiondirective', () => {
  let testComponent : ComponentFixture<TestComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, CardActionDirective]
    }).compileComponents();
    testComponent = TestBed.createComponent(TestComponent);
  })

  it('should create an instance', () => {
    const directive = testComponent.debugElement.query(By.directive(CardActionDirective));
    expect(directive).toBeTruthy();
  });
});
