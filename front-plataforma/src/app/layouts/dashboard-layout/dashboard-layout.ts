import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';


@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterOutlet, DashboardHeader],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {

}
