import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, Platform, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  apkey: string;
  password: string;
  showPassword: boolean;

  // LOGIN BUTTON ANIMATIONS ITEMS
  userDidLogin = false;
  loginProcessLoading = false;
  userAuthenticated = false;
  userUnauthenticated = false;

  constructor(

    private events: Events,
    private network: Network,
    private plt: Platform,
    private router: Router,
    private toastCtrl: ToastController,
    private http:HttpClient
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
    if (this.plt.is('cordova') && this.network.type === 'none') {
      return this.toast('You are now offline.');
    }
    this.userDidLogin = true;
    this.loginProcessLoading = true;
    const url = `https://api.bitbucket.org/2.0/repositories/ExplodingCow_apu/${this.searchTerm}/commits/`
    console.log(this.searchTerm)
    let Httpheaders = new HttpHeaders()
    Httpheaders.append('username', this.apkey);
    Httpheaders.append('password', this.password);
    this.http.get(url,{headers:Httpheaders}).subscribe(resp=>{
      this.data = resp["values"]
      console.log(this.data)
    })
    // this.cas.getTGT(this.apkey, this.password).pipe(
    //   catchError(e => (this.toast(e), EMPTY)),
    //   switchMap(tgt => this.cas.getST(this.cas.casUrl, tgt)),
    //   catchError(_ => (this.toast('Fail to get service ticket.'), EMPTY)),
    //   switchMap(st => this.cas.validate(st)),
    //   catchError(_ => (this.toast('You are not authorized to use APSpace'), EMPTY)),
    //   tap(role => this.cacheApi(role)),
    //   timeout(15000),
    //   tap(_ => this.events.publish('user:login')),
    // ).subscribe(
    //   _ => { },
    //   _ => {
    //     this.loginProcessLoading = false;
    //     this.userUnauthenticated = true;
    //   },
    //   () => {
    //     this.loginProcessLoading = false;
    //     this.userAuthenticated = true;
    //     setTimeout(() => {
    //       // Show the success message for 700 ms after completing the request
    //       this.router.navigate(['/']);
    //     }, 700);
    //   }
    // );
  }


}
