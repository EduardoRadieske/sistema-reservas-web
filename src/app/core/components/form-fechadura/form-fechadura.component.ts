import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Provedor } from '../../../models/provedor.interface';
import { ProvedorService } from '../../services/provedor.service';
import { PROVEDORES_DISPONIVEIS } from '../../utils/provedores';
import { FechaduraService } from '../../services/fechadura.service';
import { Toast } from '../../utils/toast';

@Component({
  selector: 'app-form-fechadura',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './form-fechadura.component.html',
  styleUrl: './form-fechadura.component.css'
})
export class FormFechaduraComponent implements OnInit {

  private provedorService = inject(ProvedorService);
  private fechaduraService = inject(FechaduraService);
  private toast = inject(Toast);

  provedores: Provedor[] = [];

  form = new FormGroup({
    provedor: new FormControl<Provedor | null>(null, Validators.required),
    chaveDispositivo: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  async ngOnInit(): Promise<void> {
    this.provedores = await this.provedorService.buscar();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.value;

    try {
      
      await this.fechaduraService.cadastrar({
        chaveDispositivo: dados.chaveDispositivo!,
        provedor: {
          idProvedor: dados.provedor!.idProvedor,
          provedor: dados.provedor!.provedor,
        }
      });

      this.form.reset();

      this.toast.show('Fechadura registrada com sucesso!', 'success');
    } catch (err: any) {
      this.toast.show(err.message, 'error');
    }
  }

  getDescricaoProvedor(prov: string): string {
    const provedor = PROVEDORES_DISPONIVEIS.find(p => p.provedor === prov);
    return provedor ? provedor.nomeProvedor! : 'Desconhecido';
  }
}
