import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/barraNavegacao';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import Axios from "axios";

function AdcServicos() {
    const navigate = useNavigate();
    var { id } = useParams();

    const [pessoas, setPessoas] = useState([]);
    useEffect(() => {
      Axios.get(`http://localhost:3001/ver/clientes`).then((resp) => {
        setPessoas(resp.data);
      });
    }, [])

    var Nome = new String
    for(let k=0; pessoas.length > k; ++k){
        var pessoa = pessoas[k]
        if(pessoa[0] == id){
            Nome = pessoa
            break 
        }  
    }

    const [list, setList] = useState([]);
    
    useEffect(() => {
      Axios.get(`http://localhost:3001/ver/servicos`).then((resp) => {
        setList(resp.data);
      });
    }, [])

    function handleSubmit(id_item: number) {     
        Axios.post("http://localhost:3001/adicionar", {
          item: id_item,
          id: id,
          relacao: 'servico'
        }).then((res)=>{
          console.log(res)
        })    
    }

    const [relacoes, setRelacoes] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/relacao/servicos`).then((resp) => {
          setRelacoes(resp.data);
        });
    }, [])

    var valorTotal = 0 
    var rel = new Array
    for(var k=0; relacoes.length  > k; ++k){
        if(relacoes[k][1] == id){
            for(var w=0; list.length > w; ++w){
                if(relacoes[k][0] == list[w][0]){
                    var valor = relacoes[k][2] * list[w][2]
                    rel.push([list[w][1], relacoes[k][2], valor])
                    valorTotal = valorTotal+valor
                }
            }
        }
    }

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1 className="titles">  <strong> Sacola de contratações de: {Nome[1]} </strong></h1>
                <h2 className="titles"> Total gasto: R$ {valorTotal}</h2>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead className="titles-table">
                            <tr>
                                <th>Serviço</th>
                                <th>Quantia</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>
                        {typeof rel !== 'undefined' && rel.map((value) => {
                            return value ?
                        <tbody>
                            <tr>
                                <td> {value[0]} </td>
                                <td> {value[1]} </td>
                                <td> R$ {value[2]} </td>       
                            </tr>
                        </tbody>
                        :null})}
                    </Table>
                </div>
                <h1 className="titles">  <strong>Adicionar serviços à sacola:  </strong></h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead className="titles-table">
                            <tr>
                                <th>Serviço</th>
                                <th>Preço</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        {typeof list !== 'undefined' && list.map((value) => {
                            return value ?
                        <tbody>
                            <tr>
                                <td> {value[1]} </td>
                                <td> R$ {value[2]} </td>                
                                <td>
                                    <div>
                                        <a className="add-servico" href="" type='submit' onClick={() => handleSubmit(value[0])}>Adicionar ao cliente</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        :null})}
                    </Table>
                </div>
                    <Button className="submit submit-add" variant="outline" onClick={() => navigate(-1)}>Voltar</Button>{' '} 
            </main>
        </section>
    );
}

export default AdcServicos;