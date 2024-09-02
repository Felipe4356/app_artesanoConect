import { Component, OnInit } from '@angular/core';

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
  constructor() { }


  ngOnInit() {
    console.log("iniciar")
  }

}
