import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
	selector: 'app-welcome',
	standalone: true,
	imports: [CommonModule],
	template: ` <div data-testid="welcome-message">Привет! Тестирование Vitest работает!</div> `,
	styles: [
		`
			div {
				padding: 10px;
				background-color: #e0f7fa;
			}
		`
	]
})
export class WelcomeComponent {}
