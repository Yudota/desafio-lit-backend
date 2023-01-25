export default abstract class AbsEntidadeDominio {
  protected _id?: number;
  constructor(id?: string | number) {
    this._id = Number(id);
  }
  get id(): number | undefined {
    return this._id;
  }
  set id(id: number | undefined) {
    this._id = id
  }

}
