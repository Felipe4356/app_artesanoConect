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

   private newEvent: any = { title: '', date: '', description: '' };

  private usersKey = 'users'; // Clave para almacenar los usuarios
  private currentUserKey = 'user'; // Clave para el usuario actual
  private EVENTS_KEY = 'events'; // Inicializamos correctamente la clave para eventos
  private LOCATIONS_KEY = 'locations'; // Clave para almacenar ubicaciones

  constructor() {
    this.loadUserFromLocalStorage();
  }

  // Métodos para usuarios
  saveUser(newUser: any) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex((user: any) => user.email === newUser.email);

    if (userIndex !== -1) {
      users[userIndex] = newUser;
    } else {
      users.push(newUser);
    }

    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this.setCurrentUser(newUser);
  }

  getAllUsers() {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  login(nombre: string, password: string): boolean {
    const users = this.getAllUsers();
    const foundUser = users.find(
      (user: any) => user.name === nombre && user.password === password
    );

    if (foundUser) {
      this.user = foundUser;
      this.user.role = this.user.name === 'admin' ? 'admin' : 'user';
      this.saveUserToLocalStorage();
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    return this.user;
  }

  setCurrentUser(user: any) {
    this.user = user;
    this.saveUserToLocalStorage();
  }

  getNombreUsuario(): string {
    return this.user.name;
  }

  private saveUserToLocalStorage() {
    localStorage.setItem(this.currentUserKey, JSON.stringify(this.user));
  }

  private loadUserFromLocalStorage() {
    const userData = localStorage.getItem(this.currentUserKey);
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

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

  logout() {
    this.deleteUser(0);
  }

  // --- Métodos para eventos ---
  getAllEvents(): any[] {
    const events = localStorage.getItem(this.EVENTS_KEY);
    return events ? JSON.parse(events) : [];
  }

  addEvent(event: any): void {
    const events = this.getAllEvents();
    events.push(event);
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
  }

  deleteEvent(index: number): void {
    const events = this.getAllEvents();
    events.splice(index, 1);
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
  }

  // Métodos para Ubicaciones (Solo agregar, sin modificar el código existente)

   // Clave para almacenar ubicaciones

  // Obtiene todas las ubicaciones guardadas en localStorage
  getAllLocations(): any[] {
    const locations = localStorage.getItem(this.LOCATIONS_KEY);
    return locations ? JSON.parse(locations) : [];
  }

  // Agrega una nueva ubicación a localStorage
  addLocation(location: any): void {
    const locations = this.getAllLocations();
    locations.push(location);
    localStorage.setItem(this.LOCATIONS_KEY, JSON.stringify(locations));
  }

  
  // Elimina una ubicación específica en localStorage por id
removeLocation(locationId: string): void {
  const locations = this.getAllLocations();
  const newLocations = locations.filter((location: any) => location.id !== locationId);
  localStorage.setItem(this.LOCATIONS_KEY, JSON.stringify(newLocations));
}


  saveLocation(location: any): void {
    const locations = this.getAllLocations();
    locations.push(location);
    localStorage.setItem('locations', JSON.stringify(locations));
  }


  
  


}
