import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  
  usuarios: any[] = []; 
  ordenes: any[] = [];
  userId: number = 0;
  mensaje: string = '';
  displayedColumns: string[] = ['id', 'userNombre', 'fecha', 'total', 'status','acciones'];  // Columnas a mostrar en la tabla
  dataSource = new MatTableDataSource<any>(this.ordenes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buscarOrdenesPorUsuario(): void {
    if (!this.userId) {
      this.mensaje = 'Por favor ingresa un ID de usuario válido.';
      this.ordenes = [];
      this.dataSource.data = [];
      return;
    }

    this.adminService.obtenerOrdenesPorUsuario(this.userId).subscribe({
      next: (data) => {
        this.ordenes = data;
        this.dataSource.data = this.ordenes;  
        this.mensaje = data.length === 0 ? 'No se encontraron órdenes para este usuario.' : '';
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al cargar las órdenes del usuario.';
        this.ordenes = [];
        this.dataSource.data = [];
      }
    });
  }



  getSiguienteEstado(estadoActual: string): string | null {
    const estados = ['PENDIENTE', 'PROCESANDO', 'ENVIADO', 'ENTREGADO'];
    const indice = estados.indexOf(estadoActual);
    if (indice >= 0 && indice < estados.length - 1) {
      return estados[indice + 1];
    }
    return null;
  }
  cambiarEstadoOrden(order: any): void {
    const siguiente = this.getSiguienteEstado(order.status);
    if (!siguiente) {
      this.mensaje = `La orden ${order.id} ya está en el estado final.`;
      return;
    }
  
    this.adminService.actualizarEstadoDeOrden(order.id, siguiente).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.mensaje = `Orden ${order.id} actualizada a ${siguiente}.`;
          this.buscarOrdenesPorUsuario(); // o recargar tabla
        } else {
          this.mensaje = `No se pudo actualizar la orden ${order.id}.`;
        }
      },
      error: err => {
        console.error('Error al actualizar estado', err);
        this.mensaje = `Error al actualizar la orden ${order.id}.`;
      }
    });
  }

 
  
}
