import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCards } from './free-cards';

describe('FreeCards', () => {
  let component: FreeCards;
  let fixture: ComponentFixture<FreeCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
