import { Component, signal } from '@angular/core';
import { CardActionDirective } from './card-action.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardActionType } from '@type/card';

@Component({
  imports: [CardActionDirective],
  template: `<button [appCardAction]="mockDirectiveState()">Test Content</button>`,
})
class TestComponent {
  mockDirectiveState = signal<CardActionType>('like');
}

describe('cardactiondirective', () => {
  let testComponent: ComponentFixture<TestComponent>;
  let testTemplate: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, CardActionDirective],
    }).compileComponents();
    testComponent = TestBed.createComponent(TestComponent);
    testTemplate = testComponent.componentInstance;
  });

  it('should create an instance', () => {
    const directive = testComponent.debugElement.query(By.directive(CardActionDirective));
    expect(directive).toBeTruthy();
  });

  it('should have base class always', () => {
    testComponent.detectChanges();
    const directiveEl = testComponent.debugElement.query(By.directive(CardActionDirective));
    expect(Object.keys(directiveEl.classes)).toContain('w-full');
    expect(Object.keys(directiveEl.classes)).toContain('h-full');
    expect(Object.keys(directiveEl.classes)).toContain('text-white');
    expect(Object.keys(directiveEl.classes)).toContain('py-2');
    expect(Object.keys(directiveEl.classes)).toContain('rounded-full');
    expect(Object.keys(directiveEl.classes)).toContain('cursor-pointer');
    expect(Object.keys(directiveEl.classes)).toContain('transition-colors');
    expect(Object.keys(directiveEl.classes)).toContain('duration-200');
  });

  it('should apply correct classes for like action', () => {
    testTemplate['mockDirectiveState'].set('like');
    testComponent.detectChanges();
    const directiveEl = testComponent.debugElement.query(By.directive(CardActionDirective));
    expect(directiveEl.classes['bg-green-500']).toBeTruthy();
    expect(directiveEl.classes['hover:bg-green-700']).toBeTruthy();
  });

  it('should apply correct classes for dislike action', () => {
    testTemplate['mockDirectiveState'].set('dislike');
    testComponent.detectChanges();
    const directiveEl = testComponent.debugElement.query(By.directive(CardActionDirective));
    expect(directiveEl.classes['bg-blue-500']).toBeTruthy();
    expect(directiveEl.classes['hover:bg-blue-700']).toBeTruthy();
  });

  it('should apply correct classes for neutral action', () => {
    testTemplate['mockDirectiveState'].set('idle');
    testComponent.detectChanges();
    const directiveEl = testComponent.debugElement.query(By.directive(CardActionDirective));
    expect(directiveEl.classes['bg-gray-500']).toBeTruthy();
    expect(directiveEl.classes['hover:bg-gray-700']).toBeTruthy();
  });

  it('should stop propagation on click', () => {
    testComponent.detectChanges();
    const directiveEl = testComponent.debugElement.query(By.directive(CardActionDirective));
    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');
    directiveEl.triggerEventHandler('click', event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
