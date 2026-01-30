import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { CommonModule, NgIf } from '@angular/common';
import { StarIconComponent } from '../../../shared/star-icon/star-icon.component';
import { RequestArrayService } from '../../../../services/request-array.service';
import { toman_unit } from '../../../../constants/Values';
import { Router, RouterModule } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';


@Component({
  selector: 'currency-item',
  imports: [CommonModule, StarIconComponent, RouterModule],
  templateUrl: './currency-item.component.html',
  styleUrl: './currency-item.component.css'
})
export class CurrencyItemComponent {
    
  @Input() currencyItem?: CurrencyItem;
  @Input() showCurrencyId?: number;
  @Output() favRemoved = new EventEmitter<string>();
  @Output() favAdded = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter<string>();

  @ViewChild('starElement') starElement?: ElementRef<HTMLDivElement>

  requestArray?: RequestArrayService;

  currentCurrencyItem?: CurrencyItem;
  priceValue?: string | number;
  
  constructor(private requestService: RequestArrayService, private router: Router) {
    this.requestArray = requestService
    this.currentCurrencyItem = this.currencyItem;
  }
  
  ngOnInit () {
    this.priceValue = (this.currencyItem?.unit === toman_unit) ? this.currencyItem.tomanStringPrice : this.currencyItem?.lastPriceInfo!.p
  }

  addToFav(event: MouseEvent) {
    event.stopPropagation()
    this.requestArray?.addToFavorite(this.currencyItem!)
    this.favAdded.emit(this.currencyItem!.id)
  }

  removeFromFav(event: MouseEvent) {
    event.stopPropagation()
    this.requestArray?.removeFromFavorite(this.currencyItem?.id!)
    this.favRemoved.emit(this.currencyItem!.id)
  }

  onSelectItem() {
    this.itemSelected.emit(this.currencyItem!.id)
    this.router.navigate([`/${this.currencyItem!.groupName.toLowerCase()}/${this.currencyItem!.slugText}`])
    window.scrollTo(0, 0)
  }

}
