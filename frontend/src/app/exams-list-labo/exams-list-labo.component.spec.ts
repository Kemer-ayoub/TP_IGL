import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsListLaboComponent } from './exams-list-labo.component';

describe('ExamsListLaboComponent', () => {
  let component: ExamsListLaboComponent;
  let fixture: ComponentFixture<ExamsListLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsListLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsListLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
