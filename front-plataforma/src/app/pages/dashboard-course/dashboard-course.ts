import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { FooterComponent } from '../../shared/components/footer/footer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import SafeResourceUrl

@Component({
  selector: 'app-dashboard-course',
  standalone: true, // Assuming this is a standalone component
  imports: [CommonModule, DashboardHeader, FooterComponent],
  templateUrl: './dashboard-course.html',
  styleUrl: './dashboard-course.css' // Ensure this CSS file exists or move <style> to it
})
export class DashboardCourse implements OnInit {

  tible: string = "Video List"; // Declare type explicitly
  someItem: string = "<h1>Hi there;</h1>"; // Declare type explicitly
  todayDate!: Date; // Declare type explicitly and use definite assignment assertion

  videoList = [
    {
      name: "Item 1 - Introdução",
      slug: "item-1",
      embed: 'fE5j2sR3o3c', // Example YouTube video ID for "All New Outlander"
    },
    {
      name: "Item 2 - Conceitos Básicos",
      slug: "item-2",
      embed: 'dQw4w9WgXcQ', // Another example YouTube video ID
    },
    {
      name: "Item 3 - Sem Vídeo",
      slug: "item-3",
      embed: null, // Example with no embed
    }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void { // Correct syntax for ngOnInit
    this.todayDate = new Date(); // Correct 'This' to 'this'
  }

  // Correct parameter type to string, and return type to SafeResourceUrl
  getEmbedUrl(videoId: string | null): SafeResourceUrl {
    if (videoId) {
      // Corrected YouTube URL format and semicolon
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?ecver=2&autoplay=0&controls=1');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(''); // Return empty safe URL if no videoId
  }
}