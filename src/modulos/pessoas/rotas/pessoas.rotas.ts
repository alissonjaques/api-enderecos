import { Router } from 'express';
import ControladorPessoa from '../controladores/ControladorPessoa';
import estaAutenticado from '@compartilhado/http/middlewares/estaAutenticado';

const rotasDePessoas = Router();
const controladorPessoa = new ControladorPessoa();

rotasDePessoas.get('/', controladorPessoa.consultaPersonalizadaPessoa);
rotasDePessoas.post('/', controladorPessoa.inserir);
rotasDePessoas.put('/', controladorPessoa.atualizar);
rotasDePessoas.delete(
  '/:codigoPessoa',
  estaAutenticado,
  controladorPessoa.deletar,
);

export default rotasDePessoas;
