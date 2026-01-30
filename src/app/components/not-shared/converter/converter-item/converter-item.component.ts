import { Component, computed, input, signal } from '@angular/core';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-converter-item',
  imports: [RouterLink],
  templateUrl: './converter-item.component.html',
  styleUrl: './converter-item.component.css'
})
export class ConverterItemComponent {
  currencyItem = input<CurrencyItem>();
  groupName = computed(() => this.currencyItem()?.groupName.toLowerCase())

  constructor () {

  }

  ngOnInit () {
    
  }
}
