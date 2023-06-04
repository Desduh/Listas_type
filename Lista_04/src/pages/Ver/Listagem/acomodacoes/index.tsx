import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import NavBar_ from '../../../../component/barraNavegacao';
import '../../Listagem/styles.css';
import { FiTrash } from "react-icons/fi";

function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState([]);

  useEffect(() => {
  }, []);

  const handleDelete = (id: string) => {
  };

  return (
    <section>
      <header>
        <NavBar_ />
      </header>
      <main>
        <div className='text'>
          <h1 className="titles"> <strong> Acomodações </strong> </h1>
        </div>
        <div className="tables">
        <Table striped bordered hover variant="light">
            <thead className="titles-table">
              <tr>
                <th>Nome</th>
                <th>Cama de solteiro</th>
                <th>Cama de casal</th>
                <th>Climatização</th>
                <th>Garagem</th>
                <th>Suíte</th>
                <th>Apagar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Solteiro Simples</td>
                <td>1</td>
                <td>0</td>
                <td>Não</td>
                <td>0</td>
                <td>14124</td>
                <td>
                  <Button
                    className="cps"
                    id="transparente"
                    onClick={() => handleDelete("1")}
                  >
                    <FiTrash color='red' size={23}/>
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Casal Luxo</td>
                <td>0</td>
                <td>1</td>
                <td>Sim</td>
                <td>1</td>
                <td>13457</td>
                <td>
                  <Button
                    className="cps"
                    id="transparente"
                    onClick={() => handleDelete("2")}
                  >
                    <FiTrash color='red' size={23}/>
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Família</td>
                <td>2</td>
                <td>1</td>
                <td>Sim</td>
                <td>2</td>
                <td>15982</td>
                <td>
                  <Button
                    className="cps"
                    id="transparente"
                    onClick={() => handleDelete("3")}
                  >
                    <FiTrash color='red' size={23}/>
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

export default Acomodacoes;
