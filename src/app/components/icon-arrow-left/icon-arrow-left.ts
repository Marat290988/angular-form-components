import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'icon-arrow-left',
	template: `
		<svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true" fill="var(--fill-color)">
			<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
		</svg>
	`,
	styles: [
		`
			:host {
				--fill-color: #656763;
				height: 24px;
			}
		`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconArrowLeftComponent {}
