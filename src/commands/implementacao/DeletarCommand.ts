import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import { AbsCommand } from "../AbsCommand";

export class DeletarCommand extends AbsCommand {
  async executar(entidade: AbsEntidadeDominio) {
    return await this.facade.deletar(entidade);
  }
}
