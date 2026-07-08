import { Component, Input } from '@angular/core';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { RequestArrayService } from '../../../../services/request-array.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-item-info',
  imports: [],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.css'
})
export class ItemInfoComponent {
    @Input() item?: CurrencyItem;
    requestArray?: RequestArrayService;

    constructor (private requestService: RequestArrayService, private notificationService: NotificationService) {
      this.requestArray = requestService;
      
    }

    ngOnInit () {
      
    }

    addToFav(event: MouseEvent) {
      event.stopPropagation();
      this.notificationService.show('با موفقیت به دیده بان اضافه شد')
      console.log(typeof this.item)
      // this.requestArray?.addToFavorite(this.item!)
    }
  
    removeFromFav(event: MouseEvent) {
      event.stopPropagation();
      this.notificationService.show('با موفقیت از دیده بان حذف شد')
      this.requestArray?.removeFromFavorite(this.item?.id!)
    }

    
    isGoldExchange() {
      return this.item?.filterNames.includes(this.item.filterNames.find(item => item.name == 'سکه در بورس')!)
    }
}
