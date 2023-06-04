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
import VerCliente from '../pages/verEditarCliente/cliente';
import Alocar from '../pages/Ver/alocacao/alocar';
import Desalocar from '../pages/Ver/alocacao/desalocar';
import CadastrarAcomodacoes from '../pages/Cadastrar/acomodacoes';
import AddDependentes from '../pages/Cadastrar/dependentes';
import AcomodacaoVazia from '../pages/Ver/alocacao/acomodacaoVazia';
import EditarDependentes from '../pages/verEditarCliente/dependente';

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

                <Route path='/ver/cliente' element={<VerCliente/>}/>
                <Route path='/ver/dependentes' element={<EditarDependentes/>}/>
                <Route path='/alocar' element={<Alocar/>}/>
                <Route path='/amodacoes_disponiveis' element={<AcomodacaoVazia/>}/>
                <Route path='/desalocar' element={<Desalocar/>}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;