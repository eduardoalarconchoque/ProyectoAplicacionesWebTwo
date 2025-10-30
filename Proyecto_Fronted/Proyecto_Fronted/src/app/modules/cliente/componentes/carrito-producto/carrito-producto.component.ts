import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from './../../../../auth/Services/storage/storage.service';

@Component({
  selector: 'app-carrito-producto',
  standalone: false,
  templateUrl: './carrito-producto.component.html',
  styleUrls:['./carrito-producto.component.scss']
})
export class CarritoProductoComponent{
  
  products: any[] = [];
  cantidad: number = 1;
  selectedProduct: any = null;  
  userId: number = 0;

  constructor(
    private service: ClienteService,
    public dialogRef: MatDialogRef<CarritoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
  ) {}

  
  ngOnInit(): void {

    this.selectedProduct = this.data.product; 
    console.log('Producto seleccionado:', this.selectedProduct);
    // Obtener id del cliente 
    this.userId = Number(StorageService.getUserId());  

    // muestra el id si se recupera correctamente t.t
    console.log("ID Usuario:", this.userId);

  }
  
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





  // para agregar cosas a tu carrito ------//
  agregarAlCarrito() {
    const product = this.selectedProduct;
    console.log('Producto a agregar:', product);
  
    this.clienteService.agregarAlCarrito(this.userId, product.id, this.cantidad).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);
        this.snackBar.open('Producto agregado al carrito', 'Cerrar', { duration: 2000 });
        this.dialogRef.close();
      },
      error => {
        console.error('Error al agregar al carrito:', error);
        this.snackBar.open('Error al agregar al carrito', 'Cerrar', { duration: 2000 });
      }
    );
  }
  

  cerrar() {
    this.dialogRef.close();
  }
}
