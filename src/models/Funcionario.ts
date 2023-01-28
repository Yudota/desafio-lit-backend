import AbsEntidadeDominio from "./AbsEntidadeDominio";
import Cargo from "./Cargo";
interface IFuncionario {
  id?: number
  nome: string
  cpf: string
  senha: string
  data_contratacao: string
  matricula: string
  cargo: Cargo
  email: string
}
export default class Funcionario extends AbsEntidadeDominio {
  private _nome: string;
  private _cpf: string;
  private _data_contratacao: string;
  private _matricula: string;
  private _cargo: Cargo;
  private _email: string;
  private _senha: string;

  constructor({ id, ...rest }: IFuncionario) {
    super(id)
    for (const prop in rest) {
      this[prop.valueOf()] = rest[prop.valueOf()]
    }
  }

  public get nome(): string {
    return this._nome;
  }
  public set nome(nome: string) {
    this._nome = nome;
  }
  public get cpf(): string {
    return this._cpf;
  }
  public set cpf(cpf: string) {
    this._cpf = cpf;
  }
  public get data_contratacao(): string {
    return this._data_contratacao;
  }
  public get senha(): string {
    return this._senha;
  }
  public set senha(senha: string) {
    this._senha = senha;
  }

  public set data_contratacao(data_contratacao: string) {
    this._data_contratacao = data_contratacao;
  }
  public get matricula(): string {
    return this._matricula;
  }
  public set matricula(matricula: string) {
    this._matricula = matricula;
  }
  public get cargo(): Cargo {
    return this._cargo;
  }
  public set cargo(cargo: Cargo) {
    this._cargo = cargo;
  }
  public get email(): string {
    return this._email;
  }
  public set email(email: string) {
    this._email = email;
  }
}

// const teste = new Funcionario({
//   id: 1,
//   nome: 'escrito nome',
//   cpf: 'escrito cpf',
//   data_contratacao: 'escrito data_contratacao',
//   matricula: 'escrito matricula',
//   cargo: new Cargo('teste'),
//   email: 'escrito email',
// })
// console.log(teste.cargo)