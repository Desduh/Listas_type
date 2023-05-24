import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/barraNavegacao'
import '../styles.css'
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';

function Alocar() {
    const [list, setList] = useState([]);
    
    useEffect(() => {
      Axios.get(`http://localhost:3001/ver/clientes`).then((resp) => {
        setList(resp.data);
      });
    }, [])

    function handleSubmit(id: number) {     
        Axios.post("http://localhost:3001/deletar", {
          id: id,
          tabela: 'cliente'
        }).then((res)=>{
          console.log(res)
        })    
    }

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1 className="titles"> <strong> Alocar cliente </strong> </h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead  className="titles-table">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Alocar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Carlos </td>
                                <td> 499.858.428-63 </td>
                                <td> <a className="remover-cps" href='/clientes' type='submit' onClick={() => handleSubmit(1)}>Opções</a> </td>                 
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Alocar;
