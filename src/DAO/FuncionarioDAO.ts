import Funcionario from "../models/Funcionario";
import AbstractDAO from "./AbstractDAO";

export default class FuncionarioDAO extends AbstractDAO {
  criar(entidade: Funcionario): Promise<any> {
    throw new Error("Method  criar not implemented.");
  }
  alterar(entidade: Funcionario): Promise<any> {
    throw new Error("Method alterar not implemented.");
  }
  excluir(id: number): Promise<any> {
    throw new Error("Method excluir not implemented.");
  }
  consultar(entidade?: Partial<Funcionario>): Promise<any> {
    throw new Error("Method consultar not implemented.");
  }



}
