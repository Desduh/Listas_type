import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class cadastroPassaporte extends Processo{
    private cliente: Cliente
    constructor(cliete: Cliente){
        super()
        this.cliente = cliete
    }
    processar(): void {
        let numero = this.entrada.receberTexto('Numero do Passaporte: ')
        let passaporte = new Documento(numero, TipoDocumento.Passaporte, new Date("00-00-0000"))
        this.cliente.Documentos.push(passaporte)        
    }
}