import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import rotas from '../rotas';
import AppErros from '../erros/AppErros';
import '@compartilhado/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppErros) {
      return response.status(error.statusCode).json({
        status: 'erro',
        mensagem: error.mensagem,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: 'erro',
      mensagem: 'Erro interno no servidor',
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333! 🏆');
});
