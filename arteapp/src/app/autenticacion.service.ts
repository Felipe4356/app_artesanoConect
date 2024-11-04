import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AutenticacionService {
    //Variable que indica si el usuario está logueado o no
    private usuarioLogueado: boolean =false;

    constructor() {}

    //Método que retorna si el usuario está logueado

    estaLogueado(): boolean {
        return this.usuarioLogueado;
    }

     

     // Método para simular el cierre de sesión.
    cerrarSesion() {
        this.usuarioLogueado = false;
    }

    // si no esta logueado no puede acceder a la pagina url
    canActivate(): boolean {
        if (!this.usuarioLogueado) {
            console.log('No estás logueado');
            return false;
        }
        console.log('Estás logueado');
        return true;

        
    }

}