import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BuscarProductoComponent } from './componentes/buscar-producto/buscar-producto.component';
import { ListaProductosComponent } from './componentes/lista-productos/lista-productos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActualizarProductoComponent } from './componentes/actualizar-producto/actualizar-producto.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';
import { OrderListComponent } from './componentes/order-list/order-list.component';
import { PagosListComponent } from './componentes/pagos-list/pagos-list.component';
import { PendientesComponent } from './componentes/pendientes/pendientes.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,   
    ProductosComponent,
     CategoriasComponent, 
     BuscarProductoComponent,
    ListaProductosComponent,
    ActualizarProductoComponent,
    UsuariosListComponent,
    OrderListComponent,
    PagosListComponent,
    PendientesComponent,

  
    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule

  ]
})
export class AdminModule { }
