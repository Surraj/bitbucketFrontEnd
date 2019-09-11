import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BitbucketService } from '../bitbucket/bitbucket.service';
import { find } from 'rxjs/operators';
@Component({
  selector: 'app-commits',
  templateUrl: './commits.page.html',
  styleUrls: ['./commits.page.scss'],
})
export class CommitsPage implements OnInit {
  repositoryID;
  information;
  constructor(private route: ActivatedRoute,
              private bitbucketService: BitbucketService) { }

  ngOnInit() {
    this.repositoryID = this.route.snapshot.paramMap.get('id');
    this.getCommits(this.repositoryID);
  }

  getCommits(id) {
    this.bitbucketService.getCommits(id).subscribe(resp => {
      console.log(resp)
      this.information = resp.map(commits => commits);
    });
  }

  test() {
    console.log(this.information);
  }
}
