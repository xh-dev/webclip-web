import {Component, HostListener, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {InputDetectService} from './input-detect.service';

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

  constructor(private http: HttpClient, private router: Router, private detectInputting: InputDetectService) {
  }

  feVersion = environment.version;
  feBranch = environment.branchName;
  beVersion: BEVersionEntity = null;

  ngOnInit(): void {
    this.http.get<BEVersionEntity>(`${environment.host}/version`)
      .subscribe(it => {
        this.beVersion = it;
      })
    ;
  }

  @HostListener('document:keydown.control.z', ['$event'])
  toPost(_: KeyboardEvent) {
    this.router.navigate(['post']);
  }

  @HostListener('document:keydown.control.x', ['$event'])
  toGet(_: KeyboardEvent) {
    this.router.navigate(['get']);
  }
}
