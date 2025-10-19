import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { TokenService } from "./token.service";
import { ReservaRequest } from "../../models/reserva.interface";

@Injectable({
    providedIn: 'root'
})
export class ReservasService {
    private tokenService = inject(TokenService);

    async registrarReserva(reserva: ReservaRequest) {
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

    async buscarReservas() {
        try {
            const response = await fetch(environment.apiUrl + '/reservas', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao consultar as reserva');
            }

            return data;
        } catch (err) {
            throw err;
        }
    }

    async buscarSenhaReserva(idReserva: number)  {
        try {
            const response = await fetch(`${environment.apiUrl}/reservas/${idReserva}/senha`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao consultar a senha da reserva');
            }

            return data;
        } catch (err) {
            throw err;
        }
    }
}