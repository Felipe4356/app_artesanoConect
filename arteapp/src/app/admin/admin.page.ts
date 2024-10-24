import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  users: any[] = [];

  constructor(private local: localStorageService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.local.getAllUsers();
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);  // Eliminar el usuario de la lista en la vista
    localStorage.setItem('users', JSON.stringify(this.users));  // Actualizar localStorage
  }
}