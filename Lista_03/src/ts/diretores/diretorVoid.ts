import Diretor from "../abstracoes/diretor";
import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Acomodacao from "../modelos/acomodacao";

export default class DiretorVoid extends Diretor<Acomodacao> {
  constructor() {
    super();
    this.construtor = new ConstrutorAcomodacao();
  }
  public construir(): Acomodacao {
    let objetoConstrutor = this.construtor as ConstrutorAcomodacao;
    return objetoConstrutor.construir();
  }
}
