import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {vi} from 'vitest';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';

// --- Обновленная Заглушка ActivatedRoute ---
const mockActivatedRoute = {
	// Свойство params должно возвращать Observable
	params: of({}), // Пустой объект, если параметры не важны
	queryParams: of({}),
	fragment: of(null),
	data: of({}),
	url: of([]),

	// Для синхронного доступа (snapshot)
	snapshot: {
		paramMap: {
			get: (key: string) => null
		} as any,
		queryParamMap: {
			get: (key: string) => null
		} as any
	}
};

// --- Обновленная Заглушка Router ---
const mockRouter = {
	navigate: vi.fn(() => Promise.resolve(true)),
	// Если компонент слушает события Router, Events должны быть Observable
	events: of({})
};

describe('App', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [App],
			providers: [
				provideZonelessChangeDetection(),
				{provide: ActivatedRoute, useValue: mockActivatedRoute},
				{provide: Router, useValue: mockRouter}
			]
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(App);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h1')?.textContent).toContain('Form Components');
	});
});
