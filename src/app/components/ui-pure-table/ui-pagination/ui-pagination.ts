import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, effect, input, model, output} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ISelectOption, UiSelect } from '../../ui-select/ui-select';

@Component({
	selector: 'ui-pagination',
	templateUrl: './ui-pagination.html',
	styleUrls: ['./ui-pagination.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, UiSelect]
})
export class UiPagination {
	constructor() {
		effect(() => {
			if ((this.pageSizeOptions(), length > 0)) {
				this.pageSizeControl.setValue(this.pageSizeOptions()[0]);
			}
		});
	}

	readonly totalItems = input.required<number>();
	readonly pageSizeOptions = input([10, 25, 50, 100]);

  readonly pageSizeControl = new FormControl(10);
	readonly currentPage = model(1);
	readonly pageSize = toSignal(((this.pageSizeControl).valueChanges as Observable<number>).pipe(
    map(val => {
      this.currentPage.set(1);
      this.pageSizeChange.emit(val);
      return val;
    })
  ), {initialValue: 10});

	readonly pageChange = output<number>();
	readonly pageSizeChange = output<number>();

  readonly ELLIPSIS = '...';

	readonly totalPages = computed(() => {
		const total = this.totalItems();
		const size = this.pageSize();
		return total > 0 ? Math.ceil(total / size) : 0;
	});
	readonly startIndex = computed(() => {
		if (this.totalItems() === 0) return 0;
		return (this.currentPage()! - 1) * this.pageSize() + 1;
	});
  readonly endIndex = computed(() => {
    const start = this.startIndex();
    const size = this.pageSize();
    const total = this.totalItems();
    return Math.min(start + size - 1, total);
  });
  readonly visiblePages  = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage()!;
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push(this.ELLIPSIS);
      }
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (current < total - 2) {
        pages.push(this.ELLIPSIS);
      }
      if (total > 1) {
        pages.push(total);
      }
    }
    return pages;
  });
  readonly pageSizeOptionsSelect = computed<ISelectOption[]>(() => {
    return this.pageSizeOptions().map((size) => ({title: size, value: size}));
  });
  readonly canGoPrevious = computed(() => this.currentPage() > 1);
  readonly canGoNext = computed(() => this.currentPage() < this.totalPages());

  onPageChange(page: number | string): void {
    if (typeof page === 'string') return;
    if (page === this.currentPage()) return;

    this.currentPage.set(page);
    this.pageChange.emit(page);
  }

  onPrevious(): void {
    if (this.canGoPrevious()) {
      const newPage = this.currentPage() - 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
    }
  }

  onNext(): void {
    if (this.canGoNext()) {
      const newPage = this.currentPage() + 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
    }
  }

  onFirst(): void {
    this.currentPage.set(1);
    this.pageChange.emit(1);
  }

  onLast(): void {
    const lastPage = this.totalPages();
    this.currentPage.set(lastPage);
    this.pageChange.emit(lastPage);
  }
}
