import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareInfirmierComponent } from './add-care-infirmier.component';

describe('AddCareInfirmierComponent', () => {
  let component: AddCareInfirmierComponent;
  let fixture: ComponentFixture<AddCareInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCareInfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCareInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
