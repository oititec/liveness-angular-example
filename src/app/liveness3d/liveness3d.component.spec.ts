import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Liveness3dComponent } from './liveness3d.component';

describe('Liveness3dComponent', () => {
  let component: Liveness3dComponent;
  let fixture: ComponentFixture<Liveness3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Liveness3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Liveness3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
