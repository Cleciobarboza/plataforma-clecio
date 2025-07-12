import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-course-and-videos',
  imports: [CommonModule,DashboardHeader, PageNaoImplementada, FooterComponent],
  templateUrl: './course-and-videos.html',
  styleUrl: './course-and-videos.css'
})
export class CourseAndVideos {

}
