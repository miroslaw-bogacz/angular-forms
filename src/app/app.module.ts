import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UnitTestModule } from './unit-test/unit-test.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UnitTestModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
