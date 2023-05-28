import { Button } from 'react-bootstrap';
import NavBar_ from '../../../component/barraNavegacao'
import '../styles.css'
import React, { useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';

interface Rg {
  numero: string;
  emissao: string;
}

interface Telefone {
  ddd: string;
  numero: string;
}

function CadastrarClientes() {
    const [nome, setNome] = useState('');
    const [nome_social, setNomeSocial] = useState('');
    const [data_nasc, setData_nasc] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero,setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [postal, setPostal] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [data_rg, setDataRg] = useState('');
    const [passaporte, setPassaporte] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo,setTipo] = useState('');

    const [rgs, setRgs] = useState<Rg[]>([{ numero: '', emissao: '' }]);
    const [telefones, setTelefones] = useState<Telefone[]>([{ ddd: '', numero: '' }]);
  
    let addFormRg = () => {
      setRgs([...rgs, { numero: '', emissao: '' }])
    }
    
    let addFormTelefone = () => {
      setTelefones([...telefones, { ddd: '', numero: '' }])
    }
    
    function mandaTelefone() {
    }
  
    let clearAreas = () => {
      setNome('')
      setNomeSocial('')
      setData_nasc('')
      setPassaporte('')
      setRua('')
      setBairro('')
      setCidade('')
      setEstado('')
      setPais('')
      setPostal('')
      setTipo('')
      setCpf('')
      setRg('')
      setDataRg('')
    }
    function handleSubmit() {
      
      const clienteData = {
        nome: nome,
        nomeSocial: nome_social,
        nascimento: data_nasc,
        cpf: cpf,
        passaporte: passaporte,
        rgs: rgs.map((rg) => ({ numero: rg.numero, emissao: rg.emissao })),
        telefones: telefones.map((telefone) => ({ ddd: telefone.ddd, numero: telefone.numero })),
        dependentes: [
          {
            nome: "Daniela",
            nomeSocial: "Dani",
            nascimento: "1990-01-01",
            cpf: "123456789",
            passaporte: "ABdf123"
          },
          {
            nome: "Alfredo",
            nomeSocial: "Dani",
            nascimento: "1990-01-01",
            cpf: "123456789",
            passaporte: "ABdf123"
          }
        ]
      };

      console.log(clienteData);
      
    
      Axios.post("http://localhost:3001/adicionar/cliente", clienteData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    

  const buscarEndereco = async () => {
    try {
      const response = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf, pais: enderecoPais, cep: enderecoCep } = response.data;
  
      setRua(logradouro || '');
      setBairro(bairro || '');
      setCidade(localidade || '');
      setEstado(uf || '');
      setPais(enderecoPais || '');
      setPostal(enderecoCep || '');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao buscar o endereço. Verifique o CEP informado.');
    }
  };
    
  
  return (
    <section>
      <header>
        <NavBar_ />
      </header>
      <main>
        <div className='text'>
          <h1 className='margin-titulo'><strong>Cadastro de Clientes</strong></h1>
        </div>
        <div className="forms">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Nome Completo:</label>
              <input placeholder='Insira o nome completo' type="text" onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Nome social:</label>
                <input placeholder='Insira o nome social' type="text" onChange={(e) => setNomeSocial(e.target.value)} />
              </div>
              <div className="field direita">
                <label>Nascimento:</label>
                <input type="date" onChange={(e) => setData_nasc(e.target.value)} />
              </div>
            </div>

            {telefones.map((telefone, index) => (
              <div className="field" key={index}>
                <label>Telefone:</label>
                <input
                  placeholder='XX XXXXXXXX'
                  type="text"
                  value={telefone.numero}
                  onChange={(e) => {
                    const newTelefones = [...telefones];
                    newTelefones[index].numero = e.target.value;
                    setTelefones(newTelefones);
                  }}
                />
              </div>
            ))}

            <div className="btns">
              <Button
                className="add add-color"
                variant="outline-dark"
                type="button"
                onClick={() => addFormTelefone()}
              >
                Adicionar Telefone
              </Button>
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                  <label>CPF:</label>
                  <input type="text" placeholder='XXX.XXX.XXX-XX' onChange={(e) => setCpf(e.target.value)} />
              </div>
              <div className="field direita">
                  <label>Passaporte:</label>
                  <input type="text" placeholder='XXX.XXX.XXX-XX' onChange={(e) => setPassaporte(e.target.value)} />
              </div>
            </div>

            {rgs.map((rg, index) => (
              <div className="campo-duplo" key={index}>
                <div className="field esquerda">
                  <label>RG:</label>
                  <input
                    type="text"
                    placeholder='XX.XXX.XXX-X'
                    value={rg.numero}
                    onChange={(e) => {
                      const newRgs = [...rgs];
                      newRgs[index].numero = e.target.value;
                      setRgs(newRgs);
                    }}
                  />
                </div>
                <div className="field direita">
                  <label>RG data de emissão:</label>
                  <input
                    type="date"
                    value={rg.emissao}
                    onChange={(e) => {
                      const newRgs = [...rgs];
                      newRgs[index].emissao = e.target.value;
                      setRgs(newRgs);
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="btns">
              <Button
                className="add add-color"
                variant="outline-dark"
                type="button"
                onClick={() => addFormRg()}
              >
                Adicionar RG
              </Button>
            </div>

            <div className="field ">
                <label>CEP:</label>
                <input type="text" placeholder='XXXXX-XXX' value={cep} onChange={(e) => setCep(e.target.value)} onBlur={buscarEndereco} />
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Rua:</label>
                <input placeholder='Insira o nome da rua' type="text" value={rua} onChange={(e) => setRua(e.target.value)} />
              </div>
              <div className="field direita">
                <label>Número:</label>
                <input placeholder='Número' type="text" value={rua} onChange={(e) => setNumero(e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>Bairro:</label>
              <input placeholder='Insira o nome do bairro' type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
            </div>

            <div className="field">
              <label>Cidade:</label>
              <input placeholder='Insira o nome da cidade' type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Estado:</label>
                <input placeholder='Insira o nome do estado' type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
              </div>
              <div className="field direita">
                <label>País:</label>
                <input placeholder='Insira o nome do país' type="text" value={pais} onChange={(e) => setPais(e.target.value)} />
              </div>
            </div>

            {/* <div className="btns">
              <Button className="add add-green" variant="outline-dark" type='submit' onClick={handleSubmit}>Adicionar dependentes</Button>{' '}
            </div> */}

            <div className="btns">
              <Button className="add add-green" variant="outline-dark" type='submit'>Cadastrar</Button>{' '}
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}

export default CadastrarClientes;
