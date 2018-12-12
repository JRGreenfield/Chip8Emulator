'use strict';

import {vsSource} from './shaders/vertex_shader';
import {fsSource} from './shaders/fragment_shader';
import * as mat4 from './glMatrix/mat4.js';

export function GraphicsManager(framesPerSecond,clockFrequency,screenWidth,screenHeight,pixelRenderer)
{
    let _framesPerSecond = framesPerSecond;
    let _clockFrequency=clockFrequency;
    let _clockCyclesPerUpdate = _clockFrequency/_framesPerSecond;
    const _screenWidth=screenWidth;
    const _screenHeight=screenHeight;
    const _pixelRenderer = pixelRenderer;
    let _clockCyclesCount;
    let _screenData;
    
    Object.defineProperty(GraphicsManager.prototype,'clockFrequency',{
        get:function()
        {
            return _clockFrequency
        },
        set:function(value)
        {
            _clockFrequency=value;
            _clockCyclesPerUpdate = _clockFrequency/_framesPerSecond;
        }
    });

    Object.defineProperty(GraphicsManager.prototype,'framesPerSecond',{
        get:function()
        {
            return _framesPerSecond;
        },
        set:function(value)
        {
            _framesPerSecond = value;
            _clockCyclesPerUpdate = _clockFrequency/_framesPerSecond;
        }
    });

    this.initialize = function()
    {
        _screenData = new Uint8Array(_screenWidth*_screenHeight);     
        this.clearScreen();  
    }

    this.clearScreen = function()
    {
        _clockCyclesCount=0;
        
        for(let index=0;index<_screenWidth*_screenHeight;index++)
        {
            _screenData[index]=0;
        }
    }

    this.drawPixel = function(x,y,data)
    {
        let pixelCleared=false;
        x%=_screenWidth;
        y%=_screenHeight;
       
        for(let i=0;i<8;i++)
        {
            let pixelValue = data & (1<<i);
            let index = ((x+i)%_screenWidth)+(y*_screenWidth);
            let value = _screenData[index] ^ pixelValue;
            
            if(value===0 && _screenData[index]===1)
            {
                pixelCleared = true;
            }

            _screenData[index]=value;
        }

        return pixelCleared;
    }

    this.update = function(cyclesToProcess)
    {
        _clockCyclesCount+=cyclesToProcess;
        
        if(_clockCyclesCount >= _clockCyclesPerUpdate)
        {
            _clockCyclesCount = 0;

            for(let index=0;index<_screenHeight*_screenWidth;index++)
            {
                let xCoordinate = index % _screenWidth;
                let yCoordinate = Math.floor(index / _screenWidth);
                _pixelRenderer.updatePixelData(xCoordinate,yCoordinate,_screenData[index]);
            }
        }
    }
}


