import {filter} from 'rxjs/operators';
import {InputDetectService} from '../input-detect.service';
import {ElementRef} from '@angular/core';
import {SubscriptionPool} from './SubscrptionPool';

export class InputBoxFunctions {

  static process(element: ElementRef, isInputting: InputDetectService, sp: SubscriptionPool) {
    sp.subscribe(
      ()=>isInputting.getRequestInputBehavior()
        .pipe(
          filter<boolean>((_) => isInputting.isNotInputting())
        )
        .subscribe(_ => {
          console.log('Requesting input');
          element.nativeElement.focus();
          isInputting.setInputting()
        })
    )
    sp.subscribe(
      ()=>isInputting.getEscapeBehaviorSubject()
        .pipe(
          filter<boolean>((_) => isInputting.isInputting())
        )
        .subscribe(_ => {
          console.log('Requesting lost focus');
          element.nativeElement.nextElementSibling.focus()
          isInputting.setNotInputting()
        })
    )
  }
}
