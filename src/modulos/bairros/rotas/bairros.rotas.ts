import { Router } from 'express';
import ControladorBairro from '../controladores/ControladorBairro';
import estaAutenticado from '@compartilhado/http/middlewares/estaAutenticado';

const bairrosRotas = Router();
const controladorBairro = new ControladorBairro();

bairrosRotas.get('/', controladorBairro.consultaPersonalizadaBairro);
bairrosRotas.post('/', controladorBairro.inserir);
bairrosRotas.put('/', controladorBairro.atualizar);
bairrosRotas.delete(
  '/:codigoBairro',
  estaAutenticado,
  controladorBairro.deletar,
);

export default bairrosRotas;
