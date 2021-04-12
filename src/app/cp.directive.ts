import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCp]'
})
export class CpDirective {

  constructor() { }

  @Input() appCp = '';

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
    alert('Copied text: ' + this.appCp);
  }
}
