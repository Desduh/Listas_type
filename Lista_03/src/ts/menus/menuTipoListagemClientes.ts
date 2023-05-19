import Menu from "../interfaces/menu";

export default class MenuTipoListagemClientes implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`| Qual o tipo de listagem desejad? `)
        console.log(`----------------------`)
        console.log(`| 1 - Todos os titulares`)
        console.log(`| 2 - Todos os dependentes de um titular específico`)
        console.log(`| 3 - Titular de um dependente específico`)
        console.log(`----------------------`)
    }
}