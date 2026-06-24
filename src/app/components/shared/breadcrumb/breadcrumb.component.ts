import { NgFor, NgIf } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


export interface BreadcrumbItem {
  title: string,
  link?: string
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  
  constructor() {
    
  }
}
