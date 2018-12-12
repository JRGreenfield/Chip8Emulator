'use strict';

/* Entry point */
import './style.css';
import { GLPixelRenderer } from './glPixelRenderer';
import { AudioRenderer} from './audioRenderer';
import { KeyboardHandler } from './keyboardHandler';
//import './emulator.js';

let _keyboardHandler = new KeyboardHandler();
_keyboardHandler.initialize();
_keyboardHandler.mapKey(49,1);
_keyboardHandler.mapKey(50,2);
_keyboardHandler.mapKey(51,3);
_keyboardHandler.mapKey(52,0xC);
_keyboardHandler.mapKey(81,4);
_keyboardHandler.mapKey(87,5);
_keyboardHandler.mapKey(69,6);
_keyboardHandler.mapKey(82,0xD);
_keyboardHandler.mapKey(65,7);
_keyboardHandler.mapKey(83,8);
_keyboardHandler.mapKey(68,9);
_keyboardHandler.mapKey(70,0xE);
_keyboardHandler.mapKey(90,0xA);
_keyboardHandler.mapKey(88,0);
_keyboardHandler.mapKey(67,0xB);
_keyboardHandler.mapKey(86,0xF);

let _keyDownCallbackId=_keyboardHandler.registerKeyDownCallback(keydownLog);
let _keyUpCallbackId=_keyboardHandler.registerKeyUpCallback(keyupLog);

let _audioRenderer = new AudioRenderer();
_audioRenderer.initialize();


let _pixelRenderer = new GLPixelRenderer("glCanvas",64,32);
_pixelRenderer.initialize();
_pixelRenderer.clearScreen();
 _pixelRenderer.setBackgroundColor(new Float32Array([1.0,0.0,0.0,1.0]));
 _pixelRenderer.setPixelColor(new Float32Array([0.0,0.0,1.0,1.0]));
_pixelRenderer.updatePixelData(0,0,1);
_pixelRenderer.updatePixelData(2,2,1);
_pixelRenderer.updatePixelData(4,4,1);
_pixelRenderer.updatePixelData(6,6,1);
_pixelRenderer.refresh();

function keydownLog(arg)
{
    console.log(arg.action);
}

function keyupLog(arg)
{
    console.log(arg.action);
}


