import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import NavBar_ from '../../../../component/barraNavegacao';
import '../../Listagem/styles.css';

function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/acomodacoes')
      .then((response) => setAcomodacoes(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id: string) => {
    axios.delete('http://localhost:3001/deletar/acomodacao', { data: { id } })
      .then((response) => {
        axios.get('http://localhost:3001/acomodacoes')
        .then((response) => setAcomodacoes(response.data))
        .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

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
            <thead className="titles-table">
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
              {acomodacoes.map((acomodacao: any) => (
                <tr key={acomodacao.id}>
                  <td>{acomodacao.nome}</td>
                  <td>{acomodacao.cama_solteiro}</td>
                  <td>{acomodacao.cama_casal}</td>
                  <td>{acomodacao.climatizacao ? 'Sim' : 'Não'}</td>
                  <td>{acomodacao.garagem}</td>
                  <td>{acomodacao.suite}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(acomodacao.id)}
                    >
                      Apagar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>
    </section>
  );
}

export default Acomodacoes;
