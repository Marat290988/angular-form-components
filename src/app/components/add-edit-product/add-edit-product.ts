import {Dialog, DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UiInput} from '../ui-input/ui-input';
import {UiSelect} from '../ui-select/ui-select';
import {UiDatepicker} from '../ui-datepicker/ui-datepicker';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {IProduct} from './product.model';

const FORM_NAMES = {
	NAME: 'name',
	PRICE: 'price',
	CATEGORY: 'category',
	QUANTITY: 'quantity',
	DATE_OF_SALE: 'dateOfSale'
};

@Component({
	selector: 'add-edit-product',
	templateUrl: './add-edit-product.html',
	styleUrls: ['./add-edit-product.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, UiInput, UiSelect, UiDatepicker]
})
export class AddEditProduct {
	readonly dialogData: {product?: IProduct} = inject(DIALOG_DATA);
	readonly dialogRef = inject(DialogRef);
	readonly form = new FormGroup({
		[FORM_NAMES.NAME]: new FormControl<null | string>(null, [Validators.required]),
		[FORM_NAMES.PRICE]: new FormControl<null | number>(null, [Validators.required]),
		[FORM_NAMES.CATEGORY]: new FormControl<null | number>(null, [Validators.required]),
		[FORM_NAMES.QUANTITY]: new FormControl<null | number>(null, [
			Validators.required,
			Validators.min(0),
			Validators.max(9999)
		]),
		[FORM_NAMES.DATE_OF_SALE]: new FormControl<null | Date>(null, [Validators.required])
	});
	readonly FORM_NAMES = FORM_NAMES;
	readonly isInvalid = toSignal(this.form.valueChanges.pipe(map(() => this.form.invalid)));
	readonly options = [
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

	ngOnInit() {
		console.log(this.dialogData);
		if (this.dialogData && this.dialogData.product) {
			this.form.patchValue({
				[FORM_NAMES.NAME]: this.dialogData.product.name,
				[FORM_NAMES.PRICE]: this.dialogData.product.price,
				[FORM_NAMES.CATEGORY]: this.dialogData.product.category,
				[FORM_NAMES.QUANTITY]: this.dialogData.product.quantity,
				[FORM_NAMES.DATE_OF_SALE]: this.dialogData.product.dateOfSale
			});
		}
	}

	save() {
		const product: IProduct = {
			name: this.form.value[FORM_NAMES.NAME] as string,
			price: +this.form.value[FORM_NAMES.PRICE]! as number,
			category: this.form.value[FORM_NAMES.CATEGORY] as number,
			quantity: this.form.value[FORM_NAMES.QUANTITY] as number,
			dateOfSale: this.form.value[FORM_NAMES.DATE_OF_SALE] as Date
		};
		this.dialogRef.close(product);
	}
}

export const openAddEditProductDialog = (
	dialog: Dialog,
	product?: IProduct
): DialogRef<IProduct | null, AddEditProduct> => {
	return dialog.open(AddEditProduct, {
		backdropClass: ['dialog-backdrop-blur'],
		panelClass: ['custom-dialog', 'add-edit-product-dialog'],
		maxWidth: '500px',
		width: '100%',
		autoFocus: false,
		data: {
			product: product
		}
	});
};
