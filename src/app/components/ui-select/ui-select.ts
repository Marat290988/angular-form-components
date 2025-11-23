import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, forwardRef, inject, input, signal, TemplateRef, viewChild, ViewContainerRef } from "@angular/core";
import { IconArrowDownComponent } from "../icon-arrow-down/icon-arrow-down";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

export interface ISelectOption {
  title: string | number;
  value: any;
}

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.html',
  styleUrl: './ui-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IconArrowDownComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelect),
      multi: true
    }
  ]
})
export class UiSelect implements ControlValueAccessor {

  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;
  private readonly dropdownTpl = viewChild<TemplateRef<any>>('dropdown');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.closeDropdown();
      this.destroy$.next();
      this.destroy$.complete();
    });
    effect(() => {
      this.onChange(this.value());
    });
  }

  labelName = input('Label Select');
  options = input.required<ISelectOption[]>();
  formControl = input.required<FormControl>();

  value = signal<any | null>(null);
  fontInputSize = signal(14);
  isOpen = signal(false);
  isDisabled = signal(false);
  isRequired = signal(false);
  showValue = computed(() => {
    if (this.value()) {
      const findOption = this.options().find(option => option.value === this.value());
      if (findOption) {
        return findOption.title;
      }
    }
    return '';
  });
  destroy$ = new Subject<void>();

  ngOnInit() {
    this.formControl().statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      this.isDisabled.set(this.formControl().disabled);
    });
  }

  private onChange: (v: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.isRequired.set(this.formControl()!.hasValidator(Validators.required) ?? false);
    this.value.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

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

  selectOption(option: any) {
    this.value.set(option);
    this.closeDropdown();
  }

}