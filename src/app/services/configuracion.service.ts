import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  public url;

  constructor(
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
  }


  getconfiguracion():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/configuracion',  {headers: headers});
  }

  verconfiguracion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/configuracion/'+id,  {headers: headers});
  }

  getiva():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/getiva',  {headers: headers});
  }

  actualizarconfiguracion(configuracion, id):Observable<any>{
    let json = JSON.stringify(configuracion);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + '/configuracion/'+id, params, {headers: headers});
  }

  dashboard():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/dashboard',  {headers: headers});
  }


}
