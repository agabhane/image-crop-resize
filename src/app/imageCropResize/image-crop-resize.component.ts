import { Component, OnInit } from "@angular/core";
import * as $ from 'jquery';
const Cropper = require('cropperjs');

@Component({
    selector: 'image-crop-resize',
    templateUrl: './image-crop-resize.component.html',
    styleUrls: ['./image-crop-resize.component.css']
})

export class ImageCropResizeComponent implements OnInit {
    private cropper: any;
    private fileInput: any;
    private imageSource: any;
    private cropWidth: number;
    private cropHeight: number;
    private fileName: string;
    private fileType: string;
    ngOnInit(): void {
        this.fileInput = $('#file');
        this.fileInput.change(this.onSelectFile);
    }

    initializeCropper = (src: string): void => {
        let image = document.getElementById('image');
        if (this.cropper) {
            this.cropper.destroy();
        }
        this.cropper = new Cropper(image, {
            dragMode: 'move',
            viewMode: 1,
            highlight: false
        });
        
        image.addEventListener('crop', this.onCropChange);
    }

    onCropChange = (e: any): void => {
        this.cropHeight = Math.round(e.detail.height);
        this.cropWidth = Math.round(e.detail.width);
    }

    downloadCroppedImage = (): void => {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = 'none';
        this.cropper.getCroppedCanvas({
            width: this.cropWidth,
            height: this.cropHeight,
        }).toBlob((blob: any) => {
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = this.fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }, this.fileType, 1)
    }

    openFileSelector = (): void => {
        this.fileInput.trigger('click');
    }

    onSelectFile = (): void => {
        let file = this.fileInput[0].files[0];
        this.fileName = file.name;
        this.fileType = file.type;
        let reader = new FileReader();
        let self = this;
        reader.onload = function() {
            self.imageSource = reader.result;
            setTimeout(function() {self.initializeCropper(reader.result)}, 0);
        };
        reader.readAsDataURL(file);
    }

    widthChange = (e: any): void => {
        this.cropWidth = parseInt(e.target.value);
        this.cropper.setData({
            width: this.cropWidth
        });
    }

    heightChange = (e: any): void => {
        this.cropHeight = parseInt(e.target.value);
        this.cropper.setData({
            height: this.cropHeight
        });
    }
}