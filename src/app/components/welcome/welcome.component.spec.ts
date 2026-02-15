// Используем импорты из Angular и Vitest
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {WelcomeComponent} from './welcome.component';
import {describe, it, expect, beforeEach} from 'vitest';

// Если вы не используете Zone.js, убедитесь, что в тесте нет fakeAsync/tick.

describe('WelcomeComponent', () => {
	let fixture: ComponentFixture<WelcomeComponent>;
	let component: WelcomeComponent;
	let compiled: HTMLElement;

	// Настройка тестового окружения
	beforeEach(async () => {
		// Конфигурируем TestBed для автономного компонента
		await TestBed.configureTestingModule({
			imports: [WelcomeComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(WelcomeComponent);
		component = fixture.componentInstance;
		compiled = fixture.nativeElement as HTMLElement;

		// Запускаем обнаружение изменений для рендеринга шаблона
		fixture.detectChanges();
	});

	// --- ТЕСТ 1: Проверка создания ---
	it('должен быть успешно создан', () => {
		expect(component).toBeTruthy();
	});

	// --- ТЕСТ 2: Проверка контента ---
	it('должен отображать сообщение о работе Vitest', () => {
		const element = compiled.querySelector('[data-testid="welcome-message"]');

		// Проверяем, что элемент существует и содержит ожидаемый текст
		expect(element).not.toBeNull();
		expect(element?.textContent).toContain('Привет! Тестирование Vitest работает!');
	});
});
