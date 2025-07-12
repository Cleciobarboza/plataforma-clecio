import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAndVideos } from './course-and-videos';

describe('CourseAndVideos', () => {
  let component: CourseAndVideos;
  let fixture: ComponentFixture<CourseAndVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAndVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAndVideos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
