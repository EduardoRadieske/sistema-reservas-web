import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { TokenService } from "./token.service";
import { Provedor } from "../../models/provedor.interface";

@Injectable({
    providedIn: 'root'
})
export class ProvedorService {

    private tokenService = inject(TokenService);

    async cadastrar(provedor: Provedor) {
        try {
            const response = await fetch(environment.apiUrl + '/provedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                },
                body: JSON.stringify(provedor)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao registrar o provedor');
            }
        } catch (err) {
            throw err;
        }
    }

    async buscar(): Promise<Provedor[]> {
        try {
            const response = await fetch(environment.apiUrl + '/provedor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao consultar os provedores');
            }

            return data;
        } catch (err) {
            throw err;
        }
    }
}