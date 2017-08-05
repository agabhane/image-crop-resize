"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <div class=\"app-container container\">\n      <header>\n        <div class=\"title\">image-crop-resize</div>\n        <div class=\"title-line\">\n          <span></span>\n          <span></span>\n          <span></span>\n        </div>\n      </header>\n      <image-crop-resize></image-crop-resize>\n    <div>",
        styles: ["\n    header {\n        padding: 10px 0;\n        font-size: 30px;\n        letter-spacing: 5px;\n        font-weight: bold;\n    }\n\n    .title-line {\n        display: flex;\n    }\n\n    .title-line span {\n        width: 30px;\n    }\n\n    .title-line span:nth-child(1) {\n        border-bottom: 5px solid red;\n    }\n\n    .title-line span:nth-child(2) {\n        border-bottom: 5px solid #1cd286;\n    }\n\n    .title-line span:nth-child(3) {\n        border-bottom: 5px solid #00ff95;\n    }\n  "]
    })
], AppComponent);
exports.AppComponent = AppComponent;
