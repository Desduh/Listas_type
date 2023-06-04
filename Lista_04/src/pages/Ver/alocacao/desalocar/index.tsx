import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/barraNavegacao'
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { LuClipboardX } from "react-icons/lu";

interface Cliente {
    id: string;
    cpf: string;
    nascimento: string;
    nome: string;
    nome_social: string;
    passaporte: string;
    titular: boolean;
}

function Desalocar() {
    const [clientesAlocados, setClientesAlocados] = useState<Cliente[]>([]);
    const [atualizarClientesAlocados, setAtualizarClientesAlocados] = useState(false);

    function handleSubmit(clienteId: string) {
    }

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className='text'>
                    <h1 className="titles"> <strong> Desalocar cliente </strong> </h1>
                </div>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead className="titles-table">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Desalocar</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>Julia</td>
                                    <td>123.456.789-00</td>
                                    <td>
                                        <Button
                                            className="cps"
                                            id="transparente"
                                            onClick={() => handleSubmit("1")}
                                        >
                                            <LuClipboardX color='black' size={28} />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>John</td>
                                    <td>987.654.321-00</td>
                                    <td>
                                        <Button
                                            className="cps"
                                            id="transparente"
                                            onClick={() => handleSubmit("1")}
                                        >
                                            <LuClipboardX color='black' size={28} />
                                        </Button>
                                    </td>
                                </tr>
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Desalocar;
