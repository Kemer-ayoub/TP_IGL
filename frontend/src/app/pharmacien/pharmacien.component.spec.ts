import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacienComponent } from './pharmacien.component';

describe('PharmacienComponent', () => {
  let component: PharmacienComponent;
  let fixture: ComponentFixture<PharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
