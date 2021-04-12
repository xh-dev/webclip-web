import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';


export interface RetrieveReq {
  code: string;
}

export interface RetrieveResp {
  msg: string;
}

@Component({
  selector: 'app-get-text',
  templateUrl: './get-text.component.html',
  styleUrls: ['./get-text.component.css']
})
export class GetTextComponent implements OnInit {

  value = '';

  id: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    route.queryParams.subscribe(params => {
      if (params.id !== undefined) {
        this.id.next(params.id);
      }
    });

    this.id.subscribe(text => {
      if (text === null) { return; }
      const url = this.router.createUrlTree([], {relativeTo: this.route, queryParams: {id: text}}).toString();
      this.location.replaceState(url);
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.http.post<RetrieveResp>(environment.host + '/msg/retrieve', {code: this.id.getValue()} as RetrieveReq)
      .subscribe(
        data => {
          this.value = data.msg;
        },
        (error: HttpErrorResponse) => {
          alert(error.error.errorMsg);
        }
      );
  }

  paste(str: string){
    this.id.next(str);
  }

}
