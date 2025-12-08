import {Routes} from '@angular/router';

export const ROUTE_NAMES = {
	INPUT_PAGE: 'input-page',
	SELECT_PAGE: 'select-page',
	DATE_PICKER_PAGE: 'date-picker-page',
	ACTION_PAGE: 'action-page'
};

export const routes: Routes = [
	{
		path: '',
		redirectTo: ROUTE_NAMES.INPUT_PAGE,
		pathMatch: 'full'
	},
	{
		path: ROUTE_NAMES.INPUT_PAGE,
		loadComponent: () => import('./pages/input-page/input-page').then((m) => m.InputPage)
	},
	{
		path: ROUTE_NAMES.SELECT_PAGE,
		loadComponent: () => import('./pages/select-page/select-page').then((m) => m.SelectPage)
	},
	{
		path: ROUTE_NAMES.DATE_PICKER_PAGE,
		loadComponent: () => import('./pages/datepicker-page/datepicker-page').then((m) => m.DatepickerPage)
	},
	{
		path: ROUTE_NAMES.ACTION_PAGE,
		loadComponent: () => import('./pages/action-page/action-page').then((m) => m.ActionPage)
	}
];
