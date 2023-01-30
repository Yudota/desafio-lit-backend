import { funcionarios } from ".prisma/client";
import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import Funcionario from "../models/Funcionario";
import Result from "../utils/Result";
import AbstractDAO from "./AbstractDAO";


export default class FuncionarioDAO extends AbstractDAO {
  mapping = {
    fun_id: "id",
    fun_car_id: 'car_id',
    fun_cpf: 'cpf',
    fun_data_contratacao: 'data_contratacao',
    fun_email: 'email',
    fun_matricula: 'matricula',
    fun_nome: 'nome',
    fun_isActive: 'isActive',
    fun_senha: 'senha',
    fun_data_criacao: 'data_criacao',
  };
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
    if (!Number.isNaN(id)) {
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
      console.log('ta aq');
      super.id = entidade.id
      try {
        const result = await AbstractDAO.getPrismaClient().funcionarios.findUnique({
          where: { fun_id: entidade.id },
        })
        const data: Funcionario = {} as Funcionario
        Object.keys(result).forEach(key => {
          console.log('key: ' + result[key]);
          if (this.mapping[key]) data[this.mapping[key]] = result[key];
        });
        console.log('resultado:', result)
        return this.result = { mensagem: 'Resultado encontrado', data } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
    else {
      try {
        const listFuncionarios = await AbstractDAO.getPrismaClient().funcionarios.findMany()
        const listCargos = await AbstractDAO.getPrismaClient().cargos.findMany()
        console.log('listCargos', listCargos)
        const data: any[] = [];
        console.log('antes do foreach do result');

        listFuncionarios.forEach(funcionario => {
          const formatedFuncionarios: any = {};
          console.log('antes do foreach Object.keys');

          Object.keys(funcionario).forEach(async (key) => {
            console.log('dentro do forEach das keys', this.mapping[key]);

            if (this.mapping[key]) formatedFuncionarios[this.mapping[key]] = funcionario[key];
            if (this.mapping[key] === 'car_id') formatedFuncionarios['cargo'] = listCargos.filter(cargo => cargo.car_id === funcionario.fun_car_id)
          });
          console.log('dentro do forEach do result');
          delete formatedFuncionarios.car_id
          formatedFuncionarios.cargo = formatedFuncionarios.cargo[0]
          data.push(formatedFuncionarios);
        });
        console.log('retornando', data);

        return this.result = { mensagem: 'Resultado encontrado', data } as unknown as Result
      } catch (error) {
        console.log('ERRO::', error)
        return this.result
      }
    }
  }
}
