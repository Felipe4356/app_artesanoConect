import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private nombreUsuario: string = '';

  login(nombre: string, password: string): boolean {
    // Lógica de autenticación aquí
    // Por simplicidad, asumiremos que la autenticación es exitosa.
    this.nombreUsuario = nombre;
    return true;
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }
}
