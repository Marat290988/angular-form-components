import { Directive, inject, input, TemplateRef } from "@angular/core";

@Directive({
  selector: 'ng-template[gridCellTemplate]'
})
export class GridCellTemplate {
  readonly templateRef = inject(TemplateRef<{
    dataItem: Record<string, any>
  }>);
  readonly columnName = input.required<string>({alias: 'gridCellTemplate'});
}

@Directive({
  selector: 'ng-template[gridHeaderTemplate]'
})
export class GridHeaderTemplate {
  readonly templateRef = inject(TemplateRef<void>);
  readonly columnName = input.required<string>({alias: 'gridHeaderTemplate'});
}