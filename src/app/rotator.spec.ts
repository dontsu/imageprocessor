
import {Rotator} from './rotator';

describe('Rotator', () => {
  let rotator: Rotator;

  beforeEach(() => { (1)
    rotator = new Rotator();
  });

  it('should throw exception when no image is provided', () => {
    expect(function() { rotator.rotate(undefined, 90); }).toThrowError('No image data was found');
  });

  it('should throw exception when no angle is provided', () => {
    expect(function() { rotator.rotate(new ImageData(1,1), undefined); }).toThrowError('Angle is not provided');
  });

  it('should throw exception when angle is out of normal values, expcted to be between 1-360', () => {
    expect(function() { rotator.rotate(new ImageData(1,1), 900); }).toThrowError('Provided angle is outside the [0..360] range');
  });

    it('should rotate an image ', () => {
      let canvas = <HTMLCanvasElement>document.getElementById("my-canvas");
      let context = canvas.getContext("2d");
      const image = new Image();
      image.src = 'assets/img.jpeg';
      image.addEventListener('load', () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        expect(function() {
          rotator.rotate(imageData, 90);
        }).toBeDefined();
        let imgRotated =  rotator.rotate(imageData, 90);

        let canvas2 = <HTMLCanvasElement>document.createElement("canvas");
        canvas2.id = "jasmine-canvas";
        let context2 = canvas2.getContext("2d");
        const imageRotated = new Image();
        imageRotated.src = 'assets/img-90-rotated.jpeg';
        imageRotated.addEventListener('load', () => {
          canvas2.width = imageRotated.width;
          canvas2.height = imageRotated.height;
          context2.drawImage(imageRotated, 0, 0, canvas2.width, canvas2.height);
          const imageDataRotated = context.getImageData(0, 0, canvas2.width, canvas2.height);
          expect(imgRotated.data).toBe(imageDataRotated.data);

        });
      });
    });

});
