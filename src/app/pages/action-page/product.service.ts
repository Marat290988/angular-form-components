import {Injectable} from '@angular/core';
import {IProduct} from '../../components/add-edit-product/product.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private readonly products = new BehaviorSubject<IProduct[]>([
		{
			name: 'Camera TQHH-5877',
			price: 1000,
			category: 1,
			quantity: 1,
			dateOfSale: new Date()
		}
	]);
	readonly products$ = this.products.asObservable();

	addProduct(product: IProduct) {
		this.products.next([...this.products.value, product]);
	}

	updateProduct(product: IProduct, index: number) {
		const products = [...this.products.value];
		products[index] = product;
		this.products.next(products);
	}

	deleteProduct(index: number) {
		const products = [...this.products.value];
		products.splice(index, 1);
		this.products.next(products);
	}
}
