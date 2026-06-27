import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GoldCalculatorComponent } from './pages/gold-calculator/gold-calculator.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { CurrencyItemDetailsComponent } from './pages/currency-item-details/currency-item-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent, title: 'ارزیاب | مرجع قیمت بازارها' },
    { path: 'gold-calculator', component: GoldCalculatorComponent, title: 'ارزیاب | محاسبه‌گر طلا' },
    { path: 'converter', component: ConverterComponent, title: 'ارزیاب | مبدل ارز' },
    { path: ':group/:title', component: CurrencyItemDetailsComponent },
    { path: '**', component: NotFoundComponent, title: 'ارزیاب | صفحه مورد نظر یافت نشد' },
];