import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentTheme = 'light'
  isDark: boolean = false;
  @Output() menuClick = new EventEmitter<void>();
  themeService: ThemeService;

  private router = inject(Router)

  constructor (private theme: ThemeService) {
    this.themeService = theme;
    this.themeService.getStringTheme();
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

  ngOnInit() {
    this.themeService.getStringTheme();
  }

  openMenu() {
    this.menuClick.emit();
  }

  changeTheme() {    
    this.themeService.cycleTheme();
  }
}
