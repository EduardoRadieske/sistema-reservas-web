import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class Login {
  private loginService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });

  falhaLogin: string = '';

  hide = signal(true);

  exibirSenha(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async fazerLogin() {
    try 
    {
      let token = await this.loginService.processarLogin({
        usuario: (this.loginForm.value.usuario || ''),
        senha: (this.loginForm.value.senha  || ''),
      });

      this.tokenService.saveToken(token);
      this.router.navigate(['/home']);
    } catch (erro: any) {
      if (erro.message.toLowerCase().startsWith('failed to fetch')) {
        this.falhaLogin = 'Sem conexão com o servidor';
      } else {
        this.falhaLogin = erro.message || 'Erro ao conectar com o servidor';
      }
    }
    
  }
}
