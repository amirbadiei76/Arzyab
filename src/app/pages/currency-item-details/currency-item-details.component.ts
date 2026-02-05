import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../../components/shared/breadcrumb/breadcrumb.component';
import { CurrencyItem, Current } from '../../interfaces/data.types';
import { RequestArrayService } from '../../services/request-array.service';
import { ItemInfoComponent } from '../../components/not-shared/currency-item-details/item-info/item-info.component';
import { NotificationService } from '../../services/notification.service';
import { Meta, Title } from '@angular/platform-browser';
import { base_metal_title, coin_title, commodity_title, crypto_title, currency_title, dollar_unit, gold_title, precious_metal_title, toman_unit, world_title } from '../../constants/Values';
import { SearchItemComponent } from '../../components/shared/search-item/search-item.component';
import { combineLatest, distinctUntilChanged, filter, from, fromEvent, map, Observable, of, retry, shareReplay, switchMap, take, tap, throttleTime } from 'rxjs';
import { CurrencyOverviewComponent } from '../../components/not-shared/currency-item-details/currency-overview/currency-overview.component';
import { commafy, dollarToToman, poundToDollar, poundToToman, priceToNumber, rialToDollar, rialToToman, trimDecimal } from '../../utils/CurrencyConverter';
import { RawData } from '../../interfaces/chart.types';
import { ChartComponent } from '../../components/not-shared/currency-item-details/chart/chart.component';
import { ChangesTableComponent } from '../../components/not-shared/currency-item-details/changes-table/changes-table.component';
import { FormsModule, ValueChangeEvent } from '@angular/forms';
import { PercentProgressComponent } from '../../components/not-shared/currency-item-details/percent-progress/percent-progress.component';
import { NotFoundBoxComponent } from '../../components/shared/not-found-box/not-found-box.component';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-item-details',
  imports: [BreadcrumbComponent, FormsModule, CommonModule, ItemInfoComponent, NotFoundBoxComponent, PercentProgressComponent, SearchItemComponent, ChangesTableComponent, CurrencyOverviewComponent, ChartComponent],
  templateUrl: './currency-item-details.component.html',
  styleUrl: './currency-item-details.component.css'
})
export class CurrencyItemDetailsComponent {
  route = inject(ActivatedRoute)
  requestArray = inject(RequestArrayService)
  meta = inject(Meta)
  pageTitle = inject(Title)

  canShowItem = signal(true);

  textToFilter = signal('');
  textToFilter$ = toObservable(this.textToFilter)

  currentSupportCurrencyId = signal(0)
  currentSupportCurrencyId$ = toObservable(this.currentSupportCurrencyId)

  title$ = this.route.params.pipe(
    map(params => params['title'] as string),
    filter(Boolean),
    distinctUntilChanged(),
    shareReplay(1)
  );

  currencyItem$ = this.title$.pipe(
    switchMap(title =>
      this.requestArray.allItemsList.pipe(
        map(items => items.find(item => item.slugText === title) ?? null)
      )
    ),
    shareReplay(1)
  );

  currentValue = this.requestArray.mainData!
  .pipe(
    map((data) => data?.current),
    shareReplay(1)
  )

  private categoryStreamMap: Record<
      string,
      Observable<CurrencyItem[]>
  > = {
    [currency_title]: this.requestArray?.mainCurrencyList!,
    [gold_title]: this.requestArray?.goldList!,
    [coin_title]: this.requestArray?.coinList!,
    [crypto_title]: this.requestArray?.cryptoList!,
    [world_title]: this.requestArray?.worldMarketList!,
    [precious_metal_title]: this.requestArray?.preciousMetalList!,
    [base_metal_title]: this.requestArray?.baseMetalList!,
    [commodity_title]: this.requestArray?.commodityList!,
  };


  itemFaGroupName$ = this.currencyItem$.pipe(
    filter((item): item is CurrencyItem => item !== null),
    map((item) => item.faGroupName)
  )

  
  currentCategoryItems$ = this.itemFaGroupName$.pipe(
    switchMap((group) => this.categoryStreamMap[group!] ?? of([]))
  );

  currentFilteredList$ = combineLatest([
    this.currentCategoryItems$,
    this.textToFilter$
  ]).pipe(
    map(([categoryItems, textToFilter]) => {
      if (!textToFilter) return categoryItems;

      const text = textToFilter.trim().toLowerCase();

      return categoryItems.filter(item =>
        item.title.toLowerCase().includes(text) ||
        item.shortedName?.toLowerCase().includes(text)
      );
    }),
    shareReplay(1)
  );

  breadCrumbItems$ = this.currencyItem$.pipe(
    filter((item): item is CurrencyItem => item !== null),
    map((item) => {
      return [
          {
            title: 'صفحه اصلی', link: '/'
          },
          {
            title: item.title,
          }
      ];
    })
  );

  chartHistory$ = this.currencyItem$.pipe(
    filter((item): item is CurrencyItem => item !== null),
    switchMap(item => {
      if (!item.historyCallInfo) {
        return of<RawData[]>([]);
      }

      return item.historyCallInfo.pipe(
        retry({ count: Infinity })
      );
    }),
    shareReplay(1)
  );




  priceInfo$ = combineLatest([
    this.currencyItem$.pipe(
      filter((item): item is CurrencyItem => item !== null)
    ),
    this.currentValue,
    this.currentSupportCurrencyId$
  ]).pipe(
    map(([item, currentValue, type]) => {

      const last = item.lastPriceInfo;
      if (!last) {
        return null;
      }

      if (item.faGroupName === 'بازارهای ارزی') {
        const max = priceToNumber(last.h);
        const min = priceToNumber(last.l);
        const cur = priceToNumber(last.p);

        const percent = max === min ? 1 : (cur - min) / (max - min);

        return {
          max: max.toString(),
          min: min.toString(),
          percent: `${trimDecimal(percent * 100)}%`
        };
      }

      if (type === 0) {
        if (item.unit === toman_unit) {
          const max = rialToToman(last.h);
          const min = rialToToman(last.l);
          const cur = rialToToman(last.p);

          const percent = max === min ? 1 : (cur - min) / (max - min);

          return {
            max: commafy(max),
            min: commafy(min),
            percent: `${trimDecimal(percent * 100)}%`
          };
        }

        if (item.unit === dollar_unit) {
          const max = dollarToToman(last.h, currentValue!);
          const min = dollarToToman(last.l, currentValue!);
          const cur = dollarToToman(last.p, currentValue!);

          const percent = max === min ? 1 : (cur - min) / (max - min);

          return {
            max: commafy(max),
            min: commafy(min),
            percent: `${trimDecimal(percent * 100)}%`
          };
        }

        const max = poundToToman(last.h, currentValue!);
        const min = poundToToman(last.l, currentValue!);
        const cur = poundToToman(last.p, currentValue!);

        const percent = max === min ? 1 : (cur - min) / (max - min);

        return {
          max: commafy(max),
          min: commafy(min),
          percent: `${trimDecimal(percent * 100)}%`
        };
      }

      if (item.unit === toman_unit) {
        const max = rialToDollar(last.h, currentValue!);
        const min = rialToDollar(last.l, currentValue!);
        const cur = rialToDollar(last.p, currentValue!);

        const percent = max === min ? 1 : (cur - min) / (max - min);

        return {
          max: commafy(max),
          min: commafy(min),
          percent: `${trimDecimal(percent * 100)}%`
        };
      }

      if (item.unit === dollar_unit) {
        const max = priceToNumber(last.h);
        const min = priceToNumber(last.l);
        const cur = priceToNumber(last.p);

        const percent = max === min ? 1 : (cur - min) / (max - min);

        return {
          max: commafy(max),
          min: commafy(min),
          percent: `${trimDecimal(percent * 100)}%`
        };
      }

      // پوند به دلار
      const max = poundToDollar(last.h, currentValue!);
      const min = poundToDollar(last.l, currentValue!);
      const cur = poundToDollar(last.p, currentValue!);

      const percent = max === min ? 1 : (cur - min) / (max - min);

      return {
        max: commafy(max),
        min: commafy(min),
        percent: `${(percent * 100).toFixed(2)}%`
      };
    }),
    shareReplay(1)
  );
  
  historyData?: RawData[];
  currentChartType = signal(0);

  @ViewChild('itemList') itemList?: ElementRef<HTMLDivElement>;
  @ViewChild('inputContainer') inputContainer?: ElementRef;

  constructor(private notificationService: NotificationService, private router: Router) {
    this.currencyItem$
    .pipe(takeUntilDestroyed())
    .subscribe(item => {
      this.canShowItem.set(!!item);
    });
  }
  

  inputFocus () {
    this.itemList?.nativeElement.classList.remove('hidden')
    this.itemList?.nativeElement.classList.add('flex')
  }

  
  inputBlur () {
    this.itemList?.nativeElement.classList.remove('flex')
    this.itemList?.nativeElement.classList.add('hidden')
  }

  ngAfterViewInit () {
    if (typeof document !== 'undefined') {
      fromEvent(document, 'click')
      .subscribe((event) => {
        const clicked = event.target as Node;
        if (!this.inputContainer?.nativeElement.contains(clicked)) {
          this.inputBlur()
        }
      })
    }
  }

  onItemSelect(slug: string) {
    this.inputBlur()
    this.textToFilter.set('')
    this.router.navigate([`/${slug}`])
    window.scrollTo(0, 0)
  }

  onChartTypeChange (type: number) {
    this.currentChartType.set(type)
  }

  
  filterList(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.textToFilter.set(inputValue)
  }

  sharePage () {
    const url = window.location.href;

    if (!navigator.share) {
      navigator.clipboard.writeText(this.pageTitle.getTitle() + '\n' + url);
      this.notificationService.show('آدرس صفحه در کلیپ بورد ذخیره شد')
      return;
    }

    navigator.share({ title: this.pageTitle.getTitle(), url: url })
      .catch(() => console.warn("Share dialog dismissed"));
  }

  removeInput () {
    this.textToFilter.set('');
    this.inputBlur();
  }

  onCurrencyUnitChange (value: number) {
    this.currentSupportCurrencyId.set(value);
  }


  ngOnInit() {
    this.currencyItem$
      .pipe(filter((item): item is CurrencyItem => item !== null), take(1))
      .subscribe(item => {
        if (item.faGroupName === 'بازارهای ارزی') {
          this.pageTitle.setTitle(`ارزیاب | نسبت ${item.title}`);
        }
        else {
          this.pageTitle.setTitle(`ارزیاب | قیمت ${item.title}`);
        }

        this.meta.updateTag({
          name: 'description',
          content: `قیمت لحظه‌ای ${item.title} همراه با نمودار، تغییرات و اطلاعات بازار در ارزیاب.`
        });
    });
      
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);

      fromEvent(window, 'resize')
      .pipe(
        throttleTime(100),
        filter(() => window.innerWidth >= 640)
      )
      .subscribe(() => this.inputBlur())
    }
  }
}
