import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsLaboComponent } from './buttons-labo.component';

describe('ButtonsLaboComponent', () => {
  let component: ButtonsLaboComponent;
  let fixture: ComponentFixture<ButtonsLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
