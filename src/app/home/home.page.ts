import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators'
import {NavParams} from '@ionic/angular'
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  username;
  password;
  searchTerm
  data;
  constructor(private alertCtrl: AlertController, 
              private http: HttpClient,
              private route: ActivatedRoute,
              public modalCtrl:ModalController
              ) {

              }
  
  ngOnInit(){
   this.username = this.route.snapshot.paramMap.get('username')
   console.log(this.username)
   console.log(this.password)
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  getData(){
    const url = `https://api.bitbucket.org/2.0/repositories/${this.username}/${this.searchTerm}/commits/`
    console.log(this.searchTerm)
    let Httpheaders = new HttpHeaders()
    Httpheaders.append('username', this.username);
    Httpheaders.append('password', this.password)
    this.http.get(url,{headers:Httpheaders}).subscribe(resp=>{
      this.data = resp["values"]
      console.log(this.data)
    })
  }
}
