import * as bcrypt from 'bcryptjs';

/**
 * Gera o hash da senha utilizando bcrypt.
 * @param senha texto simples
 * @returns hash da senha
 */
export async function gerarHashSenha(senha: string): Promise<string> {
  const saltRounds = 10; // custo padrão
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(senha, salt);
  return hash;
}
