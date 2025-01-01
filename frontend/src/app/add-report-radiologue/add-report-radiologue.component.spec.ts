import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportRadiologueComponent } from './add-report-radiologue.component';

describe('AddReportRadiologueComponent', () => {
  let component: AddReportRadiologueComponent;
  let fixture: ComponentFixture<AddReportRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReportRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReportRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
