import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { BuscarProductoComponent } from './componentes/buscar-producto/buscar-producto.component';
import { ListaProductosComponent } from './componentes/lista-productos/lista-productos.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';
import { OrderListComponent } from './componentes/order-list/order-list.component';
import { PagosListComponent } from './componentes/pagos-list/pagos-list.component';
import { PendientesComponent } from './componentes/pendientes/pendientes.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: AdminDashboardComponent, 
    children: [
      { path: "", redirectTo: "productos", pathMatch: "full" },
      { path: "productos", component: ProductosComponent },
      {path:"categorias", component:CategoriasComponent},
      {path:"buscar",component:BuscarProductoComponent},
      {path:"lista",component:ListaProductosComponent},
      {path:"listaUsuarios",component:UsuariosListComponent},
      {path:"listaOrdenes",component:OrderListComponent},
      {path:"listaPagos",component:PagosListComponent},
      {path:"pendientes",component:PendientesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
