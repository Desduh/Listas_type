import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import NavBar_ from '../../../../component/barraNavegacao';
import '../../Listagem/styles.css';
import { FiEdit3, FiTrash } from "react-icons/fi";

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
}

function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function removerCliente(id: string) {
    axios
      .delete(`http://localhost:3001/deletar/cliente`, { data: { id } })
      .then(() => {
            axios
        .get('http://localhost:3001/clientes')
        .then(response => {
            setClientes(response.data);
        })
        .catch(error => {
            console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function verCliente(id: string) {
    localStorage.setItem("id_cliente", id);
    window.location.href = '/ver/cliente'
  }

  return (
    <section>
      <header>
        <NavBar_ />
      </header>
      <main>
        <div className="text">
          <h1 className="titles">
            <strong>Clientes</strong>
          </h1>
        </div>
        <div className="tables">
          {clientes.length > 0 ? (
            <Table striped bordered hover variant="light">
              <thead className="titles-table">
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Ver e Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>
                      <button className="cps" onClick={() => verCliente(cliente.id)}>
                        <FiEdit3 color='black' size={23}/>
                      </button>
                    </td>
                    <td>
                      <button className="cps" onClick={() => removerCliente(cliente.id)}>
                        <FiTrash color='red' size={23}/>
                      </button>
                    </td>
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
