import ufsRoutes from '@modules/ufs/rotas/ufs.rotas';
import { Router } from 'express';

const routes = Router();

routes.use('/uf', ufsRoutes);

export default routes;
