import { funcionarios } from ".prisma/client";
import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
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
    try {
      // Verifica se o ID foi passado na entidade
      if (!entidade.id) {
        return this.result = { mensagem: 'Identificação inválida', data: {} } as unknown as Result
      }

      // Cria um objeto vazio do tipo funcionarios
      const dadosAtualizar: any = {};

      // Itera sobre as chaves do objeto entidade
      for (const chave in entidade) {
        // Verifica se a chave é diferente de "cargo"
        if (chave !== "cargo") {
          // Adiciona a chave com o prefixo "fun_" no objeto dadosAtualizar
          dadosAtualizar[`fun${chave}`] = entidade[chave];
        } else {
          // Se a chave for "cargo", adiciona a chave "fun_car_id" no objeto dadosAtualizar
          dadosAtualizar["fun_car_id"] = entidade.cargo.id;
        }
      }
      const { fun_cargo, ...rest } = dadosAtualizar;
      const { _id: fun_car_id } = fun_cargo;

      const transformedEntry = {
        fun_car_id,
        ...rest
      }
      for (const chave in transformedEntry) {
        if (transformedEntry[chave] === undefined || Number.isNaN(transformedEntry[chave])) {
          delete transformedEntry[chave]
        }
      }
      console.log('dados para mandar pro prisma:', transformedEntry);
      // Utiliza o Prisma para atualizar o funcionário
      const funcionarioAtualizado = await AbstractDAO.getPrismaClient().funcionarios.update({
        where: { fun_id: entidade.id },
        data: transformedEntry,
      });
      return this.result = { mensagem: 'sucesso', data: funcionarioAtualizado } as unknown as Result
    } catch (error) {
      console.error('Deu problema', error)
      return this.result = { mensagem: 'erro', data: error } as unknown as Result
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
    console.log('consultando');

    if (!Number.isNaN(entidade.id)) {
      super.id = entidade.id
      try {
        const result = await AbstractDAO.getPrismaClient().funcionarios.findUnique({
          where: { fun_id: entidade.id },
        })
        return this.result = { mensagem: 'Resultado encontrado', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
    else {

      try {
        const result = await AbstractDAO.getPrismaClient().funcionarios.findMany()
        return this.result = { mensagem: 'Resultado encontrado', data: result } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }


  }
}
