export interface Usuario {
  idUsuario?: number;        
  nome?: string;
  usuario: string;
  senhaHash: string;
  tipo: string;   
  createdAt?: string;        
}

export interface TempLogin {
    usuario: string,
    senha: string
}