import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeFormat'
})
export class LocaleFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
 
if(value!=null)
    
      return value.toLocaleString(navigator.language);
    
  }

}
