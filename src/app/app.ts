import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet/>'
})
export class App implements OnInit {
  private router = inject(Router);

  private tokenService = inject(TokenService);

  ngOnInit(): void {
    const hasToken = this.tokenService.hasToken();
    const tokenValid = this.tokenService.isTokenValid();

    if (hasToken && tokenValid) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
