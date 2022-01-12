import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventComponent } from './all-event.component';

describe('AllEventComponent', () => {
  let component: AllEventComponent;
  let fixture: ComponentFixture<AllEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
