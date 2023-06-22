import { Router } from 'express';
import ControladorMunicipio from '../controladores/ControladorMunicipio';

const municipiosRotas = Router();
const controladorMunicipio = new ControladorMunicipio();

municipiosRotas.get('/', controladorMunicipio.consultaPersonalizadaMunicipio);
municipiosRotas.post('/', controladorMunicipio.inserir);
municipiosRotas.put('/', controladorMunicipio.atualizar);
municipiosRotas.delete('/:codigoMunicipio', controladorMunicipio.deletar);

export default municipiosRotas;
