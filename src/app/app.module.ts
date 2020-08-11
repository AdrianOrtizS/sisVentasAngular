import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import "froala-editor/js/froala_editor.pkgd.min.js"; 
import * as $ from 'jquery'; window["$"] = $; window["jQuery"] = $;
import {DatePipe} from '@angular/common';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import Swal from 'sweetalert2';

import { HomeComponent } from './components/auxi/home/home.component';

import { TipoproductoComponent } from './components/datos/tipoproducto/tipoproducto/tipoproducto.component';
import { TipoproductoNewComponent } from './components/datos/tipoproducto/tipoproducto-new/tipoproducto-new.component';
import { TipoproductoShowComponent } from './components/datos/tipoproducto/tipoproducto-show/tipoproducto-show.component';
import { TipoproductoUpdateComponent } from './components/datos/tipoproducto/tipoproducto-update/tipoproducto-update.component';

import { ProductoComponent } from './components/datos/producto/producto/producto.component';
import { ProductoNewComponent } from './components/datos/producto/producto-new/producto-new.component';
import { ProductoShowComponent } from './components/datos/producto/producto-show/producto-show.component';
import { ProductoUpdateComponent } from './components/datos/producto/producto-update/producto-update.component';


import { PersonaComponent } from './components/datos/persona/persona/persona.component';
import { PersonaNewComponent } from './components/datos/persona/persona-new/persona-new.component';
import { PersonaShowComponent } from './components/datos/persona/persona-show/persona-show.component';
import { PersonaUpdateComponent } from './components/datos/persona/persona-update/persona-update.component';

import { UsuarioComponent } from './components/datos/usuario/usuario/usuario.component';
import { UsuarioNewComponent } from './components/datos/usuario/usuario-new/usuario-new.component';
import { UsuarioShowComponent } from './components/datos/usuario/usuario-show/usuario-show.component';
import { UsuarioUpdateComponent } from './components/datos/usuario/usuario-update/usuario-update.component';


import { LoginComponent } from './components/auxi/login/login/login.component';
import { UserlogineditComponent } from './components/auxi/login/userloginedit/userloginedit.component';
import { UserloginshowComponent } from './components/auxi/login/userloginshow/userloginshow.component';
import { UserloginupdatepassComponent } from './components/auxi/login/userloginupdatepass/userloginupdatepass.component';


import { IngresoComponent } from './components/negocio/ingreso/ingreso/ingreso.component';
import { IngresoNewComponent } from './components/negocio/ingreso/ingreso-new/ingreso-new.component';
import { IngresoShowComponent } from './components/negocio/ingreso/ingreso-show/ingreso-show.component';

import { VentaComponent } from './components/negocio/venta/venta/venta.component';
import { VentaNewComponent } from './components/negocio/venta/venta-new/venta-new.component';
import { VentaShowComponent } from './components/negocio/venta/venta-show/venta-show.component';

import { ProveedorComponent } from './components/datos/proveedor/proveedor/proveedor.component';
import { ProveedorNewComponent } from './components/datos/proveedor/proveedor-new/proveedor-new.component';
import { ProveedorShowComponent } from './components/datos/proveedor/proveedor-show/proveedor-show.component';
import { ProveedorUpdateComponent } from './components/datos/proveedor/proveedor-update/proveedor-update.component';

import { ConfiguracionComponent } from './components/auxi/configuracion/configuracion/configuracion.component';
import { ConfiguracionUpdateComponent } from './components/auxi/configuracion/configuracion-update/configuracion-update.component';

import { MenupdfComponent } from './components/auxi/pdf/menupdf/menupdf.component';
import { IdentityAdminGuard } from './guards/identity.admin.guard';
import { UsuarioService } from './services/usuario.service';

import { ErrorComponent } from './components/auxi/error/error.component';
import { ProductoStockminimoComponent } from './components/datos/producto/producto-stockminimo/producto-stockminimo.component';
import { NotificacionesoComponent } from './components/auxi/menu/notificacioneso/notificacioneso.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TipoproductoComponent,
    TipoproductoNewComponent,
    TipoproductoShowComponent,
    TipoproductoUpdateComponent,
    ProductoComponent,
    ProductoNewComponent,
    ProductoShowComponent,
    ProductoUpdateComponent,
    ErrorComponent,
    PersonaComponent,
    PersonaNewComponent,
    PersonaShowComponent,
    PersonaUpdateComponent,
    UsuarioComponent,
    UsuarioNewComponent,
    UsuarioShowComponent,
    UsuarioUpdateComponent,
    LoginComponent,
    UserlogineditComponent,
    UserloginshowComponent,
    UserloginupdatepassComponent,
    IngresoComponent,
    IngresoNewComponent,
    IngresoShowComponent,
    VentaComponent,
    VentaNewComponent,
    VentaShowComponent,
    ProveedorComponent,
    ProveedorNewComponent,
    ProveedorShowComponent,
    ProveedorUpdateComponent,
    ConfiguracionComponent,
    ConfiguracionUpdateComponent,
    MenupdfComponent,
    ProductoStockminimoComponent,
    NotificacionesoComponent,
    
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
    NgxPaginationModule 
  ],
  providers: [
    appRoutingProviders,
    DatePipe,
    IdentityAdminGuard,
    UsuarioService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
