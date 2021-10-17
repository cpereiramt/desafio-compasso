const objectId = require("mongodb").ObjectId;

const listaClientes = async () => {
  const listaClientes = await global.crud.clienteCrud.getClientes();
  if (listaClientes.length === 0) {
    return { message: "Nenhum cliente encontrado !", status: 404 };
  } else {
    return { listaClientes, status: 200 };
  }
};

const getClientesByName = async (nome) => {
  const clienteEncontrado = await global.crud.clienteCrud.getClientesByName(
    nome
  );
  console.log(clienteEncontrado, "cliente");
  if (clienteEncontrado.length === 0) {
    return { message: "Cliente não encontrado !", status: 404 };
  } else {
    return { clienteEncontrado, status: 200 };
  }
};

const getClientesById = async (id) => {
  // objectId.isValid(id);
  if (!objectId.isValid(id)) {
    return {
      message: "Id inválido, por favor insira um id no formato ObjectID!",
      status: 400,
    };
  }
  const clienteEncontrado = await global.crud.clienteCrud.getClienteById(id);

  if (clienteEncontrado.length === 0) {
    return { message: "Cliente não encontrado !", status: 404 };
  } else {
    return { clienteEncontrado, status: 200 };
  }
};

const inserirCliente = async (cliente) => {
  console.log(cliente, "cliente");
  if (!cliente.nomeCompleto) {
    return { message: "Nome não pode ser nulo !", status: 400 };
  }
  if (!cliente.sexo) {
    return { message: "Sexo não pode ser nulo !", status: 400 };
  }
  if (!cliente.dataNascimento) {
    return { message: "Data de nascimento não pode ser nulo !", status: 400 };
  }
  if (!cliente.idade) {
    return { message: "Idade não pode ser nulo !", status: 400 };
  }
  if (!cliente.cidade) {
    return { message: "Cidade não pode ser nulo !", status: 400 };
  }
  const clienteEncontrado = await global.crud.clienteCrud.getClientesByName(
    cliente.nomeCompleto
  );
  if (clienteEncontrado) {
    return { message: "Cliente já cadastrado !", status: 400 };
  }

  const clienteInserido = await global.clienteCrud.addClientes("clientes");
  return { message: "cliente inserido com sucesso !", status: 201 };
};

const alterarCliente = async (id, cliente) => {
  if (!cliente.nomeCompleto) {
    return { message: "Nome não pode ser nulo !", status: 400 };
  }
  if (!cliente.sexo) {
    return { message: "Sexo não pode ser nulo !", status: 400 };
  }
  if (!cliente.dataNascimento) {
    return {
      message: "Data de nascimento não pode ser nulo !",
      status: 400,
    };
  }
  if (!cliente.idade) {
    return { message: "Idade não pode ser nulo !", status: 400 };
  }
  if (!cliente.cidade) {
    return { message: "Cidade não pode ser nulo !", status: 400 };
  }
  if (!objectId.isValid(id)) {
    return {
      message: "Id inválido, por favor insira um id no formato ObjectID!",
      status: 400,
    };
  }
  const ObjectId = new objectId(id);

  const clienteEncontrado = await global.crud.clienteCrud.getClienteById(id);

  if (!clienteEncontrado) {
    return { message: "Cliente não encontrado !", status: 404 };
  } else {
    const clienteAlterado = await global.conn
      .collection("clientes")
      .updateOne({ _id: ObjectId }, { $set: cliente });
    return { message: "cliente alterado com sucesso !", status: 200 };
  }
};

const apagarCliente = async (id) => {
  if (!objectId.isValid(id)) {
    return {
      message: "Id inválido, por favor insira um id no formato ObjectID!",
      status: 400,
    };
  }
  const ObjectId = new objectId(id);
  const clienteEncontrado = global.crud.clienteCrud.getClienteById(id);

  if (clienteEncontrado.length === 0) {
    return { message: "Cliente não encontrado !", status: 404 };
  } else {
    const clienteApagado = await global.conn
      .collection("clientes")
      .deleteOne({ _id: ObjectId });
    return { message: "cliente apagado com sucesso !", status: 200 };
  }
};

module.exports = {
  listaClientes,
  getClientesByName,
  getClientesById,
  inserirCliente,
  alterarCliente,
  apagarCliente,
};
