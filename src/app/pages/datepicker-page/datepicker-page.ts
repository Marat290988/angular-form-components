import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiDatepicker } from '../../components/ui-datepicker/ui-datepicker';
import { Highlight } from 'ngx-highlightjs';

@Component({
	selector: 'datepicker-page',
	templateUrl: './datepicker-page.html',
	styleUrls: ['./datepicker-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, UiDatepicker, FormsModule, ReactiveFormsModule, Highlight]
})
export class DatepickerPage {		code = 
`@Component({
  selector: 'datepicker-page',
  template: \`
    <form [formGroup]="formGroup">
      <ui-datepicker 
        [labelName]="'Date Picker Test'" 
        [formControl]="formGroup.controls.dateControl" />
    </form>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiSelect, FormsModule, ReactiveFormsModule]
})
export class SelectPage {
  formGroup = new FormGroup({
    dateControl: new FormControl('', [Validators.required])
  });
}
`;

	formGroup = new FormGroup({
		dateControl: new FormControl(null, [Validators.required])
	});
}
