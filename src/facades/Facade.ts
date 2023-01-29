import { TYPE_COMMAND } from "../commands/types/typeCommand";
import AbstractDAO from "../DAO/AbstractDAO";
import CargoDAO from "../DAO/CargoDAO";
import FuncionarioDAO from "../DAO/FuncionarioDAO";
import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import ValidaNomeCargo from "../strategy/cargo/ValidaNomeCargo";
import IStrategy from "../strategy/IStrategy";
import ValidaExistenciaCargo from "../strategy/funcionario/ValidaExistenciaCargo";
import ValidaExistenciaFuncionario from "../strategy/funcionario/ValidaExistenciaFuncionario";
import ValidarCpf from "../strategy/funcionario/ValidarCpf";
import Result from "../utils/Result";
import IFacade from "./IFacade";
import { TYPE_MODEL } from "./types/typeModel";
import ValidaEmailFuncionario from "../strategy/funcionario/ValidaEmailFuncionario";

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
        [TYPE_COMMAND.CREATE]: [new ValidaExistenciaCargo(), new ValidarCpf(), new ValidaEmailFuncionario()],
        [TYPE_COMMAND.READ]: [],
        [TYPE_COMMAND.UPDATE]: [new ValidaExistenciaCargo(), new ValidaExistenciaFuncionario(), new ValidarCpf()],
        [TYPE_COMMAND.PATCH]: [new ValidaExistenciaCargo(), new ValidaExistenciaFuncionario(), new ValidarCpf()],
        [TYPE_COMMAND.DELETE]: [new ValidaExistenciaFuncionario()],
      },
      [TYPE_MODEL.CARGO]: {
        [TYPE_COMMAND.CREATE]: [new ValidaNomeCargo()],
        [TYPE_COMMAND.READ]: [],
        [TYPE_COMMAND.UPDATE]: [],
        [TYPE_COMMAND.PATCH]: [],
        [TYPE_COMMAND.DELETE]: [],
      }

    }
    this.daos = {
      [TYPE_MODEL.FUNCIONARIO]: new FuncionarioDAO(),
      [TYPE_MODEL.CARGO]: new CargoDAO()
    }
  }
  async criar(entidade: AbsEntidadeDominio) {
    console.log(entidade, TYPE_COMMAND.CREATE);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    const regras = this.regras[className][TYPE_COMMAND.CREATE];

    let result: Result = new Result('');

    console.log('executando estrategias');
    for (const estrategia of regras) {
      try {

        const { mensagem, erro, data } = await estrategia.processar(entidade)
        result.mensagem += mensagem + '/n';
        result.erro += erro;
        result.data.push(...data);
        if (result.erro) {
          break;
        }
      } catch (error) {
        return error
      }
    }
    if (!result.erro) {
      try {
        console.log('chamando a dao para criar');

        result = await dao.criar(entidade)
      } catch (error) {
        console.log('chegou aq');

        result = error.message
        return result
      }
    }
    console.log('oq temos aq', result);

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
      try {
        result = await dao.consultar(entidade)
      } catch (error) {
        result = error.message
      }
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
      try {
        result = await dao.excluir(entidade.id)
      } catch (error) {
        result = error.message
      }
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
      try {
        result = await dao.alterar(entidade)
      } catch (error) {
        result = error.message
      }
    }
    return result

  }
}
