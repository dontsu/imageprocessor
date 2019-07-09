
export class Rotator {

  constructor() {
  }

  rotate(imageData: ImageData, angle: number): ImageData {
    if (!imageData || imageData.data.length === 0) {
      throw new Error('No image data was found');
    }
    if (!angle) {
      throw new Error('Angle is not provided');
    }
    if (0 < angle < 360) {
      throw new Error('Provided angle is outside the [0..360] range');
    }
    const dest = new ImageData(imageData.width, imageData.height);
    try {
      const newImage = new Array();

      // compute angle value in radians
      const angleRad = angle * (Math.PI / 180);
      const sin = Math.sin(angleRad);
      const cos = Math.cos(angleRad);
      const x0 = 0.5 * imageData.width;     // point to rotate about
      const y0 = 0.5 * imageData.height;     // center of image

      // rotation
      for (let i = 0; i < imageData.data.length; i++) {
        // get color of pixel
        const r = imageData.data[i * 4]; // Red
        const g = imageData.data[i * 4 + 1]; // Green
        const b = imageData.data[i * 4 + 2]; // Blue
        const a = imageData.data[i * 4 + 3]; // Alpha
        // get the position of pixel, because the original position of the coordinates was moved to the center,
        // the coordinates have to be calculated as well with the original position in mind
        const y = Math.round(i / imageData.width) - y0;
        const x = Math.round(i % imageData.width) - x0;
        // calculate the new position
        const xx = Math.round(x * cos - y * sin + x0);
        const yy = Math.round(x * sin + y * cos + y0);
        // make sure the coordinates are only in the positive range
        if (xx >= 0 && xx < imageData.width && yy >= 0 && yy < imageData.height) {
          // translate the new coordinates into position within a 1D array
          const n = (yy * imageData.width + xx) * 4;
          newImage[n] = r;
          newImage[n + 1] = g;
          newImage[n + 2] = b;
          newImage[n + 3] = a;
        }
      }
      dest.data.set(newImage);
    } catch (e) {
      console.log(e);
    }
    return dest;
  }

}
