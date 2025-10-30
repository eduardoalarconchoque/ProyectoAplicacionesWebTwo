import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
     
  categorias: any[] = []; 
  nuevaCategoria = { nombre: '' };
  categoriaEditada = { id: null, nombre: '' }

  constructor(private adminService:AdminService){}

  //---obtener la lista de categorias ----//
  ngOnInit(): void {
    this.adminService.getCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }
  
  //---------agregar una nueva categoria---//
  agregarCategoria(): void {
    if (this.nuevaCategoria.nombre) {
      this.adminService.agregarCategoria(this.nuevaCategoria).subscribe(
        (data) => {
          this.categorias.push(data); 
          this.nuevaCategoria.nombre = ''; 
        },
        (error) => {
          console.error('Error al agregar categoría:', error);
        }
      );
    }
  }

   // Actualizar categoría
   actualizarCategoria(): void {
    if (this.categoriaEditada.id && this.categoriaEditada.nombre) {
      this.adminService.actualizarCategoria(this.categoriaEditada.id, this.categoriaEditada).subscribe(
        (success) => {
          if (success) {
          
            const index = this.categorias.findIndex(categoria => categoria.id === this.categoriaEditada.id);
            if (index !== -1) {
              this.categorias[index].nombre = this.categoriaEditada.nombre;
            }
            this.categoriaEditada = { id: null, nombre: '' }; 
          }
        },
        (error) => {
          console.error('Error al actualizar la categoría:', error);
        }
      );
    }
  }
  eliminarCategoria(id: number): void {
    this.adminService.eliminarCategoria(id).subscribe(
      (success) => {
        if (success) {
          this.categorias = this.categorias.filter(categoria => categoria.id !== id);
        }
      },
      (error) => {
        console.error('Error al eliminar la categoría:', error);
      }
    );
  }

  editarCategoria(categoria: any): void {
    this.categoriaEditada = { id: categoria.id, nombre: categoria.nombre };
  }
}
