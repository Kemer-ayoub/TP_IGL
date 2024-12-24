import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailRadiologueComponent } from './report-detail-radiologue.component';

describe('ReportDetailRadiologueComponent', () => {
  let component: ReportDetailRadiologueComponent;
  let fixture: ComponentFixture<ReportDetailRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDetailRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDetailRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
