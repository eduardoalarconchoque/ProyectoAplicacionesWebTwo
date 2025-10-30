import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-opcion-pago',
  standalone: false,
  templateUrl: './opcion-pago.component.html',
  styleUrl: './opcion-pago.component.scss'
})
export class OpcionPagoComponent {
   
   monto: number = 0;
   paymentMethod: string = '';  

   constructor(
     public dialogRef: MatDialogRef<OpcionPagoComponent>, 
     @Inject(MAT_DIALOG_DATA) public data: any  
   ) {}
 
   ngOnInit(): void {
    this.monto = this.data.total; 
  }

   
   onNoClick(): void {
     this.dialogRef.close();
   }
 

   onPay(): void {
    const paymentDto = {
      metodo: this.paymentMethod,
      monto: this.monto
    };
    this.dialogRef.close(paymentDto);
  }
}
