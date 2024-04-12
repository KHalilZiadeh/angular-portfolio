import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TypingComponent } from './components/typing/typing.component';



@NgModule({
  declarations: [
    TypingComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [
    MaterialModule,
    TypingComponent
  ]
})
export class SharedModule { }
