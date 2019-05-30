import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfromComponent } from './myfrom.component';

describe('MyfromComponent', () => {
  let component: MyfromComponent;
  let fixture: ComponentFixture<MyfromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
