import { afterNextRender, Component, computed, effect, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { CurrencyItem } from '../../interfaces/data.types';
import { CurrencyItemComponent } from '../../components/not-shared/home/currency-item/currency-item.component';
import { base_metal_title, BASE_METALS_PREFIX, COIN_PREFIX, coin_title, COMMODITY_PREFIX, commodity_title, CRYPTO_PREFIX, crypto_title, currency_title, dollar_unit, favories_title, favories_title_en, filter_agricultural_products, filter_agricultural_products_en, filter_animal_products, filter_animal_products_en, filter_coin_blubber, filter_coin_blubber_en, filter_coin_cash, filter_coin_cash_en, filter_coin_exchange, filter_coin_exchange_en, filter_coin_retail, filter_coin_retail_en, filter_crop_yields, filter_crop_yields_en, filter_cryptocurrency, filter_etf, filter_etf_en, filter_global_base_metals, filter_global_base_metals_en, filter_global_ounces, filter_global_ounces_en, filter_gold, filter_gold_en, filter_gold_vs_other, filter_gold_vs_other_en, filter_main_currencies, filter_main_currencies_en, filter_melted, filter_melted_en, filter_mesghal, filter_mesghal_en, filter_other_coins, filter_other_coins_en, filter_other_currencies, filter_other_currencies_en, filter_overview, filter_overview_en, filter_pair_currencies, filter_silver, filter_silver_en, filter_us_base_metals, filter_us_base_metals_en, GOLD_PREFIX, gold_title, MAIN_CURRENCY_PREFIX, precious_metal_title, PRECIOUS_METALS_PREFIX, toman_unit, WORLD_MARKET_PREFIX, world_title } from '../../constants/Values';
import { StarIconComponent } from '../../components/shared/star-icon/star-icon.component';
import { CommonModule, NgIf } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { combineLatest, fromEvent, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, take, takeUntil } from 'rxjs/operators'
import { RequestArrayService } from '../../services/request-array.service';
import { HomeStateService } from '../../services/home-state.service';
import { NotificationService } from '../../services/notification.service';

import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';


enum SortingType {
  Ascending, Descending, None
}

interface SubtitleType {
  fa: string,
  en: string
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CurrencyItemComponent, NgIf, StarIconComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  reqestClass? = inject(RequestArrayService);
  lastHomeState = inject(HomeStateService);
  notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories = [
    {
      title: favories_title,
      enTitle: favories_title_en,
      subtitles: [

      ]
    },
    {
      title: currency_title,
      enTitle: MAIN_CURRENCY_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
        {fa: filter_main_currencies, en: filter_main_currencies_en},
        {fa: filter_other_currencies, en: filter_other_currencies_en}
      ] 
    },
    {
      title: gold_title,
      enTitle: GOLD_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
        {fa: filter_gold, en: filter_gold_en},
        {fa: filter_silver, en: filter_silver_en},
        {fa: filter_mesghal, en: filter_mesghal_en},
        {fa: filter_melted, en: filter_melted_en},
        {fa: filter_etf, en: filter_etf_en}
      ]
    },
    {
      title: coin_title,
      enTitle: COIN_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
        {fa: filter_coin_cash, en: filter_coin_cash_en},
        {fa: filter_coin_retail, en: filter_coin_retail_en},
        {fa: filter_coin_blubber, en: filter_coin_blubber_en},
        {fa: filter_coin_exchange, en: filter_coin_exchange_en},
        {fa: filter_other_coins, en: filter_other_coins_en}
      ]
    },
    {
      title: crypto_title,
      enTitle: CRYPTO_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
      ]
    },
    {
      title: world_title,
      enTitle: WORLD_MARKET_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
      ]
    },
    {
      title: precious_metal_title,
      enTitle: PRECIOUS_METALS_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
        {fa: filter_global_ounces, en: filter_global_ounces_en},
        {fa: filter_gold_vs_other, en: filter_gold_vs_other_en}
      ]
    },
    {
      title: base_metal_title,
      enTitle: BASE_METALS_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
        {fa: filter_global_base_metals, en: filter_global_base_metals_en},
        {fa: filter_us_base_metals, en: filter_us_base_metals_en}
      ]
    },
    {
      title: commodity_title,
      enTitle: COMMODITY_PREFIX,
      subtitles: [
        {fa: filter_overview, en: filter_overview_en},
        {fa: filter_agricultural_products, en: filter_agricultural_products_en},
        {fa: filter_crop_yields, en: filter_crop_yields_en},
        {fa: filter_animal_products, en: filter_animal_products_en}
      ]
    }

  ];

  supportedCurrencies = [
    {
      id: 0,
      title: 'تومان IRT'
    },
    {
      id: 1,
      title: 'دلار USD'
    }
  ]

  
  textToFilter = signal('')
  itemToRemove = signal<string>('')
  currentCategory: WritableSignal<string> = signal(this.categories[0].title)
  currentSubCategory: WritableSignal<string> = signal(filter_overview_en);

  private currentCategory$ = toObservable(this.currentCategory);
  private currentSubCategory$ = toObservable(this.currentSubCategory);
  private textToFilter$ = toObservable(this.textToFilter);

  lastCategory: WritableSignal<string> = signal(this.categories[0].title);
  categoryScrollValue: WritableSignal<number> = signal(0);
  subCategoryScrollValue: WritableSignal<number> = signal(0);

  titleSorting = signal<SortingType>(SortingType.None);
  priceSorting = signal<SortingType>(SortingType.None);
  change24hSorting = signal<SortingType>(SortingType.None);

  private destroySubject = new Subject<void>();

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>; 
  @ViewChild('scrollViewSubCategory') scrollViewSubCategory?: ElementRef<HTMLDivElement>;
  @ViewChild('scrollViewCategory') scrollViewCategory?: ElementRef<HTMLDivElement>;
  @ViewChild('categoryHighlightLine') categoryHighlightLine?: ElementRef<HTMLDivElement>;
  @ViewChild('categoryContainer') categoryContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('tabElement') tabElement?: ElementRef<HTMLElement>;

  showRightSubCategoryArrow: WritableSignal<Boolean> = signal(true);
  showLeftSubCategoryArrow: WritableSignal<Boolean> = signal(true);

  showRightCategoryArrow: WritableSignal<Boolean> = signal(true);
  showLeftCategoryArrow: WritableSignal<Boolean> = signal(true);
  selectedCategory: WritableSignal<String> = signal('');
  currentSupportCurrencyId: number = 0;

  private scrollAmount: number = 70;
  

  change24hText: WritableSignal<string> = signal("تغییر 24 ساعت")
  priceSortingText: WritableSignal<string> = signal("قیمت")

  
  private categoryStreamMap: Record<
    string,
    Observable<CurrencyItem[]>
  > = {
    [favories_title]: this.reqestClass?.favList!,
    [currency_title]: this.reqestClass?.mainCurrencyList!,
    [gold_title]: this.reqestClass?.goldList!,
    [coin_title]: this.reqestClass?.coinList!,
    [crypto_title]: this.reqestClass?.cryptoList!,
    [world_title]: this.reqestClass?.worldMarketList!,
    [precious_metal_title]: this.reqestClass?.preciousMetalList!,
    [base_metal_title]: this.reqestClass?.baseMetalList!,
    [commodity_title]: this.reqestClass?.commodityList!,
  };

  
  titleSorting$ = toObservable(this.titleSorting);
  priceSorting$ = toObservable(this.priceSorting);
  change24hSorting$ = toObservable(this.change24hSorting);

  currentList$ = this.currentCategory$.pipe(
    switchMap(category =>
      this.categoryStreamMap[category] ?? of([])
    ),
  )
  
  currentTempList$ = combineLatest([
    this.currentCategory$,
    this.currentSubCategory$
  ]).pipe(
    switchMap(([category, subCategory]) =>
      (this.categoryStreamMap[category] ?? of([])).pipe(
        map(list => ({ list, subCategory }))
      )
    ),
    map(({ list, subCategory }) => {
      const filteredList = (subCategory !== filter_overview_en) ? [...list].filter(item => item.filterNameEn == subCategory) : list;
      return filteredList
    })
  )
  
  currentTempList2$ = combineLatest([
    this.currentCategory$,
    this.titleSorting$,
    this.priceSorting$,
    this.change24hSorting$,
    this.currentSubCategory$,
    this.textToFilter$
    
  ]).pipe(
    switchMap(([category, titleSort, priceSort, change24hSort, subCategory, textToFilter]) =>
      (this.categoryStreamMap[category] ?? of([])).pipe(
        map(list => ({ list, titleSort, priceSort, change24hSort, subCategory, textToFilter }))
      )
    ),
    map(({ list, titleSort, priceSort, change24hSort, subCategory, textToFilter }) => {
      const groupedList = (subCategory !== filter_overview_en) ? [...list].filter(item => item.filterNameEn == subCategory) : list;

      const trimedText = textToFilter.trim()
      const filteredList = trimedText ? [...groupedList].filter(item => item.title.toLowerCase().includes(trimedText) || item.shortedName?.toLowerCase().includes(trimedText)) : groupedList;

      if (titleSort === SortingType.Ascending) return this.setTitleListAscending(filteredList)
      else if (titleSort === SortingType.Descending) return this.setTitleListDescending(filteredList)
      

      else if (priceSort === SortingType.Ascending) return this.setPriceListAscending(filteredList)
      else if (priceSort === SortingType.Descending) return this.setPriceListDescending(filteredList)

      else if (change24hSort === SortingType.Ascending) return this.setChange24hListAscending(filteredList)
      else if (change24hSort === SortingType.Descending) return this.setChange24hListDescending(filteredList)

      else return filteredList;
    })

  )

  currentSubCategoryList = computed(() => {
    return (
      this.categories.find(c => c.title === this.currentCategory())?.subtitles
    );
  });

  constructor(private title: Title, private meta: Meta) {
    this.route.queryParamMap.pipe(take(1))
      .subscribe(params => {
        const cat = params.get('cat');
        const sub = params.get('sub');

        if (cat) {
          const category = this.categories.find(c => c.enTitle.toLowerCase() === cat);

          if (category) {
            this.setCurrentCategory(
              category.title,
              sub || filter_overview_en
            );
            return;
          }
        }

        this.setCurrentCategory(this.lastHomeState.currentCategory, this.lastHomeState.currentSubCategory);
      });

    if (typeof window !== 'undefined') {

      window.onbeforeunload = () => {
        window.scrollTo(0, 0)  
      }
      window.scrollTo(0, 0)


      if (window.innerWidth <= 624) {
        this.change24hText.set('24h')
      }
      else {
        this.change24hText.set('تغییر 24 ساعت')
      }
    }

    effect(() => {
      this.checkSubCategoryScrollPosition();
      this.checkCategoryScrollPosition();
    })
  }


  categoryLeft () {
    const element = this.scrollViewCategory?.nativeElement;
    element?.scrollBy({ behavior: 'smooth', left: -this.scrollAmount })
    this.syncHighlightAfterScroll()
  }
  
  
  subCategoryLeft () {
    const element = this.scrollViewSubCategory?.nativeElement;
    element?.scrollBy({ behavior: 'smooth', left: -this.scrollAmount })
  }
  
  categoryRight () {
    const element = this.scrollViewCategory?.nativeElement;
    element?.scrollBy({ behavior: 'smooth', left: this.scrollAmount })
    this.syncHighlightAfterScroll();
  }
  
  subCategoryRight () {
    const element = this.scrollViewSubCategory?.nativeElement;
    element?.scrollBy({ behavior: 'smooth', left: this.scrollAmount })
  }

  scrollToStart () {
    const element = this.scrollViewSubCategory?.nativeElement;
    element?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  moveCategoryHighlight(element: HTMLElement): void {
    if (!this.categoryHighlightLine || !this.scrollViewCategory) return;

    const highlight = this.categoryHighlightLine.nativeElement;
    const container = this.scrollViewCategory.nativeElement;

    if (highlight.classList.contains('sm:translate-x-[-95.8188px]')) highlight.classList.remove('sm:translate-x-[-95.8188px]')
    if (highlight.classList.contains('translate-x-[-81.05px]')) highlight.classList.remove('translate-x-[-81.05px]')

    const elRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const elementCenter = elRect.left + elRect.width / 2;
    const containerRight = containerRect.right;

    const translateX =
      containerRight
      - elementCenter
      - highlight.offsetWidth / 2;
      
    highlight.style.transform = `translateX(-${translateX}px)`;
  }

  syncHighlightAfterScroll(): void {
    requestAnimationFrame(() => {
      const activeEl = document.querySelector(
        '[data-active-category="true"]'
      ) as HTMLElement | null;

      if (activeEl) {
        this.moveCategoryHighlight(activeEl);
      }
    });
  }



  setCurrentCategory (title: string = currency_title, subCategory: string = filter_overview_en, element: HTMLDivElement | undefined = undefined) {
    this.currentCategory.set(title)
    this.lastHomeState.setCategory(title)
    
    if (element) {
      this.moveCategoryHighlight(element);
    }

    switch(title) {
      case favories_title:
        this.priceSortingText.set('قیمت');
        this.initializeFavFilters();
        this.currentSupportCurrencyId = 0;
        break;

      case currency_title:
        this.priceSortingText.set('قیمت');
        this.currentSupportCurrencyId = 0;
        break;
      
      case gold_title:
        this.priceSortingText.set('قیمت');
        this.currentSupportCurrencyId = 0;
        break;

      case coin_title:
        this.priceSortingText.set('قیمت');
        this.currentSupportCurrencyId = 0;
        break;

      case crypto_title:
        this.priceSortingText.set('قیمت');
        this.currentSupportCurrencyId = 1;
        break;

      case world_title:
        this.priceSortingText.set('نسبت');
        break;

      case precious_metal_title:
        this.priceSortingText.set('قیمت');
        this.currentSupportCurrencyId = 1;
        break;

      case base_metal_title:
        this.priceSortingText.set('قیمت');
        this.currentSupportCurrencyId = 1;
        break;

      case commodity_title:
        this.priceSortingText.set('قیمت');
        this.currentSupportCurrencyId = 1;
        break;
    }
    this.currentSubCategory.set(subCategory)
    this.lastHomeState.setSubCategory(subCategory);
    this.scrollToStart();
    this.checkAllSnapScrollPositions()
  }

  private updateUrl() {
    const categoryObj = this.categories.find(x => x.title === this.currentCategory());
    
    this.router.navigate(
      [],
      {
        replaceUrl: true,
        queryParams: {
          cat: categoryObj?.enTitle.toLowerCase(),
          sub: this.currentSubCategory()
        }
      }
    );

  }

  onFavAddItem = (id: string) => {
    this.notificationService.show('با موفقیت به دیده بان اضافه شد')
  }

  

  onItemSelect = (id: string) => {
    
  }

  private getChangeValue(item: CurrencyItem): number {
    if (item.faGroupName !== 'بازارهای ارزی') {
      const sign = item.rialChangeState === 'high' ? 1 : -1;
      return sign * Number(item.rialChanges ?? 0);
    }

    const sign = item.lastPriceInfo?.dt === 'high' ? 1 : -1;
    return sign * Number(item.lastPriceInfo?.dp ?? 0);
  }
  
  onFavRemoveItem = (id: string) =>  {
      this.notificationService.show('با موفقیت از دیده بان حذف شد')

      if (this.currentCategory() == favories_title) {
        this.itemToRemove.set(id)
      }
  }

  canShowSupportedCurrencyToggle () {
    return this.currentCategory() !== world_title && (this.currentCategory() !== favories_title || (this.currentSubCategory() !== filter_overview_en && this.currentSubCategory() !== filter_pair_currencies))
  }


  initializeFavFilters() {
    const favSubCategoryList: SubtitleType[] = [{fa: filter_overview, en: filter_overview_en}]
    this.reqestClass?.favList.subscribe((items) => {
      items.forEach(item => {
        const exists = favSubCategoryList.some(x => x.en === item.filterNameEn);
        if (!exists) {
          favSubCategoryList.push({
            fa: item.filterName,
            en: item.filterNameEn
          });
        }

      });
    })
    this.categories[0].subtitles = favSubCategoryList;
  }

  filterByCategory (name: string) {
    const currentCategoryObj = this.categories.find(x => x.title === this.currentCategory());
    this.router.navigate(
      [],
      {
        queryParams: {
          cat: currentCategoryObj?.enTitle.toLowerCase(),
          sub: name
        },
        queryParamsHandling: null
      }
    );

    this.currentSubCategory.set(name);
    this.lastHomeState.setSubCategory(name);

    this.updateUrl();
  }

  getCategoryByEnTitle(cat: string) {
    return this.categories.find(x => x.enTitle.toLowerCase() === cat.toLowerCase());
  }

  filterList(event: Event) {
    const textToFilter = (event.target as HTMLInputElement).value.toLowerCase()
    this.textToFilter.set(textToFilter || '')
  }

  changeTitleSortingType() {
    this.change24hSorting.set(SortingType.None);
    this.priceSorting.set(SortingType.None);

    this.titleSorting.update((type) => type + 1);
    if (this.titleSorting().toString() === '3') this.titleSorting.set(0);

  }
  
  changePriceSortingType() {
    this.titleSorting.set(SortingType.None);
    this.change24hSorting.set(SortingType.None);

    this.priceSorting.update(type => type + 1);
    if (this.priceSorting().toString() === '3') this.priceSorting.set(0);
  }

  
  changeChange24hSortingType() {
    this.titleSorting.set(SortingType.None);
    this.priceSorting.set(SortingType.None);

    this.change24hSorting.update(type => type + 1);
    if (this.change24hSorting().toString() === '3') this.change24hSorting.set(0);
  }

  
  setChange24hListDescending (items: CurrencyItem[]) {
    const descendingPriceList: CurrencyItem[] = [...items]
    return descendingPriceList.sort((a, b) => {
      const aVal = this.getChangeValue(a);
      const bVal = this.getChangeValue(b);
      return aVal - bVal;
    });
  }

  
  setChange24hListAscending (items: CurrencyItem[]) {
    const ascendingPriceList: CurrencyItem[] = [...items]
    return ascendingPriceList.sort((a, b) => {
      const aVal = this.getChangeValue(a);
      const bVal = this.getChangeValue(b);
      return bVal - aVal;
    });
  }

  setPriceListDescending (items: CurrencyItem[]) {
    const descendingPriceList: CurrencyItem[] = [...items]
    return descendingPriceList.sort((a: CurrencyItem, b: CurrencyItem) => a.realPrice!! > b.realPrice!! ? 1 : -1)
  }


  setPriceListAscending (items: CurrencyItem[]) {
    const ascendingPriceList: CurrencyItem[] = [...items]
    return ascendingPriceList.sort((a: CurrencyItem, b: CurrencyItem) => a.realPrice!! > b.realPrice!! ? -1 : 1)
  }
  
  setTitleListDescending (items: CurrencyItem[]) {
    const descendingTitleList: CurrencyItem[] = [...items]
    return descendingTitleList.sort((a: CurrencyItem, b: CurrencyItem) => a.title.localeCompare(b.title, 'fa-IR', { sensitivity: 'base', ignorePunctuation: true }) * -1)
  }

  setTitleListAscending (items: CurrencyItem[]) {
    const ascendingTitleList: CurrencyItem[] = [...items]
    return ascendingTitleList.sort((a: CurrencyItem, b: CurrencyItem) => a.title.localeCompare(b.title, 'fa-IR', { sensitivity: 'base', ignorePunctuation: true }))
  }

  resetSortingLists () {
    this.titleSorting.set(SortingType.None);
    this.priceSorting.set(SortingType.None);
    this.change24hSorting.set(SortingType.None);
  }

  ngOnInit () {
    this.title.setTitle('ارزیاب | مرجع قیمت بازارها');
    this.meta.updateTag({
      name: 'description',
      content: 'قیمت لحظه‌ای ارز، طلا، سکه، ارز دیجیتال، فلزات گرانبها، فلزات پایه و بازار کالاها در ارزیاب؛ مرجع دقیق و به‌روز قیمت بازارها.'
    });

    this.route.queryParamMap.subscribe(params => {
      const cat = params.get('cat');
      const sub = params.get('sub');

      if (!cat) return;

      const category = this.categories.find(c => c.enTitle.toLowerCase() === cat);

      if (!category) return;

      this.setCurrentCategory(category.title, sub || filter_overview_en);
    });

    if (typeof window !== 'undefined') {
      this.syncHighlightAfterScroll()

      fromEvent(window, 'resize')
      .pipe(
        map(() => document.body.clientWidth),
        debounceTime(150),
        distinctUntilChanged(),
        takeUntil(this.destroySubject)
      )
      .subscribe((width: number) => {
        this.syncHighlightAfterScroll()
        if (width <= 624) {
          this.change24hText.set('24h')
        }
        else {
          this.change24hText.set('تغییر 24 ساعت')
        }
      })

      if (window.innerWidth <= 624) {
        this.change24hText.set('24h')
      }
      else {
        this.change24hText.set('تغییر 24 ساعت')
      }
    }
    
  }

  changecategory (title: string = currency_title, subCategory: string = filter_overview_en, element: HTMLDivElement | undefined = undefined) {
    this.setCurrentCategory(title, subCategory, element)
    this.updateUrl();
    afterNextRender(() => this.syncHighlightAfterScroll())
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  ngAfterViewInit () {
    
    if (typeof window !== 'undefined') {
      this.syncHighlightAfterScroll()
      
      fromEvent(window, 'click')
      .pipe(
        filter((event: Event) => (event.target as HTMLElement).id !== 'searchInput'),
        takeUntil(this.destroySubject)
      )
      .subscribe((event: Event) => {
        if ((event.target as HTMLElement).id !== 'searchInput') {
          this.searchInput?.nativeElement.classList.remove('border-green-btn');
          this.searchInput?.nativeElement.classList.add('border-light-text2');
          this.searchInput?.nativeElement.classList.add('dark:border-dark-text2');
        }
      })

      fromEvent(window, 'resize')
      .subscribe((event) => {
        this.checkAllSnapScrollPositions()
      })
      
    }
    this.checkAllSnapScrollPositions();
  }

  checkAllSnapScrollPositions () {
    this.checkSubCategoryScrollPosition();
    this.checkCategoryScrollPosition();
  }

  onScrollEventHandler () {
    this.checkSubCategoryScrollPosition()
  }

  onScrollCategoryEventHandler() {
    this.checkCategoryScrollPosition()
    this.syncHighlightAfterScroll()
  }

  checkSubCategoryScrollPosition () {
    const element = this.scrollViewSubCategory?.nativeElement;
    if (!element) return;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;

    const maxScroll = scrollWidth - clientWidth;
    const currentScroll = Math.abs(scrollLeft)

    this.subCategoryScrollValue.set(scrollLeft);
    this.showRightSubCategoryArrow.set(currentScroll > 1)
    this.showLeftSubCategoryArrow.set(currentScroll < (maxScroll - 1))
  }

  
  checkCategoryScrollPosition () {
    const element = this.scrollViewCategory?.nativeElement;
    if (!element) return;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;

    const maxScroll = scrollWidth - clientWidth;
    const currentScroll = Math.abs(scrollLeft)

    this.categoryScrollValue.set(scrollLeft);
    this.showRightCategoryArrow.set(currentScroll > 1)
    this.showLeftCategoryArrow.set(currentScroll < (maxScroll - 1))
  }
}
