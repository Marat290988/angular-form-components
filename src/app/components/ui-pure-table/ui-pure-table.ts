import {ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, signal} from '@angular/core';
import {EnumColumnType, IColumn, IColumnConfig} from './ui-table.model';
import {GridCellTemplate, GridHeaderTemplate} from '../ui-table/ui-table.directives';
import {CommonModule} from '@angular/common';
import { DecimalSpacePipe, ThousandsSpacePipe } from './ui-pure-table.pipes';
import { UiPagination } from './ui-pagination/ui-pagination';
import { UiTableFilterComponent } from './ui-table-filter/ui-table-filter';

@Component({
	selector: 'ui-pure-table',
	templateUrl: './ui-pure-table.html',
	styleUrls: ['./ui-pure-table.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ThousandsSpacePipe, DecimalSpacePipe, UiPagination, UiTableFilterComponent]
})
export class UiPureTable {
	constructor() {
		effect(() => {
			if (this.columns()) {
				const sortState: Record<string, 'asc' | 'desc' | 'none'> = {};
				const keys = Object.keys(this.columns());
				keys.forEach((key) => {
					if (this.columns()[key].sortable) {
						sortState[key] = 'none';
					}
				});
				this.sortState.set(sortState);
			}
		});
		effect(() => {
			if (this.gridData() && !this.isPagebable()) {
				this.gridDataTable.set(this.gridData().map((item, index) => ({...item, order: index})));
			} else if (this.gridData() && this.isPagebable()) {
				const page = this.currentPage();
				const pageSize = this.initOptionPageQty();
				const start = (page - 1) * pageSize;
				const end = start + pageSize;
				this.gridDataTable.set(this.gridData().slice(start, end));
			}
		});
		effect(() => {
			this.gridDataTable.update((data) => {
				const activeSorts = this.sortStateData()?.filter((s) => s.order !== 'none') ?? [];
				const result = [...data];
				if (activeSorts.length === 0) {
					return result.sort((a, b) => this.compareValues(a['order'], b['order'], 'asc'));
				}

				activeSorts.forEach((sort) => {
					result.sort((a, b) => {
						const valueA = a[sort.key];
						const valueB = b[sort.key];
						const comparison = this.compareValues(valueA, valueB, sort.order as 'asc' | 'desc');
						if (comparison !== 0) {
							return comparison;
						}
						return 0;
					});
				});

				return result;
			});
		});
	}

	readonly EnumColumnType = EnumColumnType;

	readonly columns = input.required<{[key: string]: IColumnConfig}>();
	readonly gridData = input.required<Record<string, any>[]>();
	readonly isPagebable = input<boolean>(false);
	readonly gridDataTable = signal<Record<string, any>[]>([]);
	readonly initOptionPageQty = signal<number>(10);
	readonly currentPage = signal<number>(1);
	readonly gridCellTemplates = contentChildren(GridCellTemplate);
	readonly gridHeaderTemplates = contentChildren(GridHeaderTemplate);
	readonly gridColumn = computed<IColumn[]>(() => {
		const keys = Object.keys(this.columns());
		const gridColumn: IColumn[] = [];
		keys.forEach((key) => {
			const cellIndex = this.gridCellTemplates().findIndex((template) => template.columnName() === key);
			const headerIndex = this.gridHeaderTemplates().findIndex((template) => template.columnName() === key);
			if (!('visible' in this.columns()[key]) || this.columns()[key].visible) {
				gridColumn.push({
					...this.columns()[key],
					fieldName: key,
					type: this.columns()[key].type || EnumColumnType.TEXT,
					templateCellRef: cellIndex !== -1 ? this.gridCellTemplates()[cellIndex].templateRef : undefined,
					templateHeaderRef: headerIndex !== -1 ? this.gridHeaderTemplates()[headerIndex].templateRef : undefined
				});
			}
		});
		return gridColumn;
	});
	readonly sortState = signal<Record<string, 'asc' | 'desc' | 'none'>>({});
	readonly sortStateData = signal<{key: string; order: 'asc' | 'desc' | 'none'}[]>([]);

	sort(fieldName: string) {
		const sortState = this.sortState();
		if (sortState[fieldName] === 'none') {
			sortState[fieldName] = 'asc';
		} else if (sortState[fieldName] === 'asc') {
			sortState[fieldName] = 'desc';
		} else {
			sortState[fieldName] = 'none';
		}
		this.sortStateData.update((state) => {
			const index = state.findIndex((item) => item.key === fieldName);
			if (index === -1 && sortState[fieldName] !== 'none') {
				state.push({key: fieldName, order: sortState[fieldName]});
			} else if (index !== -1 && sortState[fieldName] !== 'none') {
				state[index].order = sortState[fieldName];
			} else if (index !== -1 && sortState[fieldName] === 'none') {
				state.splice(index, 1);
			}
			return [...state];
		});
		this.sortState.set(sortState);
	}

	compareValues(a: any, b: any, order: 'asc' | 'desc'): number {
		if (a == null && b == null) return 0;
		if (a == null) return order === 'asc' ? -1 : 1;
		if (b == null) return order === 'asc' ? 1 : -1;
		const multiplier = order === 'asc' ? 1 : -1;
		if (typeof a === 'number' && typeof b === 'number') {
			return (a - b) * multiplier;
		}
		if (typeof a === 'boolean' && typeof b === 'boolean') {
			return (Number(a) - Number(b)) * multiplier;
		}
		if (a instanceof Date && b instanceof Date) {
			return (a.getTime() - b.getTime()) * multiplier;
		}
		if (this.isDateString(a) && this.isDateString(b)) {
			return (new Date(a).getTime() - new Date(b).getTime()) * multiplier;
		}
		return String(a).localeCompare(String(b)) * multiplier;
	}

	isDateString(value: any): boolean {
		return typeof value === 'string' && !isNaN(Date.parse(value));
	}
}
