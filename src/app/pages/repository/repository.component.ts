import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issues {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  public repo: Repository;
  public issues: Issues[];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    id = id.replace('+', '/')
    this.getIssues(id);
    this.setRepos(id)
  }

  setRepos(id) {
    const repos = JSON.parse(localStorage.getItem('repos'));
    if (repos) {
      debugger
      this.repo = repos.find(r => r.full_name === id);
      if(this.repo === undefined) {
        this.getRepository(id);
      }
    } else {
      this.getRepository(id);
    }
  }

  getRepository(id) {
    this.api.getApi<Repository>('repos/' + id)
      .subscribe(response => {
        this.repo = response;
      })
  }


  getIssues(id) {
    this.api.getApi<Issues[]>('repos/' + id + '/issues')
      .subscribe(response => {
        this.issues = response;
      })
  }
}
