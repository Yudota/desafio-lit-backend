import { Request, Response } from "express";
import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
export default interface IViewHelper {
    getEntidade: (req: Request) => AbsEntidadeDominio
    setEntidadeToJSON: (ed: AbsEntidadeDominio) => string
}