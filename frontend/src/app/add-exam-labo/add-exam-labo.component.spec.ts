import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamLaboComponent } from './add-exam-labo.component';

describe('AddExamLaboComponent', () => {
  let component: AddExamLaboComponent;
  let fixture: ComponentFixture<AddExamLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
