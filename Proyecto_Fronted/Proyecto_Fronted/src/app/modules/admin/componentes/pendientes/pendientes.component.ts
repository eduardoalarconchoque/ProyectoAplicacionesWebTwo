import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-pendientes',
  standalone: false,
  templateUrl: './pendientes.component.html',
  styleUrl: './pendientes.component.scss'
})
export class PendientesComponent {

  usuarios: any[] = []; 
  ordenes: any[] = [];
  pagosPendientes: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
    this.cargarOrdenesPendientes();
    this.cargarPagosPendientes();
  }

  //-----------------------------------------------------------//
  cargarOrdenesPendientes(): void {
    this.adminService.obtenerOrdenesPendientes().subscribe({
      next: data => {
        console.log('Órdenes:', data);  // Verifica la estructura de los datos
        this.ordenes = data;
      },
      error: err => console.error('Error al cargar órdenes pendientes', err)
    });
  }
  

//------------------------------------------------------------//
cargarPagosPendientes(): void {
  this.adminService.obtenerPagosPendientes().subscribe({
    next: data => {
      console.log('Pagos pendientes:', data); // <-- Asegúrate de ver esto
      this.pagosPendientes = data;
    },
    error: err => console.error('Error al cargar pagos pendientes', err)
  });
}


}
