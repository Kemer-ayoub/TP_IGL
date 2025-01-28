import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListRadiologueComponent } from './report-list-radiologue.component';

describe('ReportListRadiologueComponent', () => {
  let component: ReportListRadiologueComponent;
  let fixture: ComponentFixture<ReportListRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportListRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportListRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
