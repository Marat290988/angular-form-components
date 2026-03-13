import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {users} from './mock-users';
import {GridCellTemplate, GridHeaderTemplate} from '../../components/ui-table/ui-table.directives';
import {UiPureTable} from '../../components/ui-pure-table/ui-pure-table';
import { EnumColumnType } from '../../components/ui-pure-table/ui-table.model';

@Component({
	selector: 'app-table-page',
	templateUrl: './table-page.html',
	styleUrls: ['./table-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, UiPureTable, GridCellTemplate, GridHeaderTemplate]
})
export class TablePage {
	users = users;
	EnumColumnType = EnumColumnType;
}
