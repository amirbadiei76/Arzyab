import { Component } from '@angular/core';
import { MobileHambergerMenuComponent } from '../../components/shared/mobile-hamberger-menu/mobile-hamberger-menu.component';
import { NotificationComponent } from '../../components/shared/notification/notification.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-routing-shell',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent, MobileHambergerMenuComponent],
  templateUrl: './routing-shell.component.html',
  styleUrl: './routing-shell.component.css'
})
export class RoutingShellComponent {
  isMenuOpen = false;

  constructor () {
    
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
