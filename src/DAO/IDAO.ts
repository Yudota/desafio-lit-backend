import AbsEntidadeDominio from "../models/AbsEntidadeDominio";

export default interface IDAO {
    criar(entidade: AbsEntidadeDominio): Promise<any>;
    alterar(entidade: AbsEntidadeDominio): Promise<any>;
    excluir(id: number): Promise<any>;
    consultar(entidade?: Partial<AbsEntidadeDominio>): Promise<any>;
}