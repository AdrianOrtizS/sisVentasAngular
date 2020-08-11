import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-userloginshow',
  templateUrl: './userloginshow.component.html',
  styleUrls: ['./userloginshow.component.css'],
  providers:[
    UsuarioService
  ]
})
export class UserloginshowComponent implements OnInit {

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
    this.page_title = "MIS DATOS";
    this.usuario = new Usuario(1,'','','','','','','','',1,'');
    this.identity = _usuarioService.getIdentity();
    
    //Quitar propiedades que Api no necesita
    delete this.identity.sub;
    delete this.identity.iat;
    delete this.identity.exp;
    
    this.usuario = this.identity;
  
  }

  ngOnInit() {
    
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



}
