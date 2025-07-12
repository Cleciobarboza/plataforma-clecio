import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-my-registration',
  imports: [CommonModule, DashboardHeader, PageNaoImplementada, FooterComponent],
  templateUrl: './my-registration.html',
  styleUrl: './my-registration.css'
})
export class MyRegistration {

}
