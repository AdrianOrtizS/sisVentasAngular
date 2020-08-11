import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
    providedIn: 'root'
})           
export class NotificacionService {

    public url:string;
    constructor(
            private _http:HttpClient
    ){
            this.url = global.url;
    }


    notifiuserunread(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization',token);
        return this._http.get(this.url + '/notifiuserunread',  {headers: headers});
    }

    notifiusermarkAsread(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization',token);
        return this._http.get(this.url + '/notifiusermarkAsread',  {headers: headers});
    }



}
