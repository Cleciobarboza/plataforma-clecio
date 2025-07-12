import { Component } from '@angular/core';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, DashboardHeader, FooterComponent, PageNaoImplementada],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {

}
