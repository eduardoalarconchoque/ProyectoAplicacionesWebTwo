import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-buscar-producto',
  standalone: false,
  templateUrl: './buscar-producto.component.html',
  styleUrl: './buscar-producto.component.scss'
})
export class BuscarProductoComponent {

  searchForm: FormGroup;
  productos: any[] = [];

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      nombre: [''],
      categoriaNombre: ['']
    });
  }

  buscar() {
    const { nombre, categoriaNombre } = this.searchForm.value;
    this.adminService.buscarProductos(nombre, categoriaNombre).subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (error) => {
        console.error('Error al buscar productos:', error);
      }
    });
  }
}
