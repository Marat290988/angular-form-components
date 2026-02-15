import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "ui-table",
  templateUrl: "./ui-table.html",
  styleUrls: ["./ui-table.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class UiTable {}