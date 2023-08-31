import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuantajDefteriRoutingModule } from './puantaj-defteri-routing.module';
import { DefterHomeComponent } from './defter-home/defter-home.component';


@NgModule({
  declarations: [
    DefterHomeComponent
  ],
  imports: [
    CommonModule,
    PuantajDefteriRoutingModule
  ]
})
export class PuantajDefteriModule { }
