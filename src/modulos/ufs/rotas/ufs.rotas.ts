import { Router } from 'express';
import ControladorUf from '../controladores/ControladorUf';
import estaAutenticado from '@compartilhado/http/middlewares/estaAutenticado';

const ufsRotas = Router();
const controladorUf = new ControladorUf();

ufsRotas.get('/', controladorUf.consultaPersonalizadaUf);
ufsRotas.post('/', controladorUf.inserir);
ufsRotas.put('/', controladorUf.atualizar);
ufsRotas.delete('/:codigoUF', estaAutenticado, controladorUf.deletar);

export default ufsRotas;
