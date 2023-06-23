import { Router } from 'express';
import ControladorBairro from '../controladores/ControladorBairro';

const bairrosRotas = Router();
const controladorBairro = new ControladorBairro();

bairrosRotas.get('/', controladorBairro.consultaPersonalizadaBairro);
bairrosRotas.post('/', controladorBairro.inserir);
bairrosRotas.put('/', controladorBairro.atualizar);
bairrosRotas.delete('/:codigoBairro', controladorBairro.deletar);

export default bairrosRotas;
