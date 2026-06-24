import { Component, computed, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RequestArrayService } from '../../services/request-array.service';
import { BehaviorSubject, combineLatest, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommafyNumberDirective } from '../../directives/commafy-number.directive';
import { CurrencyItem } from '../../interfaces/data.types';
import { caratToGram, commafy, gramToCarat, gramToMesghal, gramToOunce, gramToSut, mesghalToGram, mesghalToGramMoney, ounceToGram, priceToNumber, sutToGram, trimDecimal } from '../../utils/CurrencyConverter';
import { ConverterItemComponent } from '../../components/not-shared/converter/converter-item/converter-item.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ConverterItemSkeletonComponent } from '../../components/not-shared/converter/converter-item-skeleton/converter-item-skeleton.component';

interface CalculatorType {
  id: number,
  title: string
}

type RelatedItem = {
  first: CurrencyItem;
  second: CurrencyItem;
};

interface GoldTypes extends CalculatorType {
  weightUnit?: string
}

interface OunceTypes extends CalculatorType {
  value?: string
}

@Component({
  selector: 'app-gold-calculator',
  imports: [FormsModule, CommonModule, CommafyNumberDirective, ConverterItemComponent, ConverterItemSkeletonComponent],
  templateUrl: './gold-calculator.component.html',
  styleUrl: './gold-calculator.component.css'
})
export class GoldCalculatorComponent {
  
  requestClass = inject(RequestArrayService)

  private goldValueSubject = new BehaviorSubject<string>('0');
  goldValue$ = this.goldValueSubject.asObservable();
  
  
  private goldChangedByUserSubject = new BehaviorSubject<boolean>(false);
  goldChangedByUser$ = this.goldChangedByUserSubject.asObservable();

  private weightValueSubject = new BehaviorSubject<string>('1');
  weightValue$ = this.weightValueSubject.asObservable();
  
  private wageValueSubject = new BehaviorSubject<string>('1');
  wageValue$ = this.wageValueSubject.asObservable()

  private taxValueSubject = new BehaviorSubject<string>('10');
  taxValue$ = this.taxValueSubject.asObservable()

  private profitValueSubject = new BehaviorSubject<string>('0');
  profitValue$ = this.profitValueSubject.asObservable()

  profitType = signal(0)

  @ViewChild('typesBtn') typesBtn?: ElementRef<HTMLDivElement>
  @ViewChild('goldBtn') goldBtn?: ElementRef<HTMLDivElement>
  @ViewChild('ounceBtn') ounceBtn?: ElementRef<HTMLDivElement>


  currentGoldType = signal(0);
  currentGoldType$ = toObservable(this.currentGoldType)
  currentGoldTypeDropdownOpen = signal(false);
  
  currentOunceType = signal(0);
  currentOunceType$ = toObservable(this.currentOunceType)
  currentOunceTypeDropdownOpen = signal(false);

  calculatorType = signal(0);
  calculatorType$ = toObservable(this.calculatorType)
  calculatorTypeDropdownOpen = signal(false)

  calculatorTypes: CalculatorType[] = [
    {
      id: 0,
      title: 'محاسبه قیمت طلا'
    },
    {
      id: 1,
      title: 'تبدیل واحدهای طلا'
    },
  ]

  ounceTypes: OunceTypes[] = [
    {
      id: 0,
      title: 'گرم',
      value: '0'
    },
    {
      id: 1,
      title: 'اونس',
      value: '0'
    },
    {
      id: 2,
      title: 'مثقال',
      value: '0'
    },
    {
      id: 3,
      title: 'سوت',
      value: '0'
    },
    {
      id: 4,
      title: 'قیراط',
      value: '0'
    },
  ]

  goldTypes: GoldTypes[] = [
    {
      id: 0,
      title: 'طلای 18 عیار',
      weightUnit: 'گرم'
    },
    {
      id: 1,
      title: 'طلای 24 عیار',
      weightUnit: 'گرم'
    },
    {
      id: 2,
      title: 'طلای آب شده',
      weightUnit: 'گرم'
    },
    {
      id: 3,
      title: 'طلای دست دوم',
      weightUnit: 'گرم'
    },
    {
      id: 4,
      title: 'اونس',
      weightUnit: 'اونس'
    },
    {
      id: 5,
      title: 'مثقال',
      weightUnit: 'مثقال'
    },
  ]

  goldValues$ = this.requestClass.allItemsList.pipe(
    map((items) => ({
      gram18: items.find(i => i.id === '1000217'),
      gram24: items.find(i => i.id === '1000219'),
      mini: items.find(i => i.id === '1000220'),
      futures: items.find(i => i.id === '1000227'),
      mesghal: items.find(i => i.id === '1000223'),
      ounce: items.find(i => i.id === '1000244'),
    })),
    distinctUntilChanged(
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    )
  );

  
  relatedItems$ = combineLatest([
    this.goldValues$,
    this.calculatorType$,
    this.currentGoldType$
  ]).pipe(
    map(([goldValue, calculatorType, goldType]) => {
      if (calculatorType === 0) {
        if (goldType === 0) {
          return [goldValue.gram18, goldValue.gram24, goldValue.ounce]
        }
        else if (goldType === 1) {
          return [goldValue.gram24, goldValue.ounce, goldValue.gram18]
        }
        else if (goldType === 2) {
          return [goldValue.futures, goldValue.gram18, goldValue.mesghal]
        }
        else if (goldType === 3) {
          return [goldValue.mini, goldValue.gram18, goldValue.futures]
        }
        else if (goldType === 4) {
          return [goldValue.ounce, goldValue.gram24, goldValue.gram18]
        }
        else {
          return [goldValue.mesghal, goldValue.futures, goldValue.gram18]
        }
      }
      else {
        return [goldValue.ounce, goldValue.gram18, goldValue.mesghal]
      }
    })
  );

  goldValueComputed$ = combineLatest([
    this.goldValues$,
    this.currentGoldType$,
    this.goldChangedByUser$,
    this.goldValue$
  ]).pipe(
    map(([goldValues, currentGoldType, changedByUser, userValue]) => {
      if (changedByUser) {
        return userValue;
      }

      switch (currentGoldType) {
        case 0:
          return goldValues.gram18?.tomanStringPrice;
        case 1:
          return goldValues.gram24?.tomanStringPrice;
        case 2:
          const meltedValue = mesghalToGramMoney(goldValues.futures?.tomanStringPrice!);
          return commafy(trimDecimal(meltedValue, 0));
        case 3:
          return goldValues.mesghal?.tomanStringPrice;
        case 4:
          return goldValues.ounce?.tomanStringPrice;
        default:
          return goldValues.mesghal?.tomanStringPrice;
      }
    })
  )

  mainGoldValue$ = combineLatest([
    this.goldValueComputed$,
    this.weightValue$
  ]).pipe(
    map(([value, weightValue]) => {
      return commafy(priceToNumber(weightValue || '1') * priceToNumber(value! || '0') || 0)
    })
  )

  totalWageValue$ = combineLatest([
    this.mainGoldValue$,
    this.wageValue$
  ]).pipe(
    map(([goldValue, wageValue]) => {
      return commafy(((priceToNumber(wageValue) * priceToNumber(goldValue)) / 100) || 0)
    })
  )
  
  totalTaxValue$ = combineLatest([
    this.mainGoldValue$,
    this.taxValue$
  ]).pipe(
    map(([goldValue, taxValue]) => {
      return commafy(((priceToNumber(goldValue) * priceToNumber(taxValue)) / 100) || 0)
    })
  )

  totalProfitValue$ = combineLatest([
    this.mainGoldValue$,
    this.profitValue$,
  ]).pipe(
    map(([value, profitValue]) => {
      return commafy(
        (this.profitType() === 0 ?
        ((priceToNumber(value) * priceToNumber(profitValue)) / 100) :
        priceToNumber(profitValue)) || 0
      )
    })
  )

  
  totalGoldValue$ = combineLatest([
    this.mainGoldValue$,
    this.totalWageValue$,
    this.totalTaxValue$,
    this.totalProfitValue$
  ]).pipe(
      map(([goldValue, wageValue, taxValue, profitValue]) => {
        return commafy (
        (priceToNumber(goldValue) + priceToNumber(wageValue) + 
        priceToNumber(taxValue) + priceToNumber(profitValue)) || 0
      )
    })
  )

  

  constructor (private meta: Meta) {
      this.initFirstGoldValue();
    

      effect(() => {
        if (this.calculatorType() === 1) this.calculateOunceTypes()
      })


  }
  initFirstOunceValue () {
    
    this.weightValueSubject.next('1')
  }

  initFirstGoldValue () {
    this.currentGoldType.set(0)
    this.profitValueSubject.next('3')
    this.weightValueSubject.next('1')
    this.wageValueSubject.next('7')
    this.taxValueSubject.next('10')
    this.profitType.set(0)
  }

  calculateOunceTypes () {
    this.weightValue$.subscribe((value) => {
      switch(this.currentOunceType()) {
        // Gram
        case 0:
          const ounceValue = gramToOunce(value)
          const mesghalValue = gramToMesghal(value)
          const sutValue = gramToSut(value)
          const caratValue = gramToCarat(value)
          const currentGramTypes = [...this.ounceTypes]
          currentGramTypes[1] = {...currentGramTypes[1], value: commafy(trimDecimal(ounceValue, 3))}
          currentGramTypes[2] = {...currentGramTypes[2], value: commafy(trimDecimal(mesghalValue, 4))}
          currentGramTypes[3] = {...currentGramTypes[3], value: commafy(trimDecimal(sutValue, 0))}
          currentGramTypes[4] = {...currentGramTypes[4], value: commafy(trimDecimal(caratValue, 2))}
          this.ounceTypes = currentGramTypes;
          break;
  
        // Ounce
        case 1:
          const ounceGramValue = ounceToGram(value)
          const ounceMesghalValue = gramToMesghal(ounceGramValue + '')
          const ounceSutValue = gramToSut(ounceGramValue + '')
          const ounceCaratValue = gramToCarat(ounceGramValue + '')
          const ounceCurrentTypes = [...this.ounceTypes]
          ounceCurrentTypes[0] = {...ounceCurrentTypes[0], value: commafy(trimDecimal(ounceGramValue, 3))}
          ounceCurrentTypes[2] = {...ounceCurrentTypes[2], value: commafy(trimDecimal(ounceMesghalValue, 4))}
          ounceCurrentTypes[3] = {...ounceCurrentTypes[3], value: commafy(trimDecimal(ounceSutValue, 0))}
          ounceCurrentTypes[4] = {...ounceCurrentTypes[4], value: commafy(trimDecimal(ounceCaratValue, 2))}
          this.ounceTypes = ounceCurrentTypes;
          break;
        
        // Mesghal
        case 2:
          const mesghalGramValue = mesghalToGram(value)
          const mesghalOunceValue = gramToOunce(mesghalGramValue + '')
          const mesghalSutValue = gramToSut(mesghalGramValue + '')
          const mesghalCaratValue = gramToCarat(mesghalGramValue + '')
          const mesghalCurrentTypes = [...this.ounceTypes]
          mesghalCurrentTypes[0] = {...mesghalCurrentTypes[0], value: commafy(trimDecimal(mesghalGramValue, 3))}
          mesghalCurrentTypes[1] = {...mesghalCurrentTypes[1], value: commafy(trimDecimal(mesghalOunceValue, 3))}
          mesghalCurrentTypes[3] = {...mesghalCurrentTypes[3], value: commafy(trimDecimal(mesghalSutValue, 0))}
          mesghalCurrentTypes[4] = {...mesghalCurrentTypes[4], value: commafy(trimDecimal(mesghalCaratValue, 2))}
          this.ounceTypes = mesghalCurrentTypes;
          break;
  
        // Sut
        case 3:
          const sutGramValue = sutToGram(value)
          const sutOunceValue = gramToOunce(sutGramValue + '')
          const sutMesghalValue = gramToMesghal(sutGramValue + '')
          const sutCaratValue = gramToCarat(sutGramValue + '')
          const sutCurrentTypes = [...this.ounceTypes]
          sutCurrentTypes[0] = {...sutCurrentTypes[0], value: commafy(trimDecimal(sutGramValue, 3))}
          sutCurrentTypes[1] = {...sutCurrentTypes[1], value: commafy(trimDecimal(sutOunceValue, 3))}
          sutCurrentTypes[2] = {...sutCurrentTypes[2], value: commafy(trimDecimal(sutMesghalValue, 4))}
          sutCurrentTypes[4] = {...sutCurrentTypes[4], value: commafy(trimDecimal(sutCaratValue, 2))}
          this.ounceTypes = sutCurrentTypes;
          break;
  
        // Carat
        case 4:
          const caratGramValue = caratToGram(value)
          const caratOunceValue = gramToOunce(caratGramValue + '')
          const caratMesghalValue = gramToMesghal(caratGramValue + '')
          const caratSutValue = gramToSut(caratGramValue + '')
          const currentOunceTypes = [...this.ounceTypes]
          currentOunceTypes[0] = {...currentOunceTypes[0], value: commafy(trimDecimal(caratGramValue, 3))}
          currentOunceTypes[1] = {...currentOunceTypes[1], value: commafy(trimDecimal(caratOunceValue, 3))}
          currentOunceTypes[2] = {...currentOunceTypes[2], value: commafy(trimDecimal(caratMesghalValue, 4))}
          currentOunceTypes[3] = {...currentOunceTypes[3], value: commafy(trimDecimal(caratSutValue, 0))}
          this.ounceTypes = currentOunceTypes;
          break;
      }
    })
  }

  onGoldInputChange (event: Event) {
    const goldValue = (event.target as HTMLInputElement).value;
    const goldValueString = commafy(priceToNumber(goldValue)) || '0';
    
    this.goldChangedByUserSubject.next(true);
    this.goldValueSubject.next(goldValueString);
  }

  onWeightInputChange (event: Event) {
    const weightValue = (event.target as HTMLInputElement).value;
    this.weightValueSubject.next(commafy(priceToNumber(weightValue) || 0) || '0')
  }
  
  onWageInputChange (event: Event) {
    const wageValue = (event.target as HTMLInputElement).value;
    this.wageValueSubject.next(commafy(priceToNumber(wageValue)) || '0')
  }
  
  onTaxInputChange (event: Event) {
    const taxValue = (event.target as HTMLInputElement).value;
    this.taxValueSubject.next(commafy(priceToNumber(taxValue)) || '0')
  }
  
  onProfitInputChange (event: Event) {
    const profitValue = (event.target as HTMLInputElement).value;
    this.profitValueSubject.next(commafy(priceToNumber(profitValue)) || '0')
  }

  ngOnInit () {
    this.meta.updateTag({
      name: 'description',
      content: `محاسبه‌گر قیمت طلا در ارزیاب؛ تبدیل انواع واحدهای طلا در ارزیاب؛ محاسبه قیمت طلای ۱۸ عیار، ۲۴ عیار و طلای آب‌شده بر اساس نرخ روز.`
    });
  }

  changeProfitType (value: number) {
    this.profitType.set(value)

    if (this.profitType() === 0) this.profitValueSubject.next('3')
    else if (this.profitType() === 1) this.profitValueSubject.next('0')

  }

  
  toggleOunceTypeDropdown() {
    this.currentOunceTypeDropdownOpen.update((open) => !open)
  }

  toggleCalculatorTypeDropdown() {
    this.calculatorTypeDropdownOpen.update((open) => !open)
  }
  
  toggleGoldTypeDropdown() {
    this.currentGoldTypeDropdownOpen.update((open) => !open)
  }

  
  selectOunceType(item: GoldTypes) {
    this.currentOunceType.set(item.id)
    this.toggleOunceTypeDropdown()
    
    if (this.currentOunceType() === 3) this.weightValueSubject.next('1,000')
    else if (this.currentOunceType() === 4) this.weightValueSubject.next('5')
    else this.weightValueSubject.next('1')
  }

  selectGoldType(item: GoldTypes) {
    this.currentGoldType.set(item.id)
    this.toggleGoldTypeDropdown()
    this.goldChangedByUserSubject.next(false);

    if (this.currentGoldType() === 0 || this.currentGoldType() === 1) {
      this.wageValueSubject.next('7')
    }
    else {
      this.wageValueSubject.next('0')
    }
  }

  selectCalculatorType(item: CalculatorType) {
    this.calculatorType.set(item.id)
    this.toggleCalculatorTypeDropdown()

    if (this.calculatorType() === 0) {
      this.currentGoldType.set(0)
      this.initFirstGoldValue();
    }
    else if (this.calculatorType() === 1) {
      this.currentOunceType.set(0)
      this.initFirstOunceValue()
    }
  }


  ngAfterViewInit () {
    
    if (typeof document !== 'undefined') {
      fromEvent(document, 'click')
      .subscribe((event) => {
        const click = event.target as Node
        if (!this.typesBtn?.nativeElement.contains(click)) {
          this.calculatorTypeDropdownOpen.set(false)
        }
        if (!this.goldBtn?.nativeElement.contains(click)) {
          this.currentGoldTypeDropdownOpen.set(false)
        }
        if (!this.ounceBtn?.nativeElement.contains(click)) {
          this.currentOunceTypeDropdownOpen.set(false)
        }
      })
    }
  }

}
