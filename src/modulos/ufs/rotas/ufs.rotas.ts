import { Router } from 'express';
import ControladorUf from '../controladores/ControladorUf';

const ufsRoutes = Router();
const controladorUf = new ControladorUf();

ufsRoutes.get('/', controladorUf.index);
ufsRoutes.get('/:codigoUF', controladorUf.show);
ufsRoutes.post('/', controladorUf.create);
ufsRoutes.put('/', controladorUf.update);
ufsRoutes.delete('/:codigoUF', controladorUf.delete);

export default ufsRoutes;
