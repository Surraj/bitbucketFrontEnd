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
  async presentToastFail() {
    const toast = await this.toastCtrl.create({
      message: 'Login Attempt Failed. Incorrect Email or Password',
      duration: 3000,
      color:'danger'
    });
    toast.present();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging In',
      duration: 1000
    });
    await loading.present();
    await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }



  onLoginClicked() {
    this.presentLoading()
    this.bitbucketService.login(this.email, this.password).subscribe(
      () => this.navCtrl.navigateRoot('/home'),
      error => this.presentToastFail()
    )
  }
}
