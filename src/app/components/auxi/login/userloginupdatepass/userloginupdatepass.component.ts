import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userloginupdatepass',
  templateUrl: './userloginupdatepass.component.html',
  styleUrls: ['./userloginupdatepass.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UserloginupdatepassComponent implements OnInit {

  public page_title: string;
  public usuario: Usuario;
  public identity;
  public url;
  public token;
  public status;
  public respuesta;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
  ) { 
    this.url = global.url;
    this.page_title = "Ajuste usuario";
    this.usuario = new Usuario(1,'','','','','','','','',1,'');
    this.identity = _usuarioService.getIdentity();
    this.token = _usuarioService.getToken();

    //Quitar propiedades que Api no necesita
    delete this.identity.sub;
    delete this.identity.iat;
    delete this.identity.exp;
    
    this.usuario = this.identity;
  
  }

  ngOnInit() {
  }


  onSubmit(usuarioForm){

    let password2 = (<HTMLInputElement> document.getElementById("password2")).value;

    if(password2 == this.usuario.password){
        this._usuarioService.updatePassUserLog(this.token,this.usuario).subscribe(
          response =>{
              this.respuesta = response;

          },
          error =>{
              this.status = 'error';
              console.log(<any>error);
          }
        );
  
    }else{
        //Alert///
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ingresa bien la clave',
          showConfirmButton: false,
          timer: 2000
        })
       ///////////
    }



  }


}
