import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-user',
  templateUrl: './editor-user.page.html',
  styleUrls: ['./editor-user.page.scss'],
})
export class EditorUserPage implements OnInit {
  user: any = {};

  constructor(private local: localStorageService, private router: Router) {}

  ngOnInit() {
    this.user = this.local.getUser();  // Cargar la información actual del usuario en sesión
  }

  saveProfile() {
    this.local.saveUser(this.user);  // Actualizar el usuario existente
    this.router.navigate(['/usuario']);  // Navegar de vuelta al perfil
  }

  changeProfileImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.user.profileImage = reader.result as string;  // Actualiza la imagen de perfil
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  addProductImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.user.productImages.push(reader.result as string);  // Agrega la nueva imagen a la lista
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  removeProductImage(index: number) {
    this.user.productImages.splice(index, 1);  // Elimina la imagen de la lista
  }
}