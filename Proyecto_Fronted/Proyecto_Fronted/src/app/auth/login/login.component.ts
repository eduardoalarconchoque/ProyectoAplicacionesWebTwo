import { Component } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../Services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loading = false;
  errorMessage: string = '';
  hidePassword = true;

    constructor(
      private authService:AuthService,
      private router:Router,
      private fb : FormBuilder,
      private storageSerivce:StorageService
    ){}        

      ngOnInit(){
        this.loginForm= this.fb.group({
          email:[null,[Validators.email,Validators.required]],
          password:[null,[Validators.required]]
        })
      }

      
   login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res)=>{
     console.log(res);
     if(res.userId != null){
       const user = {
         id: res.userId,
         role: res.userRole
       }
       StorageService.saveUser( user);
       StorageService.saveToken(res.jwt);
       if(StorageService.idAdminLoggedIn()){
       this.router.navigateByUrl("/admin/dashboard");
       }else if (StorageService.idCustomerLoggedIn()){
         this.router.navigateByUrl("/cliente/dashboard");
      //  this.router.navigate(['/cliente/dashboard/dashboard']);
       }else {
    
        this.errorMessage = 'Usuario o contraseña inválidos.';
       }
     }
    })
}
}
