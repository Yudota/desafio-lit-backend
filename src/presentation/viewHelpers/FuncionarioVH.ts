import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import IViewHelper from "./IViewHelper";
import { Request } from "express";
import Funcionario from "../../models/Funcionario";
import Cargo from "../../models/Cargo";

type typeIdFuncionario = number
export class FuncionarioVH implements IViewHelper {
  constructor() {
  }
  getEntidade(req: Request) {
    const idFuncionario: typeIdFuncionario = req.query.idFuncionario || req.body.idFuncionario
    console.log('ID recebido: ', idFuncionario)
    const {
      nome,
      email,
      cpf,
      senha,
      data_contratacao,
      matricula,
      cargo
    }: Funcionario = req.body;
    const c = new Cargo(cargo?.nome || 'N/A', cargo?.id)

    const funcionario = new Funcionario({
      id: Number(idFuncionario),
      nome,
      email,
      cpf,
      senha,
      cargo: c,
      data_contratacao,
      matricula
    })

    return funcionario;
  }
  setEntidadeToJSON(ed: AbsEntidadeDominio) {
    const response = JSON.stringify({ ...ed });

    return response
  }
}
