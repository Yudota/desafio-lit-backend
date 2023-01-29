import { Request, Response } from "express";
import ICommand from "../../commands/ICommand";
import { AtualizarCommand, DeletarCommand, ListarCommand, SalvarCommand } from "../../commands/implementacao";
import Result from "../../utils/Result";
import CargoVH from "../viewHelpers/CargoVH";
import { FuncionarioVH } from "../viewHelpers/FuncionarioVH";
import IViewHelper from "../viewHelpers/IViewHelper";
import { MethodRequestTypes } from "./RequesType";
export default class Controller {
  private req: Request;
  private res: Response;
  private _route: string;
  private _operacao: string;
  private commands: Map<String, ICommand>;
  private viewHelpers: Map<String, IViewHelper>;
  private vh?: IViewHelper = undefined;
  private cmd: ICommand | undefined = undefined;

  public get route(): string {
    return this._route;
  }
  public set route(url: string) {
    this._route = url;
  }

  public get operacao(): string {
    return this._operacao;
  }
  public set operacao(operacao: string) {
    this._operacao = operacao;
  }

  constructor() {
    this.handle = this.handle.bind(this);
    this.commands = new Map<String, ICommand>();
    this.commands.set(MethodRequestTypes.GET, new ListarCommand());
    this.commands.set(MethodRequestTypes.POST, new SalvarCommand());
    this.commands.set(MethodRequestTypes.PUT, new AtualizarCommand());
    this.commands.set(MethodRequestTypes.DELETE, new DeletarCommand());
    this.commands.set(MethodRequestTypes.PATCH, new AtualizarCommand());

    this.viewHelpers = new Map<String, IViewHelper>();
    this.viewHelpers.set("/funcionario", new FuncionarioVH());
    this.viewHelpers.set("/cargo", new CargoVH());

  }
  async handle(req: Request, res: Response) {

    this.route = String(req.route.path).toLowerCase();
    this.operacao = req.method;

    if (this.viewHelpers.has(this.route)) {
      this.vh = this.viewHelpers.get(this.route);
      // ...
    } else {
      return res.status(404).send({ message: "Endpoint not found" });
    }

    const entidade = this.vh!.getEntidade(req);

    this.cmd = this.commands.get(this.operacao);

    const result: Result = await this.cmd?.executar(entidade);
    if (result!.erro > 0) {
      return res.status(400).json(result);
    }
    if (req.method === MethodRequestTypes.GET) {
      return res.status(200).json(result);
    }
    return res.status(201).json(result);
  }
}
