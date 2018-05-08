import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActivityRequestComponent } from './table-activity-request.component';

describe('TableActivityRequestComponent', () => {
  let component: TableActivityRequestComponent;
  let fixture: ComponentFixture<TableActivityRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableActivityRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActivityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
