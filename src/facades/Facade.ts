import { TYPE_COMMAND } from "../commands/types/typeCommand";
import AbstractDAO from "../DAO/AbstractDAO";
import FuncionarioDAO from "../DAO/FuncionarioDAO";
import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import IStrategy from "../strategy/IStrategy";
import ValidaExistenciaCargo from "../strategy/ValidaExistenciaCargo";
import ValidaExistenciaFuncionario from "../strategy/ValidaExistenciaFuncionario";
import ValidarCpf from "../strategy/ValidarCpf";
import Result from "../utils/Result";
import IFacade from "./IFacade";
import { TYPE_MODEL } from "./types/typeModel";

type MapperStrategies = {
  [KEY in TYPE_COMMAND]: Array<IStrategy>
}
type MapperModelStrategy = {
  [KEY in TYPE_MODEL]: MapperStrategies;
};
type MapperModelDAO = {
  [KEY in TYPE_MODEL]: AbstractDAO;
}
export default class Facade implements IFacade {
  private daos: MapperModelDAO
  private regras: MapperModelStrategy
  constructor() {
    this.regras = {
      [TYPE_MODEL.FUNCIONARIO]: {
        [TYPE_COMMAND.CREATE]: [new ValidaExistenciaCargo(), new ValidarCpf()],
        [TYPE_COMMAND.READ]: [new ValidaExistenciaFuncionario()],
        [TYPE_COMMAND.UPDATE]: [new ValidaExistenciaCargo(), new ValidaExistenciaFuncionario(), new ValidarCpf()],
        [TYPE_COMMAND.PATCH]: [new ValidaExistenciaCargo(), new ValidaExistenciaFuncionario(), new ValidarCpf()],
        [TYPE_COMMAND.DELETE]: [new ValidaExistenciaFuncionario()],
      },

    }
    this.daos = {
      [TYPE_MODEL.FUNCIONARIO]: new FuncionarioDAO()
    }
  }
  async criar(entidade: AbsEntidadeDominio) {
    console.log(entidade, TYPE_COMMAND.CREATE);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    const regras = this.regras[className][TYPE_COMMAND.CREATE];

    let result: Result = new Result('');

    for (const estrategia of regras) {
      const { mensagem, erro, data } = await estrategia.processar(entidade);
      result.mensagem += mensagem + '/n';
      result.erro += erro;
      result.data.push(...data);
      if (result.erro) {
        break;
      }
    }
    if (!result.erro) {
      result = await dao.criar(entidade)
    }
    return result


  }
  async consultar(entidade: Partial<AbsEntidadeDominio>) {
    console.log('consultando entidade');

    console.log(entidade, TYPE_COMMAND.READ);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    const regras = this.regras[className][TYPE_COMMAND.READ];


    let result: Result = new Result('');

    for (const estrategia of regras) {
      const { mensagem, erro, data } = await estrategia.processar(entidade);
      result.mensagem += mensagem + '/n';
      result.erro += erro;
      result.data.push(...data);
      if (result.erro) {
        break;
      }
    }
    if (!result.erro) {
      result = await dao.consultar(entidade)
    }
    return result


  }
  async deletar(entidade: AbsEntidadeDominio) {
    console.log(entidade, TYPE_COMMAND.DELETE);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    const regras = this.regras[className][TYPE_COMMAND.DELETE];

    let result: Result = new Result('');

    for (const estrategia of regras) {
      const { mensagem, erro, data } = await estrategia.processar(entidade);
      result.mensagem += mensagem + '/n';
      result.erro += erro;
      result.data.push(...data);
      if (result.erro) {
        break;
      }
    }
    if (!result.erro) {
      result = await dao.excluir(entidade.id)
    }
    return result


  }
  async atualizar(entidade: Partial<AbsEntidadeDominio>) {
    console.log(entidade, TYPE_COMMAND.UPDATE);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    const regras = this.regras[className][TYPE_COMMAND.READ];

    let result: Result = new Result('');

    for (const estrategia of regras) {
      const { mensagem, erro, data } = await estrategia.processar(entidade);
      result.mensagem += mensagem + '/n';
      result.erro += erro;
      result.data.push(...data);
      if (result.erro) {
        break;
      }
    }
    if (!result.erro) {
      result = await dao.excluir(entidade.id)
    }
    return result

  }
}
