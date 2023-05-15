import Processo from "../../abstracoes/processo";
import MenuEditarClientes from "../../menus/menuEditarClientes";
import EditarClientes from "./editarClientes";
import EditarDependente from "./editarDependente";

export default class TipoEditarClientes extends Processo {
  constructor() {
    super();
    this.menu = new MenuEditarClientes();
  }
  processar(): void {
    this.menu.mostrar();
    this.opcao = this.entrada.receberNumero("Qual opção desejada?");

    switch (this.opcao) {
      case 1:
        this.processo = new EditarClientes();
        this.processo.processar();
        break;
      case 2:
        this.processo = new EditarDependente();
        this.processo.processar();
        break;
      default:
        console.log("Opção não entendida :(");
    }
  }
}
