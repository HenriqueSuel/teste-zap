import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public newRepo: string = 'angular/angular';
  public repositories: Array<Repository> = [];
  public error = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setRepos();
  }

  setRepos() {
    const repos = JSON.parse(localStorage.getItem('repos'));
    if (repos) {
      this.repositories = repos;
    }
  }

  handleAddRepository() {
    const teste = 1
    this.api.getApi<Repository>('repos/' + this.newRepo)
      .subscribe(response => {
        const index = this.repositories.findIndex(repo => repo.full_name === response.full_name)
        this.newRepo = '';
        if (index < 0) {
          this.repositories.push(response);
          localStorage.setItem('repos', JSON.stringify(this.repositories))
          this.error = '';
        } else {
          this.error = 'Repositorio já cadastrado'
        }
      },
      err => {
        this.error = 'Repositorio nao encontrado !'
      })
  }

  selectedRepository(repos: Repository) {
    const params = repos.full_name.replace('/', '+');
    this.router.navigate(['repos/' + params])
  }

}
