import { Component } from '@angular/core';
import {Rotator} from './rotator';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImageProcessor';
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  angle = 90;
  imgUrl: string;
  error: string;

  constructor() {

  }
  removeOldCanvas() {
    let canvas;
    while (true) {
      canvas = document.getElementsByClassName("rotated-canvas-img")
      if (canvas && canvas.length > 0) {
        canvas[0].remove();
      } else {
        break;
      }
    }
    this.error = undefined;
  }

  convertURIToImageData(URI): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      if (URI == null) { return reject(); }
      this.canvas = <HTMLCanvasElement>document.getElementById("my-canvas");
      this.context = this.canvas.getContext("2d");
      const image = new Image();
      image.addEventListener('load', () => {
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        resolve(imageData);
      }, false);
      image.src = URI;
    });
  }

  rotateImg() {
    this.convertURIToImageData(this.imgUrl).then((img) => {
      try {
        let newImg = new Rotator().rotate(img, this.angle);
        let canvas = document.createElement("canvas");
        canvas.className = "rotated-canvas-img";
        canvas.title = 'Rotated Image';
        canvas.height = newImg.height;
        canvas.width = newImg.width;
        canvas.style.border = "1px solid red";
        let context = canvas.getContext("2d");
        context.putImageData(newImg, 0, 0);
        document.body.appendChild(canvas);
      } catch (e) {
        this.error =  e;
      }
    });
  }
}
