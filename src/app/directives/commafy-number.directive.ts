import { DestroyRef, Directive, ElementRef, HostListener, inject, Input } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[commafyNumber]',
  standalone: true,
})
export class CommafyNumberDirective {
  @Input() allowDecimal = false;

  private isComposing = false;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('compositionstart')
  onCompositionStart() {
    this.isComposing = true;
  }

  @HostListener('compositionend')
  onCompositionEnd() {
    this.isComposing = false;
    this.format();
  }

  @HostListener('input')
  onInput() {
    if (this.isComposing) return;
    this.format();
  }

  private format() {
    const input = this.el.nativeElement;
    const cursor = input.selectionStart ?? 0;
    const original = input.value;

    let value = this.normalizeDigits(original);

    if (this.allowDecimal) {
      value = value.replace(/[^0-9.]/g, '');
    } else {
      value = value.replace(/\D+/g, '');
    }

    let integerPart = value;
    let decimalPart: string | undefined;

    if (this.allowDecimal) {
      const parts = value.split('.');

      if (parts.length > 1) {
        integerPart = parts[0];
        decimalPart = parts.slice(1).join('');
      }
    }

    const formattedInt = integerPart
      ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : '';

    const formatted =
      this.allowDecimal && decimalPart !== undefined
        ? `${formattedInt}.${decimalPart}`
        : formattedInt;

    const diff = formatted.length - original.length;

    input.value = formatted;
    input.setSelectionRange(cursor + diff, cursor + diff);
  }

  private normalizeDigits(value: string): string {
    const persian = '۰۱۲۳۴۵۶۷۸۹';
    const arabic  = '٠١٢٣٤٥٦٧٨٩';

    return value.replace(/[۰-۹٠-٩]/g, d => {
      const p = persian.indexOf(d);
      if (p !== -1) return p.toString();

      const a = arabic.indexOf(d);
      if (a !== -1) return a.toString();

      return d;
    });
  }
}
