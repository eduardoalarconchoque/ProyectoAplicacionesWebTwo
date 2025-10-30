import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

      signupForm!: FormGroup;
      hidePassword = true;         
      errorMessage = '';

     constructor(private fb: FormBuilder,
      private authService:AuthService,
      private router: Router){}


      ngOnInit (){
        this.signupForm = this.fb.group({
          nombre:[null,[Validators.required]],
          email:[null,[Validators.required, Validators.email]],
          password:[null,[Validators.required]],
          checkPassword:[null,[Validators.required, this.confirmationValidate]],
    
        })
      }
      confirmationValidate = (control: FormControl): { [s: string]: boolean} =>{
        if(!control.value){
          return{ required: true};
        }else if (control.value !== this.signupForm.controls['password'].value){
          return{ confirm: true, error: true};
        }
        return{};
      };
    
      register(){
        if (this.signupForm.invalid) {
          this.errorMessage = 'Por favor completa todos los campos correctamente.';
          return;
        }
    
        this.authService.register(this.signupForm.value).subscribe({
          next: res => {
            if (res.id) {
              this.router.navigateByUrl('/login');
            } else {
              this.errorMessage = 'No se pudo crear la cuenta.';
            }
          },
          error: err => {
            console.error(err);
            this.errorMessage = 'Error en el servidor.';
          }
        });
      }
}
