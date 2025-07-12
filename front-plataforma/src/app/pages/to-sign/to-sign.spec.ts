import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSign } from './to-sign';

describe('ToSign', () => {
  let component: ToSign;
  let fixture: ComponentFixture<ToSign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToSign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToSign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
