import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GridCellTemplate, UiTable } from "../../components/ui-table/ui-table";
import { users } from "./mock-users";

@Component({
  selector: "app-table-page",
  templateUrl: "./table-page.html",
  styleUrls: ["./table-page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    UiTable,
    GridCellTemplate
  ]
})
export class TablePage {
  users = users;
}