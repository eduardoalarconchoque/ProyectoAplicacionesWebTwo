import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarProductoComponent } from '../actualizar-producto/actualizar-producto.component';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-lista-productos',
  standalone: false,
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent implements OnInit {


 displayedColumns: string[] = ['imagen', 'nombre', 'descripcion', 'precio', 'acciones'];
 dataSource = new MatTableDataSource<any>();
 productos: any[] = [];
 searchForm: FormGroup;
 categoriaIdSeleccionada: number = 1; 
 productoSeleccionado: any;
 mostrarFormularioActualizar = false;

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 @ViewChild('sidenav') sidenav!: MatSidenav; 

 constructor(private adminService: AdminService,
             private fb: FormBuilder,
             public dialog: MatDialog
             ) {
 
   this.searchForm = this.fb.group({
     nombre: [''],
     categoriaNombre: ['']
   });
 }

 ngOnInit(): void {
   this.obtenerProductosPorCategoria();
 }

 
 obtenerProductosPorCategoria() {
   this.adminService.getProductosPorCategoria(this.categoriaIdSeleccionada).subscribe({
     next: (data) => {
       this.productos = data;
       this.dataSource.data = data;
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     },
     error: (err) => {
       console.error('Error al traer productos por categoría', err);
     }
   });
 }

 buscar() {
   const { nombre, categoriaNombre } = this.searchForm.value;

   this.adminService.buscarProductos(nombre, categoriaNombre).subscribe({
     next: (productos) => {
       this.productos = productos;
       this.dataSource.data = productos; 
     },
     error: (error) => {
       console.error('Error al buscar productos:', error);
     }
   });
 }

 
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }


  
  eliminarProducto(productId: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.adminService.eliminarProducto(productId).subscribe({
        next: () => {
          console.log('Producto eliminado');
          this.obtenerProductosPorCategoria(); 
        },
        error: (error) => {
          console.error('Error al eliminar producto', error);
        }
      });
    }
  }



  //----------------------------------------------------------------------//

   abrirModalActualizar(producto: any): void {
    const dialogRef = this.dialog.open(ActualizarProductoComponent, {
      width: '500px', 
      data: { product: producto } 
    });

   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        this.obtenerProductosPorCategoria();
      }
    });
  }

  


  
}
