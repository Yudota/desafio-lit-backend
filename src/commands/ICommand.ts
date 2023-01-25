import AbsEntidadeDominio from "../models/AbsEntidadeDominio";

export default interface ICommand {
  executar: (entidade: AbsEntidadeDominio) => Promise<any>;
}
