import AbsEntidadeDominio from "../models/AbsEntidadeDominio"

export default interface IFacade {
  criar: (entidade: AbsEntidadeDominio) => Promise<any>
  consultar: (objParcialED: Partial<AbsEntidadeDominio>) => Promise<any>
  atualizar: (entidade: Partial<AbsEntidadeDominio>) => Promise<any>
  deletar: (entidade: AbsEntidadeDominio) => Promise<any>
}
