import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinReportRequestComponent } from './medecin-report-request.component';

describe('MedecinReportRequestComponent', () => {
  let component: MedecinReportRequestComponent;
  let fixture: ComponentFixture<MedecinReportRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinReportRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinReportRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
