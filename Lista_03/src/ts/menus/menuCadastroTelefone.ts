import Menu from "../interfaces/menu";

export default class MenuCadastroTelefone implements Menu {
  mostrar(): void {
    console.clear();
    console.log(`****************************`);
    console.log(`| 1 - Cadastrar novo telefone`);
    console.log(`| 0 - Proximo`);
  }
}
