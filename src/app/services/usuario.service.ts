import { Injectable } from '@angular/core';
    //HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders } from '@angular/common/http';
    //pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public identity;
	public token;
  public url;

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //
  
  constructor(    
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;

    this.decodedToken  = this.helper.decodeToken(this.token);
    this.expirationDate = this.helper.getTokenExpirationDate(this.token);
    this.isExpired     = this.helper.isTokenExpired(this.token);

  }


  create(usuario):Observable<any>{
    //limpia htmlentities a utf-8
    usuario.description = global.htmlEntities(usuario.description);
    let json = JSON.stringify(usuario);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + '/usuario', params, {headers: headers});
  }

  
  register(usuario):Observable<any>{
    //limpia htmlentities a utf-8
//    usuario.description = global.htmlEntities(usuario.description);
    let json = JSON.stringify(usuario);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + '/register', params, {headers: headers});
  }



  getusuario():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/usuario',  {headers: headers});
  }

  verusuario(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/usuario/'+id,  {headers: headers});
  }
  
  actualizarusuario(usuario, id):Observable<any>{
    usuario.description = global.htmlEntities(usuario.description);
    let json = JSON.stringify(usuario);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + '/usuario/'+id, params, {headers: headers});
  }

  activardesactivar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + '/usuario/'+id, {headers: headers});
  }

  buscarusuarionombre(buscar):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/buscarusuarionombre?buscar='+buscar ,{headers: headers});
  }

  //////////////////
  //////LOGIN///////
  //////////////////

  signup(usuario, getToken = null):Observable<any>{
    if(getToken != null){
    //añade propiedad al objeto
      usuario.getToken = 'true';
    }
    let json = JSON.stringify(usuario);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + '/login', params, {headers: headers});	
  }


  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity && identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
 
    // if(this.isExpired){
    //   localStorage.removeItem('identity');
    //   localStorage.removeItem('token');
    //   this.identity = null;
    //   this.token = null;
    // }
 
 
    return this.identity;
  }


  getToken(){
    let token = localStorage.getItem('token');
    if(token && token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
 
    // if(this.isExpired){
    //   localStorage.removeItem('identity');
    //   localStorage.removeItem('token');
    //   this.identity = null;
    //   this.token = null;
    // }
 
    return this.token;
  }

  updateUserLog(token, usuario){
    usuario.description = global.htmlEntities(usuario.description);
    let json = JSON.stringify(usuario);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Authorization',token);
    return this._http.put(this.url + '/updateUserLog', params, {headers: headers});
  }

  updatePassUserLog(token, usuario){
    let json = JSON.stringify(usuario);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Authorization',token);
    return this._http.put(this.url + '/updatePassUserLog', params, {headers: headers});
  }

}
