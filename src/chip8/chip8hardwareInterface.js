'use strict'
import {GLPixelRenderer} from './glPixelRenderer';
import {KeyboardHandler} from './keyboardHandler';
import {AudioRenderer} from './audioRenderer';
import {DelayTimer} from './delayTimer';
import {SoundTimer} from './soundTimer';
import {GraphicsManager} from './graphicsManager';
import {MemoryManager} from './memoryManager';
import {InputManager} from './inputManager';
import {RandomNumberGenerator} from './randomNumberGenerator';
import {Cpu} from './cpu';

export function Chip8HardwareInterface(){
    let _memoryManager = new MemoryManager(4096);
    let _pixelRenderer = new GLPixelRenderer("glCanvas",64,32);
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32);
    let _keyboardHandler = new KeyboardHandler();
    let _inputManager = new InputManager(_keyboardHandler);
    let _audioRenderer = new AudioRenderer();
    let _soundTimer = new SoundTimer(_audioRenderer);
    let _delayTimer = new DelayTimer();
    let _randomNumberGenerator = new RandomNumberGenerator();
    let _romData;
    let _cpu = new Cpu(_graphicsManager,_memoryManager,_inputManager,_delayTimer,_soundTimer,0x200,_randomNumberGenerator,16);
    
    Object.defineProperty(this,'cpu',{
        get:function(){
            return _cpu;
        }
    })
    
    Object.defineProperty(this,'memoryManager',{
        get:function(){
            return _memoryManager;
        }
    });

    Object.defineProperty(this,'graphicsManager',{
        get:function(){
            return _graphicsManager;
        }
    });

    Object.defineProperty(this,'inputManager',{
        get:function(){
            return _inputManager;
        }
    })

    Object.defineProperty(this,'soundTimer',{
        get:function(){
            return _soundTimer;
        }
    });

    Object.defineProperty(this,'delayTimer',{
        get:function(){
            return _delayTimer;
        }
    });

    Object.defineProperty(this,'keyboardHandler',{
        get:function(){
            return _keyboardHandler;
        }
    })

    this.loadProgram = function(rom){
        _romData = rom.slice();
        this.reset();
        let pc=0x200;
        for(let byte of rom){
            _memoryManager.writeByte(pc++,byte);
        }
    }

    this.initialize=function(){
        _romData = null;
        _memoryManager.initialize();
        _pixelRenderer.initialize();
        _graphicsManager.initialize();
        _keyboardHandler.initialize();
        _keyboardHandler.mapKey(88,0);
        _keyboardHandler.mapKey(49,1);
        _keyboardHandler.mapKey(50,2);
        _keyboardHandler.mapKey(51,3);
        _keyboardHandler.mapKey(81,4);
        _keyboardHandler.mapKey(87,5);
        _keyboardHandler.mapKey(69,6);
        _keyboardHandler.mapKey(65,7);
        _keyboardHandler.mapKey(83,8);
        _keyboardHandler.mapKey(68,9);
        _keyboardHandler.mapKey(90,0xA);
        _keyboardHandler.mapKey(67,0xB);
        _keyboardHandler.mapKey(52,0xC);
        _keyboardHandler.mapKey(82,0xD);
        _keyboardHandler.mapKey(70,0xE);
        _keyboardHandler.mapKey(86,0xF);
        _inputManager.initialize();
        _audioRenderer.initialize();
        _soundTimer.initialize();
        _delayTimer.initialize();
        _cpu.initialize();
    }

    this.softReset = function(){
        this.reset();
        this.loadProgram(_romData);
    }

    this.reset = function(){
        _audioRenderer.reset();
        _pixelRenderer.reset();
        _memoryManager.reset();
        _graphicsManager.reset();
        _inputManager.reset();
        _soundTimer.reset();
        _delayTimer.reset();
        _cpu.reset();
    }

    this.update = function(){ 
        _cpu.update();
        _inputManager.update();
        _graphicsManager.update();
    }

    this.updateTimers = function(){
        _soundTimer.update();
        _delayTimer.update();
    }
}

Object.seal(Chip8HardwareInterface);