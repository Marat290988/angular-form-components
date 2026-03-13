import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'thousandsSpace'
})
export class ThousandsSpacePipe implements PipeTransform {
	transform(value: number | string | null | undefined): string {
		if (value === null || value === undefined) return '';
		const numberValue = Math.trunc(Number(value));
		if (isNaN(numberValue)) return '';
		return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}
}

@Pipe({
	name: 'decimalSpace'
})
export class DecimalSpacePipe implements PipeTransform {
	transform(value: number | string | null | undefined): string {
		if (value == null) return '';
		const numberValue = Number(value);
		if (isNaN(numberValue)) return '';
		const fixed = numberValue.toFixed(2);
		const [integer, decimal] = fixed.split('.');
		const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		return `${formattedInteger}.${decimal}`;
	}
}
