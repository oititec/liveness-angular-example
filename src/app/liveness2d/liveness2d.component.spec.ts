import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Liveness2dComponent } from './liveness2d.component';

describe('Liveness2dComponent', () => {
  let component: Liveness2dComponent;
  let fixture: ComponentFixture<Liveness2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Liveness2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Liveness2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
