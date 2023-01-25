import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import { AbsCommand } from "../AbsCommand";
export class ListarCommand extends AbsCommand {
  async executar(entidade: AbsEntidadeDominio) {
    return await this.facade.consultar(entidade)
  }
}
