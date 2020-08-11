import { Injectable } from '@angular/core';

    //HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders } from '@angular/common/http';

    //pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(    
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
  }

  create(producto):Observable<any>{
    let json = JSON.stringify(producto);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this._http.post(this.url + '/producto', params, {headers: headers});
  }
  
  getproducto():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/producto',  {headers: headers});
  }


  stockminimo():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/stockminimo',  {headers: headers});
  }


  verproducto(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/producto/'+id,  {headers: headers});
  }
  
  actualizarproducto(producto, id):Observable<any>{
    let json = JSON.stringify(producto);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + '/producto/'+id, params, {headers: headers});
  }

  activardesactivar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + '/producto/'+id, {headers: headers});
  }

  buscarproductonombre(buscar):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/buscarproductonombre?buscar='+buscar ,{headers: headers});
  }
  

}
