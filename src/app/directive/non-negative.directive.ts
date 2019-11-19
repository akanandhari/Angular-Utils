import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[NonNegative]'
})
export class NonNegativeDirective {
  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home','ArrowUp','ArrowDown'];

  constructor(private el: ElementRef) {
   }
   @HostListener('keydown', [ '$event' ])
   onKeyDown(event: KeyboardEvent) {
   // Allow Backspace, tab, end, and home keys
   if (this.specialKeys.indexOf(event.key) !== -1) {
   return;
   }
   let current: string = this.el.nativeElement.value;
     // console.log(current.length);
   let next: string = current.concat(event.key);

   if (next && !String(next).match(this.regex)) {
   event.preventDefault();
   }
   if(next.length>8)
   {event.preventDefault();}
   }

}
