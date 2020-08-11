import { Injectable } from '@angular/core';

    //HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders } from '@angular/common/http';

    //pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class TipoproductoService {

  public url;

  constructor(    
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
  }

  create(tipoproducto):Observable<any>{
    let json = JSON.stringify(tipoproducto);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this._http.post(this.url + '/tipoproducto', params, {headers: headers});
  }
  
  gettipoproducto():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/tipoproducto',  {headers: headers});
  }

  vertipoproducto(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/tipoproducto/'+id,  {headers: headers});
  }
  
  actualizartipoproducto(tipoproducto, id):Observable<any>{
    let json = JSON.stringify(tipoproducto);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + '/tipoproducto/'+id, params, {headers: headers});
  }

  activardesactivartipoproducto(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + '/tipoproducto/'+id, {headers: headers});
  }

  buscartipoproductonombre(buscar):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/buscartipoproductonombre?buscar='+buscar ,{headers: headers});
  }
  

}
