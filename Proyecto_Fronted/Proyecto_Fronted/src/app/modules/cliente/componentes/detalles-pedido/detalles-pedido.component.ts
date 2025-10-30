import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../../../auth/Services/storage/storage.service';
import * as FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-detalles-pedido',
  standalone: false,
  templateUrl: './detalles-pedido.component.html',
  styleUrl: './detalles-pedido.component.scss'
})
export class DetallesPedidoComponent {
  
  loading = false; 
  ordenes: any[] = [];
  userId: number = 1;
  pagos: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private clienteService: ClienteService,
  private snackBar: MatSnackBar) {}  

  ngOnInit(): void {
    
    // Obtener ID del usuario desde el StorageService
    const storedUserId = StorageService.getUserId();
    this.userId = Number(storedUserId);

    if (isNaN(this.userId) || this.userId <= 0) {
      console.error('ID de usuario inválido o no autenticado');
      this.snackBar.open('Usuario no autenticado o ID inválido.', '', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.obtenerOrdenes(); // Cargar órdenes del usuario

    // Validación de datos inyectados
    const orderId = this.data?.orderId;
    const dialogUserId = this.data?.userId;

    if (!orderId || !dialogUserId) {
      console.error('Faltan datos necesarios para descargar el PDF');
      this.snackBar.open('Datos incompletos para mostrar detalles del pedido.', '', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

      //MOMENTANIO 
     // this.descargarDetalles(orderId, dialogUserId); // Descargar PDF si todo está bien
  }


 
  obtenerOrdenes(): void {
    this.clienteService.getOrdenesPorUsuario(this.userId).subscribe({
      next: (ordenes) => {
        this.ordenes = ordenes;
      },
      error: (error) => {
        console.error('Error al obtener las órdenes:', error);
        this.snackBar.open('Error al obtener las órdenes del usuario.', '', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  descargarDetalles(orderId: number, userId: number): void {
    this.loading = true;
    this.clienteService.descargarOrdenPdf(orderId, userId).subscribe({
      next: (pdfBlob: Blob) => {
        const fileName = `detalle_pedido_${orderId}.pdf`;
        FileSaver.saveAs(pdfBlob, fileName);
      },
      error: err => {
        const reader = new FileReader();
        reader.onload = () => {
          console.error('Respuesta de error al descargar PDF ', reader.result);
        };
        if (err.error instanceof Blob) {
          reader.readAsText(err.error);
        }

        this.snackBar.open('Error al descargar el PDF. Inténtalo de nuevo más tarde.', '', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }


 
}
