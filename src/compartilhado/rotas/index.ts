import ufsRotas from '@modules/ufs/rotas/ufs.rotas';
import mucipiosRotas from '@modules/municipios/rotas/municipios.rotas';
import bairroRotas from '@modules/bairros/rotas/bairros.rotas';
import { Router } from 'express';

const routes = Router();

routes.use('/uf', ufsRotas);
routes.use('/municipio', mucipiosRotas);
routes.use('/bairro', bairroRotas);

export default routes;
