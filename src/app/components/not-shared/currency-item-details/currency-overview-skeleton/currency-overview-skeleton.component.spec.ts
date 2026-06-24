import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyOverviewSkeletonComponent } from './currency-overview-skeleton.component';

describe('CurrencyOverviewSkeletonComponent', () => {
  let component: CurrencyOverviewSkeletonComponent;
  let fixture: ComponentFixture<CurrencyOverviewSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyOverviewSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyOverviewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
