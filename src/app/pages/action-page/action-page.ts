import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {openAddEditProductDialog} from '../../components/add-edit-product/add-edit-product';
import {Dialog} from '@angular/cdk/dialog';
import {Subject, takeUntil} from 'rxjs';
import {ProductService} from './product.service';
import {codeName} from '../select-page/select-page';
import {toSignal} from '@angular/core/rxjs-interop';
import {SpaceCurrencyPipe} from './space-currency.pipe';

@Component({
	selector: 'app-action-page',
	templateUrl: './action-page.html',
	styleUrls: ['./action-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, SpaceCurrencyPipe]
})
export class ActionPage {
	readonly dialog = inject(Dialog);
	readonly productService = inject(ProductService);
	readonly destroy$ = new Subject<void>();
	readonly codeName = codeName;
	readonly products = toSignal(this.productService.products$);

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	openAddProductDialog() {
		openAddEditProductDialog(this.dialog)
			.closed.pipe(takeUntil(this.destroy$))
			.subscribe((product) => {
				if (product) {
					this.productService.addProduct(product);
				}
			});
	}

	editProduct(index: number) {
		openAddEditProductDialog(this.dialog, this.products()![index])
			.closed.pipe(takeUntil(this.destroy$))
			.subscribe((product) => {
				if (product) {
					this.productService.updateProduct(product, index);
				}
			});
	}

	deleteProduct(index: number) {
		this.productService.deleteProduct(index);
	}
}
