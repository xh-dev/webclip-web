import {Subscription} from 'rxjs';
import {AfterViewInit, Injectable, OnDestroy, OnInit} from '@angular/core';

@Injectable()
export class SubscriptionPool implements OnDestroy{
  protected subscriptions: Subscription[] = [];

  constructor() {
  }

  subscribe(oper: ()=>Subscription){
    this.subscriptions.push(
      oper()
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(it => {
        if (!it.closed) {
          it.unsubscribe();
        }
      }
    );
    this.subscriptions=[];
  }

}
