import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class CookieService {

  constructor() { }
set(key,value)
{
document.cookie=`${key}=${value}`;
}
get()
{
var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


}