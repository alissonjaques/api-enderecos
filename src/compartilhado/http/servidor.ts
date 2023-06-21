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
        status: `${error.statusCode}`,
        mensagem: error.mensagem,
      });
    }
    console.log(error);
    let mensagemErro = 'erro interno no servidor';
    if (error.message.includes('ORA-12899')) {
      const mensagem = error.message
        .replace(/"/g, '')
        .replace(/ORA-12899: /g, '')
        .replace(/C##NODE.TB_UF\./g, '')
        .replace(
          /value too large for column/g,
          'Valor muito grande para a coluna',
        )
        .replace(/real/g, 'atual')
        .replace(/actual/g, 'atual')
        .replace(/maximum/g, 'máximo');
      mensagemErro =
        'Não foi possível incluir o registro no banco de dados.<br>Motivo:' +
        mensagem;
    } else if (error.message.includes('ORA-01438')) {
      mensagemErro =
        'Não foi possível incluir o registro no banco de dados.<br>Motivo: valor maior que a precisão especificada usado para esta coluna';
    }
    return response.status(500).json({
      status: '500',
      mensagem: mensagemErro,
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333! 🏆');
});
