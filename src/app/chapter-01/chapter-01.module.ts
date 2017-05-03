import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chapter01Component } from './chapter-01.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ Chapter01Component ],
  exports: [ Chapter01Component ]
})
export class Chapter01Module { }
