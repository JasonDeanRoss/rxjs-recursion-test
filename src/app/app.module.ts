import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RxjsRecursionTesterService} from "./rxjs-test/rxjs-recursion-tester";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    RxjsRecursionTesterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
