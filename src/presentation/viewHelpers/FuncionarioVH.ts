import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import IViewHelper from "./IViewHelper";
import { Request } from "express";
import Funcionario from "../../models/Funcionario";
import Cargo from "../../models/Cargo";

export class FuncionarioVH implements IViewHelper {
  constructor() {
  }
  getEntidade(req: Request) {
    const {
      idFuncionario,
      nome,
      email,
      cpf,
      senha,
      data_contratacao,
      matricula,
      cargo
    } = req.body;
    const c = new Cargo(cargo?.nomeCargo || 'invalido', cargo?.idCargo)

    const funcionario = new Funcionario({
      id: idFuncionario,
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
