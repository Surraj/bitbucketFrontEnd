import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BitbucketService } from '../bitbucket/bitbucket.service';
import { Observable, from } from 'rxjs';
import { NavController } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string;
  commits: any[];

  repositorie$: Observable<any>;

  constructor(
    public modalCtrl: ModalController,
    private bitbucketService: BitbucketService
  ) {

  }

  ngOnInit() {
    this.getRepositories();
  }

  getRepositories() {
    this.repositorie$ = this.bitbucketService.getRepositories()
  }

  getCommits(repository: string) {
    this.bitbucketService.getCommits(repository).subscribe(commits =>
      console.log(commits)
      // this.commits = commits
    );
  }

  onLogoutClicked() {
    this.bitbucketService.logout();
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.getRepositories()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}
