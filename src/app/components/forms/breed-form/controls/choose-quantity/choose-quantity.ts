import { Component, input, signal } from '@angular/core';
type ValueChangeFn = (newValue: number) => void;
type TouchedChangeFn = (newValue: boolean) => void;
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
@Component({
  selector: 'app-choose-quantity',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChooseQuantity,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ChooseQuantity,
      multi: true,
    },
  ],
  template: `
    <div class="flex items-center">
      <button
        type="button"
        (click)="onDecrease()"
        class="bg-slate-300 text-slate-800 px-3 py-1 rounded-l disabled:opacity-50"
        [disabled]="disabled"
      >
        -
      </button>
      <div>
        <span class="w-16 text-center block">{{ currentValue() }}</span>
      </div>
      <button
        type="button"
        (click)="onIncrease()"
        class="bg-slate-300 text-slate-800 px-3 py-1 rounded-r disabled:opacity-50"
        [disabled]="disabled"
      >
        +
      </button>
    </div>
  `,
})
export class ChooseQuantity implements ControlValueAccessor, Validator {
  readonly minValue = input(0);
  readonly maxValue = input(Number.MAX_SAFE_INTEGER);

  readonly currentValue = signal(0);
  onChange!: ValueChangeFn;
  onTouched!: TouchedChangeFn;
  disabled = false;

  writeValue(value: number): void {
    this.currentValue.set(value);
  }

  registerOnChange(onChange: ValueChangeFn): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: TouchedChangeFn): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onIncrease() {
    if (!this.disabled) {
      this.currentValue.set(this.currentValue() + 1);
      this.onChange(this.currentValue());
      this.onTouched(true);
    }
  }

  onDecrease() {
    if (!this.disabled) {
      this.currentValue.set(this.currentValue() - 1);
      this.onChange(this.currentValue());
      this.onTouched(true);
    }
  }

  onChangeValue(newValue: number) {
    this.currentValue.set(newValue);
    this.onChange?.(this.currentValue());
    this.onTouched?.(true);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < this.minValue()) {
      return { min: { requiredMin: this.minValue(), actual: value } };
    }
    if (value > this.maxValue()) {
      return { max: { requiredMax: this.maxValue(), actual: value } };
    }
    return null;
  }
}
