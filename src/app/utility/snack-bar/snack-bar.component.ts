import { Component, OnInit } from '@angular/core';
import { SnackBarService } from './snack-bar.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],

  animations: [
    trigger('items', [
      transition(':enter', [
        style({transform: 'translate3d(100%, 0, 0)'
       }),  // initial
        animate('.25s', 
          style({  transform: 'translate3d(0, 0, 0)' }))  // final
      ]),
      transition(':leave', [
        style({   transform: 'translate3d(0, 0, 0)' }),
        animate('.25s', 
         style({ 
          transform: 'translate3d(100%, 0, 0)', opacity: 0, 
            
         })) 
      ])
    ])
  ]
})
export class SnackBarComponent implements OnInit {
  public list: any[] = [];
  constructor(public snack: SnackBarService) {
      
    this.snack.list.subscribe((data) => {
      console.log(data);
      data.id=Math.floor((Math.random() * 100) + 1);
      this.list.push(data);
      this.list.forEach((element) => {
    
          setTimeout(() => {
            let ind=this.list.map(x=>x.id).indexOf(element.id);
            if (ind!=-1)
              this.list.splice(ind, 1);

          }, element.time+(element.id*5));
       
      });
    });
  }

  ngOnInit() {

  }

  dismiss(id) {
    let ind=this.list.map(x=>x.id).indexOf(id);
    if (ind!=-1)
      this.list.splice(ind, 1);
  }
}
