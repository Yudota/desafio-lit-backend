import Result from "../utils/Result";
import IStrategy from "./IStrategy";
import axios from "axios"
import CargoDAO from "../DAO/CargoDAO";
import FuncionarioDAO from "../DAO/FuncionarioDAO";
import Funcionario from "../models/Funcionario";
import Cargo from "../models/Cargo";

export default class ValidaExistencia implements IStrategy {
  async processar(entidade: Funcionario): Promise<Result> {
    console.log('validando existencia');


    const result = new Result('');
    const daoCargo = new CargoDAO();
    const daoFuncionario = new FuncionarioDAO();

    const cargoResult = (await daoCargo.consultar(entidade.cargo).then(result => result.data as unknown as Cargo))
    console.log('cargoResult', cargoResult);

    if (!cargoResult.id) {
      result.mensagem = "Cargo não encontrado."
      result.erro = 1
      return result
    }
    const funcionarioResult = (await daoFuncionario.consultar(entidade).then(result => result.data as unknown as Funcionario))

    if (!funcionarioResult.id) {
      result.mensagem = "Funcionário não existe."
      result.erro = 1
      return result
    }
    result.mensagem = "Funcionário e cargo encontrados"
    return result
  }
}
