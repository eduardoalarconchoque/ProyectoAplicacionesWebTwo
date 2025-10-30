import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDashboardComponent } from './componentes/cliente-dashboard/cliente-dashboard.component';
import { CarritoProductoComponent } from './componentes/carrito-producto/carrito-producto.component';
import { PrincipalViewComponent } from './componentes/principal-view/principal-view.component';
import { MiPedidoComponent } from './componentes/mi-pedido/mi-pedido.component';
import { PagoOrdenComponent } from './componentes/pago-orden/pago-orden.component';
import { ListPagoComponent } from './componentes/list-pago/list-pago.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PrincipalViewComponent,
    children: [
      { path: '', component: ClienteDashboardComponent }, 
      { path: 'dashboard', component: ClienteDashboardComponent },
      { path: 'pedido', component: MiPedidoComponent },
      { path: 'ordenes', component: PagoOrdenComponent },
      { path: 'listaPagos', component: ListPagoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
