import { Button } from 'react-bootstrap';
import NavBar_ from '../../../component/barraNavegacao'
import '../styles.css'
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Axios from "axios";
import { GrFormAdd } from "react-icons/gr";

function CadastrarClientes() {
    const [nome, setNome] = useState('');
    const [nome_social, setNomeSocial] = useState('');
    const [data_nasc, setData_nasc] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [cpf, setCpf] = useState('');
    const [passaporte, setPassaporte] = useState('');

    const [dependentes, setDependentes] = useState([{}]);
    const [rgs, setRgs] = useState([{}]);
    const [telefones, setTelefones] = useState([{}]);

    useEffect(() => {
      if (localStorage.getItem("cliente") !== null) {
        const cliente = JSON.parse(localStorage.getItem("cliente"));
        setNome(cliente.nome);
        setNomeSocial(cliente.nomeSocial);
        setData_nasc(cliente.nascimento);
        setCpf(cliente.cpf);
        setPassaporte(cliente.passaporte);
        setRgs(cliente.rgs);
        setTelefones(cliente.telefones);
        setCep(cliente.cep);
        setRua(cliente.rua);
        setBairro(cliente.bairro);
        setNumero(cliente.numero);
        setCidade(cliente.cidade);
        setEstado(cliente.estado);
        setPais(cliente.pais);
        setDependentes(cliente.dependentes)
        var endereco = cliente.endereco
        setCep(endereco.cep)
        setNumero(endereco.numero)
        setRua(endereco.locadouro)
        setCidade(endereco.cidade)
        setEstado(endereco.estado)
        setPais(endereco.pais) 
        setBairro(endereco.bairro) 
        localStorage.removeItem("cliente")
      }
    }, []);
    
  
    let addFormRg = () => {
      setRgs([...rgs, {}])
    }
    
    let addFormTelefone = () => {
      setTelefones([...telefones, {}])
    }    

    function handleSubmit(e) {
      e.preventDefault();
      
      const clienteData = {
        nome: nome,
        nomeSocial: nome_social,
        nascimento: data_nasc,
        cpf: cpf,
        passaporte: passaporte,
        rgs: rgs.map((rg) => ({ numero: rg.numero, emissao: rg.emissao })),
        telefones: telefones.map((telefone) => ({ ddd: telefone.ddd, numero: telefone.numero })),
        dependentes: dependentes,
        endereco: {
          cep: cep,
          numero: numero,
          locadouro: rua, 
          cidade: cidade, 
          estado: estado, 
          pais: pais, 
          bairro: bairro
        }
      };
    }

    function addDependentes(){
      const clienteData = {
        nome: nome,
        nomeSocial: nome_social,
        nascimento: data_nasc,
        cpf: cpf,
        passaporte: passaporte,
        rgs: rgs.map((rg) => ({ numero: rg.numero, emissao: rg.emissao })),
        telefones: telefones.map((telefone) => ({ ddd: telefone.ddd, numero: telefone.numero })),
        dependentes: dependentes,
        endereco: {
          cep: cep,
          numero: numero,
          locadouro: rua, 
          cidade: cidade, 
          estado: estado, 
          pais: pais, 
          bairro: bairro
        }
      };

      localStorage.setItem("cliente", JSON.stringify(clienteData))

      window.location.href = '/cadastrar/dependentes'
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
              <input placeholder='Insira o nome completo' type="text" value={nome} onChange={(e) => setNome(e.target.value)} required/>
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Nome social:</label>
                <input placeholder='Insira o nome social' type="text" value={nome_social} onChange={(e) => setNomeSocial(e.target.value)} required/>
              </div>
              <div className="field direita">
                <label>Nascimento:</label>
                <input type="date" value={data_nasc} onChange={(e) => setData_nasc(e.target.value)} required/>
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
                  required
                />
              </div>
            ))}

            <div className="btns">
              <a
                id='add'
                type="button"
                onClick={() => addFormTelefone()}
              >
                Telefone<GrFormAdd color='black' size={23}/> 
              </a>
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                  <label>CPF:</label>
                  <input type="text" placeholder='XXX.XXX.XXX-XX' value={cpf} onChange={(e) => setCpf(e.target.value)} required/>
              </div>
              <div className="field direita">
                  <label>Passaporte:</label>
                  <input type="text" placeholder='XXX.XXX.XXX-XX' value={passaporte} onChange={(e) => setPassaporte(e.target.value)} required/>
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
                    required
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
                    required
                  />
                </div>
              </div>
            ))}

            <div className="btns">
              <a
                id='add'
                type="button"
                onClick={() => addFormRg()}
              >
                RG<GrFormAdd color='black' size={23}/> 
              </a>
            </div>

            <div className="field ">
                <label>CEP:</label>
                <input type="text" placeholder='XXXXX-XXX' value={cep} onChange={(e) => setCep(e.target.value)} onBlur={buscarEndereco} required/>
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Locadouro:</label>
                <input placeholder='Insira o nome do locadouro' type="text" value={rua} onChange={(e) => setRua(e.target.value)} required/>
              </div>
              <div className="field direita">
                <label>Número:</label>
                <input placeholder='Número' type="text" value={numero} onChange={(e) => setNumero(e.target.value)} required/>
              </div>
            </div>

            <div className="field">
              <label>Bairro:</label>
              <input placeholder='Insira o nome do bairro' type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} required/>
            </div>

            <div className="field">
              <label>Cidade:</label>
              <input placeholder='Insira o nome da cidade' type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} required/>
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Estado:</label>
                <input placeholder='Insira o nome do estado' type="text" value={estado} onChange={(e) => setEstado(e.target.value)} required/>
              </div>
              <div className="field direita">
                <label>País:</label>
                <input placeholder='Insira o nome do país' type="text" value={pais} onChange={(e) => setPais(e.target.value)} required/>
              </div>
            </div>

            <div className="btns">
              <a id='add' type='button' onClick={() => addDependentes()}>Dependentes<GrFormAdd color='black' size={23}/></a>
            </div>

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
