import { Component, effect, ElementRef, inject, input, Input, signal, ViewChild } from '@angular/core';
import { createChart, IChartApi, ISeriesApi, ColorType, CrosshairMode, CandlestickSeries, HistogramSeries, LineSeries, LineStyle, PriceScaleMode, Time } from 'lightweight-charts'
import { CommonModule } from '@angular/common';
import { CandleData, ChartData, ChartState, IntervalKey, OhlcPoint, Preset, RangeKey, VolumeData } from '../../../../interfaces/chart.types';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { dollar_unit, pound_unit, toman_unit } from '../../../../constants/Values';
import { commafy, dollarToToman, normalizeValue, poundToDollar, poundToToman, rialToDollar, rialToToman, trimDecimal, valueToDollarChanges, valueToRialChanges } from '../../../../utils/CurrencyConverter';
import { RequestArrayService } from '../../../../services/request-array.service';
import { TooltipDirective } from '../../../../directives/tooltip.directive';
import { BehaviorSubject, from, fromEvent, map, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chart',
  imports: [CommonModule, TooltipDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  requestService = inject(RequestArrayService)
  historyData = input<ChartData | null>(null);
  item = input<CurrencyItem | null>(null);

  chartReady = signal(false);


  chartType = input(0)
  currentUnit = input(0);
  timeFramePanelOpened = signal(false)
  presetChanged = signal(false)

  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('toggleFrameBtn') toggleFrameBtn!: ElementRef<HTMLDivElement>;

  private chart: IChartApi | null = null;
  private candlestickSeries: ISeriesApi<"Candlestick"> | null = null;
  private volumeSeries: ISeriesApi<"Histogram"> | null = null;
  private lineSeries: ISeriesApi<'Line'> | null = null;

  
  private chartIsReadySubject = new BehaviorSubject<boolean>(false);
  chartIsReady$ = this.chartIsReadySubject.asObservable();

  currentValue = toSignal(from(this.requestService.mainData!)
  .pipe(
    map((data) => data?.current),
    shareReplay(1)
  ))
  
  currentPrice = signal<string>('');
  priceChange = signal<string>('');

  close = signal<string>('');
  low = signal<string>('');
  high = signal<string>('');
  open = signal<string>('');
  volume = signal<string>('');
  isPositive = signal<boolean>(true);

  presets: Preset[] = [
    { key: '7d', label: '۷ روزه', title: '7 روز در بازه 1 روزه', range: '7D', interval: '1D' },
    { key: '1m', label: '۱ ماهه', title: '1 ماهه در بازه 1 روزه', range: '1M', interval: '1D' },
    { key: '3m', label: '۳ ماهه', title: '3 ماهه در بازه 1 هفته ای', range: '3M', interval: '1W' },
    { key: '6m', label: '۶ ماهه', title: '6 ماهه در بازه 1 هفته ای', range: '6M', interval: '1W' },
    { key: '1y', label: '۱ ساله', title: '1 ساله در بازه 1 هفته ای', range: '1Y', interval: '1W' },
    { key: 'all', label: 'کل تاریخ', title: 'کل تاریخ در بازه 1 ماهه', range: 'All', interval: '1M' },
  ];
  INITIAL_PRESET: Preset = {
    key: 'default',
    label: 'پیش‌فرض',
    title: 'پیش‌فرض',
    range: 'All',
    interval: '1D'
  };
  
  state = signal<ChartState>({
    range: this.INITIAL_PRESET.range,
    interval: this.INITIAL_PRESET.interval
  });

  private persianMonths = [
    "ژانویه",
    "فوریه",
    "مارس",
    "آوریل",
    "مه",
    "ژوئن",
    "ژوئیه",
    "اوت",
    "سپتامبر",
    "اکتبر",
    "نوامبر",
    "دسامبر"
  ];
  
  private upColor = 'rgba(48, 164, 108, 0.3)';
  private downColor = 'rgba(255, 66, 69, 0.3)';

  constructor() {
    
    const processedData = this.parseData(this.historyData());
    this.initChart(processedData);

    this.candlestickSeries?.setData(processedData.candles as any[])
    this.volumeSeries?.setData(processedData.volumes as any[])
    this.lineSeries?.setData(processedData.lineVolumes as any[]);
    this.lineSeries?.applyOptions({ visible: false });

    effect(() => {
      const data = this.historyData();
      const item = this.item();
      const unit = this.currentUnit();
      const chartType = this.chartType();
      const ready = this.chartReady();

      const processed = this.parseData(data);

      this.candlestickSeries?.setData(processed.candles as any[])
      this.volumeSeries?.setData(processed.volumes as any[])
      this.lineSeries?.setData(processed.lineVolumes as any[]);

      this.candlestickSeries?.applyOptions({ priceFormat: { precision: unit === 1 ? 4 : 2 } })
      this.lineSeries?.applyOptions({ priceFormat: { precision: unit === 1 ? 4 : 2 } })

      if (this.presetChanged()) {
        this.chart?.timeScale().fitContent();
        this.chart?.priceScale('right').applyOptions({ autoScale: true })
        this.presetChanged.set(false);
      }
    });
  }

  isPresetActive (p: Preset) {
    return this.state().interval == p.interval && this.state().range == p.range
  }

  toggleTimeFrame () {
    this.timeFramePanelOpened.update((opened) => !opened)
  }
  

  ngOnChanges() {
    if (this.historyData() && !this.chart) {
      const processedData = this.parseData(this.historyData());
      this.initChart(processedData);
      this.lineSeries?.applyOptions({ visible: false })
    }
    else {
      this.candlestickSeries?.applyOptions({ visible: this.chartType() === 0 })
      this.volumeSeries?.applyOptions({ visible: this.chartType() === 0 })
      this.lineSeries?.applyOptions({ visible: this.chartType() === 1 })
    }
  }

  filterByRange(data: OhlcPoint[], range: RangeKey): OhlcPoint[] {
    if (range === 'All') return data;
  
    const now = Date.now();
    const rangeDaysMap: Record<RangeKey, number> = {
      '7D': 7,
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1Y': 365,
      'All': 0
    };
  
    const from = now - rangeDaysMap[range] * 24 * 60 * 60 * 1000;
    return data.filter(point => point.time * 1000 >= from);
  }

  getBucketKey(unixSeconds: number, interval: IntervalKey): string {
    const d = new Date(unixSeconds * 1000);
  
    if (interval === '1W') {
      const week = Math.floor(d.getTime() / (7 * 24 * 60 * 60 * 1000));
      return `W-${week}`;
    }
  
    if (interval === '1M') {
      return `${d.getFullYear()}-${d.getMonth()}`;
    }
  
    return String(unixSeconds);
  }

  aggregateCandles(data: OhlcPoint[], interval: IntervalKey): OhlcPoint[] {
  
    if (interval === '1D') return data;
  
    const bucketMap = new Map<string, OhlcPoint>();
  
    for (const point of data) {
      const key = this.getBucketKey(point.time, interval);
  
      if (!bucketMap.has(key)) {
        bucketMap.set(key, { ...point });
        continue;
      }
  
      const agg = bucketMap.get(key)!;
  
      agg.high = Math.max(agg.high, point.high);
      agg.low = Math.min(agg.low, point.low);
      agg.close = point.close;
      agg.time = point.time;
      if (point.volume !== undefined) {
        agg.volume = (agg.volume ?? 0) + point.volume;
      }
    }
  
    return Array.from(bucketMap.values());
  }

  applyPreset(data: OhlcPoint[], state: ChartState): OhlcPoint[] {
    const ranged = this.filterByRange(data, state.range);
    if (!ranged) return []
    return this.aggregateCandles(ranged, state.interval);
  }

  selectPreset(p: Preset) {
    this.state.set({
      range: p.range,
      interval: p.interval
    });
    if (!this.presetChanged()) this.presetChanged.set(true)
    this.toggleTimeFrame()
  }
  
  resetToRaw() {
    this.state.set({
      range: 'All',
      interval: '1D'
    });
    if (!this.presetChanged()) this.presetChanged.set(true)
    if (this.timeFramePanelOpened()) this.toggleTimeFrame()
  }

  private toOhlcPoints(chartData: ChartData | null): OhlcPoint[] {
    if (!chartData?.t?.length) return [];

    const length = Math.min(
      chartData.t.length,
      chartData.o?.length ?? 0,
      chartData.h?.length ?? 0,
      chartData.l?.length ?? 0,
      chartData.c?.length ?? 0,
    );

    const points: OhlcPoint[] = [];
    for (let i = 0; i < length; i++) {
      points.push({
        time: this.toUnixSeconds(chartData.t[i]),
        open: chartData.o[i],
        high: chartData.h[i],
        low: chartData.l[i],
        close: chartData.c[i],
        volume: chartData.v ? chartData.v[i] : undefined
      });
    }
    return points;
  }

  private toUnixSeconds(t: number): number {
    return t > 1e12 ? Math.floor(t / 1000) : t;
  }

  private dayKey(unixSeconds: number): string {
    const d = new Date(unixSeconds * 1000);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  private resolveConverter(): (raw: number) => number {
    if (this.item()?.faGroupName === 'بازارهای ارزی') {
      return (raw: number) => raw;
    }

    const currentValue = this.currentValue();

    if (this.currentUnit() === 0) {
      if (this.item()?.unit === toman_unit) return (raw: number) => rialToToman(String(raw));
      if (this.item()?.unit === dollar_unit) return (raw: number) => dollarToToman(String(raw), currentValue!);
      return (raw: number) => poundToToman(String(raw), currentValue!);
    }

    if (this.item()?.unit === toman_unit) return (raw: number) => rialToDollar(String(raw), currentValue!);
    if (this.item()?.unit === dollar_unit) return (raw: number) => raw;
    return (raw: number) => poundToDollar(String(raw), currentValue!);
  }

  parseData(chartData: ChartData | null): { candles: CandleData[], volumes: VolumeData[], lineVolumes: VolumeData[] } {
    const points = this.toOhlcPoints(chartData);
    if (!points.length) {
      return { candles: [], volumes: [], lineVolumes: [] };
    }

    const sortedPoints = [...points].sort((a, b) => a.time - b.time);
    const groupedPoints = this.applyPreset(sortedPoints, this.state());

    const uniqueMap = new Map<string, OhlcPoint>();
    groupedPoints?.forEach(point => {
      uniqueMap.set(this.dayKey(point.time), point);
    });
    const uniquePoints = Array.from(uniqueMap.values());

    const candles: CandleData[] = [];
    const volumes: VolumeData[] = [];
    const lineVolumes: VolumeData[] = [];

    const convert = this.resolveConverter();

    for (const point of uniquePoints) {
      const time = point.time;
      const open = convert(point.open);
      const high = convert(point.high);
      const low = convert(point.low);
      const close = convert(point.close);

      candles.push({ time, open, high, low, close });

      const isUp = close >= open;
      // اگه API واقعاً حجم بده (v) همون استفاده می‌شه، وگرنه مثل قبل از normalizeValue به‌عنوان پروکسی بصری استفاده می‌شه
      const volumeValue = point.volume !== undefined ? point.volume : normalizeValue(high, low, open, close);

      volumes.push({
        time,
        value: volumeValue,
        color: isUp ? this.upColor : this.downColor,
      });

      lineVolumes.push({
        time,
        value: close,
        color: '#00d890',
      });
    }

    return { candles, volumes, lineVolumes };
  }

  initChart(data: { candles: any[], volumes: any[], lineVolumes: any[] }) {
    if (!this.chartContainer) return;
    
    this.chart = createChart(this.chartContainer.nativeElement, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#888',
        fontFamily: 'IranYekan'
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.3)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.3)' },
      },
      rightPriceScale: {
        borderColor: '#888',
        autoScale: true
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.2)',
        timeVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);

          const year = date.getFullYear();
          const month = this.persianMonths[date.getMonth()];
          const day = date.getDate();
          if (date.getMonth() === 0 && day === 1) return `${year}`;
          if (day === 1) return `${month}`
          return `${day}`;
        }
      },
      localization: {
        locale: 'fa-IR',
        timeFormatter: (time: Time) => {
          if (typeof time === 'number') {
            const date = new Date(time * 1000).toLocaleString('fa-IR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
            return (
              date
            );
          }
          return null;
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          labelBackgroundColor: '#333'
        },
        horzLine: {
          labelBackgroundColor: '#333'
        }
      },
      width: this.chartContainer.nativeElement.clientWidth,
    });

    
    this.candlestickSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: '#30a46c',
      downColor: '#ff4245',
      borderUpColor: '#30a46c',
      borderDownColor: '#ff4245',
      wickUpColor: '#30a46c',
      wickDownColor: '#ff4245',
    });
    this.candlestickSeries!.setData(data.candles);

    this.volumeSeries = this.chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });

    this.volumeSeries!.priceScale().applyOptions({
      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
    });
    this.volumeSeries!.setData(data.volumes);


    this.lineSeries = this.chart.addSeries(LineSeries, {
      lineStyle: LineStyle.Solid,
      baseLineColor: '#00d890',
      priceLineColor: '#00d890',
      lineWidth: 2,
    });
    this.lineSeries.setData(data.lineVolumes);

    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 0 || entries[0].target !== this.chartContainer.nativeElement) { return; }
      const newRect = entries[0].contentRect;
      this.chart?.applyOptions({ width: newRect.width, height: newRect.height });
    });
    resizeObserver.observe(this.chartContainer.nativeElement);
    const mainDollarValueChanes = this.currentValue()!.price_dollar_rl.dp;
    const mainPoundValueChanes = this.currentValue()!.price_gbp.dp;

    this.chart.subscribeCrosshairMove(param => {
      if (param.time) {
        const price = param.seriesData.get(this.candlestickSeries!) as CandleData;
        const currentVolume = param.seriesData.get(this.volumeSeries!) as VolumeData;
        if(price) {
          this.currentPrice.set(this.formatPrice(price.close));
          this.high.set(commafy(price.high))
          this.low.set(commafy(price.low))
          this.open.set(commafy(price.open))
          this.close.set(commafy(price.close))
          this.volume.set(commafy(trimDecimal(currentVolume.value)))

          const change = ((price.close - price.open) / price.open) * 100;
          if (this.item()?.faGroupName !== 'بازارهای ارزی') {
            if (this.currentUnit() === 0) {
              if (this.item()?.unit === toman_unit) {
                this.priceChange.set(`(${change >= 0 ? '+' : ''}${change.toFixed(2)})%`);
                this.isPositive.set(change >= 0);
              }
              else if (this.item()?.unit === dollar_unit) {
                const dollarItemRialChanges = valueToRialChanges(change, mainDollarValueChanes!)
                this.priceChange.set(`(${dollarItemRialChanges >= 0 ? '+' : ''}${dollarItemRialChanges.toFixed(2)})%`);
                this.isPositive.set(dollarItemRialChanges >= 0);
              }
              else if (this.item()?.unit === pound_unit) {
                const poundItemRialChanges = valueToRialChanges(change, mainPoundValueChanes!)
                this.priceChange.set(`(${poundItemRialChanges >= 0 ? '+' : ''}${poundItemRialChanges.toFixed(2)})%`);
                this.isPositive.set(poundItemRialChanges >= 0);
              }
            }
            else if (this.currentUnit() === 1) {
              if (this.item()?.unit === toman_unit) {
                const rialItemDollarChanges = valueToDollarChanges(change, mainDollarValueChanes!)
                this.priceChange.set(`(${rialItemDollarChanges >= 0 ? '+' : ''}${rialItemDollarChanges.toFixed(2)})%`);
                this.isPositive.set(rialItemDollarChanges >= 0);
              }
              else if (this.item()?.unit === dollar_unit) {
                this.priceChange.set(`(${change >= 0 ? '+' : ''}${change.toFixed(2)})%`);
                this.isPositive.set(change >= 0);
              }
              else if (this.item()?.unit === pound_unit) {
                const poundAskChanges = (this.currentValue()!['gbp-usd-ask'].dt === 'low' ? -1 : 1) * (this.currentValue()!['gbp-usd-ask'].dp!)
                const poundItemDollarChanges = valueToDollarChanges(change, poundAskChanges)
                this.priceChange.set(`(${poundItemDollarChanges >= 0 ? '+' : ''}${poundItemDollarChanges.toFixed(2)})%`);
                this.isPositive.set(poundItemDollarChanges >= 0);
              }
            }
          }
          else {
            this.priceChange.set(`(${change >= 0 ? '+' : ''}${change.toFixed(2)})%`);
            this.isPositive.set(change >= 0);
          }
        }
      }
      else {
        const dataLength = this.candlestickSeries?.data().length;
        const lastPrice = this.candlestickSeries?.data().at(dataLength! - 1) as CandleData;
        const lastVolume = this.volumeSeries?.data().at(dataLength! - 1) as VolumeData;

        if (dataLength === 0) return;
        this.currentPrice.set(this.formatPrice(lastPrice.close));
        const change = ((lastPrice.close - lastPrice.open) / lastPrice.open) * 100;
        this.priceChange.set(`(${change >= 0 ? '+' : ''}${change.toFixed(2)})%`);
        this.high.set(commafy(lastPrice.high))
        this.low.set(commafy(lastPrice.low))
        this.open.set(commafy(lastPrice.open))
        this.close.set(commafy(lastPrice.close))
        this.volume.set(commafy(trimDecimal(lastVolume.value)))
        this.isPositive.set(change >= 0);
      }
    });

    if (data.candles.length > 0) {
        this.updateHeader(data.candles[data.candles.length - 1], data.volumes[data.volumes.length - 1]);
    }

  }

  updateHeader(priceData: CandleData, volumeData: VolumeData) {
      this.currentPrice.set(this.formatPrice(priceData.close));
      const change = ((priceData.close - priceData.open) / priceData.open) * 100;
      this.priceChange.set(`(${change >= 0 ? '+' : ''}${change.toFixed(2)})%`);
      this.high.set(commafy(priceData.high))
      this.low.set(commafy(priceData.low))
      this.open.set(commafy(priceData.open))
      this.close.set(commafy(priceData.close))
      this.volume.set(commafy(volumeData.value))
      this.isPositive.set(change >= 0);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US');
  }

  ngAfterViewInit () {

    if (typeof window !== 'undefined') {
      fromEvent(window, 'resize')
      .subscribe((event) => {
          this.timeFramePanelOpened.set(false)
      })
    }

    if (typeof document !== 'undefined') {
      const processedData = this.parseData(this.historyData());
      this.initChart(processedData);
      this.lineSeries?.applyOptions({ visible: false })
      this.chartIsReadySubject.next(true)
      
      fromEvent(document, 'click')
      .subscribe((event) => {
        const clicked = event.target as Node;
        if (!this.toggleFrameBtn?.nativeElement.contains(clicked)) {
          this.timeFramePanelOpened.set(false)
        }
      })
    }
  }
}