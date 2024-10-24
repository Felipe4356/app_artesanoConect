import { CanActivateFn, CanActivate } from '@angular/router';
import { Router } from '@angular/router'

export class AutenticacionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (localStorage.getItem('usuario')) {
      return true;
    } else {
      // Si no está autenticado, redirigir a la página de login
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
