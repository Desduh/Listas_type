import { Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/barraNavegacao';
import '../../Listagem/styles.css';

function Acomodacoes() {

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className='text'>
                    <h1 className="titles"> <strong> Clientes WB </strong> </h1>
                </div>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead  className="titles-table">
                            <tr>
                                <th>Nome</th>
                                <th>Cama de solteiro</th>
                                <th>Cama casal</th>
                                <th>Climatização</th>
                                <th>Garagem</th>
                                <th>Suite</th>
                                <th>Apagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Acomodacoes;