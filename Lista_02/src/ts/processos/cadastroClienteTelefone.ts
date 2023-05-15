import Processo from "../abstracoes/processo";
import MenuCadastroTelefone from "../menus/menuCadastroTelefone";
import Cliente from "../modelos/cliente";
import CadastroTelefone from "./cadastroTelefone";

export default class CadastroClienteTelefone extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.menu = new MenuCadastroTelefone();
    this.cliente = cliente;
    this.execucao = true;
  }

  processar(): void {
    console.log(`Iniciando o cadastro de telefones...`);
    while (this.execucao) {
      this.menu.mostrar();
      this.opcao = this.entrada.receberNumero("Qual opção desejada?");
      switch (this.opcao) {
        case 1:
          this.processo = new CadastroTelefone(this.cliente);
          this.processo.processar();
          break;
        case 0:
          this.execucao = false;
          break;
      }
    }
  }
}
