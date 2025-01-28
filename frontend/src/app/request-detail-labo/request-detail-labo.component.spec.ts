import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailLaboComponent } from './request-detail-labo.component';

describe('RequestDetailLaboComponent', () => {
  let component: RequestDetailLaboComponent;
  let fixture: ComponentFixture<RequestDetailLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDetailLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDetailLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
