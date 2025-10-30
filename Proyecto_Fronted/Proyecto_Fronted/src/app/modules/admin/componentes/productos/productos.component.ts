import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {

  postProductForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listaCategorias: any[] = [];
  categoriaId: number = 1;
  productos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postProductForm = this.fb.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required],
      categoriaId: [null, Validators.required],
    });
    this.adminService.getCategorias().subscribe((res) => {
      this.listaCategorias = res;
    });
    this.getProductosPorCategoria(this.categoriaId);
  }

  getProductosPorCategoria(categoriaId: number): void {
    this.adminService.getProductosPorCategoria(categoriaId).subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: () => {
        this.snackBar.open('Error al obtener productos', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event?.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  postProduct() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    } 
    formData.append('nombre', this.postProductForm.get('nombre')?.value);
    formData.append('descripcion', this.postProductForm.get('descripcion')?.value);
    formData.append('precio', this.postProductForm.get('precio')?.value.toString());
    formData.append('stock', this.postProductForm.get('stock')?.value.toString());
    formData.append('categoriaId', this.postProductForm.get('categoriaId')?.value.toString());  
    this.adminService.agregarProducto(formData).subscribe({
      next: (res) => {
        this.snackBar.open('Producto agregado con éxito', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: () => { 
        this.snackBar.open('Error al agregar producto', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }


  onCategoriaChange(categoriaId: number) {
    this.getProductosPorCategoria(categoriaId);
  }


}
