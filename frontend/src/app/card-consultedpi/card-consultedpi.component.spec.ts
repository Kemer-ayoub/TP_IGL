import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConsultedpiComponent } from './card-consultedpi.component';

describe('CardConsultedpiComponent', () => {
  let component: CardConsultedpiComponent;
  let fixture: ComponentFixture<CardConsultedpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardConsultedpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardConsultedpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
