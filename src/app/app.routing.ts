//IMPORTS NECESARIO
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//IMPORTAR COMPONENTES
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

import { ProveedorComponent } from './components/datos/proveedor/proveedor/proveedor.component';
import { ProveedorNewComponent } from './components/datos/proveedor/proveedor-new/proveedor-new.component';
import { ProveedorShowComponent } from './components/datos/proveedor/proveedor-show/proveedor-show.component';
import { ProveedorUpdateComponent } from './components/datos/proveedor/proveedor-update/proveedor-update.component';

import { UsuarioComponent } from './components/datos/usuario/usuario/usuario.component';
import { UsuarioNewComponent } from './components/datos/usuario/usuario-new/usuario-new.component';
import { UsuarioShowComponent } from './components/datos/usuario/usuario-show/usuario-show.component';
import { UsuarioUpdateComponent } from './components/datos/usuario/usuario-update/usuario-update.component';


import { LoginComponent } from './components/auxi/login/login/login.component';
import { UserlogineditComponent } from './components/auxi/login/userloginedit/userloginedit.component';
import { UserloginshowComponent } from './components/auxi/login/userloginshow/userloginshow.component';
import { UserloginupdatepassComponent } from './components/auxi/login/userloginupdatepass/userloginupdatepass.component';
import { UserregisterComponent } from './components/auxi/login/userregister/userregister.component';


import { IngresoComponent } from './components/negocio/ingreso/ingreso/ingreso.component';
import { IngresoNewComponent } from './components/negocio/ingreso/ingreso-new/ingreso-new.component';
import { IngresoShowComponent } from './components/negocio/ingreso/ingreso-show/ingreso-show.component';

import { VentaComponent } from './components/negocio/venta/venta/venta.component';
import { VentaNewComponent } from './components/negocio/venta/venta-new/venta-new.component';
import { VentaShowComponent } from './components/negocio/venta/venta-show/venta-show.component';


import { PedidoClienteComponent } from './components/negocio/pedidoCliente/pedido-cliente/pedido-cliente.component';
import { PedidoClienteCarritoComponent } from './components/negocio/pedidoCliente/pedido-cliente-carrito/pedido-cliente-carrito.component';
import { PedidoClienteUserComponent } from './components/negocio/pedidoCliente/pedido-cliente-user/pedido-cliente-user.component';
import { PedidoClienteShowComponent } from './components/negocio/pedidoCliente/pedido-cliente-show/pedido-cliente-show.component';


import { ConfiguracionComponent } from './components/auxi/configuracion/configuracion/configuracion.component';
import { ConfiguracionUpdateComponent } from './components/auxi/configuracion/configuracion-update/configuracion-update.component';
import { MenupdfComponent } from './components/auxi/pdf/menupdf/menupdf.component';

import { IdentityAdminGuard } from './guards/identity.admin.guard';
import { IdentityClienteGuard } from './guards/identity.cliente.guard';

import { ErrorComponent } from './components/auxi/error/error.component';


//import { AuthGuard } from '../app/guards/auth.guard';


//DEFINIR RUTAS
const appRoutes: Routes = [
  { path: '',               component: HomeComponent },
  { path: 'inicio',         component: HomeComponent },
 
  { path: 'tipoproducto',    component: TipoproductoComponent  },
  { path: 'nuevotipoproducto',    component: TipoproductoNewComponent  },
  { path: 'vertipoproducto/:id',    component: TipoproductoShowComponent  },
  { path: 'actualizartipoproducto/:id',    component: TipoproductoUpdateComponent , canActivate:[IdentityAdminGuard] },
  
  { path: 'producto',           component: ProductoComponent  },
  { path: 'nuevoproducto',      component: ProductoNewComponent  },
  { path: 'verproducto/:id',     component: ProductoShowComponent  },
  { path: 'actualizarproducto/:id',     component: ProductoUpdateComponent , canActivate:[IdentityAdminGuard] },

  
  { path: 'persona',           component: PersonaComponent  },
  { path: 'nuevapersona',      component: PersonaNewComponent  },
  { path: 'verpersona/:id',     component: PersonaShowComponent  },
  { path: 'actualizarpersona/:id',     component: PersonaUpdateComponent , canActivate:[IdentityAdminGuard] },

  { path: 'proveedor',           component: ProveedorComponent  },
  { path: 'nuevoproveedor',      component: ProveedorNewComponent  },
  { path: 'verproveedor/:id',     component: ProveedorShowComponent  },
  { path: 'actualizarproveedor/:id',     component: ProveedorUpdateComponent  , canActivate:[IdentityAdminGuard]},


  { path: 'usuario',           component: UsuarioComponent  },
  { path: 'nuevousuario',      component: UsuarioNewComponent  },
  { path: 'verusuario/:id',     component: UsuarioShowComponent  },
  { path: 'actualizarusuario/:id',     component: UsuarioUpdateComponent , canActivate:[IdentityAdminGuard] },  

  { path: 'ajusteusuario',           component: UserlogineditComponent  },
  { path: 'login',           component: LoginComponent },
  { path: 'logout/:sure',    component: LoginComponent },
  { path: 'usuariolog', component: UserloginshowComponent},
  { path: 'usuariochpass', component: UserloginupdatepassComponent},
  { path: 'usuarioregistro', component: UserregisterComponent},



  { path: 'pedidocliente',           component: PedidoClienteComponent , canActivate:[IdentityClienteGuard] },
  { path: 'pedidoclientecarrito',           component: PedidoClienteCarritoComponent , canActivate:[IdentityClienteGuard] },
  { path: 'mispedidos',           component: PedidoClienteUserComponent, canActivate:[IdentityClienteGuard] },
  { path: 'verpedido/:id',           component: PedidoClienteShowComponent, canActivate:[IdentityClienteGuard] },
  


  { path: 'ingreso',           component: IngresoComponent  },
  { path: 'nuevoingreso',      component: IngresoNewComponent  },
  { path: 'veringreso/:id',     component: IngresoShowComponent  },
  
  { path: 'venta',           component: VentaComponent  },
  { path: 'nuevaventa',      component: VentaNewComponent  },
  { path: 'verventa/:id',     component: VentaShowComponent  },

  { path: 'configuracion',           component: ConfiguracionComponent  , canActivate:[IdentityAdminGuard]},
  { path: 'actualizarconfiguracion/:id',     component: ConfiguracionUpdateComponent , canActivate:[IdentityAdminGuard]  },

  { path: 'pdf',           component: MenupdfComponent  },

  
  { path: '**',             component: ErrorComponent  },
];

//EXPORTAR CONFIGURACION
export const appRoutingProviders:any[] = [] ;
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

