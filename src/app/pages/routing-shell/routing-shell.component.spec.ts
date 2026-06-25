import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingShellComponent } from './routing-shell.component';

describe('RoutingShellComponent', () => {
  let component: RoutingShellComponent;
  let fixture: ComponentFixture<RoutingShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
