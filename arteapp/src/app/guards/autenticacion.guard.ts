import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { localStorageService } from '../services/storagesql.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuard implements CanActivate {
  constructor(private local: localStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.local.getUser();

    if (currentUser) {
      if (currentUser.role === 'admin') {
       
        return true;
      } else {

        this.router.navigateByUrl('/home');
        return false;
      }
    }

   
    this.router.navigateByUrl('/login');
    return false;
  }
} 