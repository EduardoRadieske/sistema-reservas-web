import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { TokenService } from "./token.service";

interface Usuario {
    idUsuario: number;
}

interface Sala {
    idSala: number | null | undefined;
}

interface Reserva {
    idReserva?: number;
    usuario: Usuario;
    sala: Sala;
    dataReservaInicial: string; // formato ISO: "2025-10-20T09:00:00"
    dataReservaFinal: string;   // formato ISO: "2025-10-20T11:00:00"
}

@Injectable({
    providedIn: 'root'
})
export class ReservasService {
    private tokenService = inject(TokenService);

    async registrarReserva(reserva: Reserva) {
        try {
            const response = await fetch(environment.apiUrl + '/reservas', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                },
                body: JSON.stringify(reserva)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao registrar a reserva');
            }
        } catch (err) {
            throw err;
        }
    }
}