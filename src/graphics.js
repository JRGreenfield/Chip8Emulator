import {vsSource} from './shaders/vertex_shader';
import {fsSource} from './shaders/fragment_shader';
import * as mat4 from './glMatrix/mat4.js';

var _canvas;
var _gl;
var _shaderProgram;
var _programInfo;
var _bufferData;
var _textureBufferData;
var _texture;
var _screenWidth = 64;
var _screenHeight = 32;
var _colorChannels = 4;
var _screenData = new Uint8Array(_screenWidth*_screenHeight*_colorChannels);
var _testData = new Uint8Array(_screenWidth*_screenHeight*_colorChannels);

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
 
export default class
{
    initialize()
    {
        _canvas = document.querySelector("#glCanvas");
        _gl = _canvas.getContext("webgl");
       
        if(_gl === null)
        {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        let vertexShader = loadShader(_gl, _gl.VERTEX_SHADER, vsSource);
        let fragmentShader = loadShader(_gl, _gl.FRAGMENT_SHADER, fsSource);
      
        _shaderProgram = _gl.createProgram();
        _gl.attachShader(_shaderProgram, vertexShader);
        _gl.attachShader(_shaderProgram, fragmentShader);
        _gl.linkProgram(_shaderProgram);
        
        if (!_gl.getProgramParameter(_shaderProgram, _gl.LINK_STATUS)) 
        {
            alert('Unable to initialize the shader program: ' + _gl.getProgramInfoLog(_shaderProgram));
            return null;
        }

        _bufferData = _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER,_bufferData);
    
        const positions = [
            -1.0,1.0,
            1.0,1.0,
            -1.0,-1.0,
            1.0,-1.0 ];
    
        _gl.bufferData(_gl.ARRAY_BUFFER,new Float32Array(positions),_gl.STATIC_DRAW);
    
        _texture = _gl.createTexture();
        _gl.bindTexture(_gl.TEXTURE_2D, _texture);
         
        const width = 64;
        const height = 32;
        const pixelCount = width*height*4;
        var colorValue = 0;
        for(var nPixelIndex=0;nPixelIndex<pixelCount;nPixelIndex+=4,colorValue=(colorValue+0.25)%1)
        {
            _testData[nPixelIndex]=255;
            _testData[nPixelIndex+1]=255;
            _testData[nPixelIndex+2]=255;
            _testData[nPixelIndex+3]=255;
        }

        for(var nPixelIndex=0;nPixelIndex<pixelCount;nPixelIndex+=4,colorValue=(colorValue+0.25)%1)
        {
            _screenData[nPixelIndex]=255*colorValue;
            _screenData[nPixelIndex+1]=255*colorValue;
            _screenData[nPixelIndex+2]=255*colorValue;
            _screenData[nPixelIndex+3]=255;
        }


        _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,
                      _screenWidth, _screenHeight, 0, _gl.RGBA, _gl.UNSIGNED_BYTE,
                      _testData);
      
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);

        _textureBufferData= _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER, _textureBufferData);
      
        const textureCoordinates = [
          0.0,  1.0,
          1.0,  1.0,
          0.0,  0.0,
          1.0,  0.0];
        
        _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),_gl.STATIC_DRAW);
            
        _programInfo = {
            program: _shaderProgram,
            attribLocations: {
              vertexPosition: _gl.getAttribLocation(_shaderProgram, 'aVertexPosition'),
              textureCoord: _gl.getAttribLocation(_shaderProgram, 'aTextureCoord')
            },
            uniformLocations: {
              projectionMatrix: _gl.getUniformLocation(_shaderProgram, 'uProjectionMatrix'),
              modelViewMatrix: _gl.getUniformLocation(_shaderProgram, 'uModelViewMatrix'),
              uSampler: _gl.getUniformLocation(_shaderProgram, 'uSampler'),
            },
          };

        _gl.clearColor(0.0,0.0,0.0,1.0);
        _gl.clear(_gl.COLOR_BUFFER_BIT);
    }

    draw()
    {
        _gl.clearColor(0.0, 0.0, 0.0, 1.0); 
        _gl.clearDepth(1.0);                
        _gl.enable(_gl.DEPTH_TEST);         
        _gl.depthFunc(_gl.LEQUAL);      
      
        _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
      
        let projectionMatrix = mat4.create();
        mat4.identity(projectionMatrix);
        let modelViewMatrix = mat4.create();
        mat4.identity(modelViewMatrix);

        _gl.bindBuffer(_gl.ARRAY_BUFFER, _bufferData);
        _gl.vertexAttribPointer(_programInfo.attribLocations.vertexPosition,2,_gl.FLOAT,false,0,0);
        _gl.enableVertexAttribArray(_programInfo.attribLocations.vertexPosition);
        
  
        
        _gl.bindBuffer(_gl.ARRAY_BUFFER, _textureBufferData);
        _gl.vertexAttribPointer(_programInfo.attribLocations.textureCoord, 2, _gl.FLOAT, false, 0, 0);
        _gl.enableVertexAttribArray(_programInfo.attribLocations.textureCoord);

        _gl.useProgram(_programInfo.program);
        
        // Tell WebGL we want to affect texture unit 0
         _gl.activeTexture(_gl.TEXTURE0);
  
         // Bind the texture to texture unit 0
         _gl.bindTexture(_gl.TEXTURE_2D, _texture);

         /*
         _gl.glTextureSubImage2D (_gl.TEXTURE_2D, 0, 0, 0, _gl.RGBA,
            _screenWidth, _screenHeight, 0, _gl.RGBA, _gl.UNSIGNED_BYTE,
            _screenData);*/
        
            
            _gl.texSubImage2D(_gl.TEXTURE_2D,
                                0,
                                0,
                                0,
                                _screenWidth,
                                _screenHeight,
                                _gl.RGBA,
                                _gl.UNSIGNED_BYTE,
                                _screenData);
                                
  
         // Tell the shader we bound the texture to texture unit 0
         _gl.uniform1i(_programInfo.uniformLocations.uSampler, 0);
         
      
        _gl.uniformMatrix4fv(_programInfo.uniformLocations.projectionMatrix,false,projectionMatrix);
        _gl.uniformMatrix4fv(_programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);


    
        _gl.drawArrays(_gl.TRIANGLE_STRIP, 0, 4);
    }
}

