import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDPIComponent } from './create-dpi.component';

describe('CreateDPIComponent', () => {
  let component: CreateDPIComponent;
  let fixture: ComponentFixture<CreateDPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
