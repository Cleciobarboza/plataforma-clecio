import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfile } from './my-profile';

describe('MyProfile', () => {
  let component: MyProfile;
  let fixture: ComponentFixture<MyProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Exemplo no componente (modo escuro)
document.documentElement.classList.add('dark');

// Exemplo para voltar ao claro
document.documentElement.classList.remove('dark');

