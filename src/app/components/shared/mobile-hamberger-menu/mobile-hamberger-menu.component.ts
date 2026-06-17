import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-hamberger-menu',
  imports: [RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './mobile-hamberger-menu.component.html',
  styleUrl: './mobile-hamberger-menu.component.css'
})
export class MobileHambergerMenuComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  private router = inject(Router)

  closeMenu() {
    this.close.emit();
  }

  isHomePage() {
    return this.router.isActive(
      '/',
      {
        paths: 'exact',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored'
      }
    );
  }

}
