import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import MenuEditarDependente from "../../menus/menuEditarDependente";
import Cliente from "../../modelos/cliente";
import EditarDocumento from "./editarDocumento";
import EditarNascimento from "./editarNascimento";
import EditarNome from "./editarNome";
import EditarNomeSocial from "./editarNomeSocial";


export default class EditarDependente extends Processo {
  private clientes: Cliente[];
  constructor() {
    super();
    this.execucao = true;
    this.menu = new MenuEditarDependente();
    this.clientes = Armazem.InstanciaUnica.Clientes;
  }
  processar(): void {
    console.clear();
    let titular = this.entrada.receberTexto(
      `Digite o CPF do titular:`
    );
    console.log("Dependentes:");
    this.clientes.map((clienteMap) => {
      clienteMap.Documentos.filter((docFilter) => {
        if (docFilter.Numero === titular && docFilter.Tipo === TipoDocumento.CPF) {
          clienteMap.Dependentes.forEach((dependentesForEach) => {
            dependentesForEach.Documentos.forEach(
              (documentoDependenteForEach) => {
                console.log(`Nome: ${dependentesForEach.Nome}, CPF: ${documentoDependenteForEach.Numero}`);
              }
            );
            dependentesForEach.Documentos.filter((dependenteFilter) => {
              let entradaDoCpf = this.entrada.receberTexto(
                "Digite o CPF do dependente"
              );
              if (
                dependenteFilter.Numero === entradaDoCpf &&
                dependenteFilter.Tipo === TipoDocumento.CPF
              ) {
                while (this.execucao) {
                  this.menu.mostrar();
                  console.log(
                    `Cliente Nome:'${dependentesForEach.Nome}'\nCliente Cpf:'${dependenteFilter.Numero}'`
                  );
                  this.opcao = this.entrada.receberNumero(
                    `Digite a opção desejada: `
                  );
                  switch (this.opcao) {
                    case 1:
                      this.processo = new EditarNome(dependentesForEach);
                      this.processo.processar();
                      break;
                    case 2:
                      this.processo = new EditarNomeSocial(dependentesForEach);
                      this.processo.processar();
                      break;
                    case 3:
                      this.processo = new EditarNascimento(
                        dependentesForEach
                      );
                      this.processo.processar();
                      break;
                    case 4:
                      this.processo = new EditarDocumento(dependentesForEach);
                      this.processo.processar();
                      break;
                    case 0:
                      this.execucao = false;
                      console.log("Até logo!");
                      console.clear();
                      break;
                    default:
                      console.log("Opção não entendida :(");
                  }
                }
              }
            });
          });
        }
      });
    });
  }
}
