import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareListInfirmierComponent } from './care-list-infirmier.component';

describe('CareListInfirmierComponent', () => {
  let component: CareListInfirmierComponent;
  let fixture: ComponentFixture<CareListInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareListInfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareListInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
