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

  constructor(private local:localStorageService, private router: Router)  { }

  

  ngOnInit() {
    this.user = this.local.getUser();
  }

  editProfile() {
    this.router.navigate(['/editor-user']);
  }

  logout() {
 
   //has lo mismo donde se navega url para volvera a la pagina de login
    this.local.logout
    console.log('Sesión cerrada');

    this.router.navigateByUrl('/login');
  }
}