import { Component } from '@angular/core';
import { AuthService } from '../login/AuthService';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.nombreUsuario = this.authService.getNombreUsuario();
  }
}
