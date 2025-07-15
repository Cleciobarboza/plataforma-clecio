import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderToSign } from './header-to-sign';

describe('HeaderToSign', () => {
  let component: HeaderToSign;
  let fixture: ComponentFixture<HeaderToSign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderToSign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderToSign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
