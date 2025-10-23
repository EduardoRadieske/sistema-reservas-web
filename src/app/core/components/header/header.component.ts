import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private dialog = inject(MatDialog);

  userRole = this.tokenService.getDecodedPayload() ? this.tokenService.getDecodedPayload().ROLE : 'comum';

  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    const dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration: '250ms',
      data: {
        titulo: 'Confirmação de Logout',
        conteudo: 'Tem certeza que deseja sair do sistema?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
      }
    });
  }

  goToConfigs() {
    this.router.navigate(['/config']);
  }
}
