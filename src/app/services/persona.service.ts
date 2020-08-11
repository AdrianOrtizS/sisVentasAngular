import { Injectable } from '@angular/core';

    //HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders } from '@angular/common/http';

    //pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public url;

  constructor(    
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
  }


  create(persona):Observable<any>{
    let json = JSON.stringify(persona);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this._http.post(this.url + '/persona', params, {headers: headers});
  }
  
  getpersona():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/persona',  {headers: headers});
  }

  verpersona(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/persona/'+id,  {headers: headers});
  }
  
  actualizarpersona(persona, id):Observable<any>{
    let json = JSON.stringify(persona);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + '/persona/'+id, params, {headers: headers});
  }

  activardesactivar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + '/persona/'+id, {headers: headers});
  }

  buscarpersonanombre(buscar):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/buscarpersonanombre?buscar='+buscar ,{headers: headers});
  }


}
