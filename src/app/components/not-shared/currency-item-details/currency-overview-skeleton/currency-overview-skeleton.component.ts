import { Component, Input } from '@angular/core';
import { RelatedEmptyItemComponent } from '../related-empty-item/related-empty-item.component';
import { CurrencyItem } from '../../../../interfaces/data.types';

@Component({
  selector: 'app-currency-overview-skeleton',
  imports: [RelatedEmptyItemComponent],
  templateUrl: './currency-overview-skeleton.component.html',
  styleUrl: './currency-overview-skeleton.component.css'
})
export class CurrencyOverviewSkeletonComponent {
  @Input() currentSelected?: CurrencyItem;

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
}
