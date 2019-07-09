import { Component } from '@angular/core';
import {Rotator} from './rotator';

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
  images: Array<any>;

  constructor() {

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
    this.convertURIToImageData('assets/img.jpeg').then((img) => {
      let newImg = new Rotator().rotate(img, this.angle);
      let canvas = document.createElement("canvas");
      canvas.height = newImg.height;
      canvas.width = newImg.width;
      canvas.style.border = "1px solid red";
      let context = canvas.getContext("2d");
      context.putImageData(newImg, 0, 0);
      document.body.appendChild(canvas);
    });
    /*let img = new ImageData(2,2);
    img.data.set([1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4])
    let newImg = new Rotator().rotate(img, this.angle);
    let canvas = document.createElement("canvas");
    canvas.height = newImg.height;
    canvas.width = newImg.width;
    canvas.style.border = "1px solid red";
    canvas.style.marginLeft = "10px";
    let context = canvas.getContext("2d");
    context.putImageData(newImg, 0, -0.5 * newImg.height);
    document.body.appendChild(canvas);*/
  }
}
