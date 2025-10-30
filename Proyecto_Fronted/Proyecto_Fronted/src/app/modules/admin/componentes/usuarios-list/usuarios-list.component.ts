import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-list',
  standalone: false,
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.scss'
})
export class UsuariosListComponent {

  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones']; 
  usuarios: any[] = []; 

  constructor(private adminService: AdminService,
                  private snackBar: MatSnackBar
               ) {}

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }



  obtenerUsuarios() {
    this.adminService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      }
    });
  }
  eliminarUsuario(userId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.adminService.eliminarUsuario(userId).subscribe({
        next: (success) => {
          if (success) {
            this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.obtenerUsuarios(); 
          } else {
            this.snackBar.open('No se pudo eliminar el usuario', 'Cerrar', { duration: 2000 });
          }
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar el usuario', 'Cerrar', { duration: 2000 });
        }
      });
    }
  }


}
