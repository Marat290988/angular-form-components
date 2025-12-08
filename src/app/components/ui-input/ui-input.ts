import {Component, effect, forwardRef, inject, input, signal} from '@angular/core';
import {generateRandomId} from '../../shared/utils';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, Validators} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {IconClearComponent} from '../icon-clear/icon-clear';

@Component({
	selector: 'ui-input',
	templateUrl: './ui-input.html',
	styleUrl: './ui-input.scss',
	imports: [CommonModule, IconClearComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UiInput),
			multi: true
		}
	]
})
export class UiInput implements ControlValueAccessor {
	constructor() {
		effect(() => {
			this.onChange(this.value());
		});
	}

	labelName = input('Label');
	formControl = input.required<FormControl>();
	showClearIcon = input(false);
	fractionDigits = input(0);
	isOnlyNumber = input(false);

	protected readonly inputId = generateRandomId();
	fontInputSize = signal(14);
	focused = signal(false);
	value = signal<string>('');
	hasError = signal(false);
	isTouched = signal(false);
	isRequired = signal(false);
	isDisabled = signal(false);
	destroy$ = new Subject<void>();

	ngOnInit() {
		this.formControl()
			.valueChanges.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.hasError.set(this.formControl().invalid);
			});
		this.formControl()
			.statusChanges.pipe(takeUntil(this.destroy$))
			.subscribe((status) => {
				this.isDisabled.set(this.formControl().disabled);
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private onChange: (v: any) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(value: any): void {
		if (value) {
			this.isTouched.set(true);
		}
		this.isRequired.set(this.formControl()!.hasValidator(Validators.required) ?? false);
		this.value.set(value ?? '');
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onInput(val: string) {
		this.value.set(val);
	}

	onBeforePaste(event: ClipboardEvent) {
		if (!this.isOnlyNumber()) return;

		event.preventDefault();

		const target = event.target as HTMLInputElement;
		if (!target) return;

		const pastedText = event.clipboardData?.getData('text') ?? '';

		let regex!: RegExp;

		if (this.fractionDigits() > 0) {
			regex = new RegExp(`^\\d+(\\.\\d{1,${this.fractionDigits()}})?$`);
		} else {
			regex = new RegExp(`^\\d+$`);
		}

		const start = target.selectionStart ?? 0;
		const end = target.selectionEnd ?? 0;
		const value = target.value;

		const newValue = value.slice(0, start) + pastedText + value.slice(end);

		if (regex.test(newValue)) {
			target.value = newValue;

			const cursorPos = start + pastedText.length;
			target.setSelectionRange(cursorPos, cursorPos);
		}
	}

	onBeforeInput(event: InputEvent) {
		if (!this.isOnlyNumber()) return;

		const target = event.target as HTMLInputElement;
		if (!target) return;

		const input = event.data ?? '';
		const start = target.selectionStart ?? 0;
		const end = target.selectionEnd ?? 0;

		const newValue = target.value.slice(0, start) + input + target.value.slice(end);

		let regex!: RegExp;

		if (this.fractionDigits() > 0) {
			regex = new RegExp(`^\\d+(\\.\\d{0,${this.fractionDigits()}})?$`);
		} else {
			regex = new RegExp(`^\\d+$`);
		}

		if (!regex.test(newValue)) {
			event.preventDefault();
		}
	}
}
