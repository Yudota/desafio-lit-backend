import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import Cargo from "../../models/Cargo";
import Result from "../../utils/Result";
import IStrategy from "../IStrategy";

export default class ValidaNomeCargo implements IStrategy {
  processar(entidade: Cargo): Promise<Result> {
    const result = new Result('');
    if (entidade.nome && typeof entidade.nome === "string" && entidade.nome.trim().length > 0) {
      return Promise.resolve(result)
    } else {
      result.erro++
      result.mensagem = 'Valor para o nome do cargo é inválido'
      return Promise.reject(result)
    }

  }

}