import {
    BrowserRouter as Router,
    Route, 
    Routes
} from 'react-router-dom';

import Home from '../pages/Home';
// visualizacao
import Clientes from '../pages/Ver/Listagem/clientes';
import CadastrarClientes from '../pages/Cadastrar/clientes';
import Acomodacoes from '../pages/Ver/Listagem/acomodacoes';
import Cliente from '../pages/Ver/Listagem/cliente';
import EditarCliente from '../pages/Ver/Editar';
import Alocar from '../pages/Ver/alocacao/alocar';
import Desalocar from '../pages/Ver/alocacao/desalocar';
import CadastrarAcomodacoes from '../pages/Cadastrar/acomodacoes';
import AddDependentes from '../pages/Cadastrar/dependentes';
import AcomodacaoVazia from '../pages/Ver/alocacao/acomodacaoVazia';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/clientes' element={<Clientes/>}/>
                <Route path='/cadastrar/clientes' element={<CadastrarClientes/>}/>
                <Route path='/cadastrar/acomodacoes' element={<CadastrarAcomodacoes/>}/>
                <Route path='/cadastrar/dependentes' element={<AddDependentes/>}/>
                <Route path='/acomodacoes' element={<Acomodacoes/>}/>

                <Route path='/cliente' element={<Cliente/>}/>
                <Route path='/editar_cliente' element={<EditarCliente/>}/>
                <Route path='/alocar' element={<Alocar/>}/>
                <Route path='/amodacoes_disponiveis' element={<AcomodacaoVazia/>}/>
                <Route path='/desalocar' element={<Desalocar/>}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;