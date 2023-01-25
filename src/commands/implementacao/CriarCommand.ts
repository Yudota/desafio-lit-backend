import AbsEntidadeDominio from "../../models/AbsEntidadeDominio";
import { AbsCommand } from "../AbsCommand";

export class SalvarCommand extends AbsCommand {
  async executar(entidade: AbsEntidadeDominio) {
    return await this.facade.criar(entidade)

  }
}