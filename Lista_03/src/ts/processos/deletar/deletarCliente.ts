import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";


export default class DeletarCliente extends Processo {
  private cliente: Cliente[];
  constructor() {
    super();
    this.cliente = Armazem.InstanciaUnica.Clientes;
    this.execucao = true;
  }
  processar(): void {
    while (this.execucao) {
      if (this.cliente.length == 0) {
        console.log("Não há clientes :(" );
        this.execucao = false;
      } else {
        this.cliente.forEach((clientesForEach) => {
          clientesForEach.Documentos.filter((docFilter) => {
            if (docFilter.Tipo === TipoDocumento.CPF) {
                console.log(`Nome: ${clientesForEach.Nome}\n CPF: ${docFilter.Numero} `);
            }
          });
        });
        this.cliente.forEach((clientesForEach) => {
          clientesForEach.Documentos.forEach((docsForEach) => {
            let numeroCpf = this.entrada.receberTexto("Digite o CPF do cliente a ser excluido: ");
            if (
              numeroCpf === docsForEach.Numero &&
              TipoDocumento.CPF === docsForEach.Tipo
            ) {
              let index = this.cliente.indexOf(clientesForEach);
              this.cliente.splice(index, 1);
              this.execucao = false;
              console.log("Cliente excluido com sucesso :)");
              this.execucao = false;
            } else {
              console.log("Comando não compreendido :(");
              this.execucao = false;
            }
          });
        });
      }
    }
  }
}