import { Component } from '@angular/core';
import { SnackBarService } from './utility/snack-bar/snack-bar.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  constructor(public toast:SnackBarService)
  {
  
  }
  clickMe()
  {
    this.toast.setMessage("hello Wrold","info",10000)
  }
}
