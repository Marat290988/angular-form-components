import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	signal,
	TemplateRef,
	viewChild,
	ViewContainerRef
} from '@angular/core';

@Component({
	selector: 'ui-table-filter',
	templateUrl: './ui-table-filter.html',
	styleUrls: ['./ui-table-filter.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule]
})
export class UiTableFilterComponent {
	constructor() {
		this.destroyRef.onDestroy(() => {
			this.closeDropdown();
		});
	}

	private readonly overlay = inject(Overlay);
	private readonly vcr = inject(ViewContainerRef);
	private overlayRef?: OverlayRef;
	readonly filterTemplate = viewChild<TemplateRef<void>>('filterTemplate');
	private readonly destroyRef = inject(DestroyRef);
	readonly isOpen = signal(false);

	private closeDropdown() {
		if (this.overlayRef) {
			this.overlayRef.dispose();
			this.overlayRef = undefined;
			this.isOpen.set(false);
		}
	}

	toggleDropdown(trigger: HTMLElement) {
		const dropdown = this.filterTemplate();
		if (!dropdown) return;
		const triggerRect = trigger.getBoundingClientRect();

		const positionStrategy = this.overlay
			.position()
			.flexibleConnectedTo(trigger)
			.withFlexibleDimensions(false)
			.withPush(true)
			.withViewportMargin(8)
			.withLockedPosition(false)
			.withPositions([
				{
					originX: 'start',
					originY: 'bottom',
					overlayX: 'start',
					overlayY: 'top',
					offsetY: 10
				},
				{
					originX: 'end',
					originY: 'bottom',
					overlayX: 'end',
					overlayY: 'top',
					offsetY: 10
				}
			]);

		this.overlayRef = this.overlay.create({
			positionStrategy,
			hasBackdrop: true,
			backdropClass: 'cdk-overlay-transparent-backdrop',
			scrollStrategy: this.overlay.scrollStrategies.close(),
			width: 250,
			maxHeight: 220
		});

		this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());

		const portal = new TemplatePortal(dropdown, this.vcr);
		this.overlayRef.attach(portal);
		this.isOpen.set(true);
	}
}
