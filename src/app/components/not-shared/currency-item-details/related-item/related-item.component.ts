import { Component, input, Input, output } from '@angular/core';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-related-item',
  imports: [RouterLink],
  templateUrl: './related-item.component.html',
  styleUrl: './related-item.component.css'
})
export class RelatedItemComponent {
  @Input() item?: CurrencyItem;
  @Input() index?: number;
  currentUnit = input(0);

  constructor (private router: Router) {}

  selectItem () {
    // this.router.navigate()
    window.scrollTo(0, 0)
  }

  isGoldExchange() {
    return this.item?.filterNames.includes(this.item.filterNames.find(item => item.name == 'سکه در بورس')!)
  }
}
