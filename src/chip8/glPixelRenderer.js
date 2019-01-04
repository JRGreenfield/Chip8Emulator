'use strict';
import {vsSource} from '../shaders/vertex_shader';
import {fsSource} from '../shaders/fragment_shader';
import * as mat4 from '../glMatrix/mat4.js';

export function GLPixelRenderer(canvasName,screenWidth,screenHeight){
    let _canvasName = canvasName;
    let _canvas;
    let _gl;
    let _screenWidth=screenWidth;
    let _screenHeight=screenHeight;
    let _shaderProgram;
    let _vertexBuffer;
    let _vertexAttribute;
    let _backgroundColor;
    let _pixelColor;
    let _pixelColorUniform;
    let _modelUniform;
    let _projectionUniform;
    let _identityMatrix;
    let _projectionMatrix;
    let _modelViewMatrix;
    let _screenData;

    this.initialize = function() {
        //get webgl canvas
        _canvas = document.querySelector("#"+_canvasName);
        _gl = _canvas.getContext("webgl"); 
        if(_gl === null){
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
        if (!_gl.getProgramParameter(_shaderProgram, _gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + _gl.getProgramInfoLog(_shaderProgram));
            return null;
        }
        //create rectangle vertex array, bind and set buffer data
        const vertexArray = new Float32Array([0.0,0.0,0.0,1.0,1.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);
        _vertexBuffer = _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER,_vertexBuffer);
        _gl.bufferData(_gl.ARRAY_BUFFER,vertexArray,_gl.STATIC_DRAW);
        //create projection,modelView and identity matrix
        _projectionMatrix = mat4.create();
        mat4.ortho(_projectionMatrix,0,_screenWidth,_screenHeight,0,-1,1);  
        _modelViewMatrix = mat4.create();
        _identityMatrix = mat4.create();
        mat4.identity(_identityMatrix);
        //Set default pixel and background color
        _pixelColor = new Float32Array([0.0,1.0,0.0,1.0]);
        _backgroundColor = new Float32Array([0.0,0.0,0.0,1.0]);
        //store attribute location
        _vertexAttribute=_gl.getAttribLocation(_shaderProgram, 'aVertexPosition');
        //store uniform locations
        _pixelColorUniform=_gl.getUniformLocation(_shaderProgram,'uPixelColor');
        _projectionUniform=_gl.getUniformLocation(_shaderProgram, 'uProjectionMatrix');
        _modelUniform=_gl.getUniformLocation(_shaderProgram, 'uModelViewMatrix');
        this.clearScreen();  
    }

    this.clearScreen = function() {
        _gl.clearColor(_backgroundColor[0],_backgroundColor[1],_backgroundColor[2],_backgroundColor[3]);
        _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
        _screenData = new Uint8Array(_screenWidth*_screenHeight);
    }

    this.updatePixelData = function(x,y,data){
        _screenData[x+(y*_screenWidth)]=data;
    }

    this.reset = function(){
        this.clearScreen();
    }

    this.refresh = function(){
        _gl.clearColor(_backgroundColor[0],_backgroundColor[1],_backgroundColor[2],_backgroundColor[3]);
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
        
        for(let index=0;index<_screenHeight*_screenWidth;index++) {
            if(_screenData[index]){
                let xCoordinate = index % _screenWidth;
                let yCoordinate = Math.floor(index / _screenWidth);
                mat4.translate(_modelViewMatrix,_identityMatrix,[xCoordinate,yCoordinate, 0.0]);
                _gl.uniformMatrix4fv(_modelUniform,false,_modelViewMatrix);
                _gl.drawArrays(_gl.TRIANGLES,0,6);
            }    
        }
    }

    this.setPixelColor = function(color){
        _pixelColor[0]=color[0];
        _pixelColor[1]=color[1];
        _pixelColor[2]=color[2];
        _pixelColor[3]=color[3];
    }

    this.setBackgroundColor = function(color){
        _backgroundColor[0]=color[0];
        _backgroundColor[1]=color[1];
        _backgroundColor[2]=color[2];
        _backgroundColor[3]=color[3];
    }

    function loadShader(gl,type,source){
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}
Object.seal(GLPixelRenderer);


