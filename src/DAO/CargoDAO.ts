import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import Cargo from "../models/Cargo";
import Result from "../utils/Result";
import AbstractDAO from "./AbstractDAO";

export default class CargoDAO extends AbstractDAO {
  mapping = {
    car_id: 'id',
    car_nome: 'nome',
  };
  alterar(entidade: AbsEntidadeDominio): Promise<Result> {
    return Promise.reject(new Result('Method not implemented', 1, []))
  }
  excluir(id: number): Promise<Result> {
    return Promise.reject(new Result('Method not implemented', 1, []))
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
      Promise.reject(new Result('Erro', 1, error.message))
    }
  }
  async consultar(entidade?: Partial<Cargo>): Promise<any> {
    console.log('Consultando cargo');

    if (!Number.isNaN(entidade.id)) {
      console.log('id recebido', entidade.id);

      super.id = entidade.id
      try {
        const result = await AbstractDAO.getPrismaClient().cargos.findUnique({
          where: { car_id: entidade.id },
        })

        const data: Cargo = {} as Cargo
        Object.keys(result).forEach(key => {
          console.log('key: ' + data[key]);

          if (this.mapping[key]) data[this.mapping[key]] = result[key];
        });
        console.log('resultado', data);
        return this.result = { mensagem: 'sucesso', data } as unknown as Result
      } catch (error) {
        Promise.reject(new Result('Erro', 1, error.message))
      }
    }
    else {
      console.log('Consultando todos os cargos');
      try {
        const result = await AbstractDAO.getPrismaClient().cargos.findMany()
        const data: Cargo[] = [];

        result.forEach(item => {
          const cargo: Cargo = {} as Cargo;
          Object.keys(item).forEach((key) => {
            if (this.mapping[key]) cargo[this.mapping[key]] = item[key];
          });
          data.push(cargo);
        });
        return this.result = { mensagem: 'sucesso', data } as unknown as Result
      } catch (error) {
        Promise.reject(new Result('Erro', 1, error.message))
      }
    }
  }
}
