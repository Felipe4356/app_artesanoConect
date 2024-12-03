import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  roles: string[] = ['user', 'admin']; // Roles disponibles
  users: any[] = [];
  events: any[] = [];
  newEvent: any = { name: '', date: '', description: '' };

  constructor(private local: localStorageService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadEvents();
  }

  loadUsers() {
    this.users = this.local.getAllUsers();
  }

  updateRole(user: any, newRole: string) {
    if (user.role !== newRole) {
      user.role = newRole;
      this.local.saveUser(user); // Guardar cambios en localStorage
      console.log(`Rol de ${user.name} actualizado a ${newRole}`);
      this.loadUsers(); // Recargar la lista de usuarios para reflejar cambios
    }
  }
  

  deleteUser(index: number) {
    this.users.splice(index, 1);  // Eliminar el usuario de la lista en la vista
    localStorage.setItem('users', JSON.stringify(this.users));  // Actualizar localStorage
  }


  loadEvents() {
    this.events = this.local.getAllEvents();
  }

  addEvent() {
    if (this.newEvent.name && this.newEvent.date) {
      console.log('Evento antes de agregar:', this.newEvent); // Verificar el evento a agregar
      this.local.addEvent(this.newEvent);
      this.newEvent = { name: '', date: '', description: '' }; // Reset formulario
      this.loadEvents(); // Recargar eventos
    } else {
      console.log('Faltan campos obligatorios'); // Detectar si hay campos vacíos
    }
  }


    
  deleteEvent(index: number) {
    this.local.deleteEvent(index);
    this.loadEvents(); // Recargar eventos después de eliminar
  }
}