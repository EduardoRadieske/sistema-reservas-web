import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReservasService } from '../../core/services/reservas.service';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})
export class Reservas {

  private reservaService = inject(ReservasService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  carregando = false;
  mensagem: string = '';

  reservaForm = new FormGroup({
    idSala: new FormControl<number | null>(null, Validators.required),
    data: new FormControl('', Validators.required),
    horaInicio: new FormControl('', Validators.required),
    horaFim: new FormControl('', Validators.required)
  });

  async onSubmit() {
    if (this.reservaForm.invalid) return;

    this.carregando = true;
    this.mensagem = '';

    let userId: number = parseInt(this.tokenService.getDecodedPayload().jti);

    try {
      await this.reservaService.registrarReserva({
        "usuario": { "idUsuario": userId },
        "sala": { "idSala": this.reservaForm.value.idSala },
        "dataReservaInicial": this.formatarDataHoraISO(this.reservaForm.value.data, this.reservaForm.value.horaInicio),
        "dataReservaFinal": this.formatarDataHoraISO(this.reservaForm.value.data, this.reservaForm.value.horaFim),
      });

      this.router.navigate(['/home']);
    } catch (err: any) {
      this.carregando = false;
      this.mensagem = err.message;
    }
  }

  formatarDataHoraISO(data: any, hora: any) {
    if (!data || !hora) return '';

    // Garante formato "YYYY-MM-DDTHH:mm:00"
    return `${data}T${hora}:00`;
  }
}
