import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { TokenService } from "./token.service";
import { Fechadura } from "../../models/fechadura.interface";

@Injectable({
    providedIn: 'root'
})
export class FechaduraService {

    private tokenService = inject(TokenService);

    async cadastrar(fechadura: Fechadura) {
        try {
            const response = await fetch(environment.apiUrl + '/fechaduras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                },
                body: JSON.stringify(fechadura)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao registrar a fechadura');
            }
        } catch (err) {
            throw err;
        }
    }

    async buscar(): Promise<Fechadura[]> {
        try {
            const response = await fetch(environment.apiUrl + '/fechaduras', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao consultar as fechaduras');
            }

            return data;
        } catch (err) {
            throw err;
        }
    }
}