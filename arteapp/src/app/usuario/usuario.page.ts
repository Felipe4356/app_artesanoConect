import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  user: any;
  isAdmin: boolean = false;
  constructor(private local:localStorageService, private router: Router)  { }

  

  ngOnInit() {
    this.isAdmin = this.user && this.user.name === 'admin'; 
    this.user = this.local.getUser();
    
  }

  editProfile() {
    this.router.navigate(['/editor-user']);
  }

  logout() {
 
   //has lo mismo donde se navega url para volvera a la pagina de login quita los datos del usuario para poder ingresar de nuevo con otro usuario
    this.local.logout();
    this.router.navigateByUrl('/login');


   

  }


  goToAdminPage() {
    // Navegar a la página de administración
    this.router.navigate(['/admin']);
  }


  
  
}