import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-usuario-show',
  templateUrl: './usuario-show.component.html',
  styleUrls: ['./usuario-show.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UsuarioShowComponent implements OnInit {

  public page_title: string;
  public usuario;
  public url;

  constructor(
    private _usuarioService: UsuarioService,
    
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "VER USUARIO";
    this.url = global.url;
   
  }

  ngOnInit() {
    this.verusuario();
  }


  verusuario(){
    this._route.params.subscribe(params => {
    let id = params['id'];
    
      this._usuarioService.verusuario(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.usuario = response.User;
          }else{
            this._router.navigate(['inicio']);
          }
        },
        error =>{
          this._router.navigate(['inicio']);
        }
      );
    });
  }


  public froala_options: Object = {
    placeholderText: 'Edita tu contenido aqui!',
    charCounterCount: true,
    languaje:'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
 
  }


}
