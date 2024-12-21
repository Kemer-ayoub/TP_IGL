import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCareComponent } from './card-care.component';

describe('CardCareComponent', () => {
  let component: CardCareComponent;
  let fixture: ComponentFixture<CardCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
