import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { TokenService } from "./token.service";
import { Usuario } from "../../models/usuario.interface";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private tokenService = inject(TokenService);

    async cadastrar(usuario: Usuario) {
        try {
            const response = await fetch(environment.apiUrl + '/usuarios', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + this.tokenService.getToken()
                },
                body: JSON.stringify(usuario)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao registrar o usuário');
            }
        } catch (err) {
            throw err;
        }
    }
}