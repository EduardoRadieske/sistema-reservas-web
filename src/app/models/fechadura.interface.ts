import { Provedor } from "./provedor.interface";

export interface Fechadura {
  idFechadura?: number;
  chaveDispositivo: string;
  provedor?: Provedor;
}