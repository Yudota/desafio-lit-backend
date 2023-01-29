import Result from "../../utils/Result";
import IStrategy from "../IStrategy";
import FuncionarioDAO from "../../DAO/FuncionarioDAO";
import Funcionario from "../../models/Funcionario";

export default class ValidaExistenciaFuncionario implements IStrategy {
  async processar(entidade: Funcionario): Promise<Result> {


    const result = new Result('');
    const daoFuncionario = new FuncionarioDAO();

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
