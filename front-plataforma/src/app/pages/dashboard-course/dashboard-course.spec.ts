import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCourse } from './dashboard-course';

describe('DashboardCourse', () => {
  let component: DashboardCourse;
  let fixture: ComponentFixture<DashboardCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
