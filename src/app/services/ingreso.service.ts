import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

	public url:string;
	constructor(
   		private _http:HttpClient
	){
   		this.url = global.url;
	}


  getingresos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/ingreso',  {headers: headers});
  }

  
  ingresosunread(token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization',token);
    return this._http.get(this.url + '/ingresosunread',  {headers: headers});
  }

  notifymarkAsRead(token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization',token);
    return this._http.get(this.url + '/ingresosread',  {headers: headers});
  }


  veringreso(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/ingreso/'+id,  {headers: headers});
  }

  create(ingresos, token):Observable<any> {
    let json  = JSON.stringify(ingresos);	
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization',token);                                
    return this._http.post(this.url + '/ingreso', params, {headers: headers});
  }


  buscaringreso(buscar):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/buscaringreso?buscar='+buscar ,{headers: headers});
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

	anular(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.delete(this.url + '/ingreso/'+id, {headers: headers});
  }
  

}
