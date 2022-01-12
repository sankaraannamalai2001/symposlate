import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycalendarComponent } from './mycalendar.component';

describe('MycalendarComponent', () => {
  let component: MycalendarComponent;
  let fixture: ComponentFixture<MycalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
