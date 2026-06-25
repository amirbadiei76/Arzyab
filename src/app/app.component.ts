import { Component, ElementRef, Inject, Renderer2, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/components/shared/header/header.component';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MobileHambergerMenuComponent } from './components/shared/mobile-hamberger-menu/mobile-hamberger-menu.component';
import { RoutingShellComponent } from './pages/routing-shell/routing-shell.component';

@Component({
  selector: 'app-root',
  imports: [RoutingShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'قیمت ارز و طلا';
  

  
}