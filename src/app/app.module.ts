import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SnackBarComponent } from './utility/snack-bar/snack-bar.component';
import { SnackBarService } from './utility/snack-bar/snack-bar.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule({
  imports:      [ BrowserModule, FormsModule,BrowserAnimationsModule ],
  declarations: [ AppComponent, HelloComponent, SnackBarComponent ],
  bootstrap:    [ AppComponent ],
  providers: [SnackBarService]
})
export class AppModule { }
