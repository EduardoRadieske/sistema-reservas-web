import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ViewReservaComponent } from '../../core/components/view-reserva/view-reserva.component';
import { ReservasService } from '../../core/services/reservas.service';
import { Reserva } from '../../models/reserva.interface';

@Component({
  selector: 'app-home',
  imports: [DatePipe, MatListModule, MatCardModule, MatIconModule, MatButtonModule, ViewReservaComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private router = inject(Router);
  private reservasService = inject(ReservasService);

  reservas: Reserva[] = [];

  mostrarPopup = false;
  reservaSelecionada!: Reserva;

  async ngOnInit() {
    const listaReservas = await this.reservasService.buscarReservas();

    this.reservas = listaReservas.map((r: any): Reserva  => {
      const inicio = new Date(r.dataReservaInicial);
      const fim = new Date(r.dataReservaFinal);

      const formatHora = (d: Date) =>
          `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

      return {
        id: r.idReserva,
        sala: r.sala.nome,
        usuario: r.usuario.nome,
        data: inicio,
        horario: `${formatHora(inicio)} - ${formatHora(fim)}`
      };
    });
  }

  criarReserva() {
    this.router.navigate(['/reservas']);
  }

  verDetalhes(reserva: Reserva) {
    this.reservaSelecionada = reserva;
    this.mostrarPopup = true;
  }

}
