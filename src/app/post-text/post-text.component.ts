import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {InputDetectService} from '../input-detect.service';
import {InputBoxFunctions} from '../utils/InputBoxFunctions';
import {SubscriptionPool} from '../utils/SubscrptionPool';

export interface CreateReq {
  msg: string;
}

export interface CreateResp {
  id: string;
}

@Component({
  selector: 'app-post-text',
  templateUrl: './post-text.component.html',
  styleUrls: ['./post-text.component.css'],
  providers: [InputDetectService, SubscriptionPool]
})
export class PostTextComponent implements AfterViewInit {

  constructor(private http: HttpClient, private router: Router,
              public isInputting: InputDetectService,
              private subPool:SubscriptionPool
  ) {
  }

  @ViewChild('inputBox') element: ElementRef;

  value = '';

  id: string = null;

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

  ctrlEnter(event: KeyboardEvent, item: string) {
    if (item === '') {
      return;
    }
    this.submit();
  }

  ngAfterViewInit() {
    this.element.nativeElement.focus()
  }
}
