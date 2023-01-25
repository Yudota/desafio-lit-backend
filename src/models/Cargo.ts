import AbsEntidadeDominio from "./AbsEntidadeDominio";

export default class Cargo extends AbsEntidadeDominio {
  private _nome: string;

  constructor(nome: string, id?: string) {
    super(id)
    this._nome = nome;
  }

  public get nome(): string {
    return this._nome;
  }
  public set nome(nome: string) {
    this._nome = nome;
  }

}
