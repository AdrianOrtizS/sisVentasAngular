import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

	public url:string;
	constructor(
   		private _http:HttpClient
	){
   		this.url = global.url;
	}



  getventas():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/venta',  {headers: headers});
  }
    

  verventa(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/venta/'+id,  {headers: headers});
  }


  create(ventas, token):Observable<any> {
    let json  = JSON.stringify(ventas);	
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization',token);
    return this._http.post(this.url + '/venta', params, {headers: headers});
  }

  buscarventa(buscar):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/buscarventa?buscar='+buscar ,{headers: headers});
  }


  buscarProducto(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
	  return this._http.get(this.url + '/buscarproducto?filtro='+filtro ,{headers: headers});
  }


  buscarproductonombre(buscar):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + '/buscarproductonombre?buscar='+buscar ,{headers: headers});
  }
  
  buscarproductocodigo(buscar):Observable<any>{
    
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + '/buscarproductocodigo?buscar='+buscar ,{headers: headers});
	}

	
	
  numcomprobante():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + '/numcomprobante' ,{headers: headers});
	}
		

	anular(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.delete(this.url + '/venta/'+id, {headers: headers});
  }
  

}
