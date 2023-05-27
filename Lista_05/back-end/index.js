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
async function inserirUsuario(nome, nomeSocial, nascimento, cpf, passaporte, rgs, telefones) {
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
  var usuario = {}
  const resultadoUsuario = await selectCliente(id);
  if (resultadoUsuario && resultadoUsuario.first()) {
    const usuarioOld = resultadoUsuario.first();
    usuario = {
      nome: usuarioOld.nome, 
      nome_social: usuarioOld.nome_social, 
      nascimento: usuarioOld.nascimento.toString(), 
      cpf: usuarioOld.cpf, 
      passaporte: usuarioOld.passaporte
    }
    const resultadoIdRgs = await selecionarClienteRg(id);
    if (resultadoIdRgs && resultadoIdRgs.rowLength > 0) {
      const rgsArray = [];
      for (const row of resultadoIdRgs.rows) {
        const idRg = row.id_rg;
        const resultadoRg = await selecionarRg(idRg);
        rgsArray.push(resultadoRg.first());
      }
      usuario.rgs = rgsArray.map(rg => ({ numero: rg.numero, emissao: rg.emissao.toString()  }))
    } 

    const resultadoIdTelefones = await selecionarClienteTelefone(id);
    if (resultadoIdTelefones && resultadoIdTelefones.rowLength > 0) {
      const telefonesArray = [];
      for (const row of resultadoIdTelefones.rows) {
        const idTelefone = row.id_telefone;
        const resultadoTelefone = await selecionarTelefone(idTelefone);
        telefonesArray.push(resultadoTelefone.first());
      }
      usuario.telefones = telefonesArray.map(telefone => ({ ddd: telefone.ddd, numero: telefone.numero }))
    }
  }
  return usuario
}


async function exemplo() {
  await client.connect();
  await criarTabelaClientes();
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
    ]
  };

  await inserirUsuario(usuario.nome, usuario.nomeSocial, usuario.nascimento, usuario.cpf, usuario.passaporte, usuario.rgs, usuario.telefones);


  console.log(await clienteCompleto(id));

  await client.shutdown();
}

exemplo();
