import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Acomodacao from "../../modelos/acomodacao";
import Cliente from "../../modelos/cliente";

export default class AlocarCliente extends Processo{
    private cliente: Cliente[];
    private acomodacoes: Acomodacao[]
    constructor() {
      super();
      this.cliente = Armazem.InstanciaUnica.Clientes;
      this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
      this.execucao = true;
    }
    processar(): void {
        console.clear();
        console.log("Alocar um cliente em uma acomodação...");
        while (this.execucao) {
            if (this.cliente.length == 0) {
                console.log("Não há clientes :(" );
                this.execucao = false;
            } else {
                console.log("Clientes:");
                this.cliente.forEach((clientesForEach) => {
                    clientesForEach.Documentos.filter((docFilter) => {
                    if (docFilter.Tipo === TipoDocumento.CPF) {
                        console.log(`Nome: ${clientesForEach.Nome}, CPF: ${docFilter.Numero} `);
                    }
                    });
                });
                let clienteCPF = this.entrada.receberTexto("Forneça o CPF do cliente que deseja alocar: ");
                this.cliente.forEach((clientesForEach) => {
                    clientesForEach.Documentos.filter((docFilter) => {
                        if (docFilter.Numero === clienteCPF) {
                            console.log(`Escolha a acomodação para ${clientesForEach.Nome}: `);
                            console.log(`| 1 - Acomodação simples para solteiro(a)`);
                            console.log(`| 2 - Acomodação simples para casal`);
                            console.log(`| 3 - Acomodação para família com até duas crianças`);
                            console.log(`| 4 - Acomodação para família com até cinco crianças`);
                            console.log(`| 5 - Acomodação com garagem para solteiro(a)`);
                            console.log(`| 6 - Acomodação para até duas familias, casal e três crianças cada`);
                            console.log(`| 0 - Para Sair`);
                            console.log(`----------------------`);
                            this.opcao = this.entrada.receberNumero("Opção:");
                            switch (this.opcao) {
                            case 1:
                                clientesForEach.Acomodacao = this.acomodacoes[0]
                                break;
                            case 2:
                                clientesForEach.Acomodacao = this.acomodacoes[1]
                                break;
                            case 3:
                                clientesForEach.Acomodacao = this.acomodacoes[2]
                                break;
                            case 4:
                                clientesForEach.Acomodacao = this.acomodacoes[3]
                                break;
                            case 5:
                                clientesForEach.Acomodacao = this.acomodacoes[4]
                                break;
                            case 6:
                                clientesForEach.Acomodacao = this.acomodacoes[5]
                                break;
                            }
                            console.log('Finalizando alocação de cliente...')
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