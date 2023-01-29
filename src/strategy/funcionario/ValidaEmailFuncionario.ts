import Funcionario from "../../models/Funcionario";
import Result from "../../utils/Result";
import IStrategy from "../IStrategy";
import { isEmail } from 'validator'

export default class ValidaEmailFuncionario implements IStrategy {
  processar(entidade: Funcionario): Promise<Result> {
    if (!isEmail(entidade.email)) {
      return Promise.reject(new Result("Email inválido.", 1))
    }
    return Promise.resolve(new Result(''))
  }

}