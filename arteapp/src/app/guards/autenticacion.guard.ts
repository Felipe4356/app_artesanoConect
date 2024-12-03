import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { localStorageService } from '../services/storagesql.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }


  
}
