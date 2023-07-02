import { Router } from 'express';
import ControladorSessao from '../controladores/ControladorSessao';

const rotasLogin = Router();
const controladorSessao = new ControladorSessao();

rotasLogin.post('/', controladorSessao.criar);

export default rotasLogin;
