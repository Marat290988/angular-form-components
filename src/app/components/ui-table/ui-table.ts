import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, contentChildren, Directive, effect, inject, input, TemplateRef } from "@angular/core";
import { TableModule } from "primeng/table";

export interface IColumn {
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  templateRef?: TemplateRef<any>;
  fieldName?: string;
}

@Directive({
  selector: 'ng-template[gridCellTemplate]'
})
export class GridCellTemplate {

  constructor() {
    effect(() => {
      if (this.columnName()) {
        console.log(this.columnName())
        console.log(this.templateRef)
      }
    })
  }

  templateRef = inject(TemplateRef<{
    dataItem: any
  }>);
  columnName = input.required<string>({alias: 'gridCellTemplate'});
}
@Component({
  selector: "ui-table",
  templateUrl: "./ui-table.html",
  styleUrls: ["./ui-table.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TableModule]
})
export class UiTable {

  constructor() {
    effect(() => {
      console.log(this.gridCellTemplates());
    });
  }

  readonly columns = input.required<{[key: string]: IColumn}>();
  readonly gridData = input.required<any[]>();
  readonly gridCellTemplates = contentChildren(GridCellTemplate);
  readonly gridColumn = computed(() => {
    const keys = Object.keys(this.columns());
    const gridColumn: IColumn[] = [];
    keys.forEach(key => {
      const index = this.gridCellTemplates().findIndex(template => template.columnName() === key);
      if (index !== -1) {
        gridColumn.push({
          ...this.columns()[key],
          fieldName: this.gridCellTemplates()[index].columnName(),
          templateRef: this.gridCellTemplates()[index].templateRef
        });
      }
    });
    return gridColumn;
  });

}