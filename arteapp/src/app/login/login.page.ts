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
      // Si el login es exitoso, redirigir a la página de inicio
      await this.showWelcomeAlert(this.nombre);
      this.router.navigateByUrl('/home');
    } else {
      // Mostrar alerta si el login falla
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  //ir page register
  register(){
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
