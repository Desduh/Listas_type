import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import TipoCadastroCliente from "./cadastro/tipoCadastroCliente"
import DeletarCliente from "./deletar/deletarCliente"
import TipoEditarClientes from "./editar/tipoEditarClientes"
import ListagemAcomodacoes from "./listagem/listagemAcomodacoes"
import ListagemAlocados from "./listagem/listagemAlocados"
import TipoListagemClientes from "./listagem/tipoListagemClientes"
import AlocarCliente from "./relacionar/alocar"
import DesalocarCliente from "./relacionar/desalocar"

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new TipoEditarClientes();
                this.processo.processar();
                break
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 4:
                this.processo = new DeletarCliente()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break
            case 6:
                this.processo = new ListagemAlocados()
                this.processo.processar()
                break
            case 7:
                this.processo = new AlocarCliente()
                this.processo.processar()
                break
            case 8: 
                this.processo = new DesalocarCliente()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}