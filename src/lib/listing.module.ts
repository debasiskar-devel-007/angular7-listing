import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ListingComponent, Confirmdialog,BottomSheet} from './listing.component';
import {DemoMaterialModule} from './materialmodules';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ApiService } from './api.service';

@NgModule({
  declarations: [ListingComponent,Confirmdialog,BottomSheet],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    DemoMaterialModule
  ],
  exports: [ListingComponent],
  providers: [ApiService],
  entryComponents:[Confirmdialog,BottomSheet],
})
export class ListingModule { }
