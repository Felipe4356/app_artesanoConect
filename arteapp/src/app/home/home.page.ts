import { Component } from '@angular/core';
import { AuthService } from '../AuthService';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    
  }


  
}
