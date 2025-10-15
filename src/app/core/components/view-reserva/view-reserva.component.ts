import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-reserva',
  imports: [],
  templateUrl: './view-reserva.component.html',
  styleUrl: './view-reserva.component.css'
})
export class ViewReservaComponent implements OnInit {
  @Input() reservaId!: number;
  @Output() fechar = new EventEmitter<void>();

  reserva: any = null;
  senhaVisivel = false;

  ngOnInit(): void {
    // Exemplo mockado de carregamento de dados:
    this.reserva = {
      id: this.reservaId,
      sala: 'Laboratório 2',
      usuario: 'Eduardo Radieske',
      horario: '14:00 - 15:00',
      senha: 'ABCD-1234'
    };
  }

  toggleSenha(): void {
    this.senhaVisivel = !this.senhaVisivel;
  }

  fecharPopup(): void {
    this.fechar.emit();
  }
}
