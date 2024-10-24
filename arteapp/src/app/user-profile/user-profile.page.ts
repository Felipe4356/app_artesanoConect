import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageService } from '../services/storagesql.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user: any = {};  // Aquí se cargará el usuario individual

  constructor(private local: localStorageService, private router: Router) {}

  ngOnInit() {
    // Verificar si hay datos pasados desde la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.user = navigation.extras.state['user'];  // Cargar el usuario seleccionado
    } else {
      console.error('No se pasó ningún usuario');
    }
  }
}