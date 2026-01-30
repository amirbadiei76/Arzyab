import { Component, input, Input, output } from '@angular/core';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-item',
  imports: [],
  templateUrl: './related-item.component.html',
  styleUrl: './related-item.component.css'
})
export class RelatedItemComponent {
  @Input() item?: CurrencyItem;
  @Input() index?: number;
  currentUnit = input(0);

  constructor (private router: Router) {}

  selectItem () {
    this.router.navigate(['/', this.item?.groupName.toLowerCase(), this.item?.slugText])
    window.scrollTo(0, 0)
  }
}
