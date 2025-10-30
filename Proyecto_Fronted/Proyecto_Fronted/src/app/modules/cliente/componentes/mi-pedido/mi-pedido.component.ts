import { Component, Inject, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../../../auth/Services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CrearCarritoComponent } from '../crear-carrito/crear-carrito.component';
import { CrearOrdenComponent } from '../crear-orden/crear-orden.component';


@Component({
  selector: 'app-mi-pedido',
  standalone: false,
  templateUrl: './mi-pedido.component.html',
  styleUrls: ['./mi-pedido.component.scss']
})
export class MiPedidoComponent implements OnInit {


  userId: number = 1;
  products: any[] = [];
  cartItems: any[] = []; 
  displayedColumns: string[] = ['imagen', 'nombre', 'descripcion', 'precio', 'cantidad', 'stock', 'acciones'];
  carritoCreado: boolean = false;  
  totalCarrito: number = 0; 

  constructor(
    private service: ClienteService,
    private snackBar: MatSnackBar ,
     private dialog: MatDialog) {}


  getAllProducts(): void {
    this.service.getAllProducts().subscribe(
      (res) => {
        console.log(res); 
        this.products = res.map((product: any) => ({
          ...product,
          processedImg: `data:image/jpeg;base64,${product.returnedImg}` 
        }));
      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
  }

  getImageUrl(product: any): string {
    if (product.imagen) {
      return `data:image/jpeg;base64,${product.imagen}`;
    } else if (product.returnedImagen) {
      return `data:image/jpeg;base64,${product.returnedImagen}`;
    } else {
      return 'assets/default-product-image.jpg';  
    }
  }

//-------------------------------------------------------------//

  ngOnInit(): void {
    this.userId = Number(StorageService.getUserId()); 
    if (isNaN(this.userId) || this.userId <= 0) {
      console.error('ID de usuario inválido o no autenticado');
      return; 
    }
    this.ObtenerProductosCarrito(this.userId);
    this.obtenerTotalCarrito(this.userId);
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


  // -------para sumar los precios -------------------------//
  obtenerTotalCarrito(userId: number): void {
    this.service.getTotalCarrito(userId).subscribe(
      (total) => {
        this.totalCarrito = total.total;  // Asignar el total a la propiedad totalCarrito
        console.log('Total del carrito:', this.totalCarrito);
      },
      (error) => {
        console.error('Error al obtener el total del carrito:', error);
      }
    );
  }



  //-----------------------------------------------------------------------------------//

  mostrarMensaje(mensaje: string, tipo: string): void {
    this.snackBar.open(mensaje, '', {
      duration: 3000,
      panelClass: [tipo === 'success' ? 'success-snackbar' : tipo === 'error' ? 'error-snackbar' : 'warning-snackbar']
    });
  }


   //--------------------------para eliminar productos de un carrito---------------------------------------//
   eliminarItemDelCarrito(cartItemId: number): void {
    console.log("Eliminando item con ID:", cartItemId);
    this.service.eliminarItemDelCarrito(cartItemId).subscribe({
      next: () => {
        this.mostrarMensaje('Producto eliminado del carrito.', 'success');
        this.ObtenerProductosCarrito(this.userId);  
        this.obtenerTotalCarrito(this.userId);
      },
      error: (err) => {
        console.error('Error real:', err); 
        this.mostrarMensaje('Error al eliminar el producto del carrito.', 'error');
      }
    });
  }
  

  crearOrden(): void {
    const dialogRef = this.dialog.open(CrearOrdenComponent, {
      width: '400px',  // El tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ordenCreada') {
        this.crearOrden(); // Si el diálogo confirma la creación de la orden, ejecutamos la lógica
      }
    });
  }
  
       
}
