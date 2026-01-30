import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyItem } from '../../../interfaces/data.types';

@Component({
  selector: 'app-search-item',
  imports: [],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.css'
})
export class SearchItemComponent {
  @Input() item?: CurrencyItem;
  @Output() itemSelected = new EventEmitter<string>();

  constructor () {

  }

  onSelectItem() {
    this.itemSelected.emit(`${this.item!.groupName.toLowerCase() + '/' + this.item!.slugText}`)
  }
}
