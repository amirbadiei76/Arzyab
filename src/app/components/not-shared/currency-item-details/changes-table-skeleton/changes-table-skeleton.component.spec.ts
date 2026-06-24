import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesTableSkeletonComponent } from './changes-table-skeleton.component';

describe('ChangesTableSkeletonComponent', () => {
  let component: ChangesTableSkeletonComponent;
  let fixture: ComponentFixture<ChangesTableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangesTableSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangesTableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
