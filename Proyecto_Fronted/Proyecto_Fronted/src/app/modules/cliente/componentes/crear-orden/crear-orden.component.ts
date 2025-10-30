import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../../auth/Services/storage/storage.service';

@Component({
  selector: 'app-crear-orden',
  standalone: false,
  templateUrl: './crear-orden.component.html',
  styleUrl: './crear-orden.component.scss'
})
export class CrearOrdenComponent {


  totalCarrito: number = 0; 
  cartItems: any[] = []; 
  carritoCreado: boolean = false;  
  userId: number = 0;

 ngOnInit(): void {
    this.userId = Number(StorageService.getUserId()); 
    if (isNaN(this.userId) || this.userId <= 0) {
      console.error('ID de usuario inválido o no autenticado');
      return; 
    }

  }

  constructor(
    private service: ClienteService,
    private snackBar: MatSnackBar,
    
  ) {}

  crearOrden(): void {
    this.service.crearOrdenDesdeCarrito(this.userId).subscribe({
      next: (response) => {

        const mensaje = response?.mensaje || '¡Orden creada exitosamente!';
        this.snackBar.open(mensaje, '', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.cartItems = [];
        this.totalCarrito = 0;
        this.carritoCreado = true;
      },
      error: (error) => {
        console.error('Error al crear la orden:', error);
        this.snackBar.open('Error al crear la orden. Intenta de nuevo.', '', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }




}
