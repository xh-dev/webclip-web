import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appCp]'
})
export class CpDirective {

  constructor() { }

  @Input() appCp = '';
  @Output() copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click')
  onClick(){
    const copyToClipboardFunc = str => {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    };
    copyToClipboardFunc(this.appCp);
    this.copied.emit(this.appCp);
  }
}
