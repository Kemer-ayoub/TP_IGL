import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAddnewcareComponent } from './card-addnewcare.component';

describe('CardAddnewcareComponent', () => {
  let component: CardAddnewcareComponent;
  let fixture: ComponentFixture<CardAddnewcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAddnewcareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAddnewcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
