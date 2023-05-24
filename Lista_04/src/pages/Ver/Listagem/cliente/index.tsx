import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/barraNavegacao';
import '../../Listagem/styles.css';
import Axios from "axios";
import { useState, useEffect } from "react";

function Cliente() {
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
                <h1 className="titles"> <strong> Clientes WB </strong> </h1>
                <div className="cliente-dados">
                    <h1>Dados do Cliente</h1>
                    <label>Nome:</label>
                    <span>João da Silva</span>

                    <label>Nome Social:</label>
                    <span>Joana da Silva</span>

                    <label>Data de Nascimento:</label>
                    <span>10/05/1990</span>

                    <label>CEP:</label>
                    <span>12345-678</span>

                    <label>Rua:</label>
                    <span>Rua das Flores, 123</span>

                    <label>Bairro:</label>
                    <span>Centro</span>

                    <label>Cidade:</label>
                    <span>São Paulo</span>

                    <label>Estado:</label>
                    <span>São Paulo</span>

                    <label>País:</label>
                    <span>Brasil</span>

                    <label>Código Postal:</label>
                    <span>123456</span>

                    <label>CPF:</label>
                    <span>123.456.789-00</span>

                    <label>RG:</label>
                    <span>12.345.678-9</span>

                    <label>Data de Emissão do RG:</label>
                    <span>05/03/2010</span>

                    <label>Passaporte:</label>
                    <span>AB123456</span>

                    <label>Telefone:</label>
                    <span>(11) 1234-5678</span>

                    <label>Tipo:</label>
                    <span>Pessoa Física</span>

                    <div className="btns">
                        <Button className="add add-color" variant="outline-dark" type="button">Voltar</Button>
                        <Button className="add add-color" variant="outline-dark" type="button">Dependentes</Button>
                    </div>
                </div>
            </main>
        </section>
    );
}

export default Cliente;