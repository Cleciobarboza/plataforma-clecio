import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegistration } from './my-registration';

describe('MyRegistration', () => {
  let component: MyRegistration;
  let fixture: ComponentFixture<MyRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
