import { Fechadura } from "./fechadura.interface";

export interface Sala {
    idSala?: number;
    nome: string;
    descricao?: string;
    fechadura: Fechadura;
}