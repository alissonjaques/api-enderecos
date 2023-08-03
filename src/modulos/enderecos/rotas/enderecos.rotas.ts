import { Router } from 'express';
import ControladorEndereco from '../controladores/ControladorEndereco';

const enderecosRotas = Router();
const controladorEndereco = new ControladorEndereco();

enderecosRotas.get('/', controladorEndereco.listar);

export default enderecosRotas;
