import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbSkeletonComponent } from './breadcrumb-skeleton.component';

describe('BreadcrumbSkeletonComponent', () => {
  let component: BreadcrumbSkeletonComponent;
  let fixture: ComponentFixture<BreadcrumbSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
