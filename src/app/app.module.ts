import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.router';
import { UnitTestModule } from './unit-test/unit-test.module';
import { Chapter01Module } from './chapter-01/chapter-01.module';
import { Chapter02Module } from './chapter-02/chapter-02.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UnitTestModule,
    Chapter01Module,
    Chapter02Module,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
