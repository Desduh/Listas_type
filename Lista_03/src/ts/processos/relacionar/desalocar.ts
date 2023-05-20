import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";

export default class DesalocarCliente extends Processo{
    private cliente: Cliente[];
    constructor() {
      super();
      this.cliente = Armazem.InstanciaUnica.Clientes;
      this.execucao = true;
    }
    processar(): void {
        console.clear();
        console.log("Desalocar um cliente de uma acomodação...");
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
                let clienteCPF = this.entrada.receberTexto("Forneça o CPF do cliente que deseja desalocar: ");
                this.cliente.forEach((clientesForEach) => {
                    clientesForEach.Documentos.filter((docFilter) => {
                        if (docFilter.Numero === clienteCPF) {
                            clientesForEach.Acomodacao = undefined
                            console.log('Finalizando desalocação de cliente...')
                        } else {
                            console.log("CPF não encontrado");
                        }
                    })
                })
                this.execucao = false;
            }
        }
    }
}