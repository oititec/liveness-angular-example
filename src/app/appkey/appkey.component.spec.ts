import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppkeyComponent } from './appkey.component';

describe('AppkeyComponent', () => {
  let component: AppkeyComponent;
  let fixture: ComponentFixture<AppkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
