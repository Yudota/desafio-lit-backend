import Cargo from "../models/Cargo";
import AbstractDAO from "./AbstractDAO";

export default class CargoDAO extends AbstractDAO {
  criar(entidade: Cargo): Promise<any> {
    throw new Error("Method  criar not implemented.");
  }
  alterar(entidade: Cargo): Promise<any> {
    throw new Error("Method alterar not implemented.");
  }
  excluir(id: number): Promise<any> {
    throw new Error("Method excluir not implemented.");
  }
  consultar(entidade?: Partial<Cargo>): Promise<any> {
    throw new Error("Method consultar not implemented.");
  }



}
