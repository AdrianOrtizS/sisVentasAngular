import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-userloginedit',
  templateUrl: './userloginedit.component.html',
  styleUrls: ['./userloginedit.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UserlogineditComponent implements OnInit {

  public resetVar;
  public page_title: string;
  public usuario: Usuario;
  public identity;
  public url;
  public token;
  public status;
  public respuesta;

  constructor(
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

    this._usuarioService.updateUserLog(this.token,this.usuario).subscribe(
      response =>{
          this.respuesta = response;
          this.identity = this.respuesta.act;

          localStorage.setItem('identity', JSON.stringify(this.identity));
         
      },
      error =>{
          this.status = 'error';
          console.log(<any>error);
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

//      url: global.url+'/usuario/image/upload',
      url: global.url+'/uploadImage/update',
      headers: {
         "Authorization" : this._usuarioService.getToken()
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
      afterUploadMsg_success: 'Foto registrada  !',
      afterUploadMsg_error: 'Fallo al subir foto !'
    }
  };




  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.usuario.image = image_data.image;
  }



}
