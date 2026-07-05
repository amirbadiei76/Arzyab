import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { ChartData, RawData } from '../../../../interfaces/chart.types';
import { analyzeRange, filterByDays } from '../../../../utils/CurrencyChanges';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { RequestArrayService } from '../../../../services/request-array.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { from, map, shareReplay } from 'rxjs';

export type PriceItem = RawData & { date: Date };

interface ChangesResult {
  first?: string;
  last?: string;
  change?: number;
  percent?: string;
  avg?: number | string;
  direction?: string;
  days: number;
}

@Component({
  selector: 'app-changes-table',
  imports: [],
  templateUrl: './changes-table.component.html',
  styleUrl: './changes-table.component.css'
})

export class ChangesTableComponent {
  // @Input() historyData?: RawData[];
  // @Input() item?: CurrencyItem;
  @Input({ required: true })
  set historyData(value: ChartData | undefined) {
    this._historyData.set(value ?? null);
  }

  @Input({ required: true })
  set item(value: CurrencyItem | undefined) {
    this.currentItem.set(value);
  }

  private _historyData = signal<ChartData | null>(null);
  currentItem = signal<CurrencyItem | undefined>(undefined);

  // ChartData ستونی (آرایه‌های موازی t/o/h/l/c) رو به آرایه‌ای از PriceItem تبدیل می‌کنه —
  // یعنی همون شکلی که filterByDays/analyzeRange توی CurrencyChanges.ts انتظارش رو دارن
  // (p/h/l/ts رشته‌ای + date). چون analyzeRange در عمل فقط از item.p و item.date استفاده می‌کنه،
  // h/l/ts فقط برای سازگاری با تایپ RawData پر می‌شن (که PriceItem ازش ساخته شده).
  normalizeData = computed<PriceItem[]>(() => {
    const data = this._historyData();
    if (!data?.t?.length) return [];

    const length = Math.min(
      data.t.length,
      data.o?.length ?? 0,
      data.h?.length ?? 0,
      data.l?.length ?? 0,
      data.c?.length ?? 0,
    );

    const items: PriceItem[] = [];
    for (let i = 0; i < length; i++) {
      const unixSeconds = this.toUnixSeconds(data.t[i]);
      const date = new Date(unixSeconds * 1000);

      items.push({
        p: String(data.c[i]),
        h: String(data.h[i]),
        l: String(data.l[i]),
        ts: date.toISOString(),
        date
      });
    }

    return items.sort((a, b) => a.date.getTime() - b.date.getTime());
  })

  // برخی APIها timestamp رو به میلی‌ثانیه می‌فرستن؛ این متد هر دو حالت رو پشتیبانی می‌کنه
  // (دقیقاً همون منطقی که توی ChartComponent هم استفاده شد، برای هماهنگی بین دو کامپوننت)
  private toUnixSeconds(t: number): number {
    return t > 1e12 ? Math.floor(t / 1000) : t;
  }

  currentUnit = input(0)

  // ranges = signal<ChangesResult[]>([])
  ranges = computed<ChangesResult[]>(() => {
    const data = this.normalizeData()
    const item = this.currentItem();
    const unit = this.currentUnit();
    const current = this.currentValue();

    if (!data.length || !item || current == null) return [];

    const periods = [30, 60, 90, 180];

    return periods.map(days => {
      const items = filterByDays(data, days);
      const analysis = analyzeRange(items, item, current, unit);

      return {
        days,
        ...analysis
      };
    });
  });


  requestClass = inject(RequestArrayService);

  currentValue = toSignal(from(this.requestClass.mainData!)
  .pipe(
    map((data) => data?.current),
    shareReplay(1)
  ))

  // calculateRanges(data: PriceItem[], item: CurrencyItem, unitType: number) {
  //   const periods = [30, 60, 90, 180];

  //   const results = periods.map((days) => {
  //     const items = filterByDays(data, days);
  //     const analysis = analyzeRange(items, item, this.currentValue()!, unitType);

  //     return {
  //       days,
  //       ...analysis,
  //     };
  //   });
  //   this.ranges.set(results);
  // }
}