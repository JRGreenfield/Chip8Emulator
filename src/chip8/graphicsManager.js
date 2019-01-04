'use strict';

export function GraphicsManager(pixelRenderer,screenWidth,screenHeight){
    const _screenWidth=screenWidth;
    const _screenHeight=screenHeight;
    const _pixelRenderer = pixelRenderer;
    let _screenData;
    
    Object.defineProperty(this,'screenData',{
        get:function(){
            return _screenData;
        }
    })

    this.initialize = function(){
        _screenData = new Uint8Array(_screenWidth*_screenHeight);     
        this.clearScreen();  
    }

    this.reset = function(){
        for(let index=0;index<_screenWidth*_screenHeight;index++){
            _screenData[index]=0;
        }
        _pixelRenderer.refresh();   
    }

    this.clearScreen = function(){        
        for(let index=0;index<_screenWidth*_screenHeight;index++){
            _screenData[index]=0;
        }
        _pixelRenderer.refresh();   
    }

    this.drawPixelByte = function(x,y,byte){
        let pixelCleared=false;
        x%=_screenWidth;
        y%=_screenHeight;   
        for(let px = 0;px<8;px++){
            let value = (byte & (0x80 >> px));
            if( value !== 0){
                if(_screenData[x+px+y*_screenWidth]===1){
                    pixelCleared = true;
                }
                _screenData[x+px+y*_screenWidth]^=1;
            }
        }
        return pixelCleared;
    }

    this.updateScreen = function(){
        for(let index=0;index<_screenHeight*_screenWidth;index++){
            let xCoordinate = index % _screenWidth;
            let yCoordinate = Math.floor(index / _screenWidth);
            _pixelRenderer.updatePixelData(xCoordinate,yCoordinate,_screenData[index]);
        }     
    }

    this.update = function(){
        _pixelRenderer.refresh();  
    }
}
Object.seal(GraphicsManager);


