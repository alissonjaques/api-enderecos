import { Router } from 'express';
import ControladorMunicipio from '../controladores/ControladorMunicipio';
import estaAutenticado from '@compartilhado/http/middlewares/estaAutenticado';

const municipiosRotas = Router();
const controladorMunicipio = new ControladorMunicipio();

municipiosRotas.get('/', controladorMunicipio.consultaPersonalizadaMunicipio);
municipiosRotas.post('/', controladorMunicipio.inserir);
municipiosRotas.put('/', controladorMunicipio.atualizar);
municipiosRotas.delete(
  '/:codigoMunicipio',
  estaAutenticado,
  controladorMunicipio.deletar,
);

export default municipiosRotas;
