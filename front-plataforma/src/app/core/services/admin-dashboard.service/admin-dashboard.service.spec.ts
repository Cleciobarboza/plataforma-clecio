import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardService } from './admin-dashboard.service';

describe('AdminDashboardService', () => {
  let component: AdminDashboardService;
  let fixture: ComponentFixture<AdminDashboardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
