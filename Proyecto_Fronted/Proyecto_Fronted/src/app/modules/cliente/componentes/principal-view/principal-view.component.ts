import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-view',
  standalone: false,
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.scss'
})
export class PrincipalViewComponent {

  sidenavOpened = true
  drawerOpened = true;
  
     constructor(private router:Router){}
     
     toggleSidenav() {
      this.sidenavOpened = !this.sidenavOpened;
          }
}
