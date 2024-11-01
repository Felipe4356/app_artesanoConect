import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageService } from '../services/storagesql.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string = '';
  password: string = '';
  loguiado: boolean = false;

  constructor(private local: localStorageService, private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {}

  async login() {
    if (this.local.login(this.nombre, this.password)) {
      const currentUser = this.local.getUser();

      // Redirección según el rol del usuario
      switch (currentUser.role) {
        case 'admin':
          console.log('El usuario es administrador');
          this.router.navigateByUrl('/admin'); // Redirige a la página de administración
          break;
        case 'emprendedor':
          console.log('El usuario es emprendedor');
          this.router.navigateByUrl('/home'); // Redirige a la página de inicio (puedes personalizar esto)
          break;
        case 'usuario_normal':
        default:
          console.log('El usuario es normal');
          this.router.navigateByUrl('/home'); // Redirige a la página de inicio para usuarios normales
          break;
      }

      await this.showWelcomeAlert(this.nombre);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Ir a la página de registro
  register() {
    this.router.navigateByUrl('/register');
  }

  async showWelcomeAlert(nombre: string) {
    const alert = await this.alertCtrl.create({
      header: '¡Bienvenido!',
      message: `Hola, ${nombre}. ¡Bienvenido de nuevo!`,
      buttons: ['OK']
    });

    await alert.present();
  }














  
}
