import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-profile-certification',
  imports: [CommonModule, DashboardHeader, PageNaoImplementada, FooterComponent],
  templateUrl: './profile-certification.html',
  styleUrl: './profile-certification.css'
})
export class ProfileCertification {

}
