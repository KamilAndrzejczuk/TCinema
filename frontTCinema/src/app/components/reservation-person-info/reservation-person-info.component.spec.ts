import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPersonInfoComponent } from './reservation-person-info.component';

describe('ReservationPersonInfoComponent', () => {
  let component: ReservationPersonInfoComponent;
  let fixture: ComponentFixture<ReservationPersonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPersonInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPersonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
