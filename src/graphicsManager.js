'use strict';

export function GraphicsManager(pixelRenderer,screenWidth,screenHeight,clockFrequency,framesPerSecond=60)
{
    let _framesPerSecond = framesPerSecond;
    let _clockFrequency=clockFrequency;
    let _cyclesPerUpdate;
    const _screenWidth=screenWidth;
    const _screenHeight=screenHeight;
    const _pixelRenderer = pixelRenderer;
    let _cyclesProcessed;
    let _screenData;
    
    Object.defineProperty(this,'cyclesPerUpdate',{
        get:function()
        {
            return _cyclesPerUpdate;
        }
    });

    Object.defineProperty(this,'clockFrequency',{
        get:function()
        {
            return _clockFrequency
        },
        set:function(value)
        {
            _clockFrequency=value;
            _cyclesPerUpdate = calculateCyclesPerUpdate();
        }
    });

    Object.defineProperty(this,'framesPerSecond',{
        get:function()
        {
            return _framesPerSecond;
        },
        set:function(value)
        {
            _framesPerSecond = value;
            _cyclesPerUpdate = calculateCyclesPerUpdate();
        }
    });

    Object.defineProperty(this,'cyclesProcessed',{
        get:function()
        {
            return _cyclesProcessed;
        }
    });

    Object.defineProperty(this,'screenData',{
        get:function()
        {
            return _screenData;
        }
    })

    this.initialize = function()
    {
        _cyclesProcessed=0;
        _cyclesPerUpdate = calculateCyclesPerUpdate();
        _screenData = new Uint8Array(_screenWidth*_screenHeight);     
        this.clearScreen();  
    }

    this.reset = function()
    {
        _cyclesProcessed = 0;

        for(let index=0;index<_screenWidth*_screenHeight;index++)
        {
            _screenData[index]=0;
        }
    }

    this.clearScreen = function()
    {        
        for(let index=0;index<_screenWidth*_screenHeight;index++)
        {
            _screenData[index]=0;
        }
        
    }

    this.drawPixelByte = function(x,y,data)
    {
        let pixelCleared=false;
        x%=_screenWidth;
        y%=_screenHeight;
       
        for(let pixelIndex=0,rowIndex=7;pixelIndex<8;pixelIndex++,rowIndex--)
        {
            let pixelValue = (data & (1<<rowIndex))>>rowIndex;
            let index = ((x+pixelIndex)%_screenWidth)+(y*_screenWidth);
           
            if(pixelValue === 1 && _screenData[index]===1)
            {
                pixelCleared = true;
            }

            _screenData[index]=_screenData[index] ^ pixelValue;
        }

        return pixelCleared;
    }

    this.update = function(cyclesToProcess)
    {
        _cyclesProcessed+=cyclesToProcess;
        
        while(_cyclesProcessed >= _cyclesPerUpdate)
        {
            _cyclesProcessed-=_cyclesPerUpdate;

            for(let index=0;index<_screenHeight*_screenWidth;index++)
            {
                let xCoordinate = index % _screenWidth;
                let yCoordinate = Math.floor(index / _screenWidth);
                _pixelRenderer.updatePixelData(xCoordinate,yCoordinate,_screenData[index]);
            }
        }
    }

    function calculateCyclesPerUpdate()
    {
        return Math.floor(_clockFrequency/_framesPerSecond);
    }    
}

Object.seal(GraphicsManager);


