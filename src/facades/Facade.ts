import { TYPE_COMMAND } from "../commands/types/typeCommand";
import AbstractDAO from "../DAO/AbstractDAO";
import FuncionarioDAO from "../DAO/FuncionarioDAO";
import AbsEntidadeDominio from "../models/AbsEntidadeDominio";
import IFacade from "./IFacade";
import { TYPE_MODEL } from "./types/typeModel";

// type MapperStrategies = {
//   [KEY in TYPE_COMMAND]: Array<IStrategy>
// }
// type MapperModelStrategy = {
//   [KEY in TYPE_MODEL]: MapperStrategies;
// };
type MapperModelDAO = {
  [KEY in TYPE_MODEL]: AbstractDAO;
}
export default class Facade implements IFacade {
  private daos: MapperModelDAO
  // private regras: MapperModelStrategy
  constructor() {
    // this.regras = {
    //   [TYPE_MODEL.FUNCIONARIO]: {
    //     [TYPE_COMMAND.CREATE]: [new ValidarCpf(), new ValidarLocalizacao()],
    //     [TYPE_COMMAND.READ]: [new ValidarCpf(), new ValidarLocalizacao()],
    //     [TYPE_COMMAND.UPDATE]: [new ValidarCpf(), new ValidarLocalizacao()],
    //     [TYPE_COMMAND.PATCH]: [new ValidarCpf(), new ValidarLocalizacao()],
    //     [TYPE_COMMAND.DELETE]: [new ValidarCpf(), new ValidarLocalizacao()],
    //   },

    // }
    this.daos = {
      [TYPE_MODEL.FUNCIONARIO]: new FuncionarioDAO()
    }
  }
  async criar(entidade: AbsEntidadeDominio) {
    console.log(entidade, TYPE_COMMAND.CREATE);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    // const regras = this.regras[className][TYPE_COMMAND.CREATE];

    // for (const estrategia of regras) {
    //   const { mensagem, erro, data } = await estrategia.processar(entidade);
    // }
    return Promise.resolve(entidade);


  }
  async consultar(entidade: Partial<AbsEntidadeDominio>) {
    console.log(entidade, TYPE_COMMAND.READ);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    // const regras = this.regras[className][TYPE_COMMAND.READ];


    // for (const estrategia of regras) {
    //   const { mensagem, erro, data } = await estrategia.processar(entidade);
    // }
    return Promise.resolve(entidade)

  }
  async deletar(entidade: AbsEntidadeDominio) {
    console.log(entidade, TYPE_COMMAND.DELETE);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];

    // const regras = this.regras[className][TYPE_COMMAND.DELETE];
    let response
    // for (const estrategia of regras) {
    //   const { mensagem, erro, data } = await estrategia.processar(entidade);
    // }
    return Promise.resolve(entidade)

  }
  async atualizar(entidade: Partial<AbsEntidadeDominio>) {
    console.log(entidade, TYPE_COMMAND.UPDATE);
    const className = entidade.constructor.name as TYPE_MODEL;
    const dao = this.daos[className];
    // const regras = this.regras[className][TYPE_COMMAND.READ];

    // for (const estrategia of regras) {
    //   const { mensagem, erro, data } = await estrategia.processar(entidade);
    // }
    return Promise.resolve(entidade)

  }
}
