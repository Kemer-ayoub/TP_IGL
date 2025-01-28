import {  Component,AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { RouterLink, RouterOutlet,RouterModule, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet,RouterLink,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  {
  constructor(private viewportScroller: ViewportScroller) {}

  scrollToSection(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
