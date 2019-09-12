import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { BitbucketResponse } from './bitbucket.interface';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BitbucketService {
  private email: string;
  private password: string;
  private username: string;

  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router) { }

  login(email: string, password: string) {
    this.email = email;
    this.password = password;

    const url = 'https://api.bitbucket.org/2.0/user?fields=username';

    return this.http.get(url, this.createAuthorizationHeader()).pipe(
      map((response: {username: string}) => response.username),
      tap(username => {
        this.username = username;

        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('username', username);
      }),
    );
  }

  isLoggedIn(): boolean {
    if (this.email && this.password && this.username) {
      return true;
    } else {
      this.email = localStorage.getItem('email');
      this.password = localStorage.getItem('password');
      this.username = localStorage.getItem('username');

      if (this.email && this.password && this.username) {
        return true;
      }

      return false;
    }
  }

  logout() {
    // Clear the email, password, and username variables
    this.email = undefined;
    this.password = undefined;
    this.username = undefined;
    // Clear the local storage
    localStorage.clear();
    // navigate to login page
    // this.navCtrl.goRoot('login');
    // this.router.navigateByUrl('login')
    this.navCtrl.navigateBack('login');


  }

  getRepositories(refresh = false) {
    const url = `https://api.bitbucket.org/2.0/user/permissions/repositories`;

    return this.http.get(url, this.createAuthorizationHeader(refresh)).pipe(
      map(
        (response: BitbucketResponse) => response.values,
      )
    );
  }

  getCommits(repository: string, refresh = false) {
    const url = `https://api.bitbucket.org/2.0/repositories/${repository}/commits/`;

    return this.http.get(url, this.createAuthorizationHeader(refresh)).pipe(
      map(
        (response: BitbucketResponse) => response.values
      )
    );
  }

  private createAuthorizationHeader(refresh = false) {
    return {
      headers: {
        Authorization: `Basic ${btoa(`${this.email}:${this.password}`)}`,
        ...((refresh) ? {'If-None-Match': ''} : {}),
        'Content-Type': 'application/x-www-url-form-encoded',
      }
    };
  }

}
