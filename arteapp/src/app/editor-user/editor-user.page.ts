import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-user',
  templateUrl: './editor-user.page.html',
  styleUrls: ['./editor-user.page.scss'],
})
export class EditorUserPage implements OnInit {
  user = {
    name: '',
    direccion: '',
    bio: '',
    profileImage: '',
    productImages: [] as string[],  // Lista de imágenes de productos
    socialLinks: {
      facebook: '',
      instagram: '',
    }
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = { ...this.authService.getUser() };  // Copia los datos del usuario actual
  }

  saveUser() {
    this.authService.saveUser(this.user);
    this.router.navigate(['/usuario']);  // Navega a la página de perfil después de guardar
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
