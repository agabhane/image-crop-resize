import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImageCropResizeComponent } from "./imageCropResize/image-crop-resize.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ImageCropResizeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
