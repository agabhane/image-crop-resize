"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
require("rxjs");
require("zone.js");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
