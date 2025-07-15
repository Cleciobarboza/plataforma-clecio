import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profilephoto } from './profilephoto';

describe('Profilephoto', () => {
  let component: Profilephoto;
  let fixture: ComponentFixture<Profilephoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profilephoto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profilephoto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
