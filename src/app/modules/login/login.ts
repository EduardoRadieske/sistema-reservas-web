import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule],
})
export class Login {
  private loginService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });

  falhaLogin = '';

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
      this.falhaLogin = erro.message || 'Erro ao conectar com o servidor';
    }
    
  }
}
