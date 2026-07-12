import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChartData } from '../interfaces/chart.types';
import { PriceItem } from '../components/not-shared/currency-item-details/changes-table/changes-table.component';
import { CurrencyItem } from '../interfaces/data.types';

export interface AiAnalysisResult {
  sentiment: 'صعودی' | 'نزولی' | 'خنثی';
  sentiment_score: number;
  short_term_trend: string;
  volatility: 'شدید' | 'عادی' | 'پایین';
  summary: string;
  support_level: string;
  resistance_level: string;
  risk_level: 'کم' | 'متوسط' | 'زیاد';
}

@Injectable({
  providedIn: 'root',
})
export class AiAnalyzerService {
  private http = inject(HttpClient);
  private backendUrl = '/api/analyze';
  private tgjuHistoryUrl = 'https://dashboard-api.tgju.org/v1/tv2/history';

  getHistory(symbol: string): Observable<PriceItem[]> {
    return this.http
      .get<ChartData>(`${this.tgjuHistoryUrl}?symbol=${symbol}`)
      .pipe(
        map((data) => {
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
              date,
            });
          }

          return items.sort((a, b) => a.date.getTime() - b.date.getTime());
        }),
        catchError(() => of([])),
      );
  }

  private toUnixSeconds(t: number): number {
    return t > 1e12 ? Math.floor(t / 1000) : t;
  }

  async generateAnalysis(
    currencyItem: CurrencyItem,
  ): Promise<AiAnalysisResult> {
    const symbol = currencyItem.symbol;
    // console.log(symbol)
    const name = currencyItem.title || currencyItem.symbol;
    const lastPrice = currencyItem.lastPriceInfo?.p;
    const unit = currencyItem.unit;
    // console.log(name)
    const historyData = await firstValueFrom(
      this.getHistory(currencyItem.symbol),
    );
    console.log({ symbol, name, currencyItem, historyData });
    return await firstValueFrom(
      this.http.post<AiAnalysisResult>(this.backendUrl, {
        symbol,
        name,
        lastPrice,
        historyData,
        unit,
      }),
    );
  }
}
