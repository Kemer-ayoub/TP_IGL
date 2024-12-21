import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierConsultedpiComponent } from './infirmier-consultedpi.component';

describe('InfirmierConsultedpiComponent', () => {
  let component: InfirmierConsultedpiComponent;
  let fixture: ComponentFixture<InfirmierConsultedpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfirmierConsultedpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfirmierConsultedpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
