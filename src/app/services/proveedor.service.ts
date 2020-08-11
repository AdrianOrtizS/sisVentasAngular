import { Injectable } from '@angular/core';

    //HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders } from '@angular/common/http';

    //pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  public url;

  constructor(    
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
  }

  create(proveedor):Observable<any>{
    let json = JSON.stringify(proveedor);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this._http.post(this.url + '/proveedor', params, {headers: headers});
  }
  
  getproveedor():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/proveedor',  {headers: headers});
  }

  verproveedor(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/proveedor/'+id,  {headers: headers});
  }
  
  actualizarproveedor(proveedor, id):Observable<any>{
    let json = JSON.stringify(proveedor);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + '/proveedor/'+id, params, {headers: headers});
  }

  activardesactivar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + '/proveedor/'+id, {headers: headers});
  }

  buscarproveedornombre(buscar):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/buscarproveedornombre?buscar='+buscar ,{headers: headers});
  }
  

}
