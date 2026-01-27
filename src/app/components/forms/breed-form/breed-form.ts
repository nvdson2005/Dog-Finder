import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChooseQuantity } from './controls/choose-quantity/choose-quantity';
import { tap } from 'rxjs';

export type BreedFormSubmit = {
  breedName: string;
  breedAge: number;
  breedWeight: number;
  breedHeight: number;
  breedGroup: string;
  breedTemperament: string;
  breedLifeSpan: string;
  breedImageUrl: string;
};

@Component({
  selector: 'app-breed-form',
  imports: [ReactiveFormsModule, ChooseQuantity],
  template: `
    <ng-content class="w-screen h-screen">
      <div
        ngForm="addBreedForm"
        class="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
      >
        <form
          [formGroup]="breedForm"
          class="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-4"
          (ngSubmit)="onSubmit()"
        >
          <div class="text-xl font-bold">Add New Breed to Favorites</div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Name</legend>
            <input
              formControlName="breedName"
              type="text"
              placeholder="Breed Name"
              class="border border-slate-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Age</legend>
            <app-choose-quantity
              [minValue]="0"
              [maxValue]="10"
              formControlName="breedAge"
            ></app-choose-quantity>
          </div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Weight</legend>
            <input
              formControlName="breedWeight"
              type="number"
              placeholder="Breed Weight"
              class="border p-2 rounded w-full"
            />
          </div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Height</legend>
            <input
              formControlName="breedHeight"
              type="number"
              placeholder="Breed Height"
              class="border p-2 rounded w-full"
            />
          </div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Group</legend>
            <input
              formControlName="breedGroup"
              type="text"
              placeholder="Breed Group"
              class="border p-2 rounded w-full"
            />
          </div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Temperament</legend>
            <input
              formControlName="breedTemperament"
              type="text"
              placeholder="Breed Temperament"
              class="border p-2 rounded w-full"
            />
          </div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Life Span</legend>
            <input
              formControlName="breedLifeSpan"
              type="text"
              placeholder="Breed Life Span"
              class="border p-2 rounded w-full"
            />
          </div>
          <div>
            <legend class="mb-1 font-medium text-slate-800">Breed Image URL</legend>
            <input
              formControlName="breedImageUrl"
              type="text"
              placeholder="Breed Image URL"
              class="border p-2 rounded w-full"
            />
          </div>
          <div class="w-full flex items-center justify-between">
            <button
              type="button"
              (click)="formClosed.emit()"
              class="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Add Breed
            </button>
          </div>
        </form>
      </div>
    </ng-content>
  `,
  styles: ``,
})
export class BreedForm {
  breedForm = new FormGroup({
    breedName: new FormControl(''),
    breedAge: new FormControl(0),
    breedWeight: new FormControl(0),
    breedHeight: new FormControl(0),
    breedGroup: new FormControl(''),
    breedTemperament: new FormControl(''),
    breedLifeSpan: new FormControl(''),
    breedImageUrl: new FormControl(''),
  });

  readonly breedSubmitted = output<BreedFormSubmit>();
  readonly formClosed = output<void>();

  onSubmit() {
    this.breedSubmitted.emit({
      breedName: this.breedForm.value.breedName || '',
      breedAge: this.breedForm.value.breedAge || 0,
      breedWeight: this.breedForm.value.breedWeight || 0,
      breedHeight: this.breedForm.value.breedHeight || 0,
      breedGroup: this.breedForm.value.breedGroup || '',
      breedTemperament: this.breedForm.value.breedTemperament || '',
      breedLifeSpan: this.breedForm.value.breedLifeSpan || '',
      breedImageUrl: this.breedForm.value.breedImageUrl || '',
    });
  }

  private formError = this.breedForm.statusChanges
    .pipe(
      tap((status) => {
        console.log('Form Status:', status);
      }),
    )
    .subscribe();
}
