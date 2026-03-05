import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedForm } from './breed-form';

describe('BreedForm', () => {
  let component: BreedForm;
  let fixture: ComponentFixture<BreedForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with default values', () => {
    const breedForm = component.breedForm;
    expect(breedForm).toBeDefined();
    expect(breedForm.get('breedName')?.value).toBe('');
    expect(breedForm.get('breedAge')?.value).toBe(0);
    expect(breedForm.get('breedWeight')?.value).toBe(0);
    expect(breedForm.get('breedHeight')?.value).toBe(0);
    expect(breedForm.get('breedGroup')?.value).toBe('');
    expect(breedForm.get('breedTemperament')?.value).toBe('');
    expect(breedForm.get('breedLifeSpan')?.value).toBe('');
    expect(breedForm.get('breedImageUrl')?.value).toBe('');
  });

  it('should emit breedSubmitted event on valid form submission', () => {
    vi.spyOn(component.breedSubmitted, 'emit');

    component.breedForm.setValue({
      breedName: 'Labrador',
      breedAge: 5,
      breedWeight: 30,
      breedHeight: 60,
      breedGroup: 'Sporting',
      breedTemperament: 'Friendly',
      breedLifeSpan: '10-12 years',
      breedImageUrl: 'http://example.com/labrador.jpg',
    });

    component.onSubmit();

    expect(component.breedSubmitted.emit).toHaveBeenCalledWith({
      breedName: 'Labrador',
      breedAge: 5,
      breedWeight: 30,
      breedHeight: 60,
      breedGroup: 'Sporting',
      breedTemperament: 'Friendly',
      breedLifeSpan: '10-12 years',
      breedImageUrl: 'http://example.com/labrador.jpg',
    });
  });

  it('should not emit breedSubmitted event on invalid form submission', () => {
    vi.spyOn(component.breedSubmitted, 'emit');

    component.breedForm.setValue({
      breedName: '',
      breedAge: -1,
      breedWeight: -5,
      breedHeight: -10,
      breedGroup: '',
      breedTemperament: '',
      breedLifeSpan: '',
      breedImageUrl: '',
    });

    component.onSubmit();

    expect(component.breedSubmitted.emit).not.toHaveBeenCalled();
  });

  it('should emit formClosed event on cancel button click', () => {
    vi.spyOn(component.formClosed, 'emit');

    const element = fixture.nativeElement as HTMLElement;
    const cancelButton = element.querySelector('button[type="button"].cancel') as HTMLButtonElement;
    cancelButton?.click();

    expect(component.formClosed.emit).toHaveBeenCalled();
  });

  it('should have cancel and submit buttons with correct classes', () => {
    const element = fixture.nativeElement as HTMLElement;
    const cancelButton = element.querySelector('button[type="button"].cancel') as HTMLButtonElement;
    const submitButton = element.querySelector('button[type="submit"].submit') as HTMLButtonElement;

    expect(cancelButton).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should have all form controls in the template', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[formControlName="breedName"]')).toBeTruthy();
    expect(element.querySelector('[formControlName="breedAge"]')).toBeTruthy();
    expect(element.querySelector('[formControlName="breedWeight"]')).toBeTruthy();
    expect(element.querySelector('[formControlName="breedHeight"]')).toBeTruthy();
    expect(element.querySelector('[formControlName="breedGroup"]')).toBeTruthy();
    expect(element.querySelector('[formControlName="breedTemperament"]')).toBeTruthy();
    expect(element.querySelector('[formControlName="breedLifeSpan"]')).toBeTruthy();
    expect(element.querySelector('[formControlName="breedImageUrl"]')).toBeTruthy();
  });

  it('should have proper placeholder texts in form text input fields', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(
      element.querySelector('input[formControlName="breedName"]')?.getAttribute('placeholder'),
    ).toBe('Breed Name');
    expect(
      element
        .querySelector('input[formControlName="breedTemperament"]')
        ?.getAttribute('placeholder'),
    ).toBe('Breed Temperament');
    expect(
      element.querySelector('input[formControlName="breedLifeSpan"]')?.getAttribute('placeholder'),
    ).toBe('Breed Life Span');
    expect(
      element.querySelector('input[formControlName="breedImageUrl"]')?.getAttribute('placeholder'),
    ).toBe('Breed Image URL');
  });

  it('should have correct input types for form controls', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('input[formControlName="breedName"]')?.getAttribute('type')).toBe(
      'text',
    );
    expect(element.querySelector('input[formControlName="breedGroup"]')?.getAttribute('type')).toBe(
      'text',
    );
    expect(
      element.querySelector('input[formControlName="breedTemperament"]')?.getAttribute('type'),
    ).toBe('text');
    expect(
      element.querySelector('input[formControlName="breedLifeSpan"]')?.getAttribute('type'),
    ).toBe('text');
    expect(
      element.querySelector('input[formControlName="breedImageUrl"]')?.getAttribute('type'),
    ).toBe('text');
  });
});
