import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Route, CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityAdminGuard implements CanActivate {

	constructor(
        private _router:Router,
        private _usuariorService:UsuarioService
    ){
	}

    canActivate(){
        let identity = this._usuariorService.getIdentity();

        console.log(identity);

        if(identity.role == 'Administrador'){
            return true;
        }else{
            this._router.navigate(['/error']);
            return false;
        }


    }

  

  

}
