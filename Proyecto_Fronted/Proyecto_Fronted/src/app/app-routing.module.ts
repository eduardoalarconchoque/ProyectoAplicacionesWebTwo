import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { AcercaDeNosotrosComponent } from './auth/acerca-de-nosotros/acerca-de-nosotros.component';
import { MiPedidoComponent } from './modules/cliente/componentes/mi-pedido/mi-pedido.component';
import { PagoOrdenComponent } from './modules/cliente/componentes/pago-orden/pago-orden.component';
import { ListPagoComponent } from './modules/cliente/componentes/list-pago/list-pago.component';


const routes: Routes = [
  { path: '', redirectTo: 'acerca-de-nosotros', pathMatch: 'full' },  
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  {path:'acerca-de-nosotros',component:AcercaDeNosotrosComponent},
  //{path:'pedido',component:MiPedidoComponent},
  //{path:'ordenes',component:PagoOrdenComponent},-->
  //{path:'listaPagos',component:ListPagoComponent},-->
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'cliente', loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule) },
  { path: '**', redirectTo: 'acerca-de-nosotros' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
