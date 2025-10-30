import { Component, Inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-actualizar-producto',
  standalone: false,
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.scss']

})
export class ActualizarProductoComponent {
  
  product: any; 
  formularioProducto: FormGroup;
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null; 

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<ActualizarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = { ...data.product }; 
    this.formularioProducto = this.fb.group({
      nombre: [this.product.nombre, Validators.required],
      descripcion: [this.product.descripcion, Validators.required],
      precio: [this.product.precio, [Validators.required, Validators.min(0)]],
      stock: [this.product.stock, [Validators.required, Validators.min(0)]],
      returnedImagen: [this.product.returnedImagen] 
    });
    
   }


   onFileSelected(event: any): void {
    this.selectedFile = event?.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  actualizarProducto(): void {
    if (this.formularioProducto.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('nombre', this.formularioProducto.get('nombre')?.value);
    formData.append('descripcion', this.formularioProducto.get('descripcion')?.value);
    formData.append('precio', this.formularioProducto.get('precio')?.value.toString());
    formData.append('stock', this.formularioProducto.get('stock')?.value.toString());
  
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }
    this.adminService.actualizarProducto(this.product.id, formData).subscribe({
      next: (res) => {
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.error('Error al actualizar producto', err);
      }
    });
  }
  








  onCancel(): void {
    this.dialogRef.close(); 
  }
}
