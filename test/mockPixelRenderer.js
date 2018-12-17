'use strict';

export function MockPixelRenderer(canvasName,screenWidth,screenHeight)
{
    let _screenWidth=screenWidth;
    let _screenHeight=screenHeight;
    let _screenData;

    Object.defineProperty(this,'screenData',{
        get:function()
        {
            return _screenData;
        }
    });

    this.initialize = function()
    {
        this.clearScreen();  
    }

    this.reset = function()
    {
        this.clearScreen();
    }

    this.clearScreen = function()
    {
        _screenData = new Uint8Array(_screenWidth*_screenHeight);
    }

    this.updatePixelData = function(x,y,data)
    {
        x%=_screenWidth;
        y%=_screenHeight;
        _screenData[x+(y*_screenWidth)]=data;
    }

    this.refresh = function()
    {
        
    }

    this.setPixelColor = function(color)
    {

    }

    this.setBackgroundColor = function(color)
    {
       
    }
}


