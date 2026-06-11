import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyItem } from '../../../interfaces/data.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-item',
  imports: [RouterLink],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.css'
})
export class SearchItemComponent {
  @Input() item?: CurrencyItem;
  @Input() isSearch: boolean = true;
  @Output() itemSelected = new EventEmitter<string>();

  constructor () {

  }

  onSelectItem() {
    this.itemSelected.emit(`${this.item!.groupName.toLowerCase() + '/' + this.item!.slugText}`)
  }
}
