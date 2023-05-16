import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorDependente from "../../impressores/ImpressorDependente";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemTitularDependente extends Processo {
  private clientes: Cliente[];
  private impressor!: Impressor;
  constructor() {
    super();
    this.clientes = Armazem.InstanciaUnica.Clientes;
  }
  processar(): void {
    console.clear();
    let cpfDependente = this.entrada.receberTexto(`Digite o CPF do dependente: `);
    console.log("Iniciando a listagem de dependentes por titular...");
    this.clientes.map((clienteMap) => {
        clienteMap.Dependentes.forEach((dependentes) => {
            dependentes.Documentos.filter((docFilter) => {
                if (docFilter.Numero === cpfDependente) {
                    this.impressor = new ImpressaorCliente(clienteMap)
                    console.log(this.impressor.imprimir())
                }
            })
        })
    })
  }
}