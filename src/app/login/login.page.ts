import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BitbucketService } from '../bitbucket/bitbucket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  // LOGIN BUTTON ANIMATIONS ITEMS
  userDidLogin = false;
  loginProcessLoading = false;
  userAuthenticated = false;
  userUnauthenticated = false;

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private bitbucketService: BitbucketService
  ) { }

  ngOnInit() {

  }

  toast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    }).then(toast => toast.present());
  }

  onLoginClicked() {
    this.bitbucketService.login(this.email, this.password).subscribe(
      () => this.navCtrl.navigateRoot('/home'),
      error => console.log("Failed")
    )
  }
}
