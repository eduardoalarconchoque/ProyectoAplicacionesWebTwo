import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../../../auth/Services/storage/storage.service';

@Component({
  selector: 'app-crear-carrito',
  standalone: false,
  templateUrl: './crear-carrito.component.html',
  styleUrl: './crear-carrito.component.scss'
})
export class CrearCarritoComponent implements OnInit{

  userId: number = 1;
  products: any[] = [];
  cartItems: any[] = []; 
  carritoCreado: boolean = false; 
  totalCarrito: number = 0; 


  constructor(
    private service: ClienteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearCarritoComponent>
  ){}

  ngOnInit(): void {

    this.userId = Number(StorageService.getUserId()); 
    if (isNaN(this.userId) || this.userId <= 0) {
      console.error('ID de usuario inválido o no autenticado');
      return; 
    }
    this.ObtenerProductosCarrito(this.userId);
  }

  // para crear carrito 
crearCarrito(): void {
  console.log('UserId que se muestra al crear carrito :', this.userId);
  this.service.crearCarrito(this.userId).subscribe({
    next: () => {
      this.carritoCreado = true;
      this.mostrarMensaje('Carrito creado exitosamente.', 'success');
      this.ObtenerProductosCarrito(this.userId); 
      this.dialogRef.close(); 
    },
    error: (err) => {
      console.error('Error real:', err); 
      this.mostrarMensaje('Se creo carrito .', 'error');
    }
  });
}


mostrarMensaje(mensaje: string, tipo: string): void {
  this.snackBar.open(mensaje, '', {
    duration: 3000,
    panelClass: [tipo === 'success' ? 'success-snackbar' : tipo === 'error' ? 'error-snackbar' : 'warning-snackbar']
  });
}


ObtenerProductosCarrito(userId: number): void {
  this.service.getCartItems(userId).subscribe(
    (data: any[]) => {
      if (data.length > 0) {
        this.cartItems = data; 
        this.carritoCreado = true;
        this.calcularTotal();
      }
    },
    (error) => {
      console.error('Error al obtener los artículos del carrito:', error);
    }
  );

}

  calcularTotal(): void {
  this.totalCarrito = this.cartItems.reduce((accum, item) => {
    return accum + (item.precio * item.cantidad); 
  }, 0);
}
 









}
