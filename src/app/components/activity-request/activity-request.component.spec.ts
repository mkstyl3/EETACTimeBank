import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRequestComponent } from './activity-request.component';

describe('ActivityRequestComponent', () => {
  let component: ActivityRequestComponent;
  let fixture: ComponentFixture<ActivityRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
