import Result from "../../utils/Result";
import IStrategy from "../IStrategy";
import { validate } from "gerador-validador-cpf"
import Funcionario from "../../models/Funcionario";

export default class ValidarCpf implements IStrategy {
    processar(entidade: Funcionario): Promise<Result> {
        let cpf = entidade.cpf!
        const result = new Result('')
        if (!validate(cpf)) {
            result.mensagem = "Cpf inválido"
            result.erro = 1
            return Promise.resolve(result)
        }
        result.mensagem = "CPF validado com sucesso"
        return Promise.resolve(result)
    }
}
