import { Component, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../pages/auth/auth';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, Auth ],
  templateUrl: './auth-layout.html',
  styleUrls: ['./auth-layout.css']
})
export class AuthLayoutComponent {
  @ViewChild(Auth) authComponent!: Auth;

  toggleMode() {
    this.authComponent.toggleMode();
  }
}
