import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username = "TP050803@mail.apu.edu.my"
  password = "surraj34"
  searchTerm
  data;
  constructor(private alertCtrl: AlertController, private http: HttpClient) {}


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
    const url = `https://api.bitbucket.org/2.0/repositories/ExplodingCow_apu/${this.searchTerm}/commits/`
    console.log(this.searchTerm)
    let Httpheaders = new HttpHeaders()
    Httpheaders.append('username', this.username);
    Httpheaders.append('password', this.password);
    this.http.get(url,{headers:Httpheaders}).subscribe(resp=>{
      this.data = resp["values"]
      console.log(this.data)
    })
  }
}
