import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
public list:BehaviorSubject<any>=new BehaviorSubject<any>(Object);

  constructor() { }
  async setMessage(content,type?,time=1000)
  {
    let obj={};
    obj['message']=content;
    obj['type']=type||'info';
    obj['time']=time;
   console.log(time)
  return await  new Promise((resolve, reject) => {
    this.list.next(obj);
    setTimeout(()=>{ resolve();},100)
   
    });
  }
}