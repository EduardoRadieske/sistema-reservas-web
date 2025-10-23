import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Reserva } from '../../../models/reserva.interface';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-view-reserva',
  imports: [],
  templateUrl: './view-reserva.component.html',
  styleUrl: './view-reserva.component.css'
})
export class ViewReservaComponent {
  @Input({ required: true }) reserva!: Reserva;
  @Output() fechar = new EventEmitter<void>();

  private reservaService = inject(ReservasService);

  senhaVisivel = false;

  senhaTemporaria: string = '';

  async toggleSenha() {
    await this.atualizarSenha();

    this.senhaVisivel = !this.senhaVisivel;
  }

  fecharPopup() {
    this.fechar.emit();
  }

  async atualizarSenha() {
    if (!this.senhaTemporaria) {
      const senhaObj = await this.reservaService.buscarSenhaReserva(this.reserva.id);

      this.senhaTemporaria = senhaObj.codigo;
    }
  }
}
