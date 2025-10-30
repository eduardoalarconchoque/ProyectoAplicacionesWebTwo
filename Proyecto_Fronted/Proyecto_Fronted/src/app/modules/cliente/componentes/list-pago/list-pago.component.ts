import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../../../auth/Services/storage/storage.service';
import { DetallesPedidoComponent } from '../detalles-pedido/detalles-pedido.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-pago',
  standalone: false,
  templateUrl: './list-pago.component.html',
  styleUrl: './list-pago.component.scss'
})
export class ListPagoComponent implements OnInit{

  userId: number = 1;
  pagos: any[] = [];
  displayedColumns: string[] = ['orderId', 'metodo', 'monto', 'status', 'fecha','acciones'];  
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator | undefined; 
  @ViewChild(MatSort) sort!: MatSort | undefined;  

  constructor(private clienteService: ClienteService,
             public dialog:MatDialog
  ) {}

  ngOnInit(): void {
     this.userId = Number(StorageService.getUserId()); 
        if (isNaN(this.userId) || this.userId <= 0) {
          console.error('ID de usuario inválido o no autenticado');
          return; 
        }
    this.obtenerPagos();
  }

  obtenerPagos(): void {
    this.loading = true;
    this.clienteService.obtenerPagos(this.userId).subscribe({
      next: (response) => {
        this.pagos = response;  
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los pagos:', error);
        this.loading = false;
      }
    });
  }




  //-----Método para abrir el MatDialog con los detalles del pago-------//
 verDetalles(pago: any): void {
  const dialogRef = this.dialog.open(DetallesPedidoComponent, {
    width: '500px',
    data: {
      orderId: pago.orderId,
      userId: this.userId,
      metodo: pago.metodo,
      monto: pago.monto,
      status: pago.status,
      fecha: pago.fecha
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró', result);
  });
  }
  


}
