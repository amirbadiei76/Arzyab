import { ElementRef, Injectable } from '@angular/core';
import { currency_title, filter_overview, filter_overview_en } from '../constants/Values';

@Injectable({
  providedIn: 'root'
})
export class HomeStateService {

  currentCategory: string = currency_title;
  currentSubCategory: string = filter_overview_en;


  setCategory(category: string) {
    this.currentCategory = category;
  }

  setSubCategory(subCategory: string) {
    this.currentSubCategory = subCategory;
  }

  
  
}
