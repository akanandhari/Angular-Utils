import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SnackBarComponent } from './utility/snack-bar/snack-bar.component';
import { SnackBarService } from './utility/snack-bar/snack-bar.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteComponent } from './utility/autocomplete/autocomplete/autocomplete.component';
import { LocaleFormatPipe } from './pipe/locale-format.pipe';
import { NonNegativeDirective } from './directive/non-negative.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule,BrowserAnimationsModule,ReactiveFormsModule,HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, SnackBarComponent, AutocompleteComponent, LocaleFormatPipe, NonNegativeDirective ],
  bootstrap:    [ AppComponent ],
  providers: [SnackBarService],entryComponents:[AutocompleteComponent]
})
export class AppModule { }
