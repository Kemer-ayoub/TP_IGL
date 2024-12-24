import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRadiologueComponent } from './button-radiologue.component';

describe('ButtonRadiologueComponent', () => {
  let component: ButtonRadiologueComponent;
  let fixture: ComponentFixture<ButtonRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
