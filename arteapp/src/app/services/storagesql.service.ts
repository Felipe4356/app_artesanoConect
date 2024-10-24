import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  private user = {
    name: '',
    password: '',
    email: '',
    direccion: '',
    bio: '',
    profileImage: '',
    productImages: [] as string[],
    socialLinks: {
      facebook: '',
      instagram: '',
      whatsapp: '',
    },
    role: 'user',
  };

  private usersKey = 'users';  // Clave para almacenar los usuarios
  private currentUserKey = 'user';  // Clave para el usuario actual

  constructor() {
    this.loadUserFromLocalStorage();
  }

  // Guardar o actualizar un usuario
  saveUser(newUser: any) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex((user: any) => user.email === newUser.email);

    if (userIndex !== -1) {
      // Si el usuario existe, lo actualiza
      users[userIndex] = newUser;
    } else {
      // Si no existe, lo agrega como un nuevo usuario
      users.push(newUser);
    }

    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this.setCurrentUser(newUser);  // Actualizar el usuario en sesión
  }

  // Obtener todos los usuarios
  getAllUsers() {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  // Iniciar sesión
  login(nombre: string, password: string): boolean {
    const users = this.getAllUsers(); // Supongamos que obtienes todos los usuarios de un almacenamiento
    const foundUser = users.find(
        (user: any) => user.name === nombre && user.password === password
    );

    if (foundUser) {
        this.user = foundUser;

        // Asigna el rol "admin" si el nombre del usuario es "admin"
        this.user.role = this.user.name === 'admin' ? 'admin' : 'user'; // Asignar 'user' o el rol correspondiente

        this.saveUserToLocalStorage();  // Guardar usuario actual en localStorage
        return true;
    } else {
        return false;
    }
}

  // Obtener el usuario en sesión
  getUser() {
    return this.user;
  }

  // Establecer el usuario actual
  setCurrentUser(user: any) {
    this.user = user;
    this.saveUserToLocalStorage();
  }

  // Obtener el nombre del usuario en sesión
  getNombreUsuario(): string {
    return this.user.name;
  }

  // Guardar el usuario actual en localStorage
  private saveUserToLocalStorage() {
    localStorage.setItem(this.currentUserKey, JSON.stringify(this.user));
  }

  // Cargar el usuario actual desde localStorage
  private loadUserFromLocalStorage() {
    const userData = localStorage.getItem(this.currentUserKey);
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  // Eliminar el usuario de sesión
  deleteUser(id: number) {
    localStorage.removeItem(this.currentUserKey);
    this.user = {
      name: '',
      password: '',
      email: '',
      direccion: '',
      bio: '',
      profileImage: '',
      productImages: [],
      socialLinks: {
        facebook: '',
        instagram: '',
        whatsapp: '',
      },
      role: 'user',
    };
  }

  // Cerrar sesión
  logout() {
    this.deleteUser(0);
  }
}
