import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCertification } from './profile-certification';

describe('ProfileCertification', () => {
  let component: ProfileCertification;
  let fixture: ComponentFixture<ProfileCertification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCertification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCertification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
