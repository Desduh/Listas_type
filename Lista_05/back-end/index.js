const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');

const client = new cassandra.Client({
  cloud: { secureConnectBundle: "./secure-connect-bety.zip" },
  credentials: { username: "LehuIxmQfOfhSeFcxrMDvZYg", password: "Put2MmK58kSsA_ZSCxWEZ-GLCp,C3obkZ4yAUOKWyXlnDfpGd7DmhpmFRfHZ8T+c.ZMl+NlFFDBKpujQ3lEh3Ppi-x-AqkyPF.5v.ZbBCCeON63QIol1ieHxU,5f9I21" },
  keyspace: 'atlantis'
});

async function criarTabelaClientes() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.clientes (id uuid PRIMARY KEY, nome text, nome_social text, nascimento date, cpf text, passaporte text);";
  return client.execute(query);
}

async function criarTabelaClienteDependente() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.cliente_dependente (id uuid PRIMARY KEY, id_cliente uuid, id_dependente uuid);";
  return client.execute(query);
}

async function criarIndiceIdClienteDependente() {
  const query = "CREATE INDEX IF NOT EXISTS id_depen_cli ON atlantis.cliente_dependente (id_cliente);";
  return client.execute(query);
}

async function criarIndiceClienteIdDependente() {
  const query = "CREATE INDEX IF NOT EXISTS id_cli_depen ON atlantis.cliente_dependente (id_dependente);";
  return client.execute(query);
}

async function criarTabelaTelefones() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.telefones (id uuid PRIMARY KEY, ddd text, numero text);";
  return client.execute(query);
}

async function criarTabelaClienteTelefone() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.cliente_telefone (id uuid PRIMARY KEY, id_cliente uuid, id_telefone uuid);";
  return client.execute(query);
}

async function criarIndiceIdClienteTelefone() {
  const query = "CREATE INDEX IF NOT EXISTS id_cliente_cli_tell ON atlantis.cliente_telefone (id_cliente);";
  return client.execute(query);
}

async function criarIndiceClienteIdTelefone() {
  const query = "CREATE INDEX IF NOT EXISTS id_tell_cli_tell ON atlantis.cliente_telefone (id_telefone);";
  return client.execute(query);
}

async function criarTabelaRgs() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.rgs (id uuid PRIMARY KEY, numero text, emissao date);";
  return client.execute(query);
}

async function criarTabelaClienteRg() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.cliente_rg (id uuid PRIMARY KEY, id_cliente uuid, id_rg uuid);";
  return client.execute(query);
}

async function criarIndiceIdClienteRg() {
  const query = "CREATE INDEX IF NOT EXISTS id_cliente_cli_rg ON atlantis.cliente_rg (id_cliente);";
  return client.execute(query);
}

async function criarIndiceClienteIdRg() {
  const query = "CREATE INDEX IF NOT EXISTS id_rg_cli_rg ON atlantis.cliente_rg (id_rg);";
  return client.execute(query);
}
const id = uuidv4();
async function inserirUsuario(nome, nomeSocial, nascimento, cpf, passaporte, rgs, telefones, dependentes) {
  // const id = uuidv4();

  const queryInserirCliente = 'INSERT INTO atlantis.clientes (id, nome, nome_social, nascimento, cpf, passaporte) VALUES (?, ?, ?, ?, ?, ?)';
  const parametrosCliente = [id, nome, nomeSocial, nascimento, cpf, passaporte];
  await client.execute(queryInserirCliente, parametrosCliente, { prepare: true });

  for (const rg of rgs) {
    const rgId = uuidv4();
    const queryInserirRg = 'INSERT INTO atlantis.rgs (id, numero, emissao) VALUES (?, ?, ?)';
    const parametrosRg = [rgId, rg.numero, rg.emissao];
    await client.execute(queryInserirRg, parametrosRg, { prepare: true });

    const queryInserirClienteRg = 'INSERT INTO atlantis.cliente_rg (id, id_cliente, id_rg) VALUES (?, ?, ?)';
    const parametrosClienteRg = [uuidv4(), id, rgId];
    await client.execute(queryInserirClienteRg, parametrosClienteRg, { prepare: true });
  }

  for (const telefone of telefones) {
    const telefoneId = uuidv4();
    const queryInserirTelefone = 'INSERT INTO atlantis.telefones (id, ddd, numero) VALUES (?, ?, ?)';
    const parametrosTelefone = [telefoneId, telefone.ddd, telefone.numero];
    await client.execute(queryInserirTelefone, parametrosTelefone, { prepare: true });

    const queryInserirClienteTelefone = 'INSERT INTO atlantis.cliente_telefone (id, id_cliente, id_telefone) VALUES (?, ?, ?)';
    const parametrosClienteTelefone = [uuidv4(), id, telefoneId];
    await client.execute(queryInserirClienteTelefone, parametrosClienteTelefone, { prepare: true });
  }

  for (const dependente of dependentes) {
    const dependenteId = uuidv4();
    const queryInserirDependente = 'INSERT INTO atlantis.clientes (id, nome, nome_social, nascimento, cpf, passaporte) VALUES (?, ?, ?, ?, ?, ?)';
    const parametrosDependente = [dependenteId, dependente.nome, dependente.nomeSocial, dependente.nascimento, dependente.cpf, dependente.passaporte];
    await client.execute(queryInserirDependente, parametrosDependente, { prepare: true });

    const queryInserirClienteDependente = 'INSERT INTO atlantis.cliente_dependente (id, id_cliente, id_dependente) VALUES (?, ?, ?)';
    const parametrosClienteDependente = [uuidv4(), id, dependenteId];
    await client.execute(queryInserirClienteDependente, parametrosClienteDependente, { prepare: true });
  }
}

async function selecionarRg(id) {
  const querySelecionarRg = `
  SELECT
    numero, 
    emissao
  FROM
    atlantis.rgs
  WHERE
    id = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarRg, parametros, { prepare: true });
  return resultado;
}

async function selecionarClienteRg(id) {
  const querySelecionarClienteRg = `
  SELECT
    id_rg
  FROM
    atlantis.cliente_rg
  WHERE
    id_cliente = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarClienteRg, parametros, { prepare: true });
  return resultado;
}

async function selecionarTelefone(id) {
  const querySelecionarTelefone = `
  SELECT
    ddd,
    numero
  FROM
    atlantis.telefones
  WHERE
    id = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarTelefone, parametros, { prepare: true });
  return resultado;
}

async function selecionarClienteTelefone(id) {
  const querySelecionarClienteTelefone = `
  SELECT
    id_telefone
  FROM
    atlantis.cliente_telefone
  WHERE
    id_cliente = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarClienteTelefone, parametros, { prepare: true });
  return resultado;
}

async function selecionarDependente(id) {
  const querySelecionarDependente = `
  SELECT
    nome,
    nome_social,
    nascimento,
    cpf,
    passaporte
  FROM
    atlantis.clientes
  WHERE
    id = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarDependente, parametros, { prepare: true });
  return resultado;
}

async function selecionarClienteDependente(id) {
  const querySelecionarClienteDependente = `
  SELECT
    id_dependente
  FROM
    atlantis.cliente_dependente
  WHERE
    id_cliente = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarClienteDependente, parametros, { prepare: true });
  return resultado;
}


async function selectCliente(id) {
  const querySelecionarCliente = `
  SELECT
    nome,
    nome_social,
    nascimento,
    cpf,
    passaporte
  FROM
    atlantis.clientes
  WHERE
    id = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarCliente, parametros, { prepare: true });
  return resultado;
}

// funções para o front
async function clienteCompleto(id) {
  const usuario = {};
  const resultadoUsuario = await selectCliente(id);
  if (resultadoUsuario && resultadoUsuario.first()) {
    const usuarioOld = resultadoUsuario.first();
    usuario.nome = usuarioOld.nome;
    usuario.nome_social = usuarioOld.nome_social;
    usuario.nascimento = usuarioOld.nascimento.toString();
    usuario.cpf = usuarioOld.cpf;
    usuario.passaporte = usuarioOld.passaporte;

    const [resultadoIdRgs, resultadoIdTelefones, resultadoIdDependentes] = await Promise.all([
      selecionarClienteRg(id),
      selecionarClienteTelefone(id),
      selecionarClienteDependente(id)
    ]);

    if (resultadoIdRgs && resultadoIdRgs.rowLength > 0) {
      const rgsArray = await Promise.all(resultadoIdRgs.rows.map(async (row) => {
        const idRg = row.id_rg;
        const resultadoRg = await selecionarRg(idRg);
        return resultadoRg.first();
      }));
      usuario.rgs = rgsArray.map((rg) => ({ numero: rg.numero, emissao: rg.emissao.toString() }));
    }

    if (resultadoIdTelefones && resultadoIdTelefones.rowLength > 0) {
      const telefonesArray = await Promise.all(resultadoIdTelefones.rows.map(async (row) => {
        const idTelefone = row.id_telefone;
        const resultadoTelefone = await selecionarTelefone(idTelefone);
        return resultadoTelefone.first();
      }));
      usuario.telefones = telefonesArray.map((telefone) => ({ ddd: telefone.ddd, numero: telefone.numero }));
    }

    if (resultadoIdDependentes && resultadoIdDependentes.rowLength > 0) {
      const dependentesArray = await Promise.all(resultadoIdDependentes.rows.map(async (row) => {
        const idDependente = row.id_dependente;
        const resultadoDependente = await selecionarDependente(idDependente);
        return resultadoDependente.first();
      }));
      usuario.dependentes = dependentesArray.map((dependente) => ({
        nome: dependente.nome,
        nome_social: dependente.nome_social,
        nascimento: dependente.nascimento.toString(),
        cpf: dependente.cpf,
        passaporte: dependente.passaporte
      }));
    }
  }
  return usuario;
}



async function exemplo() {
  await client.connect();
  await criarTabelaClientes();
  await criarTabelaClienteDependente();
  await criarIndiceIdClienteDependente();
  await criarIndiceClienteIdDependente();
  await criarTabelaTelefones();
  await criarTabelaClienteTelefone();
  await criarIndiceIdClienteTelefone();
  await criarIndiceClienteIdTelefone();
  await criarTabelaRgs();
  await criarTabelaClienteRg();
  await criarIndiceIdClienteRg();
  await criarIndiceClienteIdRg();

  // Exemplo de inserção de um usuário
  const usuario = {
    nome: 'John Doe',
    nomeSocial: 'Jane Doe',
    nascimento: '1990-01-01',
    cpf: '123456789',
    passaporte: 'ABC123',
    rgs: [
      { numero: '987654321', emissao: '2020-01-01' },
      { numero: '567890123', emissao: '2021-01-01' }
    ],
    telefones: [
      { ddd: '11', numero: '999999999' },
      { ddd: '22', numero: '888888888' }
    ],
    dependentes:[
      {   
        nome: 'Daniela',
        nomeSocial: 'Dani',
        nascimento: '1990-01-01',
        cpf: '123456789',
        passaporte: 'ABdf123'
      }
    ]
  };

  await inserirUsuario(usuario.nome, usuario.nomeSocial, usuario.nascimento, usuario.cpf, usuario.passaporte, usuario.rgs, usuario.telefones, usuario.dependentes);


  console.log(await clienteCompleto(id));

  await client.shutdown();
}





const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('O aplicativo está sendo executado na porta 3000!');
});