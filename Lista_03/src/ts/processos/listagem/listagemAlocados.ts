import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";

export default class ListagemAlocados extends Processo{
    private cliente: Cliente[];
    constructor() {
      super();
      this.cliente = Armazem.InstanciaUnica.Clientes;
      this.execucao = true;
    }
    processar(): void {
        console.clear();
        console.log("Listagem dos clientes alocados...");
        while (this.execucao) {
            var chave = false
            this.cliente.forEach((clientesForEach) => {
                if (clientesForEach.Acomodacao !== undefined) {
                    clientesForEach.Documentos.filter((docFilter) => {
                        if (docFilter.Tipo === TipoDocumento.CPF) {
                            if (clientesForEach.Acomodacao !== undefined) {
                                chave = true
                            }
                        }
                    });
                }
            });
            if (this.cliente.length == 0) {
                console.log("Não há clientes :(" );
                this.execucao = false;
            } else if (!chave) {
                console.log("Não há clientes alocados :(" );
                this.execucao = false;
            }else if (chave){
                console.log("Clientes alocados:");
                this.cliente.forEach((clientesForEach) => {
                    if (clientesForEach.Acomodacao !== undefined) {
                        clientesForEach.Documentos.filter((docFilter) => {
                            if (docFilter.Tipo === TipoDocumento.CPF) {
                                if (clientesForEach.Acomodacao !== undefined) {
                                    console.log(`Nome: ${clientesForEach.Nome}, CPF: ${docFilter.Numero}, Acomodação: ${clientesForEach.Acomodacao.NomeAcomadacao} `);                                
                                }
                            }
                            });
                    }
                });
                this.execucao = false;
            }
        }
    }
}