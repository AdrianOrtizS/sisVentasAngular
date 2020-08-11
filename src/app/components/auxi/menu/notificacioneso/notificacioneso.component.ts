import { Component, OnInit ,DoCheck} from '@angular/core';
import { NotificacionService } from './../../../../services/notificacion.service';
import { UsuarioService} from 'src/app/services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-notificacioneso',
  templateUrl: './notificacioneso.component.html',
  styleUrls: ['./notificacioneso.component.css'],
  providers: [
    NotificacionService
  ]

})
export class NotificacionesoComponent implements OnInit {

  public identity;
  public token;
  public not;
  public unread ;
  public ventas;
  public ingresos;
  public productos;
  public stock ;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      public _notificacionService: NotificacionService,
      public _usuarioService: UsuarioService
  ) 
  {
    this.identity = _usuarioService.getIdentity();
    this.token = _usuarioService.getToken();
    this.unread = 0;
    this.ventas = 0;
    this.ingresos = 0;
    this.productos = 0;
    this.stock =0;
  }


  ngOnInit() {
    this.notify();
    this.notifyunread();
  }


  notifyunread(){
    this._notificacionService.notifiuserunread(this.token).subscribe(
      response=>{
        this.not = response.notification;
          this.not.forEach(element => {
              if(element['read_at'] == null ){
                if(element['data'].tipo == "Stock"){
                  this.productos = 1;        //valida para mostrar notific en menu  
                  this.stock = this.stock +1;//# de notif de stock minimo
                                             //if(Admin){this.unread-(this.stock-1)}
                                             //else{this.unread-this.stock}  
                }
                this.unread = this.unread+1 ;
              }
          });

          this.not.forEach(element => {
            if(element['data'].tipo == "Venta" && element['read_at'] == null){
              this.ventas = this.ventas+1;
            }
          });
          this.not.forEach(element => {
              if(element['data'].tipo == "Ingreso" && element['read_at'] == null){
                this.ingresos = this.ingresos+1;
              }
          });
          
      },
      error=>{
        console.log(error);
      }
    );
  }



  notifymarkAsRead(){
    this._notificacionService.notifiusermarkAsread(this.token).subscribe(
      response=>{
        this.unread = 0;
        this.productos =0;
        this.ventas =0;
        this.ingresos = 0;
      },
      error=>{
        console.log(error);
      }
    );
  }


  notify() {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'ASDASD2121',
      cluster: 'mt1',
      wsPort: 6001,
      wsHost: window.location.hostname,
      disableStats: true,
      enabledTransports: ['ws']
    });

    echo.channel('channel-ingreso')
      .listen('IngresoEvent', (e) => {
        console.log(e);
        this.notifyunread();
    });

    echo.channel('channel-venta')
      .listen('VentaEvent', (e) => {
        console.log(e);
        this.notifyunread();
    });

    echo.channel('channel-producto')
      .listen('StockEvent', (e) => {
        console.log(e);
        this.notifyunread();
    });



  }


}
