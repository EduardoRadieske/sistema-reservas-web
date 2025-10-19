import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { TokenService } from "./token.service";
import { Sala } from "../../models/sala.interface";

@Injectable({
    providedIn: 'root'
})
export class SalasService {
    
    private tokenService = inject(TokenService);

    async cadastrar(sala: Sala) {
        try {
            const response = await fetch(environment.apiUrl + '/salas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                },
                body: JSON.stringify(sala)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao registrar a sala');
            }
        } catch (err) {
            throw err;
        }
    }

    async buscarSalas(): Promise<Sala[]> {
        try {
            const response = await fetch(environment.apiUrl + '/salas', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao consultar as salas');
            }

            return data;
        } catch (err) {
            throw err;
        }
    }
}