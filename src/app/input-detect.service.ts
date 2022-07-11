import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputDetectService {

  private isInputtingBehaviorSubject = new BehaviorSubject(false);
  private requestingInputSubject:Subject<any> = new Subject();
  private escapeSubject:Subject<any> = new Subject();

  constructor() {
    this.isInputtingBehaviorSubject
      .subscribe(next => console.log(`Inputting: ${this.isInputting()}`));
  }

  public getEscapeBehaviorSubject(): Subject<any> {
    return this.escapeSubject;
  }
  public signalEscapeSubject(){
    console.log("Signal escape")
    this.escapeSubject.next({});
  }

  public getRequestInputBehavior(): Subject<any> {
    return this.requestingInputSubject;
  }

  public signalRequestInput() {
    console.log("Signal input")
    this.requestingInputSubject.next({});
  }

  public getIsInputting(): BehaviorSubject<boolean> {
    return this.isInputtingBehaviorSubject;
  }

  public setInputting() {
    this.isInputtingBehaviorSubject.next(true);
  }

  public setNotInputting() {
    this.isInputtingBehaviorSubject.next(false);
  }

  public isInputting(): boolean {
    return this.isInputtingBehaviorSubject.value;
  }

  public isNotInputting(): boolean {
    return !this.isInputting();
  }

}
