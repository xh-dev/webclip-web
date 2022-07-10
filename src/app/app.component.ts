import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

interface BEVersionEntity {
  branch: string;
  version: string;
  commit: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webclip2';

  constructor(private http: HttpClient) {
  }

  version = environment.version;
  beVersion: BEVersionEntity = null;

  ngOnInit(): void {
    this.http.get<BEVersionEntity>(`${environment.host}/version`)
      .subscribe(it => {
        this.beVersion = it;
      })
    ;
  }
}
