import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';
import {InputDetectService} from '../input-detect.service';
import {SubscriptionPool} from '../utils/SubscrptionPool';


const SECRET_PLACEHOLDER = '???';

export interface RetrieveReq {
  code: string;
  secret: string;
}

export interface RetrieveResp {
  msg: string;
}

@Component({
  selector: 'app-get-text',
  templateUrl: './get-text.component.html',
  styleUrls: ['./get-text.component.css'],
  providers: [InputDetectService, SubscriptionPool]
})
export class GetTextComponent implements AfterViewInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public isInputting: InputDetectService,
    private subPool: SubscriptionPool
  ) {
    route.queryParams.subscribe(params => {
      if (params.id !== undefined) {
        this.id.next(params.id);
      }
      if (params.secret !== undefined && params.secret !== SECRET_PLACEHOLDER) {
        this.secret = params.secret;
      }
    });

    this.id.subscribe(text => {
      if (text === null) {
        return;
      }
      const url = this.router.createUrlTree([], {relativeTo: this.route, queryParams: {id: text, secret: this.secret || null}, queryParamsHandling: 'merge'}).toString();
      this.location.replaceState(url);
    });
  }

  value = '';
  secret = '';
  show = true;
  secure = true;

  id: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  cbMsg = '';
  cbMsgId = -1;

  @ViewChild('inputBox') element: ElementRef;

  submit() {
    this.http.post<RetrieveResp>(environment.host + '/msg/retrieve', {code: this.id.getValue(), secret: this.secret.trim().toUpperCase()} as RetrieveReq)
      .subscribe(
        data => {
          this.value = data.msg;
        },
        (error: HttpErrorResponse) => {
          alert(error.error.errorMsg);
        }
      );
  }

  get shareUrl(): string {
    const base = new URL(environment.host + '/msg/retrieve', window.location.origin);
    base.searchParams.set('code', this.id.getValue() || '');
    return `curl -X GET '${base.toString()}&secret=${this.secretValue}'`;
  }

  get pageUrl(): string {
    return `${window.location.origin}/#/get?id=${this.id.getValue() || ''}&secret=${this.secretValue}`;
  }

  private get secretValue(): string {
    return this.secure ? SECRET_PLACEHOLDER : this.secret.trim().toUpperCase();
  }

  paste(str: string) {
    this.id.next(str);
  }

  toggleVisible() {
    this.show = !this.show;
  }

  copied($event) {
    if (this.cbMsgId !== -1) {
      clearTimeout(this.cbMsgId);
    }
    console.log(`Copied: ${$event}`);
    this.cbMsg = 'Copied';
    this.cbMsgId = setTimeout(() => this.cbMsg = '', 1000);
  }

  handleEnter($event: KeyboardEvent) {
    console.log('handleEnter');
    if (!this.id.value || !this.secret) {
      return;
    }
    this.submit();
  }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus()
  }

}
