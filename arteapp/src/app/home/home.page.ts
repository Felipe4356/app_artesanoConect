import { Component } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users: any[] = [];          // Lista completa de usuarios
  filteredUsers: any[] = [];   // Lista filtrada para mostrar
  searchTerm: string = '';     // Término de búsqueda

  constructor(private local: localStorageService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();  // Carga los usuarios al iniciar la página
  }

  // Cargar todos los usuarios desde localStorage
  loadUsers() {
    this.users = this.local.getAllUsers();
    this.filteredUsers = this.users;  // Inicialmente, mostrar todos los usuarios
  }

  // Filtrar los usuarios según el término de búsqueda
  filterUsers(event: any) {
    const searchValue = event.target.value.toLowerCase();  // Obtener el valor del campo de búsqueda

    // Si hay un término de búsqueda, filtrar usuarios
    if (searchValue && searchValue.trim() !== '') {
      this.filteredUsers = this.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchValue) ||
          user.email.toLowerCase().includes(searchValue)
        );
      });
    } else {
      // Si no hay búsqueda, mostrar todos los usuarios
      this.filteredUsers = this.users;
    }
  }

  // Ver perfil del usuario seleccionado
  viewProfile(user: any) {
    this.router.navigate(['/user-profile'], { state: { user } });
  }
}
