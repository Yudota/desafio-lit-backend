import Result from "../utils/Result";
import IStrategy from "./IStrategy";
import CargoDAO from "../DAO/CargoDAO";
import Funcionario from "../models/Funcionario";
import Cargo from "../models/Cargo";

export default class ValidaExistenciaCargo implements IStrategy {
  async processar(entidade: Funcionario): Promise<Result> {
    console.log('validando existencia');


    const result = new Result('');
    const daoCargo = new CargoDAO();

    const cargoResult = (await daoCargo.consultar(entidade.cargo).then(result => result.data as unknown as Cargo))
    console.log('cargoResult', cargoResult);

    if (!cargoResult.id) {
      result.mensagem = "Cargo não encontrado."
      result.erro = 1
      return result
    }
    return result
  }
}
