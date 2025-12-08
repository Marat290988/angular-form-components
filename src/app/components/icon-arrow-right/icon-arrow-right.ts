import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'icon-arrow-right',
	template: `
		<svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true" fill="var(--fill-color)">
			<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
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
export class IconArrowRightComponent {}
