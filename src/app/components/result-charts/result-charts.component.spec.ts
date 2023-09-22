import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultChartsComponent } from './result-charts.component';

describe('ResultChartsComponent', () => {
  let component: ResultChartsComponent;
  let fixture: ComponentFixture<ResultChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultChartsComponent]
    });
    fixture = TestBed.createComponent(ResultChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
