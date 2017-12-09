import { Temperatura } from './Temperatura';
import { Gps } from './Gps';
export class Sensores {

    public gps: Gps;
    public temperatura: Temperatura;
    public ultrasonidoIzquierdo: Number;
    public ultrasonidoDerecho: Number;
    public ultrasonidoAdelante: Number;
    public monoxido: Number;
    constructor() {
        this.temperatura = new Temperatura(null, null, null, null);
        this.gps = new Gps();
    }

}
