import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  user: any;

  constructor(private local:localStorageService, private router: Router)  { }

  

  ngOnInit() {
    this.user = this.local.getUser();
  }

  editProfile() {
    this.router.navigate(['/editor-user']);
  }

  logout() {
    this.local.logout();
    this.router.navigate(['/login']);
  }
}