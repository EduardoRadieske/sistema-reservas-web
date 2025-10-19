import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Provedor } from '../../../models/provedor.interface';
import { MatSelectModule } from '@angular/material/select';
import { ProvedorService } from '../../services/provedor.service';
import { Toast } from '../../utils/toast';
import { PROVEDORES_DISPONIVEIS } from '../../utils/provedores';

@Component({
  selector: 'app-form-provedor',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './form-provedor.component.html',
  styleUrl: './form-provedor.component.css'
})
export class FormProvedorComponent {
  
  private provedorService = inject(ProvedorService);
  private toast = inject(Toast);

  provedores: Provedor[] = PROVEDORES_DISPONIVEIS;

  form = new FormGroup({
    provedor: new FormControl('', [Validators.required]),
    clientId: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    secret: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const provedor = this.form.value;
  
    try {

      await this.provedorService.cadastrar({
        provedor: provedor.provedor!,
        clientId: provedor.clientId!,
        secret: provedor.secret!
      });

      this.form.reset();

      this.toast.show('Provedor registrado com sucesso!', 'success');
    } catch (err: any) {
     this.toast.show(err.message, 'error');
    }

  }
}
