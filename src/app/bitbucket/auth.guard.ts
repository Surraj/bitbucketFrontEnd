import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BitbucketService } from './bitbucket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private navCtrl: NavController, private bitbucketService: BitbucketService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.bitbucketService.isLoggedIn();

    if (!isLoggedIn) {
      this.navCtrl.navigateRoot('/login');

      return false;
    }
    
    return true;
  }
}