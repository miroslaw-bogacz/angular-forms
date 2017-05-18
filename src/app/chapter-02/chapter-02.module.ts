import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chapter02Component } from './chapter-02.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ Chapter02Component ],
  exports: [ Chapter02Component ]
})
export class Chapter02Module { }
