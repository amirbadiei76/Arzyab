import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', loadComponent: () => import('../app/pages/home/home.component').then((home) => home.HomeComponent), title: 'ارزیاب | مرجع قیمت بازارها' },
    { path: 'gold-calculator', loadComponent: () => import('../app/pages/gold-calculator/gold-calculator.component').then((gold) => gold.GoldCalculatorComponent), title: 'ارزیاب | محاسبه‌گر طلا' },
    { path: 'converter', loadComponent: () => import('../app/pages/converter/converter.component').then((converter) => converter.ConverterComponent), title: 'ارزیاب | مبدل ارز' },
    { path: ':group/:title', loadComponent: () => import('../app/pages/currency-item-details/currency-item-details.component').then((item) => item.CurrencyItemDetailsComponent) },
    { path: '**', loadComponent: () => import('../app/pages/not-found/not-found.component').then((notFound) => notFound.NotFoundComponent), title: 'ارزیاب | صفحه مورد نظر یافت نشد' },
];