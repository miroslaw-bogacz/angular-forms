import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTestComponent } from './unit-test.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ UnitTestComponent ],
  exports: [ UnitTestComponent ]
})
export class UnitTestModule { }
