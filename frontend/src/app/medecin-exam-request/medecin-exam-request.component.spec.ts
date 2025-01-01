import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinExamRequestComponent } from './medecin-exam-request.component';

describe('MedecinExamRequestComponent', () => {
  let component: MedecinExamRequestComponent;
  let fixture: ComponentFixture<MedecinExamRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinExamRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinExamRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
