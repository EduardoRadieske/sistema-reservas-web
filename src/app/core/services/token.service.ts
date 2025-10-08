import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private TOKEN_KEY: string = 'auth_token';

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && !!window.sessionStorage;
    }

    saveToken(token: string): void {
        if (this.isBrowser()) {
            sessionStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    getToken(): string | null {
        if (this.isBrowser()) {
            return sessionStorage.getItem(this.TOKEN_KEY);
        }
        return null;
    }

    removeToken(): void {
        if (this.isBrowser()) {
            sessionStorage.removeItem(this.TOKEN_KEY);
        }
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    isTokenValid(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = JSON.parse(atob(payloadBase64));

            // exp é o timestamp em segundos (Unix time)
            const expirationDate = payloadJson.exp * 1000;
            const now = Date.now();

            return now < expirationDate;
        } catch (e) {
            console.error('Erro ao decodificar o token:', e);
            return false;
        }
    }

    getDecodedPayload(): any | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payloadBase64 = token.split('.')[1];
            return JSON.parse(atob(payloadBase64));
        } catch {
            return null;
        }
    }
}