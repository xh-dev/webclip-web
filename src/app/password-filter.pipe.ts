import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordFilter'
})
export class PasswordFilterPipe implements PipeTransform {

  transform(value: string, isPassword: boolean): string {
    if (isPassword) {
      return [...value].reduce((a, _) => a + '*', '');
    } else {
      return value;
    }
  }
}
