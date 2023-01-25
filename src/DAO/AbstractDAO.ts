import { PrismaClient } from "@prisma/client";
import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import ConnectionFactory from "./ConnectionFactory";
import IDAO from "./IDAO";

export default abstract class AbstractDAO implements IDAO {
  private static con: PrismaClient;
  result: any
  constructor() {
    this.result = new Object('');

  }
  public static getPrismaClient(): PrismaClient {
    if (!AbstractDAO.con) {
      AbstractDAO.con = ConnectionFactory.make()
    }
    return AbstractDAO.con
  }
  abstract criar(entidade: AbsEntidadeDominio): Promise<any>
  abstract alterar(entidade: AbsEntidadeDominio): Promise<any>
  abstract excluir(id: number): Promise<any>
  abstract consultar(entidade?: Partial<AbsEntidadeDominio>): Promise<any>

}