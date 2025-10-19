import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Fechadura } from '../../../models/fechadura.interface';
import { FechaduraService } from '../../services/fechadura.service';
import { Toast } from '../../utils/toast';
import { SalasService } from '../../services/salas.service';

@Component({
  selector: 'app-form-sala',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './form-sala.component.html',
  styleUrl: './form-sala.component.css'
})
export class FormSalaComponent implements OnInit {

  private fechaduraService = inject(FechaduraService);
  private salaService = inject(SalasService);
  private toast = inject(Toast);

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    descricao: new FormControl('', [Validators.maxLength(1000)]),
    fechadura: new FormControl<Fechadura | null>(null, [Validators.required]),
  });

  fechaduras: Fechadura[] = [];

  async ngOnInit(): Promise<void> {
    this.fechaduras = await this.fechaduraService.buscar();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.value;

    try {

      await this.salaService.cadastrar({
        nome: dados.nome!,
        descricao: dados.descricao!,
        fechadura: {
          idFechadura: dados.fechadura!.idFechadura,
          chaveDispositivo: '' // Apenas para satisfazer a interface
        }
      });

      this.form.reset();

      this.toast.show('Fechadura registrada com sucesso!', 'success');
    } catch (err: any) {
      this.toast.show(err.message, 'error');
    }
  }
}
