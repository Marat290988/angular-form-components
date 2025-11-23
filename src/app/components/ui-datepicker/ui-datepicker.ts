import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal, TemplateRef, viewChild, ViewContainerRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";

type TupleOf<T, N extends number, R extends unknown[] = []> =
  R['length'] extends N ? R : TupleOf<T, N, [...R, T]>;

type Week = TupleOf<string, 7>;
type Month = TupleOf<string, 12>;

export interface ILangDatepicker {
  weeks: Week;
  months: Month;
}

const ILangDatepicker: ILangDatepicker = {
  weeks: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  months: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ],
}

@Component({
  selector: 'ui-datepicker',
  templateUrl: './ui-datepicker.html',
  styleUrl: './ui-datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ]
})
export class UiDatepicker {

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.closeDropdown();
      this.destroy$.next();
      this.destroy$.complete();
    });
    // effect(() => {
    //   this.onChange(this.value());
    // });
  }

  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;
  private readonly dropdownTpl = viewChild<TemplateRef<any>>('dropdown');
  private readonly destroyRef = inject(DestroyRef);

  labelName = input('Label Datepicker');
  lang = input<ILangDatepicker>(ILangDatepicker);
  //formControl = input.required<FormControl>();

  value = signal<any | null>(null);
  fontInputSize = signal(14);
  isOpen = signal(false);
  isDisabled = signal(false);
  isRequired = signal(false);
  currentDate = signal({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  monthWeeks = computed(() => {
    return this.getMonthWeeks(this.currentDate().year, this.currentDate().month);
  });
  destroy$ = new Subject<void>();

  toggleDropdown(trigger: HTMLElement) {
    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown(trigger);
    }
  }

  private openDropdown(trigger: HTMLElement) {
    const dropdown = this.dropdownTpl();
    if (!dropdown) return;

    const triggerRect = trigger.getBoundingClientRect();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(trigger)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      width: triggerRect.width,
      maxHeight: 220,
    });

    this.overlayRef
      .backdropClick()
      .subscribe(() => this.closeDropdown());

    const portal = new TemplatePortal(dropdown, this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
  }

  private closeDropdown() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
      this.isOpen.set(false);
    }
  }

  getMonthWeeks(year: number, month: number): (Date | null)[][] {
    const weeks: (Date | null)[][] = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    let current = 1;
    const mapWeekday = (d: number) => (d === 0 ? 6 : d - 1);
    const startWeekday = mapWeekday(firstDay.getDay());
    const firstWeek: (Date | null)[] = [];

    for (let i = 0; i < 7; i++) {
      if (i < startWeekday) {
        firstWeek.push(null);
      } else {
        firstWeek.push(new Date(year, month, current++));
      }
    }

    weeks.push(firstWeek);
    while (current <= totalDays) {
      const week: (Date | null)[] = [];
      for (let i = 0; i < 7; i++) {
        if (current > totalDays) {
          week.push(null);
        } else {
          week.push(new Date(year, month, current++));
        }
      }
      weeks.push(week);
    }

    return weeks;
  }

  setDate(date: Date) {
    this.value.set(date);
    this.closeDropdown();
  }
}