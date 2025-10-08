import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

interface TempLogin {
    usuario: string,
    senha: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    async processarLogin(dados: TempLogin) {
        try {
            const response = await fetch(environment.apiUrl + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            const data = await response.json();

            if (response.ok) {
                return data.token;
            } else {
                throw new Error(data.error || 'Erro ao fazer login');
            }
        } catch (err) {
            throw err;
        }
    }
}