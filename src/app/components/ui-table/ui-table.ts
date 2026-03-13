import {CommonModule} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	Directive,
	effect,
	inject,
	input,
	TemplateRef
} from '@angular/core';
import {TableModule} from 'primeng/table';
import {EnumColumnType, IColumn, IColumnConfig} from './ui-table.model';
import {GridCellTemplate, GridHeaderTemplate} from './ui-table.directives';

@Component({
	selector: 'ui-table',
	templateUrl: './ui-table.html',
	styleUrls: ['./ui-table.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, TableModule]
})
export class UiTable {

  readonly EnumColumnType = EnumColumnType;

	readonly columns = input.required<{[key: string]: IColumnConfig}>();
	readonly gridData = input.required<any[]>();
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
}
