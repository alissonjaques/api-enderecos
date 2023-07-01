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
        mensagem: error.mensagem,
        status: error.statusCode,
      });
    }
    console.log(error);
    let mensagemErro = 'erro interno no servidor';
    if (error.message.includes('ORA-12899')) {
      const mensagem = error.message
        .replace(/"/g, '')
        .replace(/ORA-12899: /g, '')
        .replace(/C##NODE.TB_UF\./g, '')
        .replace(/C##NODE.TB_MUNICIPIO\./g, '')
        .replace(/C##NODE.TB_BAIRRO\./g, '')
        .replace(/C##NODE.TB_ENDERECO\./g, '')
        .replace(/C##NODE.TB_PESSOA\./g, '')
        .replace(
          /value too large for column/g,
          'Valor muito grande para a coluna',
        )
        .replace(/real/g, 'atual')
        .replace(/actual/g, 'atual')
        .replace(/maximum/g, 'máximo');
      mensagemErro =
        'Não foi possível incluir o campo no banco de dados.<br>Motivo:' +
        mensagem;
    } else if (error.message.includes('ORA-01438')) {
      mensagemErro =
        'Não foi possível incluir o campo no banco de dados.<br>Motivo: valor maior que a precisão especificada usado para esta coluna';
    } else if (error.message.includes('ORA-00904')) {
      mensagemErro =
        'Não foi possível realizar a operação.<br>Motivo: ' +
        error.message
          .replace(/"/g, '')
          .replace(/ORA-00904: /g, '')
          .replace(':', '')
          .replace('Motivo', 'Motivo:')
          .replace('invalid identifier', 'identificador inválido');
    }
    return response.status(500).json({
      mensagem: mensagemErro,
      status: 500,
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333! 🏆');
});
