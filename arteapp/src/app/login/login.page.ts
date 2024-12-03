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

        // Verifica si el usuario es admin
        if (currentUser.role === 'admin') {
            console.log('El usuario es administrador');
            this.router.navigateByUrl('/home'); // Redirige a la página de administr
            
        } else {
            console.log('El usuario no es administrador');
            this.router.navigateByUrl('/home'); // Redirige a la página de inicio para otros usuarios
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

  async recoverPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Recuperar Contraseña',
      message: 'Ingresa tu nombre para buscar tu cuenta',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de usuario',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Siguiente',
          handler: async (data) => {
            const userExists = this.local.getAllUsers().some((user: any) => user.name === data.name);
  
            if (userExists) {
              const updateAlert = await this.alertCtrl.create({
                header: 'Actualizar Contraseña',
                message: 'Ingresa tu nueva contraseña',
                inputs: [
                  {
                    name: 'newPassword',
                    type: 'password',
                    placeholder: 'Nueva contraseña',
                  },
                ],
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                  },
                  {
                    text: 'Actualizar',
                    handler: (updateData) => {
                      const success = this.local.recoverPassword(data.name, updateData.newPassword);
  
                      if (success) {
                        this.showSuccessAlert('Contraseña actualizada correctamente');
                      } else {
                        this.showErrorAlert('Error al actualizar la contraseña');
                      }
                    },
                  },
                ],
              });
  
              await updateAlert.present();
            } else {
              this.showErrorAlert('Usuario no encontrado');
            }
          },
        },
      ],
    });
  
    await alert.present();
  }


  async showSuccessAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  
  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }




}
