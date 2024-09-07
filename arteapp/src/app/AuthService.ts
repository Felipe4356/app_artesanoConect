
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = {
    name: 'localUser',
    direccion: 'Calle Falsa 123',
    bio: 'biografía hola mundo',
    profileImage: 'https://ionicframework.com/docs/img/demos/card-media.png',
    productImages: [] as string[],  // Asegúrate de que es un array de strings
    socialLinks: {
        facebook: '',
      
        instagram: '',
        
      }
  };

  login(nombre: string, password: string): boolean {
    // Lógica de autenticación aquí
    this.user.name = nombre;
    return true;
  }

  getUser() {
    return this.user;
  }

  saveUser(updatedUser: any) {
    this.user = { ...this.user, ...updatedUser };
    console.log('User data saved:', this.user);
  }

  getNombreUsuario(): string {
    return this.user.name;
  }
}