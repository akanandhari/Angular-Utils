import { Component } from '@angular/core';
import { SnackBarService } from './utility/snack-bar/snack-bar.service';
import{CookieService} from "./utility/cookieService/cookie-service.service";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  constructor(public toast:SnackBarService,public cookie:CookieService)
  {
  
  }
  clickMe()
  {
    this.toast.setMessage("hello Wrold","info",4000)
this.cookie.set("hi","hello0");
  }
}
