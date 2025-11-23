import { Component, signal } from '@angular/core';
import { UiInput } from './components/ui-input/ui-input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiSelect } from './components/ui-select/ui-select';
import { UiDatepicker } from './components/ui-datepicker/ui-datepicker';

@Component({
  selector: 'app-root',
  imports: [
    UiInput,
    UiSelect,
    UiDatepicker,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('forms');
  formGroup = new FormGroup({
    inputControl: new FormControl('dsfdsdf@fsg.gfd', [Validators.required]),
    selectControl: new FormControl(null, [Validators.required])
  });
  options = [
    {
      title: 'Electronics',
      value: 1
    },
    {
      title: 'Clothing & Accessories',
      value: 2
    },
    {
      title: 'Home & Kitchen',
      value: 3
    },
  ]

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(console.log);
  }
}
