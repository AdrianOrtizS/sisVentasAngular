


export class Producto{

    constructor(
        public id: any,
        public nombre: string,
        public codigo: string,
        public stock: number,
        public stockminimo: number,
        public foto: any,
        public iva: any,
        public condicion: number,
        public idtipo: number,
        public precio: any
    ){
    }
}
