import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GoldCalculatorComponent } from './pages/gold-calculator/gold-calculator.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent, title: 'ارزیاب | مرجع قیمت بازارها' },
    { path: 'gold-calculator', component: GoldCalculatorComponent, title: 'ارزیاب | محاسبه‌گر طلا' },
    { path: 'converter', loadComponent: () => import('../app/pages/converter/converter.component').then((converter) => converter.ConverterComponent), title: 'ارزیاب | مبدل ارز' },
    { path: ':group/:title', loadComponent: () => import('../app/pages/currency-item-details/currency-item-details.component').then((item) => item.CurrencyItemDetailsComponent) },
    { path: '**', loadComponent: () => import('../app/pages/not-found/not-found.component').then((notFound) => notFound.NotFoundComponent), title: 'ارزیاب | صفحه مورد نظر یافت نشد' },
];