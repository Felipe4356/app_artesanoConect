import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  direccion = "egana 123"
  persona={
    nombre:'',
    apellido:'',
    Password:''
  }
  constructor(private authService: AuthService, private router: Router  ,private alertController: AlertController) { }

  async login() {
    if (this.authService.login(this.persona.nombre, this.persona.Password)) {
      await this.showWelcomeAlert(this.persona.nombre);
      this.router.navigate(['/home']); // Navega a la página de inicio después del login
    } else {
      console.log('Error en la autenticación');
    }
  }

  async showWelcomeAlert(nombre: string) {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: `Hola, ${nombre}. ¡Bienvenido de nuevo!`,
      buttons: ['OK']
    });

    await alert.present();
  }


  ngOnInit() {
    console.log("iniciar")
  }

}
