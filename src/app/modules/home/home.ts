import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ViewReservaComponent } from '../../core/components/view-reserva/view-reserva.component';

interface Reserva {
  id: number;
  sala: string;
  data: Date;
  horario: string;
}

@Component({
  selector: 'app-home',
  imports: [DatePipe, MatListModule, MatCardModule, MatIconModule, MatButtonModule, ViewReservaComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private router = inject(Router);

  reservas: Reserva[] = [];

  mostrarPopup = false;
  reservaSelecionadaId: number = 0;

  ngOnInit(): void {
    // mock inicial (futuro: buscar da API)
    this.reservas = [
      { id: 1, sala: 'Sala 101', data: new Date(), horario: '08:00 - 09:00' },
      { id: 2, sala: 'Laboratório 2', data: new Date(), horario: '10:00 - 11:00' },
    ];
  }

  criarReserva() {
    this.router.navigate(['/reservas']);
  }

  verDetalhes(reserva: Reserva) {
    this.reservaSelecionadaId = reserva.id;
    this.mostrarPopup = true;
  }
  
}
