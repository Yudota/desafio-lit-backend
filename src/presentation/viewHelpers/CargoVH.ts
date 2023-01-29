import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import Cargo from "../../models/Cargo";
import IViewHelper from "./IViewHelper";


interface ICargoRequest {
  idCargo?: number;
  nomeCargo: string;
}
export default class CargoVH implements IViewHelper {
  constructor() {
  }
  getEntidade(req: Request) {
    const { idCargo } = req.query || req.body
    const { nomeCargo }: ICargoRequest = req.body
    console.log('ID recebido: ', idCargo)
    const cargo = new Cargo(nomeCargo || 'N/A', idCargo)

    return cargo;
  }
  setEntidadeToJSON(ed: AbsEntidadeDominio) {
    const response = JSON.stringify({ ...ed });

    return response
  }

}