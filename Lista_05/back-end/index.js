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

async function inserirUsuario(nome, nomeSocial, nascimento, cpf, passaporte, rgs) {
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

async function selecionarUsuario(id) {
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

async function atualizarUsuario(id, idade) {
  const queryAtualizar = 'UPDATE atlantis.clientes SET idade = ? WHERE id = ?';
  return client.execute(queryAtualizar, [idade, id], { prepare: true });
}

async function deletarUsuario(id) {
  const queryRemover = 'DELETE FROM atlantis.clientes WHERE id = ?';
  const parametros = [id];
  return client.execute(queryRemover, parametros, { prepare: true });
}

async function exemplo() {
  await client.connect();
  await criarTabelaClientes();
  await criarTabelaRgs();
  await criarTabelaClienteRg();
  await criarIndiceIdClienteRg();
  await criarIndiceClienteIdRg();

  const rgs = [
    { numero: 'RG123', emissao: '2022-01-01' },
    { numero: 'RG456', emissao: '2023-02-02' }
  ];

  await inserirUsuario('Jones', 'Bob', '1990-01-01', '123456789', 'ABCD1234', rgs);

  const resultadoUsuario = await selecionarUsuario(id);
  if (resultadoUsuario && resultadoUsuario.first()) {
    const usuario = resultadoUsuario.first();
    console.log("Nome: %s, Nome Social: %s, Nascimento: %s, CPF: %s, Passaporte: %s", usuario.nome, usuario.nome_social, usuario.nascimento, usuario.cpf, usuario.passaporte);
    const resultadoIdRgs = await selecionarClienteRg(id);
    if (resultadoIdRgs && resultadoIdRgs.rowLength > 0) {
      const rgsArray = [];
      for (const row of resultadoIdRgs.rows) {
        const idRg = row.id_rg;
        const resultadoRg = await selecionarRg(idRg);
        rgsArray.push(resultadoRg.first());
      }
      console.log("RGs:");
      console.log(rgsArray.map(rg => ({ numero: rg.numero, emissao: rg.emissao.date })));
    } else {
      console.log("Nenhum resultado encontrado");
    }
  } else {
    console.log("Nenhum resultado encontrado");
  }

  await client.shutdown();
}

exemplo();

