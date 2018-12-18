'use strict';

import test from 'ava';
import {MockPixelRenderer} from './mockPixelRenderer';
import {GraphicsManager} from '../src/graphicsManager';

test('initialization test', t => {
    let _pixelRenderer = new MockPixelRenderer("glCanvas",64,32);
    _pixelRenderer.initialize();
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32,1760000,60);
    _graphicsManager.initialize();
	t.is(_graphicsManager.clockFrequency,1760000);
	t.is(_graphicsManager.framesPerSecond,60);
    t.is(_graphicsManager.cyclesPerUpdate,29333);
    t.is(_graphicsManager.cyclesProcessed,0);
});

test('properties update test', t=> {
    let _pixelRenderer = new MockPixelRenderer("glCanvas",64,32);
    _pixelRenderer.initialize();
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32,1760000,60);
    _graphicsManager.initialize();
    //CHECK: update clock frequency to check for updated cycles per update value
    _graphicsManager.clockFrequency=3520000;
    t.is(_graphicsManager.clockFrequency,3520000);
	t.is(_graphicsManager.framesPerSecond,60);
    t.is(_graphicsManager.cyclesPerUpdate,58666);
    //CHECK: update frames per second to check for updated cycles per update value
    _graphicsManager.framesPerSecond=30;
    t.is(_graphicsManager.clockFrequency,3520000);
	t.is(_graphicsManager.framesPerSecond,30);
    t.is(_graphicsManager.cyclesPerUpdate,117333);
});

test('draw test',t => {
    let _pixelRenderer = new MockPixelRenderer("glCanvas",64,32);
    _pixelRenderer.initialize();
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32,1760000,60);
    _graphicsManager.initialize();   
    //CHECK: draw a pixel to the screen at (62,0) and check to see if screen data is updated and flipped data is false
    let flipped=_graphicsManager.drawPixelByte(62,0,0xFF);
    t.is(flipped,false);
    t.is(_graphicsManager.screenData[62],1);
    //CHECK: draw a pixel to the screen again at (62,0) and check to see if screen data is reset and flipped data is true
    flipped=_graphicsManager.drawPixelByte(62,0,0xFF);
    t.is(flipped,true);
    t.is(_graphicsManager.screenData[62],0);
    //CHECK: xor flip on set to unset detection
    flipped=_graphicsManager.drawPixelByte(64,32,0xFF);
    t.is(flipped,false);
    t.is(_graphicsManager.screenData[0],1);
    flipped=_graphicsManager.drawPixelByte(64,32,0xFF);
    t.is(flipped,true);
    t.is(_graphicsManager.screenData[0],0);
    flipped=_graphicsManager.drawPixelByte(64,32,0x0);
    t.is(flipped,false);
    t.is(_graphicsManager.screenData[0],0);
});

test('update test',t =>{
    let _pixelRenderer = new MockPixelRenderer("glCanvas",64,32);
    _pixelRenderer.initialize();
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32,1760000,60);
    _graphicsManager.initialize();
    t.is(_pixelRenderer.screenData[0],0);
    _graphicsManager.drawPixelByte(0,0,0xFF);
    t.is(_pixelRenderer.screenData[0],0);    
    _graphicsManager.update(29333);
    t.is(_pixelRenderer.screenData[0],1);
    t.is(_graphicsManager.cyclesProcessed,0);
    _graphicsManager.update(58666);
    t.is(_graphicsManager.cyclesProcessed,0);
});

test('reset test',t =>{
    let _pixelRenderer = new MockPixelRenderer("glCanvas",64,32);
    _pixelRenderer.initialize();
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32,1760000,60);
    _graphicsManager.initialize();
    _graphicsManager.drawPixelByte(0,0,0xFF);
    _graphicsManager.update(22);
    _graphicsManager.reset();
    t.is(_graphicsManager.screenData[0],0);
    t.is(_graphicsManager.cyclesProcessed,0);
});

test('clear screen test',t=>{
    let _pixelRenderer = new MockPixelRenderer("glCanvas",64,32);
    _pixelRenderer.initialize();
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32,1760000,60);
    _graphicsManager.initialize();
    t.is(_graphicsManager.screenData[0],0);
    _graphicsManager.drawPixelByte(0,0,0xFF);
    t.is(_graphicsManager.screenData[0],1);
    _graphicsManager.update(2340);
    _graphicsManager.clearScreen();
    t.is(_graphicsManager.screenData[0],0);
    t.is(_graphicsManager.cyclesProcessed,2340);
});