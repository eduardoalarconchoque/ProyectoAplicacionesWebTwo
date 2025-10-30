import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  sidenavOpened = true
  drawerOpened = true;
  
     constructor(private router:Router){}
     
     toggleSidenav() {
      this.sidenavOpened = !this.sidenavOpened;
          }
}

