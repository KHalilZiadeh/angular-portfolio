import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TypingComponent } from './components/typing/typing.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TypingComponent
  ],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    TypingComponent,
  ]
})
export class SharedModule { }
