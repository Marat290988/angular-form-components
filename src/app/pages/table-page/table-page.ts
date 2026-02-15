import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UiTable } from "../../components/ui-table/ui-table";

@Component({
  selector: "app-table-page",
  templateUrl: "./table-page.html",
  styleUrls: ["./table-page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    UiTable
  ]
})
export class TablePage {}