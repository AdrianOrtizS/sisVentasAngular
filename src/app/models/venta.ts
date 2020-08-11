


import { Detalleventa } from './detalleventa';

export class Venta{

    constructor(

	    public id: any,
        public idpersona: any,
        public fecha: any,
        public numcomprobante: any,
        public subtotal: any,
        public iva: any,
        public iva0: any,
        public total: any,
        public descuento: any,
        public condicion: any,
        public idusuario: any,

        public detalles: Array<Detalleventa>       

    ){

    }
}
