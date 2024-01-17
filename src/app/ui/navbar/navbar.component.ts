import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userMenuOpened: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  toggleUserMenu() {
    this.userMenuOpened = !this.userMenuOpened;
  }

  closeUserMenu() {
    this.userMenuOpened = false;
  }

  logout() {
    this.authService.Logout().subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
    });
  }
}
