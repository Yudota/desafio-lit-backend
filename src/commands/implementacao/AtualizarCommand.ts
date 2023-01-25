import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import { AbsCommand } from "../AbsCommand";


export class AtualizarCommand extends AbsCommand {
  async executar(entidade: AbsEntidadeDominio) {
    return await this.facade.atualizar(entidade)
  }
}