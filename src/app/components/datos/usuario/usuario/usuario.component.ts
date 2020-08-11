import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { global } from 'src/app/services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UsuarioComponent implements OnInit {

  public page_title: string;
  public url;
  public usuario;
  public usuario2;
  public p: number;


  constructor(
    private _usuarioService: UsuarioService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "USUARIO";
    this.url = global.url;
    this.usuario = Array<Usuario>();
    this.usuario2 = new Usuario(1,'','','','','','','','',1,'');
  }

  ngOnInit() {
    this.getusuario();
  }


  getusuario(){
    this._usuarioService.getusuario().subscribe(
      response=>{
        if(response.status == 'success'){
          this.usuario = response.Usuario; 

          console.log(response);

        }
      },
      error=>{
        console.log(error);
      }
    );
  }




  buscarusuario(buscar,event){
    event.preventDefault();

    this._usuarioService.buscarusuarionombre(buscar).subscribe(
      response =>{
        if(response.status == 'success'){
          this.usuario = response.Usuario;
        }
      },error=>{
        console.log(error.status);
        if(error.status == 404){
//            this.autores.autor ="No hay el autor";
        }
      }
    );
  }




  
  activardesactivarusuario(id){
    this._usuarioService.activardesactivar(id).subscribe(
      response => {
        this.getusuario();
      },
      error=>{
        console.log(error);
        
      }
    );
  }



}
