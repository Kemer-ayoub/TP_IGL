import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareListComponent } from './care-list.component';

describe('CareListComponent', () => {
  let component: CareListComponent;
  let fixture: ComponentFixture<CareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
