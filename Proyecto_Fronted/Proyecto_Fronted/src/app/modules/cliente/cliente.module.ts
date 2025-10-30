import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteDashboardComponent } from './componentes/cliente-dashboard/cliente-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { CarritoProductoComponent } from './componentes/carrito-producto/carrito-producto.component';
import { MiPedidoComponent } from './componentes/mi-pedido/mi-pedido.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { CrearCarritoComponent } from './componentes/crear-carrito/crear-carrito.component';
import { CrearOrdenComponent } from './componentes/crear-orden/crear-orden.component';
import { PagoOrdenComponent } from './componentes/pago-orden/pago-orden.component';
import { OpcionPagoComponent } from './componentes/opcion-pago/opcion-pago.component';
import {MatRadioModule} from '@angular/material/radio';
import { ListPagoComponent } from './componentes/list-pago/list-pago.component';
import { DetallesPedidoComponent } from './componentes/detalles-pedido/detalles-pedido.component';
import { PrincipalViewComponent } from './componentes/principal-view/principal-view.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ClienteDashboardComponent,
    CarritoProductoComponent,
    MiPedidoComponent,
    CrearCarritoComponent,
    CrearOrdenComponent,
    PagoOrdenComponent,
    OpcionPagoComponent,
    ListPagoComponent,
    DetallesPedidoComponent,
    PrincipalViewComponent

  ],
  imports: [
    ClienteRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatTooltipModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatSidenavModule,
    MatDrawer
   


    
  ]
})
export class ClienteModule { }
