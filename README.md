# About this small project

The main scope of this project is to demostrate the image rotation algorithm within a node app - in this case, 
it is an angular2 demo app that runs the embedded node. 
Within the code base there is also a standalone folder that can be used to test the 
rotator functionality within a static HTML page.
The angular functionality is using angular-cli.
It has no unit tests except auto-generated ones.

## Run the angular app
`npm install` to download all dependencies

`npm run` or `ng serve` to run the localhost node app available at `http://localhost:4200/ `

## Running standalone 
`npm run build:standalone` - this will generate a dist-standalone folder with a HTML page that can be simply opened in browser

## Performance API usage
I've added the performance API in the standalone page. When a rotation action is executed, console displays the time in milliseconds.

## Inspiration sources:
https://stackoverflow.com/questions/27022915/convert-image-pixel-data-to-coordinate-array
https://www.cyotek.com/blog/converting-2d-arrays-to-1d-and-accessing-as-either-2d-or-1d
http://eab.abime.net/showthread.php?t=29492
http://www.leptonica.org/rotation.html

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
