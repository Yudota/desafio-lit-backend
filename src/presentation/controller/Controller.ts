import { Request, Response } from "express";
import ICommand from "../../commands/ICommand";
import { AtualizarCommand, DeletarCommand, ListarCommand, SalvarCommand } from "../../commands/implementacao";
import { MethodRequestTypes } from "./RequesType";
export default class Controller {
  private _url!: string;
  private _operacao!: string;
  private commands: Map<String, ICommand>;

  constructor() {
    this.commands = new Map<String, ICommand>();
    this.commands.set(MethodRequestTypes.GET, new ListarCommand());
    this.commands.set(MethodRequestTypes.POST, new SalvarCommand());
    this.commands.set(MethodRequestTypes.PUT, new AtualizarCommand());
    this.commands.set(MethodRequestTypes.DELETE, new DeletarCommand());
    this.commands.set(MethodRequestTypes.PATCH, new AtualizarCommand());
  }
  handle(req: Request, res: Response) { }
}
