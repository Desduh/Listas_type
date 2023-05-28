const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');

const client = new cassandra.Client({
  cloud: { secureConnectBundle: "./secure-connect-bety.zip" },
  credentials: { username: "LehuIxmQfOfhSeFcxrMDvZYg", password: "Put2MmK58kSsA_ZSCxWEZ-GLCp,C3obkZ4yAUOKWyXlnDfpGd7DmhpmFRfHZ8T+c.ZMl+NlFFDBKpujQ3lEh3Ppi-x-AqkyPF.5v.ZbBCCeON63QIol1ieHxU,5f9I21" },
  keyspace: 'atlantis'
});

async function criarTabelaClientes() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.clientes (id uuid PRIMARY KEY, nome text, nome_social text, nascimento date, cpf text, passaporte text, titular boolean);";
  return client.execute(query);
}

async function criarTabelaEndereco() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.endereco (id uuid PRIMARY KEY, id_cliente uuid, cep text, numero text, locadouro text, cidade text, estado text, pais text, bairro text);";
  return client.execute(query);
}

async function criarIndiceEnderecoCliente() {
  const query = "CREATE INDEX IF NOT EXISTS id_endereco_cli ON atlantis.endereco (id_cliente);";
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
async function inserirUsuario(nome, nomeSocial, nascimento, cpf, passaporte, rgs, telefones, dependentes, endereco) {
  // const id = uuidv4();

  const queryInserirCliente = 'INSERT INTO atlantis.clientes (id, nome, nome_social, nascimento, cpf, passaporte, titular) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const parametrosCliente = [id, nome, nomeSocial, nascimento, cpf, passaporte, true];
  await client.execute(queryInserirCliente, parametrosCliente, { prepare: true });

  const enderecoId = uuidv4();
  const queryInserirEndereco = 'INSERT INTO atlantis.endereco (id, id_cliente, cep, numero, locadouro, cidade, estado, pais, bairro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const parametrosEndereco = [enderecoId, id, endereco.cep, endereco.numero, endereco.locadouro, endereco.cidade, endereco.estado, endereco.pais, endereco.bairro];
  await client.execute(queryInserirEndereco, parametrosEndereco, { prepare: true });  

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
    const queryInserirDependente = 'INSERT INTO atlantis.clientes (id, nome, nome_social, nascimento, cpf, passaporte, titular) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const parametrosDependente = [dependenteId, dependente.nome, dependente.nomeSocial, dependente.nascimento, dependente.cpf, dependente.passaporte, false];
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

async function selecionarEndereco(id) {
  const querySelecionarEndereco = `
  SELECT
    *
  FROM
    atlantis.endereco
  WHERE
    id_cliente = ?
  `;

  const parametros = [id];
  const resultado = await client.execute(querySelecionarEndereco, parametros, { prepare: true });
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
    passaporte,
    titular
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
      if (dependentesArray[0] != null) {
        usuario.dependentes = dependentesArray.map((dependente) => ({
          nome: dependente.nome,
          nome_social: dependente.nome_social,
          nascimento: dependente.nascimento.toString(),
          cpf: dependente.cpf,
          passaporte: dependente.passaporte
        }));
      }
    }

    const resultadoEndereco = await selecionarEndereco(id);
    if (resultadoEndereco && resultadoEndereco.rowLength > 0) {
      const endereco = resultadoEndereco.first();
      usuario.endereco = {
        locadouro: endereco.locadouro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        pais: endereco.pais,
        bairro: endereco.bairro,
        numero: endereco.numero,
        cep: endereco.cep
      };
    }
  }
  return usuario;
}

async function main() {
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
  await criarTabelaEndereco();
  await criarIndiceEnderecoCliente();
  console.log("tudo ok");
}
main();




const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); 
app.use(cors());
app.use(express.urlencoded({ extended: false })); 

app.post('/adicionar/cliente', async (req, res) => {
  try {
    const usuario = req.body;
    await inserirUsuario(usuario.nome, usuario.nomeSocial, usuario.nascimento, usuario.cpf, usuario.passaporte, usuario.rgs, usuario.telefones, usuario.dependentes, usuario.endereco);
    res.status(200).send('Cliente inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir o cliente:', error);
    res.status(500).send('Ocorreu um erro ao inserir o cliente.');
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const query = 'SELECT * FROM atlantis.clientes';
    const resultado = await client.execute(query);
    const clientes = resultado.rows;

    res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao obter os clientes:', error);
    res.status(500).send('Ocorreu um erro ao obter os clientes.');
  }
});

app.get('/cliente', async (req, res) => {
  try {
    const id = req.body.id; 
    const cliente = await clienteCompleto(id);

    if (Object.keys(cliente).length === 0) {
      res.status(404).send('Cliente não encontrado.');
    } else {
      res.status(200).json(cliente);
    }
  } catch (error) {
    console.error('Erro ao obter o cliente:', error);
    res.status(500).send('Ocorreu um erro ao obter o cliente.');
  }
});

app.delete('/deletar/cliente', async (req, res) => {
  try {
    const id = req.body.id;

    const clienteExistente = await selectCliente(id);
    if (!clienteExistente.first()) {
      res.status(404).send('Cliente não encontrado.');
      return;
    }

    // Excluir os registros de rgs relacionados ao cliente
    const queryIdClienteRg = 'SELECT id_rg FROM atlantis.cliente_rg WHERE id_cliente = ?';
    const idClienteRgResult = await client.execute(queryIdClienteRg, [id], { prepare: true });
    const idsRg = idClienteRgResult.rows.map(row => row.id_rg);

    for (const idRg of idsRg) {
      const queryExcluirClienteRgReferencia = 'DELETE FROM atlantis.cliente_rg WHERE id = ?';
      await client.execute(queryExcluirClienteRgReferencia, [idRg], { prepare: true });

      const queryExcluirRg = 'DELETE FROM atlantis.rgs WHERE id = ?';
      await client.execute(queryExcluirRg, [idRg], { prepare: true });
    }

    const queryIdClienteTelefone = 'SELECT id_telefone FROM atlantis.cliente_telefone WHERE id_cliente = ?';
    const idClienteTelefoneResult = await client.execute(queryIdClienteTelefone, [id], { prepare: true });
    const idsTelefone = idClienteTelefoneResult.rows.map(row => row.id_telefone);

    for (const idTelefone of idsTelefone) {
      const queryExcluirClienteTelefoneReferencia = 'DELETE FROM atlantis.cliente_telefone WHERE id = ?';
      await client.execute(queryExcluirClienteTelefoneReferencia, [idTelefone], { prepare: true });

      const queryExcluirTelefone = 'DELETE FROM atlantis.telefones WHERE id = ?';
      await client.execute(queryExcluirTelefone, [idTelefone], { prepare: true });
    }

    // Excluir os registros de dependentes relacionados ao cliente
    const queryIdClienteDependente = 'SELECT id_dependente FROM atlantis.cliente_dependente WHERE id_cliente = ?';
    const idClienteDependenteResult = await client.execute(queryIdClienteDependente, [id], { prepare: true });
    const idsDependente = idClienteDependenteResult.rows.map(row => row.id_dependente);

    for (const idDependente of idsDependente) {
      // Excluir a referência do cliente para o dependente
      const queryExcluirClienteDependenteReferencia = 'DELETE FROM atlantis.cliente_dependente WHERE id = ?';
      await client.execute(queryExcluirClienteDependenteReferencia, [idDependente], { prepare: true });

      // Excluir o registro de dependente
      const queryExcluirDependente = 'DELETE FROM atlantis.clientes WHERE id = ?';
      await client.execute(queryExcluirDependente, [idDependente], { prepare: true });
    }

    const queryExcluirDependente = 'DELETE FROM atlantis.clientes WHERE id = ?';
    await client.execute(queryExcluirDependente, [id], { prepare: true });

    res.status(200).send('Cliente excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir o cliente:', error);
    res.status(500).send('Ocorreu um erro ao excluir o cliente.');
  }
});

app.listen(3001, () => {
  console.log('O aplicativo está sendo executado na porta 3000!');
});