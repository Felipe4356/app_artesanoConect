import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    name: '',
    password: '',
    email: '',
    direccion: '',
    bio: '',
    profileImage: '',  // Aquí se guardará la imagen del perfil
    productImages: [] as string[],  // Aquí se guardarán las imágenes de productos
    socialLinks: {
      facebook: '',
      instagram: '',
      whatsapp: '',
    },
  };

  constructor(private local: localStorageService, private router: Router) {}

  ngOnInit() {}

  // Manejar la selección de la imagen de perfil desde el input file
  onProfileImageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.user.profileImage = reader.result as string;  // Guardar la imagen como base64
    };

    if (file) {
      reader.readAsDataURL(file);  // Convertir la imagen seleccionada a base64
    }
  }

  // Manejar la selección de las imágenes de productos
  onProductImagesSelected(event: any) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        this.user.productImages.push(reader.result as string);  // Agregar imagen a la lista de productos
      };

      reader.readAsDataURL(files[i]);  // Convertir cada imagen seleccionada a base64
    }
  }

  register() {
    // Validación de campos
    if (this.user.name && this.user.direccion && this.user.bio) {
      this.local.saveUser(this.user);
      this.router.navigate(['/home']);
    } else {
      console.log('Registro fallido');
    }
  }

  removeProductImage(index: number) {
    this.user.productImages.splice(index, 1);  // Elimina la imagen de la lista
  }
}

