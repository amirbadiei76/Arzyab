import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RequestArrayService } from '../../services/request-array.service';
import { CurrencyItem } from '../../interfaces/data.types';
import { Meta } from '@angular/platform-browser';
import { currency_title, filter_main_currencies, filter_main_currencies_en, MAIN_CURRENCY_PREFIX } from '../../constants/Values';
import { SearchItemComponent } from '../../components/shared/search-item/search-item.component';
import { FormsModule } from '@angular/forms';
import { CommafyNumberDirective } from '../../directives/commafy-number.directive';
import { ConverterItemComponent } from '../../components/not-shared/converter/converter-item/converter-item.component';
import { BehaviorSubject, combineLatest, debounceTime, filter, from, fromEvent, map, Observable, of, shareReplay, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { commafy, commafyString, priceToNumber, trimDecimal, valueToDollarChanges } from '../../utils/CurrencyConverter';
import { ConverterItemSkeletonComponent } from '../../components/not-shared/converter/converter-item-skeleton/converter-item-skeleton.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type DualList = {
  first: CurrencyItem[];
  second: CurrencyItem[];
};


export interface ICurrencySelect {
  id: number,
  title: string
}

@Component({
  selector: 'app-converter',
  imports: [SearchItemComponent, CommonModule, CommafyNumberDirective, ConverterItemComponent, ConverterItemSkeletonComponent, FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {
  requestArray = inject(RequestArrayService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fromTextToFilter = signal('');
  fromTextToFilter$ = toObservable(this.fromTextToFilter)

  
  toTextToFilter = signal('');
  toTextToFilter$ = toObservable(this.toTextToFilter)

  irItem: CurrencyItem = {
    title: 'تومان ایران',
    shortedName: 'IRT',
    groupName: MAIN_CURRENCY_PREFIX,
    filterName: filter_main_currencies,
    filterNameEn: filter_main_currencies_en,
    faGroupName: currency_title,
    historyCallInfo: undefined,
    id: "IRT_CUSTOM_ID_9999",
    slugText: 'irt',
    img: 'assets/images/country-flags/ir.svg',
    lastPriceInfo: undefined,
    realPrice: 1
  }

  currentValue = toSignal(from(this.requestArray.mainData!)
  .pipe(
    map((data) => data?.current),
    shareReplay(1)
  ))

  /*
  private initIrItem$ = this.requestArray.mainData!
    .pipe(
    take(1),
    tap(mainData => {
      if (!mainData?.current) return;

      const dollarChanges = (mainData.current.price_dollar_rl?.dt === 'low' ? -1 : 1) * (mainData.current.price_dollar_rl?.dp!);
      const dollarValue = priceToNumber(mainData.current.price_dollar_rl?.p!);
      const mainDollarValue = (1 / dollarValue).toFixed(8)
      const dollarChangeState = valueToDollarChanges(0, dollarChanges);
      
      this.irItem.dollarChangeState = dollarChangeState >= 0 ? 'high' : 'low';
      this.irItem.dollarChanges = trimDecimal(Math.abs(dollarChangeState)) + '';
      this.irItem.dollarStringPrice = mainDollarValue;
    }),
    shareReplay(1)
  );

  mainCurrencyListWithIR$ = this.requestArray.mainCurrencyList.pipe(
    map(list => {
      const hasIR = list.some(item => item.id === this.irItem.id);
  
      return hasIR
        ? list
        : [this.irItem, ...list];
    }),
    shareReplay(1)
  );
  */

  mainCurrencyListWithIR$ = combineLatest([
    this.requestArray.mainCurrencyList,
    this.requestArray.mainData!.pipe(filter(data => !!data?.current))
  ]).pipe(
    map(([list, mainData]) => {
      const dollarChanges = (mainData!.current.price_dollar_rl?.dt === 'low' ? -1 : 1) * (mainData!.current.price_dollar_rl?.dp!);
      const dollarValue = priceToNumber(mainData!.current.price_dollar_rl?.p!);
      const mainDollarValue = (1 / dollarValue).toFixed(8);
      const dollarChangeState = valueToDollarChanges(0, dollarChanges);
     
      const filledIrItem: CurrencyItem = {
        ...this.irItem,
        dollarChangeState: dollarChangeState >= 0 ? 'high' : 'low',
        dollarChanges: trimDecimal(Math.abs(dollarChangeState)) + '',
        dollarStringPrice: mainDollarValue
      };

      const hasIR = list.some(item => item.id === filledIrItem.id);
      return hasIR ? list : [filledIrItem, ...list];
    }),
    shareReplay(1)
  );


  private dualCategoryStreamMap: Record<
    number,
    Observable<DualList>
  > = {
    0: combineLatest([
      this.mainCurrencyListWithIR$,
      this.mainCurrencyListWithIR$
    ]).pipe(
      map(([list1, list2]) => ({
        first: list1,
        second: list2
      }))
    ),

    1: combineLatest([
      this.requestArray.cryptoList,
      this.requestArray.cryptoList
    ]).pipe(
      map(([list1, list2]) => ({
        first: list1,
        second: list2
      }))
    ),

    2: combineLatest([
      this.mainCurrencyListWithIR$,
      this.requestArray.cryptoList
    ]).pipe(
      map(([mainList, cryptoList]) => ({
        first: cryptoList,
        second: mainList
      }))
    )
  };


  @ViewChild('typesBtn') typesBtn?: ElementRef<HTMLDivElement>
  @ViewChild('fromBtn') fromBtn?: ElementRef<HTMLDivElement>
  @ViewChild('toBtn') toBtn?: ElementRef<HTMLDivElement>

  inputValueSubject = new BehaviorSubject<string>('1');
  inputValue$ = this.inputValueSubject.asObservable();
  inputValue = toSignal(this.inputValue$);
  
  convertedValueSubject = new BehaviorSubject<string>('');
  convertedValue = this.convertedValueSubject.asObservable();

  mainFromListSubject = new BehaviorSubject<CurrencyItem | undefined>(undefined);
  mainFromList$ = this.mainFromListSubject.asObservable()
  mainFromList = signal<CurrencyItem[]>([])

  
  mainToListSubject = new BehaviorSubject<CurrencyItem | undefined>(undefined);
  mainToList$ = this.mainToListSubject.asObservable();
  mainToList = signal<CurrencyItem[]>([])

  
  currentFromList = signal<CurrencyItem[]>([])
  currentToList = signal<CurrencyItem[]>([])

  currencyType = signal(this.getInitialCurrencyType());
  currencyType$ = toObservable(this.currencyType)
  currencyDropdownOpen = signal(false)
  

  currencyTypes: ICurrencySelect[] = [
    {
      id: 0,
      title: 'ارز به ارز'
    },
    {
      id: 1,
      title: 'ارز دیجیتال به ارز دیجیتال'
    },
    {
      id: 2,
      title: 'ارز دیجیتال به ارز'
    },
  ]

  fromItemSubject = new BehaviorSubject<CurrencyItem | undefined>(undefined);
  fromDropdownOpen = signal(false);
  // fromItem$ = this.fromItemSubject.asObservable()
  fromItemId = signal('')
  
  toItemSubject = new BehaviorSubject<CurrencyItem | undefined>(undefined);
  toDropdownOpen = signal(false);
  // toItem$ = this.toItemSubject.asObservable()
  toItemId = signal('')
  

  /*
  dualList$ = this.initIrItem$.pipe(
    switchMap(() =>
      this.currencyType$.pipe(
        switchMap(type =>
          this.dualCategoryStreamMap[type] ?? of({ first: [], second: [] })
        )
      )
    ),
    shareReplay(1)
  );
  */
  dualList$ = this.currencyType$.pipe(
    switchMap(type => this.dualCategoryStreamMap[type] ?? of({ first: [], second: [] })),
    shareReplay(1)
  );

  filteredFromList$ = combineLatest([
    this.dualList$,
    this.fromTextToFilter$
  ]).pipe(
    map(([{ first }, filterText]) => {
      if (!filterText) return first;

      const text = filterText.trim().toLowerCase();

      return first.filter(item =>
        item.title.toLowerCase().includes(text) ||
        item.shortedName?.toLowerCase().includes(text)
      );
    }),
    shareReplay(1)
  );

  filteredToList$ = combineLatest([
    this.dualList$,
    this.toTextToFilter$
  ]).pipe(
    map(([{ second }, filterText]) => {
      if (!filterText) return second;

      const text = filterText.trim().toLowerCase();

      return second.filter(item =>
        item.title.toLowerCase().includes(text) ||
        item.shortedName?.toLowerCase().includes(text)
      );
    }),
    shareReplay(1)
  );

  
  fromItem$ = combineLatest([this.dualList$, toObservable(this.fromItemId)]).pipe(
    map(([{ first }, id]) => first.find(item => item.id === id)),
    shareReplay(1)
  );
  fromItem = toSignal(this.fromItem$);

  toItem$ = combineLatest([this.dualList$, toObservable(this.toItemId)]).pipe(
    map(([{ second }, id]) => second.find(item => item.id === id)),
    shareReplay(1)
  );
  toItem = toSignal(this.toItem$);
  
  /*
 syncFromTo$ = this.dualList$.pipe(
    map(({ first, second }) => {

      const defaultFrom = first?.[1];
      const defaultTo = second?.[this.currencyType() === 2 ? 1 : 0];

      if (!this.fromItemId()) {
        this.fromItemId.set(defaultFrom?.id ?? '');
      }

      if (!this.toItemId()) {
        this.toItemId.set(defaultTo?.id ?? '');
      }

      const currentFrom = first.find(item => item.id === this.fromItemId()) ?? defaultFrom;
      const currentTo = second.find(item => item.id === this.toItemId()) ?? defaultTo;

      this.fromItemSubject.next(currentFrom);
      this.toItemSubject.next(currentTo);
    })
  );
  
  private initFromUrl$ = this.dualList$.pipe(
    tap(({ first, second }) => {
      const params = this.route.snapshot.queryParamMap;
      const fromSlug = params.get('from');
      const toSlug = params.get('to');

      if (fromSlug) {
        const found = first.find(item => item.slugText === fromSlug);
        if (found) this.fromItemId.set(found.id);
      }
      if (toSlug) {
        const found = second.find(item => item.slugText === toSlug);
        if (found) this.toItemId.set(found.id);
      }
    })
  );
  */
  

  calculateOutput$ = combineLatest([
    this.inputValue$,
    this.fromItem$,
    this.toItem$,
    this.currencyType$
  ]).pipe(
    map(([value, from, to, currencyType]) : string => {
      const currentValue = priceToNumber(value) || 1;
      const fromRealValue = from?.realPrice || 1;
      const toRealValue = to?.realPrice || 1;
      if (currencyType === 0) {
        const outputValue = currentValue * (fromRealValue! / toRealValue!);
        if (to?.shortedName === 'IRT') {
          return commafy(outputValue / 10)
        }
        else if (from?.shortedName === 'IRT') {
          return commafyString((outputValue / 10).toFixed(9))
        }
        else {
          return commafy(trimDecimal(outputValue, 4))
        }
      }
      else if (currencyType === 1) {
        const outputValue = currentValue * (fromRealValue! / toRealValue!);
        return commafy(trimDecimal(outputValue, 4))
      }
      else {
        const outputValue = currentValue * (fromRealValue! / toRealValue!);
        if (to?.shortedName === 'IRT') {
          return commafy(outputValue / 10)
        }
        else {
          return commafy(trimDecimal(outputValue, 4))
        }
      }
    })
  );

  /*
  private urlSync$ = combineLatest([
    this.fromItem$,
    this.toItem$,
    this.currencyType$
  ]).pipe(
    tap(([from, to, type]) => {
      if (!from || !to || typeof window === 'undefined') return;

      this.router.navigate([], {
        replaceUrl: true,
        queryParams: {
          type,
          from: from.slugText,
          to: to.slugText
        }
      });
    })
  );
  */

  
  constructor(private meta: Meta) {
    // this.initFromUrl$.subscribe();
    // this.urlSync$.subscribe();
    // this.initIrItem$.subscribe();
    // this.syncFromTo$.subscribe();

    if (typeof window !== 'undefined') {      
      window.scrollTo(0, 0)
    }

  }

  private getInitialCurrencyType(): number {
    const typeParam = this.route.snapshot.queryParamMap.get('type');
    const parsed = typeParam !== null ? parseInt(typeParam, 10) : NaN;
    return [0, 1, 2].includes(parsed) ? parsed : 0;
  }

  ngOnInit () {
    this.meta.updateTag({
      name: 'description',
      content: `مبدل ارز ارزیاب؛ تبدیل سریع و دقیق ارزهای معتبر با نرخ به‌روز بازار.`
    });

     this.dualList$.pipe(take(1)).subscribe(({ first, second }) => {
      const params = this.route.snapshot.queryParamMap;
      const fromSlug = params.get('from');
      const toSlug = params.get('to');

      const defaultFrom = first?.[1];
      const defaultTo = second?.[this.currencyType() === 2 ? 1 : 0];

      const matchedFrom = first.find(i => i.slugText === fromSlug) ?? defaultFrom;
      const matchedTo = second.find(i => i.slugText === toSlug) ?? defaultTo;

      if (matchedFrom) this.fromItemId.set(matchedFrom.id);
      if (matchedTo) this.toItemId.set(matchedTo.id);
    });

    combineLatest([
      this.fromItem$.pipe(filter(item => !!item)),
      this.toItem$.pipe(filter(item => !!item)),
      this.currencyType$
    ]).pipe(
      debounceTime(50)
    ).subscribe(([from, to, type]) => {
      if (typeof window === 'undefined') return;

      this.router.navigate([], {
        replaceUrl: true,
        queryParams: {
          type,
          from: from!.slugText,
          to: to!.slugText
        }
      });
    });
  }


  ngAfterViewInit () {
    if (typeof document !== 'undefined') {
      fromEvent<MouseEvent>(document, 'click')
      .subscribe((event) => {
        if (!this.typesBtn?.nativeElement.contains(event.target as Node)) {
          this.currencyDropdownOpen.set(false)
        }
        if (!this.fromBtn?.nativeElement.contains(event.target as Node)) {
          this.fromDropdownOpen.set(false)
          this.resetSearchInputs()
        }
        if (!this.toBtn?.nativeElement.contains(event.target as Node)) {
          this.toDropdownOpen.set(false)
          this.resetSearchInputs()
        }
      })
    }
  }

  selectCurrencyTypeDropdown (item: ICurrencySelect) {
    // this.fromItemId.set('');
    // this.toItemId.set('');
    this.currencyType.set(item.id)
    // this.syncFromTo$.subscribe();
    this.toggleCurrencyTypeDropdown()
  }

  onInputChange (event: Event) {
    const value = (event.target as HTMLInputElement).value || '1';
    this.inputValueSubject.next(commafy(priceToNumber(value) || 1))
  }

  toggleCurrencyTypeDropdown () {
    this.currencyDropdownOpen.update((opend) => !opend)
  }

  toggleFromeDropdown () {
    this.fromDropdownOpen.update((opened) => !opened)
  }
  
  toggleToDropdown () {
    this.toDropdownOpen.update((opened) => !opened)
  }

  swapCurrencies () {
    const fromId = this.fromItemId();
    const toId = this.toItemId();

    this.fromItemId.set(toId);
    this.toItemId.set(fromId);

    // this.syncFromTo$.pipe(take(1)).subscribe();
  }

  onSelectFromItem(slug: string) {
    // this.dualList$
    //   .pipe(take(1))
    //   .subscribe(items => {
    //     const selected = items.first.find(item => item.slugText === slug);

    //     if (selected) {
    //       this.fromItemId.set(selected.id);
    //     }

    //     this.syncFromTo$.pipe(take(1)).subscribe();
    //   });
    this.dualList$.pipe(take(1)).subscribe(items => {
      const selected = items.first.find(item => item.slugText === slug);
      if (selected) {
        this.fromItemId.set(selected.id);
      }
    });

    this.resetSearchInputs();
    this.toggleFromeDropdown();
  }

  onSelectToItem(slug: string) {
    // this.dualList$
    //   .pipe(take(1))
    //   .subscribe(items => {

    //     const selected = items.second.find(item => item.slugText === slug);

    //     if (selected) {
    //       this.toItemId.set(selected.id);
    //     }

    //     this.syncFromTo$.pipe(take(1)).subscribe();
    //   });
    this.dualList$.pipe(take(1)).subscribe(items => {
      const selected = items.second.find(item => item.slugText === slug);
      if (selected) {
        this.toItemId.set(selected.id);
      }
    });

    this.resetSearchInputs();
    this.toggleToDropdown();
  }

  /*
  onSelectFromItem (slug: string) {
    this.dualList$.subscribe((items) => {
      this.fromItemSubject.next(items.first.find((item) => item.slugText == slug))
    })
    this.resetSearchInputs();
    this.toggleFromeDropdown();
  }

  
  onSelectToItem (slug: string) {
    this.dualList$.subscribe((items) => {
      this.toItemSubject.next(items.second.find((item) => item.slugText == slug))
    })
    this.resetSearchInputs();
    this.toggleToDropdown();
  }
  */

  resetSearchInputs () { 
    this.fromTextToFilter.set('')
    this.toTextToFilter.set('')
  }

  filterFromList(event: Event) {
    const textToFilter = (event.target as HTMLInputElement).value.toLowerCase();
    this.fromTextToFilter.set(textToFilter)
  }
  
  filterToList(event: Event) {
    const textToFilter = (event.target as HTMLInputElement).value.toLowerCase();
    this.toTextToFilter.set(textToFilter)
  }
}
