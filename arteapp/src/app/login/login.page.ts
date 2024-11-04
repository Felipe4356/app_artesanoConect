import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageService } from '../services/storagesql.service';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string = '';
  password: string = '';
  loguiado: boolean = false;

  constructor(private local: localStorageService, private router: Router, private alertCtrl: AlertController, private guard: AutenticacionService) {}

  ngOnInit() {}

  async login() {
    if (this.local.login(this.nombre, this.password)) {
        const currentUser = this.local.getUser();

        // Verifica si el usuario es admin
        if (currentUser.role === 'admin') {
            console.log('El usuario es administrador');
            this.router.navigateByUrl('/admin'); // Redirige a la página de administración
            this.guard.estaLogueado();
            console.log('Usuario logueado admin');
        } else {
            console.log('El usuario no es administrador');
            this.router.navigateByUrl('/home'); // Redirige a la página de inicio para otros usuarios
            this.guard.estaLogueado();
            console.log('Usuario logueado');
            
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
