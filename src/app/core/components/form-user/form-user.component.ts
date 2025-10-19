import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../services/usuarios.service';
import { gerarHashSenha } from '../../utils/crypto';
import { Toast } from '../../utils/toast';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-form-user',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {

  private reservaService = inject(UsuarioService);

  private toast = inject(Toast);

  tiposUsuario = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Comum', value: 'comum' }
  ];

  form = new FormGroup({
    nome: new FormControl<string>('', [Validators.required, Validators.maxLength(100)]),
    usuario: new FormControl<string>('', [Validators.required, Validators.maxLength(100)]),
    senhaHash: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    tipo: new FormControl<string>('comum', Validators.required),
  });

  mensagem: string = '';

  hide = signal(true);

  exibirSenha(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.form.value;

    try {

      const senha = this.form.value.senhaHash!;
      const senhaHash = await gerarHashSenha(senha);

      await this.reservaService.cadastrar({
        nome: usuario.nome!,
        usuario: usuario.usuario!,
        senhaHash,
        tipo: usuario.tipo!
      });

      this.form.reset();
      this.mensagem = '';
      this.toast.show('Usuário registrado com sucesso!', 'success');
    } catch (err: any) {
      this.mensagem = err.message;
    }
  }
}
