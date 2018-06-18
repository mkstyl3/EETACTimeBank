import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitxaComponent } from './fitxa.component';

describe('FitxaComponent', () => {
  let component: FitxaComponent;
  let fixture: ComponentFixture<FitxaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitxaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
