import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { localStorageService } from '../services/storagesql.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuard implements CanActivate {
  constructor(private router: Router, private local: localStorageService) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (localStorage.getItem('user')) {
      return true;
    } else {
      // Si no está autenticado, redirigir a la página de login
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  // Método para validar el acceso a la ruta de usuario
  canActivateUsuario(): boolean {
    const user = this.local.getUser();

    // Permitir solo a admin y emprendedor
    if (user && (user.role === 'admin' || user.role === 'emprendedor')) {
      return true; // Acceso permitido
    }

    // Redirigir a la página de inicio si el acceso es denegado
    this.router.navigateByUrl('/home');
    return false;
  }
}
