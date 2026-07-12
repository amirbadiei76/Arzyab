import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAnalysisComponent } from './ai-analysis.component';

describe('AiAnalysisComponent', () => {
  let component: AiAnalysisComponent;
  let fixture: ComponentFixture<AiAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
