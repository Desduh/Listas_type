import { Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/barraNavegacao';
import '../../Listagem/styles.css';
import Axios from "axios";
import { useState, useEffect } from "react";

function Acomodacoes() {
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
                            </tr>
                        </thead>
                        {typeof list !== 'undefined' && list.map((value) => {
                            return value ?
                        <tbody>
                            <tr>
                                <td> {value[1]} </td>
                                <td> {value[2]} </td>
                                <td> {value[3]} </td>
                                <td> {value[4]} </td>
                                <td> {value[5]} </td>
                                <td> {value[6]} </td>
                            </tr>
                        </tbody>
                        :null})}
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Acomodacoes;