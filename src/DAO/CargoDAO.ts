import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import Cargo from "../models/Cargo";
import Result from "../utils/Result";
import AbstractDAO from "./AbstractDAO";

export default class CargoDAO extends AbstractDAO {
  alterar(entidade: AbsEntidadeDominio): Promise<Result> {
    throw new Error("Method not implemented.");
  }
  excluir(id: number): Promise<Result> {
    throw new Error("Method not implemented.");
  }
  async criar(entidade: Cargo): Promise<any> {
    const { nome } = entidade
    try {
      const result = await AbstractDAO.getPrismaClient().cargos.create({
        data: {
          car_nome: nome
        },
      })
      return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
    } catch (error) {
      console.log('ERRO::', error)
      return this.result
    }
  }
  async consultar(entidade?: Partial<Cargo>): Promise<any> {
    if (!Number.isNaN(entidade.id)) {
      super.id = entidade.id
      try {
        const result = await AbstractDAO.getPrismaClient().cargos.findUnique({
          where: { car_id: entidade.id },
        })
        return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
    else {
      console.log('Consultando todos os cargos');
      try {
        const result = await AbstractDAO.getPrismaClient().cargos.findMany()
        return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
  }



}
