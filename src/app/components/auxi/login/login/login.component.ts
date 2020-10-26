import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService} from 'src/app/services/usuario.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    UsuarioService
  ]
})
export class LoginComponent implements OnInit {

  public page_title : string;
  public usuario : Usuario;
  public status : string;
  public token = null;
  public identity = null;

  constructor( 
    private _userService: UsuarioService,
    private _router: Router,        //navegar entre rutas
    private _route: ActivatedRoute  //envia parametros
  ) 
  { 
    this.page_title = "IDENTIFICATE";
    this.usuario = new Usuario(1,'','','','','','','','',1,'');
  }

  ngOnInit() {
    //se ejecuta siempre
    //cierra session cuando llega parametro por url 
    this.logout();
  }

  onSubmit(loginForm){
    this._userService.signup(this.usuario).subscribe(
      response =>{
          //Token
          if(response.status != 'error'){
            this.status = 'success';
            this.token = response;
                  //Identity
                  this._userService.signup(this.usuario, 'true').subscribe(
                      response =>{
                          this.identity = response;
                          //persistir datos en el navegador
                          localStorage.setItem('token', this.token);
                          localStorage.setItem('identity', JSON.stringify(this.identity) );
                         

                          if(this.identity.role === 'Cliente' )
                          {
                            this._router.navigate(['mispedidos']); 
                            console.log(this.identity.role);
                          }
                          else{
                            this._router.navigate(['/']);
                          }

                          
                      },error => {
                        this.status ="error";
                        console.log(<any>error);
           
                        Swal.fire({
                          icon: 'error',
                          title: 'Error...',
                          text: 'Intentelo nuevamente!',
                          timer: 2000
                        })
           
           
                      }
                    );
          }else{
            this.status = 'error';
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'Intentelo nuevamente!',
              timer: 2000
            })

          }
               
      },error => {
        this.status ="error";
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Intentelo nuevamente!',
          timer: 2000
        })

      }
    );
    
  }

  //se ejecuta siempre con el ngOnInit
  logout(){
    this._route.params.subscribe(
    
      params =>{
        let logout = +params['sure'];
          if(logout == 1){
            localStorage.removeItem('identity');
            localStorage.removeItem('token');
            localStorage.removeItem('prodselect');
            
            this._router.navigate(['login']);
          }

    });    
  }


}
