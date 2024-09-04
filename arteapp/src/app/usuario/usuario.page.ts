import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  

  constructor(private animationCtrl: AnimationController, ) {
    
   }

   

  ngOnInit() {
  }

}
