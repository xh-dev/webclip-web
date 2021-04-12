import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export interface CreateReq {
  msg: string;
}

export interface CreateResp {
  id: string;
}

@Component({
  selector: 'app-post-text',
  templateUrl: './post-text.component.html',
  styleUrls: ['./post-text.component.css']
})
export class PostTextComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  value = '';

  id: string = null;

  ngOnInit(): void {
  }

  submit() {
    this.http.post<CreateResp>(environment.host + '/msg/create', {msg: this.value} as CreateReq)
      .subscribe(
        data => {
          this.id = data.id;
          this.router.navigate(['/get'], {queryParams: {id: this.id}});
        },
        (error: HttpErrorResponse) => {
          alert(error.error.errorMsg);
        }
      );
  }
}
