
import { Detallepedido } from './detallepedido';

export class Pedido{

    constructor(

	    public id: any,
//        public idcliente: any,
        public idusuario: any,
        public fecha: any,

        public subtotal: any,
        public iva: any,
        public total:any,

        public condicion: any,
        
        public long,
        public lat,
        public referencia,

        public detalles: Array<Detallepedido>       

    ){

    }
}