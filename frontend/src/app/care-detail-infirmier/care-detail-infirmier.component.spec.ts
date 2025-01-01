import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareDetailInfirmierComponent } from './care-detail-infirmier.component';

describe('CareDetailInfirmierComponent', () => {
  let component: CareDetailInfirmierComponent;
  let fixture: ComponentFixture<CareDetailInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareDetailInfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareDetailInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
