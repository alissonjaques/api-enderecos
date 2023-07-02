import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import autorizacao from '@config/autorizacao';
import AppErros from '@compartilhado/erros/AppErros';

export default function estaAutenticado(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const cabecalhoAutenticacao = request.headers.authorization;

  if (!cabecalhoAutenticacao) {
    throw new AppErros('Token JWT não informado.');
  }

  const [, token] = cabecalhoAutenticacao.split(' ');

  try {
    verify(token, autorizacao.jwt.segredo);
    return next();
  } catch {
    throw new AppErros('Token JWT inválido.');
  }
}
