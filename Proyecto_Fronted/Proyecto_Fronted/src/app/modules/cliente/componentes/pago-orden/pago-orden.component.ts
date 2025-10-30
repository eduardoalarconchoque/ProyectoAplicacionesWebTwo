import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../../../auth/Services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { OpcionPagoComponent } from '../opcion-pago/opcion-pago.component';

@Component({
  selector: 'app-pago-orden',
  standalone: false,
  templateUrl: './pago-orden.component.html',
  styleUrl: './pago-orden.component.scss'
})
export class PagoOrdenComponent {

  ordenes: any[] = [];
  displayedColumns: string[] = ['id', 'fecha', 'total', 'status', 'acciones'];
  userId: number = 1;

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public dialog:MatDialog
  ) {}

 
   ngOnInit(): void {
      this.userId = Number(StorageService.getUserId()); 
      if (isNaN(this.userId) || this.userId <= 0) {
        console.error('ID de usuario inválido o no autenticado');
        return; 
      }
      this.obtenerOrdenes();
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




//-------------------------------------------------------------------------------//
        // Abrir el diálogo de opción de pago
        openPagoDialog(orderId: number, total: number): void {
          const dialogRef = this.dialog.open(OpcionPagoComponent, {
            width: '400px',
            data: { orderId, total }  
          });
        
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.realizarPago(orderId, result); 
            }
          });
        }

  realizarPago(orderId: number, paymentDto: any): void {
    this.clienteService.pagarOrden(this.userId, orderId, paymentDto).subscribe({
      next: (response) => {
        this.snackBar.open('Pago realizado con éxito', '', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
     
      },
      error: (error) => {
        console.error('Error al pagar la orden:', error);
        this.snackBar.open('Error al realizar el pago', '', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

}
