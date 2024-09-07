import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUserData();
  }

  ionViewWillEnter() {
    this.loadUserData();  // Asegura que los datos se recarguen cuando se muestra la página
  }

  loadUserData() {
    this.user = this.authService.getUser();
    console.log('User data loaded:', this.user);
  }
}
