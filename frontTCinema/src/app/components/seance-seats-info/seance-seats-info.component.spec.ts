import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceSeatsInfoComponent } from './seance-seats-info.component';

describe('SeanceSeatsInfoComponent', () => {
  let component: SeanceSeatsInfoComponent;
  let fixture: ComponentFixture<SeanceSeatsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceSeatsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceSeatsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
