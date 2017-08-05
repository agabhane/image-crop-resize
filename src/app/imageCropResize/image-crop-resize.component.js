"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var $ = require("jquery");
var Cropper = require('cropperjs');
var ImageCropResizeComponent = (function () {
    function ImageCropResizeComponent() {
        var _this = this;
        this.initializeCropper = function (src) {
            var image = document.getElementById('image');
            if (_this.cropper) {
                _this.cropper.destroy();
            }
            _this.cropper = new Cropper(image, {
                dragMode: 'move',
                viewMode: 1,
                highlight: false
            });
            image.addEventListener('crop', _this.onCropChange);
        };
        this.onCropChange = function (e) {
            _this.cropHeight = Math.round(e.detail.height);
            _this.cropWidth = Math.round(e.detail.width);
        };
        this.downloadCroppedImage = function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = 'none';
            _this.cropper.getCroppedCanvas({
                width: _this.cropWidth,
                height: _this.cropHeight,
            }).toBlob(function (blob) {
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = _this.fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            }, _this.fileType, 1);
        };
        this.openFileSelector = function () {
            _this.fileInput.trigger('click');
        };
        this.onSelectFile = function () {
            var file = _this.fileInput[0].files[0];
            _this.fileName = file.name;
            _this.fileType = file.type;
            var reader = new FileReader();
            var self = _this;
            reader.onload = function () {
                self.imageSource = reader.result;
                setTimeout(function () { self.initializeCropper(reader.result); }, 0);
            };
            reader.readAsDataURL(file);
        };
        this.widthChange = function (e) {
            _this.cropWidth = parseInt(e.target.value);
            _this.cropper.setData({
                width: _this.cropWidth
            });
        };
        this.heightChange = function (e) {
            _this.cropHeight = parseInt(e.target.value);
            _this.cropper.setData({
                height: _this.cropHeight
            });
        };
    }
    ImageCropResizeComponent.prototype.ngOnInit = function () {
        this.fileInput = $('#file');
        this.fileInput.change(this.onSelectFile);
    };
    return ImageCropResizeComponent;
}());
ImageCropResizeComponent = __decorate([
    core_1.Component({
        selector: 'image-crop-resize',
        template: "\n      <div class=\"wrapper\">\n          <div class=\"image-container\">\n              <img id=\"image\" src=\"{{imageSource}}\" [style.display]=\"!!imageSource ? 'block' : 'none'\">\n              <div class=\"file-upload-container\" (click)=\"openFileSelector()\" [style.display]=\"!!imageSource ? 'none' : 'flex'\">\n                  <div class=\"upload-text\">Drag &amp; drop image here or click here</div>\n                  <input type=\"file\" name=\"file\" id=\"file\" style=\"display:none;\" accept=\"image/*\"/>\n              </div>\n              <button class=\"btn btn-default btn-upload-new-image\" (click)=\"openFileSelector()\" [style.display]=\"!!imageSource ? 'block' : 'none'\">Upload New Image</button>\n          </div>\n          <div class=\"action-container\">\n              <div class=\"form-inline\">\n                  <div class=\"form-group\">\n                      <label class=\"sr-only\" for=\"width\">Width in px</label>\n                      <div class=\"input-group\">\n                          <input type=\"text\" class=\"form-control\" id=\"width\" placeholder=\"Width\" [(ngModel)]=\"cropWidth\" (keyup)=\"widthChange($event)\">\n                          <div class=\"input-group-addon\">px</div>\n                      </div>\n                  </div>\n                  <div class=\"form-group\">\n                      <label class=\"sr-only\" for=\"width\">Height in px</label>\n                      <div class=\"input-group\">\n                          <input type=\"text\" class=\"form-control\" id=\"height\" placeholder=\"Height\" [(ngModel)]=\"cropHeight\" (keyup)=\"heightChange($event)\">\n                          <div class=\"input-group-addon\">px</div>\n                      </div>\n                  </div>\n                  <button (click)=\"downloadCroppedImage()\" class=\"btn btn-primary\">Download</button>\n              </div>\n        \n          </div>\n      </div>\n    ",
        styles: ["\n      .wrapper {\n          display: flex;\n      }\n      .image-container {\n          flex: 1;\n          height: 500px;\n      }\n      .file-upload-container {\n          border: 3px dashed #888;\n          display: flex;\n          align-items: center;\n          height: 100%;\n          width: 100%;\n          justify-content: center;\n          cursor: pointer;\n      }\n\n      .file-upload-container:hover {\n          background-color: #f5f5dc;\n      }\n\n      .upload-text {\n          text-transform: uppercase;\n          font-size: 28px;\n          color: #888;\n          font-weight: bold;\n          letter-spacing: 2px;\n      }\n\n      img {\n        max-width: 100%;\n        height: 100%;\n      }\n      .action-container {\n          width: 250px;\n          margin-left: 10px;\n      }\n\n      .btn-upload-new-image {\n          width: 100%;\n          margin-top: 10px;\n          font-weight: bold;\n          letter-spacing: 2px;\n          text-transform: uppercase;\n      }\n\n      .form-inline {\n          display: flex;\n          flex-direction: column;\n      }\n\n      .form-group {\n          margin-bottom: 10px;\n      }\n\n      .input-group {\n          width: 100%;\n      }\n    "]
    })
], ImageCropResizeComponent);
exports.ImageCropResizeComponent = ImageCropResizeComponent;
