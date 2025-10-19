export interface Reserva {
  id: number;
  sala: string;
  usuario: string;
  data: Date;
  horario: string;
}

interface Usuario {
    idUsuario: number;
}

interface Sala {
    idSala: number | null | undefined;
}

export interface ReservaRequest {
    idReserva?: number;
    usuario: Usuario;
    sala: Sala;
    dataReservaInicial: string; // formato ISO: "2025-10-20T09:00:00"
    dataReservaFinal: string;   // formato ISO: "2025-10-20T11:00:00"
}