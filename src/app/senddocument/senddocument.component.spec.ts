import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenddocumentComponent } from './senddocument.component';

describe('SenddocumentComponent', () => {
  let component: SenddocumentComponent;
  let fixture: ComponentFixture<SenddocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenddocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
