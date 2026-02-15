import {Component, effect, ElementRef, signal, viewChild} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_NAMES} from './app.routes';
import {IconMenuComponent} from './components/icon-menu/icon-menu';
import {CommonModule} from '@angular/common';
import {fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-root',
	imports: [RouterModule, IconMenuComponent, CommonModule],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {
	readonly isOpen = signal(false);
	readonly navElement = viewChild<ElementRef<HTMLElement>>('nav');
	readonly menuIcon = viewChild('menuIcon', {read: ElementRef});
	readonly navList = [
		{
			path: ROUTE_NAMES.INPUT_PAGE,
			label: 'Input'
		},
		{
			path: ROUTE_NAMES.SELECT_PAGE,
			label: 'Select'
		},
		{
			path: ROUTE_NAMES.DATE_PICKER_PAGE,
			label: 'Date Picker'
		},
		{
			path: ROUTE_NAMES.ACTION_PAGE,
			label: 'Components in Action'
		},
		{
			path: ROUTE_NAMES.TABLE_PAGE,
			label: 'Table'
		}
	];
	private readonly destroyed$ = takeUntilDestroyed();

	ngAfterViewInit() {
		fromEvent(document.body, 'click')
			.pipe(this.destroyed$)
			.subscribe((ev) => {
				const target = (ev as Event).target as HTMLElement | null;
				if (this.menuIcon() && this.menuIcon()!.nativeElement.contains(target as Node)) {
					return;
				}
				if (this.navElement() && !this.navElement()!.nativeElement.contains(target as Node)) {
					this.isOpen.set(false);
				}
			});
	}
}
