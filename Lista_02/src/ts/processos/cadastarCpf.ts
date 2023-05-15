import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroCpf extends Processo{
    private cliente: Cliente
    constructor(cliete: Cliente){
        super()
        this.cliente = cliete
    }
    processar(): void {
        let numero = this.entrada.receberTexto('Numero do CPF: ')
        let cpf = new Documento(numero, TipoDocumento.CPF, new Date("00-00-0000"))
        this.cliente.Documentos.push(cpf)        
    }
}