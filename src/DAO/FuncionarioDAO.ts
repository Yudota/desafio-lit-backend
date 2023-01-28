import Funcionario from "../models/Funcionario";
import Result from "../utils/Result";
import AbstractDAO from "./AbstractDAO";

export default class FuncionarioDAO extends AbstractDAO {
  async criar(entidade: Funcionario): Promise<any> {
    const { cargo, cpf, data_contratacao, email, matricula, nome, senha } = entidade


    try {
      const result = await AbstractDAO.getPrismaClient().funcionarios.create({
        data: {
          fun_car_id: cargo.id,
          fun_cpf: cpf,
          fun_data_contratacao: data_contratacao,
          fun_email: email,
          fun_matricula: matricula,
          fun_nome: nome,
          fun_isActive: true,
          fun_senha: senha,
          fun_data_criacao: new Date().toISOString()

        },
      })
      return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
    } catch (error) {
      console.log('ERRO::', error)
      return this.result
    }
  }
  async alterar(entidade: Partial<Funcionario>): Promise<any> {
    let newObj: any

    if (!Number.isInteger(entidade.id)) {
      let oldData = {}
      try {
        oldData = await AbstractDAO.getPrismaClient().funcionarios.findUnique({
          where: { fun_id: entidade.id }
        });
        const notUpdatableFields = new Set(["fun_data_criacao"]);
        newObj = { ...oldData };

        Object.entries(entidade)
          .filter(([key, value]) => !notUpdatableFields.has(key) && oldData[key] !== value)
          .forEach(([key, value]) => {
            newObj[key] = value;
          });
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
      try {
        const result = await AbstractDAO.getPrismaClient().funcionarios.update({
          where: { fun_id: entidade.id },
          data: newObj
        })
        return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
    else {
      return this.result = { mensagem: 'Identificação inválida', data: {} } as unknown as Result
    }
  }
  async excluir(id: number): Promise<any> {
    if (!Number.isInteger(id)) {
      try {
        const result = await AbstractDAO.getPrismaClient().funcionarios.update({
          where: { fun_id: id },
          data: {
            fun_isActive: false,
          }
        })
        return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
    else {
      return this.result = { mensagem: 'Identificação inválida', data: {} } as unknown as Result
    }
  }
  async consultar(entidade?: Partial<Funcionario>): Promise<any> {
    if (!Number.isNaN(entidade.id)) {
      super.id = entidade.id
      try {
        const result = await AbstractDAO.getPrismaClient().funcionarios.findUnique({
          where: { fun_id: entidade.id },
        })
        return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
    else {

      console.log('passou aqui');
      try {
        const result = await AbstractDAO.getPrismaClient().funcionarios.findMany()
        return this.result = { mensagem: 'sucesso', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }


  }
}
