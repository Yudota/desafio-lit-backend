import { PrismaClient } from "@prisma/client";
import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import Result from "../utils/Result";
import ConnectionFactory from "./ConnectionFactory";
import IDAO from "./IDAO";

export default abstract class AbstractDAO implements IDAO {
  private static con: PrismaClient;
  result: Result
  id: number | undefined;
  constructor() {
    this.result = new Result('');

  }
  public static getPrismaClient(): PrismaClient {
    if (!AbstractDAO.con) {
      AbstractDAO.con = ConnectionFactory.make()
    }
    return AbstractDAO.con
  }
  abstract criar(entidade: AbsEntidadeDominio): Promise<Result>
  abstract alterar(entidade: AbsEntidadeDominio): Promise<Result>
  abstract excluir(id: number): Promise<Result>
  abstract consultar(entidade?: Partial<AbsEntidadeDominio>): Promise<Result>

}