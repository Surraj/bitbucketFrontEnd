import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BitbucketService } from '../bitbucket/bitbucket.service';
import { Observable, from } from 'rxjs';
import { NavController } from '@ionic/angular';
import { map, tap, timeout, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string;
  repositorie$: Observable<any>;

  constructor(
    public modalCtrl: ModalController,
    private bitbucketService: BitbucketService
  ) {

  }

  ngOnInit() {
    this.getRepositories(null);
  }

  getRepositories(event, refresh = false) {
    this.repositorie$ = this.bitbucketService.getRepositories(refresh).pipe(
      tap(_ => event && event.target.complete()),
      timeout(10000),
      catchError(_ => event && event.target.complete())
    )
  }
  onLogoutClicked() {
    this.bitbucketService.logout();
  }

}
