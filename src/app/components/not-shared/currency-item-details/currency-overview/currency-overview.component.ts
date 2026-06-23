import { Component, computed, Input, output, signal } from '@angular/core';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { RelatedItemComponent } from '../related-item/related-item.component';
import { RelatedEmptyItemComponent } from '../related-empty-item/related-empty-item.component';

@Component({
  selector: 'app-currency-overview',
  imports: [RelatedItemComponent, RelatedEmptyItemComponent],
  templateUrl: './currency-overview.component.html',
  styleUrl: './currency-overview.component.css'
})
export class CurrencyOverviewComponent {
  // @Input() relatedItems?: CurrencyItem[];
  @Input({ required: true })
  set relatedItems(value: CurrencyItem[] | undefined) {
    this._relatedItems.set(value ?? []);
  }

  private _relatedItems = signal<CurrencyItem[]>([]);

  currentType = signal(0);

  // currentList = signal(this.relatedItems);
  currentList = computed(() => {
    const items = this._relatedItems();
    const type = this.currentType();

    if (!items.length) return [];
 
    const sorted = [...items].sort((a, b) => {
      const aVal = this.getChangeValue(a);
      const bVal = this.getChangeValue(b);
      return type === 0 ? bVal - aVal : aVal - bVal;
    });

    return sorted.slice(0, 5);
  });

  @Input() currentSelected?: CurrencyItem;
  currentSupportCurrencyId = signal(0)

  currentUnit = output<number>();

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

  constructor () {
    
  }

  changeUnit (value: number) {
    this.currentSupportCurrencyId.set(value);
    this.currentUnit.emit(value)
  }
  
  ngOnInit () {
  }
  
  ngAfterViewInit () {
    if (this.relatedItems) {
      this.changeCurrentType(0)
    }
  }

  private getChangeValue(item: CurrencyItem): number {
    if (item.faGroupName !== 'بازارهای ارزی') {
      const sign = item.rialChangeState === 'high' ? 1 : -1;
      return sign * Number(item.rialChanges ?? 0);
    }

    const sign = item.lastPriceInfo?.dt === 'high' ? 1 : -1;
    return sign * Number(item.lastPriceInfo?.dp ?? 0);
  }


  changeCurrentType (value: number) {
    this.currentType.set(value)
    // const ascList = this.getRelatedhListAscending();
    // switch (value) {
    //   case 0:
    //     this.currentList.set(ascList.slice(0, 5))
    //     break;
    //   case 1:
    //     this.currentList.set(ascList.reverse().slice(0, 5))
    //     break;
    // }
  }

  // getRelatedListDescending () {
  //   const descendingPriceList: CurrencyItem[] = [...this.relatedItems!]
  //   const mainDescList = descendingPriceList.sort((a: CurrencyItem, b: CurrencyItem) => {
  //     if (a.faGroupName !== 'بازارهای ارزی' && b.faGroupName !== 'بازارهای ارزی') {
  //       const aValue = (a.rialChangeState === 'high' ? '+' : '-') + a.rialChanges!;
  //       const bValue = (b.rialChangeState === 'high' ? '+' : '-') + b.rialChanges!;
  
  //       const realAValue = aValue.startsWith('-') ? Number(aValue) : a.rialChanges!;
  //       const realBValue = bValue.startsWith('-') ? Number(bValue) : b.rialChanges!;
        
  //       if (realAValue > realBValue) return 1
  //       else return -1
  //     }
      
  //     const aValue = (a.lastPriceInfo!.dt === 'high' ? '+' : '-') + a.lastPriceInfo!.dp;
  //     const bValue = (b.lastPriceInfo!.dt === 'high' ? '+' : '-') + b.lastPriceInfo!.dp;

  //     const realAValue = aValue.startsWith('-') ? Number(aValue) : a.lastPriceInfo!.dp;
  //     const realBValue = bValue.startsWith('-') ? Number(bValue) : b.lastPriceInfo!.dp;
      
  //     if (realAValue > realBValue) return 1
  //     else return -1
  //   })
  //   return mainDescList;
  // }
  
  
  // getRelatedhListAscending () {
  //   const ascendingPriceList: CurrencyItem[] = [...this.relatedItems!]
  //   const mainAscList = ascendingPriceList.sort((a: CurrencyItem, b: CurrencyItem) => {
  //     if (a.faGroupName !== 'بازارهای ارزی' && b.faGroupName !== 'بازارهای ارزی') {
  //       const aValue = (a.rialChangeState === 'high' ? '+' : '-') + a.rialChanges!;
  //       const bValue = (b.rialChangeState === 'high' ? '+' : '-') + b.rialChanges!;
  
  //       const realAValue = aValue.startsWith('-') ? Number(aValue) : a.rialChanges!;
  //       const realBValue = bValue.startsWith('-') ? Number(bValue) : b.rialChanges!;
        
  //       if (realAValue > realBValue) return -1
  //       else return 1
  //     }

  //     const aValue = (a.lastPriceInfo!.dt === 'high' ? '+' : '-') + a.lastPriceInfo!.dp;
  //     const bValue = (b.lastPriceInfo!.dt === 'high' ? '+' : '-') + b.lastPriceInfo!.dp;

  //     const realAValue = aValue.startsWith('-') ? Number(aValue) : a.lastPriceInfo!.dp;
  //     const realBValue = bValue.startsWith('-') ? Number(bValue) : b.lastPriceInfo!.dp;
      
  //     if (realAValue > realBValue) return -1
  //     else return 1
  //   })
  //   return mainAscList;
  // }

}
