import {vsSource} from './shaders/vertex_shader';
import {fsSource} from './shaders/fragment_shader';
import * as mat4 from './glMatrix/mat4.js';

export function GraphicsManager(pollingFrequency,clockFrequency,screenWidth,screenHeight)
{
    var _canvas;
    var _gl;
    var _screenWidth=screenWidth;
    var _screenHeight=screenHeight;
    const _clockCyclesPerUpdate = clockFrequency/pollingFrequency;
    var _clockCyclesCount;
    var _shaderProgram;
    var _vertexBuffer;
    var _vertexAttribute;
    var _pixelColor;
    var _pixelColorUniform;
    var _modelUniform;
    var _projectionUniform;
    var _identityMatrix;
    var _projectionMatrix;
    var _modelViewMatrix;
    var _screenData;

    this.initialize = function()
    {
        _canvas = document.querySelector("#glCanvas");
        _gl = _canvas.getContext("webgl");
        
        if(_gl === null)
        {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
    
        //load vertex and fragment shaders
        let vertexShader = loadShader(_gl, _gl.VERTEX_SHADER, vsSource);
        let fragmentShader = loadShader(_gl, _gl.FRAGMENT_SHADER, fsSource);

        //attach and link shader programs
        _shaderProgram = _gl.createProgram();
        _gl.attachShader(_shaderProgram, vertexShader);
        _gl.attachShader(_shaderProgram, fragmentShader);
        _gl.linkProgram(_shaderProgram);

        if (!_gl.getProgramParameter(_shaderProgram, _gl.LINK_STATUS)) 
        {
            alert('Unable to initialize the shader program: ' + _gl.getProgramInfoLog(_shaderProgram));
            return null;
        }

        var vertexArray = new Float32Array([0.0,0.0,0.0,1.0,1.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);

        _vertexBuffer = _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER,_vertexBuffer);
        _gl.bufferData(_gl.ARRAY_BUFFER,vertexArray,_gl.STATIC_DRAW);
    
        //create projection matrix
        _projectionMatrix = mat4.create();
        mat4.ortho(_projectionMatrix,0,_screenWidth,_screenHeight,0,-1,1);
        
        _modelViewMatrix = mat4.create();
        _pixelColor = new Float32Array([0.0,1.0,0.0,1.0]);
        _identityMatrix = mat4.create();
        mat4.identity(_identityMatrix);
        //store attribute location
        _vertexAttribute=_gl.getAttribLocation(_shaderProgram, 'aVertexPosition');
        //store uniform locations
        _pixelColorUniform=_gl.getUniformLocation(_shaderProgram,'uPixelColor');
        _projectionUniform=_gl.getUniformLocation(_shaderProgram, 'uProjectionMatrix');
        _modelUniform=_gl.getUniformLocation(_shaderProgram, 'uModelViewMatrix');
        
        this.clearScreen();  
    }

    this.clearScreen = function()
    {
        _clockCyclesCount=0;
        _gl.clearColor(0.0,0.0,0.0,1.0);
        _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
        _screenData = new Uint8Array(_screenWidth*_screenHeight);
    }

    this.drawPixel = function(x,y,value)
    {
        var pixelCleared=false;
        x%=_screenWidth;
        y%=_screenHeight;

        for(var i=0;i<8;i++)
        {
            let pixelValue = value & (1<<i);
            let index = ((x+i)%_screenWidth)+(y*_screenWidth);
            let value = _screenData[index] ^ pixelValue;
            
            if( value===0 && _screenData[index]===1)
            {
                pixelCleared = true;
            }

            _screenData[index]=value;
        }

        return pixelCleared;
    }

    this.refresh = function()
    {
        _gl.clearColor(0.0, 0.0, 0.0, 1.0); 
        _gl.clearDepth(1.0);                
        _gl.enable(_gl.DEPTH_TEST);         
        _gl.depthFunc(_gl.LEQUAL);      
      
        _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
      
        //set vertex data
        _gl.enableVertexAttribArray(_vertexAttribute);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, _vertexBuffer);
        _gl.vertexAttribPointer(_vertexAttribute,2,_gl.FLOAT,false,0,0);
      
        _gl.useProgram(_shaderProgram);
        _gl.uniform4fv(_pixelColorUniform,_pixelColor);
        _gl.uniformMatrix4fv(_projectionUniform,false,_projectionMatrix);
        
        for(var index=0;index<_screenHeight*_screenWidth;index++)
        {
            if(_screenData[index])
            {
                let xCoordinate = index % _screenWidth;
                let yCoordinate = Math.floor(index / _screenHeight);
                mat4.translate(_modelViewMatrix,_identityMatrix,[xCoordinate,yCoordinate, 0.0]);
                _gl.uniformMatrix4fv(_modelUniform,false,_modelViewMatrix);
                _gl.drawArrays(_gl.TRIANGLES,0,6);
            }    
        }
    }

    this.update = function(cyclesToProcess)
    {
        _clockCyclesCount+=cyclesToProcess;
        
        if(_clockCyclesCount >= _clockCyclesPerUpdate)
        {
            _clockCyclesCount = 0;
            this.refresh();
        }
    }

    function loadShader(gl,type,source)
    {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
        {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
      
        return shader;
    }
}


