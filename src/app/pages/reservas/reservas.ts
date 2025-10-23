import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReservasService } from '../../core/services/reservas.service';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { SalasService } from '../../core/services/salas.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Sala } from '../../models/sala.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reservas',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatIconModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})
export class Reservas implements OnInit {

  private reservaService = inject(ReservasService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private salaService = inject(SalasService);

  carregando = false;
  mensagem: string = '';

  reservaForm = new FormGroup({
    sala: new FormControl<Sala | null>(null, Validators.required),
    data: new FormControl('', Validators.required),
    horaInicio: new FormControl('', Validators.required),
    horaFim: new FormControl('', Validators.required)
  });

  salas: Sala[] = [];

  async ngOnInit(): Promise<void> {
    this.salas = await this.salaService.buscarSalas();
  }

  async onSubmit(): Promise<void> {
    if (this.reservaForm.invalid) return;

    this.carregando = true;
    this.mensagem = '';

    let userId: number = parseInt(this.tokenService.getDecodedPayload().jti);

    let dataInicial = this.formatarDataHoraISO(new Date(this.reservaForm.value.data!), this.reservaForm.value.horaInicio);
    let dataFinal = this.formatarDataHoraISO(new Date(this.reservaForm.value.data!), this.reservaForm.value.horaFim);

    if (this.dataMaior(dataInicial, dataFinal)) {
      this.carregando = false;
      this.mensagem = 'A data/hora de final precisa ser maior que a data inicial!';
      return;
    }

    try {
      await this.reservaService.registrarReserva({
        "usuario": { "idUsuario": userId },
        "sala": { "idSala": this.reservaForm.value.sala!.idSala },
        "dataReservaInicial": dataInicial,
        "dataReservaFinal": dataFinal,
      });

      this.router.navigate(['/home']);
    } catch (err: any) {
      this.carregando = false;
      this.mensagem = err.message;
    }
  }

  formatarDataHoraISO(data: Date, hora: any): string {
    if (!data || !hora) return '';

    // Garante formato "YYYY-MM-DDTHH:mm:00"
    return `${data.toISOString().split('T')[0]}T${hora}:00`;
  }

  dataMaior(d1: string, d2: string): boolean {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 > date2) {
      return true;
    } 

    return false;
  }
}
