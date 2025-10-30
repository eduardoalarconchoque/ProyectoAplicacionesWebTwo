import { Component } from '@angular/core';
import { StorageService } from './auth/Services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ejercicio_001';

  isCustomerLoggedIn:boolean=StorageService.idCustomerLoggedIn();
  isAdminLoggedIn:boolean=StorageService.idAdminLoggedIn();

  constructor(private router: Router){

  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminLoggedIn = StorageService.idAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.idCustomerLoggedIn();
      }
    });
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
