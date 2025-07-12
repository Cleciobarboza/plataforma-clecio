import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNaoImplementada } from './page-nao-implementada';

describe('PageNaoImplementada', () => {
  let component: PageNaoImplementada;
  let fixture: ComponentFixture<PageNaoImplementada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNaoImplementada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNaoImplementada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
