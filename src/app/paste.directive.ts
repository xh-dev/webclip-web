import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appPaste]'
})
export class PasteDirective {

  constructor() { }

  @Output() appPaste = new EventEmitter<string>();

  @HostListener('click')
  onClick(){
    navigator.clipboard.readText()
      .then(text => {
        this.appPaste.emit(text);
        console.log(text);
      })
      .catch(err => {
        console.error('Fail to read clipboard content', err);
      });
  }

}
