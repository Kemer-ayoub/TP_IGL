import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierSoindetailComponent } from './infirmier-soindetail.component';

describe('InfirmierSoindetailComponent', () => {
  let component: InfirmierSoindetailComponent;
  let fixture: ComponentFixture<InfirmierSoindetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfirmierSoindetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfirmierSoindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
