import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { UiInput } from '../../components/ui-input/ui-input';

@Component({
	selector: 'input-page',
	templateUrl: './input-page.html',
	styleUrls: ['./input-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, Highlight, UiInput, FormsModule, ReactiveFormsModule]
})
export class InputPage {
	code = 
`@Component({
  selector: 'input-page',
  template: \`
    <form [formGroup]="formGroup">
      <ui-input
        [formControl]="formGroup.controls.inputControl"
        [showClearIcon]="true"
        [isOnlyNumber]="true"
        [labelName]="'Input Test'"
        [fractionDigits]="2" />
    </form>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiInput, FormsModule, ReactiveFormsModule]
})
export class InputPage {
  formGroup = new FormGroup({
    inputControl: new FormControl('', [Validators.required])
  });
}
`;

	formGroup = new FormGroup({
		inputControl: new FormControl('', [Validators.required])
	});
}
