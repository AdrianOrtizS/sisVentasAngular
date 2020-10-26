import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url = global.url;
    }


    listarproductos():Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + '/producto' ,{headers: headers});   
    }


    buscarproductonombreotipo(buscar):Observable<any>{
		  let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + '/buscarproductonombre?buscar='+buscar ,{headers: headers});   
    }



    create(pedidos, token):Observable<any> {
      let json  = JSON.stringify(pedidos);	
      let params = "json="+json;
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization',token);                                
      return this._http.post(this.url + '/pedido', params, {headers: headers});
    }

    

    getmispedidos(token):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization',token);
      return this._http.get(this.url + '/mispedidos',  {headers: headers});
    }



    anular(id):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.delete(this.url + '/pedido/'+id, {headers: headers});
    }


    verpedido(id):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + '/pedido/'+id,  {headers: headers});
    }
    
 


}