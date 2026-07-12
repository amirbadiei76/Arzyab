import { Inject, Injectable, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { Currencies, CurrencyItem, Current } from '../interfaces/data.types';
import { base_metal_title, BASE_METALS_PREFIX, COIN_PREFIX, coin_title, COMMODITY_PREFIX, commodity_title, CRYPTO_PREFIX, crypto_title, currency_title, dollar_unit, filter_agricultural_products, filter_animal_products, filter_coin_blubber, filter_coin_cash, filter_coin_exchange, filter_coin_retail, filter_crop_yields, filter_cryptocurrency, filter_etf, filter_global_base_metals, filter_global_ounces, filter_gold, filter_gold_vs_other, filter_main_currencies,
    filter_melted, filter_mesghal, filter_other_coins, filter_other_currencies, filter_pair_currencies, filter_silver, filter_us_base_metals, GOLD_PREFIX, gold_title, MAIN_CURRENCY_PREFIX, pound_unit, precious_metal_title, PRECIOUS_METALS_PREFIX, toman_unit, filter_main_currencies_en, world_title, filter_other_currencies_en, filter_cryptocurrency_en, filter_pair_currencies_en, WORLD_MARKET_PREFIX, filter_coin_cash_en, filter_coin_retail_en, filter_coin_blubber_en,
    filter_coin_exchange_en, filter_other_coins_en, filter_gold_en, filter_silver_en, filter_mesghal_en, filter_melted_en, filter_etf_en, filter_global_ounces_en, filter_gold_vs_other_en, filter_global_base_metals_en, filter_us_base_metals_en, filter_agricultural_products_en, filter_crop_yields_en, filter_animal_products_en,
    filter_dollar_market,
    filter_dollar_market_en} from '../constants/Values';
import { commafy, priceToNumber, trimDecimal, valueToDollarChanges, valueToRialChanges } from '../utils/CurrencyConverter';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const CURRENCIES_TRANSFER_KEY = makeStateKey<Currencies>('currencies-data');

@Injectable({
  providedIn: 'root'
})
export class RequestArrayService {

    private mainDataSubject? = new BehaviorSubject<Currencies | undefined>(undefined);
    private allItemListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private mainCurrencyListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private cryptoListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private worldMarketListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private coinListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private goldListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private preciousMetalListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private baseMetalListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private commodityListSubject = new BehaviorSubject<CurrencyItem[]>([]);

    private favListSubject = new BehaviorSubject<CurrencyItem[]>([]);
    private favIdsSubject = new BehaviorSubject<string[]>([]);

    mainData? = this.mainDataSubject?.asObservable();
    allItemsList = this.allItemListSubject.asObservable();
    mainCurrencyList = this.mainCurrencyListSubject.asObservable();
    cryptoList = this.cryptoListSubject.asObservable();
    worldMarketList = this.worldMarketListSubject.asObservable();
    coinList = this.coinListSubject.asObservable();
    goldList = this.goldListSubject.asObservable();
    preciousMetalList = this.preciousMetalListSubject.asObservable();
    baseMetalList = this.baseMetalListSubject.asObservable();
    commodityList = this.commodityListSubject.asObservable();


    favIds = this.favIdsSubject.asObservable();
    favList = this.favListSubject.asObservable();

    private ws?: WebSocket;
    prices$ = new BehaviorSubject<any>(null);

    private heartbeatTimer?: number;
    private reconnectTimeout?: number;

    private isReadySubject = new BehaviorSubject<boolean>(false);
    isReady$ = this.isReadySubject.asObservable();

  constructor(
    private currencyService: CurrenciesService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState) {

    this.setupMainData();

    if (isPlatformBrowser(this.platformId)) {
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }
  }

    private handleVisibilityChange() {
        if (document.hidden) return;
        // console.log('Page became visible');
        this.forceReconnect();

    }

    private forceReconnect() {
        this.stopHeartbeat();
        if (this.ws && (this.ws.readyState === WebSocket.OPEN ||this.ws.readyState === WebSocket.CONNECTING)) {
            this.ws.close();
        }

        this.connect();
    }

    connect () {
        if (typeof window === 'undefined') return;

        if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
            return;
        }

        this.ws = new WebSocket(`wss://arzyab-backend.onrender.com/`);

        this.ws.onopen = (event) => {
            // console.log("Websocket connection Opened");
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = undefined;
            }

            this.startHeartbeat()
        };

        this.ws.onclose = (event) => {
            this.stopHeartbeat()!;
            // console.log("Websocket connection closed");
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
            }

            this.reconnectTimeout = window.setTimeout(() => {
                this.connect();
            }, 3000);
        };

        this.ws.onerror = (error) => {
            // console.error('WebSocket Error', error);
            this.ws?.close();
        };

        this.ws.onmessage = (message) => {
            const msg = JSON.parse(message.data) as ({type: string} & {payload: Currencies});

            if (msg.type === 'update') {
                const data: Currencies = msg.payload;
                this.mainDataSubject?.next(data);
                this.setupAllCurrentData(data.current)
            }
            else if (msg.type === 'pong') {}
        }
    }

    startHeartbeat() {
        this.heartbeatTimer = window.setInterval(() => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 20000);
    }

    stopHeartbeat() {
        clearInterval(this.heartbeatTimer);
    }

    ngOnDestroy () {
        this.stopHeartbeat()
    }


  addToFavorite(item: CurrencyItem) {
    if (window.navigator.onLine) {
        if (typeof window !== 'undefined' && localStorage.getItem('fav')) {
            item.isFav = true;
            const currentFavList = this.favListSubject.getValue();
            const currentFavIds = this.favIdsSubject.getValue();

            const updatedFavList = [...currentFavList, item];
            const updatedFavIds = [...currentFavIds, item.id];

            this.favListSubject.next(updatedFavList);
            this.favIdsSubject.next(updatedFavIds);
            
            let items = JSON.parse(localStorage.getItem('fav') ?? '[]') as string[]
            items.push(item.id)
            localStorage.setItem('fav', JSON.stringify(items))
        } else {
            item.isFav = true;
            const currentFavList = this.favListSubject.getValue();
            const currentFavIds = this.favIdsSubject.getValue();

            const updatedFavList = [...currentFavList, item];
            const updatedFavIds = [...currentFavIds, item.id];

            this.favListSubject.next(updatedFavList);
            this.favIdsSubject.next(updatedFavIds);
            localStorage.setItem('fav', JSON.stringify(updatedFavIds))
        }
    }
  }

  convertUnitChanges (item: CurrencyItem, current: Current) {
    const dollarChanges = (current.price_dollar_rl?.dt === 'low' ? -1 : 1) * (current.price_dollar_rl?.dp);
    const itemChanges = (item.lastPriceInfo?.dt === 'low' ? -1 : 1) * (item.lastPriceInfo?.dp)!
    if (item.unit === toman_unit) {
        item.rialChangeState = item.lastPriceInfo?.dt
        item.rialChanges = Math.abs(item.lastPriceInfo?.dp!) + '';
        let itemDollarChanges = valueToDollarChanges(itemChanges, dollarChanges);
        item.dollarChangeState = itemDollarChanges >= 0 ? 'high' : 'low';
        itemDollarChanges = trimDecimal(itemDollarChanges)
        item.dollarChanges = Math.abs(itemDollarChanges) + '';
    }
    else if (item.unit === dollar_unit) {
        item.dollarChangeState = item.lastPriceInfo?.dt
        item.dollarChanges = Number(item.lastPriceInfo?.dp) + '';
        let itemRialChanges = valueToRialChanges(itemChanges, dollarChanges);
        item.rialChangeState = itemRialChanges >= 0 ? 'high' : 'low';
        itemRialChanges = trimDecimal(itemRialChanges)
        item.rialChanges = Math.abs(itemRialChanges) + '';
    } else if (item.unit === pound_unit) {
        const poundChanges = (current.price_gbp?.dt === 'low' ? -1 : 1) * (current.price_gbp?.dp)
        const poundAskChanges = (current['gbp-usd-ask'].dt === 'low' ? -1 : 1) * (current['gbp-usd-ask'].dp)
        
        let itemDollarChanges = valueToDollarChanges(itemChanges, poundAskChanges)
        let itemRialChanges = valueToRialChanges(itemChanges, poundChanges)

        item.dollarChangeState = itemDollarChanges >= 0 ? 'high' : 'low';
        item.rialChangeState = itemRialChanges >= 0 ? 'high' : 'low'
        
        itemDollarChanges = trimDecimal(itemDollarChanges);
        itemRialChanges = trimDecimal(itemRialChanges);
        item.dollarChanges = Math.abs(itemDollarChanges) + '';
        item.rialChanges = Math.abs(itemRialChanges) + '';
    }
  }

  getFavorites() {
    if (typeof window !== 'undefined') {
        const items: string[] | undefined = JSON.parse(localStorage.getItem('fav') as string ?? '[]')
        const allItemList = this.allItemListSubject.getValue();
        const favItems: CurrencyItem[] = []
        if (items) {
            for (const favId of items!) {
                for (const item of allItemList) {
                    if (item.id === favId) favItems.push(item)
                }
            }
        }
        this.favListSubject.next(favItems);
    }
  }

  removeFromFavorite(id: string) {
    if (window.navigator.onLine) {
        const allItemValues = this.allItemListSubject.getValue();
        const currentFavIds = this.favIdsSubject.getValue();
        const currentFavList = this.favListSubject.getValue();
        let itemToRemove: CurrencyItem | undefined = allItemValues.find(item => item.id === id)

        if (typeof window !== 'undefined' && itemToRemove !== undefined) {
            let items: string[] = JSON.parse(localStorage.getItem('fav') as string)
            this.favIdsSubject.next(items);

            itemToRemove.isFav = false;
            const updatedFavList = currentFavList.filter(item => item.id !== id)
            const updatedFavIds = currentFavIds.filter(itemId => itemId !== id)

            this.favIdsSubject.next(updatedFavIds)
            this.favListSubject.next(updatedFavList)
            localStorage.setItem('fav', JSON.stringify(updatedFavIds))
        }
    }
  }
  
  calculateOtherCurrenccyPrices(list: BehaviorSubject<CurrencyItem[]>, current: Current, faGroupName: string) {
    const currentList = list.getValue();

    currentList.forEach(item => {
        const priceValue = priceToNumber(item?.lastPriceInfo?.p!);
        // convert all to rial for real price
        if (item.unit === dollar_unit) {
            const dollarValue = priceToNumber(current.price_dollar_rl.p)
            item.realPrice = trimDecimal((priceValue * dollarValue));

            item.dollarPrice = priceValue;
            item.dollarStringPrice = commafy(priceValue)
        }
        else if (item.unit === pound_unit) {
            const poundValue = priceToNumber(current.price_gbp.p)
            item.realPrice = trimDecimal(priceValue * poundValue);

            item.poundAsk = current['gbp-usd-ask'].p;

            const priceDollarValue = priceValue * priceToNumber(current['gbp-usd-ask'].p)
            const roundedDollarPrice = trimDecimal(priceDollarValue);
            item.dollarPrice = roundedDollarPrice;
            item.dollarStringPrice = commafy(roundedDollarPrice)
            
        }
        else {
            item.realPrice = priceValue;

            const dollarMainValue = item.realPrice / priceToNumber(current.price_dollar_rl.p);
            item.dollarPrice = trimDecimal(dollarMainValue)
            item.dollarStringPrice = commafy(item.dollarPrice)
        }
        item.rialStringRealPrice = commafy(item.realPrice)

        // convert to toman
        item.tomanPrice = trimDecimal(item.realPrice / 10)
        item.tomanStringPrice = commafy(item.tomanPrice);

        this.convertUnitChanges(item, current)


        // add slug text
        item.slugText = item.shortedName?.replace(/[\d()/\-\s]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '').toLocaleLowerCase();
        item.faGroupName = faGroupName;

        // fix 24h changes problem
        if (item.lastPriceInfo?.dt === 'low' && item.lastPriceInfo?.dp == 0) item.lastPriceInfo.dt = 'high'
    })
    list.next(currentList)
  }

  setupMainData() {
    if (isPlatformBrowser(this.platformId)) {
        if (this.transferState.hasKey(CURRENCIES_TRANSFER_KEY)) {
            const transferredData = this.transferState.get(CURRENCIES_TRANSFER_KEY, null as unknown as Currencies);
            if (transferredData) {
                this.mainDataSubject?.next(transferredData);
                this.setupAllCurrentData(transferredData.current);
                this.isReadySubject.next(true);
            }
            this.transferState.remove(CURRENCIES_TRANSFER_KEY);
        }
        this.connect();
    }

    this.currencyService.getAllCurrencies()
        .pipe(
            catchError(err => {
                console.error('Failed to load currencies:', err);
                return of(null);
            })
        )
        .subscribe((data) => {
            if (data) {
                this.mainDataSubject?.next(data);
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(CURRENCIES_TRANSFER_KEY, data);
                }
                this.setupAllCurrentData(data.current);
            }
            this.isReadySubject.next(true);
        });
    }

  setupAllCurrentData (current: Current) {
    this.setupMainCurrenciesList(current)
      this.calculateOtherCurrenccyPrices(this.mainCurrencyListSubject, current, currency_title)

      this.setupCryptoList(current)
      this.calculateOtherCurrenccyPrices(this.cryptoListSubject, current, crypto_title)

      this.setupWorldMarketList(current)
      this.calculateOtherCurrenccyPrices(this.worldMarketListSubject, current, world_title)

      this.setupCoinList(current)
      this.calculateOtherCurrenccyPrices(this.coinListSubject, current, coin_title)

      this.setupGoldList(current)
      this.calculateOtherCurrenccyPrices(this.goldListSubject, current, gold_title)

      this.setupPreciousMetals(current)
      this.calculateOtherCurrenccyPrices(this.preciousMetalListSubject, current, precious_metal_title)

      this.setupBaseMetals(current)
      this.calculateOtherCurrenccyPrices(this.baseMetalListSubject, current, base_metal_title)

      this.setupCommodityMarket(current)
      this.calculateOtherCurrenccyPrices(this.commodityListSubject, current, commodity_title)

      this.setupAllItemsList()
      this.getFavorites()
  }


  private setupMainCurrenciesList(current: Current) {
    const mainCurrencyList: CurrencyItem[] = []
    
    // Main
    mainCurrencyList.push({
        id: "1000000",
        historyCallInfo: this.currencyService.getDollarRlHistoryInfo(),
        symbol: 'price_dollar_rl',
        lastPriceInfo: current.price_dollar_rl,
        title: "دلار آمریکا",
        shortedName: "USD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}, {name: filter_dollar_market, enName: filter_dollar_market_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/us.svg',
    });
    mainCurrencyList.push({
        id: "1000001",
        historyCallInfo: this.currencyService.getEuroRlHistoryInfo(),
        symbol: 'price_eur',
        lastPriceInfo: current.price_eur,
        title: "یورو",
        shortedName: "EUR",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/eu.svg'
    });
    mainCurrencyList.push({
        id: "1000002",
        historyCallInfo: this.currencyService.getAedRlHistoryInfo(),
        symbol: 'price_aed',
        lastPriceInfo: current.price_aed,
        title: "درهم امارات",
        shortedName: "AED",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ae.svg'
    });
    mainCurrencyList.push({
        id: "1000003",
        historyCallInfo: this.currencyService.getGbpRlHistoryInfo(),
        symbol: 'price_gbp',
        lastPriceInfo: current.price_gbp,
        title: "پوند انگلیس",
        shortedName: "GBP",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/gb.svg'
    });
    mainCurrencyList.push({
        id: "1000004",
        historyCallInfo: this.currencyService.getTryRlHistoryInfo(),
        symbol: 'price_try',
        lastPriceInfo: current.price_try,
        title: "لیر ترکیه",
        shortedName: "TRY",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/tr.svg'
    });
    mainCurrencyList.push({
        id: "1000005",
        historyCallInfo: this.currencyService.getChfRlHistoryInfo(),
        symbol: 'price_chf',
        lastPriceInfo: current.price_chf,
        title: "فرانک سوییس",
        shortedName: "CHF",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ch.svg'
    });
    mainCurrencyList.push({
        id: "1000006",
        historyCallInfo: this.currencyService.getCnyRlHistoryInfo(),
        symbol: 'price_cny',
        lastPriceInfo: current.price_cny,
        title: "یوان چین",
        shortedName: "CNY",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cn.svg'
    });
    mainCurrencyList.push({
        id: "1000007",
        historyCallInfo: this.currencyService.getJpyRlHistoryInfo(),
        symbol: 'price_jpy',
        lastPriceInfo: current.price_jpy,
        title: "ین ژاپن (100 ین)",
        shortedName: "JPY",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/jp.svg'
    });
    mainCurrencyList.push({
        id: "1000008",
        historyCallInfo: this.currencyService.getKrwRlHistoryInfo(),
        symbol: 'price_krw',
        lastPriceInfo: current.price_krw,
        title: "وون کره جنوبی",
        shortedName: "KRW",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/kr.svg'
    });
    mainCurrencyList.push({
        id: "1000009",
        historyCallInfo: this.currencyService.getCadRlHistoryInfo(),
        symbol: 'price_cad',
        lastPriceInfo: current.price_cad,
        title: "دلار کانادا",
        shortedName: "CAD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ca.svg'
    });
    mainCurrencyList.push({
        id: "1000010",
        historyCallInfo: this.currencyService.getAudRlHistoryInfo(),
        symbol: 'price_aud',
        lastPriceInfo: current.price_aud,
        title: "دلار استرالیا",
        shortedName: "AUD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/au.svg'
    });
    mainCurrencyList.push({
        id: "1000011",
        historyCallInfo: this.currencyService.getNzdRlHistoryInfo(),
        symbol: 'price_aud',
        lastPriceInfo: current.price_nzd,
        title: "دلار نیوزلند",
        shortedName: "NZD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/nz.svg'
    });
    mainCurrencyList.push({
        id: "1000012",
        historyCallInfo: this.currencyService.getSgdRlHistoryInfo(),
        symbol: 'price_sgd',
        lastPriceInfo: current.price_sgd,
        title: "دلار سنگاپور",
        shortedName: "SGD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sg.svg'
    });
    mainCurrencyList.push({
        id: "1000013",
        historyCallInfo: this.currencyService.getInrRlHistoryInfo(),
        symbol: 'price_inr',
        lastPriceInfo: current.price_inr,
        title: "روپیه هند",
        shortedName: "INR",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/in.svg'
    });
    mainCurrencyList.push({
        id: "1000014",
        historyCallInfo: this.currencyService.getPkrRlHistoryInfo(),
        symbol: 'price_pkr',
        lastPriceInfo: current.price_pkr,
        title: "روپیه پاکستان",
        shortedName: "PKR",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/pk.svg'
    });
    mainCurrencyList.push({
        id: "1000015",
        historyCallInfo: this.currencyService.getIqdRlHistoryInfo(),
        symbol: 'price_iqd',
        lastPriceInfo: current.price_iqd,
        title: "دینار عراق",
        shortedName: "IQD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/iq.svg'
    });
    mainCurrencyList.push({
        id: "1000016",
        historyCallInfo: this.currencyService.getSypRlHistoryInfo(),
        symbol: 'price_syp',
        lastPriceInfo: current.price_syp,
        title: "پوند سوریه",
        shortedName: "SYP",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sy.svg'
    });
    mainCurrencyList.push({
        id: "1000017",
        historyCallInfo: this.currencyService.getAfnRlHistoryInfo(),
        symbol: 'price_afn',
        lastPriceInfo: current.price_afn,
        title: "افغانی افغانستان",
        shortedName: "AFN",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/af.svg'
    });
    mainCurrencyList.push({
        id: "1000018",
        historyCallInfo: this.currencyService.getDkkRlHistoryInfo(),
        symbol: 'price_dkk',
        lastPriceInfo: current.price_dkk,
        title: "کرون دانمارک",
        shortedName: "DKK",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/dk.svg'
    });
    mainCurrencyList.push({
        id: "1000019",
        historyCallInfo: this.currencyService.getSekRlHistoryInfo(),
        symbol: 'price_sek',
        lastPriceInfo: current.price_sek,
        title: "کرون سوئد",
        shortedName: "SEK",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/se.svg'
    });
    mainCurrencyList.push({
        id: "1000020",
        historyCallInfo: this.currencyService.getNokRlHistoryInfo(),
        symbol: 'price_nok',
        lastPriceInfo: current.price_nok,
        title: "کرون نروژ",
        shortedName: "NOK",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/no.svg'
    });
    mainCurrencyList.push({
        id: "1000021",
        historyCallInfo: this.currencyService.getSarRlHistoryInfo(),
        symbol: 'price_sar',
        lastPriceInfo: current.price_sar,
        title: "ريال عربستان",
        shortedName: "SAR",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sa.svg'
    });
    mainCurrencyList.push({
        id: "1000022",
        historyCallInfo: this.currencyService.getQarRlHistoryInfo(),
        symbol: 'price_qar',
        lastPriceInfo: current.price_qar,
        title: "ريال قطر",
        shortedName: "QAR",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/qa.svg'
    });
    mainCurrencyList.push({
        id: "1000023",
        historyCallInfo: this.currencyService.getOmrRlHistoryInfo(),
        symbol: 'price_omr',
        lastPriceInfo: current.price_omr,
        title: "ريال عمان",
        shortedName: "OMR",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/om.svg'
    });
    mainCurrencyList.push({
        id: "1000024",
        historyCallInfo: this.currencyService.getKwdRlHistoryInfo(),
        symbol: 'price_kwd',
        lastPriceInfo: current.price_kwd,
        title: "دینار کویت",
        shortedName: "KWD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/kw.svg'
    });
    mainCurrencyList.push({
        id: "1000025",
        historyCallInfo: this.currencyService.getBhdRlHistoryInfo(),
        symbol: 'price_bhd',
        lastPriceInfo: current.price_bhd,
        title: "دینار بحرین",
        shortedName: "BHD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bh.svg'
    });
    mainCurrencyList.push({
        id: "1000026",
        historyCallInfo: this.currencyService.getMyrRlHistoryInfo(),
        symbol: 'price_myr',
        lastPriceInfo: current.price_myr,
        title: "رینگیت مالزی",
        shortedName: "MYR",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/my.svg'
    });
    mainCurrencyList.push({
        id: "1000027",
        historyCallInfo: this.currencyService.getThbRlHistoryInfo(),
        symbol: 'price_thb',
        lastPriceInfo: current.price_thb,
        title: "بات تایلند",
        shortedName: "THB",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/th.svg'
    });
    mainCurrencyList.push({
        id: "1000028",
        historyCallInfo: this.currencyService.getHkdRlHistoryInfo(),
        symbol: 'price_hkd',
        lastPriceInfo: current.price_hkd,
        title: "دلار هنگ کنگ",
        shortedName: "HKD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/hk.svg'
    });
    mainCurrencyList.push({
        id: "1000029",
        historyCallInfo: this.currencyService.getRubRlHistoryInfo(),
        symbol: 'price_rub',
        lastPriceInfo: current.price_rub,
        title: "روبل روسیه",
        shortedName: "RUB",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ru.svg'
    });
    mainCurrencyList.push({
        id: "1000030",
        historyCallInfo: this.currencyService.getAznRlHistoryInfo(),
        symbol: 'price_azn',
        lastPriceInfo: current.price_azn,
        title: "منات آذربایجان",
        shortedName: "AZN",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/az.svg'
    });
    mainCurrencyList.push({
        id: "1000031",
        historyCallInfo: this.currencyService.getAmdRlHistoryInfo(),
        symbol: 'price_amd',
        lastPriceInfo: current.price_amd,
        title: "درام ارمنستان",
        shortedName: "AMD",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/am.svg'
    });
    mainCurrencyList.push({
        id: "1000032",
        historyCallInfo: this.currencyService.getGelRlHistoryInfo(),
        symbol: 'price_gel',
        lastPriceInfo: current.price_gel,
        title: "لاری گرجستان",
        shortedName: "GEL",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ge.svg'
    });
    mainCurrencyList.push({
        id: "1000033",
        historyCallInfo: this.currencyService.getKgsRlHistoryInfo(),
        symbol: 'price_kgs',
        lastPriceInfo: current.price_kgs,
        title: "سوم قرقیزستان",
        shortedName: "KGS",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/kg.svg'
    });
    mainCurrencyList.push({
        id: "1000034",
        historyCallInfo: this.currencyService.getTjsRlHistoryInfo(),
        symbol: 'price_tjs',
        lastPriceInfo: current.price_tjs,
        title: "سامانی تاجیکستان",
        shortedName: "TJS",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/tj.svg'
    });
    mainCurrencyList.push({
        id: "1000035",
        historyCallInfo: this.currencyService.getTmtRlHistoryInfo(),
        symbol: 'price_tmt',
        lastPriceInfo: current.price_tmt,
        title: "منات ترکمنستان",
        shortedName: "TMT",
        filterNames: [{name: filter_main_currencies, enName: filter_main_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/tm.svg'
    });


    // Other

    mainCurrencyList.push({
        id: "1000036",
        historyCallInfo: this.currencyService.getAllRlHistoryInfo(),
        symbol: 'price_all',
        lastPriceInfo: current.price_all,
        title: "لک آلبانی",
        shortedName: "ALL",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/al.svg'
    });
    mainCurrencyList.push({
        id: "1000037",
        historyCallInfo: this.currencyService.getBbdRlHistoryInfo(),
        symbol: 'price_bbd',
        lastPriceInfo: current.price_bbd,
        title: "دلار باربادوس",
        shortedName: "BBD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bb.svg'
    });
    mainCurrencyList.push({
        id: "1000038",
        historyCallInfo: this.currencyService.getBdtRlHistoryInfo(),
        symbol: 'price_bdt',
        lastPriceInfo: current.price_bdt,
        title: "تاکا بنگلادش",
        shortedName: "BDT",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bd.svg'
    });
    mainCurrencyList.push({
        id: "1000039",
        historyCallInfo: this.currencyService.getBgnRlHistoryInfo(),
        symbol: 'price_bgn',
        lastPriceInfo: current.price_bgn,
        title: "لو بلغارستان",
        shortedName: "BGN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bg.svg'
    });
    mainCurrencyList.push({
        id: "1000040",
        historyCallInfo: this.currencyService.getBifRlHistoryInfo(),
        symbol: 'price_bif',
        lastPriceInfo: current.price_bif,
        title: "فرانک بوروندی",
        shortedName: "BIF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bi.svg'
    });
    mainCurrencyList.push({
        id: "1000041",
        historyCallInfo: this.currencyService.getBndRlHistoryInfo(),
        symbol: 'price_bnd',
        lastPriceInfo: current.price_bnd,
        title: "دلار بورونئی",
        shortedName: "BHD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bn.svg'
    });
    mainCurrencyList.push({
        id: "1000042",
        historyCallInfo: this.currencyService.getBsdRlHistoryInfo(),
        symbol: 'price_bsd',
        lastPriceInfo: current.price_bsd,
        title: "دلار باهاماس",
        shortedName: "BSD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bs.svg'
    });
    mainCurrencyList.push({
        id: "1000043",
        historyCallInfo: this.currencyService.getBwpRlHistoryInfo(),
        symbol: 'price_bwp',
        lastPriceInfo: current.price_bwp,
        title: "پوله بوتسوانا",
        shortedName: "BWP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bw.svg'
    });
    mainCurrencyList.push({
        id: "1000044",
        historyCallInfo: this.currencyService.getBynRlHistoryInfo(),
        symbol: 'price_byn',
        lastPriceInfo: current.price_byn,
        title: "روبل بلاروس",
        shortedName: "BYN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/by.svg'
    });
    mainCurrencyList.push({
        id: "1000045",
        historyCallInfo: this.currencyService.getBzdRlHistoryInfo(),
        symbol: 'price_bzd',
        lastPriceInfo: current.price_bzd,
        title: "دلار بلیز",
        shortedName: "BZD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bz.svg'
    });
    mainCurrencyList.push({
        id: "1000046",
        historyCallInfo: this.currencyService.getCupRlHistoryInfo(),
        symbol: 'price_cup',
        lastPriceInfo: current.price_cup,
        title: "پزوی کوبا",
        shortedName: "CUP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cu.svg'
    });
    mainCurrencyList.push({
        id: "1000047",
        historyCallInfo: this.currencyService.getCzkRlHistoryInfo(),
        symbol: 'price_czk',
        lastPriceInfo: current.price_czk,
        title: "کرون چک",
        shortedName: "CZK",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cz.svg'
    });
    mainCurrencyList.push({
        id: "1000048",
        historyCallInfo: this.currencyService.getDjfRlHistoryInfo(),
        symbol: 'price_djf',
        lastPriceInfo: current.price_djf,
        title: "فرانک جیبوتی",
        shortedName: "DJF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/dj.svg'
    });
    mainCurrencyList.push({
        id: "1000049",
        historyCallInfo: this.currencyService.getDopRlHistoryInfo(),
        symbol: 'price_dop',
        lastPriceInfo: current.price_dop,
        title: "پزوی دومینیکن",
        shortedName: "DOP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/do.svg'
    });
    mainCurrencyList.push({
        id: "1000050",
        historyCallInfo: this.currencyService.getDzdRlHistoryInfo(),
        symbol: 'price_dzd',
        lastPriceInfo: current.price_dzd,
        title: "دینار الجزایر",
        shortedName: "DZD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/dz.svg'
    });
    mainCurrencyList.push({
        id: "1000051",
        historyCallInfo: this.currencyService.getEtbRlHistoryInfo(),
        symbol: 'price_etb',
        lastPriceInfo: current.price_etb,
        title: "بیر اتیوپی",
        shortedName: "ETB",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/et.svg'
    });
    mainCurrencyList.push({
        id: "1000052",
        historyCallInfo: this.currencyService.getGnfRlHistoryInfo(),
        symbol: 'price_gnf',
        lastPriceInfo: current.price_gnf,
        title: "فرانک گینه",
        shortedName: "GNF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/gn.svg'
    });
    mainCurrencyList.push({
        id: "1000053",
        historyCallInfo: this.currencyService.getGtqRlHistoryInfo(),
        symbol: 'price_gtq',
        lastPriceInfo: current.price_gtq,
        title: "گواتزال گواتمالا",
        shortedName: "GTQ",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/gt.svg'
    });
    mainCurrencyList.push({
        id: "1000054",
        historyCallInfo: this.currencyService.getGydRlHistoryInfo(),
        symbol: 'price_gyd',
        lastPriceInfo: current.price_gyd,
        title: "دلار گویان",
        shortedName: "GYD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/gy.svg'
    });
    mainCurrencyList.push({
        id: "1000055",
        historyCallInfo: this.currencyService.getHnlRlHistoryInfo(),
        symbol: 'price_hnl',
        lastPriceInfo: current.price_hnl,
        title: "لمپیرا هندوراس",
        shortedName: "HNL",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/hn.svg'
    });
    mainCurrencyList.push({
        id: "1000056",
        historyCallInfo: this.currencyService.getHrkRlHistoryInfo(),
        symbol: 'price_hrk',
        lastPriceInfo: current.price_hrk,
        title: "کونا (یورو) کرواسی",
        shortedName: "HRK",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/hr.svg'
    });
    mainCurrencyList.push({
        id: "1000057",
        historyCallInfo: this.currencyService.getHtgRlHistoryInfo(),
        symbol: 'price_htg',
        lastPriceInfo: current.price_htg,
        title: "گورده هائیتی",
        shortedName: "HTG",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ht.svg'
    });
    mainCurrencyList.push({
        id: "1000058",
        historyCallInfo: this.currencyService.getIskRlHistoryInfo(),
        symbol: 'price_isk',
        lastPriceInfo: current.price_isk,
        title: "کرونا ایسلند",
        shortedName: "ISK",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/is.svg'
    });
    mainCurrencyList.push({
        id: "1000059",
        historyCallInfo: this.currencyService.getJmdRlHistoryInfo(),
        symbol: 'price_jmd',
        lastPriceInfo: current.price_jmd,
        title: "دلار جامائیکا",
        shortedName: "JMD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/jm.svg'
    });
    mainCurrencyList.push({
        id: "1000060",
        historyCallInfo: this.currencyService.getKesRlHistoryInfo(),
        symbol: 'price_kes',
        lastPriceInfo: current.price_kes,
        title: "شیلینگ کنیا",
        shortedName: "KES",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ke.svg'
    });
    mainCurrencyList.push({
        id: "1000061",
        historyCallInfo: this.currencyService.getKhrRlHistoryInfo(),
        symbol: 'price_khr',
        lastPriceInfo: current.price_khr,
        title: "ریل کامبوج",
        shortedName: "KHR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/kh.svg'
    });
    mainCurrencyList.push({
        id: "1000062",
        historyCallInfo: this.currencyService.getKmfRlHistoryInfo(),
        symbol: 'price_kmf',
        lastPriceInfo: current.price_kmf,
        title: "فرانک کومور",
        shortedName: "KMF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/km.svg'
    });
    mainCurrencyList.push({
        id: "1000063",
        historyCallInfo: this.currencyService.getKztRlHistoryInfo(),
        symbol: 'price_kzt',
        lastPriceInfo: current.price_kzt,
        title: "تنگه قزاقستان",
        shortedName: "KZT",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/kz.svg'
    });
    mainCurrencyList.push({
        id: "1000064",
        historyCallInfo: this.currencyService.getLakRlHistoryInfo(),
        symbol: 'price_lak',
        lastPriceInfo: current.price_lak,
        title: "کیپ لائوس",
        shortedName: "LAK",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/la.svg'
    });
    mainCurrencyList.push({
        id: "1000065",
        historyCallInfo: this.currencyService.getLbpRlHistoryInfo(),
        symbol: 'price_lbp',
        lastPriceInfo: current.price_lbp,
        title: "پوند لبنان",
        shortedName: "LBP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/lb.svg'
    });
    mainCurrencyList.push({
        id: "1000066",
        historyCallInfo: this.currencyService.getLkrRlHistoryInfo(),
        symbol: 'price_lkr',
        lastPriceInfo: current.price_lkr,
        title: "روپیه سریلانکا",
        shortedName: "LKR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/lk.svg'
    });
    mainCurrencyList.push({
        id: "1000067",
        historyCallInfo: this.currencyService.getLrdRlHistoryInfo(),
        symbol: 'price_lrd',
        lastPriceInfo: current.price_lrd,
        title: "دلار لیبریا",
        shortedName: "LRD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/lr.svg'
    });
    mainCurrencyList.push({
        id: "1000068",
        historyCallInfo: this.currencyService.getLslRlHistoryInfo(),
        symbol: 'price_lsl',
        lastPriceInfo: current.price_lsl,
        title: "لوتی لسوتو",
        shortedName: "LSL",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ls.svg'
    });
    mainCurrencyList.push({
        id: "1000069",
        historyCallInfo: this.currencyService.getLydRlHistoryInfo(),
        symbol: 'price_lyd',
        lastPriceInfo: current.price_lyd,
        title: "دینار لیبی",
        shortedName: "LYD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ly.svg'
    });
    mainCurrencyList.push({
        id: "1000070",
        historyCallInfo: this.currencyService.getMadRlHistoryInfo(),
        symbol: 'price_mad',
        lastPriceInfo: current.price_mad,
        title: "درهم مراکش",
        shortedName: "MAD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ma.svg'
    });
    mainCurrencyList.push({
        id: "1000071",
        historyCallInfo: this.currencyService.getMgaRlHistoryInfo(),
        symbol: 'price_mga',
        lastPriceInfo: current.price_mga,
        title: "آریاری ماداگاسکار",
        shortedName: "MGA",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mg.svg'
    });
    mainCurrencyList.push({
        id: "1000072",
        historyCallInfo: this.currencyService.getMkdRlHistoryInfo(),
        symbol: 'price_mkd',
        lastPriceInfo: current.price_mkd,
        title: "دینار مقدونیه",
        shortedName: "MKD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mk.svg'
    });
    mainCurrencyList.push({
        id: "1000073",
        historyCallInfo: this.currencyService.getMmkRlHistoryInfo(),
        symbol: 'price_mmk',
        lastPriceInfo: current.price_mmk,
        title: "کیات میانمار",
        shortedName: "MMK",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mm.svg'
    });
    mainCurrencyList.push({
        id: "1000074",
        historyCallInfo: this.currencyService.getMopRlHistoryInfo(),
        symbol: 'price_mop',
        lastPriceInfo: current.price_mop,
        title: "پاتاکا ماکائو",
        shortedName: "MOP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mo.svg'
    });
    mainCurrencyList.push({
        id: "1000075",
        historyCallInfo: this.currencyService.getMurRlHistoryInfo(),
        symbol: 'price_mur',
        lastPriceInfo: current.price_mur,
        title: "روپیه موریس",
        shortedName: "MUR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mu.svg'
    });
    mainCurrencyList.push({
        id: "1000076",
        historyCallInfo: this.currencyService.getMvrRlHistoryInfo(),
        symbol: 'price_mvr',
        lastPriceInfo: current.price_mvr,
        title: "روفیا مالدیو",
        shortedName: "MVR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mv.svg'
    });
    mainCurrencyList.push({
        id: "1000077",
        historyCallInfo: this.currencyService.getMwkRlHistoryInfo(),
        symbol: 'price_mwk',
        lastPriceInfo: current.price_mwk,
        title: "کواچا مالاوی",
        shortedName: "MWK",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mw.svg'
    });
    mainCurrencyList.push({
        id: "1000078",
        historyCallInfo: this.currencyService.getMznRlHistoryInfo(),
        symbol: 'price_mzn',
        lastPriceInfo: current.price_mzn,
        title: "متیکال موزامبیک",
        shortedName: "MZN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mz.svg'
    });
    mainCurrencyList.push({
        id: "1000079",
        historyCallInfo: this.currencyService.getNadRlHistoryInfo(),
        symbol: 'price_nad',
        lastPriceInfo: current.price_nad,
        title: "دلار نامیبیا",
        shortedName: "NAD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/na.svg'
    });
    mainCurrencyList.push({
        id: "1000080",
        historyCallInfo: this.currencyService.getNgnRlHistoryInfo(),
        symbol: 'price_ngn',
        lastPriceInfo: current.price_ngn,
        title: "نیرا نیجریه",
        shortedName: "NGN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ng.svg'
    });
    mainCurrencyList.push({
        id: "1000081",
        historyCallInfo: this.currencyService.getNprRlHistoryInfo(),
        symbol: 'price_npr',
        lastPriceInfo: current.price_npr,
        title: "روپیه نپال",
        shortedName: "NPR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/np.svg'
    });
    mainCurrencyList.push({
        id: "1000082",
        historyCallInfo: this.currencyService.getPabRlHistoryInfo(),
        symbol: 'price_pab',
        lastPriceInfo: current.price_pab,
        title: "بالبوآ پاناما",
        shortedName: "PAB",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/pa.svg'
    });
    mainCurrencyList.push({
        id: "1000083",
        historyCallInfo: this.currencyService.getPgkRlHistoryInfo(),
        symbol: 'price_pgk',
        lastPriceInfo: current.price_pgk,
        title: "کینا پاپوا گینه نو",
        shortedName: "PGK",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/pg.svg'
    });
    mainCurrencyList.push({
        id: "1000084",
        historyCallInfo: this.currencyService.getPhpRlHistoryInfo(),
        symbol: 'price_php',
        lastPriceInfo: current.price_php,
        title: "پزوی فیلیپین",
        shortedName: "PHP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ph.svg'
    });
    mainCurrencyList.push({
        id: "1000085",
        historyCallInfo: this.currencyService.getRonRlHistoryInfo(),
        symbol: 'price_ron',
        lastPriceInfo: current.price_ron,
        title: "لئو رومانی",
        shortedName: "RON",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ro.svg'
    });
    mainCurrencyList.push({
        id: "1000086",
        historyCallInfo: this.currencyService.getRsdRlHistoryInfo(),
        symbol: 'price_rsd',
        lastPriceInfo: current.price_rsd,
        title: "دینار صربستان",
        shortedName: "RSD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/rs.svg'
    });
    mainCurrencyList.push({
        id: "1000087",
        historyCallInfo: this.currencyService.getRwfRlHistoryInfo(),
        symbol: 'price_rwf',
        lastPriceInfo: current.price_rwf,
        title: "فرانک رواندا",
        shortedName: "RWF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/rw.svg'
    });
    mainCurrencyList.push({
        id: "1000088",
        historyCallInfo: this.currencyService.getScrRlHistoryInfo(),
        symbol: 'price_scr',
        lastPriceInfo: current.price_scr,
        title: "روپیه سیشل",
        shortedName: "SCR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sc.svg'
    });
    mainCurrencyList.push({
        id: "1000089",
        historyCallInfo: this.currencyService.getSdgRlHistoryInfo(),
        symbol: 'price_sdg',
        lastPriceInfo: current.price_sdg,
        title: "پوند سودان",
        shortedName: "SDG",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sd.svg'
    });
    mainCurrencyList.push({
        id: "1000090",
        historyCallInfo: this.currencyService.getShpRlHistoryInfo(),
        symbol: 'price_shp',
        lastPriceInfo: current.price_shp,
        title: "پوند سینت هلینا",
        shortedName: "SHP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sh.svg'
    });
    mainCurrencyList.push({
        id: "1000091",
        historyCallInfo: this.currencyService.getSosRlHistoryInfo(),
        symbol: 'price_sos',
        lastPriceInfo: current.price_sos,
        title: "شیلینگ سومالی",
        shortedName: "SOS",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/so.svg'
    });
    mainCurrencyList.push({
        id: "1000092",
        historyCallInfo: this.currencyService.getSvcRlHistoryInfo(),
        symbol: 'price_svc',
        lastPriceInfo: current.price_svc,
        title: "کولون السالوادور",
        shortedName: "SVC",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sv.svg'
    });
    mainCurrencyList.push({
        id: "1000093",
        historyCallInfo: this.currencyService.getSzlRlHistoryInfo(),
        symbol: 'price_szl',
        lastPriceInfo: current.price_szl,
        title: "لیلانگی سوازیلند",
        shortedName: "SZL",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sz.svg'
    });
    mainCurrencyList.push({
        id: "1000094",
        historyCallInfo: this.currencyService.getTndRlHistoryInfo(),
        symbol: 'price_tnd',
        lastPriceInfo: current.price_tnd,
        title: "دینار تونس",
        shortedName: "TND",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/tn.svg'
    });
    mainCurrencyList.push({
        id: "1000095",
        historyCallInfo: this.currencyService.getTtdRlHistoryInfo(),
        symbol: 'price_ttd',
        lastPriceInfo: current.price_ttd,
        title: "دلار ترینیداد و توباگو",
        shortedName: "TTD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/tt.svg'
    });
    mainCurrencyList.push({
        id: "1000096",
        historyCallInfo: this.currencyService.getTzsRlHistoryInfo(),
        symbol: 'price_tzs',
        lastPriceInfo: current.price_tzs,
        title: "شیلینگ تانزانیا",
        shortedName: "TZS",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/tz.svg'
    });
    mainCurrencyList.push({
        id: "1000097",
        historyCallInfo: this.currencyService.getUgxRlHistoryInfo(),
        symbol: 'price_ugx',
        lastPriceInfo: current.price_ugx,
        title: "شیلینگ اوگاندا",
        shortedName: "UGX",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ug.svg'
    });
    mainCurrencyList.push({
        id: "1000098",
        historyCallInfo: this.currencyService.getYerRlHistoryInfo(),
        symbol: 'price_yer',
        lastPriceInfo: current.price_yer,
        title: "ريال یمن",
        shortedName: "YER",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ye.svg'
    });
    mainCurrencyList.push({
        id: "1000099",
        historyCallInfo: this.currencyService.getZmwRlHistoryInfo(),
        symbol: 'price_zmw',
        lastPriceInfo: current.price_zmw,
        title: "کواچا زامبیا",
        shortedName: "ZMW",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/zm.svg'
    });
    mainCurrencyList.push({
        id: "1000100",
        historyCallInfo: this.currencyService.getGhsRlHistoryInfo(),
        symbol: 'price_ghs',
        lastPriceInfo: current.price_ghs,
        title: "سدی غنا",
        shortedName: "GHS",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/gh.svg'
    });
    mainCurrencyList.push({
        id: "1000101",
        historyCallInfo: this.currencyService.getPenRlHistoryInfo(),
        symbol: 'price_pen',
        lastPriceInfo: current.price_pen,
        title: "سول پرو",
        shortedName: "PEN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/pe.svg'
    });
    mainCurrencyList.push({
        id: "1000102",
        historyCallInfo: this.currencyService.getClpRlHistoryInfo(),
        symbol: 'price_clp',
        lastPriceInfo: current.price_clp,
        title: "پزوی شیلی",
        shortedName: "CLP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cl.svg'
    });
    mainCurrencyList.push({
        id: "1000103",
        historyCallInfo: this.currencyService.getEgpRlHistoryInfo(),
        symbol: 'price_egp',
        lastPriceInfo: current.price_egp,
        title: "پوند مصر",
        shortedName: "EGP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/eg.svg'
    });
    mainCurrencyList.push({
        id: "1000104",
        historyCallInfo: this.currencyService.getMxnRlHistoryInfo(),
        symbol: 'price_mxn',
        lastPriceInfo: current.price_mxn,
        title: "پزوی مکزیک",
        shortedName: "MXN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mx.svg'
    });
    mainCurrencyList.push({
        id: "1000105",
        historyCallInfo: this.currencyService.getJodRlHistoryInfo(),
        symbol: 'price_jod',
        lastPriceInfo: current.price_jod,
        title: "دینار اردن",
        shortedName: "JOD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/jo.svg'
    });
    mainCurrencyList.push({
        id: "1000106",
        historyCallInfo: this.currencyService.getBrlRlHistoryInfo(),
        symbol: 'price_brl',
        lastPriceInfo: current.price_brl,
        title: "رئال برزیل",
        shortedName: "BRL",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/br.svg'
    });
    mainCurrencyList.push({
        id: "1000107",
        historyCallInfo: this.currencyService.getUyuRlHistoryInfo(),
        symbol: 'price_uyu',
        lastPriceInfo: current.price_uyu,
        title: "پزوی اوروگوئه",
        shortedName: "UYU",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/uy.svg'
    });
    mainCurrencyList.push({
        id: "1000108",
        historyCallInfo: this.currencyService.getCopRlHistoryInfo(),
        symbol: 'price_cop',
        lastPriceInfo: current.price_cop,
        title: "پزوی کلمبیا",
        shortedName: "COP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/co.svg'
    });
    mainCurrencyList.push({
        id: "1000109",
        historyCallInfo: this.currencyService.getPlnRlHistoryInfo(),
        symbol: 'price_pln',
        lastPriceInfo: current.price_pln,
        title: "زلوتی لهستان",
        shortedName: "PLN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/pl.svg'
    });
    mainCurrencyList.push({
        id: "1000110",
        historyCallInfo: this.currencyService.getArsRlHistoryInfo(),
        symbol: 'price_ars',
        lastPriceInfo: current.price_ars,
        title: "پزوی آرژانتین",
        shortedName: "ARS",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ar.svg'
    });
    mainCurrencyList.push({
        id: "1000111",
        historyCallInfo: this.currencyService.getKydRlHistoryInfo(),
        symbol: 'price_kyd',
        lastPriceInfo: current.price_kyd,
        title: "دلار جزایر کیمن",
        shortedName: "KYD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ky.svg'
    });
    mainCurrencyList.push({
        id: "1000112",
        historyCallInfo: this.currencyService.getHufRlHistoryInfo(),
        symbol: 'price_huf',
        lastPriceInfo: current.price_huf,
        title: "فورینت مجارستان",
        shortedName: "HUF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/hu.svg'
    });
    mainCurrencyList.push({
        id: "1000113",
        historyCallInfo: this.currencyService.getPygRlHistoryInfo(),
        symbol: 'price_pyg',
        lastPriceInfo: current.price_pyg,
        title: "گورانی پاراکوئه",
        shortedName: "PYG",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/py.svg'
    });
    mainCurrencyList.push({
        id: "1000114",
        historyCallInfo: this.currencyService.getUahRlHistoryInfo(),
        symbol: 'price_uah',
        lastPriceInfo: current.price_uah,
        title: "هریونیا اوکراین",
        shortedName: "UAH",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ua.svg'
    });
    mainCurrencyList.push({
        id: "1000115",
        historyCallInfo: this.currencyService.getZarRlHistoryInfo(),
        symbol: 'price_zar',
        lastPriceInfo: current.price_zar,
        title: "رند آفریقای جنوبی",
        shortedName: "ZAR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/za.svg'
    });
    mainCurrencyList.push({
        id: "1000116",
        historyCallInfo: this.currencyService.getNioRlHistoryInfo(),
        symbol: 'price_nio',
        lastPriceInfo: current.price_nio,
        title: "کوردوبا نیکاراگوئه",
        shortedName: "NIO",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ni.svg'
    });
    mainCurrencyList.push({
        id: "1000117",
        historyCallInfo: this.currencyService.getFjdRlHistoryInfo(),
        symbol: 'price_fjd',
        lastPriceInfo: current.price_fjd,
        title: "دلار فیجی",
        shortedName: "FJD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/fj.svg'
    });
    mainCurrencyList.push({
        id: "1000118",
        historyCallInfo: this.currencyService.getTwdRlHistoryInfo(),
        symbol: 'price_twd',
        lastPriceInfo: current.price_twd,
        title: "دلار تایوان",
        shortedName: "TWD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/tw.svg'
    });
    mainCurrencyList.push({
        id: "1000119",
        historyCallInfo: this.currencyService.getUzsRlHistoryInfo(),
        symbol: 'price_uzs',
        lastPriceInfo: current.price_uzs,
        title: "سوم ازبکستان (10000)",
        shortedName: "UZS",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/uz.svg'
    });
    mainCurrencyList.push({
        id: "1000120",
        historyCallInfo: this.currencyService.getIdrRlHistoryInfo(),
        symbol: 'price_idr',
        lastPriceInfo: current.price_idr,
        title: "روپیه اندونزی",
        shortedName: "IDR",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/id.svg'
    });
    mainCurrencyList.push({
        id: "1000121",
        historyCallInfo: this.currencyService.getXofRlHistoryInfo(),
        symbol: 'price_xof',
        lastPriceInfo: current.price_xof,
        title: "فرانک آفریقای غربی",
        shortedName: "XOF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/za.svg'
    });
    mainCurrencyList.push({
        id: "1000122",
        historyCallInfo: this.currencyService.getXpfRlHistoryInfo(),
        symbol: 'price_xpf',
        lastPriceInfo: current.price_xpf,
        title: "فرانک اقیانوسیه",
        shortedName: "XPF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/pf.svg'
    });
    mainCurrencyList.push({
        id: "1000123",
        historyCallInfo: this.currencyService.getVndRlHistoryInfo(),
        symbol: 'price_vnd',
        lastPriceInfo: current.price_vnd,
        title: "دونگ ویتنام",
        shortedName: "VND",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/vn.svg'
    });
    mainCurrencyList.push({
        id: "1000124",
        historyCallInfo: this.currencyService.getGmdRlHistoryInfo(),
        symbol: 'price_gmd',
        lastPriceInfo: current.price_gmd,
        title: "دلاسی گامبیا",
        shortedName: "GMD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/gm.svg'
    });
    mainCurrencyList.push({
        id: "1000125",
        historyCallInfo: this.currencyService.getXafRlHistoryInfo(),
        symbol: 'price_xaf',
        lastPriceInfo: current.price_xaf,
        title: "فرانک آفریقای مرکزی",
        shortedName: "XAF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cf.svg'
    });
    mainCurrencyList.push({
        id: "1000126",
        historyCallInfo: this.currencyService.getVuvRlHistoryInfo(),
        symbol: 'price_vuv',
        lastPriceInfo: current.price_vuv,
        title: "وانواتو واتو",
        shortedName: "VUV",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/vu.svg'
    });
    mainCurrencyList.push({
        id: "1000127",
        historyCallInfo: this.currencyService.getMroRlHistoryInfo(),
        symbol: 'price_mro',
        lastPriceInfo: current.price_mro,
        title: "اوگویا موریتانا",
        shortedName: "MRO",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/mr.svg'
    });
    mainCurrencyList.push({
        id: "1000128",
        historyCallInfo: this.currencyService.getAngRlHistoryInfo(),
        symbol: 'price_ang',
        lastPriceInfo: current.price_ang,
        title: "آنتیل گیلدر هلند",
        shortedName: "ANG",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ang.svg'
    });
    mainCurrencyList.push({
        id: "1000129",
        historyCallInfo: this.currencyService.getStdRlHistoryInfo(),
        symbol: 'price_std',
        lastPriceInfo: current.price_std,
        title: "دوبرا سائوتومه و پرنسیپ",
        shortedName: "STD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/st.svg'
    });
    mainCurrencyList.push({
        id: "1000130",
        historyCallInfo: this.currencyService.getXcdRlHistoryInfo(),
        symbol: 'price_xcd',
        lastPriceInfo: current.price_xcd,
        title: "دلار کارائیب شرقی",
        shortedName: "XCD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/zw.svg'
    });
    mainCurrencyList.push({
        id: "1000131",
        historyCallInfo: this.currencyService.getBamRlHistoryInfo(),
        symbol: 'price_bam',
        lastPriceInfo: current.price_bam,
        title: "مارک بوسنی و هرزگوین",
        shortedName: "BAM",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ba.svg'
    });
    mainCurrencyList.push({
        id: "1000132",
        historyCallInfo: this.currencyService.getBtnRlHistoryInfo(),
        symbol: 'price_btn',
        lastPriceInfo: current.price_btn,
        title: "نگولتروم بوتان",
        shortedName: "BTN",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bt.svg'
    });
    mainCurrencyList.push({
        id: "1000133",
        historyCallInfo: this.currencyService.getCdfRlHistoryInfo(),
        symbol: 'price_cdf',
        lastPriceInfo: current.price_cdf,
        title: "فرانک کنگو",
        shortedName: "CDF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cd.svg'
    });
    mainCurrencyList.push({
        id: "1000134",
        historyCallInfo: this.currencyService.getCrcRlHistoryInfo(),
        symbol: 'price_crc',
        lastPriceInfo: current.price_crc,
        title: "کولون کاستاریکا",
        shortedName: "CRC",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cr.svg'
    });
    mainCurrencyList.push({
        id: "1000135",
        historyCallInfo: this.currencyService.getCveRlHistoryInfo(),
        symbol: 'price_cve',
        lastPriceInfo: current.price_cve,
        title: "اسکودوی کیپ ورد",
        shortedName: "CVE",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cv.svg'
    });
    mainCurrencyList.push({
        id: "1000136",
        historyCallInfo: this.currencyService.getBmdRlHistoryInfo(),
        symbol: 'price_bmd',
        lastPriceInfo: current.price_bmd,
        title: "دلار برمودا",
        shortedName: "BMD",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/bm.svg'
    });
    mainCurrencyList.push({
        id: "1000137",
        historyCallInfo: this.currencyService.getAwgRlHistoryInfo(),
        symbol: 'price_awg',
        lastPriceInfo: current.price_awg,
        title: "فلورین آروبا",
        shortedName: "AWG",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/aw.svg'
    });
    mainCurrencyList.push({
        id: "1000138",
        historyCallInfo: this.currencyService.getSllRlHistoryInfo(),
        symbol: 'price_sll',
        lastPriceInfo: current.price_sll,
        title: "لئون سیرالئون",
        shortedName: "SLL",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/sl.svg'
    });
    mainCurrencyList.push({
        id: "1000139",
        historyCallInfo: this.currencyService.getVefRlHistoryInfo(),
        symbol: 'price_vef',
        lastPriceInfo: current.price_vef,
        title: "بولیوار ونزوئلا",
        shortedName: "VEF",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/ve.svg'
    });
    mainCurrencyList.push({
        id: "1000140",
        historyCallInfo: this.currencyService.getCypRlHistoryInfo(),
        symbol: 'price_cyp',
        lastPriceInfo: current.price_cyp,
        title: "پوند (یورو) قبرس",
        shortedName: "CYP",
        filterNames: [{name: filter_other_currencies, enName: filter_other_currencies_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/cy.svg'
    });

    // Dollar Market
    mainCurrencyList.push({
        id: "1000142",
        historyCallInfo: this.currencyService.getNimaUSDBuyHistoryInfo(),
        symbol: 'ice_transfer_usd_buy',
        lastPriceInfo: current.ice_transfer_usd_buy,
        title: "دلار (نیما/خرید)",
        shortedName: "Nima USD Buy",
        filterNames: [{name: filter_dollar_market, enName: filter_dollar_market_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/us.svg',
    });

    
    mainCurrencyList.push({
        id: "1000143",
        historyCallInfo: this.currencyService.getEXUsdSellHistoryInfo(),
        symbol: 'exusd_sell',
        lastPriceInfo: current.exusd_sell,
        title: "دلار توافقی",
        shortedName: "Negotiated USD",
        filterNames: [{name: filter_dollar_market, enName: filter_dollar_market_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/us.svg',
    });
    
    mainCurrencyList.push({
        id: "1000144",
        historyCallInfo: this.currencyService.getAfghanUsdHistoryInfo(),
        symbol: 'afghan_usd',
        lastPriceInfo: current.afghan_usd,
        title: "دلار هرات",
        shortedName: "Herat USD",
        filterNames: [{name: filter_dollar_market, enName: filter_dollar_market_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/us.svg',
    });

    
    mainCurrencyList.push({
        id: "1000146",
        historyCallInfo: this.currencyService.getNimaUSDSellHistoryInfo(),
        symbol: 'ice_transfer_usd_sell',
        lastPriceInfo: current.ice_transfer_usd_sell,
        title: "دلار (نیما/فروش)",
        shortedName: "Nima USD Sell",
        filterNames: [{name: filter_dollar_market, enName: filter_dollar_market_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/us.svg',
    });
    

    
    mainCurrencyList.push({
        id: "1000147",
        historyCallInfo: this.currencyService.getIceUSDHistoryInfo(),
        symbol: 'ice_usd',
        lastPriceInfo: current.ice_usd,
        title: "دلار (بازار متشکل ارزی)",
        shortedName: "Exchange Market USD",
        filterNames: [{name: filter_dollar_market, enName: filter_dollar_market_en}],
        groupName: MAIN_CURRENCY_PREFIX,
        unit: toman_unit,
        img: '/assets/images/country-flags/us.svg',
    });

    this.mainCurrencyListSubject.next(mainCurrencyList)

  }

  private setupCryptoList(current: Current) {
    const cryptoList: CurrencyItem[] = []
    
    cryptoList.push({
        id: "2000141",
        historyCallInfo: this.currencyService.getCryptoBtcHistoryInfo(),
        symbol: 'crypto-bitcoin',
        lastPriceInfo: current["crypto-bitcoin"],
        title: "بیت کوین",
        shortedName: "BTC",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/btc.svg'
    });
    cryptoList.push({
        id: "2000142",
        historyCallInfo: this.currencyService.getCryptoEthHistoryInfo(),
        symbol: 'crypto-ethereum',
        lastPriceInfo: current["crypto-ethereum"],
        title: "اتریوم",
        shortedName: "ETH",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/eth.svg'
    });
    cryptoList.push({
        id: "2000143",
        historyCallInfo: this.currencyService.getCryptoTetherHistoryInfo(),
        symbol: 'crypto-tether',
        lastPriceInfo: current["crypto-tether"],
        title: "تتر",
        shortedName: "USDT",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/usdt.svg'
    });
    cryptoList.push({
        id: "2000144",
        historyCallInfo: this.currencyService.getCryptoBinanceCoinHistoryInfo(),
        symbol: 'crypto-binance-coin',
        lastPriceInfo: current["crypto-binance-coin"],
        title: "بایننس کوین",
        shortedName: "BNB",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/bnb.svg'
    });
    cryptoList.push({
        id: "2000145",
        historyCallInfo: this.currencyService.getCryptoSolanaHistoryInfo(),
        symbol: 'crypto-solana',
        lastPriceInfo: current["crypto-solana"],
        title: "سولانا",
        shortedName: "SOL",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/sol.svg'
    });
    cryptoList.push({
        id: "2000146",
        historyCallInfo: this.currencyService.getCryptoUSDCoinHistoryInfo(),
        symbol: 'crypto-usd-coin',
        lastPriceInfo: current["crypto-usd-coin"],
        title: "یو اس دی کوین",
        shortedName: "USDC",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/usdc.svg'
    });
    cryptoList.push({
        id: "2000147",
        historyCallInfo: this.currencyService.getCryptoRippleHistoryInfo(),
        symbol: 'crypto-ripple',
        lastPriceInfo: current["crypto-ripple"],
        title: "ریپل",
        shortedName: "XRP",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/xrp.svg'
    });
    cryptoList.push({
        id: "2000148",
        historyCallInfo: this.currencyService.getCryptoCardanoHistoryInfo(),
        symbol: 'crypto-cardano',
        lastPriceInfo: current["crypto-cardano"],
        title: "کاردانو",
        shortedName: "ADA",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/ada.svg'
    });
    cryptoList.push({
        id: "2000149",
        historyCallInfo: this.currencyService.getCryptoDogecoinHistoryInfo(),
        symbol: 'crypto-dogecoin',
        lastPriceInfo: current["crypto-dogecoin"],
        title: "دوج کوین",
        shortedName: "DOGE",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/doge.svg'
    });
    cryptoList.push({
        id: "2000150",
        historyCallInfo: this.currencyService.getCryptoAvalancheHistoryInfo(),
        symbol: 'crypto-avalanche',
        lastPriceInfo: current["crypto-avalanche"],
        title: "آوالانچ",
        shortedName: "AVAX",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/avax.svg'
    });
    cryptoList.push({
        id: "2000151",
        historyCallInfo: this.currencyService.getCryptoShibaInuHistoryInfo(),
        symbol: 'crypto-shiba-inu',
        lastPriceInfo: current["crypto-shiba-inu"],
        title: "شیبا اینو",
        shortedName: "SHIB",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/shiba_inu2.webp'
    });
    cryptoList.push({
        id: "2000152",
        historyCallInfo: this.currencyService.getCryptoPolkadotHistoryInfo(),
        symbol: 'crypto-polkadot',
        lastPriceInfo: current["crypto-polkadot"],
        title: "پولکا دات",
        shortedName: "DOT",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/dot.svg'
    });
    cryptoList.push({
        id: "2000153",
        historyCallInfo: this.currencyService.getCryptoTronHistoryInfo(),
        symbol: 'crypto-tron',
        lastPriceInfo: current["crypto-tron"],
        title: "ترون",
        shortedName: "TRX",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/trx.svg'
    });
    cryptoList.push({
        id: "2000154",
        historyCallInfo: this.currencyService.getCryptoBchHistoryInfo(),
        symbol: 'crypto-bitcoin-cash',
        lastPriceInfo: current["crypto-bitcoin-cash"],
        title: "بیت کوین کش",
        shortedName: "BCH",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/bch.svg'
    });
    cryptoList.push({
        id: "2000155",
        historyCallInfo: this.currencyService.getCryptoUniHistoryInfo(),
        symbol: 'crypto-uniswap',
        lastPriceInfo: current["crypto-uniswap"],
        title: "یونی سواپ",
        shortedName: "UNI",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/uni.svg'
    });
    cryptoList.push({
        id: "2000156",
        historyCallInfo: this.currencyService.getCryptoLtcHistoryInfo(),
        symbol: 'crypto-litecoin',
        lastPriceInfo: current["crypto-litecoin"],
        title: "لایت کوین",
        shortedName: "LTC",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/ltc.svg'
    });
    cryptoList.push({
        id: "2000157",
        historyCallInfo: this.currencyService.getCryptoFilHistoryInfo(),
        symbol: 'crypto-filecoin',
        lastPriceInfo: current["crypto-filecoin"],
        title: "فایل کوین",
        shortedName: "FIL",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/fil.svg'
    });
    cryptoList.push({
        id: "2000158",
        historyCallInfo: this.currencyService.getCryptoAtomHistoryInfo(),
        symbol: 'crypto-cosmos',
        lastPriceInfo: current["crypto-cosmos"],
        title: "اتم (کازماز)",
        shortedName: "ATOM",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/atom.svg'
    });
    cryptoList.push({
        id: "2000159",
        historyCallInfo: this.currencyService.getCryptoClassicEthHistoryInfo(),
        symbol: 'crypto-ethereum-classic',
        lastPriceInfo: current["crypto-ethereum-classic"],
        title: "اتریوم کلاسیک",
        shortedName: "ETC",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/etc.svg'
    });
    cryptoList.push({
        id: "2000160",
        historyCallInfo: this.currencyService.getCryptoStellarHistoryInfo(),
        symbol: 'crypto-stellar',
        lastPriceInfo: current["crypto-stellar"],
        title: "استلار",
        shortedName: "XLM",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/xlm.svg'
    });
    cryptoList.push({
        id: "2000161",
        historyCallInfo: this.currencyService.getCryptoFantomHistoryInfo(),
        symbol: 'crypto-fantom',
        lastPriceInfo: current["crypto-fantom"],
        title: "فانتوم",
        shortedName: "FTM",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/ftm.webp'
    });
    cryptoList.push({
        id: "2000162",
        historyCallInfo: this.currencyService.getCryptoElrondHistoryInfo(),
        symbol: 'crypto-elrond',
        lastPriceInfo: current["crypto-elrond"],
        title: "الروند",
        shortedName: "EGLD",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/egld.webp'
    });
    cryptoList.push({
        id: "2000163",
        historyCallInfo: this.currencyService.getCryptoMakerHistoryInfo(),
        symbol: 'crypto-maker',
        lastPriceInfo: current["crypto-maker"],
        title: "میکر",
        shortedName: "MKR",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/mkr.svg'
    });
    cryptoList.push({
        id: "2000164",
        historyCallInfo: this.currencyService.getCryptoEOSHistoryInfo(),
        symbol: 'crypto-eos',
        lastPriceInfo: current["crypto-eos"],
        title: "ایوس",
        shortedName: "EOS",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/eos.svg'
    });
    cryptoList.push({
        id: "2000165",
        historyCallInfo: this.currencyService.getCryptoBittorrentHistoryInfo(),
        symbol: 'crypto-bittorrent',
        lastPriceInfo: current["crypto-bittorrent"],
        title: "بیت تورنت",
        shortedName: "BTT",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/btt.svg'
    });
    cryptoList.push({
        id: "2000166",
        historyCallInfo: this.currencyService.getCryptoFlowHistoryInfo(),
        symbol: 'crypto-flow',
        lastPriceInfo: current["crypto-flow"],
        title: "فلو",
        shortedName: "FLOW",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/flow.webp'
    });
    cryptoList.push({
        id: "2000167",
        historyCallInfo: this.currencyService.getCryptoGalaHistoryInfo(),
        symbol: 'crypto-gala',
        lastPriceInfo: current["crypto-gala"],
        title: "گالا",
        shortedName: "GALA",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/gala.webp'
    });
    cryptoList.push({
        id: "2000168",
        historyCallInfo: this.currencyService.getCryptoSandboxHistoryInfo(),
        symbol: 'crypto-sandbox',
        lastPriceInfo: current["crypto-sandbox"],
        title: "د سندباکس",
        shortedName: "SAND",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/sand.svg'
    });
    cryptoList.push({
        id: "2000169",
        historyCallInfo: this.currencyService.getCryptoPancakeSwapHistoryInfo(),
        symbol: 'crypto-pancakeswap',
        lastPriceInfo: current["crypto-pancakeswap"],
        title: "پنکیک سواپ",
        shortedName: "CAKE",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/cakeswap.webp'
    });
    cryptoList.push({
        id: "2000170",
        historyCallInfo: this.currencyService.getCryptoDashHistoryInfo(),
        symbol: 'crypto-dash',
        lastPriceInfo: current["crypto-dash"],
        title: "دش",
        shortedName: "DASH",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/dash.svg'
    });
    cryptoList.push({
        id: "2000171",
        historyCallInfo: this.currencyService.getCryptoMoneroHistoryInfo(),
        symbol: 'crypto-monero',
        lastPriceInfo: current["crypto-monero"],
        title: "مونرو",
        shortedName: "XMR",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/xmr.svg'
    });
    cryptoList.push({
        id: "2000172",
        historyCallInfo: this.currencyService.getCryptoChainlinkHistoryInfo(),
        symbol: 'crypto-chainlink',
        lastPriceInfo: current["crypto-chainlink"],
        title: "چین لینک (بلاک چین)",
        shortedName: "LINK",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/link.svg'
    });
    cryptoList.push({
        id: "2000173",
        historyCallInfo: this.currencyService.getCryptoCashaaHistoryInfo(),
        symbol: 'crypto-cashaa',
        lastPriceInfo: current["crypto-cashaa"],
        title: "کاشا",
        shortedName: "CAS",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/cashaa.webp'
    });
    cryptoList.push({
        id: "2000174",
        historyCallInfo: this.currencyService.getCryptoTezosHistoryInfo(),
        symbol: 'crypto-tezos',
        lastPriceInfo: current["crypto-tezos"],
        title: "تزوس",
        shortedName: "XTZ",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/xtz.svg'
    });
    cryptoList.push({
        id: "2000175",
        historyCallInfo: this.currencyService.getCryptoLoopringHistoryInfo(),
        symbol: 'crypto-loopring-irc',
        lastPriceInfo: current["crypto-loopring-irc"],
        title: "لوپرینگ",
        shortedName: "LRC",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/lrc.svg'
    });
    cryptoList.push({
        id: "2000176",
        historyCallInfo: this.currencyService.getCryptoDecredHistoryInfo(),
        symbol: 'crypto-decred',
        lastPriceInfo: current["crypto-decred"],
        title: "دیکرید",
        shortedName: "DCR",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/dcr.svg'
    });
    cryptoList.push({
        id: "2000177",
        historyCallInfo: this.currencyService.getCryptoWavesHistoryInfo(),
        symbol: 'crypto-waves',
        lastPriceInfo: current["crypto-waves"],
        title: "ویوز",
        shortedName: "WAVES",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/waves.svg'
    });
    cryptoList.push({
        id: "2000178",
        historyCallInfo: this.currencyService.getCryptoZcashHistoryInfo(),
        symbol: 'crypto-zcash',
        lastPriceInfo: current["crypto-zcash"],
        title: "زد کش",
        shortedName: "ZEC",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/zec.svg'
    });
    cryptoList.push({
        id: "2000179",
        historyCallInfo: this.currencyService.getCryptoNEMHistoryInfo(),
        symbol: 'crypto-nem',
        lastPriceInfo: current["crypto-nem"],
        title: "نیو اکونومی",
        shortedName: "XEM",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/link.svg'
    });
    cryptoList.push({
        id: "2000180",
        historyCallInfo: this.currencyService.getCryptoNeoHistoryInfo(),
        symbol: 'crypto-neo',
        lastPriceInfo: current["crypto-neo"],
        title: "نئو",
        shortedName: "NEO",
        filterNames: [{name: filter_cryptocurrency, enName: filter_cryptocurrency_en}],
        groupName: CRYPTO_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/crypto-icons/neo.svg'
    });

    this.cryptoListSubject.next(cryptoList)
  }

  private setupWorldMarketList(current: Current) {
    const worldMarketList: CurrencyItem[] = []

    worldMarketList.push({
        id: "3000181",
        historyCallInfo: this.currencyService.getEurUsdAskHistoryInfo(),
        symbol: 'eur-usd-ask',
        lastPriceInfo: current["eur-usd-ask"],
        title: "یورو / دلار آمریکا",
        shortedName: "EUR/USD Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/eu-usd.webp'
    });
    worldMarketList.push({
        id: "3000182",
        historyCallInfo: this.currencyService.getGbpUsdAskHistoryInfo(),
        symbol: 'gbp-usd-ask',
        lastPriceInfo: current["gbp-usd-ask"],
        title: "پوند انگلیس / دلار آمریکا",
        shortedName: "GBP/USD Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/gb-us.webp'
    });
    worldMarketList.push({
        id: "3000183",
        historyCallInfo: this.currencyService.getUsdJpyAskHistoryInfo(),
        symbol: 'gbp-usd-ask',
        lastPriceInfo: current["gbp-usd-ask"],
        title: "دلار آمریکا / ین ژاپن",
        shortedName: "USD/JPY Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-jp.webp'
    });
    worldMarketList.push({
        id: "3000184",
        historyCallInfo: this.currencyService.getUsdChfAskHistoryInfo(),
        symbol: 'usd-chf-ask',
        lastPriceInfo: current["usd-chf-ask"],
        title: "دلار آمریکا / فرانک سوییس",
        shortedName: "USD/CHF Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-ch.webp'
    });
    worldMarketList.push({
        id: "3000185",
        historyCallInfo: this.currencyService.getAudUsdAskHistoryInfo(),
        symbol: 'aud-usd-ask',
        lastPriceInfo: current["aud-usd-ask"],
        title: "دلار استرالیا / دلار آمریکا",
        shortedName: "AUD/USD Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/au-us.webp'
    });
    worldMarketList.push({
        id: "3000186",
        historyCallInfo: this.currencyService.getUsdCadAskHistoryInfo(),
        symbol: 'usd-cad-ask',
        lastPriceInfo: current["usd-cad-ask"],
        title: "دلار آمریکا / دلار کانادا",
        shortedName: "USD/CAD Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-ca.webp'
    });
    worldMarketList.push({
        id: "3000187",
        historyCallInfo: this.currencyService.getUsdNzdAskHistoryInfo(),
        symbol: 'usd-nzd-ask',
        lastPriceInfo: current["usd-nzd-ask"],
        title: "دلار آمریکا / دلار نیوزلند",
        shortedName: "USD/NZD Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-nz.webp'
    });
    worldMarketList.push({
        id: "3000188",
        historyCallInfo: this.currencyService.getUsdTryAskHistoryInfo(),
        symbol: 'usd-try-ask',
        lastPriceInfo: current["usd-try-ask"],
        title: "دلار آمریکا / لیر ترکیه",
        shortedName: "USD/TRY Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-tr.webp'
    });
    worldMarketList.push({
        id: "3000189",
        historyCallInfo: this.currencyService.getUsdSekAskHistoryInfo(),
        symbol: 'usd-sek-ask',
        lastPriceInfo: current["usd-sek-ask"],
        title: "دلار آمریکا / کرون سوئد",
        shortedName: "USD/SEK Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-se.webp'
    });
    worldMarketList.push({
        id: "3000190",
        historyCallInfo: this.currencyService.getUsdSarAskHistoryInfo(),
        symbol: 'usd-sar-ask',
        lastPriceInfo: current["usd-sar-ask"],
        title: "دلار آمریکا / ريال عربستان",
        shortedName: "USD/SAR Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-sa.webp'
    });
    worldMarketList.push({
        id: "3000191",
        historyCallInfo: this.currencyService.getUsdKrwAskHistoryInfo(),
        symbol: 'usd-krw-ask',
        lastPriceInfo: current["usd-krw-ask"],
        title: "دلار آمریکا / وون کره جنوبی",
        shortedName: "USD/KRW Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-kr.webp'
    });
    worldMarketList.push({
        id: "3000192",
        historyCallInfo: this.currencyService.getUsdCnyAskHistoryInfo(),
        symbol: 'usd-cny-ask',
        lastPriceInfo: current["usd-cny-ask"],
        title: "دلار آمریکا / یوان چین",
        shortedName: "USD/CNY Ask",
        filterNames: [{name: filter_pair_currencies, enName: filter_pair_currencies_en}],
        groupName: WORLD_MARKET_PREFIX,
        img: '/assets/images/ask-flags/us-cn.webp'
    });

    this.worldMarketListSubject.next(worldMarketList)
  }

  private setupCoinList(current: Current) {
    const coinList: CurrencyItem[] = []

    // coins
    coinList.push({
        id: "4000193",
        historyCallInfo: this.currencyService.getImamiCoinHistoryInfo(),
        symbol: 'sekee',
        lastPriceInfo: current.sekee,
        title: "سکه امامی",
        shortedName: "Imami Coin",
        filterNames: [{name: filter_coin_cash, enName: filter_coin_cash_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000194",
        historyCallInfo: this.currencyService.getBaharCoinHistoryInfo(),
        symbol: 'sekeb',
        lastPriceInfo: current.sekeb,
        title: "سکه بهار آزادی",
        shortedName: "Bahar Coin",
        filterNames: [{name: filter_coin_cash, enName: filter_coin_cash_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000195",
        historyCallInfo: this.currencyService.getHalfCoinHistoryInfo(),
        symbol: 'nim',
        lastPriceInfo: current.nim,
        title: "نیم سکه",
        shortedName: "Half Coin",
        filterNames: [{name: filter_coin_cash, enName: filter_coin_cash_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000196",
        historyCallInfo: this.currencyService.getQuarterCoinHistoryInfo(),
        symbol: 'rob',
        lastPriceInfo: current.rob,
        title: "ربع سکه",
        shortedName: "Quarter Coin",
        filterNames: [{name: filter_coin_cash, enName: filter_coin_cash_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000197",
        historyCallInfo: this.currencyService.getGramCoinHistoryInfo(),
        symbol: 'gerami',
        lastPriceInfo: current.gerami,
        title: "سکه گرمی",
        shortedName: "Gram Coin",
        filterNames: [{name: filter_coin_cash, enName: filter_coin_cash_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });

    
    // retail
    coinList.push({
        id: "4000198",
        historyCallInfo: this.currencyService.getRetailImamiCoinHistoryInfo(),
        symbol: 'retail_sekee',
        lastPriceInfo: current.retail_sekee,
        title: "سکه امامی تک فروشی",
        shortedName: "Retail Imami Coin",
        filterNames: [{name: filter_coin_retail, enName: filter_coin_retail_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000199",
        historyCallInfo: this.currencyService.getRetailBaharCoinHistoryInfo(),
        symbol: 'retail_sekeb',
        lastPriceInfo: current.retail_sekeb,
        title: "سکه بهار آزادی تک فروشی",
        shortedName: "Retail Bahar Coin",
        filterNames: [{name: filter_coin_retail, enName: filter_coin_retail_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000200",
        historyCallInfo: this.currencyService.getRetailHalfCoinHistoryInfo(),
        symbol: 'retail_nim',
        lastPriceInfo: current.retail_nim,
        title: "نیم سکه تک فروشی",
        shortedName: "Retail Half Coin",
        filterNames: [{name: filter_coin_retail, enName: filter_coin_retail_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000201",
        historyCallInfo: this.currencyService.getRetailQuarterCoinHistoryInfo(),
        symbol: 'retail_rob',
        lastPriceInfo: current.retail_rob,
        title: "ربع سکه تک فروشی",
        shortedName: "Retail Quarter Coin",
        filterNames: [{name: filter_coin_retail, enName: filter_coin_retail_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000202",
        historyCallInfo: this.currencyService.getRetailGramCoinHistoryInfo(),
        symbol: 'retail_gerami',
        lastPriceInfo: current.retail_gerami,
        title: "سکه گرمی تک فروشی",
        shortedName: "Retail Gram Coin",
        filterNames: [{name: filter_coin_retail, enName: filter_coin_retail_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });


    // blubber
    coinList.push({
        id: "4000203",
        historyCallInfo: this.currencyService.getCoinBlubberHistoryInfo(),
        symbol: 'coin_blubber',
        lastPriceInfo: current.coin_blubber,
        title: "حباب سکه امامی",
        shortedName: "Coin Blubber",
        filterNames: [{name: filter_coin_blubber, enName: filter_coin_blubber_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000204",
        historyCallInfo: this.currencyService.getBaharCoinBlubberHistoryInfo(),
        symbol: 'sekeb_blubber',
        lastPriceInfo: current.sekeb_blubber,
        title: "حباب سکه بهار آزادی",
        shortedName: "Imami Coin Blubber",
        filterNames: [{name: filter_coin_blubber, enName: filter_coin_blubber_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000205",
        historyCallInfo: this.currencyService.getHalfCoinBlubberHistoryInfo(),
        symbol: 'nim_blubber',
        lastPriceInfo: current.nim_blubber,
        title: "حباب نیم سکه",
        shortedName: "Half Coin Blubber",
        filterNames: [{name: filter_coin_blubber, enName: filter_coin_blubber_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000206",
        historyCallInfo: this.currencyService.getQuarterCoinBlubberHistoryInfo(),
        symbol: 'rob_blubber',
        lastPriceInfo: current.rob_blubber,
        title: "حباب ربع سکه",
        shortedName: "Quarter Coin Blubber",
        filterNames: [{name: filter_coin_blubber, enName: filter_coin_blubber_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000207",
        historyCallInfo: this.currencyService.getTrueValueOfCoinHistoryInfo(),
        symbol: 'sekee_real',
        lastPriceInfo: current.sekee_real,
        title: "ارزش واقعی سکه",
        shortedName: "Quarter Coin Blubber",
        filterNames: [{name: filter_coin_blubber, enName: filter_coin_blubber_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });


    // exchange
    coinList.push({
        id: "4000208",
        historyCallInfo: this.currencyService.getGc19CoinHistoryInfo(),
        symbol: 'gc19',
        lastPriceInfo: current.gc19,
        title: "تمام سکه بانک صادرات",
        shortedName: "تمام سکه طرح جدید 0310 صادرات",
        filterNames: [{name: filter_coin_exchange, enName: filter_coin_exchange_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000209",
        historyCallInfo: this.currencyService.getGc14CoinHistoryInfo(),
        symbol: 'gc14',
        lastPriceInfo: current.gc14,
        title: "تمام سکه بانک ملت",
        shortedName: "تمام سکه طرح جدید 0211 ملت",
        filterNames: [{name: filter_coin_exchange, enName: filter_coin_exchange_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000210",
        historyCallInfo: this.currencyService.getGc15CoinHistoryInfo(),
        symbol: 'gc15',
        lastPriceInfo: current.gc15,
        title: "تمام سکه بانک رفاه",
        shortedName: "تمام سکه طرح جدید 0312 رفاه",
        filterNames: [{name: filter_coin_exchange, enName: filter_coin_exchange_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000211",
        historyCallInfo: this.currencyService.getGc18CoinHistoryInfo(),
        symbol: 'gc18',
        lastPriceInfo: current.gc18,
        title: "تمام سکه بانک آینده",
        shortedName: "تمام سکه طرح جدید 0411 آینده",
        filterNames: [{name: filter_coin_exchange, enName: filter_coin_exchange_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000212",
        historyCallInfo: this.currencyService.getGc17CoinHistoryInfo(),
        symbol: 'gc17',
        lastPriceInfo: current.gc17,
        title: "تمام سکه بانک سامان",
        shortedName: "تمام سکه طرح جدید 0412 سامان",
        filterNames: [{name: filter_coin_exchange, enName: filter_coin_exchange_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000213",
        historyCallInfo: this.currencyService.getGc16CoinHistoryInfo(),
        symbol: 'gc16',
        lastPriceInfo: current.gc16,
        title: "تمام سکه بانک مرکزی",
        shortedName: "تمام سکه طرح جدید 001 مرکزی",
        filterNames: [{name: filter_coin_exchange, enName: filter_coin_exchange_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });


    // other
    coinList.push({
        id: "4000214",
        historyCallInfo: this.currencyService.getSekeeDownCoinHistoryInfo(),
        symbol: 'sekee_down',
        lastPriceInfo: current.sekee_down,
        title: "تمام سکه (قبل 86)",
        shortedName: "Bahar Coin Down",
        filterNames: [{name: filter_other_coins, enName: filter_other_coins_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000215",
        historyCallInfo: this.currencyService.getNimDownCoinHistoryInfo(),
        symbol: 'nim_down',
        lastPriceInfo: current.nim_down,
        title: "نیم سکه (قبل 86)",
        shortedName: "Half Coin Down",
        filterNames: [{name: filter_other_coins, enName: filter_other_coins_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });
    coinList.push({
        id: "4000216",
        historyCallInfo: this.currencyService.getRobDownCoinHistoryInfo(),
        symbol: 'rob_down',
        lastPriceInfo: current.rob_down,
        title: "ربع سکه (قبل 86)",
        shortedName: "Quarter Coin Down",
        filterNames: [{name: filter_other_coins, enName: filter_other_coins_en}],
        groupName: COIN_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/sekee.webp'
    });

    this.coinListSubject.next(coinList)
  }

  private setupGoldList(current: Current) {
    const goldList: CurrencyItem[] = []

    //  gold
    goldList.push({
        id: "5000217",
        historyCallInfo: this.currencyService.getGeram18HistoryInfo(),
        symbol: 'geram18',
        lastPriceInfo: current.geram18,
        title: "طلای 18 عیار / 750",
        shortedName: "Gram Gold 18",
        filterNames: [{name: filter_gold, enName: filter_gold_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/ingots2.webp'
    });
    goldList.push({
        id: "5000218",
        historyCallInfo: this.currencyService.getGold740kHistoryInfo(),
        symbol: 'gold_740k',
        lastPriceInfo: current.gold_740k,
        title: "طلای 18 عیار / 740",
        shortedName: "Gold 740k",
        filterNames: [{name: filter_gold, enName: filter_gold_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/ingots2.webp'
    });
    goldList.push({
        id: "5000219",
        historyCallInfo: this.currencyService.getGeram24HistoryInfo(),
        symbol: 'geram24',
        lastPriceInfo: current.geram24,
        title: "طلای 24 عیار",
        shortedName: "Gram Gold 24",
        filterNames: [{name: filter_gold, enName: filter_gold_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/ingots2.webp'
    });
    goldList.push({
        id: "5000220",
        historyCallInfo: this.currencyService.getGoldMiniSizeHistoryInfo(),
        symbol: 'gold_mini_size',
        lastPriceInfo: current.gold_mini_size,
        title: "طلای دست دوم",
        shortedName: "Gold Mini Size",
        filterNames: [{name: filter_gold, enName: filter_gold_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/ingots2.webp'
    });


    //  silver
    goldList.push({
        id: "5000221",
        historyCallInfo: this.currencyService.getSilver925HistoryInfo(),
        symbol: 'silver_925',
        lastPriceInfo: current.silver_925,
        title: "گرم نقره 925",
        shortedName: "Silver 925",
        filterNames: [{name: filter_silver, enName: filter_silver_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/silver2.webp'
    });
    goldList.push({
        id: "5000222",
        historyCallInfo: this.currencyService.getSilver999HistoryInfo(),
        symbol: 'silver_999',
        lastPriceInfo: current.silver_999,
        title: "گرم نقره 999",
        shortedName: "Silver 999",
        filterNames: [{name: filter_silver, enName: filter_silver_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/silver2.webp'
    });


    //  mesghal
    goldList.push({
        id: "5000223",
        historyCallInfo: this.currencyService.getMesghalHistoryInfo(),
        symbol: 'mesghal',
        lastPriceInfo: current.mesghal,
        title: "مثقال طلا",
        shortedName: "Mesghal",
        filterNames: [{name: filter_mesghal, enName: filter_mesghal_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/bar2.webp'
    });
    goldList.push({
        id: "5000224",
        historyCallInfo: this.currencyService.getGold17HistoryInfo(),
        symbol: 'gold_17',
        lastPriceInfo: current.gold_17,
        title: "مثقال / بدون حباب",
        shortedName: "Mesghal / Global Gold",
        filterNames: [{name: filter_mesghal, enName: filter_mesghal_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/bar2.webp'
    });
    goldList.push({
        id: "5000225",
        historyCallInfo: this.currencyService.getGold17TransferHistoryInfo(),
        symbol: 'gold_17_transfer',
        lastPriceInfo: current.gold_17_transfer,
        title: "حباب آبشده",
        shortedName: "Mesghal / Transfer",
        filterNames: [{name: filter_mesghal, enName: filter_mesghal_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/bar2.webp'
    });
    goldList.push({
        id: "5000226",
        historyCallInfo: this.currencyService.getGold17CoinHistoryInfo(),
        symbol: 'gold_17_coin',
        lastPriceInfo: current.gold_17_coin,
        title: "مثقال / بر مبنای سکه",
        shortedName: "Mesghal / Coin base",
        filterNames: [{name: filter_mesghal, enName: filter_mesghal_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/bar2.webp'
    });


    //  melted
    goldList.push({
        id: "5000227",
        historyCallInfo: this.currencyService.getGoldFuturesHistoryInfo(),
        symbol: 'gold_futures',
        lastPriceInfo: current.gold_futures,
        title: "آبشده نقدی",
        shortedName: "Gold Futures",
        filterNames: [{name: filter_melted, enName: filter_melted_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/bar2.webp'
    });
    goldList.push({
        id: "5000228",
        historyCallInfo: this.currencyService.getGoldMeltedWholesaleHistoryInfo(),
        symbol: 'gold_melted_wholesale',
        lastPriceInfo: current.gold_melted_wholesale,
        title: "آبشده بنکداری",
        shortedName: "Gold melted wholesale",
        filterNames: [{name: filter_melted, enName: filter_melted_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/bar2.webp'
    });
    goldList.push({
        id: "5000229",
        historyCallInfo: this.currencyService.getGoldMeltedUnderKiloHistoryInfo(),
        symbol: 'gold_world_futures',
        lastPriceInfo: current.gold_world_futures,
        title: "آبشده کمتر از کیلو",
        shortedName: "Gold melted under kilo",
        filterNames: [{name: filter_melted, enName: filter_melted_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/bar2.webp'
    });



    //  etf
    goldList.push({
        id: "5000230",
        historyCallInfo: this.currencyService.getGoldGc3HistoryInfo(),
        symbol: 'gc3',
        lastPriceInfo: current.gc3,
        title: "صندوق طلای عیار",
        shortedName: "Ayar Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    // goldList.push({
    //     id: "5000231",
    //     historyCallInfo: this.currencyService.getGoldGc1HistoryInfo(),
    //     lastPriceInfo: current.gc1,
    //     title: "صندوق طلای لوتوس",
    //     shortedName: "Lotus Gold ETF",
    //     filterName: filter_etf,
    //     filterNameEn: filter_etf_en,
    //     groupName: GOLD_PREFIX,
    //     unit: toman_unit,
    //     img: '/assets/images/coins/treasure-chest2.webp'
    // });
    goldList.push({
        id: "5000231",
        historyCallInfo: this.currencyService.getGoldGc67HistoryInfo(),
        symbol: 'gc67',
        lastPriceInfo: current.gc67,
        title: "صندوق طلای قیراط",
        shortedName: "Ghirat Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000232",
        historyCallInfo: this.currencyService.getGoldGc11HistoryInfo(),
        symbol: 'gc11',
        lastPriceInfo: current.gc11,
        title: "صندوق طلای زر",
        shortedName: "Zar Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000233",
        historyCallInfo: this.currencyService.getGoldGc10HistoryInfo(),
        symbol: 'gc10',
        lastPriceInfo: current.gc10,
        title: "صندوق طلای گوهر",
        shortedName: "Gohar Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000234",
        historyCallInfo: this.currencyService.getGoldGc22HistoryInfo(),
        symbol: 'gc22',
        lastPriceInfo: current.gc22,
        title: "صندوق طلای گنج",
        shortedName: "Ganj Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000235",
        historyCallInfo: this.currencyService.getGoldGc21HistoryInfo(),
        symbol: 'gc21',
        lastPriceInfo: current.gc21,
        title: "صندوق طلای نفیس",
        shortedName: "Nafis Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000236",
        historyCallInfo: this.currencyService.getGoldGc20HistoryInfo(),
        symbol: 'gc20',
        lastPriceInfo: current.gc20,
        title: "صندوق طلای نهال",
        shortedName: "Nahal Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000237",
        historyCallInfo: this.currencyService.getGoldGc12HistoryInfo(),
        symbol: 'gc12',
        lastPriceInfo: current.gc12,
        title: "صندوق طلای کهربا",
        shortedName: "Kahroba Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000238",
        historyCallInfo: this.currencyService.getGoldGc34HistoryInfo(),
        symbol: 'gc34',
        lastPriceInfo: current.gc34,
        title: "صندوق طلای زرفام",
        shortedName: "Zarfam Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000239",
        historyCallInfo: this.currencyService.getGoldGc35HistoryInfo(),
        symbol: 'gc35',
        lastPriceInfo: current.gc35,
        title: "صندوق طلای مثقال",
        shortedName: "Mesghal Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000240",
        historyCallInfo: this.currencyService.getGoldGc36HistoryInfo(),
        symbol: 'gc36',
        lastPriceInfo: current.gc36,
        title: "صندوق طلای آلتون",
        shortedName: "Alton Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000241",
        historyCallInfo: this.currencyService.getGoldGc37HistoryInfo(),
        symbol: 'gc37',
        lastPriceInfo: current.gc37,
        title: "صندوق طلای تابش",
        shortedName: "Tabesh Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000242",
        historyCallInfo: this.currencyService.getGoldGc38HistoryInfo(),
        symbol: 'gc38',
        lastPriceInfo: current.gc38,
        title: "صندوق طلای جواهر",
        shortedName: "Javaher Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });
    goldList.push({
        id: "5000243",
        historyCallInfo: this.currencyService.getGoldGc39HistoryInfo(),
        symbol: 'gc39',
        lastPriceInfo: current.gc39,
        title: "صندوق طلای ناب",
        shortedName: "Naab Gold ETF",
        filterNames: [{name: filter_etf, enName: filter_etf_en}],
        groupName: GOLD_PREFIX,
        unit: toman_unit,
        img: '/assets/images/coins/treasure-chest2.webp'
    });

    this.goldListSubject.next(goldList)

  }

  private setupPreciousMetals(current: Current) {
    const preciousMetalList: CurrencyItem[] = []

    //  global ounces
    preciousMetalList.push({
        id: "6000244",
        historyCallInfo: this.currencyService.getGlobalGoldOnsHistoryInfo(),
        symbol: 'ons',
        lastPriceInfo: current.ons,
        title: "اونس طلا",
        shortedName: "Gold Ounce",
        filterNames: [{name: filter_global_ounces, enName: filter_global_ounces_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/gold.webp'
    });
    preciousMetalList.push({
        id: "6000245",
        historyCallInfo: this.currencyService.getGlobalSilverOnsHistoryInfo(),
        symbol: 'silver',
        lastPriceInfo: current.silver,
        title: "اونس نقره",
        shortedName: "Silver Ounce",
        filterNames: [{name: filter_global_ounces, enName: filter_global_ounces_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/silver.webp'
    });
    preciousMetalList.push({
        id: "6000246",
        historyCallInfo: this.currencyService.getGlobalPlatinumOnsHistoryInfo(),
        symbol: 'platinum',
        lastPriceInfo: current.platinum,
        title: "اونس پلاتین",
        shortedName: "Platinum Ounce",
        filterNames: [{name: filter_global_ounces, enName: filter_global_ounces_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/platinum.webp'
    });
    preciousMetalList.push({
        id: "6000247",
        historyCallInfo: this.currencyService.getGlobalPalladiumOnsHistoryInfo(),
        symbol: 'palladium',
        lastPriceInfo: current.palladium,
        title: "اونس پالادیوم",
        shortedName: "Palladium Ounce",
        filterNames: [{name: filter_global_ounces, enName: filter_global_ounces_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/palladium.webp'
    });


    // gold vs other
    preciousMetalList.push({
        id: "6000248",
        historyCallInfo: this.currencyService.getGlobalRatioSilverHistoryInfo(),
        symbol: 'ratio_silver',
        lastPriceInfo: current.ratio_silver,
        title: "برابری طلا / نقره",
        shortedName: "Gold / Silver Ratio",
        filterNames: [{name: filter_gold_vs_other, enName: filter_gold_vs_other_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/coin-vs2.webp'
    });
    preciousMetalList.push({
        id: "6000249",
        historyCallInfo: this.currencyService.getGlobalRatioPlatinumHistoryInfo(),
        symbol: 'ratio_platinum',
        lastPriceInfo: current.ratio_platinum,
        title: "برابری طلا / پلاتین",
        shortedName: "Gold / Platinum Ratio",
        filterNames: [{name: filter_gold_vs_other, enName: filter_gold_vs_other_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/coin-vs2.webp'
    });
    preciousMetalList.push({
        id: "6000250",
        historyCallInfo: this.currencyService.getGlobalRatioPalladiumHistoryInfo(),
        symbol: 'ratio_palladium',
        lastPriceInfo: current.ratio_palladium,
        title: "برابری طلا / پالادیوم",
        shortedName: "Gold / Palladium Ratio",
        filterNames: [{name: filter_gold_vs_other, enName: filter_gold_vs_other_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/coin-vs2.webp'
    });
    preciousMetalList.push({
        id: "6000251",
        historyCallInfo: this.currencyService.getGlobalRatioCrudeoilHistoryInfo(),
        symbol: 'ratio_crudeoil',
        lastPriceInfo: current.ratio_crudeoil,
        title: "برابری طلا / نفت خام",
        shortedName: "Gold / Crude Oil Ratio",
        filterNames: [{name: filter_gold_vs_other, enName: filter_gold_vs_other_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/coin-vs2.webp'
    });
    preciousMetalList.push({
        id: "6000252",
        historyCallInfo: this.currencyService.getGlobalRatioDowJonesHistoryInfo(),
        symbol: 'ratio_dija',
        lastPriceInfo: current.ratio_dija,
        title: "برابری طلا / داوجونز",
        shortedName: "Gold / Dow Jones Ratio",
        filterNames: [{name: filter_gold_vs_other, enName: filter_gold_vs_other_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/coin-vs2.webp'
    });
    preciousMetalList.push({
        id: "6000253",
        historyCallInfo: this.currencyService.getGlobalRatioSP500HistoryInfo(),
        symbol: 'ratio_sp500',
        lastPriceInfo: current.ratio_sp500,
        title: "برابری طلا / شاخص استاندارد و پورز 500",
        shortedName: "Gold / SP 500 Ratio",
        filterNames: [{name: filter_gold_vs_other, enName: filter_gold_vs_other_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/coin-vs2.webp'
    });
    preciousMetalList.push({
        id: "6000254",
        historyCallInfo: this.currencyService.getGlobalRatioHUIHistoryInfo(),
        symbol: 'ratio_hui',
        lastPriceInfo: current.ratio_hui,
        title: "برابری طلا / شاخص بازارهای مالی (HUI)",
        shortedName: "Gold / HUI Index Ratio",
        filterNames: [{name: filter_gold_vs_other, enName: filter_gold_vs_other_en}],
        groupName: PRECIOUS_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/coins/coin-vs2.webp'
    });

    this.preciousMetalListSubject.next(preciousMetalList)
  }

  private setupBaseMetals(current: Current) {
    const baseMetalList: CurrencyItem[] = []

    // global base
    baseMetalList.push({
        id: "7000255",
        historyCallInfo: this.currencyService.getBaseGlobalUSCopperHistoryInfo(),
        symbol: 'base_global_copper2',
        lastPriceInfo: current.base_global_copper2,
        title: "مس (آمریکا)",
        shortedName: "Copper (US)",
        filterNames: [{name: filter_global_base_metals, enName: filter_global_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/copper2.webp'
    });
    baseMetalList.push({
        id: "7000256",
        historyCallInfo: this.currencyService.getBaseGlobalGBCopperHistoryInfo(),
        symbol: 'base_global_copper',
        lastPriceInfo: current.base_global_copper,
        title: "مس (لندن)",
        shortedName: "Copper (London)",
        filterNames: [{name: filter_global_base_metals, enName: filter_global_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/copper2.webp'
    });
    baseMetalList.push({
        id: "7000257",
        historyCallInfo: this.currencyService.getBaseGlobalTinHistoryInfo(),
        symbol: 'base_global_tin',
        lastPriceInfo: current.base_global_tin,
        title: "قلع",
        shortedName: "Tin",
        filterNames: [{name: filter_global_base_metals, enName: filter_global_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/tin2.webp'
    });
    baseMetalList.push({
        id: "7000258",
        historyCallInfo: this.currencyService.getBaseGlobalNickelHistoryInfo(),
        symbol: 'base_global_nickel',
        lastPriceInfo: current.base_global_nickel,
        title: "نیکل",
        shortedName: "Nickel",
        filterNames: [{name: filter_global_base_metals, enName: filter_global_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/nickel2.webp'
    });
    baseMetalList.push({
        id: "7000259",
        historyCallInfo: this.currencyService.getBaseGlobalLeadHistoryInfo(),
        symbol: 'base_global_lead',
        lastPriceInfo: current.base_global_lead,
        title: "سرب",
        shortedName: "Lead",
        filterNames: [{name: filter_global_base_metals, enName: filter_global_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/lead2.webp'
    });
    baseMetalList.push({
        id: "7000260",
        historyCallInfo: this.currencyService.getBaseGlobalZincHistoryInfo(),
        symbol: 'base_global_zinc',
        lastPriceInfo: current.base_global_zinc,
        title: "روی",
        shortedName: "Zinc",
        filterNames: [{name: filter_global_base_metals, enName: filter_global_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/zinc2.webp'
    });



    // us base
    baseMetalList.push({
        id: "7000261",
        historyCallInfo: this.currencyService.getBaseAluminumHistoryInfo(),
        symbol: 'base-us-aluminum',
        lastPriceInfo: current["base-us-aluminum"],
        title: "آلومینیوم",
        shortedName: "Aluminum",
        filterNames: [{name: filter_us_base_metals, enName: filter_us_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/aluminium2.webp'
    });
    baseMetalList.push({
        id: "7000262",
        historyCallInfo: this.currencyService.getBaseUraniumHistoryInfo(),
        symbol: 'base-us-uranium',
        lastPriceInfo: current["base-us-uranium"],
        title: "اورانیوم",
        shortedName: "Uranium",
        filterNames: [{name: filter_us_base_metals, enName: filter_us_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/uranium2.webp'
    });
    baseMetalList.push({
        id: "7000263",
        historyCallInfo: this.currencyService.getBaseSteelCoilHistoryInfo(),
        symbol: 'base-us-steel-coil',
        lastPriceInfo: current["base-us-steel-coil"],
        title: "فولاد",
        shortedName: "Steel",
        filterNames: [{name: filter_us_base_metals, enName: filter_us_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/iron2.webp'
    });
    baseMetalList.push({
        id: "7000264",
        historyCallInfo: this.currencyService.getBaseIronOreHistoryInfo(),
        symbol: 'base-us-iron-ore',
        lastPriceInfo: current["base-us-iron-ore"],
        title: "سنگ آهن 62%",
        shortedName: "Iron ore 62%",
        filterNames: [{name: filter_us_base_metals, enName: filter_us_base_metals_en}],
        groupName: BASE_METALS_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/metals/iron2.webp'
    });

    this.baseMetalListSubject.next(baseMetalList)
  }

  private setupCommodityMarket(current: Current) {
    const commodityList: CurrencyItem[] = []

    // agricultural
    commodityList.push({
        id: "8000265",
        historyCallInfo: this.currencyService.getCommodityUSWheatHistoryInfo(),
        symbol: 'commodity_us_wheat',
        lastPriceInfo: current.commodity_us_wheat,
        title: "گندم (آمریکا)",
        shortedName: "Wheat (US)",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/wheat2.webp'
    });
    commodityList.push({
        id: "8000266",
        historyCallInfo: this.currencyService.getCommodityLondonWheatHistoryInfo(),
        symbol: 'commodity_london_wheat',
        lastPriceInfo: current.commodity_london_wheat,
        title: "گندم (لندن)",
        shortedName: "Wheat (London)",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: pound_unit,
        img: '/assets/images/commodity/wheat2.webp'
    });
    commodityList.push({
        id: "8000267",
        historyCallInfo: this.currencyService.getCommodityCornHistoryInfo(),
        symbol: 'commodity_us_corn',
        lastPriceInfo: current.commodity_us_corn,
        title: "ذرت",
        shortedName: "Corn",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/corn.webp'
    });
    commodityList.push({
        id: "8000268",
        historyCallInfo: this.currencyService.getCommodityOatsHistoryInfo(),
        symbol: 'commodity_oats',
        lastPriceInfo: current.commodity_oats,
        title: "جو",
        shortedName: "Oats",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/oat.webp'
    });
    commodityList.push({
        id: "8000269",
        historyCallInfo: this.currencyService.getCommodityRoughRiceHistoryInfo(),
        symbol: 'commodity_rough_rice',
        lastPriceInfo: current.commodity_rough_rice,
        title: "برنج",
        shortedName: "Rough Rice",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/rice-bowl.webp'
    });
    commodityList.push({
        id: "8000270",
        historyCallInfo: this.currencyService.getCommoditySoybeansHistoryInfo(),
        symbol: 'commodity_us_soybeans',
        lastPriceInfo: current.commodity_us_soybeans,
        title: "سویا",
        shortedName: "Soybean",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/soybean.webp'
    });
    commodityList.push({
        id: "8000271",
        historyCallInfo: this.currencyService.getCommoditySoybeanMealHistoryInfo(),
        symbol: 'commodity_us_soybean_meal',
        lastPriceInfo: current.commodity_us_soybean_meal,
        title: "کنجاله سویا",
        shortedName: "Soybean Meal",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/soybean-meal.webp'
    });
    commodityList.push({
        id: "8000272",
        historyCallInfo: this.currencyService.getCommoditySoybeanOilHistoryInfo(),
        symbol: 'commodity_us_soybean_oil',
        lastPriceInfo: current.commodity_us_soybean_oil,
        title: "روغن سویا",
        shortedName: "Soybean Oil",
        filterNames: [{name: filter_agricultural_products, enName: filter_agricultural_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/olives.webp'
    });



    // crop yields
    commodityList.push({
        id: "8000273",
        historyCallInfo: this.currencyService.getCommodityUSSugarHistoryInfo(),
        symbol: 'commodity_us_sugar_no11',
        lastPriceInfo: current.commodity_us_sugar_no11,
        title: "شکر (آمریکا)",
        shortedName: "Sugar (US)",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/sugar.webp'
    });
    commodityList.push({
        id: "8000274",
        historyCallInfo: this.currencyService.getCommodityLondonSugarHistoryInfo(),
        symbol: 'commodity_london_sugar',
        lastPriceInfo: current.commodity_london_sugar,
        title: "شکر (لندن)",
        shortedName: "Sugar (London)",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/sugar.webp'
    });
    commodityList.push({
        id: "8000275",
        historyCallInfo: this.currencyService.getCommodityUSCoffeeHistoryInfo(),
        symbol: 'commodity_us_coffee_c',
        lastPriceInfo: current.commodity_us_coffee_c,
        title: "قهوه (آمریکا)",
        shortedName: "Coffee (US)",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/coffee-seed.webp'
    });
    commodityList.push({
        id: "8000276",
        historyCallInfo: this.currencyService.getCommodityLondonCoffeeHistoryInfo(),
        symbol: 'commodity_london_coffee',
        lastPriceInfo: current.commodity_london_coffee,
        title: "قهوه (لندن)",
        shortedName: "Coffee (London)",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/coffee-seed.webp'
    });
    commodityList.push({
        id: "8000277",
        historyCallInfo: this.currencyService.getCommodityUSCocoaHistoryInfo(),
        symbol: 'commodity_us_cocoa',
        lastPriceInfo: current.commodity_us_cocoa,
        title: "کاکائو (آمریکا)",
        shortedName: "Cocoa (US)",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/cocoa.webp'
    });
    commodityList.push({
        id: "8000278",
        historyCallInfo: this.currencyService.getCommodityLondonCocoaHistoryInfo(),
        symbol: 'commodity_london_cocoa',
        lastPriceInfo: current.commodity_london_cocoa,
        title: "کاکائو (لندن)",
        shortedName: "Cocoa (London)",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: pound_unit,
        img: '/assets/images/commodity/cocoa.webp'
    });
    commodityList.push({
        id: "8000279",
        historyCallInfo: this.currencyService.getCommodityLumberHistoryInfo(),
        symbol: 'commodity_lumber',
        lastPriceInfo: current.commodity_lumber,
        title: "الوار",
        shortedName: "Lumber",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/wood.webp'
    });
    commodityList.push({
        id: "8000280",
        historyCallInfo: this.currencyService.getCommodityCottonHistoryInfo(),
        symbol: 'commodity_us_cotton_no_2',
        lastPriceInfo: current.commodity_us_cotton_no_2,
        title: "پنبه",
        shortedName: "Cotton",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/cotton.webp'
    });
    commodityList.push({
        id: "8000281",
        historyCallInfo: this.currencyService.getCommodityOrangeJuiceHistoryInfo(),
        symbol: 'parsermarket%40e02e1367cd06401c3d77b114847cca05',
        lastPriceInfo: current['parsermarket@e02e1367cd06401c3d77b114847cca05'],
        title: "آب پرتقال",
        shortedName: "Orange Juice",
        filterNames: [{name: filter_crop_yields, enName: filter_crop_yields_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/juice.webp'
    });


    // animal
    commodityList.push({
        id: "8000282",
        historyCallInfo: this.currencyService.getCommodityLiveCattleHistoryInfo(),
        symbol: 'commodity_live_cattle',
        lastPriceInfo: current.commodity_live_cattle,
        title: "گوشت گاو (1 کیلوگرم)",
        shortedName: "Beef (1 Kilogram)",
        filterNames: [{name: filter_animal_products, enName: filter_animal_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/meat.webp'
    });
    commodityList.push({
        id: "8000283",
        historyCallInfo: this.currencyService.getCommodityFeedCattleHistoryInfo(),
        symbol: 'commodity_feed_cattle',
        lastPriceInfo: current.commodity_feed_cattle,
        title: "فیدر گاو",
        shortedName: "Cattle feeder",
        filterNames: [{name: filter_animal_products, enName: filter_animal_products_en}],
        groupName: COMMODITY_PREFIX,
        unit: dollar_unit,
        img: '/assets/images/commodity/cattle.webp'
    });

    this.commodityListSubject.next(commodityList)
  }

  private setupAllItemsList () {
    // this.allItemsList = this.allItemsList
    // .concat(mainCurrencyList).concat(this.cryptoList)
    // .concat(this.worldMarketList).concat(this.coinList)
    // .concat(this.goldList).concat(this.preciousMetalList)
    // .concat(this.baseMetalList).concat(this.commodityList)
    const currentMainCurrencyList = this.mainCurrencyListSubject.getValue();
    const currentcryptoList = this.cryptoListSubject.getValue();
    const currentworldMarketList = this.worldMarketListSubject.getValue();
    const currentcoinList = this.coinListSubject.getValue();
    const currentgoldList = this.goldListSubject.getValue();
    const currentpreciousMetalList = this.preciousMetalListSubject.getValue();
    const currentbaseMetalList = this.baseMetalListSubject.getValue();
    const currentcommodityList = this.commodityListSubject.getValue();
    
    const allItemsList: CurrencyItem[] = [...currentMainCurrencyList, ...currentcryptoList, 
        ...currentworldMarketList, ...currentcoinList, ...currentgoldList, ...currentpreciousMetalList,
    ...currentbaseMetalList, ...currentcommodityList];
    // allItemsList.concat(currentMainCurrencyList).concat(currentcryptoList)
    // .concat(currentworldMarketList).concat(currentcoinList)
    // .concat(currentgoldList).concat(currentpreciousMetalList)
    // .concat(currentbaseMetalList).concat(currentcommodityList)
    
    

    if (typeof window !== 'undefined' && localStorage.getItem('fav')) {
        let favItems = JSON.parse(localStorage.getItem('fav') as string || '[]') as string[]
        allItemsList.forEach((item) => {
            if (favItems.indexOf(item.id, 0) >= 0) item.isFav = true;
            else item.isFav = false
        })
    } else {
        allItemsList.forEach(item => {
            item.isFav = false
        })
    }
    this.allItemListSubject.next(allItemsList)
  }


  




}
