import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(public router: Router) { }

  shouldShowNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
