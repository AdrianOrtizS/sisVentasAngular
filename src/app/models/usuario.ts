


export class Usuario{

    constructor(
        public id: any,
        public name: string,
        public surname: string,
        public email: string,
        public identificador: string,
        public password: string,
        public role: string,        
        public description: string,
        public image: string,
        public condicion: number,
        public remember_token: any
  
    ){

    }
}
