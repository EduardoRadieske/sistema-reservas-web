import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  userRole = this.tokenService.getDecodedPayload() ? this.tokenService.getDecodedPayload().ROLE : 'comum';

  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  goToConfigs() {
    this.router.navigate(['/config']);
  }
}
