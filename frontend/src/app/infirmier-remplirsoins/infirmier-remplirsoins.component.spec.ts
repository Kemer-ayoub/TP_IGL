import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierRemplirsoinsComponent } from './infirmier-remplirsoins.component';

describe('InfirmierRemplirsoinsComponent', () => {
  let component: InfirmierRemplirsoinsComponent;
  let fixture: ComponentFixture<InfirmierRemplirsoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfirmierRemplirsoinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfirmierRemplirsoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
