import { Router } from 'express';
import ControladorPessoa from '../controladores/ControladorPessoa';

const rotasDePessoas = Router();
const controladorPessoa = new ControladorPessoa();

rotasDePessoas.get('/', controladorPessoa.consultaPersonalizadaPessoa);
rotasDePessoas.post('/', controladorPessoa.inserir);
rotasDePessoas.put('/', controladorPessoa.atualizar);
rotasDePessoas.delete('/:codigoPessoa', controladorPessoa.deletar);

export default rotasDePessoas;
