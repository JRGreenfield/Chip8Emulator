'use strict'

import {MockPixelRenderer} from '../test/mockPixelRenderer';
import {MockKeyboardHandler} from '../test/mockKeyboardHandler';
import {MockAudioRenderer} from '../test/mockAudioRenderer';
import {DelayTimer} from '../src/delayTimer';
import {SoundTimer} from '../src/soundTimer';
import {GraphicsManager} from '../src/graphicsManager';
import {MemoryManager} from '../src/memoryManager';
import {InputManager} from '../src/inputManager';
import {Cpu} from '../src/cpu';

export function MockHardwareInterface()
{
    let _memoryManager = new MemoryManager(4096);
    let _pixelRenderer = new MockPixelRenderer("glCanvas",64,32);
    let _graphicsManager = new GraphicsManager(_pixelRenderer,64,32,1760000,60);
    let _keyboardHandler = new MockKeyboardHandler();
    let _inputManager = new InputManager(_keyboardHandler,1760000,1000);
    let _audioRenderer = new MockAudioRenderer();
    let _soundTimer = new SoundTimer(_audioRenderer,1760000,60);
    let _delayTimer = new DelayTimer(1760000,60);
    let _cpu = new Cpu(_graphicsManager,_memoryManager,_inputManager,_delayTimer,_soundTimer,0x200,16);

    Object.defineProperty(this,'cpu',{
        get:function()
        {
            return _cpu;
        }
    })
    
    Object.defineProperty(this,'memoryManager',{
        get:function()
        {
            return _memoryManager;
        }
    });

    Object.defineProperty(this,'graphicsManager',{
        get:function()
        {
            return _graphicsManager;
        }
    });

    Object.defineProperty(this,'inputManager',{
        get:function()
        {
            return _inputManager;
        }
    })

    Object.defineProperty(this,'soundTimer',{
        get:function()
        {
            return _soundTimer;
        }
    });

    Object.defineProperty(this,'delayTimer',{
        get:function()
        {
            return _delayTimer;
        }
    });

    this.initialize=function()
    {
        _memoryManager.initialize();
        _pixelRenderer.initialize();
        _graphicsManager.initialize();
        _keyboardHandler.initialize();
        _inputManager.initialize();
        _audioRenderer.initialize();
        _soundTimer.initialize();
        _delayTimer.initialize();
        _cpu.initialize();
    }

    this.reset = function()
    {
        _audioRenderer.reset();
        _pixelRenderer.reset();
        _keyboardHandler.reset();
        _memoryManager.reset();
        _graphicsManager.reset();
        _inputManager.reset();
        _soundTimer.reset();
        _delayTimer.reset();
        _cpu.reset();
    }

    this.update = function(cyclesToProcess)
    {
        while(cyclesToProcess !== 0)
        {
            _graphicsManager.update(1);
            _inputManager.update(1);
            _soundTimer.update(1);
            _delayTimer.update(1);
            _cpu.update(1);
            cyclesToProcess--;
        } 
    }
}
