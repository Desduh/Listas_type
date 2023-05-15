import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";

export default class CadastroTelefone extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar(): void {
    let numerotell = this.entrada.receberNumeroTelefone("Cadastro telefone");
    this.cliente.Telefones.push(numerotell);
    console.log("Salvando...");
  }
}