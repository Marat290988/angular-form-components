import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UiSelect} from '../../components/ui-select/ui-select';
import {Highlight} from 'ngx-highlightjs';

export const codeName: Record<number, string> = {
	1: 'Electronics',
	2: 'Clothing & Accessories',
	3: 'Home & Kitchen'
};

@Component({
	selector: 'select-page',
	templateUrl: './select-page.html',
	styleUrls: ['./select-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, UiSelect, FormsModule, ReactiveFormsModule, Highlight]
})
export class SelectPage {
	code = `@Component({
  selector: 'select-page',
  template: \`
    <form [formGroup]="formGroup">
      <ui-select 
        [labelName]="'Select Test'" 
        [formControl]="formGroup.controls.selectControl" 
        [options]="options" />
    </form>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiSelect, FormsModule, ReactiveFormsModule]
})
export class SelectPage {
  formGroup = new FormGroup({
    selectControl: new FormControl(null, [Validators.required])
  });
}
`;

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
		}
	];

	formGroup = new FormGroup({
		selectControl: new FormControl('', [Validators.required])
	});
}
