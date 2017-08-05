import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="app-container container">
      <header>
        <div class="title">image-crop-resize</div>
        <div class="title-line">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <image-crop-resize></image-crop-resize>
    <div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
