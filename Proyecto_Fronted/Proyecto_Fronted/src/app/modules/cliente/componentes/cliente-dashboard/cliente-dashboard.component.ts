import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarritoProductoComponent } from '../carrito-producto/carrito-producto.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrearCarritoComponent } from '../crear-carrito/crear-carrito.component';


@Component({
  selector: 'app-cliente-dashboard',
  standalone: false,
  templateUrl: './cliente-dashboard.component.html',
  styleUrls: ['./cliente-dashboard.component.scss']
})
export class ClienteDashboardComponent implements OnInit{

  cartItems: any[] = []; 
  products: any[] = [];
  userId = 1;
  categories: any[] = [];
  searchName: string = '';
  selectedCategoryId: number = 1;
  searchForm!: FormGroup ;
  
  constructor(
    private service: ClienteService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(){
    this.searchForm = this.fb.group({
      searchName: [''], 
      selectedCategoryId: [1] 
    });
  
    this.getAllProducts();
    this.getCategories();  
   
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
      } else{
        return 'assets/default-product-image.jpg';  
      } 
    }

    
    



    getCategories(): void {
      this.service.getCategorias().subscribe(
        (res) => {
          this.categories = res;
        },
        (error) => {
          console.error('Error al obtener las categorías:', error);
        }
      );
    }


    
    getSearchResults(): void {
      const { searchName, selectedCategoryId } = this.searchForm.value;    
      this.service.buscarProductos(searchName, selectedCategoryId).subscribe({
        next: (res) => {
          this.products = res.map((product: any) => ({
            ...product,
            processedImg: `data:image/jpeg;base64,${product.returnedImg}` 
          }));
        },
        error: (error) => {
          console.error('Error al realizar la búsqueda de productos:', error);  
        }
      });
    }

    abrirCarritoProducto(product: any) {
      this.dialog.open(CarritoProductoComponent, {
        width: '400px',
        data: { product: product }, 
      });
    }






///para llamar al componente de crear carrito 
abrirDialogoCrearCarrito(): void {
  const dialogRef = this.dialog.open(CrearCarritoComponent, {
    width: '500px',
    disableClose: true,
    autoFocus: true
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Diálogo de creación de carrito cerrado');
  });
}



 



   
}
