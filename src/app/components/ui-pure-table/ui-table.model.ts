import {TemplateRef} from '@angular/core';

export interface IColumnConfig {
	title: string;
	sortable?: boolean;
	filterable?: boolean;
	fieldName?: string;
	width?: number;
	visible?: boolean;
	thClass?: string;
	tdClass?: string;
	type?: EnumColumnType;
}

export interface IColumn extends IColumnConfig {
	templateCellRef?: TemplateRef<{dataItem: Record<string, any>}>;
	templateHeaderRef?: TemplateRef<void>;
}

export enum EnumColumnType {
	TEXT = 'text',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime',
	BOOLEAN = 'boolean',
	NUMBER = 'number',
	DECIMAL = 'decimal',
}
