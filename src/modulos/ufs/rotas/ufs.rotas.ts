import { Router } from 'express';
import ControladorUf from '../controladores/ControladorUf';

const ufsRoutes = Router();
const controladorUf = new ControladorUf();

ufsRoutes.get('/', controladorUf.consultaPersonalizadaUf);
ufsRoutes.post('/', controladorUf.inserir);
ufsRoutes.put('/', controladorUf.atualizar);
ufsRoutes.delete('/:codigoUF', controladorUf.deletar);

export default ufsRoutes;
