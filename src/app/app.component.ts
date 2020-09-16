import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'githubTest';
  resposta = null;

  constructor(private ApiService: ApiService){}

  apiZap() {
    this.ApiService.getApiZap('http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json').subscribe(resp => {
      this.resposta = resp
      console.log(resp)
    })
  }
}
