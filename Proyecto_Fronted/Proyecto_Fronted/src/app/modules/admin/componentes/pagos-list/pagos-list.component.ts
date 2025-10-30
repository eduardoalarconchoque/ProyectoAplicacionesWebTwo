import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { StorageService } from '../../../../auth/Services/storage/storage.service';

@Component({
  selector: 'app-pagos-list',
  standalone: false,
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.scss'
})
export class PagosListComponent implements OnInit{
  
  userId:number = 0;
  displayedColumns: string[] = ['userNombre', 'orderId', 'metodo', 'monto', 'status', 'fecha'];
  dataSource = new MatTableDataSource<any>();
  loading = false;
  pagoDetalles: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
     this.userId = Number(StorageService.getUserId()); 
        if (isNaN(this.userId) || this.userId <= 0) {
          console.error('ID de usuario inválido o no autenticado');
          return; 
        }
        this.obtenerPagosPorUsuario(this.userId);

        //--------------------------------------//
        this.dataSource.filterPredicate = (data, filter) => {
          const texto = filter.trim().toLowerCase();
          return data.userNombre.toLowerCase().includes(texto) ||
                 data.orderId.toString().includes(texto); // puedes agregar más campos si deseas
        };

    this.loading = true;
    this.adminService.getTodosLosPagos().subscribe({
      next: (pagos) => {
        this.dataSource.data = pagos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar pagos:', err);
        this.loading = false;
      }
    });
  }


  aplicarFiltroManual(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  

  verDetallesPago(orderId: number): void {
    this.loading = true;
    this.adminService.obtenerPagoPorOrden(orderId).subscribe({
      next: (pago) => {
        this.pagoDetalles = pago;
        this.loading = false;
        console.log('Detalles del pago:', pago); 
      },
      error: (err) => {
        console.error('Error al obtener detalles del pago:', err);
        this.loading = false;
      }
    });
  }

  obtenerPagosPorUsuario(userId: number): void {
    this.loading = true;
    this.adminService.obtenerPagosPorUsuario(userId).subscribe({
      next: (pagos) => {
        this.dataSource.data = pagos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar pagos:', err);
        this.loading = false;
      }
    });
  }

}
