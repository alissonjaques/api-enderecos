import { Router } from 'express';
import ControladorUf from '../controladores/ControladorUf';

const ufsRotas = Router();
const controladorUf = new ControladorUf();

ufsRotas.get('/', controladorUf.consultaPersonalizadaUf);
ufsRotas.post('/', controladorUf.inserir);
ufsRotas.put('/', controladorUf.atualizar);
ufsRotas.delete('/:codigoUF', controladorUf.deletar);

export default ufsRotas;
