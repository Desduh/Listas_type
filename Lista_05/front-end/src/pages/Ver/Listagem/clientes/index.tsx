import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import NavBar_ from '../../../../component/barraNavegacao';
import '../../Listagem/styles.css';

interface Cliente {
    id: string;
    nome: string;
    cpf: string;
  }
  
function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/clientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    console.log(clientes);    

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
                {clientes.length > 0 ? (
                    <Table striped bordered hover variant="light">
                        <thead className="titles-table">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Ver</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td><a className="editar-cps" href={`/cliente/${cliente.id}`}>Ver</a></td>
                                        <td><a className="editar-cps" href={`/editar_cliente/${cliente.id}`}>Editar</a></td>
                                        <td><a className="remover-cps" href="/" type='submit'>Remover</a></td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                ) : (
                    <tr>
                        <td>Sem dados</td>
                    </tr>
                )}
                </div>
            </main>
        </section>
    );
}

export default Clientes;
