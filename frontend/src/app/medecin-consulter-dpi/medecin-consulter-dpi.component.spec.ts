import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinConsulterDpiComponent } from './medecin-consulter-dpi.component';

describe('MedecinConsulterDPIComponent', () => {
  let component: MedecinConsulterDpiComponent;
  let fixture: ComponentFixture<MedecinConsulterDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinConsulterDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinConsulterDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
