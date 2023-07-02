import crypto from 'crypto';

function gerarHash(senha: string): string {
  const hash = crypto.createHash('sha256');
  const senhaCriptografada = hash.update(senha).digest('base64');
  return senhaCriptografada;
}

export default gerarHash;
