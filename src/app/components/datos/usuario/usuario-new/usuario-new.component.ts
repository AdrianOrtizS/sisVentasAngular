import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { global } from '../../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-new',
  templateUrl: './usuario-new.component.html',
  styleUrls: ['./usuario-new.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UsuarioNewComponent implements OnInit {

  lista:string[]=["Administrador","Vendedor"];

  model;
  public resetVar;
  public url;
  public page_title: string;
  public usuario: Usuario;
  public status;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService 
    
  ){ 
    this.page_title = "NUEVA USUARIO";
    this.usuario = new Usuario(0,'','','','','','','','',0,'');
    this.url = global.url;
       
  }

  ngOnInit() {
  }



  onSubmit(usuarioForm){
    this._usuarioService.create(this.usuario).subscribe(
      response =>{
        if(response.status == 'success'){
          this.usuario = response.User;
          this.status = 'success';
        
          //Alert///
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario agregada',
            showConfirmButton: false,
            timer: 2000
          })
         ///////////

          this._router.navigate(['/usuario']);
          usuarioForm.reset();
        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error yayayaya';
        console.log(<any>error);
        console.log(this.status);
      }
    );

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

 


  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'/usuario/image/upload',
      headers: {
        // "Authorization" : ""
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Seleccione foto',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Imagen registrada  !',
      afterUploadMsg_error: 'Fallo al subir imagen !'
    }
    
  };

  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.usuario.image = image_data.image;
  }




}
