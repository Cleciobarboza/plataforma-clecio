import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastWatchedCard } from './last-watched-card';

describe('LastWatchedCard', () => {
  let component: LastWatchedCard;
  let fixture: ComponentFixture<LastWatchedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastWatchedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastWatchedCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
