
import { Detalleingreso } from './detalleingreso';

export class Ingreso{

    constructor(

	    public id: any,
        public idproveedor: any,
        public fecha: any,
        public numcomprobante: any,
        public subtotal: any,
        public iva: any,
        public total:any,
        public condicion: any,
        public idusuario: any,

        public detalles: Array<Detalleingreso>       

    ){

    }
}
