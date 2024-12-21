import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierSoinsprecedentComponent } from './infirmier-soinsprecedent.component';

describe('InfirmierSoinsprecedentComponent', () => {
  let component: InfirmierSoinsprecedentComponent;
  let fixture: ComponentFixture<InfirmierSoinsprecedentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfirmierSoinsprecedentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfirmierSoinsprecedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
