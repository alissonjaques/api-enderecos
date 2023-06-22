import ufsRotas from '@modules/ufs/rotas/ufs.rotas';
import mucipiosRotas from '@modules/municipios/rotas/municipios.rotas';
import { Router } from 'express';

const routes = Router();

routes.use('/uf', ufsRotas);
routes.use('/municipio', mucipiosRotas);

export default routes;
