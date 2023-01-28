import AbsEntidadeDominio from '../models/AbsEntidadeDominio';

export default class Result {
    mensagem: string;
    erro: number;
    data: AbsEntidadeDominio[];
    constructor(mensagem: string, erro: number = 0, data: AbsEntidadeDominio[] = []) {
        this.mensagem = mensagem;
        this.erro = erro;
        this.data = data;
    }
}