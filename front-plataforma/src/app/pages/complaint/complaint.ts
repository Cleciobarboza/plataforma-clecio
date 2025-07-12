import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { FooterComponent } from '../../shared/components/footer/footer';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';

@Component({
  selector: 'app-complaint',
  imports: [CommonModule, DashboardHeader, FooterComponent, PageNaoImplementada],
  templateUrl: './complaint.html',
  styleUrl: './complaint.css'
})
export class Complaint {

}
