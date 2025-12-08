import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'spaceCurrency',
	pure: true
})
export class SpaceCurrencyPipe implements PipeTransform {
	transform(value: number | string | null | undefined): string {
		if (value === null || value === undefined || value === '') return '';
		const num = typeof value === 'number' ? value : Number(value);
		if (!isFinite(num)) return '';
		const negative = num < 0;
		const abs = Math.abs(num);
		let decimalDigits = this.detectDecimalDigits(value, abs);
		decimalDigits = Math.min(decimalDigits, 6);
		const fixed = decimalDigits > 0 ? abs.toFixed(decimalDigits) : Math.trunc(abs).toString();
		const parts = fixed.split('.');
		const intPart = parts[0];
		const fracPart = parts[1];
		const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		const result = `${negative ? '-' : ''}${formattedInt}${fracPart ? '.' + this.trimTrailingZeros(fracPart) : ''} $`;
		return result;
	}

	private detectDecimalDigits(original: number | string, absValue: number): number {
		if (typeof original === 'string') {
			const s = original.trim();
			if (s.includes('.')) {
				const after = s.split('.')[1] ?? '';
				if (!/[eE]/.test(s)) {
					return Math.max(0, after.length);
				}
			}
		}

		const intPart = Math.trunc(absValue);
		if (absValue === intPart) return 0;

		const candidate = absValue.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
		if (candidate.includes('.')) {
			return candidate.split('.')[1].length;
		}
		return 0;
	}

	private trimTrailingZeros(frac: string): string {
		return frac.replace(/0+$/, '');
	}
}
