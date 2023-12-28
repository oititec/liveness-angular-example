import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppkeyGlobalComponent } from './appkey.component';

describe('AppkeyGlobalComponent', () => {
  let component: AppkeyGlobalComponent;
  let fixture: ComponentFixture<AppkeyGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppkeyGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppkeyGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
